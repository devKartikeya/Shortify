import { useMemo, useState } from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const PERIODS = [
    { label: "7 days", value: "7" },
    { label: "30 days", value: "30" },
    { label: "90 days", value: "90" },
    { label: "All time", value: "all" },
];

const GRANULARITIES = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
];

const dateKey = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const startOfDay = (date) => {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
};

const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

const startOfWeek = (date) => {
    const result = startOfDay(date);
    const day = result.getDay();
    result.setDate(result.getDate() - (day === 0 ? 6 : day - 1));
    return result;
};

const startOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1);

const addMonths = (date, months) =>
    new Date(date.getFullYear(), date.getMonth() + months, 1);

const formatDate = (date, options = { day: "numeric", month: "short" }) =>
    date.toLocaleDateString("en-IN", options);

const ClicksOverTimeChart = ({
    clickAnalytics = [],
    links = [],
}) => {
    const [period, setPeriod] = useState("7");
    const [granularity, setGranularity] = useState("daily");
    const [selectedLink, setSelectedLink] = useState("all");
    const [showComparison, setShowComparison] = useState(true);

    const validClicks = useMemo(
        () =>
            clickAnalytics
                .map((click) => ({
                    ...click,
                    timestamp: new Date(
                        click.clickedAt || click.createdAt
                    ),
                }))
                .filter(
                    (click) =>
                        !Number.isNaN(click.timestamp.getTime())
                ),
        [clickAnalytics]
    );

    const filteredClicks = useMemo(
        () =>
            selectedLink === "all"
                ? validClicks
                : validClicks.filter(
                      (click) => click.shortCode === selectedLink
                  ),
        [validClicks, selectedLink]
    );

    const range = useMemo(() => {
        const today = startOfDay(new Date());
        const earliest = filteredClicks.reduce(
            (minimum, click) =>
                click.timestamp < minimum ? click.timestamp : minimum,
            today
        );

        const days =
            period === "all"
                ? Math.max(
                      1,
                      Math.floor(
                          (today - startOfDay(earliest)) / 86400000
                      ) + 1
                  )
                : Number(period);

        const start =
            period === "all"
                ? startOfDay(earliest)
                : addDays(today, -(days - 1));

        return {
            start,
            end: today,
            previousStart: addDays(start, -days),
            previousEnd: addDays(start, -1),
            days,
        };
    }, [period, filteredClicks]);

    const effectiveGranularity = useMemo(() => {
        if (granularity !== "daily") return granularity;

        // Avoid hundreds of daily points for long histories.
        if (range.days > 180) return "monthly";
        if (range.days > 90) return "weekly";

        return "daily";
    }, [granularity, range.days]);

    const chartData = useMemo(() => {
        const getBucketStart = (date) => {
            if (effectiveGranularity === "weekly") {
                return startOfWeek(date);
            }

            if (effectiveGranularity === "monthly") {
                return startOfMonth(date);
            }

            return startOfDay(date);
        };

        const advanceBucket = (date) => {
            if (effectiveGranularity === "weekly") {
                return addDays(date, 7);
            }

            if (effectiveGranularity === "monthly") {
                return addMonths(date, 1);
            }

            return addDays(date, 1);
        };

        const formatBucket = (date) => {
            if (effectiveGranularity === "monthly") {
                return formatDate(date, {
                    month: "short",
                    year: "2-digit",
                });
            }

            if (effectiveGranularity === "weekly") {
                return `Week of ${formatDate(date)}`;
            }

            return formatDate(date);
        };

        const buckets = new Map();

        let cursor = getBucketStart(range.start);
        const lastBucket = getBucketStart(range.end);

        while (cursor <= lastBucket) {
            const key = dateKey(cursor);

            buckets.set(key, {
                key,
                label: formatBucket(cursor),
                clicks: 0,
                previousClicks: 0,
            });

            cursor = advanceBucket(cursor);
        }

        const previousDays = range.days;

        filteredClicks.forEach((click) => {
            const clickedAt = click.timestamp;
            const currentKey = dateKey(
                getBucketStart(clickedAt)
            );

            if (
                clickedAt >= range.start &&
                clickedAt < addDays(range.end, 1)
            ) {
                const bucket = buckets.get(currentKey);

                if (bucket) bucket.clicks += 1;

                return;
            }

            // Previous period is the same duration immediately before
            // the current period. It is used only for comparison.
            if (
                showComparison &&
                clickedAt >= range.previousStart &&
                clickedAt < range.start
            ) {
                const previousKey = dateKey(
                    getBucketStart(
                        addDays(clickedAt, previousDays)
                    )
                );

                const bucket = buckets.get(previousKey);

                if (bucket) bucket.previousClicks += 1;
            }
        });

        return Array.from(buckets.values());
    }, [
        filteredClicks,
        range,
        effectiveGranularity,
        showComparison,
    ]);

    const summary = useMemo(() => {
        const currentClicks = chartData.reduce(
            (sum, day) => sum + day.clicks,
            0
        );

        const previousClicks = chartData.reduce(
            (sum, day) => sum + day.previousClicks,
            0
        );

        const average = currentClicks / Math.max(range.days, 1);

        const peakDay = chartData.reduce(
            (best, day) =>
                day.clicks > best.clicks ? day : best,
            { clicks: 0, label: "—" }
        );

        let change = null;

        if (showComparison) {
            if (previousClicks > 0) {
                change =
                    ((currentClicks - previousClicks) /
                        previousClicks) *
                    100;
            } else if (currentClicks > 0) {
                change = 100;
            } else {
                change = 0;
            }
        }

        return {
            currentClicks,
            previousClicks,
            average,
            peakDay,
            change,
        };
    }, [chartData, range.days, showComparison]);

    const hasAnyClicks = summary.currentClicks > 0;

    return (
        <section className="border-b border-gray-100 p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-yellow-400" />
                        <h3 className="text-sm font-semibold text-gray-950">
                            Clicks over time
                        </h3>
                    </div>

                    <p className="mt-1 text-xs text-gray-400">
                        Explore traffic trends across your short links.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {PERIODS.map((item) => (
                        <button
                            key={item.value}
                            type="button"
                            onClick={() => setPeriod(item.value)}
                            className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                                period === item.value
                                    ? "bg-gray-950 text-white"
                                    : "border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-950"
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Filters */}
            <div className="mt-5 flex flex-col gap-3 rounded-xl border border-gray-100 bg-gray-50/70 p-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                    <label
                        htmlFor="analytics-link-filter"
                        className="text-xs font-medium text-gray-500"
                    >
                        Link
                    </label>

                    <select
                        id="analytics-link-filter"
                        value={selectedLink}
                        onChange={(event) =>
                            setSelectedLink(event.target.value)
                        }
                        className="max-w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none focus:border-yellow-400"
                    >
                        <option value="all">All links</option>

                        {links.map((link) => (
                            <option
                                key={link._id || link.shortCode}
                                value={link.shortCode}
                            >
                                /{link.shortCode}
                            </option>
                        ))}
                    </select>

                    <label
                        htmlFor="analytics-granularity"
                        className="ml-1 text-xs font-medium text-gray-500"
                    >
                        Group by
                    </label>

                    <select
                        id="analytics-granularity"
                        value={granularity}
                        onChange={(event) =>
                            setGranularity(event.target.value)
                        }
                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none focus:border-yellow-400"
                    >
                        {GRANULARITIES.map((item) => (
                            <option
                                key={item.value}
                                value={item.value}
                            >
                                {item.label}
                            </option>
                        ))}
                    </select>
                </div>

                <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
                    <input
                        type="checkbox"
                        checked={showComparison}
                        onChange={(event) =>
                            setShowComparison(event.target.checked)
                        }
                        className="h-4 w-4 accent-yellow-400"
                    />
                    Compare previous period
                </label>
            </div>

            {/* Summary metrics */}
            <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
                <div className="rounded-xl border border-gray-100 p-4">
                    <p className="text-xs text-gray-500">
                        Total clicks
                    </p>
                    <p className="mt-2 text-2xl font-bold text-gray-950">
                        {summary.currentClicks.toLocaleString("en-IN")}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                        Selected period
                    </p>
                </div>

                <div className="rounded-xl border border-gray-100 p-4">
                    <p className="text-xs text-gray-500">
                        Daily average
                    </p>
                    <p className="mt-2 text-2xl font-bold text-gray-950">
                        {summary.average.toFixed(1)}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                        Clicks per calendar day
                    </p>
                </div>

                <div className="rounded-xl border border-gray-100 p-4">
                    <p className="text-xs text-gray-500">
                        Busiest period
                    </p>
                    <p className="mt-2 truncate text-lg font-bold text-gray-950">
                        {summary.peakDay.label}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                        {summary.peakDay.clicks} clicks
                    </p>
                </div>

                <div className="rounded-xl border border-gray-100 p-4">
                    <p className="text-xs text-gray-500">
                        vs. previous period
                    </p>

                    <p className="mt-2 flex items-center gap-2 text-2xl font-bold text-gray-950">
                        {showComparison ? (
                            <>
                                {summary.change > 0 ? "+" : ""}
                                {summary.change.toFixed(1)}%
                            </>
                        ) : (
                            "—"
                        )}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                        {!showComparison
                            ? "Comparison disabled"
                            : `${summary.previousClicks.toLocaleString("en-IN")} previous clicks`}
                    </p>
                </div>
            </div>

            {/* Chart */}
            <div className="mt-6">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs font-medium text-gray-600">
                        {effectiveGranularity === "daily"
                            ? "Daily click activity"
                            : effectiveGranularity === "weekly"
                              ? "Weekly click activity"
                              : "Monthly click activity"}
                    </p>

                    {period === "all" && granularity === "daily" && (
                        <span className="text-[11px] text-gray-400">
                            Long histories are grouped automatically.
                        </span>
                    )}
                </div>

                <div className="h-64 w-full">
                    {!hasAnyClicks ? (
                        <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 text-center">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-yellow-700">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    className="h-5 w-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 17l6-6 4 4 8-9"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 6h6v6"
                                    />
                                </svg>
                            </div>

                            <p className="mt-3 text-sm font-semibold text-gray-800">
                                No clicks in this period
                            </p>

                            <p className="mt-1 max-w-xs px-4 text-xs leading-5 text-gray-400">
                                Try another time range or select a different
                                link to explore its activity.
                            </p>

                            {(period !== "all" ||
                                selectedLink !== "all") && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPeriod("all");
                                        setSelectedLink("all");
                                    }}
                                    className="mt-3 text-xs font-semibold text-gray-800 underline underline-offset-4 hover:text-yellow-700"
                                >
                                    View all link activity
                                </button>
                            )}
                        </div>
                    ) : (
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
                            <AreaChart
                                data={chartData}
                                margin={{
                                    top: 8,
                                    right: 8,
                                    left: -20,
                                    bottom: 0,
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="shortifyClicksGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="#FACC15"
                                            stopOpacity={0.35}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#FACC15"
                                            stopOpacity={0.02}
                                        />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid
                                    stroke="#E5E7EB"
                                    strokeDasharray="3 3"
                                    vertical={false}
                                />

                                <XAxis
                                    dataKey="label"
                                    tick={{
                                        fontSize: 11,
                                        fill: "#9CA3AF",
                                    }}
                                    axisLine={false}
                                    tickLine={false}
                                    minTickGap={period === "all" ? 24 : 12}
                                />

                                <YAxis
                                    allowDecimals={false}
                                    tick={{
                                        fontSize: 11,
                                        fill: "#9CA3AF",
                                    }}
                                    axisLine={false}
                                    tickLine={false}
                                    width={35}
                                />

                                <Tooltip
                                    cursor={{
                                        stroke: "#D1D5DB",
                                        strokeDasharray: "4 4",
                                    }}
                                    contentStyle={{
                                        borderRadius: "12px",
                                        border: "1px solid #E5E7EB",
                                        boxShadow:
                                            "0 8px 24px rgba(0,0,0,0.06)",
                                        fontSize: "12px",
                                    }}
                                    formatter={(value, name) => [
                                        `${value} ${value === 1 ? "click" : "clicks"}`,
                                        name === "previousClicks"
                                            ? "Previous period"
                                            : "Current period",
                                    ]}
                                />

                                {showComparison && (
                                    <Area
                                        type="monotone"
                                        dataKey="previousClicks"
                                        name="previousClicks"
                                        stroke="#D1D5DB"
                                        strokeWidth={1.5}
                                        strokeDasharray="5 4"
                                        fill="transparent"
                                        dot={false}
                                        activeDot={false}
                                    />
                                )}

                                <Area
                                    type="monotone"
                                    dataKey="clicks"
                                    name="clicks"
                                    stroke="#EAB308"
                                    strokeWidth={2.5}
                                    fill="url(#shortifyClicksGradient)"
                                    activeDot={{
                                        r: 5,
                                        stroke: "#FFFFFF",
                                        strokeWidth: 2,
                                        fill: "#EAB308",
                                    }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {showComparison && hasAnyClicks && (
                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-yellow-400" />
                            Current period
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-gray-300" />
                            Previous period
                        </span>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ClicksOverTimeChart;
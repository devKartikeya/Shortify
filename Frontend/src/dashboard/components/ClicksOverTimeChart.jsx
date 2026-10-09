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

const ClicksOverTimeChart = ({ clickAnalytics = [] }) => {
    const [period, setPeriod] = useState(7);

    const chartData = useMemo(() => {
        const now = new Date();
        const dailyClicks = new Map();

        // Initialize every day in the selected period, including zero-click days.
        for (let i = period - 1; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(now.getDate() - i);

            const key = [
                date.getFullYear(),
                String(date.getMonth() + 1).padStart(2, "0"),
                String(date.getDate()).padStart(2, "0"),
            ].join("-");

            dailyClicks.set(key, {
                date: key,
                label: date.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                }),
                clicks: 0,
            });
        }

        // Count individual click records by their timestamp.
        clickAnalytics.forEach((click) => {
            const timestamp = click.clickedAt || click.createdAt;
            if (!timestamp) return;

            const date = new Date(timestamp);
            if (Number.isNaN(date.getTime())) return;

            const key = [
                date.getFullYear(),
                String(date.getMonth() + 1).padStart(2, "0"),
                String(date.getDate()).padStart(2, "0"),
            ].join("-");

            if (dailyClicks.has(key)) {
                dailyClicks.get(key).clicks += 1;
            }
        });

        return Array.from(dailyClicks.values());
    }, [clickAnalytics, period]);

    const totalPeriodClicks = chartData.reduce(
        (total, day) => total + day.clicks,
        0
    );

    const peakDay = chartData.reduce(
        (best, day) => (day.clicks > best.clicks ? day : best),
        chartData[0] || { clicks: 0, label: "—" }
    );

    return (
        <section className="border-b border-gray-100 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-gray-950">
                        Clicks over time
                    </h3>
                    <p className="mt-1 text-xs text-gray-400">
                        Daily traffic across your short links
                    </p>
                </div>

                <div className="flex w-fit rounded-lg bg-gray-100 p-1">
                    {[7, 30].map((days) => (
                        <button
                            key={days}
                            type="button"
                            onClick={() => setPeriod(days)}
                            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                                period === days
                                    ? "bg-white text-gray-950 shadow-sm"
                                    : "text-gray-500 hover:text-gray-900"
                            }`}
                        >
                            {days} days
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:max-w-sm">
                <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">
                        Clicks in period
                    </p>
                    <p className="mt-1 text-2xl font-bold text-gray-950">
                        {totalPeriodClicks.toLocaleString("en-IN")}
                    </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">
                        Best day
                    </p>
                    <p className="mt-1 text-2xl font-bold text-gray-950">
                        {peakDay.clicks}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">
                        {peakDay.label}
                    </p>
                </div>
            </div>

            <div className="mt-6 h-64 w-full">
                {totalPeriodClicks === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 text-center">
                        <p className="text-sm font-medium text-gray-700">
                            No clicks in this period
                        </p>
                        <p className="mt-1 px-4 text-xs text-gray-400">
                            Share your short links to see daily activity here.
                        </p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={chartData}
                            margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient
                                    id="clicksGradient"
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
                                tick={{ fontSize: 11, fill: "#9CA3AF" }}
                                axisLine={false}
                                tickLine={false}
                                minTickGap={period === 30 ? 18 : 8}
                            />

                            <YAxis
                                allowDecimals={false}
                                tick={{ fontSize: 11, fill: "#9CA3AF" }}
                                axisLine={false}
                                tickLine={false}
                                width={35}
                            />

                            <Tooltip
                                cursor={{ stroke: "#D1D5DB", strokeDasharray: "4 4" }}
                                contentStyle={{
                                    borderRadius: "12px",
                                    border: "1px solid #E5E7EB",
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                                    fontSize: "12px",
                                }}
                                labelStyle={{
                                    color: "#6B7280",
                                    marginBottom: "4px",
                                }}
                                formatter={(value) => [
                                    `${value} ${value === 1 ? "click" : "clicks"}`,
                                    "Traffic",
                                ]}
                            />

                            <Area
                                type="monotone"
                                dataKey="clicks"
                                stroke="#EAB308"
                                strokeWidth={2.5}
                                fill="url(#clicksGradient)"
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
        </section>
    );
};

export default ClicksOverTimeChart;
import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const API_URL = import.meta.env.VITE_API_URL;

const PERIODS = [
    { label: "7 days", value: "7" },
    { label: "30 days", value: "30" },
    { label: "All time", value: "all" },
];

const formatNumber = (value) =>
    new Intl.NumberFormat("en-US").format(value || 0);

const getShortUrl = (shortCode) =>
    `${API_URL}/${shortCode}`;

const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });

const Analytics = () => {
    const [links, setLinks] = useState([]);
    const [clickAnalytics, setClickAnalytics] = useState([]);
    const [selectedLinkId, setSelectedLinkId] = useState("");
    const [search, setSearch] = useState("");
    const [period, setPeriod] = useState("30");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/urls/my-links`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message || "Failed to load analytics."
                    );
                }

                const userLinks = result.data || [];
                const analytics = result.clickAnalytics || [];

                setLinks(userLinks);
                setClickAnalytics(analytics);

                // Automatically select the first URL.
                setSelectedLinkId((currentId) => {
                    const stillExists = userLinks.some(
                        (link) => link._id === currentId
                    );

                    return stillExists
                        ? currentId
                        : userLinks[0]?._id || "";
                });
            } catch (err) {
                setError(
                    err.message || "Unable to load your analytics."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    const filteredLinks = useMemo(() => {
        const query = search.trim().toLowerCase();

        return links.filter((link) => {
            const originalUrl = link.originalUrl || "";
            const shortCode = link.shortCode || "";

            return (
                originalUrl.toLowerCase().includes(query) ||
                shortCode.toLowerCase().includes(query)
            );
        });
    }, [links, search]);

    const selectedLink = links.find(
        (link) => link._id === selectedLinkId
    );

    // Only analytics belonging to the selected URL.
    const selectedClicks = useMemo(() => {
        if (!selectedLink) return [];

        return clickAnalytics.filter(
            (click) =>
                String(click.urlId) === String(selectedLink._id) ||
                (
                    click.shortCode &&
                    click.shortCode === selectedLink.shortCode
                )
        );
    }, [clickAnalytics, selectedLink]);

    const filteredClicks = useMemo(() => {
        const now = new Date();

        if (period === "all") {
            return selectedClicks;
        }

        const days = Number(period);
        const startDate = new Date(now);
        startDate.setDate(startDate.getDate() - (days - 1));
        startDate.setHours(0, 0, 0, 0);

        return selectedClicks.filter((click) => {
            const clickedAt = new Date(click.clickedAt);

            return (
                !Number.isNaN(clickedAt.getTime()) &&
                clickedAt >= startDate &&
                clickedAt <= now
            );
        });
    }, [selectedClicks, period]);

    const chartData = useMemo(() => {
        const buckets = new Map();
        const now = new Date();

        let startDate;

        if (period === "all") {
            const dates = selectedClicks
                .map((click) => new Date(click.clickedAt))
                .filter((date) => !Number.isNaN(date.getTime()));

            startDate = dates.length
                ? new Date(Math.min(...dates.map((date) => date.getTime())))
                : new Date(now);

            startDate.setHours(0, 0, 0, 0);
        } else {
            startDate = new Date(now);
            startDate.setDate(
                startDate.getDate() - (Number(period) - 1)
            );
            startDate.setHours(0, 0, 0, 0);
        }

        const days = Math.max(
            1,
            Math.floor((now - startDate) / 86400000) + 1
        );

        // Use daily buckets for short ranges and monthly buckets
        // for longer all-time histories.
        const monthly = period === "all" && days > 180;

        const cursor = new Date(startDate);

        while (cursor <= now) {
            const bucketDate = new Date(cursor);

            if (monthly) {
                bucketDate.setDate(1);
            }

            const key = monthly
                ? `${bucketDate.getFullYear()}-${bucketDate.getMonth()}`
                : bucketDate.toISOString().slice(0, 10);

            if (!buckets.has(key)) {
                buckets.set(key, {
                    key,
                    date: new Date(bucketDate),
                    label: monthly
                        ? bucketDate.toLocaleDateString("en-US", {
                            month: "short",
                            year: "2-digit",
                        })
                        : formatDate(bucketDate),
                    clicks: 0,
                });
            }

            if (monthly) {
                cursor.setMonth(cursor.getMonth() + 1);
                cursor.setDate(1);
            } else {
                cursor.setDate(cursor.getDate() + 1);
            }
        }

        filteredClicks.forEach((click) => {
            const date = new Date(click.clickedAt);

            if (Number.isNaN(date.getTime())) return;

            const key = monthly
                ? `${date.getFullYear()}-${date.getMonth()}`
                : date.toISOString().slice(0, 10);

            const bucket = buckets.get(key);

            if (bucket) bucket.clicks += 1;
        });

        return Array.from(buckets.values()).map(
            ({ key, ...item }) => item
        );
    }, [filteredClicks, selectedClicks, period]);

    const deviceStats = useMemo(() => {
        const counts = {};

        filteredClicks.forEach((click) => {
            const device =
                click.device?.type ||
                click.deviceType ||
                "Unknown";

            const label =
                device.charAt(0).toUpperCase() + device.slice(1);

            counts[label] = (counts[label] || 0) + 1;
        });

        return Object.entries(counts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);
    }, [filteredClicks]);

    const countryStats = useMemo(() => {
        const counts = {};

        filteredClicks.forEach((click) => {
            const country = click.geo?.country || "Unknown";
            counts[country] = (counts[country] || 0) + 1;
        });

        return Object.entries(counts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [filteredClicks]);

    const referrerStats = useMemo(() => {
        const counts = {};

        filteredClicks.forEach((click) => {
            let source = "Direct";

            if (click.referrer) {
                try {
                    source = new URL(click.referrer).hostname
                        .replace(/^www\./, "");
                } catch {
                    source = click.referrer;
                }
            }

            counts[source] = (counts[source] || 0) + 1;
        });

        return Object.entries(counts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [filteredClicks]);

    const maxDeviceCount = Math.max(
        1,
        ...deviceStats.map((item) => item.count)
    );

    const handleCopy = async (url) => {
        try {
            await navigator.clipboard.writeText(url);
        } catch (err) {
            console.error("Failed to copy URL:", err);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-96 items-center justify-center">
                <div className="h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-amber-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                <p className="font-semibold text-red-700">
                    Could not load analytics
                </p>
                <p className="mt-1 text-sm text-red-600">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white"
                >
                    Try again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 text-gray-900">
            <Helmet>
                <title>
                    Analytics | Shortify
                </title>
                <meta name="description" content="Experience deep analysis of your links and QRs. Analyze devices, location, CTR, and timestamps." />
            </Helmet>
            {/* Page heading */}
            <div>
                <p className="text-sm font-medium text-amber-600">
                    PERFORMANCE
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight">
                    Link analytics
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    Select a short link to explore its performance.
                </p>
            </div>

            {/* Main two-column layout */}
            <div className="grid items-start gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">

                {/* LEFT: Link selector */}
                <aside className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-5">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold">Your links</h2>
                            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
                                {links.length}
                            </span>
                        </div>

                        <div className="relative mt-4">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                            >
                                <circle cx="11" cy="11" r="7" />
                                <path d="m16 16 4 4" />
                            </svg>

                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search your links..."
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white"
                            />
                        </div>
                    </div>

                    <div className="max-h-[650px] space-y-2 overflow-y-auto p-3">
                        {filteredLinks.length === 0 ? (
                            <div className="px-3 py-10 text-center">
                                <p className="text-sm font-medium text-gray-600">
                                    {links.length
                                        ? "No matching links"
                                        : "No links yet"}
                                </p>
                                <p className="mt-1 text-xs text-gray-400">
                                    {links.length
                                        ? "Try another search."
                                        : "Create a short link to see its analytics."}
                                </p>
                            </div>
                        ) : (
                            filteredLinks.map((link) => {
                                const active =
                                    selectedLinkId === link._id;

                                const totalClicks =
                                    clickAnalytics.filter(
                                        (click) =>
                                            String(click.urlId) ===
                                            String(link._id) ||
                                            (
                                                click.shortCode &&
                                                click.shortCode ===
                                                link.shortCode
                                            )
                                    ).length;

                                return (
                                    <button
                                        key={link._id}
                                        onClick={() =>
                                            setSelectedLinkId(link._id)
                                        }
                                        className={`w-full rounded-xl border p-3 text-left transition ${active
                                            ? "border-amber-300 bg-amber-50 shadow-sm"
                                            : "border-transparent hover:border-gray-200 hover:bg-gray-50"
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${active
                                                ? "bg-amber-100 text-amber-700"
                                                : "bg-gray-100 text-gray-500"
                                                }`}>
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    className="h-4 w-4"
                                                >
                                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                                </svg>
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-semibold text-gray-800">
                                                    {link.shortCode}
                                                </p>
                                                <p className="mt-1 truncate text-xs text-gray-500">
                                                    {link.originalUrl}
                                                </p>
                                                <div className="mt-3 flex items-center justify-between">
                                                    <span className="text-xs text-gray-500">
                                                        Total clicks
                                                    </span>
                                                    <span className="text-sm font-semibold text-gray-800">
                                                        {formatNumber(totalClicks)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </aside>

                {/* RIGHT: Selected link analytics */}
                <section className="min-w-0 space-y-6">
                    {!selectedLink ? (
                        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    className="h-7 w-7"
                                >
                                    <path d="M3 3v18h18" />
                                    <path d="m7 14 4-4 4 3 5-7" />
                                </svg>
                            </div>
                            <h2 className="mt-4 font-semibold">
                                Your analytics will appear here
                            </h2>
                            <p className="mt-1 max-w-sm text-sm text-gray-500">
                                Create a link or select one from the panel to view its performance.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Selected link header */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                            Selected link
                                        </p>
                                        <h2 className="mt-2 break-all text-lg font-bold">
                                            {linkTitle(selectedLink)}
                                        </h2>
                                        <p className="mt-2 break-all text-sm text-gray-500">
                                            {selectedLink.originalUrl}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() =>
                                            handleCopy(
                                                getShortUrl(
                                                    selectedLink.shortCode
                                                )
                                            )
                                        }
                                        className="shrink-0 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold transition hover:bg-gray-50"
                                    >
                                        Copy short URL
                                    </button>
                                </div>

                                <div className="mt-5 flex flex-col gap-3 rounded-xl bg-gray-50 p-3 sm:flex-row sm:items-center sm:justify-between">
                                    <a
                                        href={getShortUrl(
                                            selectedLink.shortCode
                                        )}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="break-all text-sm font-semibold text-amber-700 hover:text-amber-800"
                                    >
                                        {getShortUrl(
                                            selectedLink.shortCode
                                        )}
                                    </a>

                                    <select
                                        value={period}
                                        onChange={(e) =>
                                            setPeriod(e.target.value)
                                        }
                                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-400"
                                    >
                                        {PERIODS.map((item) => (
                                            <option
                                                key={item.value}
                                                value={item.value}
                                            >
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Summary cards */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <p className="text-sm text-gray-500">
                                        Clicks in selected period
                                    </p>
                                    <p className="mt-3 text-3xl font-bold tracking-tight">
                                        {formatNumber(filteredClicks.length)}
                                    </p>
                                    <p className="mt-2 text-xs text-gray-400">
                                        Based on recorded click events
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <p className="text-sm text-gray-500">
                                        All-time clicks
                                    </p>
                                    <p className="mt-3 text-3xl font-bold tracking-tight">
                                        {formatNumber(selectedClicks.length)}
                                    </p>
                                    <p className="mt-2 text-xs text-gray-400">
                                        Since this link was created
                                    </p>
                                </div>
                            </div>

                            {/* Clicks chart */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                                <div className="mb-6">
                                    <h3 className="font-semibold">
                                        Clicks over time
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        See when people visit your link.
                                    </p>
                                </div>

                                {filteredClicks.length === 0 ? (
                                    <div className="flex h-64 flex-col items-center justify-center text-center">
                                        <p className="font-medium text-gray-700">
                                            No clicks in this period
                                        </p>
                                        <p className="mt-1 text-sm text-gray-400">
                                            Try another date range or share your link.
                                        </p>
                                    </div>
                                ) : (
                                    <ResponsiveContainer width="100%" height={280}>
                                        <AreaChart
                                            data={chartData}
                                            margin={{
                                                top: 8,
                                                right: 8,
                                                left: -18,
                                                bottom: 0,
                                            }}
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
                                                        stopColor="#f59e0b"
                                                        stopOpacity={0.25}
                                                    />
                                                    <stop
                                                        offset="100%"
                                                        stopColor="#f59e0b"
                                                        stopOpacity={0.01}
                                                    />
                                                </linearGradient>
                                            </defs>

                                            <CartesianGrid
                                                stroke="#f0f0f0"
                                                strokeDasharray="4 4"
                                                vertical={false}
                                            />
                                            <XAxis
                                                dataKey="label"
                                                tick={{
                                                    fontSize: 11,
                                                    fill: "#9ca3af",
                                                }}
                                                axisLine={false}
                                                tickLine={false}
                                                minTickGap={24}
                                            />
                                            <YAxis
                                                allowDecimals={false}
                                                tick={{
                                                    fontSize: 11,
                                                    fill: "#9ca3af",
                                                }}
                                                axisLine={false}
                                                tickLine={false}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    borderRadius: 12,
                                                    border: "1px solid #e5e7eb",
                                                    fontSize: 12,
                                                }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="clicks"
                                                name="Clicks"
                                                stroke="#f59e0b"
                                                strokeWidth={2.5}
                                                fill="url(#clicksGradient)"
                                                activeDot={{ r: 5 }}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                )}
                            </div>

                            {/* Device, country and referrer breakdown */}
                            <div className="grid gap-6 lg:grid-cols-2">
                                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <h3 className="font-semibold">
                                        Devices
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Where your visitors browse from.
                                    </p>

                                    <div className="mt-6 space-y-5">
                                        {deviceStats.length === 0 ? (
                                            <p className="text-sm text-gray-400">
                                                No device data available yet.
                                            </p>
                                        ) : (
                                            deviceStats.map((item) => (
                                                <div key={item.name}>
                                                    <div className="mb-2 flex justify-between text-sm">
                                                        <span className="text-gray-600">
                                                            {item.name}
                                                        </span>
                                                        <span className="font-semibold">
                                                            {formatNumber(item.count)}
                                                        </span>
                                                    </div>
                                                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                                        <div
                                                            className="h-full rounded-full bg-amber-400"
                                                            style={{
                                                                width: `${(item.count / maxDeviceCount) * 100}%`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <h3 className="font-semibold">
                                        Top countries
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Visitor locations from recorded data.
                                    </p>

                                    <div className="mt-5 divide-y divide-gray-100">
                                        {countryStats.length === 0 ? (
                                            <p className="py-4 text-sm text-gray-400">
                                                No country data available yet.
                                            </p>
                                        ) : (
                                            countryStats.map((item, index) => (
                                                <div
                                                    key={item.name}
                                                    className="flex items-center justify-between py-3"
                                                >
                                                    <div className="flex min-w-0 items-center gap-3">
                                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-semibold text-gray-500">
                                                            {index + 1}
                                                        </span>
                                                        <span className="truncate text-sm text-gray-700">
                                                            {item.name}
                                                        </span>
                                                    </div>
                                                    <span className="ml-3 text-sm font-semibold">
                                                        {formatNumber(item.count)}
                                                    </span>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                                <h3 className="font-semibold">
                                    Traffic sources
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Websites referring visitors to this link.
                                </p>

                                <div className="mt-4 divide-y divide-gray-100">
                                    {referrerStats.length === 0 ? (
                                        <p className="py-4 text-sm text-gray-400">
                                            No traffic source data available yet.
                                        </p>
                                    ) : (
                                        referrerStats.map((item) => (
                                            <div
                                                key={item.name}
                                                className="flex items-center justify-between gap-4 py-3"
                                            >
                                                <span className="truncate text-sm text-gray-600">
                                                    {item.name}
                                                </span>
                                                <span className="shrink-0 text-sm font-semibold">
                                                    {formatNumber(item.count)}
                                                </span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </section>
            </div>
        </div>
    );
};

// Prefer a readable destination label when available.
function linkTitle(link) {
    if (!link) return "";
    try {
        return new URL(link.originalUrl).hostname;
    } catch {
        return link.shortCode || "Short link";
    }
}

export default Analytics;
import { useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:3000";

const MyLinks = () => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [clickFilter, setClickFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");

    const [copiedCode, setCopiedCode] = useState(null);

    // FETCH USER LINKS
    const fetchLinks = async (isRefresh = false) => {
        try {
            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }
            setError("");
            const response = await fetch(`${API_URL}/urls/my-links`, {
                method: "GET",
                credentials: "include",
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to fetch your links");
            }
            setLinks(result.data || []);
        } catch (err) {
            console.error("Failed to fetch links:", err);
            setError(err.message || "Something went wrong while loading your links.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    // HELPERS
    const getShortUrl = (link) => {
        return link.shortUrl || `${API_URL}/${link.shortCode}`;
    };

    const formatDate = (date) => {
        if (!date) return "Unknown date";
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatDateTime = (date) => {
        if (!date) return "";
        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const truncateUrl = (url, length = 55) => {
        if (!url) return "";
        if (url.length <= length) {
            return url;
        }
        return `${url.slice(0, length)}...`;
    };

    // COPY
    const handleCopy = async (link) => {
        try {
            await navigator.clipboard.writeText(getShortUrl(link));
            setCopiedCode(link.shortCode);
            setTimeout(() => {
                setCopiedCode(null);
            }, 1800);
        } catch (error) {
            console.error("Copy failed:", error);
        }
    };

    // FILTER + SORT
    const filteredLinks = useMemo(() => {
        let result = [...links];

        // SEARCH
        const query = search.trim().toLowerCase();
        if (query) {
            result = result.filter((link) => {
                const originalUrl = link.originalUrl?.toLowerCase() || "";
                const shortCode = link.shortCode?.toLowerCase() || "";
                const shortUrl = getShortUrl(link).toLowerCase();
                return (
                    originalUrl.includes(query) ||
                    shortCode.includes(query) ||
                    shortUrl.includes(query)
                );
            });
        }

        // CLICK FILTER
        if (clickFilter === "no-clicks") {
            result = result.filter((link) => Number(link.clicks || 0) === 0);
        }
        if (clickFilter === "clicked") {
            result = result.filter((link) => Number(link.clicks || 0) > 0);
        }
        if (clickFilter === "10+") {
            result = result.filter((link) => Number(link.clicks || 0) >= 10);
        }
        if (clickFilter === "50+") {
            result = result.filter((link) => Number(link.clicks || 0) >= 50);
        }
        if (clickFilter === "100+") {
            result = result.filter((link) => Number(link.clicks || 0) >= 100);
        }

        // DATE FILTER
        const now = new Date();
        if (dateFilter !== "all") {
            result = result.filter((link) => {
                if (!link.createdAt) return false;
                const created = new Date(link.createdAt);
                const difference = now.getTime() - created.getTime();
                const days = difference / (1000 * 60 * 60 * 24);

                if (dateFilter === "today") {
                    return created.toDateString() === now.toDateString();
                }
                if (dateFilter === "7-days") {
                    return days <= 7;
                }
                if (dateFilter === "30-days") {
                    return days <= 30;
                }
                return true;
            });
        }

        // SORT
        result.sort((a, b) => {
            const dateA = new Date(a.createdAt || 0).getTime();
            const dateB = new Date(b.createdAt || 0).getTime();
            const clicksA = Number(a.clicks || 0);
            const clicksB = Number(b.clicks || 0);

            switch (sortBy) {
                case "oldest":
                    return dateA - dateB;
                case "most-clicked":
                    return clicksB - clicksA;
                case "least-clicked":
                    return clicksA - clicksB;
                case "newest":
                default:
                    return dateB - dateA;
            }
        });

        return result;
    }, [links, search, sortBy, clickFilter, dateFilter]);

    // CLEAR FILTERS
    const clearFilters = () => {
        setSearch("");
        setSortBy("newest");
        setClickFilter("all");
        setDateFilter("all");
    };

    const hasFilters =
        search || sortBy !== "newest" || clickFilter !== "all" || dateFilter !== "all";

    // LOADING
    if (loading) {
        return (
            <div className="mx-auto max-w-[1600px] space-y-6">
                <div className="animate-pulse">
                    <div className="h-8 w-48 rounded-lg bg-gray-200" />
                    <div className="mt-3 h-4 w-80 rounded bg-gray-100" />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="h-28 animate-pulse rounded-2xl border border-gray-200 bg-white"
                        />
                    ))}
                </div>
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    <div className="space-y-4 p-6">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="h-16 animate-pulse rounded-xl bg-gray-50" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // MAIN UI
    return (
        <div className="mx-auto max-w-[1600px] space-y-6">
            {/* HEADER */}
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-yellow-400" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-yellow-600">
                            Link management
                        </span>
                    </div>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                        My links
                    </h1>
                    <p className="mt-1.5 max-w-2xl text-sm leading-6 text-gray-500">
                        Manage, track and organize every short link you've created with Shortify.
                    </p>
                </div>
                <button
                    onClick={() => fetchLinks(true)}
                    disabled={refreshing}
                    className="flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 11a8.1 8.1 0 0 0-14.9-4.3L3 9" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4v5h5" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 13a8.1 8.1 0 0 0 14.9 4.3L21 15" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 20v-5h-5" />
                    </svg>
                    {refreshing ? "Refreshing..." : "Refresh"}
                </button>
            </div>

            {/* ERROR */}
            {error && (
                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                            <circle cx="12" cy="12" r="9" />
                            <path strokeLinecap="round" d="M12 8v4" />
                            <path strokeLinecap="round" d="M12 16h.01" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-red-900">Couldn't load your links</p>
                        <p className="mt-1 text-xs text-red-600">{error}</p>
                    </div>
                </div>
            )}

            {/* SUMMARY */}
            <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-500">Total links</p>
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                            </svg>
                        </div>
                    </div>
                    <p className="mt-3 text-2xl font-bold text-gray-950">{links.length}</p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-500">Total clicks</p>
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-600">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4l3-8 4 16 3-8h4" />
                            </svg>
                        </div>
                    </div>
                    <p className="mt-3 text-2xl font-bold text-gray-950">
                        {links.reduce((total, link) => total + Number(link.clicks || 0), 0)}
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-500">Showing</p>
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
                                <circle cx="12" cy="12" r="9" />
                            </svg>
                        </div>
                    </div>
                    <p className="mt-3 text-2xl font-bold text-gray-950">{filteredLinks.length}</p>
                </div>
            </div>

            {/* FILTER BAR */}
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <div className="flex flex-col gap-3 xl:flex-row">
                    {/* Search */}
                    <div className="relative flex-1">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                        >
                            <circle cx="11" cy="11" r="7" />
                            <path strokeLinecap="round" d="m20 20-4-4" />
                        </svg>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by URL or short code..."
                            className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                        />
                    </div>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="h-11 cursor-pointer rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 outline-none transition-all focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                    >
                        <option value="newest">Newest first</option>
                        <option value="oldest">Oldest first</option>
                        <option value="most-clicked">Most clicked</option>
                        <option value="least-clicked">Least clicked</option>
                    </select>

                    {/* Clicks */}
                    <select
                        value={clickFilter}
                        onChange={(e) => setClickFilter(e.target.value)}
                        className="h-11 cursor-pointer rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 outline-none transition-all focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                    >
                        <option value="all">All clicks</option>
                        <option value="no-clicks">No clicks</option>
                        <option value="clicked">Has clicks</option>
                        <option value="10+">10+ clicks</option>
                        <option value="50+">50+ clicks</option>
                        <option value="100+">100+ clicks</option>
                    </select>

                    {/* Date */}
                    <select
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="h-11 cursor-pointer rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 outline-none transition-all focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                    >
                        <option value="all">All time</option>
                        <option value="today">Created today</option>
                        <option value="7-days">Last 7 days</option>
                        <option value="30-days">Last 30 days</option>
                    </select>
                </div>

                {hasFilters && (
                    <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                        <p className="text-xs text-gray-400">
                            Filters applied · {filteredLinks.length} result{filteredLinks.length !== 1 ? "s" : ""}
                        </p>
                        <button
                            onClick={clearFilters}
                            className="cursor-pointer text-xs font-semibold text-gray-500 transition-colors hover:text-gray-950"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>

            {/* LINKS TABLE */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                {/* Table Header */}
                <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="font-semibold text-gray-950">All links</h2>
                        <p className="mt-1 text-xs text-gray-400">
                            {filteredLinks.length} {filteredLinks.length === 1 ? "link" : "links"} found
                        </p>
                    </div>
                </div>

                {/* Empty */}
                {filteredLinks.length === 0 ? (
                    <div className="flex min-h-[400px] flex-col items-center justify-center px-6 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-7 w-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                            </svg>
                        </div>
                        <h3 className="mt-5 text-base font-semibold text-gray-950">
                            {links.length === 0 ? "No links created yet" : "No links found"}
                        </h3>
                        <p className="mt-1.5 max-w-sm text-sm leading-6 text-gray-400">
                            {links.length === 0
                                ? "Create your first short link and it will appear here."
                                : "Try adjusting your search or filters to find what you're looking for."}
                        </p>
                        {links.length > 0 && (
                            <button
                                onClick={clearFilters}
                                className="mt-5 cursor-pointer rounded-xl bg-gray-950 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-gray-800"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Desktop */}
                        <div className="hidden overflow-x-auto md:block">
                            <table className="w-full min-w-[850px]">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/70">
                                        <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Link</th>
                                        <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Destination</th>
                                        <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Clicks</th>
                                        <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Created</th>
                                        <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-gray-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredLinks.map((link) => {
                                        const shortUrl = getShortUrl(link);
                                        const clicks = Number(link.clicks || 0);
                                        return (
                                            <tr key={link._id || link.shortCode} className="group transition-colors hover:bg-gray-50/70">
                                                {/* Short URL */}
                                                <td className="px-5 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 transition-colors group-hover:bg-yellow-100">
                                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                                            </svg>
                                                        </div>
                                                        <div className="min-w-0">
                                                            <button
                                                                onClick={() => handleCopy(link)}
                                                                title={shortUrl}
                                                                className="block max-w-[220px] cursor-pointer truncate text-sm font-semibold text-gray-950 hover:text-yellow-600"
                                                            >
                                                                {shortUrl}
                                                            </button>
                                                            <p className="mt-0.5 text-xs text-gray-400">/{link.shortCode}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Destination */}
                                                <td className="max-w-[300px] px-5 py-5">
                                                    <p title={link.originalUrl} className="truncate text-sm text-gray-600">
                                                        {truncateUrl(link.originalUrl)}
                                                    </p>
                                                </td>

                                                {/* Clicks */}
                                                <td className="px-5 py-5">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-semibold text-gray-900">{clicks}</span>
                                                        <span className="text-xs text-gray-400">{clicks === 1 ? "click" : "clicks"}</span>
                                                    </div>
                                                </td>

                                                {/* Created */}
                                                <td className="px-5 py-5">
                                                    <p className="text-sm font-medium text-gray-700">{formatDate(link.createdAt)}</p>
                                                    <p className="mt-0.5 text-xs text-gray-400">
                                                        {formatDateTime(link.createdAt).split(",").pop()}
                                                    </p>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-5 py-5">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => handleCopy(link)}
                                                            title="Copy short URL"
                                                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-950"
                                                        >
                                                            {copiedCode === link.shortCode ? (
                                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-green-600">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
                                                                </svg>
                                                            ) : (
                                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                                                                    <rect width="13" height="13" x="8" y="8" rx="2" />
                                                                    <path strokeLinecap="round" d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
                                                                </svg>
                                                            )}
                                                        </button>
                                                        <a
                                                            href={shortUrl}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            title="Open short URL"
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all hover:border-yellow-300 hover:bg-yellow-50 hover:text-gray-950"
                                                        >
                                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19 5-9 9" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* MOBILE CARDS */}
                        <div className="divide-y divide-gray-100 md:hidden">
                            {filteredLinks.map((link) => {
                                const shortUrl = getShortUrl(link);
                                const clicks = Number(link.clicks || 0);
                                return (
                                    <div key={link._id || link.shortCode} className="p-5">
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0-7.07 7.07l1.71-1.71" />
                                                </svg>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <button
                                                            onClick={() => handleCopy(link)}
                                                            className="max-w-full cursor-pointer truncate text-left text-sm font-semibold text-gray-950"
                                                        >
                                                            {shortUrl}
                                                        </button>
                                                        <p className="mt-0.5 text-xs text-gray-400">Created {formatDate(link.createdAt)}</p>
                                                    </div>
                                                    <span className="shrink-0 rounded-full bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-600">
                                                        {clicks} {clicks === 1 ? "click" : "clicks"}
                                                    </span>
                                                </div>

                                                <div className="mt-4 rounded-xl bg-gray-50 p-3">
                                                    <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">Destination</p>
                                                    <p className="mt-1 break-all text-xs leading-5 text-gray-600">{link.originalUrl}</p>
                                                </div>

                                                <div className="mt-3 flex gap-2">
                                                    <button
                                                        onClick={() => handleCopy(link)}
                                                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                                                    >
                                                        {copiedCode === link.shortCode ? "Copied" : "Copy link"}
                                                    </button>
                                                    <a
                                                        href={shortUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-950 px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-gray-800"
                                                    >
                                                        Open
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19 5-9 9" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MyLinks;
import React, { useState, useEffect } from "react";
import CreateLinkModal from "../components/CreateLinkModal";
import EmptyLinks from "../components/EmptyLinks";
import LinkCard from "../components/LinkCard";
import { useOutletContext, useNavigate } from "react-router-dom";
const Overview = () => {
    const { user } = useOutletContext();
    const navigate = useNavigate();

    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState("");

    const [isCreateModalOpen, setIsCreateModalOpen] =
        useState(false);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                setLoading(true);
                setFetchError("");
                const response = await fetch(
                    "http://localhost:3000/urls/my-links",
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(
                        result.message ||
                        "Failed to fetch links"
                    );
                }
                setLinks(result.data || []);
            } catch (error) {
                console.error(
                    "Failed to fetch user links:",
                    error
                );
                setFetchError(
                    error.message ||
                    "Unable to load your links"
                );
            } finally {
                setLoading(false);
            }
        };
        fetchLinks();
    }, []);

    const totalLinks = links.length;
    const totalClicks = links.reduce(
        (total, link) =>
            total + (link.clicks || 0),
        0
    );
    const activeLinks = links.length;
    const clickRate =
        totalLinks > 0
            ? Math.round(
                totalClicks / totalLinks
            )
            : 0;

    const averageClicks =
        totalLinks > 0
            ? (totalClicks / totalLinks).toFixed(1)
            : "0";

    const topLink =
        links.length > 0
            ? [...links].sort(
                (a, b) =>
                    (b.clicks || 0) -
                    (a.clicks || 0)
            )[0]
            : null;

    const topLinkClicks =
        topLink?.clicks || 0;

    const topLinkShare =
        totalClicks > 0
            ? Math.round(
                (topLinkClicks / totalClicks) * 100
            )
            : 0;

    const stats = [
        {
            title: "Total Links",
            value: totalLinks,
            description:
                totalLinks === 0
                    ? "No links created yet"
                    : `${totalLinks} link${totalLinks === 1 ? "" : "s"} in your account`,
            icon: (<svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
            > <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                /> <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                /> </svg>
            )
        },
        {
            title: "Total Clicks",
            value: totalClicks,
            description:
                totalClicks === 0
                    ? "No clicks recorded yet"
                    : "Across all your short links",
            icon: (<svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
            > <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12h4l3-8 4 16 3-8h4"
                /> </svg>
            )
        },
        {
            title: "Active Links",
            value: activeLinks,
            description:
                activeLinks === 0
                    ? "No active links"
                    : "All your links are active",
            icon: (<svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
            > <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75"
                /> <circle cx="12" cy="12" r="9" /> </svg>
            )
        },
        {
            title: "Average Clicks",
            value: averageClicks,
            description:
                totalLinks === 0
                    ? "No link activity yet"
                    : "Average clicks per short link",
            icon: (<svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
            > <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 19V5"
                /> <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 19h16"
                /> <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m7 15 3-4 3 2 5-7"
                /> </svg>
            )
        }
    ];

    const handleLinkCreated = (newLink) => {
        setLinks((previousLinks) => [
            newLink,
            ...previousLinks
        ]);
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) {
            return "Good morning";
        }
        if (hour < 17) {
            return "Good afternoon";
        }
        return "Good evening";
    };

    const linksWithClicks = links.filter(
        (link) => (link.clicks || 0) > 0
    ).length;

    const unusedLinks = links.filter(
        (link) => (link.clicks || 0) === 0
    ).length;

    return (
        <>
            <div className="mx-auto max-w-[1600px] space-y-8">

                {/* ================= HEADER ================= */}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="mb-1 text-sm font-medium text-gray-400">
                            Welcome back
                        </p>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                            {getGreeting()}, {user.username} 👋
                        </h1>
                        <p className="mt-1.5 text-sm text-gray-500">
                            Here's an overview of everything happening with your
                            short links.
                        </p>
                    </div>
                    <button
                        className="group flex w-fit items-center gap-2 rounded-xl
                bg-gray-950 px-5 py-3 text-sm font-semibold text-white
                shadow-sm transition-all cursor-pointer hover:bg-gray-800
                active:scale-[0.98]" onClick={() => setIsCreateModalOpen(true)}
                    >
                        <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 3a.75.75 0 0 1 .75.75v5.5h5.5a.75.75 0 0 1 0 1.5h-5.5v5.5a.75.75 0 0 1-1.5 0v-5.5h-5.5a.75.75 0 0 1 0-1.5h5.5v-5.5A.75.75 0 0 1 10 3Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Create short link
                        <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 10a.75.75 0 0 1 .75-.75h10.69l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                {/* ================= STATS ================= */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.title}
                            className="group rounded-2xl border border-gray-200
                    bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]
                    transition-all hover:-translate-y-0.5
                    hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        {stat.title}
                                    </p>
                                    <p className="mt-3 text-3xl font-bold tracking-tight text-gray-950">
                                        {stat.value}
                                    </p>
                                </div>
                                <div
                                    className="flex h-10 w-10 items-center
                            justify-center rounded-xl bg-yellow-50
                            text-yellow-600 transition-colors
                            group-hover:bg-yellow-400 group-hover:text-gray-950"
                                >
                                    {stat.icon}
                                </div>
                            </div>
                            <p className="mt-4 text-xs text-gray-400">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* ================= ANALYTICS + TOP LINKS ================= */}
                <div className="grid gap-2 xl:grid-cols-[minmax(0,1fr)_380px]">

                    {/* ================= OVERALL ANALYTICS ================= */}
                    <div className="rounded-2xl border border-gray-200 bg-white">

                        {/* Header */}
                        <div className="flex flex-col gap-5 border-b border-gray-100 p-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="font-semibold text-gray-950">
                                    Overall performance
                                </h2>

                                <p className="mt-1 text-xs text-gray-400">
                                    A snapshot of how your short links are performing.
                                </p>
                            </div>

                            <div className="flex w-fit items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
                                <span className="h-2 w-2 rounded-full bg-yellow-400" />

                                <span className="text-xs font-medium text-gray-500">
                                    All time
                                </span>
                            </div>
                        </div>


                        {/* ================= ANALYTICS CONTENT ================= */}
                        <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr]">

                            {/* ================= ENGAGEMENT OVERVIEW ================= */}
                            <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-4">

                                <div className="flex items-start justify-between">

                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Average clicks per link
                                        </p>

                                        <div className="mt-3 flex items-end gap-2">
                                            <span className="text-4xl font-bold tracking-tight text-gray-950">
                                                {averageClicks}
                                            </span>

                                            <span className="mb-1 text-xs text-gray-400">
                                                clicks / link
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 19V5"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 19h16"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m7 15 3-4 3 2 5-7"
                                            />
                                        </svg>
                                    </div>

                                </div>


                                {/* ================= ENGAGEMENT DISTRIBUTION ================= */}
                                <div className="mt-8">

                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-xs font-medium text-gray-500">
                                            Link engagement
                                        </span>

                                        <span className="text-xs font-semibold text-gray-700">
                                            {totalClicks} total clicks
                                        </span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-gray-200">

                                        <div
                                            className="h-full rounded-full bg-yellow-400 transition-all duration-700"
                                            style={{
                                                width:
                                                    totalLinks > 0
                                                        ? `${Math.min(
                                                            averageClicks * 10,
                                                            100
                                                        )}%`
                                                        : "0%"
                                            }}
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-gray-400">
                                        Average engagement across all your links.
                                    </p>
                                </div>

                                {/* ================= SECONDARY METRICS ================= */}
                                <div className="mt-8 grid grid-cols-2 gap-3">

                                    {/* Links with clicks */}
                                    <div className="rounded-xl border border-gray-200 bg-white p-4">

                                        <div className="flex items-center justify-between">

                                            <p className="text-xs font-medium text-gray-500">
                                                Links with clicks
                                            </p>

                                            <svg
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="h-4 w-4 text-gray-300"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.53-9.53a.75.75 0 0 0-1.06-1.06L9 10.88 7.53 9.41a.75.75 0 1 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4-4Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>

                                        </div>

                                        <p className="mt-2 text-xl font-bold text-gray-950">
                                            {linksWithClicks}
                                        </p>

                                        <p className="mt-1 text-[11px] text-gray-400">
                                            {totalLinks > 0
                                                ? `${linksWithClicks} of ${totalLinks} links`
                                                : "No links yet"}
                                        </p>

                                    </div>


                                    {/* Unused links */}
                                    <div className="rounded-xl border border-gray-200 bg-white p-4">

                                        <div className="flex items-center justify-between">

                                            <p className="text-xs font-medium text-gray-500">
                                                Unused links
                                            </p>

                                            <svg
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                className="h-4 w-4 text-gray-300"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M10 6v4l2.5 2.5"
                                                />
                                                <circle
                                                    cx="10"
                                                    cy="10"
                                                    r="7.5"
                                                />
                                            </svg>

                                        </div>

                                        <p className="mt-2 text-xl font-bold text-gray-950">
                                            {unusedLinks}
                                        </p>

                                        <p className="mt-1 text-[11px] text-gray-400">
                                            {unusedLinks === 0
                                                ? "Every link has clicks"
                                                : "No clicks recorded yet"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* ================= TOP PERFORMING LINK ================= */}
                            <div className="rounded-xl border border-gray-100 bg-white p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Best performing link
                                        </p>
                                        <p className="mt-1 text-xs text-gray-400">
                                            Your most clicked short link.
                                        </p>
                                    </div>
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M13 7h6m0 0v6m0-6-7 7-4-4-5 5"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                {topLink ? (
                                    <div className="mt-7">
                                        {/* Link identity */}
                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-white">

                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    className="h-5 w-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                                                    />

                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-gray-950">
                                                    /{topLink.shortCode}
                                                </p>
                                                <p className="mt-0.5 truncate text-xs text-gray-400">
                                                    {topLink.originalUrl}
                                                </p>
                                            </div>
                                        </div>
                                        {/* Main metric */}
                                        <div className="mt-6 flex items-end justify-between">
                                            <div>
                                                <p className="text-2xl font-bold tracking-tight text-gray-950">
                                                    {topLinkClicks}
                                                </p>
                                                <p className="mt-1 text-xs text-gray-400">
                                                    total clicks
                                                </p>
                                            </div>
                                            <span className="rounded-lg bg-yellow-50 px-2.5 py-1.5 text-xs font-semibold text-yellow-700">
                                                {topLinkShare}% of total
                                            </span>
                                        </div>

                                        {/* Performance bar */}
                                        <div className="mt-6">
                                            <div className="mb-2 flex items-center justify-between">
                                                <span className="text-[11px] font-medium text-gray-400">
                                                    Share of all clicks
                                                </span>

                                                <span className="text-[11px] font-semibold text-gray-600">
                                                    {topLinkShare}%
                                                </span>

                                            </div>
                                            <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                                                <div
                                                    className="h-full rounded-full bg-yellow-400 transition-all duration-700"
                                                    style={{
                                                        width: `${topLinkShare}%`
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex min-h-[210px] flex-col items-center justify-center text-center">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-400">

                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                className="h-5 w-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 1 0-7.07-7.07l-1.72 1.71"
                                                />

                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l-1.71-1.71"
                                                />
                                            </svg>

                                        </div>

                                        <p className="mt-3 text-sm font-semibold text-gray-900">
                                            No performance data yet
                                        </p>

                                        <p className="mt-1 max-w-[230px] text-xs leading-5 text-gray-400">
                                            Create and share a link to see its performance.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ================= FOOTER INSIGHT ================= */}
                        {totalLinks > 0 && (
                            <div className="border-t border-gray-100 px-6 py-4">
                                <div className="flex items-start gap-2 text-xs text-gray-500">
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-yellow-50 text-yellow-600">
                                        <svg
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-3 w-3"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 2a6 6 0 0 0-3.94 10.53c.57.49.94 1.2.94 1.97V15h6v-.5c0-.77.37-1.48.94-1.97A6 6 0 0 0 10 2Zm-2 15h4v1H8v-1Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                    <span>
                                        {totalClicks === 0 ? (
                                            "Share your links to start generating engagement."
                                        ) : unusedLinks > 0 ? (
                                            `${unusedLinks} of your ${totalLinks} links haven't received any clicks yet.`
                                        ) : (
                                            `All ${totalLinks} of your links have received at least one click.`
                                        )}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ================= RECENT LINKS ================= */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    <div
                        className="flex flex-col gap-4 border-b border-gray-100 p-6 sm:flex-row sm:items-center
        sm:justify-between"
                    >
                        <div>
                            <h2 className="font-semibold text-gray-950">
                                Recent links
                            </h2>
                            <p className="mt-1 text-xs text-gray-400">
                                Your most recently created short links.
                            </p>
                        </div>
                        {links.length > 0 && (
                            <button
                                className="w-fit text-sm font-semibold
                text-gray-500 transition-colors
                hover:text-gray-950" onClick={() => navigate("/dashboard/my-links")}
                            >
                                View all →
                            </button>
                        )}
                    </div>
                    {loading ? (
                        <div className="space-y-1 p-4">
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-4
                    rounded-xl p-4"
                                >
                                    <div className="h-10 w-10 animate-pulse rounded-xl bg-gray-100" />
                                    <div className="flex-1">
                                        <div className="h-4 w-40 animate-pulse rounded bg-gray-100" />
                                        <div className="mt-2 h-3 w-64 animate-pulse rounded bg-gray-100" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : fetchError ? (
                        <div className="flex min-h-[250px] flex-col items-center justify-center px-6 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
                                <svg
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM9.25 6.75a.75.75 0 0 1 1.5 0v4a.75.75 0 0 1-1.5 0v-4ZM10 13.25a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <p className="mt-4 text-sm font-semibold text-gray-900">
                                Couldn't load your links
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                                {fetchError}
                            </p>
                        </div>
                    ) : links.length === 0 ? (
                        <EmptyLinks
                            onCreate={() =>
                                setIsCreateModalOpen(true)
                            }
                        />
                    ) : (
                        <div>
                            {links
                                .slice(0, 5)
                                .map((link) => (
                                    <LinkCard
                                        key={link._id}
                                        link={{
                                            ...link,
                                            shortUrl:
                                                `http://localhost:3000/${link.shortCode}`
                                        }}
                                    />
                                ))}
                        </div>
                    )}
                </div>

                {/* ================= QUICK INSIGHT ================= */}
                <div
                    className="relative overflow-hidden rounded-2xl border
            border-yellow-200 bg-yellow-50 p-6 sm:p-7"
                >
                    <div
                        className="pointer-events-none absolute -right-16
                -top-20 h-48 w-48 rounded-full bg-yellow-200/50 blur-3xl"
                    />
                    <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="max-w-2xl">
                            <div className="mb-2 flex items-center gap-2">
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-400 text-gray-950">
                                    <svg
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 2a6 6 0 0 0-3.94 10.53c.57.49.94 1.2.94 1.97V15h6v-.5c0-.77.37-1.48.94-1.97A6 6 0 0 0 10 2Zm-2 15h4v1H8v-1Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                                <span className="text-xs font-semibold uppercase tracking-wider text-yellow-700">
                                    Pro tip
                                </span>
                            </div>
                            <h3 className="text-base font-semibold text-gray-950">
                                Keep your links organized from one place.
                            </h3>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Shortify gives you everything you need to create,
                                manage and understand your short links.
                            </p>
                        </div>
                        <button
                            className="relative w-fit shrink-0 rounded-xl
                    border border-yellow-300 bg-white px-4 py-2.5
                    text-xs font-semibold text-gray-900
                    transition-colors hover:bg-yellow-100"
                        >
                            Explore Shortify
                        </button>
                    </div>
                </div>
            </div>
            <CreateLinkModal
                isOpen={isCreateModalOpen}
                onClose={() =>
                    setIsCreateModalOpen(false)
                }
                onLinkCreated={handleLinkCreated}
            />
        </>
    );
};

export default Overview;
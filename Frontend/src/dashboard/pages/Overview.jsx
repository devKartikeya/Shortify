import React from "react";

const Overview = () => {
    const stats = [
        {
            title: "Total Links",
            value: "0",
            description: "No links created yet",
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
            value: "0",
            description: "No clicks recorded yet",
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
            value: "0",
            description: "All your active links",
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
            title: "Click Rate",
            value: "0%",
            description: "Not enough data yet",
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

return (
    <div className="mx-auto max-w-[1600px] space-y-8">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
                <p className="mb-1 text-sm font-medium text-gray-400">
                    Welcome back
                </p>

                <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                    Good evening, Kartikeya 👋
                </h1>

                <p className="mt-1.5 text-sm text-gray-500">
                    Here's an overview of everything happening with your
                    short links.
                </p>
            </div>

            <button
                className="group flex w-fit items-center gap-2 rounded-xl
                bg-gray-950 px-5 py-3 text-sm font-semibold text-white
                shadow-sm transition-all hover:bg-gray-800
                active:scale-[0.98]"
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

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">

            {/* Analytics */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6">

                <div className="flex items-start justify-between gap-4">

                    <div>
                        <h2 className="font-semibold text-gray-950">
                            Clicks overview
                        </h2>

                        <p className="mt-1 text-xs text-gray-400">
                            Monitor how your links perform over time.
                        </p>
                    </div>

                    <button
                        className="shrink-0 rounded-lg border
                        border-gray-200 bg-white px-3 py-2
                        text-xs font-medium text-gray-600
                        transition-colors hover:bg-gray-50"
                    >
                        Last 7 days
                        <span className="ml-2">⌄</span>
                    </button>

                </div>


                {/* Empty chart */}

                <div
                    className="mt-7 flex h-[280px] flex-col
                    items-center justify-center rounded-xl
                    border border-dashed border-gray-200
                    bg-gray-50/60"
                >

                    <div
                        className="flex h-12 w-12 items-center
                        justify-center rounded-xl bg-yellow-50
                        text-yellow-600"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            className="h-6 w-6"
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

                    <p className="mt-4 text-sm font-semibold text-gray-900">
                        No analytics yet
                    </p>

                    <p className="mt-1 max-w-xs text-center text-xs leading-5 text-gray-400">
                        Create and share your first short link to start
                        collecting click data.
                    </p>

                </div>

            </div>


            {/* Top Performing Links */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6">

                <div>
                    <h2 className="font-semibold text-gray-950">
                        Top performing links
                    </h2>

                    <p className="mt-1 text-xs text-gray-400">
                        Your most clicked links.
                    </p>
                </div>


                <div
                    className="flex min-h-[280px] flex-col
                    items-center justify-center text-center"
                >

                    <div
                        className="flex h-12 w-12 items-center
                        justify-center rounded-xl bg-gray-50
                        text-gray-400"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            className="h-6 w-6"
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

                    <p className="mt-4 text-sm font-semibold text-gray-900">
                        No links yet
                    </p>

                    <p className="mt-1 max-w-[230px] text-xs leading-5 text-gray-400">
                        Once you start creating links, your top
                        performers will appear here.
                    </p>

                </div>

            </div>

        </div>


        {/* ================= RECENT LINKS ================= */}

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

            <div
                className="flex flex-col gap-4 border-b
                border-gray-100 p-6 sm:flex-row sm:items-center
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

                <button
                    className="w-fit text-sm font-semibold text-gray-500
                    transition-colors hover:text-gray-950"
                >
                    View all →
                </button>

            </div>


            {/* Empty state */}

            <div
                className="flex min-h-[270px] flex-col
                items-center justify-center px-6 text-center"
            >

                <div
                    className="flex h-14 w-14 items-center
                    justify-center rounded-2xl bg-yellow-50
                    text-yellow-600"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        className="h-7 w-7"
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

                <h3 className="mt-4 text-sm font-semibold text-gray-950">
                    Your links will appear here
                </h3>

                <p className="mt-1 max-w-sm text-xs leading-5 text-gray-400">
                    Create your first short link and it will be
                    automatically saved to your dashboard.
                </p>

                <button
                    className="mt-5 rounded-xl bg-gray-950 px-4 py-2.5
                    text-xs font-semibold text-white transition-all
                    hover:bg-gray-800 active:scale-[0.98]"
                >
                    Create your first link
                </button>

            </div>

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
);

};

export default Overview;
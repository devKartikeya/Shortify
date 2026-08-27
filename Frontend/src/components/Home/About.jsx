import React from "react";

const About = () => {
    return (
        <section
            id="about"
            className="relative overflow-hidden border-t border-gray-100 bg-white py-24 sm:py-28 lg:py-32"
        >
            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-yellow-100/60 blur-3xl" />
            <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-gray-100 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

                {/* Section Header */}
                <div className="max-w-3xl">
                    <div className="mb-5 flex items-center gap-3">
                        <span className="h-px w-8 bg-yellow-400" />

                        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-600">
                            About Shortify
                        </span>
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
                        Small links.
                        <br />
                        <span className="text-gray-400">
                            Bigger possibilities.
                        </span>
                    </h2>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-gray-500 sm:text-lg">
                        Shortify is built to make sharing and managing URLs
                        simple. What started with a straightforward idea —
                        turning long, complicated links into clean,
                        memorable ones — is designed to grow into a complete
                        link management experience.
                    </p>
                </div>

                {/* Main Content */}
                <div className="mt-16 grid gap-6 lg:grid-cols-12">

                    {/* Large Story Card */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-8 sm:p-10 lg:col-span-7 lg:p-12">

                        {/* Yellow accent */}
                        <div className="absolute right-0 top-0 h-32 w-32 translate-x-10 -translate-y-10 rounded-full bg-yellow-400/20 blur-2xl" />

                        <div className="relative">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-950">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-5 w-5 text-yellow-400"
                                >
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />

                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                </svg>
                            </div>

                            <h3 className="mt-8 text-2xl font-bold tracking-tight text-gray-950">
                                Built around a simple idea
                            </h3>

                            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
                                Links are everywhere — in messages, social
                                posts, documents, campaigns, and applications.
                                They shouldn't be difficult to share, remember,
                                or understand.
                            </p>

                            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
                                Shortify brings the essential tools together
                                in one clean experience. Create short links,
                                keep them organized, and understand how they
                                perform — without unnecessary complexity.
                            </p>

                            <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-gray-950">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-3.5 w-3.5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.25 7.333a1 1 0 0 1-1.42.006L3.29 9.293a1 1 0 0 1 1.42-1.414l4.038 4.06 6.542-6.617a1 1 0 0 1 1.414-.032Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>

                                Simple by design
                            </div>
                        </div>
                    </div>

                    {/* Right Cards */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">

                        {/* Card 1 */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/50 sm:p-8">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                    Our approach
                                </span>

                                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        className="h-4.5 w-4.5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6v6l4 2"
                                        />

                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="9"
                                        />
                                    </svg>
                                </span>
                            </div>

                            <h3 className="mt-6 text-xl font-bold tracking-tight text-gray-950">
                                Fast & focused
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Every part of Shortify is designed to keep
                                link management quick, clear, and effortless.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="rounded-2xl border border-gray-200 bg-gray-950 p-7 sm:p-8">

                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                    Our philosophy
                                </span>

                                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        className="h-4.5 w-4.5 text-gray-950"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"
                                        />
                                    </svg>
                                </span>
                            </div>

                            <h3 className="mt-6 text-xl font-bold tracking-tight text-white">
                                Powerful, not complicated
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-400">
                                Useful features should feel natural. We focus
                                on giving you the tools you need without
                                getting in your way.
                            </p>
                        </div>

                    </div>
                </div>

                {/* Bottom Statement */}
                <div className="mt-16 flex flex-col gap-6 border-t border-gray-200 pt-10 sm:flex-row sm:items-center sm:justify-between">

                    <p className="max-w-2xl text-sm leading-6 text-gray-500">
                        Whether you're sharing a single link or managing
                        hundreds of them, Shortify is built to stay simple
                        as your needs grow.
                    </p>

                    <a
                        href="#features"
                        className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gray-950"
                    >
                        Explore what we offer

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 10a.75.75 0 0 1 .75-.75h10.69l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>

                </div>
            </div>
        </section>
    );
};

export default About;
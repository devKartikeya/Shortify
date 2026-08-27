const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-white">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-yellow-100/60 blur-3xl" />
            <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-yellow-50 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">

                <div className="mx-auto max-w-4xl text-center">

                    {/* Eyebrow */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-3.5 py-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />

                        <span className="text-xs font-semibold tracking-wide text-yellow-700">
                            SIMPLE. FAST. POWERFUL.
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-gray-950 sm:text-6xl lg:text-7xl">
                        Turn long links into
                        <span className="relative mx-2 inline-block">
                            <span className="relative z-10 text-yellow-500">
                                powerful
                            </span>

                            <span className="absolute bottom-1 left-0 -z-0 h-3 w-full bg-yellow-100" />
                        </span>
                        short ones.
                    </h1>

                    {/* Description */}
                    <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
                        Create clean, memorable short links in seconds.
                        Manage every link from one simple dashboard and
                        keep track of how your audience interacts with them.
                    </p>

                    {/* URL Input */}
                    <div className="mx-auto mt-10 max-w-2xl">
                        <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-2 shadow-[0_15px_50px_rgba(0,0,0,0.07)] sm:flex-row">

                            <div className="flex flex-1 items-center gap-3 px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.7"
                                    stroke="currentColor"
                                    className="h-5 w-5 shrink-0 text-gray-400"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.19 8.688a4.5 4.5 0 0 0-6.38 0l-3 3a4.5 4.5 0 0 0 6.38 6.364l1.5-1.5"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10.81 15.312a4.5 4.5 0 0 0 6.38 0l3-3a4.5 4.5 0 0 0-6.38-6.364l-1.5 1.5"
                                    />
                                </svg>

                                <input
                                    type="url"
                                    placeholder="Paste your long URL here..."
                                    className="w-full bg-transparent py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                                />
                            </div>

                            <button className="rounded-xl bg-gray-950 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800 active:scale-[0.98]">
                                Shorten URL
                            </button>

                        </div>

                        <p className="mt-3 text-xs text-gray-400">
                            Free to use · No credit card required
                        </p>
                    </div>

                </div>

                {/* Product preview */}
                <div className="mx-auto mt-20 max-w-5xl">
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-2 shadow-[0_20px_70px_rgba(0,0,0,0.08)]">

                        <div className="rounded-xl border border-gray-200 bg-white">

                            {/* Fake browser header */}
                            <div className="flex h-12 items-center gap-2 border-b border-gray-100 px-5">
                                <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                                <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                                <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />

                                <div className="mx-auto hidden h-7 w-80 rounded-md bg-gray-50 sm:block" />
                            </div>

                            {/* Dashboard preview */}
                            <div className="grid min-h-[280px] grid-cols-1 md:grid-cols-[180px_1fr]">

                                <div className="hidden border-r border-gray-100 p-5 md:block">
                                    <div className="mb-8 h-6 w-24 rounded bg-gray-950" />

                                    <div className="space-y-3">
                                        <div className="h-8 rounded-lg bg-yellow-50" />
                                        <div className="h-8 rounded-lg bg-gray-50" />
                                        <div className="h-8 rounded-lg bg-gray-50" />
                                        <div className="h-8 rounded-lg bg-gray-50" />
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="h-5 w-32 rounded bg-gray-900" />
                                            <div className="mt-2 h-3 w-48 rounded bg-gray-100" />
                                        </div>

                                        <div className="h-9 w-24 rounded-lg bg-yellow-400" />
                                    </div>

                                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                        <div className="rounded-xl border border-gray-100 p-4">
                                            <div className="h-3 w-16 rounded bg-gray-100" />
                                            <div className="mt-3 h-6 w-12 rounded bg-gray-900" />
                                        </div>

                                        <div className="rounded-xl border border-gray-100 p-4">
                                            <div className="h-3 w-20 rounded bg-gray-100" />
                                            <div className="mt-3 h-6 w-16 rounded bg-gray-900" />
                                        </div>

                                        <div className="rounded-xl border border-gray-100 p-4">
                                            <div className="h-3 w-16 rounded bg-gray-100" />
                                            <div className="mt-3 h-6 w-14 rounded bg-yellow-500" />
                                        </div>
                                    </div>

                                    <div className="mt-5 h-24 rounded-xl bg-gray-50" />
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
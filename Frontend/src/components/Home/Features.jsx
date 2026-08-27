import React from "react";

const features = [
    {
        number: "01",
        title: "Instant shortening",
        description:
            "Turn lengthy URLs into clean, shareable links with a single click.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.7"
                stroke="currentColor"
                className="h-6 w-6"
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
        )
    },
    {
        number: "02",
        title: "Manage everything",
        description:
            "Keep all your shortened URLs organized and accessible from one dashboard.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.7"
                stroke="currentColor"
                className="h-6 w-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
            </svg>
        )
    },
    {
        number: "03",
        title: "Track your links",
        description:
            "Understand how your links perform with useful click and engagement insights.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.7"
                stroke="currentColor"
                className="h-6 w-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.5l4.5-4.5 3 3L16.5 6l4.5 4.5"
                />
            </svg>
        )
    }
];

const Features = () => {
    return (
        <section id="features" className="bg-white py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Heading */}
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-widest text-yellow-600">
                        Why LinkForge
                    </p>

                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                        Everything you need to manage your links.
                    </h2>

                    <p className="mt-5 text-base leading-7 text-gray-500">
                        A focused URL management experience without the
                        unnecessary complexity.
                    </p>
                </div>

                {/* Feature cards */}
                <div className="mt-14 grid gap-5 md:grid-cols-3">

                    {features.map((feature) => (
                        <article
                            key={feature.number}
                            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]"
                        >
                            <div className="flex items-center justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 transition-colors group-hover:bg-yellow-400 group-hover:text-gray-950">
                                    {feature.icon}
                                </div>

                                <span className="text-xs font-semibold text-gray-300">
                                    {feature.number}
                                </span>

                            </div>

                            <h3 className="mt-8 text-lg font-semibold text-gray-950">
                                {feature.title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                {feature.description}
                            </p>

                            <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-yellow-50 opacity-0 transition-opacity group-hover:opacity-100" />
                        </article>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default Features;
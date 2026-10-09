import React from "react";
import {
    FiArrowUpRight,
    FiLayers,
    FiShield,
    FiBarChart2,
    FiTrendingUp,
} from "react-icons/fi";

const pillars = [
    {
        number: "01",
        icon: FiLayers,
        title: "More than links.",
        highlight: "A complete workflow.",
        description:
            "Shortify brings the tools around your links together so you can create, organize, share, and understand them without jumping between different platforms.",
        points: [
            "One workspace for your links",
            "QR codes built into the workflow",
            "Useful insights without the clutter",
        ],
    },
    {
        number: "02",
        icon: FiTrendingUp,
        title: "Build your brand.",
        highlight: "One link at a time.",
        description:
            "Turn your links and QR codes into recognizable parts of your brand. Customize how you share your digital presence and create a consistent experience wherever your audience finds you.",
        points: [
            "Branded and memorable short links",
            "Custom QR codes with your logo and colors",
            "Consistent identity across online and offline sharing",
        ],
    },
    {

        number: "03",
        icon: FiBarChart2,
        title: "Know your audience.",
        highlight: "Beyond the click.",
        description:
            "Go beyond total click counts with detailed link analytics. Understand when your links are clicked, which devices and browsers your audience uses, and where your traffic comes from.",
        points: [
            "Timestamped click tracking",
            "Device, OS & browser insights",
            "Geographic & referrer analytics",
        ]
    },
];

const MoreThanShortener = () => {
    return (
        <section className="relative overflow-hidden bg-gray-50 px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
            <div className="mx-auto max-w-7xl">

                {/* ================= HEADER ================= */}

                <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-600">
                            Why Shortify?
                        </p>

                        <h2 className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
                            More than a
                            <span className="block text-yellow-500">
                                URL shortener.
                            </span>
                        </h2>
                    </div>

                    <p className="max-w-2xl text-base leading-7 text-gray-500 lg:ml-auto lg:text-lg">
                        A short link is only the beginning. Shortify is built
                        to give you the tools, infrastructure, and experience
                        you need to turn simple links into something more useful.
                    </p>

                </div>


                {/* ================= PILLARS ================= */}

                <div className="mt-16 grid gap-6 md:grid-cols-3">

                    {pillars.map((pillar) => {
                        const Icon = pillar.icon;

                        return (
                            <article
                                key={pillar.number}
                                className="group relative min-h-[560px] overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-yellow-300 hover:shadow-[0_25px_70px_rgba(0,0,0,0.08)] sm:p-9"
                            >

                                {/* Large background number */}

                                <span className="pointer-events-none absolute -right-5 -top-10 text-[150px] font-black leading-none text-gray-50 transition-colors duration-500 group-hover:text-yellow-50">
                                    {pillar.number}
                                </span>


                                {/* Icon */}

                                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-950 text-yellow-400 transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-gray-950">
                                    <Icon size={23} />
                                </div>


                                {/* Content */}

                                <div className="relative mt-14">

                                    <p className="text-2xl font-bold leading-tight text-gray-950">
                                        {pillar.title}
                                    </p>

                                    <p className="mt-1 text-2xl font-bold leading-tight text-yellow-500">
                                        {pillar.highlight}
                                    </p>

                                    <p className="mt-6 text-sm leading-7 text-gray-500">
                                        {pillar.description}
                                    </p>

                                </div>


                                {/* Points */}

                                <div className="absolute bottom-8 left-8 right-8 border-t border-gray-100 pt-6 sm:left-9 sm:right-9">

                                    <div className="space-y-3">

                                        {pillar.points.map((point) => (
                                            <div
                                                key={point}
                                                className="flex items-start gap-3"
                                            >
                                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400" />

                                                <span className="text-xs font-medium leading-5 text-gray-600">
                                                    {point}
                                                </span>
                                            </div>
                                        ))}

                                    </div>

                                </div>

                            </article>
                        );
                    })}

                </div>


                {/* ================= CLOSING STATEMENT ================= */}

                <div className="mt-20 border-t border-gray-200 pt-12">

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                        <div className="max-w-3xl">

                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">
                                The Shortify mindset
                            </p>

                            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl">
                                Simple on the surface.
                                <span className="text-gray-400">
                                    {" "}
                                    Thoughtful underneath.
                                </span>
                            </h3>

                        </div>

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-950 transition-all hover:border-yellow-400 hover:bg-yellow-400">
                            <FiArrowUpRight size={20} />
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default MoreThanShortener;
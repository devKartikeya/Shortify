import React from "react";

const stats = [
    {
        value: "10K+",
        label: "Links shortened"
    },
    {
        value: "99.9%",
        label: "Service uptime"
    },
    {
        value: "< 100ms",
        label: "Average redirect"
    },
    {
        value: "24/7",
        label: "Link availability"
    }
];

const Stats = () => {
    return (
        <section className="border-y border-gray-100 bg-gray-50">
            <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-gray-100 px-6 lg:grid-cols-4 lg:px-8">

                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="px-6 py-8 text-center lg:py-10"
                    >
                        <p className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                            {stat.value}
                        </p>

                        <p className="mt-1.5 text-xs font-medium text-gray-500 sm:text-sm">
                            {stat.label}
                        </p>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default Stats;
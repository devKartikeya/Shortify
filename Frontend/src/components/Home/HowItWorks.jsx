const steps = [
    {
        number: "01",
        title: "Paste a URL",
        description:
            "Start with any long URL you want to make shorter."
    },
    {
        number: "02",
        title: "Get your short link",
        description:
            "Shortify creates a clean, unique link for you instantly."
    },
    {
        number: "03",
        title: "Share & manage",
        description:
            "Share your link anywhere or sign in to manage and track it."
    }
];

const HowItWorks = () => {
    return (
        <section
            id="how-it-works"
            className="border-t border-gray-100 bg-gray-50 py-24 lg:py-32"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-600">
                        How it works
                    </p>

                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                        From long URL to shareable link
                        <span className="block text-gray-400">
                            in a few seconds.
                        </span>
                    </h2>

                    <p className="mt-5 text-base leading-7 text-gray-500">
                        No setup. No complicated workflow. Just paste, shorten,
                        and share.
                    </p>
                </div>

                <div className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">

                    {/* Connecting line */}
                    <div className="absolute left-[16.66%] right-[16.66%] top-7 hidden h-px bg-gray-200 md:block" />

                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="relative text-center"
                        >
                            <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white text-sm font-bold text-gray-950 shadow-sm">
                                <span className="absolute inset-1 rounded-full border border-yellow-100" />
                                {step.number}
                            </div>

                            <h3 className="mt-7 text-lg font-bold text-gray-950">
                                {step.title}
                            </h3>

                            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-500">
                                {step.description}
                            </p>
                        </div>
                    ))}

                </div>

                {/* Small reassurance */}
                <div className="mx-auto mt-16 flex max-w-xl items-center justify-center gap-3 border-t border-gray-200 pt-8 text-center">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-3.5 w-3.5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.704 4.153a.75.75 0 01.143 1.052l-7.25 9a.75.75 0 01-1.127.075l-4.25-4.25a.75.75 0 111.06-1.06l3.665 3.665 6.738-8.364a.75.75 0 011.021-.118Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>

                    <p className="text-sm text-gray-500">
                        Start shortening instantly — create an account when
                        you're ready for more.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default HowItWorks;
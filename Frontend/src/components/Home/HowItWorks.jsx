const steps = [
    {
        number: "01",
        title: "Paste your URL",
        description:
            "Enter the long URL you want to make shorter."
    },
    {
        number: "02",
        title: "Create your link",
        description:
            "LinkForge generates a unique short URL instantly."
    },
    {
        number: "03",
        title: "Share & track",
        description:
            "Share your link and monitor its performance from your dashboard."
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
                    <p className="text-sm font-semibold uppercase tracking-widest text-yellow-600">
                        How it works
                    </p>

                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                        Short links. Three simple steps.
                    </h2>

                    <p className="mt-5 text-base leading-7 text-gray-500">
                        No complicated setup. Just paste, create, and share.
                    </p>
                </div>

                <div className="relative mt-16 grid gap-8 md:grid-cols-3">

                    {/* Connecting line */}
                    <div className="absolute left-[16.66%] right-[16.66%] top-7 hidden h-px bg-gray-200 md:block" />

                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="relative text-center"
                        >
                            <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white text-sm font-bold text-gray-950 shadow-sm">
                                {step.number}
                            </div>

                            <h3 className="mt-7 text-lg font-semibold text-gray-950">
                                {step.title}
                            </h3>

                            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-500">
                                {step.description}
                            </p>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default HowItWorks;
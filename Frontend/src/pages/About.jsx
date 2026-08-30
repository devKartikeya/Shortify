import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-white text-gray-950">

            {/* =========================================================
                HERO
            ========================================================= */}

            <section className="relative overflow-hidden border-b border-gray-100">
                {/* Background decoration */}
                <div className="pointer-events-none absolute -right-48 -top-48 h-[32rem] w-[32rem] rounded-full bg-yellow-100/70 blur-3xl" />
                <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-yellow-50 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 lg:px-8 lg:pb-32 lg:pt-40">

                    <div className="max-w-4xl">

                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-3.5 py-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />

                            <span className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-700">
                                About Shortify
                            </span>
                        </div>

                        <h1 className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-gray-950 sm:text-6xl lg:text-7xl">
                            We believe the web
                            <span className="block text-gray-400">
                                should feel simpler.
                            </span>
                        </h1>

                        <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-500">
                            Shortify is built around one simple idea:
                            sharing the web shouldn't be complicated.
                            We make long, difficult URLs easier to share,
                            manage, understand, and use.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-3">

                            <button
                                onClick={() => navigate("/")}
                                className="group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gray-950 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-gray-800 active:scale-[0.98]"
                            >
                                Start using Shortify

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 10a.75.75 0 01.75-.75h10.69l-3.22-3.22a.75.75 0 111.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06 1.06l3.22-3.22H3.75A.75.75 0 013 10Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>

                            <button
                                onClick={() => {
                                    document
                                        .getElementById("maker")
                                        ?.scrollIntoView({
                                            behavior: "smooth"
                                        });
                                }}
                                className="cursor-pointer rounded-xl border border-gray-200 px-6 py-3.5 text-sm font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
                            >
                                Meet the maker
                            </button>

                        </div>

                    </div>

                </div>
            </section>


            {/* =========================================================
                SHORTIFY INTRO
            ========================================================= */}

            <section className="border-b border-gray-100 bg-white py-24 lg:py-32">

                <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center lg:px-8">

                    <div>

                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-600">
                            What is Shortify?
                        </p>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            More than just a URL shortener.
                        </h2>

                        <p className="mt-6 max-w-xl text-base leading-7 text-gray-500">
                            Shortify is a link management platform designed
                            to make working with URLs faster and more
                            organized.
                        </p>

                        <p className="mt-4 max-w-xl text-base leading-7 text-gray-500">
                            What starts with shortening a long URL can become
                            an entire workflow — organizing links, tracking
                            their performance, generating QR codes, and
                            keeping everything connected to one personal
                            workspace.
                        </p>

                    </div>


                    {/* Product philosophy card */}

                    <div className="relative">

                        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-3 shadow-[0_25px_80px_rgba(0,0,0,0.07)]">

                            <div className="rounded-2xl border border-gray-200 bg-white p-7">

                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400">

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                className="h-5 w-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
                                                />

                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
                                                />
                                            </svg>

                                        </div>

                                        <div>
                                            <p className="text-sm font-bold">
                                                Shortify
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                Link workspace
                                            </p>
                                        </div>

                                    </div>

                                    <span className="rounded-full bg-yellow-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-yellow-700">
                                        Simple
                                    </span>

                                </div>


                                <div className="mt-8 space-y-3">

                                    <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-4">
                                        <div className="h-2 w-2 rounded-full bg-yellow-400" />

                                        <div className="h-3 w-40 rounded bg-gray-100" />
                                    </div>

                                    <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-4">
                                        <div className="h-2 w-2 rounded-full bg-gray-200" />

                                        <div className="h-3 w-52 rounded bg-gray-100" />
                                    </div>

                                    <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-4">
                                        <div className="h-2 w-2 rounded-full bg-gray-200" />

                                        <div className="h-3 w-32 rounded bg-gray-100" />
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================================
                WHY SHORTIFY
            ========================================================= */}

            <section className="bg-gray-50 py-24 lg:py-32">

                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="max-w-2xl">

                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-600">
                            Why we built it
                        </p>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            Small problem.
                            <span className="block text-gray-400">
                                Bigger possibilities.
                            </span>
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-500">
                            URLs are everywhere, but managing them doesn't
                            have to be messy.
                        </p>

                    </div>


                    <div className="mt-14 grid gap-5 md:grid-cols-3">

                        <article className="rounded-2xl border border-gray-200 bg-white p-7">

                            <span className="text-xs font-bold text-gray-300">
                                01
                            </span>

                            <h3 className="mt-8 text-lg font-bold">
                                Simplicity first
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Useful software shouldn't make users learn
                                the software before they can use it.
                                Shortify keeps the experience straightforward.
                            </p>

                        </article>


                        <article className="rounded-2xl border border-gray-200 bg-white p-7">

                            <span className="text-xs font-bold text-gray-300">
                                02
                            </span>

                            <h3 className="mt-8 text-lg font-bold">
                                Built to grow
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Shortening is only the beginning. The platform
                                is designed around the broader idea of
                                managing links as a workflow.
                            </p>

                        </article>


                        <article className="rounded-2xl border border-gray-200 bg-white p-7">

                            <span className="text-xs font-bold text-gray-300">
                                03
                            </span>

                            <h3 className="mt-8 text-lg font-bold">
                                Technology with purpose
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Every technical decision should ultimately
                                improve reliability, usability, performance,
                                or the experience of the person using it.
                            </p>

                        </article>

                    </div>

                </div>

            </section>


            {/* =========================================================
                MAKER
            ========================================================= */}

            <section
                id="maker"
                className="border-t border-gray-100 bg-white py-24 lg:py-32"
            >

                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

                        {/* Profile */}

                        <div>

                            <div className="relative mx-auto max-w-sm lg:mx-0">

                                <div className="aspect-square overflow-hidden rounded-3xl bg-gray-950 p-8">

                                    <div className="flex h-full flex-col justify-between">

                                        <div className="flex items-center justify-between">

                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400 text-xl font-black text-gray-950">
                                                K
                                            </div>

                                            <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                                                Maker
                                            </span>

                                        </div>

                                        <div>

                                            <p className="text-sm font-medium text-gray-400">
                                                Shortify
                                            </p>

                                            <h3 className="mt-2 text-3xl font-bold text-white">
                                                Kartikeya Mishra
                                            </h3>

                                            <p className="mt-2 text-sm text-gray-500">
                                                Full-stack developer &amp;
                                                technology enthusiast
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Story */}

                        <div>

                            <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-600">
                                The maker
                            </p>

                            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                                Built by a developer who likes
                                <span className="text-gray-400">
                                    {" "}building things.
                                </span>
                            </h2>

                            <p className="mt-6 text-base leading-7 text-gray-500">
                                I'm Kartikeya Mishra, a student at
                                <span className="font-semibold text-gray-700">
                                    {" "}Hewett Polytechnic
                                </span>
                                {" "}and the developer behind Shortify.
                            </p>

                            <p className="mt-4 text-base leading-7 text-gray-500">
                                I enjoy understanding how software works
                                beyond just writing code — from designing
                                interfaces and building APIs to working with
                                databases, deployment, infrastructure, and
                                the systems that connect everything together.
                            </p>

                            <p className="mt-4 text-base leading-7 text-gray-500">
                                Shortify is one of those projects where
                                product development and engineering meet:
                                a real application built to solve a simple
                                problem while exploring what goes into
                                building software that can grow beyond a
                                local development environment.
                            </p>


                            {/* Skills */}

                            <div className="mt-9 flex flex-wrap gap-2">

                                {[
                                    "Full-stack Development",
                                    "Backend Development",
                                    "DevOps",
                                    "System Design",
                                    "REST APIs",
                                    "Databases",
                                    "Git & GitHub",
                                    "Cloud & Deployment"
                                ].map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-full border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs font-semibold text-gray-600"
                                    >
                                        {skill}
                                    </span>
                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================================
                TECHNOLOGY
            ========================================================= */}

            <section className="border-t border-gray-100 bg-gray-50 py-24 lg:py-32">

                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="max-w-2xl">

                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-600">
                            Behind Shortify
                        </p>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            Engineering is part of
                            <span className="block text-gray-400">
                                the product.
                            </span>
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-500">
                            Shortify is being developed as a full-stack
                            application, with attention to both the user
                            experience and the systems behind it.
                        </p>

                    </div>


                    <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                        {[
                            {
                                title: "Frontend",
                                description:
                                    "A responsive interface focused on clarity, accessibility, and a smooth user experience.",
                                items: ["React", "Tailwind CSS", "JavaScript"]
                            },
                            {
                                title: "Backend",
                                description:
                                    "API-driven architecture responsible for authentication, URLs, users, and application logic.",
                                items: ["Node.js", "Express.js", "REST APIs"]
                            },
                            {
                                title: "Data",
                                description:
                                    "Structured persistence and data access designed around the application's actual requirements.",
                                items: ["MongoDB", "Mongoose", "Database Design"]
                            },
                            {
                                title: "Engineering",
                                description:
                                    "Development practices that make the application easier to maintain, deploy, and evolve.",
                                items: ["Git", "GitHub", "Docker", "DevOps"]
                            }
                        ].map((item) => (
                            <article
                                key={item.title}
                                className="rounded-2xl border border-gray-200 bg-white p-7"
                            >

                                <h3 className="text-lg font-bold">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-gray-500">
                                    {item.description}
                                </p>

                                <div className="mt-6 space-y-2">

                                    {item.items.map((technology) => (
                                        <div
                                            key={technology}
                                            className="flex items-center gap-2 text-xs font-semibold text-gray-600"
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                                            {technology}
                                        </div>
                                    ))}

                                </div>

                            </article>
                        ))}

                    </div>

                </div>

            </section>


            {/* =========================================================
                VALUES
            ========================================================= */}

            <section className="border-t border-gray-100 bg-white py-24 lg:py-32">

                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="grid gap-16 lg:grid-cols-2">

                        <div>

                            <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-600">
                                Our approach
                            </p>

                            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                                Build useful.
                                <span className="block text-gray-400">
                                    Keep improving.
                                </span>
                            </h2>

                        </div>


                        <div className="space-y-10">

                            <div className="flex gap-5">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-yellow-50 text-sm font-bold text-yellow-600">
                                    01
                                </div>

                                <div>
                                    <h3 className="font-bold">
                                        Start with the user
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        Technology matters, but the person
                                        using the product matters more.
                                    </p>
                                </div>

                            </div>


                            <div className="flex gap-5">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-yellow-50 text-sm font-bold text-yellow-600">
                                    02
                                </div>

                                <div>
                                    <h3 className="font-bold">
                                        Prefer clarity over complexity
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        Good engineering isn't about making
                                        things complicated. It's about
                                        handling complexity without exposing
                                        unnecessary complexity to the user.
                                    </p>
                                </div>

                            </div>


                            <div className="flex gap-5">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-yellow-50 text-sm font-bold text-yellow-600">
                                    03
                                </div>

                                <div>
                                    <h3 className="font-bold">
                                        Keep learning
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        Shortify is also an engineering
                                        journey — continuously learning,
                                        experimenting, and improving the
                                        systems behind the product.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================================
                VISION
            ========================================================= */}

            <section className="border-t border-gray-100 bg-gray-950 py-24 lg:py-32">

                <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">

                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-400">
                        What's next
                    </p>

                    <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Shortify is just
                        <span className="text-gray-500">
                            {" "}getting started.
                        </span>
                    </h2>

                    <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
                        The goal isn't simply to create another URL shortener.
                        It's to build a useful, reliable, and increasingly
                        capable workspace around links — one improvement at
                        a time.
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-3">

                        <button
                            onClick={() => navigate("/")}
                            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3.5 text-sm font-bold text-gray-950 transition-all hover:bg-yellow-300 active:scale-[0.98]"
                        >
                            Try Shortify

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-4 w-4"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 10a.75.75 0 01.75-.75h10.69l-3.22-3.22a.75.75 0 111.06-1.06l3.22 3.22H3.75A.75.75 0 013 10Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                    </div>

                </div>

            </section>


            {/* =========================================================
                FOOTNOTE
            ========================================================= */}

            <section className="border-t border-gray-800 bg-gray-950 pb-10">

                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 pt-8 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between lg:px-8">

                    <p>
                        Shortify — simple links, smarter workflows.
                    </p>

                    <p>
                        Built by Kartikeya Mishra.
                    </p>

                </div>

            </section>

        </main>
    );
};

export default About;
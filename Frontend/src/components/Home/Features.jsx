import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthPanel from "../Auth/AuthPanel";

const features = [
    {
        number: "01",
        title: "Instant URL shortening",
        description:
            "Turn long URLs into clean, shareable links in seconds.",
        icon: "link"
    },
    {
        number: "02",
        title: "Link management",
        description:
            "Keep your shortened URLs organized and access them from one place.",
        icon: "folder"
    },
    {
        number: "03",
        title: "Click analytics",
        description:
            "Understand how your links perform with useful click insights.",
        icon: "chart"
    },
    {
        number: "04",
        title: "QR code generation",
        description:
            "Turn your short links into QR codes for posters, packaging, events, and more.",
        icon: "qr",
        locked: true
    },
    {
        number: "05",
        title: "Share anywhere",
        description:
            "Use your links across social media, messages, documents, campaigns, and websites.",
        icon: "share"
    },
    {
        number: "06",
        title: "Personal workspace",
        description:
            "Sign in and keep your links, tools, and activity together in one workspace.",
        icon: "user",
        locked: true
    }
];

const Icon = ({ type }) => {
    const common = "h-5 w-5";

    if (type === "link") {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className={common}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 00-6.38 0l-3 3a4.5 4.5 0 006.38 6.364l1.5-1.5"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.81 15.312a4.5 4.5 0 006.38 0l3-3a4.5 4.5 0 00-6.38-6.364l-1.5 1.5"
                />
            </svg>
        );
    }

    if (type === "folder") {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className={common}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h5l1.5 2h10v8.5a2 2 0 01-2 2h-14a2 2 0 01-2-2v-8.5a2 2 0 012-2z"
                />
            </svg>
        );
    }

    if (type === "chart") {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className={common}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 19V5m0 14h16M8 16v-5m4 5V7m4 9v-8"
                />
            </svg>
        );
    }

    if (type === "qr") {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className={common}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2z"
                />
            </svg>
        );
    }

    if (type === "share") {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className={common}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 12l10-6M7 12l10 6M7 12a3 3 0 11-3 3 3 3 0 013-3zm10-6a3 3 0 11-3-3 3 3 0 013 3zm0 12a3 3 0 11-3-3 3 3 0 013 3z"
                />
            </svg>
        );
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            className={common}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 20.25a7.5 7.5 0 0115 0"
            />
        </svg>
    );
};

const Features = () => {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const navigate = useNavigate();

    // =========================
    // CHECK AUTHENTICATION
    // =========================
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/users/me",
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );

                if (!response.ok) {
                    setUser(null);
                    return;
                }

                const result = await response.json();
                setUser(result.user);
            } catch (error) {
                console.error(
                    "Features authentication check failed:",
                    error
                );

                setUser(null);
            } finally {
                setAuthLoading(false);
            }
        };

        checkAuth();
    }, []);

    // =========================
    // AUTH PANEL
    // =========================
    const openAuth = () => {
        setIsAuthOpen(true);
    };

    // =========================
    // DASHBOARD
    // =========================
    const goToDashboard = () => {
        navigate("/dashboard");
    };

    return (
        <>
            <section
                id="features"
                className="border-t border-gray-100 bg-white py-24 lg:py-32"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    {/* ================= HEADER ================= */}

                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-600">
                            Features
                        </p>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                            Everything around your links,
                            <span className="block text-gray-400">
                                in one place.
                            </span>
                        </h2>

                        <p className="mt-5 text-base leading-7 text-gray-500">
                            Start with the basics and unlock more tools as your
                            link workflow grows.
                        </p>
                    </div>

                    {/* ================= FEATURES ================= */}

                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {features.map((feature) => (
                            <article
                                key={feature.number}
                                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
                            >
                                <div className="flex items-center justify-between">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 transition-all group-hover:bg-yellow-400 group-hover:text-gray-950">
                                        <Icon type={feature.icon} />
                                    </div>

                                    <div className="flex items-center gap-2">

                                        {feature.locked && (
                                            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                                                Account
                                            </span>
                                        )}

                                        <span className="text-xs font-semibold text-gray-300">
                                            {feature.number}
                                        </span>

                                    </div>
                                </div>

                                <h3 className="mt-8 text-lg font-bold text-gray-950">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-gray-500">
                                    {feature.description}
                                </p>

                                <div className="absolute -bottom-12 -right-12 h-28 w-28 rounded-full bg-yellow-50 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
                            </article>
                        ))}

                    </div>

                    {/* ================= ACCOUNT CTA ================= */}

                    <div className="mt-12 flex flex-col gap-5 rounded-2xl bg-gray-950 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">

                        <div>
                            <p className="text-lg font-semibold text-white">
                                {user
                                    ? "Ready to manage your links?"
                                    : "Ready to unlock the full toolkit?"}
                            </p>

                            <p className="mt-1 text-sm text-gray-400">
                                {user
                                    ? "Head to your dashboard to manage your links and access your workspace."
                                    : "Sign in to keep your links organized and access additional tools like QR code generation."}
                            </p>
                        </div>

                        {authLoading ? (
                            <div className="h-12 w-40 shrink-0 animate-pulse rounded-xl bg-gray-800" />
                        ) : user ? (
                            <button
                                type="button"
                                onClick={goToDashboard}
                                className="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-gray-950 transition-all hover:bg-yellow-300 active:scale-[0.98]"
                            >
                                Dashboard

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 10a.75.75 0 01.75-.75h10.69l-3.22-3.22a.75.75 0 01.1-1.06.75.75 0 011.06.1l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06.1.75.75 0 01-.1-1.06l3.22-3.22H3.75A.75.75 0 013 10Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={openAuth}
                                className="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-gray-950 transition-all hover:bg-yellow-300 active:scale-[0.98]"
                            >
                                Sign in to get started

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 10a.75.75 0 01.75-.75h10.69l-3.22-3.22a.75.75 0 111.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22H3.75A.75.75 0 013 10Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        )}

                    </div>

                </div>
            </section>

            {/* ================= AUTH PANEL ================= */}

            <AuthPanel
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
            />
        </>
    );
};

export default Features;

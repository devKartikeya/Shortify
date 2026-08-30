import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthPanel from "./Auth/AuthPanel";

const navItems = [
    {
        name: "Home",
        id: "hero"
    },
    {
        name: "Features",
        id: "features"
    },
    {
        name: "How it works",
        id: "how-it-works"
    },
    {
        name: "About",
        id: "about"
    }
];

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("home");
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
                    "Navbar authentication check failed:",
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
    // SECTION OBSERVER
    // =========================
    useEffect(() => {
        const sections = navItems
            .map((item) =>
                document.getElementById(item.id)
            )
            .filter(Boolean);
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter(
                        (entry) =>
                            entry.isIntersecting
                    )
                    .sort(
                        (a, b) =>
                            b.intersectionRatio -
                            a.intersectionRatio
                    );
                if (visibleSections.length > 0) {

                    setActiveSection(
                        visibleSections[0].target.id
                    );
                }
            },
            {
                rootMargin: "-80px 0px -45% 0px",
                threshold: [0.1, 0.25, 0.5]
            }
        );
        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            sections.forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, []);

    // =========================
    // MOBILE MENU
    // =========================
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    // =========================
    // NAVIGATION
    // =========================
    const handleNavClick = (id) => {
        setActiveSection(id);
        setIsMobileMenuOpen(false);
        const section =
            document.getElementById(id);
        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };

    // =========================
    // AUTH PANEL
    // =========================

    const openAuth = () => {
        setIsMobileMenuOpen(false);
        setIsAuthOpen(true);
    };
    // =========================
    // DASHBOARD
    // =========================
    const goToDashboard = () => {
        setIsMobileMenuOpen(false);
        navigate("/dashboard");
    };
    return (
        <>
            {/* ================= NAVBAR ================= */}
            <nav className="fixed left-0 top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                    {/* ================= LOGO ================= */}
                    <button
                        onClick={() =>
                            handleNavClick("home")
                        }
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-5 w-5 text-gray-950"
                            >
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                            </svg>
                        </div>

                        <span className="text-xl font-bold tracking-tight text-gray-950">
                            Shortify
                        </span>

                    </button>


                    {/* ================= DESKTOP NAV ================= */}

                    <div className="hidden items-center gap-8 md:flex">

                        {navItems.map((item) => {

                            const isActive =
                                activeSection === item.id;


                            return (
                                <button
                                    key={item.id}
                                    onClick={() =>
                                        handleNavClick(
                                            item.id
                                        )
                                    }
                                    className={`relative cursor-pointer py-2 text-sm font-medium transition-colors ${isActive
                                        ? "text-gray-950"
                                        : "text-gray-500 hover:text-gray-950"
                                        } `}
                                >

                                    {item.name}
                                    <span
                                        className={`absolute - bottom-[18px] left-0 h-0.5 bg-yellow-400 transition-all duration-300 ${isActive
                                            ? "w-full"
                                            : "w-0"
                                            } `}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    {/* ================= DESKTOP ACTIONS ================= */}

                    <div className="hidden items-center gap-3 md:flex">
                        {/* Auth loading */}
                        {authLoading ? (
                            <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
                        ) : user ? (
                            <>
                                {/* Dashboard */}
                                <button
                                    onClick={goToDashboard}
                                    className="cursor-pointer px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:text-gray-950"
                                >
                                    Dashboard
                                </button>
                                {/* Get started */}
                                <button
                                    onClick={goToDashboard}
                                    className="group flex cursor-pointer items-center gap-2 rounded-lg bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-gray-800"
                                >
                                    Get started
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3 10a.75.75 0 0 1 .75-.75h10.69l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06 1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Login */}
                                <button
                                    onClick={openAuth}
                                    className="cursor-pointer px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:text-gray-950"
                                >
                                    Log in
                                </button>

                                {/* Get started */}
                                <button
                                    onClick={openAuth}
                                    className="group flex cursor-pointer items-center gap-2 rounded-lg bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-gray-800"
                                >
                                    Get started

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3 10a.75.75 0 0 1 .75-.75h10.69l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l3.22 3.22H3.75A.75.75 0 0 1 3 10Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>

                    {/* ================= MOBILE HAMBURGER ================= */}
                    <button
                        onClick={() =>
                            setIsMobileMenuOpen(
                                (prev) => !prev
                            )
                        }
                        aria-label={
                            isMobileMenuOpen
                                ? "Close menu"
                                : "Open menu"
                        }
                        aria-expanded={
                            isMobileMenuOpen
                        }
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 md:hidden"
                    >
                        {isMobileMenuOpen ? (
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
                                    d="M6 6l12 12M18 6L6 18"
                                />
                            </svg>
                        ) : (
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
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>
                {/* ================= MOBILE MENU ================= */}

                <div
                    className={`absolute left-0 top-full z-[60] w-full overflow-hidden border-t border-gray-100 bg-white shadow-lg transition-all duration-300 md:hidden ${isMobileMenuOpen
                        ? "visible max-h-[500px] translate-y-0 opacity-100"
                        : "invisible max-h-0 -translate-y-2 opacity-0"
                        }`}
                >
                    <div className="px-6 pb-6 pt-4">
                        {/* Mobile Navigation */}
                        <div className="space-y-1">
                            {navItems.map((item) => {
                                const isActive =
                                    activeSection === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() =>
                                            handleNavClick(item.id)
                                        }
                                        className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3.5 text-left text-sm font-medium transition-all ${isActive
                                            ? "bg-yellow-50 text-gray-950"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                                            }`}
                                    >

                                        <span>
                                            {item.name}
                                        </span>

                                        {isActive && (
                                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Divider */}
                        <div className="my-5 h-px bg-gray-100" />
                        {/* Mobile Auth */}
                        {authLoading ? (
                            <div className="h-12 animate-pulse rounded-lg bg-gray-100" />
                        ) : user ? (
                            <button
                                onClick={goToDashboard}
                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-950 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                            >
                                Dashboard
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 10a.75.75 0 0 1 .75-.75h10.69l-3.22-3.22a.75.75 0 1 1 1.06-1.06l3.22 3.22H3.75A.75.75 0 0 1 3 10Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={openAuth}
                                    className="cursor-pointer rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50"
                                >
                                    Log in
                                </button>
                                <button
                                    onClick={openAuth}
                                    className="cursor-pointer rounded-lg bg-gray-950 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                                >
                                    Get started
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* ================= AUTH PANEL ================= */}
            <AuthPanel
                isOpen={isAuthOpen}
                onClose={() =>
                    setIsAuthOpen(false)
                }
            />
        </>
    );
};
export default Navbar;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthPanel from "./Auth/AuthPanel";

const navItems = [
    {
        name: "Home",
        id: "home"
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

    useEffect(() => {
        const sections = navItems
            .map((item) => document.getElementById(item.id))
            .filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio - a.intersectionRatio
                    );

                if (visibleSections.length > 0) {
                    setActiveSection(visibleSections[0].target.id);
                }
            },
            {
                rootMargin: "-80px 0px -45% 0px",
                threshold: [0.1, 0.25, 0.5]
            }
        );

        sections.forEach((section) => observer.observe(section));
        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    const handleNavClick = (id) => {
        setActiveSection(id);

        const section = document.getElementById(id);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };

    return (
        <>
            <nav className="fixed left-0 top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                    {/* Logo */}
                    <button
                        onClick={() => handleNavClick("home")}
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

                    {/* Navigation */}
                    <div className="hidden items-center gap-8 md:flex">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id)}
                                    className={`relative py-2 text-sm cursor-pointer font-medium transition-colors ${isActive
                                        ? "text-gray-950"
                                        : "text-gray-500 hover:text-gray-950"
                                        }`}
                                >
                                    {item.name}

                                    {/* Active underline */}
                                    <span
                                        className={`absolute -bottom-[18px] left-0 h-0.5 bg-yellow-400 transition-all duration-300 ${isActive
                                            ? "w-full"
                                            : "w-0"
                                            }`}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsAuthOpen(true)}
                            className="hidden px-4 py-2 text-sm font-semibold cursor-pointer text-gray-700 transition-colors hover:text-gray-950 sm:block"
                        >
                            Log in
                        </button>
                        <button
                            onClick={() => setIsAuthOpen(true)}
                            className="group flex items-center gap-2 rounded-lg cursor-pointer bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-gray-800"
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
                                    d="M3 10a.75.75 0 0 1 .75-.75h10.69l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        {/* Mobile menu */}
                        <button
                            className="ml-1 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 md:hidden"
                            aria-label="Open menu"
                        >
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
                        </button>
                    </div>
                </div>
            </nav>
            <AuthPanel
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
            />
        </>
    );
};

export default Navbar;
import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    const productLinks = [
        { name: "URL Shortener", href: "#" },
        { name: "Dashboard", href: "#" },
        { name: "Analytics", href: "#" },
        { name: "Link Management", href: "#" },
    ];

    const resourceLinks = [
        { name: "How it works", href: "#how-it-works" },
        { name: "Features", href: "#features" },
        { name: "Documentation", href: "#" },
        { name: "API", href: "#" },
    ];

    const companyLinks = [
        { name: "About", href: "#" },
        { name: "Contact", href: "#" },
        { name: "GitHub", href: "#" },
        { name: "Status", href: "#" },
    ];

    const legalLinks = [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
    ];

    return (
        <footer className="border-t border-gray-200 bg-gray-950 text-white">

            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">

                <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

                    {/* Brand */}
                    <div className="max-w-sm">

                        <a
                            href="/"
                            className="inline-flex items-center gap-3"
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

                            <span className="text-xl font-bold tracking-tight">
                                Shortify
                            </span>
                        </a>

                        <p className="mt-6 text-sm leading-7 text-gray-400">
                            Make your links shorter, smarter, and easier to
                            manage. Shortify gives you a simple way to create,
                            organize, and track your shortened URLs.
                        </p>

                        {/* Social links */}
                        <div className="mt-7 flex items-center gap-3">

                            {/* GitHub */}
                            <a
                                href="https://github.com/devKartikeya"
                                aria-label="GitHub"
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 text-gray-400 transition-all hover:border-gray-700 hover:bg-gray-900 hover:text-white"
                            >
                                <FaGithub size={20}/>
                            </a>

                            {/* LinkedIn */}
                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 text-gray-400 transition-all hover:border-gray-700 hover:bg-gray-900 hover:text-white"
                            >
                                <FaLinkedin size={20} className="hover:text-blue-400"/>
                            </a>

                            {/* X / Twitter */}
                            <a
                                href="#"
                                aria-label="X"
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 text-gray-400 transition-all hover:border-gray-700 hover:bg-gray-900 hover:text-white"
                            >
                                <FaTwitter size={20} className="hover:text-black"/>
                            </a>

                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="text-sm font-semibold text-white">
                            Product
                        </h3>

                        <ul className="mt-6 space-y-4">
                            {productLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-gray-400 transition-colors hover:text-yellow-400"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-sm font-semibold text-white">
                            Resources
                        </h3>

                        <ul className="mt-6 space-y-4">
                            {resourceLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-gray-400 transition-colors hover:text-yellow-400"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold text-white">
                            Company
                        </h3>

                        <ul className="mt-6 space-y-4">
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-gray-400 transition-colors hover:text-yellow-400"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Newsletter */}
                <div className="mt-16 border-t border-gray-800 pt-12">

                    <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

                        <div>
                            <h3 className="text-lg font-semibold">
                                Stay in the loop.
                            </h3>

                            <p className="mt-2 max-w-lg text-sm leading-6 text-gray-400">
                                Get product updates, useful tips, and
                                occasional news from Shortify.
                            </p>
                        </div>

                        <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="min-w-0 flex-1 rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-yellow-400"
                            />

                            <button
                                type="submit"
                                className="rounded-lg bg-yellow-400 px-5 py-3 text-sm font-semibold text-gray-950 transition-colors hover:bg-yellow-300"
                            >
                                Subscribe
                            </button>

                        </form>

                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">

                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} Shortify. All rights
                        reserved.
                    </p>

                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {legalLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-xs text-gray-500 transition-colors hover:text-gray-300"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                </div>
            </div>

        </footer>
    );
};

export default Footer;
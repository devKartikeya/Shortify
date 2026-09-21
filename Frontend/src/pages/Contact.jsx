import React from "react";
import {
    Mail,
    MessageCircle,
    Clock3,
    ArrowUpRight,
    Send,
    MapPin
} from "lucide-react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Contact = () => {
    return (
        <main className="min-h-screen bg-white text-slate-900">

            {/* ================= HERO ================= */}
            <section className="relative overflow-hidden pt-28 pb-16">

                {/* Background decoration */}
                <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-yellow-100/70 blur-3xl" />
                <div className="absolute top-20 -right-32 h-80 w-80 rounded-full bg-amber-100/60 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="max-w-3xl">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-700">
                            <MessageCircle size={16} />
                            We're here to help
                        </div>

                        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                            Let's talk about
                            <span className="block text-yellow-500">
                                Shortify.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-500">
                            Have a question, found an issue, or simply want to
                            share your feedback? We'd love to hear from you.
                            Send us a message and we'll get back to you.
                        </p>
                    </div>

                </div>
            </section>


            {/* ================= CONTACT CONTENT ================= */}
            <section className="pb-24">

                <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">

                    {/* ================= LEFT ================= */}
                    <div>

                        <div className="mb-8">
                            <p className="text-sm font-semibold uppercase tracking-widest text-yellow-500">
                                Get in touch
                            </p>

                            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                                We'd love to hear from you.
                            </h2>

                            <p className="mt-4 max-w-md leading-7 text-slate-500">
                                Whether you have a question about Shortify,
                                need help with something, or have an idea to
                                make it better, feel free to reach out.
                            </p>
                        </div>


                        {/* Contact Cards */}
                        <div className="space-y-4">

                            {/* Email */}
                            <a
                                href="mailto:support@shortify.com"
                                className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-300 hover:shadow-lg"
                            >
                                <div className="flex items-center gap-4">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 transition-colors group-hover:bg-yellow-500 group-hover:text-white">
                                        <Mail size={21} />
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-400">
                                            Email us
                                        </p>

                                        <p className="mt-1 font-medium text-slate-800">
                                            support@shortify.com
                                        </p>
                                    </div>

                                </div>

                                <ArrowUpRight
                                    size={20}
                                    className="text-slate-300 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-yellow-500"
                                />
                            </a>


                            {/* Response */}
                            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                                    <Clock3 size={21} />
                                </div>

                                <div>
                                    <p className="text-sm text-slate-400">
                                        Response time
                                    </p>

                                    <p className="mt-1 font-medium text-slate-800">
                                        Usually within 24 hours
                                    </p>
                                </div>

                            </div>


                            {/* Location */}
                            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                                    <MapPin size={21} />
                                </div>

                                <div>
                                    <p className="text-sm text-slate-400">
                                        Availability
                                    </p>

                                    <p className="mt-1 font-medium text-slate-800">
                                        Online · Worldwide
                                    </p>
                                </div>

                            </div>

                        </div>


                        {/* Small note */}
                        <div className="mt-8 rounded-2xl bg-slate-50 p-6">
                            <p className="text-sm leading-6 text-slate-500">
                                <span className="font-semibold text-slate-700">
                                    Quick tip:
                                </span>{" "}
                                If you're reporting a problem, include the
                                short URL or describe what happened. It'll
                                help us understand the issue faster.
                            </p>
                        </div>

                        {/* ================= SOCIAL LINKS ================= */}
                        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div>
                                <p className="text-sm font-semibold uppercase tracking-widest text-yellow-500">
                                    Connect with us
                                </p>

                                <h3 className="mt-2 text-lg font-semibold text-slate-800">
                                    Follow Shortify
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Stay connected for updates, new features, and everything we're
                                    building around Shortify.
                                </p>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-3">

                                {/* GitHub */}
                                <a
                                    href="https://github.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Shortify on GitHub"
                                    className="group flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-slate-900 hover:text-white hover:shadow-md"
                                >
                                    <FaGithub
                                        size={19}
                                        className="transition-transform duration-300 group-hover:scale-110"
                                    />
                                </a>

                                {/* LinkedIn */}
                                <a
                                    href="https://www.linkedin.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Shortify on LinkedIn"
                                    className="group flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-600 hover:text-white hover:shadow-md"
                                >
                                    <FaLinkedin
                                        size={19}
                                        className="transition-transform duration-300 group-hover:scale-110"
                                    />
                                </a>

                                {/* Twitter / X */}
                                <a
                                    href="https://twitter.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Shortify on X"
                                    className="group flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-black hover:text-white hover:shadow-md"
                                >
                                    <FaTwitter
                                        size={18}
                                        className="transition-transform duration-300 group-hover:scale-110"
                                    />
                                </a>

                            </div>

                        </div>

                    </div>


                    {/* ================= FORM ================= */}
                    <div className="relative">

                        {/* Glow */}
                        <div className="absolute -inset-2 rounded-[2rem] bg-yellow-100/40 blur-2xl" />

                        <div className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 lg:p-10">

                            <div className="mb-8">
                                <h2 className="text-2xl font-semibold">
                                    Send us a message
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Fill out the form below and we'll get back
                                    to you as soon as possible.
                                </p>
                            </div>


                            <form className="space-y-6">

                                {/* Name + Email */}
                                <div className="grid gap-5 sm:grid-cols-2">

                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="mb-2 block text-sm font-medium text-slate-700"
                                        >
                                            Your name
                                        </label>

                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                                        />
                                    </div>


                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-sm font-medium text-slate-700"
                                        >
                                            Email address
                                        </label>

                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                                        />
                                    </div>

                                </div>


                                {/* Subject */}
                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="mb-2 block text-sm font-medium text-slate-700"
                                    >
                                        Subject
                                    </label>

                                    <input
                                        id="subject"
                                        type="text"
                                        placeholder="How can we help?"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                                    />
                                </div>


                                {/* Message */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="mb-2 block text-sm font-medium text-slate-700"
                                    >
                                        Message
                                    </label>

                                    <textarea
                                        id="message"
                                        rows="6"
                                        placeholder="Tell us what's on your mind..."
                                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                                    />
                                </div>


                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-200"
                                >
                                    Send message

                                    <Send
                                        size={17}
                                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                    />
                                </button>


                                <p className="text-center text-xs leading-5 text-slate-400">
                                    By submitting this form, you agree to be
                                    contacted regarding your message.
                                </p>

                            </form>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= BOTTOM CTA ================= */}
            <section className="border-t border-slate-100 bg-slate-50">

                <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-8">

                    <p className="text-sm font-semibold uppercase tracking-widest text-yellow-500">
                        Need Shortify?
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Short links. Less clutter. More control.
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-slate-500">
                        Create clean, memorable short links and keep track of
                        how they're performing.
                    </p>

                    <button
                        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-200"
                    >
                        Get started

                        <ArrowUpRight size={17} />
                    </button>

                </div>

            </section>

        </main>
    );
};

export default Contact;
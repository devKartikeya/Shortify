import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    Search,
    ChevronDown,
    ArrowRight,
    Link2,
    BarChart3,
    UserRound,
    ShieldCheck,
    Wrench,
    BookOpen,
    Zap,
    CircleHelp,
    Mail,
    MessageCircle,
    ExternalLink,
} from "lucide-react";

const categories = [
    {
        title: "Getting Started",
        description: "Everything you need to start using Shortify.",
        icon: BookOpen,
        articles: 4,
    },
    {
        title: "Short Links",
        description: "Create, manage and understand your short links.",
        icon: Link2,
        articles: 6,
    },
    {
        title: "Analytics & Clicks",
        description: "Understand clicks and link performance.",
        icon: BarChart3,
        articles: 4,
    },
    {
        title: "Account & Profile",
        description: "Manage your profile and account settings.",
        icon: UserRound,
        articles: 5,
    },
    {
        title: "Security",
        description: "Passwords, authentication and account security.",
        icon: ShieldCheck,
        articles: 4,
    },
    {
        title: "Troubleshooting",
        description: "Solutions for common problems and errors.",
        icon: Wrench,
        articles: 6,
    },
];

const faqs = [
    {
        category: "Getting Started",
        question: "What is Shortify?",
        answer:
            "Shortify is a URL shortening platform that lets you turn long URLs into short, shareable links. You can also manage your links and track their performance from your dashboard.",
    },
    {
        category: "Getting Started",
        question: "How do I create a short link?",
        answer:
            "Enter your original URL into the URL shortening form and submit it. Shortify will generate a unique short link that you can share with others.",
    },
    {
        category: "Short Links",
        question: "Can I manage the links I've created?",
        answer:
            "Yes. Once you're logged in, you can access your dashboard to view and manage the links associated with your account.",
    },
    {
        category: "Short Links",
        question: "What happens when someone opens my short link?",
        answer:
            "Shortify receives the short code, resolves it to the original URL and redirects the visitor to the destination URL.",
    },
    {
        category: "Analytics & Clicks",
        question: "How are clicks counted?",
        answer:
            "Shortify tracks link activity and aggregates click counts before synchronizing them with persistent storage. This allows click activity to be handled efficiently even as traffic increases.",
    },
    {
        category: "Analytics & Clicks",
        question: "Why might my click count take a little time to update?",
        answer:
            "Click activity may be temporarily accumulated before being synchronized with persistent storage. Because of this, the displayed total can occasionally take a short amount of time to reflect the latest activity.",
    },
    {
        category: "Account & Profile",
        question: "How do I change my password?",
        answer:
            "Open your profile settings and use the Change Password section. You'll need to provide your current password and choose a new password.",
    },
    {
        category: "Account & Profile",
        question: "How do I log out?",
        answer:
            "Use the Logout option from your account interface. Shortify will securely clear your authentication session.",
    },
    {
        category: "Account & Profile",
        question: "Can I delete my account?",
        answer:
            "Yes. Account deletion is available from your profile's Danger Zone. Because this is a destructive action, Shortify asks you to confirm before proceeding.",
    },
    {
        category: "Security",
        question: "How does Shortify protect my account?",
        answer:
            "Authentication is handled through protected sessions and server-side authentication checks. Passwords are not stored as plain text.",
    },
    {
        category: "Security",
        question: "Should I share my account credentials?",
        answer:
            "No. Never share your password or authentication credentials with anyone. If you believe your account may have been compromised, change your password immediately.",
    },
    {
        category: "Troubleshooting",
        question: "My short link isn't working. What should I do?",
        answer:
            "First, verify that the short link is correct and that the destination URL is valid. If the issue continues, contact support and include the short URL so the problem can be investigated.",
    },
    {
        category: "Troubleshooting",
        question: "I can't log in. What should I do?",
        answer:
            "Check that you're using the correct email and password. If you've forgotten your password, use the available password recovery flow. If the issue persists, contact support.",
    },
    {
        category: "Troubleshooting",
        question: "My dashboard isn't loading properly.",
        answer:
            "Try refreshing the page and checking your internet connection. If the problem continues, contact support with a description of what you were doing when the issue occurred.",
    },
];

const HelpSupport = () => {
    const [search, setSearch] = useState("");
    const [openFaq, setOpenFaq] = useState(null);
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredFaqs = useMemo(() => {
        const query = search.trim().toLowerCase();

        return faqs.filter((faq) => {
            const matchesCategory =
                activeCategory === "All" ||
                faq.category === activeCategory;

            const matchesSearch =
                !query ||
                faq.question.toLowerCase().includes(query) ||
                faq.answer.toLowerCase().includes(query) ||
                faq.category.toLowerCase().includes(query);

            return matchesCategory && matchesSearch;
        });
    }, [search, activeCategory]);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        setSearch("");

        setTimeout(() => {
            document
                .getElementById("faq-section")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
        }, 50);
    };

    return (
        <main className="min-h-screen bg-white text-slate-900">

            {/* =====================================================
                HERO
            ====================================================== */}
            <section className="relative overflow-hidden bg-slate-50">

                <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-yellow-100/70 blur-3xl" />
                <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-amber-100/60 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8">

                    <div className="mx-auto max-w-3xl text-center">

                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-700">
                            <CircleHelp size={16} />
                            Shortify Help Center
                        </div>

                        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                            How can we
                            <span className="text-yellow-500"> help?</span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">
                            Find answers, learn how Shortify works, and get
                            help with your account, links, analytics, and more.
                        </p>

                        {/* Search */}
                        <div className="relative mx-auto mt-10 max-w-2xl">

                            <Search
                                size={21}
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setActiveCategory("All");
                                }}
                                placeholder="Search for help..."
                                className="w-full rounded-2xl border border-slate-200 bg-white py-5 pl-14 pr-5 text-sm shadow-xl shadow-slate-200/40 outline-none transition-all placeholder:text-slate-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                            />

                        </div>

                        <p className="mt-4 text-xs text-slate-400">
                            Search topics like links, clicks, passwords,
                            accounts, or troubleshooting.
                        </p>

                    </div>

                </div>
            </section>


            {/* =====================================================
                CATEGORIES
            ====================================================== */}
            <section className="py-20">

                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="mb-10">
                        <p className="text-sm font-semibold uppercase tracking-widest text-yellow-500">
                            Browse help
                        </p>

                        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                            What can we help you with?
                        </h2>

                        <p className="mt-3 max-w-2xl text-slate-500">
                            Explore a topic to find answers and useful
                            information about Shortify.
                        </p>
                    </div>


                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                        {categories.map((category) => {
                            const Icon = category.icon;

                            return (
                                <button
                                    key={category.title}
                                    onClick={() =>
                                        handleCategoryClick(category.title)
                                    }
                                    className="group text-left rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-300 hover:shadow-xl hover:shadow-slate-200/50"
                                >

                                    <div className="flex items-start justify-between">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 transition-all duration-300 group-hover:bg-yellow-500 group-hover:text-white">
                                            <Icon size={21} />
                                        </div>

                                        <ArrowRight
                                            size={19}
                                            className="text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-yellow-500"
                                        />

                                    </div>

                                    <h3 className="mt-6 text-lg font-semibold">
                                        {category.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        {category.description}
                                    </p>

                                    <p className="mt-5 text-xs font-medium text-slate-400">
                                        {category.articles} articles
                                    </p>

                                </button>
                            );
                        })}

                    </div>

                </div>
            </section>


            {/* =====================================================
                POPULAR ARTICLES
            ====================================================== */}
            <section className="border-y border-slate-100 bg-slate-50 py-20">

                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">

                        <div>

                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
                                <Zap size={21} />
                            </div>

                            <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-yellow-500">
                                Quick answers
                            </p>

                            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                                Popular questions
                            </h2>

                            <p className="mt-4 max-w-md leading-7 text-slate-500">
                                Looking for something specific? These are some
                                of the questions users commonly ask about
                                Shortify.
                            </p>

                        </div>


                        <div className="space-y-3">

                            {faqs.slice(0, 5).map((faq, index) => {

                                const isOpen = openFaq === `popular-${index}`;

                                return (
                                    <div
                                        key={faq.question}
                                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all"
                                    >

                                        <button
                                            onClick={() =>
                                                setOpenFaq(
                                                    isOpen
                                                        ? null
                                                        : `popular-${index}`
                                                )
                                            }
                                            className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left"
                                        >

                                            <span className="font-medium text-slate-800">
                                                {faq.question}
                                            </span>

                                            <ChevronDown
                                                size={19}
                                                className={`shrink-0 text-slate-400 transition-transform duration-300 ${
                                                    isOpen
                                                        ? "rotate-180 text-yellow-500"
                                                        : ""
                                                }`}
                                            />

                                        </button>

                                        <div
                                            className={`grid transition-all duration-300 ${
                                                isOpen
                                                    ? "grid-rows-[1fr]"
                                                    : "grid-rows-[0fr]"
                                            }`}
                                        >
                                            <div className="overflow-hidden">
                                                <p className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-7 text-slate-500">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                    </div>

                </div>
            </section>


            {/* =====================================================
                FAQ
            ====================================================== */}
            <section
                id="faq-section"
                className="scroll-mt-20 py-20"
            >

                <div className="mx-auto max-w-4xl px-6 lg:px-8">

                    <div className="text-center">

                        <p className="text-sm font-semibold uppercase tracking-widest text-yellow-500">
                            Knowledge base
                        </p>

                        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                            Frequently asked questions
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-slate-500">
                            Browse answers to common questions about using
                            Shortify.
                        </p>

                    </div>


                    {/* Category filter */}
                    <div className="mt-10 flex flex-wrap justify-center gap-2">

                        <button
                            onClick={() => setActiveCategory("All")}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                activeCategory === "All"
                                    ? "bg-slate-900 text-white"
                                    : "border border-slate-200 bg-white text-slate-500 hover:border-yellow-300 hover:text-slate-800"
                            }`}
                        >
                            All
                        </button>

                        {categories.map((category) => (
                            <button
                                key={category.title}
                                onClick={() =>
                                    handleCategoryClick(category.title)
                                }
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                    activeCategory === category.title
                                        ? "bg-yellow-500 text-white"
                                        : "border border-slate-200 bg-white text-slate-500 hover:border-yellow-300 hover:text-slate-800"
                                }`}
                            >
                                {category.title}
                            </button>
                        ))}

                    </div>


                    {/* FAQ list */}
                    <div className="mt-10 space-y-3">

                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq, index) => {

                                const faqId = `${activeCategory}-${index}`;
                                const isOpen = openFaq === faqId;

                                return (
                                    <div
                                        key={`${faq.question}-${index}`}
                                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300"
                                    >

                                        <button
                                            onClick={() =>
                                                setOpenFaq(
                                                    isOpen ? null : faqId
                                                )
                                            }
                                            className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                                        >

                                            <div>
                                                <span className="text-xs font-medium uppercase tracking-wide text-yellow-500">
                                                    {faq.category}
                                                </span>

                                                <p className="mt-1 font-medium text-slate-800">
                                                    {faq.question}
                                                </p>
                                            </div>

                                            <ChevronDown
                                                size={20}
                                                className={`shrink-0 text-slate-400 transition-transform duration-300 ${
                                                    isOpen
                                                        ? "rotate-180 text-yellow-500"
                                                        : ""
                                                }`}
                                            />

                                        </button>

                                        <div
                                            className={`grid transition-all duration-300 ${
                                                isOpen
                                                    ? "grid-rows-[1fr]"
                                                    : "grid-rows-[0fr]"
                                            }`}
                                        >

                                            <div className="overflow-hidden">

                                                <div className="border-t border-slate-100 px-5 pb-6 pt-4 sm:px-6">

                                                    <p className="text-sm leading-7 text-slate-500">
                                                        {faq.answer}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                );
                            })
                        ) : (
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">

                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
                                    <Search size={20} />
                                </div>

                                <h3 className="mt-5 font-semibold text-slate-800">
                                    No results found
                                </h3>

                                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                    We couldn't find an answer matching your
                                    search. Try different keywords or contact
                                    our support team.
                                </p>

                                <Link
                                    to="/contact"
                                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-yellow-600 hover:text-yellow-700"
                                >
                                    Contact support
                                    <ArrowRight size={16} />
                                </Link>

                            </div>
                        )}

                    </div>

                </div>
            </section>


            {/* =====================================================
                TROUBLESHOOTING
            ====================================================== */}
            <section className="border-t border-slate-100 bg-slate-50 py-20">

                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="mb-10">

                        <p className="text-sm font-semibold uppercase tracking-widest text-yellow-500">
                            Need a fix?
                        </p>

                        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                            Troubleshooting
                        </h2>

                        <p className="mt-3 max-w-2xl text-slate-500">
                            Running into a problem? Start with one of these
                            common issues.
                        </p>

                    </div>


                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        {[
                            {
                                title: "Short link isn't working",
                                text: "Check the URL and short code, then try again.",
                            },
                            {
                                title: "Can't log in",
                                text: "Verify your credentials or use password recovery.",
                            },
                            {
                                title: "Dashboard isn't loading",
                                text: "Refresh the page and check your connection.",
                            },
                            {
                                title: "Clicks look outdated",
                                text: "Click statistics can take a short time to synchronize.",
                            },
                            {
                                title: "Can't create a link",
                                text: "Make sure the destination URL is valid.",
                            },
                            {
                                title: "Something else went wrong",
                                text: "Contact support and describe the issue you're experiencing.",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50"
                            >

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
                                    <Wrench size={18} />
                                </div>

                                <h3 className="mt-5 font-semibold text-slate-800">
                                    {item.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {item.text}
                                </p>

                            </div>
                        ))}

                    </div>

                </div>
            </section>


            {/* =====================================================
                CONTACT CTA
            ====================================================== */}
            <section className="py-20">

                <div className="mx-auto max-w-5xl px-6 lg:px-8">

                    <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 px-6 py-14 text-center shadow-xl sm:px-12">

                        <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-yellow-500/20 blur-3xl" />
                        <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-yellow-500/10 blur-3xl" />

                        <div className="relative">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500 text-white">
                                <MessageCircle size={23} />
                            </div>

                            <p className="mt-7 text-sm font-semibold uppercase tracking-widest text-yellow-400">
                                Still need help?
                            </p>

                            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                Can't find what you're looking for?
                            </h2>

                            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-400">
                                Our support team is happy to help. Tell us what
                                you're experiencing and we'll help you figure
                                it out.
                            </p>

                            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20"
                                >
                                    <Mail size={17} />
                                    Contact Support
                                    <ArrowRight size={17} />
                                </Link>

                                <a
                                    href="mailto:support@shortify.com"
                                    className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3.5 text-sm font-semibold text-slate-300 transition-all hover:border-slate-500 hover:bg-slate-800 hover:text-white"
                                >
                                    Email us
                                    <ExternalLink size={16} />
                                </a>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
};

export default HelpSupport;
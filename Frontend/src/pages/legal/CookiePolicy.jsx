import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
    FiArrowLeft,
    FiCheckCircle,
    FiClock,
    // FiCookie,
    FiDatabase,
    FiExternalLink,
    FiInfo,
    FiLock,
    FiSettings,
    FiShield,
    FiUserCheck,
} from "react-icons/fi";

const sections = [
    { id: "what-are-cookies", label: "What Are Cookies?" },
    { id: "how-we-use", label: "How We Use Cookies" },
    { id: "types", label: "Types of Cookies We Use" },
    { id: "essential", label: "Essential Cookies" },
    { id: "authentication", label: "Authentication & Session Cookies" },
    { id: "preferences", label: "Preference Cookies" },
    { id: "analytics", label: "Analytics & Usage" },
    { id: "third-party", label: "Third-Party Services" },
    { id: "duration", label: "Cookie Duration" },
    { id: "manage", label: "Managing Cookies" },
    { id: "disable", label: "If You Disable Cookies" },
    { id: "do-not-track", label: "Do Not Track" },
    { id: "changes", label: "Changes to This Policy" },
    { id: "contact", label: "Contact Us" },
];

const CookiePolicy = () => {
    return (
        <main className="min-h-screen bg-white text-gray-900">
            <Helmet>
                <title>Cookie Policy | Shortify</title>
                <meta name="description" content="Cookie Policy of Shortify. It explains how Shortify uses cookies and similar technologies." />
            </Helmet>
            {/* Hero */}
            <section className="border-b border-gray-100 bg-gray-50/70 pt-32">
                <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
                    <Link
                        to="/"
                        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-950"
                    >
                        <FiArrowLeft className="h-4 w-4" />
                        Back to Shortify
                    </Link>

                    <div className="max-w-4xl">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-sm font-medium text-yellow-800">
                            {/* <FiCookie className="h-4 w-4" /> */}
                            Cookie Policy
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                            How Shortify uses
                            <span className="text-yellow-500">
                                {" "}
                                cookies.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                            This Cookie Policy explains how Shortify uses
                            cookies and similar technologies to operate,
                            secure, improve, and understand the use of our
                            services.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4 text-sm text-gray-500">
                            <span>
                                Effective Date:{" "}
                                <strong className="font-semibold text-gray-800">
                                    October 5, 2026
                                </strong>
                            </span>

                            <span className="hidden text-gray-300 sm:inline">
                                |
                            </span>

                            <span>
                                Last Updated:{" "}
                                <strong className="font-semibold text-gray-800">
                                    October 5, 2026
                                </strong>
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mx-auto flex max-w-7xl gap-12 px-6 py-16 lg:px-8">
                {/* Sidebar */}
                <aside className="hidden w-64 shrink-0 lg:block">
                    <div className="sticky top-28">
                        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            On this page
                        </p>

                        <nav className="space-y-1">
                            {sections.map((section, index) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="block rounded-lg px-3 py-2 text-sm text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-950"
                                >
                                    <span className="mr-2 text-gray-300">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    {section.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Content */}
                <article className="min-w-0 max-w-4xl flex-1">
                    <div className="space-y-14">
                        <PolicySection
                            id="what-are-cookies"
                            number="01"
                            title="What Are Cookies?"
                        >
                            <p>
                                Cookies are small text files placed on your
                                device when you visit a website. They allow a
                                website to recognize your browser or device and
                                remember certain information about your visit.
                            </p>

                            <p>
                                Shortify may use cookies and similar
                                technologies such as local storage, session
                                identifiers, and other device or browser
                                technologies to provide and improve our
                                services.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="how-we-use"
                            number="02"
                            title="How We Use Cookies"
                        >
                            <p>
                                Shortify uses cookies and similar technologies
                                for purposes including:
                            </p>

                            <BulletList
                                items={[
                                    "Keeping users authenticated and maintaining secure sessions.",
                                    "Remembering necessary preferences and settings.",
                                    "Protecting our services against abuse and unauthorized activity.",
                                    "Understanding how our services are used and improving functionality.",
                                    "Maintaining the reliability and performance of the Shortify platform.",
                                    "Supporting security, diagnostics, and troubleshooting.",
                                ]}
                            />
                        </PolicySection>

                        <PolicySection
                            id="types"
                            number="03"
                            title="Types of Cookies We Use"
                        >
                            <p>
                                Depending on their purpose and duration,
                                cookies used by Shortify may fall into several
                                categories.
                            </p>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <InfoCard
                                    icon={FiLock}
                                    title="Essential"
                                    description="Required for core functionality, security, and authentication."
                                />

                                <InfoCard
                                    icon={FiSettings}
                                    title="Preferences"
                                    description="Used to remember settings and improve your experience."
                                />

                                <InfoCard
                                    icon={FiDatabase}
                                    title="Analytics"
                                    description="Help us understand service usage and improve the platform."
                                />

                                <InfoCard
                                    icon={FiShield}
                                    title="Security"
                                    description="Help detect abuse, suspicious activity, and security issues."
                                />
                            </div>
                        </PolicySection>

                        <PolicySection
                            id="essential"
                            number="04"
                            title="Essential Cookies"
                        >
                            <p>
                                Essential cookies are necessary for Shortify
                                to provide core features of the service.
                                Without these cookies, certain parts of the
                                platform may not function correctly.
                            </p>

                            <p>
                                These cookies may support functions such as
                                authentication, session management, security,
                                and maintaining the integrity of requests
                                between your browser and our servers.
                            </p>

                            <div className="mt-6 rounded-xl border border-yellow-100 bg-yellow-50 p-5">
                                <div className="flex gap-3">
                                    <FiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-600" />

                                    <div>
                                        <h3 className="font-semibold text-gray-950">
                                            Core functionality
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            These technologies are generally
                                            required for the service to work
                                            and cannot necessarily be disabled
                                            through our platform.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </PolicySection>

                        <PolicySection
                            id="authentication"
                            number="05"
                            title="Authentication & Session Cookies"
                        >
                            <p>
                                When you sign in to a Shortify account, we may
                                use cookies to maintain your authenticated
                                session and allow you to move between protected
                                areas of the platform without repeatedly
                                signing in.
                            </p>

                            <p>
                                Authentication-related cookies may contain
                                secure session or authentication information.
                                They are used to associate your browser with
                                your authenticated account.
                            </p>

                            <p>
                                Shortify does not use cookies to intentionally
                                store your account password in readable form.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="preferences"
                            number="06"
                            title="Preference Cookies"
                        >
                            <p>
                                Preference cookies allow Shortify to remember
                                information about how you use the service,
                                where applicable.
                            </p>

                            <p>
                                These technologies may help us preserve
                                selected settings and reduce the need for you
                                to repeatedly configure the same options.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="analytics"
                            number="07"
                            title="Analytics & Usage Information"
                        >
                            <p>
                                Shortify may use cookies or similar technologies
                                to understand how users interact with the
                                platform.
                            </p>

                            <p>
                                Depending on the services enabled on the
                                platform, this information may include
                                information such as pages visited, features
                                used, approximate usage patterns, browser
                                information, and technical information about
                                interactions with our services.
                            </p>

                            <p>
                                This information helps us identify performance
                                issues, understand feature usage, improve user
                                experience, and make the service more reliable.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="third-party"
                            number="08"
                            title="Third-Party Services"
                        >
                            <p>
                                Shortify may use third-party service providers
                                to support certain aspects of the platform.
                                These providers may use cookies or similar
                                technologies when their services are integrated
                                into Shortify.
                            </p>

                            <p>
                                Third-party technologies may be used for
                                purposes such as analytics, infrastructure,
                                security, communications, or service
                                functionality.
                            </p>

                            <p>
                                The use of third-party technologies is subject
                                to the respective provider's policies and
                                practices. Where applicable, details about
                                third-party processing are also addressed in
                                our{" "}
                                <Link
                                    to="/privacy-policy"
                                    className="font-medium text-gray-950 underline decoration-yellow-400 decoration-2 underline-offset-4"
                                >
                                    Privacy Policy
                                </Link>
                                .
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="duration"
                            number="09"
                            title="Cookie Duration"
                        >
                            <p>
                                Cookies may remain on your device for different
                                periods depending on their purpose.
                            </p>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <InfoCard
                                    icon={FiClock}
                                    title="Session Cookies"
                                    description="Temporary cookies that may be removed when you close your browser or when your session ends."
                                />

                                <InfoCard
                                    icon={FiDatabase}
                                    title="Persistent Cookies"
                                    description="Cookies that remain for a defined period or until they are removed from your device."
                                />
                            </div>

                            <p className="mt-6">
                                The exact duration of a cookie may vary
                                depending on its purpose, configuration, and
                                the service responsible for setting it.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="manage"
                            number="10"
                            title="Managing Cookies"
                        >
                            <p>
                                Most modern web browsers allow you to view,
                                block, delete, or otherwise manage cookies
                                through their settings.
                            </p>

                            <p>
                                You can generally find these controls in your
                                browser's privacy, security, or site settings.
                                The exact controls vary between browsers and
                                versions.
                            </p>

                            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
                                <div className="flex gap-3">
                                    <FiInfo className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" />

                                    <div>
                                        <h3 className="font-semibold text-gray-950">
                                            Browser controls
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Blocking or deleting cookies does
                                            not necessarily prevent you from
                                            visiting Shortify, but it may
                                            affect certain features or
                                            functionality.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </PolicySection>

                        <PolicySection
                            id="disable"
                            number="11"
                            title="If You Disable Cookies"
                        >
                            <p>
                                You may choose to disable or delete cookies
                                through your browser settings. However,
                                certain Shortify features may not function
                                properly if essential cookies are blocked.
                            </p>

                            <BulletList
                                items={[
                                    "You may be required to authenticate again.",
                                    "Some account or session functionality may become unavailable.",
                                    "Certain preferences may not be remembered.",
                                    "Security and service functionality may be affected.",
                                ]}
                            />

                            <p>
                                For this reason, we recommend allowing
                                essential cookies when using authenticated
                                areas of Shortify.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="do-not-track"
                            number="12"
                            title="Do Not Track"
                        >
                            <p>
                                Some browsers provide a “Do Not Track” (DNT)
                                setting that communicates a preference not to
                                have online activity tracked.
                            </p>

                            <p>
                                Because there is currently no universally
                                accepted technical standard for responding to
                                DNT signals across all websites and services,
                                Shortify may not respond to all DNT signals in
                                a consistent manner.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="changes"
                            number="13"
                            title="Changes to This Cookie Policy"
                        >
                            <p>
                                We may update this Cookie Policy from time to
                                time to reflect changes in our services,
                                technologies, legal requirements, or privacy
                                practices.
                            </p>

                            <p>
                                When we make changes, we will update the
                                “Last Updated” date at the beginning of this
                                policy. Where appropriate, we may provide
                                additional notice of significant changes.
                            </p>

                            <p>
                                We encourage you to review this page
                                periodically to stay informed about how
                                Shortify uses cookies and similar technologies.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="contact"
                            number="14"
                            title="Contact Us"
                        >
                            <p>
                                If you have questions about this Cookie Policy
                                or how Shortify uses cookies and similar
                                technologies, you can contact us using the
                                information below.
                            </p>

                            <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6">
                                <div className="space-y-4">
                                    <ContactRow
                                        label="Company"
                                        value="Shortify"
                                    />

                                    <ContactRow
                                        label="Email"
                                        value="[devkartikeya2122002@gmail.com]"
                                        isEmail
                                    />
                                </div>
                            </div>
                        </PolicySection>

                        {/* Footer note */}
                        <div className="border-t border-gray-200 pt-10">
                            <div className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-400">
                                        <FiShield className="h-5 w-5 text-gray-950" />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-950">
                                            Your privacy matters.
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Learn more about how Shortify
                                            collects, uses, and protects
                                            information.
                                        </p>
                                    </div>
                                </div>

                                <Link
                                    to="/legal/privacy-policy"
                                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                                >
                                    Privacy Policy
                                    <FiExternalLink className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
};

const PolicySection = ({ id, number, title, children }) => {
    return (
        <section id={id} className="scroll-mt-28">
            <div className="mb-5 flex items-center gap-3">
                <span className="text-sm font-semibold tracking-wider text-yellow-500">
                    {number}
                </span>

                <div className="h-px w-8 bg-yellow-300" />
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                {title}
            </h2>

            <div className="mt-6 space-y-5 text-[15px] leading-7 text-gray-600">
                {children}
            </div>
        </section>
    );
};

const BulletList = ({ items }) => {
    return (
        <ul className="space-y-3 pl-1">
            {items.map((item) => (
                <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
};

const InfoCard = ({ icon: Icon, title, description }) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 transition-colors hover:border-gray-300">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-950 text-yellow-400">
                <Icon className="h-5 w-5" />
            </div>

            <h3 className="mt-4 font-semibold text-gray-950">{title}</h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
                {description}
            </p>
        </div>
    );
};

const ContactRow = ({ label, value, isEmail = false }) => {
    return (
        <div className="flex flex-col gap-1 border-b border-gray-200 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm font-medium text-gray-500">
                {label}
            </span>

            {isEmail ? (
                <a
                    href={`mailto:${value.replace(/[\[\]]/g, "")}`}
                    className="text-sm font-medium text-gray-950 transition-colors hover:text-yellow-600"
                >
                    {value}
                </a>
            ) : (
                <span className="text-sm font-medium text-gray-800 sm:text-right">
                    {value}
                </span>
            )}
        </div>
    );
};

export default CookiePolicy;

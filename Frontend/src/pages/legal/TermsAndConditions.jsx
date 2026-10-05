import React from "react";
import { Link } from "react-router-dom";
import {
    FiAlertTriangle,
    FiArrowLeft,
    FiCheckCircle,
    FiExternalLink,
    FiFileText,
    FiGlobe,
    FiInfo,
    FiLock,
    FiShield,
    FiUserCheck,
    FiXCircle,
} from "react-icons/fi";

const sections = [
    { id: "acceptance", label: "Acceptance of Terms" },
    { id: "about-service", label: "About Shortify" },
    { id: "eligibility", label: "Eligibility" },
    { id: "accounts", label: "Accounts" },
    { id: "acceptable-use", label: "Acceptable Use" },
    { id: "prohibited-content", label: "Prohibited Content" },
    { id: "user-links", label: "User-Generated Links" },
    { id: "qr-codes", label: "QR Codes" },
    { id: "analytics", label: "Link Analytics" },
    { id: "security", label: "Security" },
    { id: "intellectual-property", label: "Intellectual Property" },
    { id: "third-party", label: "Third-Party Services" },
    { id: "availability", label: "Service Availability" },
    { id: "suspension", label: "Suspension & Termination" },
    { id: "disclaimers", label: "Disclaimers" },
    { id: "liability", label: "Limitation of Liability" },
    { id: "indemnification", label: "Indemnification" },
    { id: "changes", label: "Changes to Terms" },
    { id: "governing-law", label: "Governing Law" },
    { id: "contact", label: "Contact Us" },
];

const TermsAndConditions = () => {
    return (
        <main className="min-h-screen bg-white text-gray-900">
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
                            <FiFileText className="h-4 w-4" />
                            Terms & Conditions
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                            The terms that govern
                            <span className="text-yellow-500">
                                {" "}
                                Shortify.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                            These Terms & Conditions govern your access to and
                            use of Shortify and establish the rights and
                            responsibilities of you and Shortify when using
                            our services.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4 text-sm text-gray-500">
                            <span>
                                Effective Date:{" "}
                                <strong className="font-semibold text-gray-800">
                                    [Effective Date]
                                </strong>
                            </span>

                            <span className="hidden text-gray-300 sm:inline">
                                |
                            </span>

                            <span>
                                Last Updated:{" "}
                                <strong className="font-semibold text-gray-800">
                                    [Last Updated Date]
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
                            id="acceptance"
                            number="01"
                            title="Acceptance of Terms"
                        >
                            <p>
                                By accessing or using Shortify, you agree to be
                                bound by these Terms & Conditions and all
                                applicable laws and regulations.
                            </p>

                            <p>
                                If you do not agree with these Terms, you must
                                not access or use Shortify.
                            </p>

                            <p>
                                These Terms apply to all visitors, users,
                                account holders, and other persons who access
                                or use the service.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="about-service"
                            number="02"
                            title="About Shortify"
                        >
                            <p>
                                Shortify is a link-management platform that
                                provides services including URL shortening,
                                link management, link analytics, QR code
                                generation, and related functionality.
                            </p>

                            <p>
                                The specific features available to you may
                                depend on the current version of the platform,
                                your account status, and any applicable service
                                limitations.
                            </p>

                            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                                <FeatureCard
                                    icon={FiGlobe}
                                    title="Short Links"
                                    description="Create and manage shortened URLs."
                                />

                                <FeatureCard
                                    icon={FiCheckCircle}
                                    title="Analytics"
                                    description="Understand how your links are used."
                                />

                                <FeatureCard
                                    icon={FiFileText}
                                    title="QR Codes"
                                    description="Create QR codes for your links."
                                />
                            </div>
                        </PolicySection>

                        <PolicySection
                            id="eligibility"
                            number="03"
                            title="Eligibility"
                        >
                            <p>
                                You must be legally capable of entering into a
                                binding agreement in your jurisdiction to use
                                Shortify.
                            </p>

                            <p>
                                If you use Shortify on behalf of an
                                organization, business, or other entity, you
                                represent that you have the authority to bind
                                that entity to these Terms.
                            </p>

                            <p>
                                Shortify is not intended to be used in
                                violation of applicable laws or regulations.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="accounts"
                            number="04"
                            title="Accounts"
                        >
                            <p>
                                Certain Shortify features may require you to
                                create an account. When creating an account,
                                you agree to provide accurate and current
                                information and to keep that information
                                reasonably up to date.
                            </p>

                            <p>
                                You are responsible for maintaining the
                                confidentiality of your account credentials
                                and for activities performed through your
                                account.
                            </p>

                            <p>
                                You must notify Shortify promptly if you
                                believe that your account has been accessed
                                without authorization or that your credentials
                                have been compromised.
                            </p>

                            <div className="mt-6 rounded-xl border border-yellow-100 bg-yellow-50 p-5">
                                <div className="flex gap-3">
                                    <FiLock className="mt-0.5 h-5 w-5 shrink-0 text-yellow-600" />

                                    <div>
                                        <h3 className="font-semibold text-gray-950">
                                            Protect your credentials
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Never intentionally share your
                                            password or authentication
                                            credentials with unauthorized
                                            persons.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </PolicySection>

                        <PolicySection
                            id="acceptable-use"
                            number="05"
                            title="Acceptable Use"
                        >
                            <p>
                                You agree to use Shortify responsibly and only
                                for lawful purposes.
                            </p>

                            <p>
                                You must not use Shortify in a manner that
                                could damage the service, interfere with other
                                users, compromise security, or violate the
                                rights of another person or organization.
                            </p>

                            <BulletList
                                items={[
                                    "Use Shortify only for lawful purposes.",
                                    "Respect the rights and privacy of other individuals.",
                                    "Do not attempt to bypass security controls or access restricted systems.",
                                    "Do not interfere with the availability or performance of the service.",
                                    "Do not abuse automated requests, APIs, or other platform functionality.",
                                    "Do not use Shortify to distribute malicious or harmful material.",
                                ]}
                            />
                        </PolicySection>

                        <PolicySection
                            id="prohibited-content"
                            number="06"
                            title="Prohibited Content"
                        >
                            <p>
                                You may not create, publish, distribute, or
                                use Shortify links or QR codes to facilitate
                                content or activities that are unlawful,
                                fraudulent, abusive, malicious, or otherwise
                                prohibited.
                            </p>

                            <BulletList
                                items={[
                                    "Malware, viruses, ransomware, or other malicious software.",
                                    "Phishing pages or credential-stealing schemes.",
                                    "Fraud, scams, impersonation, or deceptive practices.",
                                    "Content that unlawfully exploits or harms minors.",
                                    "Unauthorized distribution of copyrighted or protected material.",
                                    "Illegal goods, services, or activities.",
                                    "Attempts to evade security, moderation, or access controls.",
                                    "Content designed primarily to facilitate abuse, harassment, or other unlawful activity.",
                                ]}
                            />

                            <p>
                                Shortify reserves the right to investigate
                                reported abuse and take appropriate action
                                where permitted by applicable law.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="user-links"
                            number="07"
                            title="User-Generated Links"
                        >
                            <p>
                                Shortify provides tools that allow users to
                                create shortened links pointing to
                                destinations selected by the user.
                            </p>

                            <p>
                                You are solely responsible for the destination
                                URLs and content associated with links you
                                create or distribute.
                            </p>

                            <p>
                                Shortify does not guarantee the accuracy,
                                legality, availability, security, or quality
                                of third-party destinations linked through
                                the platform.
                            </p>

                            <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-5">
                                <div className="flex gap-3">
                                    <FiAlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

                                    <div>
                                        <h3 className="font-semibold text-gray-950">
                                            Destination responsibility
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Creating a shortened URL does not
                                            transfer responsibility for the
                                            destination content to Shortify.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </PolicySection>

                        <PolicySection
                            id="qr-codes"
                            number="08"
                            title="QR Codes"
                        >
                            <p>
                                Shortify may allow users to generate QR codes
                                associated with shortened URLs or other
                                supported destinations.
                            </p>

                            <p>
                                QR codes are generated based on information
                                provided by the user. You are responsible for
                                ensuring that the destination represented by
                                your QR code is lawful, accurate, and
                                appropriate for your intended use.
                            </p>

                            <p>
                                Shortify does not guarantee that every
                                third-party QR scanner, device, camera, or
                                application will successfully read every
                                generated QR code.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="analytics"
                            number="09"
                            title="Link Analytics"
                        >
                            <p>
                                Shortify may provide analytics associated with
                                shortened links, such as click counts and
                                other usage information.
                            </p>

                            <p>
                                Analytics are provided for informational and
                                operational purposes and may not represent
                                perfectly accurate measurements of every
                                interaction with a link.
                            </p>

                            <p>
                                Technical limitations, privacy controls,
                                browser behavior, caching, automated requests,
                                network conditions, and other factors may
                                affect analytics data.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="security"
                            number="10"
                            title="Security"
                        >
                            <p>
                                We take reasonable measures designed to protect
                                Shortify and user information against
                                unauthorized access, misuse, alteration, or
                                destruction.
                            </p>

                            <p>
                                However, no internet-based service,
                                transmission, or storage system can be
                                guaranteed to be completely secure.
                            </p>

                            <p>
                                You are responsible for using appropriate
                                security practices when accessing the service,
                                including protecting your account credentials
                                and devices.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="intellectual-property"
                            number="11"
                            title="Intellectual Property"
                        >
                            <p>
                                Shortify and its original software, design,
                                branding, visual elements, documentation,
                                content, and other materials are owned by or
                                licensed to Shortify and are protected by
                                applicable intellectual-property laws.
                            </p>

                            <p>
                                Except as expressly permitted by law or by
                                Shortify, you may not copy, reproduce,
                                distribute, modify, reverse engineer, or
                                commercially exploit protected portions of the
                                service.
                            </p>

                            <p>
                                The Shortify name, logo, trademarks, and other
                                branding elements may not be used in a manner
                                that implies an unauthorized affiliation or
                                endorsement.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="third-party"
                            number="12"
                            title="Third-Party Services"
                        >
                            <p>
                                Shortify may integrate with or depend on
                                third-party services, infrastructure providers,
                                communication providers, analytics providers,
                                hosting services, or other external systems.
                            </p>

                            <p>
                                Third-party services may have their own terms,
                                policies, availability limitations, and
                                privacy practices.
                            </p>

                            <p>
                                Shortify is not responsible for the
                                independent operation, availability, content,
                                or policies of third-party services.
                            </p>

                            <p>
                                Your use of third-party services may therefore
                                be subject to additional terms imposed by
                                those providers.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="availability"
                            number="13"
                            title="Service Availability"
                        >
                            <p>
                                We aim to keep Shortify available and
                                reliable, but we do not guarantee uninterrupted
                                or error-free operation.
                            </p>

                            <p>
                                The service may occasionally be unavailable or
                                degraded due to maintenance, upgrades,
                                infrastructure failures, security incidents,
                                network problems, third-party failures, or
                                circumstances beyond our reasonable control.
                            </p>

                            <p>
                                We may modify, suspend, replace, or discontinue
                                particular features of Shortify when
                                reasonably necessary.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="suspension"
                            number="14"
                            title="Suspension & Termination"
                        >
                            <p>
                                Shortify may suspend, restrict, or terminate
                                access to an account or particular
                                functionality if we reasonably believe that
                                the user:
                            </p>

                            <BulletList
                                items={[
                                    "Has violated these Terms.",
                                    "Has used the service for unlawful or abusive purposes.",
                                    "Has created a security or operational risk.",
                                    "Has engaged in fraudulent or deceptive activity.",
                                    "Has attempted to compromise the service or another user's account.",
                                ]}
                            />

                            <p>
                                Where appropriate and reasonably practicable,
                                we may provide notice before taking such action.
                                However, immediate action may be necessary in
                                cases involving security, fraud, abuse, legal
                                requirements, or significant risk.
                            </p>

                            <p>
                                You may stop using Shortify at any time and,
                                where applicable, request deletion of your
                                account through the available account
                                controls.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="disclaimers"
                            number="15"
                            title="Disclaimers"
                        >
                            <p>
                                To the maximum extent permitted by applicable
                                law, Shortify is provided on an “as is” and
                                “as available” basis.
                            </p>

                            <p>
                                We do not guarantee that the service will
                                always be available, secure, accurate,
                                complete, uninterrupted, or free from errors or
                                harmful components.
                            </p>

                            <p>
                                We do not guarantee the availability, accuracy,
                                security, legality, or reliability of any
                                third-party website or destination accessed
                                through a Shortify link.
                            </p>

                            <p>
                                Nothing in these Terms excludes or limits
                                rights or protections that cannot legally be
                                excluded or limited under applicable law.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="liability"
                            number="16"
                            title="Limitation of Liability"
                        >
                            <p>
                                To the maximum extent permitted by applicable
                                law, Shortify and its owners, operators,
                                employees, contractors, affiliates, and
                                service providers will not be liable for
                                indirect, incidental, special, consequential,
                                exemplary, or punitive damages arising from or
                                related to your use of the service.
                            </p>

                            <p>
                                This may include loss of data, revenue,
                                profits, business opportunities, goodwill, or
                                other intangible losses, to the extent
                                permitted by law.
                            </p>

                            <p>
                                Nothing in these Terms is intended to exclude
                                liability that cannot lawfully be excluded
                                under applicable law.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="indemnification"
                            number="17"
                            title="Indemnification"
                        >
                            <p>
                                To the extent permitted by applicable law, you
                                agree to defend, indemnify, and hold harmless
                                Shortify and its owners, operators, employees,
                                contractors, affiliates, and service providers
                                from claims, liabilities, damages, losses, and
                                expenses arising from:
                            </p>

                            <BulletList
                                items={[
                                    "Your violation of these Terms.",
                                    "Your misuse of the Shortify service.",
                                    "Your violation of applicable law or the rights of another person.",
                                    "Content, URLs, or QR codes created or distributed through your account.",
                                ]}
                            />

                            <p>
                                This provision applies only to the extent
                                permitted by applicable law.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="changes"
                            number="18"
                            title="Changes to These Terms"
                        >
                            <p>
                                We may update these Terms from time to time to
                                reflect changes in our services, business
                                practices, technology, or legal requirements.
                            </p>

                            <p>
                                When we make material changes, we may provide
                                additional notice where appropriate.
                            </p>

                            <p>
                                The updated Terms will become effective on the
                                date specified at the beginning of the revised
                                Terms, unless otherwise stated.
                            </p>

                            <p>
                                Your continued use of Shortify after the
                                effective date of updated Terms constitutes
                                acceptance of the revised Terms to the extent
                                permitted by applicable law.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="governing-law"
                            number="19"
                            title="Governing Law"
                        >
                            <p>
                                These Terms will be governed by and interpreted
                                in accordance with the laws of{" "}
                                <strong className="font-semibold text-gray-900">
                                    [Applicable Jurisdiction]
                                </strong>
                                , without regard to conflict-of-law
                                principles.
                            </p>

                            <p>
                                Any disputes arising from or relating to these
                                Terms or the Shortify service will be subject
                                to the jurisdiction of the courts located in{" "}
                                <strong className="font-semibold text-gray-900">
                                    [Applicable Jurisdiction / Courts]
                                </strong>
                                , unless applicable law requires otherwise.
                            </p>

                            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
                                <div className="flex gap-3">
                                    <FiInfo className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" />

                                    <p className="text-sm leading-6 text-gray-600">
                                        Replace the jurisdiction placeholders
                                        above with the actual governing law and
                                        courts applicable to your business
                                        before publishing this policy.
                                    </p>
                                </div>
                            </div>
                        </PolicySection>

                        <PolicySection
                            id="contact"
                            number="20"
                            title="Contact Us"
                        >
                            <p>
                                If you have questions about these Terms,
                                concerns regarding the service, or need to
                                contact Shortify for a legal or compliance
                                matter, you can reach us using the information
                                below.
                            </p>

                            <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6">
                                <div className="space-y-4">
                                    <ContactRow
                                        label="Company"
                                        value="[Legal Company / Business Name]"
                                    />

                                    <ContactRow
                                        label="Email"
                                        value="[legal@yourdomain.com]"
                                        isEmail
                                    />

                                    <ContactRow
                                        label="Address"
                                        value="[Company Address]"
                                    />
                                </div>
                            </div>
                        </PolicySection>

                        {/* Bottom navigation */}
                        <div className="border-t border-gray-200 pt-10">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Link
                                    to="/privacy-policy"
                                    className="group rounded-2xl border border-gray-200 p-6 transition-all hover:border-gray-300 hover:shadow-sm"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400">
                                            <FiShield className="h-5 w-5 text-gray-950" />
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                                                Related
                                            </p>

                                            <h3 className="font-semibold text-gray-950">
                                                Privacy Policy
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="mt-4 text-sm leading-6 text-gray-600">
                                        Learn how Shortify collects, uses, and
                                        protects information.
                                    </p>

                                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-950">
                                        Read policy
                                        <FiExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                    </span>
                                </Link>

                                <Link
                                    to="/cookie-policy"
                                    className="group rounded-2xl border border-gray-200 p-6 transition-all hover:border-gray-300 hover:shadow-sm"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-950">
                                            <FiFileText className="h-5 w-5 text-yellow-400" />
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                                                Related
                                            </p>

                                            <h3 className="font-semibold text-gray-950">
                                                Cookie Policy
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="mt-4 text-sm leading-6 text-gray-600">
                                        Understand how Shortify uses cookies
                                        and similar technologies.
                                    </p>

                                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-950">
                                        Read policy
                                        <FiExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                    </span>
                                </Link>
                            </div>

                            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-yellow-100 bg-yellow-50 p-5">
                                <FiUserCheck className="h-5 w-5 shrink-0 text-yellow-600" />

                                <p className="text-sm leading-6 text-gray-700">
                                    By using Shortify, you acknowledge that you
                                    have read and understood these Terms &
                                    Conditions and agree to comply with them.
                                </p>
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

const FeatureCard = ({ icon: Icon, title, description }) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
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
    const email = value.replace(/[\[\]]/g, "");

    return (
        <div className="flex flex-col gap-1 border-b border-gray-200 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm font-medium text-gray-500">
                {label}
            </span>

            {isEmail ? (
                <a
                    href={`mailto:${email}`}
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

export default TermsAndConditions;

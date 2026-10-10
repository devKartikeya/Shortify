import React from "react";
import { Helmet } from "react-helmet-async";
import {
    FiArrowUpRight,
    FiCheckCircle,
    FiChevronRight,
    FiShield,
} from "react-icons/fi";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import PagesNavbar from "../../components/PagesNavbar";

const sections = [
    { id: "who-we-are", label: "Who We Are" },
    { id: "information-we-collect", label: "Information We Collect" },
    { id: "how-we-use-information", label: "How We Use Your Information" },
    { id: "legal-basis", label: "Legal Basis for Processing" },
    { id: "link-analytics", label: "Link Analytics" },
    { id: "cookies", label: "Cookies & Similar Technologies" },
    { id: "sharing", label: "How We Share Information" },
    { id: "third-party", label: "Third-Party Services" },
    { id: "security", label: "Data Security" },
    { id: "retention", label: "Data Retention" },
    { id: "your-rights", label: "Your Rights" },
    { id: "international", label: "International Data Transfers" },
    { id: "children", label: "Children's Privacy" },
    { id: "third-party-links", label: "Third-Party Links" },
    { id: "user-content", label: "User-Generated Content" },
    { id: "communications", label: "Communications" },
    { id: "changes", label: "Changes to This Privacy Policy" },
    { id: "contact", label: "Contact Us" },
    { id: "governing-law", label: "Governing Law" },
];

const PrivacyPolicy = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);

        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Helmet>
                <title>
                    Privacy Policy | Shortify
                </title>
                <meta name="description" content="Privacy Policy of Shortify. It lists all details that Shortify follows to maintain user's privacy and security." />
            </Helmet>
            {/* =========================
                HERO
            ========================== */}
            <section className="border-b border-gray-200 bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 pb-16 pt-28 sm:px-10 lg:px-16 lg:pb-20 lg:pt-36">
                    <div className="max-w-4xl">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-600">
                            <FiShield className="text-yellow-500" />
                            Privacy & Data Protection
                        </div>

                        <h1 className="text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                            Privacy Policy
                        </h1>

                        <p className="mt-6 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg">
                            Your privacy matters to us. This policy explains
                            how Shortify collects, uses, protects, and manages
                            information when you use our services.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-gray-500">
                            <span>
                                <span className="font-semibold text-gray-800">
                                    Effective:
                                </span>{" "}
                                October 5, 2026
                            </span>

                            <span>
                                <span className="font-semibold text-gray-800">
                                    Last Updated:
                                </span>{" "}
                                October 5, 2026
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================
                CONTENT
            ========================== */}
            <main className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
                <div className="grid gap-12 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-20">

                    {/* =========================
                        TABLE OF CONTENTS
                    ========================== */}
                    <aside className="lg:sticky lg:top-28 lg:h-fit">
                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
                                On this page
                            </p>

                            <nav className="space-y-1">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() =>
                                            scrollToSection(section.id)
                                        }
                                        className="group flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-gray-600 transition hover:bg-white hover:text-gray-950"
                                    >
                                        <span>{section.label}</span>

                                        <FiChevronRight className="text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-gray-500" />
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="mt-5 rounded-2xl bg-gray-950 p-5 text-white">
                            <FiShield className="mb-4 text-xl text-yellow-400" />

                            <p className="text-sm font-semibold">
                                Privacy is part of the product.
                            </p>

                            <p className="mt-2 text-xs leading-6 text-gray-400">
                                We aim to collect only the information needed
                                to provide, secure, and improve Shortify.
                            </p>
                        </div>
                    </aside>

                    {/* =========================
                        POLICY CONTENT
                    ========================== */}
                    <article className="max-w-4xl">

                        <PolicySection
                            id="who-we-are"
                            number="01"
                            title="Who We Are"
                        >
                            <p>
                                Shortify ("<strong>Shortify</strong>,"
                                "<strong>we</strong>," "<strong>us</strong>,"
                                or "<strong>our</strong>") is a link management
                                and digital sharing platform providing URL
                                shortening, link management, QR-code
                                generation, analytics, and related services.
                            </p>

                            <div className="my-7 rounded-2xl border border-gray-200 bg-gray-50 p-6">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <InfoItem
                                        label="Legal Entity"
                                        value="Shortify"
                                    />

                                    <InfoItem
                                        label="Privacy Contact"
                                        value="devkartikeya2122002@gmail.com"
                                    />

                                    <InfoItem
                                        label="Platform"
                                        value="Shortify"
                                    />
                                </div>
                            </div>

                            <p>
                                This Privacy Policy explains how we collect,
                                use, store, disclose, and protect information
                                when you access or use the Shortify website,
                                applications, URL-shortening services,
                                QR-code services, account features, analytics
                                features, and related services collectively
                                referred to as the "<strong>Services</strong>".
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="information-we-collect"
                            number="02"
                            title="Information We Collect"
                        >
                            <p>
                                We collect information that is reasonably
                                necessary to provide, secure, maintain, and
                                improve the Services.
                            </p>

                            <SubHeading>Account Information</SubHeading>

                            <p>
                                When you create a Shortify account, we may
                                collect:
                            </p>

                            <BulletList
                                items={[
                                    "Username or display name",
                                    "Email address",
                                    "Password in securely processed and protected form",
                                    "Account creation and related account information",
                                ]}
                            />

                            <SubHeading>
                                Links and Content You Submit
                            </SubHeading>

                            <p>
                                When you use Shortify, we may process
                                information associated with the links and QR
                                codes you create, including:
                            </p>

                            <BulletList
                                items={[
                                    "Original URLs",
                                    "Short codes",
                                    "Link creation and modification information",
                                    "Click and usage information",
                                    "QR-code configuration and customization settings",
                                    "Branding elements you provide, such as logos, colors, or brand text",
                                ]}
                            />

                            <SubHeading>
                                Contact and Support Information
                            </SubHeading>

                            <p>
                                If you contact us, we may collect information
                                that you voluntarily provide, including your
                                name, email address, subject, message, and
                                information contained in your communication.
                            </p>

                            <SubHeading>
                                Technical and Usage Information
                            </SubHeading>

                            <p>
                                When you access the Services, certain technical
                                information may be processed automatically,
                                including:
                            </p>

                            <BulletList
                                items={[
                                    "IP address",
                                    "Browser type and version",
                                    "Device and operating-system information",
                                    "Request and access timestamps",
                                    "Referrer information",
                                    "Authentication and security-related information",
                                    "Service usage and interaction information",
                                    "Error and diagnostic information",
                                ]}
                            />
                        </PolicySection>

                        <PolicySection
                            id="how-we-use-information"
                            number="03"
                            title="How We Use Your Information"
                        >
                            <p>
                                We use information collected through the
                                Services for legitimate and necessary purposes,
                                including to:
                            </p>

                            <BulletList
                                items={[
                                    "Create and maintain your Shortify account",
                                    "Provide URL-shortening and link-management functionality",
                                    "Generate and manage QR codes",
                                    "Provide link analytics and usage statistics",
                                    "Authenticate users and maintain account security",
                                    "Process password resets and account-related communications",
                                    "Respond to support and contact requests",
                                    "Detect, prevent, and investigate fraud, abuse, unauthorized access, and security incidents",
                                    "Monitor service health and performance",
                                    "Diagnose technical problems",
                                    "Improve the reliability, functionality, and user experience of the Services",
                                    "Comply with applicable legal obligations",
                                    "Enforce our Terms of Service and protect our rights and property",
                                ]}
                            />
                        </PolicySection>

                        <PolicySection
                            id="legal-basis"
                            number="04"
                            title="Legal Basis for Processing"
                        >
                            <p>
                                Depending on the circumstances and applicable
                                law, we may process personal information
                                because:
                            </p>

                            <BulletList
                                items={[
                                    "It is necessary to provide the Services you requested;",
                                    "You have provided consent where consent is required;",
                                    "Processing is necessary to maintain security, prevent abuse, or protect our legitimate interests;",
                                    "Processing is necessary to comply with a legal obligation; or",
                                    "Processing is otherwise permitted under applicable data-protection law.",
                                ]}
                            />

                            <p>
                                Where processing is based on consent, you may
                                have the right to withdraw that consent,
                                subject to applicable law and any lawful
                                processing that occurred before withdrawal.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="link-analytics"
                            number="05"
                            title="Link Analytics"
                        >
                            <p>
                                Shortify may collect information about
                                interactions with shortened links in order to
                                provide analytics and maintain the functionality
                                of the platform.
                            </p>

                            <p>
                                Depending on the feature and configuration,
                                analytics information may include:
                            </p>

                            <BulletList
                                items={[
                                    "Number of clicks",
                                    "Date and time of access",
                                    "Referrer information",
                                    "Approximate geographic information derived from technical data",
                                    "Browser or device information",
                                    "Other technical information necessary for security and analytics",
                                ]}
                            />

                            <p>
                                Analytics are intended to provide useful
                                aggregate or link-level insights while
                                supporting the security and operation of the
                                Services.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="cookies"
                            number="06"
                            title="Cookies & Similar Technologies"
                        >
                            <p>
                                Shortify may use cookies, local storage, and
                                similar technologies for purposes such as:
                            </p>

                            <BulletList
                                items={[
                                    "Maintaining authentication sessions",
                                    "Remembering preferences",
                                    "Protecting accounts and preventing abuse",
                                    "Understanding how the Services are used",
                                    "Improving functionality and performance",
                                ]}
                            />

                            <p>
                                Authentication-related cookies may be necessary
                                for the operation of your account.
                            </p>

                            <p>
                                You may configure your browser to reject or
                                delete certain cookies. However, disabling
                                necessary technologies may affect the
                                availability or functionality of certain
                                features.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="sharing"
                            number="07"
                            title="How We Share Information"
                        >
                            <p>
                                We do not sell your personal information.
                            </p>

                            <SubHeading>Service Providers</SubHeading>

                            <p>
                                We may use trusted third-party providers to
                                operate parts of the Services, including cloud
                                infrastructure, database services, email
                                delivery, monitoring, security, and other
                                operational services.
                            </p>

                            <SubHeading>
                                Legal and Regulatory Requirements
                            </SubHeading>

                            <p>
                                We may disclose information where reasonably
                                necessary to comply with applicable law or
                                legal process, respond to lawful requests,
                                protect the rights and safety of Shortify or
                                others, or investigate fraud, abuse, or
                                security incidents.
                            </p>

                            <SubHeading>Business Transfers</SubHeading>

                            <p>
                                If Shortify is involved in a merger,
                                acquisition, financing, restructuring, sale of
                                assets, or similar transaction, information may
                                be transferred as part of that transaction,
                                subject to applicable law and appropriate
                                safeguards.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="third-party"
                            number="08"
                            title="Third-Party Services"
                        >
                            <p>
                                Shortify may rely on third-party infrastructure
                                and service providers to deliver certain
                                functionality.
                            </p>

                            <p>
                                These providers may process limited information
                                on our behalf for services such as:
                            </p>

                            <BulletList
                                items={[
                                    "Email delivery",
                                    "Cloud infrastructure",
                                    "Database services",
                                    "Authentication and security",
                                    "Application monitoring",
                                    "Service reliability",
                                ]}
                            />

                            <p>
                                Third-party services are governed by their
                                respective privacy policies and terms.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="security"
                            number="09"
                            title="Data Security"
                        >
                            <p>
                                We implement reasonable technical and
                                organizational safeguards designed to protect
                                personal information against unauthorized
                                access, alteration, disclosure, loss, misuse,
                                or destruction.
                            </p>

                            <div className="my-7 grid gap-3 sm:grid-cols-2">
                                {[
                                    "Authentication and authorization controls",
                                    "Password hashing",
                                    "Secure session mechanisms",
                                    "Access controls",
                                    "Rate limiting",
                                    "Security headers",
                                    "Encryption in transit where supported",
                                    "Infrastructure and application monitoring",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4"
                                    >
                                        <FiCheckCircle className="mt-0.5 shrink-0 text-yellow-500" />
                                        <span className="text-sm text-gray-700">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <p>
                                However, no internet-based service can
                                guarantee absolute security. You acknowledge
                                that transmission and storage of information
                                over the internet involve inherent risks.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="retention"
                            number="10"
                            title="Data Retention"
                        >
                            <p>
                                We retain personal information only for as
                                long as reasonably necessary for the purposes
                                described in this Privacy Policy, including to
                                provide the Services, maintain your account,
                                maintain security records, resolve disputes,
                                enforce agreements, and comply with legal
                                obligations.
                            </p>

                            <p>
                                When information is no longer reasonably
                                required, we may delete, anonymize, or
                                otherwise securely dispose of it, subject to
                                applicable legal, technical, and operational
                                requirements.
                            </p>

                            <p>
                                Certain information may remain in backups or
                                security records for a limited period before
                                being securely removed or overwritten.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="your-rights"
                            number="11"
                            title="Your Account & Data Rights"
                        >
                            <p>
                                Depending on the Services available to you and
                                applicable law, you may be able to:
                            </p>

                            <BulletList
                                items={[
                                    "Access information associated with your account",
                                    "Update or correct certain account information",
                                    "Change your password",
                                    "Delete your account",
                                    "Request deletion of certain personal information",
                                    "Request information about how your personal information is processed",
                                    "Withdraw consent where consent is the applicable basis for processing",
                                    "Raise a complaint regarding the handling of your personal information",
                                ]}
                            />

                            <p>
                                Some information may need to be retained where
                                required by law, necessary for security, or
                                otherwise permitted under applicable law.
                            </p>

                            <div className="my-7 rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
                                <p className="text-sm font-semibold text-gray-950">
                                    Privacy requests
                                </p>

                                <p className="mt-2 text-sm leading-7 text-gray-700">
                                    To submit a privacy-related request,
                                    contact us at{" "}
                                    <a
                                        href="mailto:[privacy@yourdomain.com]"
                                        className="font-semibold text-gray-950 underline decoration-yellow-400 decoration-2 underline-offset-4"
                                    >
                                        [privacy@yourdomain.com]
                                    </a>
                                    .
                                </p>
                            </div>

                            <p>
                                We may need to verify your identity before
                                fulfilling certain requests.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="international"
                            number="12"
                            title="International Data Transfers"
                        >
                            <p>
                                Shortify and its service providers may process
                                information in countries other than the
                                country in which you reside.
                            </p>

                            <p>
                                Where personal information is transferred
                                internationally, we will take reasonable steps
                                to ensure that the transfer and processing are
                                conducted in accordance with applicable
                                data-protection laws and appropriate safeguards.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="children"
                            number="13"
                            title="Children's Privacy"
                        >
                            <p>
                                The Services are not directed toward children
                                who are below the minimum age required to
                                independently use such services under applicable
                                law.
                            </p>

                            <p>
                                We do not knowingly collect personal information
                                from children in violation of applicable legal
                                requirements.
                            </p>

                            <p>
                                If you believe that a child has provided
                                personal information to us improperly, please
                                contact us so that we can investigate and take
                                appropriate action.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="third-party-links"
                            number="14"
                            title="Third-Party Links"
                        >
                            <p>
                                The Services may contain links to websites,
                                applications, or services operated by third
                                parties.
                            </p>

                            <p>
                                Shortify is not responsible for the privacy
                                practices, security, content, or policies of
                                third-party services.
                            </p>

                            <p>
                                We encourage you to review the privacy policy
                                of any third-party service before providing
                                personal information to it.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="user-content"
                            number="15"
                            title="User-Generated URLs & Content"
                        >
                            <p>
                                Shortify allows users to create shortened URLs
                                and QR codes that may direct users to
                                third-party websites.
                            </p>

                            <p>
                                Shortify does not control the content, privacy
                                practices, security, or availability of
                                websites to which shortened links may lead.
                            </p>

                            <p>
                                Creating or accessing a shortened URL does not
                                mean that Shortify endorses or is affiliated
                                with the destination website.
                            </p>

                            <p>
                                Users must not use Shortify to distribute
                                malicious, fraudulent, unlawful, or otherwise
                                prohibited content.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="communications"
                            number="16"
                            title="Communications"
                        >
                            <p>
                                We may send service-related communications,
                                including:
                            </p>

                            <BulletList
                                items={[
                                    "Account verification messages",
                                    "Password-reset emails",
                                    "Security notifications",
                                    "Important service announcements",
                                    "Responses to support requests",
                                ]}
                            />

                            <p>
                                These communications are necessary for
                                operating certain parts of the Services and
                                may not be treated as optional marketing
                                communications.
                            </p>

                            <p>
                                Where we send promotional communications, we
                                will provide appropriate mechanisms to opt out
                                where required by applicable law.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="changes"
                            number="17"
                            title="Changes to This Privacy Policy"
                        >
                            <p>
                                We may update this Privacy Policy from time to
                                time to reflect changes in our Services,
                                technology, legal requirements, or privacy
                                practices.
                            </p>

                            <p>
                                When we make material changes, we may provide
                                additional notice where appropriate.
                            </p>

                            <p>
                                The "Last Updated" date at the beginning of
                                this Privacy Policy indicates when it was most
                                recently revised.
                            </p>

                            <p>
                                Your continued use of the Services after an
                                updated Privacy Policy becomes effective
                                constitutes acknowledgment of the updated
                                policy to the extent permitted by applicable
                                law.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="contact"
                            number="18"
                            title="Contact Us"
                        >
                            <p>
                                If you have questions, concerns, requests, or
                                complaints regarding this Privacy Policy or the
                                handling of your personal information, please
                                contact us.
                            </p>

                            <div className="my-7 rounded-2xl border border-gray-200 bg-gray-950 p-7 text-white">
                                <p className="text-lg font-semibold">
                                    Shortify
                                </p>

                                <div className="mt-5 space-y-3 text-sm text-gray-400">
                                    <p>
                                        <span className="text-gray-200">
                                            Privacy / Data Protection:
                                        </span>{" "}
                                        devkartikeya2122002@gmail.com
                                    </p>
                                </div>

                                <a
                                    href="mailto:devkartikeya2122002@gmail.com"
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-yellow-400 transition hover:text-yellow-300"
                                >
                                    Contact privacy team
                                    <FiArrowUpRight />
                                </a>
                            </div>

                            <p>
                                We will review privacy-related requests and
                                respond within the period required by
                                applicable law.
                            </p>
                        </PolicySection>

                        <PolicySection
                            id="governing-law"
                            number="19"
                            title="Governing Law"
                        >
                            <p>
                                Unless otherwise required by applicable law,
                                this Privacy Policy shall be governed by the
                                laws applicable to the operation of Shortify
                                and interpreted in accordance with applicable
                                data-protection and privacy requirements.
                            </p>

                            <p>
                                Nothing in this Privacy Policy is intended to
                                limit any rights that cannot lawfully be
                                limited under the laws applicable to you.
                            </p>
                        </PolicySection>

                        {/* =========================
                            FINAL NOTE
                        ========================== */}
                        <div className="mt-16 border-t border-gray-200 pt-10">
                            <p className="text-sm text-gray-500">
                                This Privacy Policy was last updated on{" "}
                                <span className="font-semibold text-gray-800">
                                    October 5, 2026
                                </span>
                                .
                            </p>

                            <p className="mt-3 text-sm font-medium text-gray-900">
                                Shortify — Short links. Stronger identity.
                            </p>
                        </div>
                    </article>
                </div>
            </main>a
        </div>
    );
};

export default PrivacyPolicy;

/* =========================================
   REUSABLE COMPONENTS
========================================= */

const PolicySection = ({ id, number, title, children }) => {
    return (
        <section
            id={id}
            className="scroll-mt-28 border-b border-gray-200 pb-12 pt-2 first:pt-0 last:border-b-0"
        >
            <div className="mb-6 flex items-start gap-4">
                <span className="mt-1 text-xs font-bold tracking-[0.15em] text-yellow-500">
                    {number}
                </span>

                <h2 className="text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl">
                    {title}
                </h2>
            </div>

            <div className="space-y-5 text-[15px] leading-8 text-gray-600 sm:text-base">
                {children}
            </div>
        </section>
    );
};

const SubHeading = ({ children }) => {
    return (
        <h3 className="pt-4 text-lg font-semibold tracking-tight text-gray-950">
            {children}
        </h3>
    );
};

const BulletList = ({ items }) => {
    return (
        <ul className="space-y-3 pl-1">
            {items.map((item) => (
                <li
                    key={item}
                    className="flex items-start gap-3"
                >
                    <FiCheckCircle className="mt-1.5 shrink-0 text-yellow-500" />

                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
};

const InfoItem = ({ label, value }) => {
    return (
        <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400">
                {label}
            </p>

            <p className="mt-1 text-sm font-medium text-gray-900">
                {value}
            </p>
        </div>
    );
};

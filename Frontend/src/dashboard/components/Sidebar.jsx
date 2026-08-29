import { NavLink } from "react-router-dom";

const navigation = [
    {
        label: "Overview",
        path: "/dashboard",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
        )
    },
    {
        label: "My Links",
        path: "/dashboard/links",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                />
            </svg>
        )
    },
    {
        label: "Analytics",
        path: "/dashboard/analytics",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 19V5"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 19h16"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m7 15 3-4 3 2 5-7"
                />
            </svg>
        )
    },
    {
        label: "QR Codes",
        path: "/dashboard/qr-codes",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 4h6v6H4z" />
                <path d="M14 4h6v6h-6z" />
                <path d="M4 14h6v6H4z" />
                <path d="M14 14h2v2h-2z" />
                <path d="M18 14h2v6h-2z" />
                <path d="M14 18h4" />
            </svg>
        )
    }
];

const secondaryNavigation = [
    {
        label: "Settings",
        path: "/dashboard/settings",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.8 1.8-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.04 1.56V20h-2.54v-.1a1.7 1.7 0 0 0-1.04-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.8-1.8.06-.06A1.7 1.7 0 0 0 8.1 15a1.7 1.7 0 0 0-1.56-1.04H6.4v-2.54h.14A1.7 1.7 0 0 0 8.1 10.4a1.7 1.7 0 0 0-.34-1.88L7.7 8.46l1.8-1.8.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.04-1.56V5.4h2.54v.1a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.8 1.8-.06.06A1.7 1.7 0 0 0 19.4 10.4a1.7 1.7 0 0 0 1.56 1.04h.14v2.54h-.14A1.7 1.7 0 0 0 19.4 15Z"
                />
            </svg>
        )
    },
    {
        label: "Help & Support",
        path: "/dashboard/help",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.7 9a2.4 2.4 0 1 1 4.1 1.7c-.9.8-1.8 1.2-1.8 2.3"
                />
                <path
                    strokeLinecap="round"
                    d="M12 16.5h.01"
                />
            </svg>
        )
    }
];

const Sidebar = ({ isOpen, onClose }) => {

    const renderLink = (item) => (
        <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            end={item.path === "/dashboard"}
            className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${isActive
                    ? "bg-yellow-400 text-gray-950 shadow-sm"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-950"
                }`
            }
        >
            <span className="h-[18px] w-[18px] shrink-0">
                {item.icon}
            </span>

            {item.label}
        </NavLink>
    );


    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-gray-950/30 backdrop-blur-sm lg:hidden"
                />
            )}


            <aside
                className={`
                    fixed left-0 top-0 z-50 flex h-screen w-[270px]
                    flex-col border-r border-gray-200 bg-white
                    transition-transform duration-300
                    lg:translate-x-0
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >

                {/* Brand */}

                <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">

                    <NavLink
                        to="/dashboard"
                        onClick={onClose}
                        className="flex items-center gap-3"
                    >

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-400">

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

                        <span className="text-lg font-bold tracking-tight text-gray-950">
                            Shortify
                        </span>

                    </NavLink>


                    {/* Mobile close */}

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-950 lg:hidden"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                d="M6 6l12 12M18 6 6 18"
                            />
                        </svg>
                    </button>

                </div>


                {/* Navigation */}

                <div className="flex-1 overflow-y-auto px-4 py-6">

                    <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        Workspace
                    </p>

                    <nav className="space-y-1">
                        {navigation.map(renderLink)}
                    </nav>


                    <div className="my-7 border-t border-gray-100" />


                    <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        Account
                    </p>

                    <nav className="space-y-1">
                        {secondaryNavigation.map(renderLink)}
                    </nav>

                </div>


                {/* Bottom User Card */}

                <div className="border-t border-gray-100 p-4">

                    <button className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors hover:bg-gray-50">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-950 text-xs font-bold text-white">
                            KM
                        </div>

                        <div className="min-w-0 flex-1">

                            <p className="truncate text-sm font-semibold text-gray-950">
                                Kartikeya
                            </p>

                            <p className="text-xs text-gray-400">
                                Free plan
                            </p>

                        </div>

                        <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4 text-gray-400"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.51a.75.75 0 0 1-1.08 0l-4.25-4.51a.75.75 0 0 1 .02-1.06Z"
                                clipRule="evenodd"
                            />
                        </svg>

                    </button>

                </div>

            </aside>
        </>
    );
};

export default Sidebar;
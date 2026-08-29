const Topbar = ({ onMenuClick }) => {

    return (
        <header className="sticky top-0 z-30 flex h-20 items-center border-b border-gray-200 bg-white/90 px-4 backdrop-blur-md sm:px-6 lg:px-8">

            {/* Mobile menu */}

            <button
                onClick={onMenuClick}
                className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 lg:hidden"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                >
                    <path
                        strokeLinecap="round"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>


            {/* Search */}

            <div className="hidden max-w-md flex-1 sm:block">

                <div className="relative">

                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                    >
                        <circle cx="11" cy="11" r="7" />
                        <path
                            strokeLinecap="round"
                            d="m20 20-4-4"
                        />
                    </svg>

                    <input
                        type="text"
                        placeholder="Search links..."
                        className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-12 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-100"
                    />

                    <span className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-400 md:block">
                        ⌘ K
                    </span>

                </div>

            </div>


            {/* Right actions */}

            <div className="ml-auto flex items-center gap-2">

                {/* Mobile search */}

                <button className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-950 sm:hidden">

                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-5 w-5"
                    >
                        <circle cx="11" cy="11" r="7" />
                        <path
                            strokeLinecap="round"
                            d="m20 20-4-4"
                        />
                    </svg>

                </button>


                {/* Notification */}

                <button className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-950">

                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
                        />
                        <path
                            strokeLinecap="round"
                            d="M10 21h4"
                        />
                    </svg>

                    <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-yellow-400 ring-2 ring-white" />

                </button>


                <div className="mx-1 h-7 w-px bg-gray-200" />


                {/* User */}

                <button className="flex items-center gap-2 rounded-xl p-1.5 pr-2 transition-colors hover:bg-gray-50">

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-950 text-[11px] font-bold text-white">
                        KM
                    </div>

                    <div className="hidden text-left md:block">

                        <p className="text-xs font-semibold text-gray-950">
                            Kartikeya
                        </p>

                        <p className="text-[10px] text-gray-400">
                            Free plan
                        </p>

                    </div>

                    <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="hidden h-3.5 w-3.5 text-gray-400 md:block"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.51a.75.75 0 0 1-1.08 0l-4.25-4.51a.75.75 0 0 1 .02-1.06Z"
                            clipRule="evenodd"
                        />
                    </svg>

                </button>

            </div>

        </header>
    );
};

export default Topbar;
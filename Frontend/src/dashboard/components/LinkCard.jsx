const LinkCard = ({ link }) => {
    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(
                link.shortUrl
            );
        } catch (error) {
            console.error(
                "Failed to copy:",
                error
            );
        }
    };

    const formatDate = (date) => {
        if (!date) return "Just now";
        const created = new Date(date);
        const now = new Date();
        const diff =
            Math.floor(
                (now - created) / 1000
            );
        if (diff < 60) {
            return "Just now";
        }
        if (diff < 3600) {
            return `${Math.floor(diff / 60)}m ago`;
        }
        if (diff < 86400) {
            return `${Math.floor(diff / 3600)}h ago`;
        }
        if (diff < 604800) {
            return `${Math.floor(diff / 86400)}d ago`;
        }
        return created.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );
    };

    const shortUrl =
        link.shortUrl ||
        `http://localhost:3000/${link.shortCode}`;

    return (
        <div
            className="group flex flex-col gap-4 border-b
            border-gray-100 px-6 py-5 transition-colors
            last:border-b-0 hover:bg-gray-50/60
            sm:flex-row sm:items-center"
        >
            {/* Link information */}
            <div className="flex min-w-0 flex-1 items-center gap-4">
                <div
                    className="flex h-10 w-10 shrink-0 items-center
                    justify-center rounded-xl bg-yellow-50
                    text-yellow-600"
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
                            strokeLinejoin="round"
                            d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                        />
                    </svg>
                </div>

                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <a
                            href={shortUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="truncate text-sm font-semibold
                            text-gray-950 hover:text-yellow-600"
                        >
                            {shortUrl.replace(
                                "http://",
                                ""
                            ).replace(
                                "https://",
                                ""
                            )}
                        </a>
                    </div>

                    <p
                        title={link.originalUrl}
                        className="mt-1 truncate text-xs text-gray-400"
                    >
                        {link.originalUrl}
                    </p>
                </div>
            </div>

            {/* Clicks */}
            <div className="flex items-center gap-8 pl-14 sm:pl-0">
                <div className="min-w-[70px]">
                    <p className="text-xs text-gray-400">
                        Clicks
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">
                        {link.clicks || 0}
                    </p>
                </div>

                <div className="hidden min-w-[90px] sm:block">
                    <p className="text-xs text-gray-400">
                        Created
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-700">
                        {formatDate(link.createdAt)}
                    </p>
                </div>

                {/* Actions */}
                <div className="ml-auto flex items-center gap-1">
                    <button
                        onClick={copyLink}
                        title="Copy short link"
                        className="flex h-9 w-9 items-center
                        justify-center rounded-lg text-gray-400
                        transition-colors hover:bg-gray-100
                        hover:text-gray-900"
                    >
                        <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                d="M6.5 4.5A2.5 2.5 0 0 1 9 2h6.5A2.5 2.5 0 0 1 18 4.5V11a2.5 2.5 0 0 1-2.5 2.5H15v-2h.5a.5.5 0 0 0 .5-.5V4.5a.5.5 0 0 0-.5-.5H9a.5.5 0 0 0-.5.5V5h-2v-.5Z"
                            />
                            <path
                                d="M3 9.5A2.5 2.5 0 0 1 5.5 7H12a2.5 2.5 0 0 1 2.5 2.5V16a2.5 2.5 0 0 1-2.5 2.5H5.5A2.5 2.5 0 0 1 3 16V9.5Zm2 0v6.5c0 .276.224.5.5.5H12a.5.5 0 0 0 .5-.5V9.5A.5.5 0 0 0 12 9H5.5a.5.5 0 0 0-.5.5Z"
                            />
                        </svg>
                    </button>

                    <a
                        href={shortUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="Open link"
                        className="flex h-9 w-9 items-center
                        justify-center rounded-lg text-gray-400
                        transition-colors hover:bg-gray-100
                        hover:text-gray-900"
                    >
                        <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5 4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0V6.414l-7.293 7.293a1 1 0 0 1-1.414-1.414L12.586 5H6a1 1 0 0 1-1-1Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LinkCard;
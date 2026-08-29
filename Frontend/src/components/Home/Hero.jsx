import { useState } from "react";

const Hero = () => {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const handleClick = async () => {
        if (!url.trim()) {
            setError("Please enter a URL first.");
            return;
        }
        setError("");
        setShortUrl("");
        setCopied(false);
        setIsLoading(true);

        try {
            const response = await fetch(
                "http://localhost:3000/urls/shorten",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        originalUrl: url.trim()
                    })
                }
            );

            const result = await response.json();
            if (!response.ok) {
                throw new Error(
                    result.message ||
                    "Unable to shorten this URL."
                );
            }

            setShortUrl(result.data.shortUrl);
            setUrl("");

        } catch (error) {
            setError(
                error.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };


    const handleCopy = async () => {
        if (!shortUrl) return;
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);

        } catch (error) {
            console.error("Copy failed:", error);
        }
    };


    return (
        <section className="relative overflow-hidden bg-white">

            {/* Background decoration */}
            <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-yellow-100/60 blur-3xl" />
            <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-yellow-50 blur-3xl" />
            <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">
                <div className="mx-auto max-w-4xl text-center">

                    {/* Eyebrow */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-3.5 py-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                        <span className="text-xs font-semibold tracking-wide text-yellow-700">
                            SIMPLE. FAST. POWERFUL.
                        </span>
                    </div>

                    {/* Heading */}]
                    <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-gray-950 sm:text-6xl lg:text-7xl">
                        Turn long links into
                        <span className="relative mx-2 inline-block">
                            <span className="relative z-10 text-yellow-500">
                                powerful
                            </span>
                            <span className="absolute bottom-1 left-0 -z-0 h-3 w-full bg-yellow-100" />
                        </span>
                        short ones.
                    </h1>

                    {/* Description */}
                    <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
                        Create clean, memorable short links in seconds.
                        Manage every link from one simple dashboard and
                        keep track of how your audience interacts with them.
                    </p>

                    {/* ================= URL SHORTENER ================= */}
                    <div className="mx-auto mt-10 max-w-2xl">
                        <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-2 shadow-[0_15px_50px_rgba(0,0,0,0.07)] sm:flex-row">
                            {/* Input */}
                            <div className="flex flex-1 items-center gap-3 px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.7"
                                    stroke="currentColor"
                                    className="h-5 w-5 shrink-0 text-gray-400"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.19 8.688a4.5 4.5 0 0 0-6.38 0l-3 3a4.5 4.5 0 0 0 6.38 6.364l1.5-1.5"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10.81 15.312a4.5 4.5 0 0 0 6.38 0l3-3a4.5 4.5 0 0 0-6.38-6.364l-1.5 1.5"
                                    />
                                </svg>

                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => {
                                        setUrl(e.target.value);
                                        setError("");
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleClick();
                                        }
                                    }}
                                    placeholder="Paste your long URL here..."
                                    className="w-full bg-transparent py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                                />
                            </div>

                            {/* Button */}
                            <button
                                onClick={handleClick}
                                disabled={isLoading}
                                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-950 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Shortening...
                                    </>
                                ) : (
                                    <>
                                        Shorten URL
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-4 w-4"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M3 10a.75.75 0 0 1 .75-.75h10.69l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-red-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 1 1-16 0 8 8 0 0116 0ZM8.28 7.22a.75.75 0 011.06 0L10 7.88l.66-.66a.75.75 0 111.06 1.06l-.66.66.66.66a.75.75 0 11-1.06 1.06L10 8.94l-.66.66a.75.75 0 11-1.06-1.06L9.34 7.88l-.66-.66a.75.75 0 010-1.06Z"
                                        clipRule="evenodd"
                                    />
                                </svg>

                                {error}
                            </div>
                        )}

                        {/* Success Result */}
                        {shortUrl && (
                            <div className="mt-5 overflow-hidden rounded-2xl border border-yellow-200 bg-yellow-50/60 text-left">
                                <div className="flex items-center gap-3 border-b border-yellow-100 px-5 py-3">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-400">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-4 w-4 text-gray-950"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.704 4.153a.75.75 0 01.143 1.052l-7.25 9a.75.75 0 01-1.127.075l-4.25-4.25a.75.75 0 111.06-1.06l3.665 3.665 6.738-8.364a.75.75 0 011.021-.118Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-gray-950">
                                            Your link is ready!
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Your long URL has been shortened successfully.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 p-4 sm:flex-row">
                                    <div className="flex min-w-0 flex-1 items-center rounded-xl border border-yellow-200 bg-white px-4 py-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.8"
                                            stroke="currentColor"
                                            className="mr-3 h-5 w-5 shrink-0 text-yellow-500"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M13.19 8.688a4.5 4.5 0 0 0-6.38 0l-3 3a4.5 4.5 0 0 0 6.38 6.364l1.5-1.5"
                                            />

                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M10.81 15.312a4.5 4.5 0 0 0 6.38 0l3-3a4.5 4.5 0 0 0-6.38-6.364l-1.5 1.5"
                                            />
                                        </svg>

                                        <a
                                            href={shortUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="truncate text-sm font-semibold text-gray-950 hover:text-yellow-600"
                                        >
                                            {shortUrl}
                                        </a>
                                    </div>

                                    <button
                                        onClick={handleCopy}
                                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800 active:scale-[0.98]"
                                    >
                                        {copied ? (
                                            <>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.704 4.153a.75.75 0 01.143 1.052l-7.25 9a.75.75 0 01-1.127.075l-4.25-4.25a.75.75 0 111.06-1.06l3.665 3.665 6.738-8.364a.75.75 0 011.021-.118Z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                Copied
                                            </>
                                        ) : (
                                            <>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path d="M7.5 2.75A1.75 1.75 0 009.25 1h1.5a1.75 1.75 0 011.75 1.75V3h.75A2.75 2.75 0 0116 5.75v9.5A2.75 2.75 0 0113.25 18h-6.5A2.75 2.75 0 014 15.25v-9.5A2.75 2.75 0 016.75 3h.75v-.25ZM6.75 4.5a1.25 1.25 0 00-1.25 1.25v9.5a1.25 1.25 0 001.25 1.25h6.5a1.25 1.25 0 001.25-1.25v-9.5A1.25 1.25 0 0013.25 4.5H12v.25A1.75 1.75 0 0110.25 6h-1.5A1.75 1.75 0 017 4.75V4.5h-.25Z" />
                                                </svg>
                                                Copy
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {!shortUrl && !error && (
                            <p className="mt-3 text-xs text-gray-400">
                                Free to use · No credit card required
                            </p>
                        )}
                    </div>
                </div>

                {/* ================= PRODUCT PREVIEW ================= */}
                <div className="mx-auto mt-20 max-w-5xl">
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-2 shadow-[0_20px_70px_rgba(0,0,0,0.08)]">
                        <div className="rounded-xl border border-gray-200 bg-white">
                            {/* Fake browser header */}
                            <div className="flex h-12 items-center gap-2 border-b border-gray-100 px-5">
                                <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                                <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                                <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                                <div className="mx-auto hidden h-7 w-80 rounded-md bg-gray-50 sm:block" />

                            </div>


                            {/* Dashboard preview */}
                            <div className="grid min-h-[280px] grid-cols-1 md:grid-cols-[180px_1fr]">
                                <div className="hidden border-r border-gray-100 p-5 md:block">
                                    <div className="mb-8 h-6 w-24 rounded bg-gray-950" />
                                    <div className="space-y-3">
                                        <div className="h-8 rounded-lg bg-yellow-50" />
                                        <div className="h-8 rounded-lg bg-gray-50" />
                                        <div className="h-8 rounded-lg bg-gray-50" />
                                        <div className="h-8 rounded-lg bg-gray-50" />
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="h-5 w-32 rounded bg-gray-900" />
                                            <div className="mt-2 h-3 w-48 rounded bg-gray-100" />
                                        </div>
                                        <div className="h-9 w-24 rounded-lg bg-yellow-400" />
                                    </div>
                                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                        <div className="rounded-xl border border-gray-100 p-4">
                                            <div className="h-3 w-16 rounded bg-gray-100" />
                                            <div className="mt-3 h-6 w-12 rounded bg-gray-900" />
                                        </div>
                                        <div className="rounded-xl border border-gray-100 p-4">
                                            <div className="h-3 w-20 rounded bg-gray-100" />
                                            <div className="mt-3 h-6 w-16 rounded bg-gray-900" />
                                        </div>
                                        <div className="rounded-xl border border-gray-100 p-4">
                                            <div className="h-3 w-16 rounded bg-gray-100" />
                                            <div className="mt-3 h-6 w-14 rounded bg-yellow-500" />
                                        </div>
                                    </div>
                                    <div className="mt-5 h-24 rounded-xl bg-gray-50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
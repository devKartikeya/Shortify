import React, { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

const QRCodes = () => {
    const { user } = useOutletContext();

    const [links, setLinks] = useState([]);
    const [selectedLink, setSelectedLink] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const fetchLinks = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await fetch(
                "http://localhost:3000/urls/my-links",
                {
                    method: "GET",
                    credentials: "include"
                }
            );
            const result = await response.json();
            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to fetch links"
                );
            }
            const fetchedLinks = result.data || [];
            setLinks(fetchedLinks);
            if (fetchedLinks.length > 0) {
                setSelectedLink(fetchedLinks[0]);
            }
        } catch (error) {
            console.error("Failed to fetch links:", error);
            setError(
                error.message || "Unable to load your links"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    const filteredLinks = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return links;
        }

        return links.filter((link) => {
            return (
                link.shortCode?.toLowerCase().includes(query) ||
                link.originalUrl?.toLowerCase().includes(query)
            );
        });
    }, [links, search]);

    const getShortUrl = (link) => {
        return `http://localhost:3000/${link.shortCode}`;
    };

    const copyShortUrl = async () => {
        if (!selectedLink) return;

        try {
            await navigator.clipboard.writeText(
                getShortUrl(selectedLink)
            );
        } catch (error) {
            console.error("Failed to copy URL:", error);
        }
    };

    const downloadQRCode = () => {
        if (!selectedLink) return;

        const canvas = document.getElementById(
            "shortify-qr-code"
        );

        if (!canvas) return;

        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");

        const downloadLink = document.createElement("a");

        downloadLink.href = pngUrl;
        downloadLink.download = `shortify-${selectedLink.shortCode}.png`;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div className="mx-auto max-w-[1600px] space-y-8">

            {/* ================= HEADER ================= */}

            <div>
                <p className="mb-1 text-sm font-medium text-gray-400">
                    QR codes
                </p>
                <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                    Turn your links into QR codes
                </h1>
                <p className="mt-1.5 max-w-2xl text-sm text-gray-500">
                    Generate downloadable QR codes for any of your
                    Shortify links and share them anywhere.
                </p>
            </div>

            {/* ================= MAIN ================= */}
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
                {/* ================= LINKS ================= */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    {/* Header */}
                    <div className="border-b border-gray-100 p-5 sm:p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="font-semibold text-gray-950">
                                    Select a link
                                </h2>
                                <p className="mt-1 text-xs text-gray-400">
                                    Choose a short link to generate its QR code.
                                </p>
                            </div>
                            <div className="relative w-full sm:w-64">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                                >
                                    <circle cx="11" cy="11" r="7" />
                                    <path
                                        strokeLinecap="round"
                                        d="m16 16 4 4"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Search links..."
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-100"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Links */}
                    {loading ? (
                        <div className="space-y-2 p-4">
                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-4 rounded-xl p-4"
                                >
                                    <div className="h-10 w-10 animate-pulse rounded-xl bg-gray-100" />
                                    <div className="flex-1">
                                        <div className="h-4 w-32 animate-pulse rounded bg-gray-100" />
                                        <div className="mt-2 h-3 w-64 animate-pulse rounded bg-gray-100" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-6 w-6"
                                >
                                    <circle cx="12" cy="12" r="9" />
                                    <path
                                        strokeLinecap="round"
                                        d="M12 8v4"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        d="M12 16h.01"
                                    />
                                </svg>
                            </div>
                            <p className="mt-4 text-sm font-semibold text-gray-900">
                                Couldn't load your links
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                                {error}
                            </p>
                        </div>
                    ) : links.length === 0 ? (
                        <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-7 w-7"
                                >
                                    <path d="M4 4h6v6H4z" />
                                    <path d="M14 4h6v6h-6z" />
                                    <path d="M4 14h6v6H4z" />
                                    <path d="M14 14h2v2h-2z" />
                                    <path d="M18 14h2v6h-2z" />
                                    <path d="M14 18h4" />
                                </svg>
                            </div>
                            <p className="mt-4 text-sm font-semibold text-gray-900">
                                No links available
                            </p>
                            <p className="mt-1 max-w-sm text-xs leading-5 text-gray-400">
                                Create your first short link and you'll
                                be able to generate a QR code for it here.
                            </p>
                        </div>
                    ) : filteredLinks.length === 0 ? (
                        <div className="flex min-h-[250px] items-center justify-center px-6 text-center">
                            <div>
                                <p className="text-sm font-semibold text-gray-900">
                                    No matching links
                                </p>
                                <p className="mt-1 text-xs text-gray-400">
                                    Try searching with a different URL or
                                    short code.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">

                            {filteredLinks.map((link) => {

                                const isSelected =
                                    selectedLink?._id === link._id;

                                return (
                                    <button
                                        key={link._id}
                                        onClick={() =>
                                            setSelectedLink(link)
                                        }
                                        className={`flex w-full items-center gap-4 p-4 text-left transition-colors cursor-pointer ${isSelected
                                                ? "bg-yellow-50/70"
                                                : "hover:bg-gray-50"
                                            }`}
                                    >

                                        {/* Link Icon */}

                                        <div
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isSelected
                                                    ? "bg-yellow-400 text-gray-950"
                                                    : "bg-gray-100 text-gray-500"
                                                }`}
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

                                        {/* Information */}

                                        <div className="min-w-0 flex-1">

                                            <p className="truncate text-sm font-semibold text-gray-950">
                                                /{link.shortCode}
                                            </p>

                                            <p className="mt-1 truncate text-xs text-gray-400">
                                                {link.originalUrl}
                                            </p>

                                        </div>

                                        {/* Clicks */}

                                        <div className="hidden text-right sm:block">

                                            <p className="text-sm font-semibold text-gray-900">
                                                {link.clicks || 0}
                                            </p>

                                            <p className="text-[11px] text-gray-400">
                                                clicks
                                            </p>

                                        </div>

                                        {/* Arrow */}

                                        <svg
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className={`h-4 w-4 shrink-0 ${isSelected
                                                    ? "text-gray-950"
                                                    : "text-gray-300"
                                                }`}
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.21 14.77a.75.75 0 0 1 .02-1.06L10.94 10 7.23 6.29a.75.75 0 1 1 1.06-1.06l4.24 4.24a.75.75 0 0 1 0 1.06l-4.24 4.24a.75.75 0 0 1-1.08.02Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                    </button>
                                );
                            })}

                        </div>

                    )}

                </div>

                {/* ================= QR PREVIEW ================= */}

                <div className="rounded-2xl border border-gray-200 bg-white">

                    <div className="border-b border-gray-100 p-6">

                        <h2 className="font-semibold text-gray-950">
                            QR code
                        </h2>

                        <p className="mt-1 text-xs text-gray-400">
                            Preview and download your QR code.
                        </p>

                    </div>

                    {selectedLink ? (

                        <div className="p-6">

                            {/* QR */}

                            <div className="flex items-center justify-center rounded-2xl bg-gray-50 p-8">

                                <div className="rounded-2xl bg-white p-4 shadow-sm">

                                    <QRCodeCanvas
                                        id="shortify-qr-code"
                                        value={getShortUrl(selectedLink)}
                                        size={220}
                                        level="H"
                                        includeMargin={true}
                                    />

                                </div>

                            </div>

                            {/* Selected Link */}

                            <div className="mt-6">

                                <p className="text-xs font-medium text-gray-400">
                                    Short link
                                </p>

                                <div className="mt-2 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3">

                                    <p className="truncate text-sm font-semibold text-gray-950">
                                        /{selectedLink.shortCode}
                                    </p>

                                    <p className="mt-1 truncate text-xs text-gray-400">
                                        {getShortUrl(selectedLink)}
                                    </p>

                                </div>

                            </div>

                            {/* Actions */}

                            <div className="mt-5 grid grid-cols-2 gap-3">

                                <button
                                    onClick={copyShortUrl}
                                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
                                >

                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        className="h-4 w-4"
                                    >
                                        <rect
                                            x="9"
                                            y="9"
                                            width="11"
                                            height="11"
                                            rx="2"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                                        />
                                    </svg>

                                    Copy link

                                </button>

                                <button
                                    onClick={downloadQRCode}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
                                >

                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 3v12"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m7 10 5 5 5-5"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 21h14"
                                        />
                                    </svg>

                                    Download

                                </button>

                            </div>

                            {/* Info */}

                            <div className="mt-5 rounded-xl border border-yellow-200 bg-yellow-50 p-4">

                                <div className="flex gap-3">

                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-yellow-400 text-gray-950">

                                        <svg
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-4 w-4"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM9.25 8.5a.75.75 0 0 1 1.5 0v5a.75.75 0 0 1-1.5 0v-5ZM10 5.75a.875.875 0 1 0 0 1.75.875.875 0 0 0 0-1.75Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                    </div>

                                    <div>

                                        <p className="text-xs font-semibold text-yellow-800">
                                            Works with your existing link
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-yellow-700">
                                            Anyone scanning this QR code will
                                            be redirected through your Shortify
                                            link, so its existing click tracking
                                            continues to work.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ) : (

                        <div className="flex min-h-[500px] flex-col items-center justify-center px-6 text-center">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">

                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-7 w-7"
                                >
                                    <path d="M4 4h6v6H4z" />
                                    <path d="M14 4h6v6h-6z" />
                                    <path d="M4 14h6v6H4z" />
                                    <path d="M14 14h2v2h-2z" />
                                    <path d="M18 14h2v6h-2z" />
                                    <path d="M14 18h4" />
                                </svg>

                            </div>

                            <p className="mt-4 text-sm font-semibold text-gray-900">
                                Select a link
                            </p>

                            <p className="mt-1 max-w-xs text-xs leading-5 text-gray-400">
                                Choose a link from the list to generate
                                its QR code.
                            </p>

                        </div>

                    )}

                </div>

            </div>

            {/* ================= FOOTNOTE ================= */}

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">

                <div className="flex gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-gray-600 shadow-sm">

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
                                d="M12 3v18M3 12h18"
                            />
                        </svg>

                    </div>

                    <div>

                        <p className="text-sm font-semibold text-gray-900">
                            One QR code, one short link
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            Your QR codes point to your Shortify URLs rather
                            than directly to the destination. This means the
                            destination can remain behind the same short link
                            and its clicks can still be tracked.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRCodes;
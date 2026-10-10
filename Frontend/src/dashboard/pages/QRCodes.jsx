import React, { useEffect, useMemo, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import QRCode from "qrcode";

const DEFAULT_SETTINGS = {
    logo: null,
    qrColor: "#111827",
    bgColor: "#ffffff",
    qrSize: 512,
    logoSize: 90,
    brandText: "",
    errorCorrection: "H",
    qrStyle: "square",
};

const PRESETS_KEY = "shortify-qr-presets";

const QRCodes = () => {
    const { user } = useOutletContext();

    const [links, setLinks] = useState([]);
    const [selectedLink, setSelectedLink] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    // QR CUSTOMIZATION
    const [logo, setLogo] = useState(null);
    const [qrColor, setQrColor] = useState("#111827");
    const [bgColor, setBgColor] = useState("#ffffff");

    const [qrSize, setQrSize] = useState(512);
    const [logoSize, setLogoSize] = useState(90);

    const [brandText, setBrandText] = useState("");
    const [errorCorrection, setErrorCorrection] = useState("H");
    const [qrStyle, setQrStyle] = useState("square");

    const [presets, setPresets] = useState([]);
    const [presetName, setPresetName] = useState("");

    const qrPreviewRef = useRef(null);

    // FETCH LINKS
    const fetchLinks = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${import.meta.env.VITE_API_URL}/urls/my-links`, {
                method: "GET",
                credentials: "include",
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to fetch links");
            }

            const fetchedLinks = result.data || [];
            setLinks(fetchedLinks);

            if (fetchedLinks.length > 0) {
                setSelectedLink(fetchedLinks[0]);
            }
        } catch (error) {
            console.error("Failed to fetch links:", error);
            setError(error.message || "Unable to load your links");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    // LOAD PRESETS
    useEffect(() => {
        try {
            const savedPresets = localStorage.getItem(PRESETS_KEY);
            if (savedPresets) {
                setPresets(JSON.parse(savedPresets));
            }
        } catch (error) {
            console.error("Failed to load QR presets:", error);
        }
    }, []);

    // FILTER LINKS
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

    // SHORT URL
    const getShortUrl = (link) => {
        return `${import.meta.env.VITE_API_URL}/${link.shortCode}`;
    };

    // LOGO UPLOAD
    const handleLogoUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setLogo(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // COPY URL
    const copyShortUrl = async () => {
        if (!selectedLink) return;
        try {
            await navigator.clipboard.writeText(getShortUrl(selectedLink));
        } catch (error) {
            console.error("Failed to copy URL:", error);
        }
    };

    // CURRENT SETTINGS
    const getCurrentSettings = () => {
        return {
            logo,
            qrColor,
            bgColor,
            qrSize,
            logoSize,
            brandText,
            errorCorrection,
            qrStyle,
        };
    };

    // RESET
    const resetCustomization = () => {
        setLogo(DEFAULT_SETTINGS.logo);
        setQrColor(DEFAULT_SETTINGS.qrColor);
        setBgColor(DEFAULT_SETTINGS.bgColor);
        setQrSize(DEFAULT_SETTINGS.qrSize);
        setLogoSize(DEFAULT_SETTINGS.logoSize);
        setBrandText(DEFAULT_SETTINGS.brandText);
        setErrorCorrection(DEFAULT_SETTINGS.errorCorrection);
        setQrStyle(DEFAULT_SETTINGS.qrStyle);
    };

    // SAVE PRESET
    const savePreset = () => {
        const name = presetName.trim();
        if (!name) return;

        const newPreset = {
            id: Date.now(),
            name,
            settings: getCurrentSettings(),
        };

        const updatedPresets = [...presets, newPreset];
        setPresets(updatedPresets);
        localStorage.setItem(PRESETS_KEY, JSON.stringify(updatedPresets));
        setPresetName("");
    };

    // LOAD PRESET
    const loadPreset = (preset) => {
        const settings = preset.settings;

        setLogo(settings.logo ?? null);
        setQrColor(settings.qrColor ?? DEFAULT_SETTINGS.qrColor);
        setBgColor(settings.bgColor ?? DEFAULT_SETTINGS.bgColor);
        setQrSize(settings.qrSize ?? DEFAULT_SETTINGS.qrSize);
        setLogoSize(settings.logoSize ?? DEFAULT_SETTINGS.logoSize);
        setBrandText(settings.brandText ?? DEFAULT_SETTINGS.brandText);
        setErrorCorrection(settings.errorCorrection ?? DEFAULT_SETTINGS.errorCorrection);
        setQrStyle(settings.qrStyle ?? DEFAULT_SETTINGS.qrStyle);
    };

    // DELETE PRESET
    const deletePreset = (id) => {
        const updatedPresets = presets.filter((preset) => preset.id !== id);
        setPresets(updatedPresets);
        localStorage.setItem(PRESETS_KEY, JSON.stringify(updatedPresets));
    };

    // LOAD IMAGE
    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = src;
        });
    };

    // ROUNDED RECTANGLE
    const drawRoundedImage = (context, image, x, y, width, height, radius) => {
        context.save();
        context.beginPath();
        context.roundRect(x, y, width, height, radius);
        context.clip();
        context.drawImage(image, x, y, width, height);
        context.restore();
    };

    // GENERATE QR CANVAS
    const generateQRCodeCanvas = async () => {
        if (!selectedLink) return null;

        const shortUrl = getShortUrl(selectedLink);
        const canvas = document.createElement("canvas");

        await QRCode.toCanvas(canvas, shortUrl, {
            width: qrSize,
            margin: 4,
            errorCorrectionLevel: errorCorrection,
            color: {
                dark: qrColor,
                light: bgColor,
            },
        });

        return canvas;
    };

    // DOWNLOAD PNG
    const downloadQRCode = async () => {
        if (!selectedLink) return;

        try {
            const qrCanvas = await generateQRCodeCanvas();
            if (!qrCanvas) return;

            const padding = 32;
            const textHeight = brandText.trim() ? 70 : 0;

            const finalCanvas = document.createElement("canvas");
            finalCanvas.width = qrCanvas.width + padding * 2;
            finalCanvas.height = qrCanvas.height + padding * 2 + textHeight;

            const context = finalCanvas.getContext("2d");
            if (!context) return;

            // BACKGROUND
            context.fillStyle = bgColor;
            context.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

            // QR
            if (qrStyle === "rounded") {
                context.save();
                context.beginPath();
                context.roundRect(padding, padding, qrCanvas.width, qrCanvas.height, 28);
                context.clip();
                context.drawImage(qrCanvas, padding, padding);
                context.restore();
            } else {
                context.drawImage(qrCanvas, padding, padding);
            }

            // LOGO
            if (logo) {
                const image = await loadImage(logo);
                const currentLogoSize = logoSize;
                const x = (finalCanvas.width - currentLogoSize) / 2;
                const y = padding + (qrCanvas.height - currentLogoSize) / 2;

                // Logo background
                context.fillStyle = bgColor;
                context.beginPath();
                context.roundRect(x - 8, y - 8, currentLogoSize + 16, currentLogoSize + 16, 14);
                context.fill();

                // Logo
                drawRoundedImage(context, image, x, y, currentLogoSize, currentLogoSize, 10);
            }

            // BRAND TEXT
            if (brandText.trim()) {
                context.fillStyle = qrColor;
                context.font = "600 28px Arial";
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillText(
                    brandText.trim(),
                    finalCanvas.width / 2,
                    qrCanvas.height + padding + textHeight / 2
                );
            }

            downloadCanvas(finalCanvas);
        } catch (error) {
            console.error("Failed to generate QR:", error);
        }
    };

    // DOWNLOAD CANVAS
    const downloadCanvas = (canvas) => {
        const pngUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `shortify-${selectedLink.shortCode}-custom.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    // DOWNLOAD SVG
    const downloadSVG = async () => {
        if (!selectedLink) return;

        try {
            const qrSvgString = await QRCode.toString(getShortUrl(selectedLink), {
                type: "svg",
                width: qrSize,
                margin: 4,
                errorCorrectionLevel: errorCorrection,
                color: {
                    dark: qrColor,
                    light: bgColor,
                },
            });

            const parser = new DOMParser();
            const documentNode = parser.parseFromString(qrSvgString, "image/svg+xml");
            const svg = documentNode.documentElement;

            const padding = 32;
            const textHeight = brandText.trim() ? 60 : 0;
            const finalSize = qrSize + padding * 2;

            svg.setAttribute("width", finalSize);
            svg.setAttribute("height", finalSize + textHeight);
            svg.setAttribute("viewBox", `0 0 ${finalSize} ${finalSize + textHeight}`);

            // Background
            const background = documentNode.createElementNS("http://www.w3.org/2000/svg", "rect");
            background.setAttribute("x", "0");
            background.setAttribute("y", "0");
            background.setAttribute("width", finalSize);
            background.setAttribute("height", finalSize + textHeight);
            background.setAttribute("fill", bgColor);
            svg.insertBefore(background, svg.firstChild);

            // Move QR
            const qrGroup = documentNode.createElementNS("http://www.w3.org/2000/svg", "g");
            qrGroup.setAttribute("transform", `translate(${padding}, ${padding})`);

            if (qrStyle === "rounded") {
                const clipPath = documentNode.createElementNS("http://www.w3.org/2000/svg", "clipPath");
                clipPath.setAttribute("id", "qr-rounded-clip");

                const clipRect = documentNode.createElementNS("http://www.w3.org/2000/svg", "rect");
                clipRect.setAttribute("x", "0");
                clipRect.setAttribute("y", "0");
                clipRect.setAttribute("width", qrSize);
                clipRect.setAttribute("height", qrSize);
                clipRect.setAttribute("rx", "28");
                clipRect.setAttribute("ry", "28");

                clipPath.appendChild(clipRect);
                svg.insertBefore(clipPath, svg.firstChild);
                qrGroup.setAttribute("clip-path", "url(#qr-rounded-clip)");
            }

            while (svg.childNodes.length > 1) {
                const node = svg.childNodes[1];
                qrGroup.appendChild(node);
            }

            svg.appendChild(qrGroup);

            // Brand text
            if (brandText.trim()) {
                const text = documentNode.createElementNS("http://www.w3.org/2000/svg", "text");
                text.setAttribute("x", finalSize / 2);
                text.setAttribute("y", finalSize + 38);
                text.setAttribute("text-anchor", "middle");
                text.setAttribute("font-family", "Arial, sans-serif");
                text.setAttribute("font-size", "24");
                text.setAttribute("font-weight", "600");
                text.setAttribute("fill", qrColor);
                text.textContent = brandText.trim();
                svg.appendChild(text);
            }

            // Logo
            if (logo) {
                const image = documentNode.createElementNS("http://www.w3.org/2000/svg", "image");
                const x = (finalSize - logoSize) / 2;
                const y = padding + (qrSize - logoSize) / 2;

                image.setAttribute("x", x);
                image.setAttribute("y", y);
                image.setAttribute("width", logoSize);
                image.setAttribute("height", logoSize);
                image.setAttribute("href", logo);
                image.setAttribute("preserveAspectRatio", "xMidYMid slice");

                svg.appendChild(image);
            }

            const serializer = new XMLSerializer();
            const svgBlob = new Blob([serializer.serializeToString(svg)], {
                type: "image/svg+xml;charset=utf-8",
            });

            const url = URL.createObjectURL(svgBlob);
            const downloadLink = document.createElement("a");
            downloadLink.href = url;
            downloadLink.download = `shortify-${selectedLink.shortCode}-custom.svg`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to generate SVG:", error);
        }
    };

    return (
        <div className="mx-auto max-w-[1600px] space-y-8">
            <Helmet>
                <title>
                    QR-Codes | Shortify
                </title>
                <meta name="description" content="Manage and customize your QR-Codes." />
            </Helmet>
            {/* HEADER */}
            <div>
                <p className="mb-1 text-sm font-medium text-gray-400">QR codes</p>
                <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                    Turn your links into QR codes
                </h1>
                <p className="mt-1.5 max-w-2xl text-sm text-gray-500">
                    Generate branded, downloadable QR codes for any of your Shortify links.
                </p>
            </div>

            {/* MAIN */}
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
                {/* LINKS */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    {/* Header */}
                    <div className="border-b border-gray-100 p-5 sm:p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="font-semibold text-gray-950">Select a link</h2>
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
                                    <path strokeLinecap="round" d="m16 16 4 4" />
                                </svg>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
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
                                <div key={item} className="flex items-center gap-4 rounded-xl p-4">
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
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                                    <circle cx="12" cy="12" r="9" />
                                    <path strokeLinecap="round" d="M12 8v4" />
                                    <path strokeLinecap="round" d="M12 16h.01" />
                                </svg>
                            </div>
                            <p className="mt-4 text-sm font-semibold text-gray-900">Couldn't load your links</p>
                            <p className="mt-1 text-xs text-gray-400">{error}</p>
                        </div>
                    ) : links.length === 0 ? (
                        <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
                                    <path d="M4 4h6v6H4z" />
                                    <path d="M14 4h6v6h-6z" />
                                    <path d="M4 14h6v6H4z" />
                                    <path d="M14 14h2v2h-2z" />
                                    <path d="M18 14h2v6h-2z" />
                                    <path d="M14 18h4" />
                                </svg>
                            </div>
                            <p className="mt-4 text-sm font-semibold text-gray-900">No links available</p>
                            <p className="mt-1 max-w-sm text-xs leading-5 text-gray-400">
                                Create your first short link and you'll be able to generate a QR code for it here.
                            </p>
                        </div>
                    ) : filteredLinks.length === 0 ? (
                        <div className="flex min-h-[250px] items-center justify-center px-6 text-center">
                            <div>
                                <p className="text-sm font-semibold text-gray-900">No matching links</p>
                                <p className="mt-1 text-xs text-gray-400">
                                    Try searching with a different URL or short code.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {filteredLinks.map((link) => {
                                const isSelected = selectedLink?._id === link._id;

                                return (
                                    <button
                                        key={link._id}
                                        onClick={() => setSelectedLink(link)}
                                        className={`flex w-full cursor-pointer items-center gap-4 p-4 text-left transition-colors ${isSelected ? "bg-yellow-50/70" : "hover:bg-gray-50"
                                            }`}
                                    >
                                        {/* Icon */}
                                        <div
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isSelected ? "bg-yellow-400 text-gray-950" : "bg-gray-100 text-gray-500"
                                                }`}
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                            </svg>
                                        </div>

                                        {/* Information */}
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-semibold text-gray-950">/{link.shortCode}</p>
                                            <p className="mt-1 truncate text-xs text-gray-400">{link.originalUrl}</p>
                                        </div>

                                        {/* Clicks */}
                                        <div className="hidden text-right sm:block">
                                            <p className="text-sm font-semibold text-gray-900">{link.clicks || 0}</p>
                                            <p className="text-[11px] text-gray-400">clicks</p>
                                        </div>

                                        {/* Arrow */}
                                        <svg
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className={`h-4 w-4 shrink-0 ${isSelected ? "text-gray-950" : "text-gray-300"
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

                {/* QR PANEL */}
                <div className="rounded-2xl border border-gray-200 bg-white">
                    <div className="border-b border-gray-100 p-6">
                        <h2 className="font-semibold text-gray-950">QR code</h2>
                        <p className="mt-1 text-xs text-gray-400">Preview and customize your QR code.</p>
                    </div>

                    {selectedLink ? (
                        <>
                            {/* PREVIEW */}
                            <div className="p-6">
                                <div className="flex items-center justify-center rounded-2xl bg-gray-50 p-8">
                                    <div
                                        ref={qrPreviewRef}
                                        className="flex flex-col items-center rounded-2xl p-4 shadow-sm"
                                        style={{
                                            backgroundColor: bgColor,
                                        }}
                                    >
                                        {/* QR AREA */}
                                        <div
                                            className={`relative overflow-hidden ${qrStyle === "rounded" ? "rounded-[28px]" : "rounded-none"
                                                }`}
                                            style={{
                                                backgroundColor: bgColor,
                                            }}
                                        >
                                            <PreviewQR
                                                value={getShortUrl(selectedLink)}
                                                size={Math.min(qrSize / 2, 320)}
                                                qrColor={qrColor}
                                                bgColor={bgColor}
                                                errorCorrection={errorCorrection}
                                            />

                                            {/* CENTERED LOGO */}
                                            {logo && (
                                                <div
                                                    className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border-4 shadow-sm"
                                                    style={{
                                                        width: `${Math.min(logoSize / 2, 120)}px`,
                                                        height: `${Math.min(logoSize / 2, 120)}px`,
                                                        backgroundColor: bgColor,
                                                        borderColor: bgColor,
                                                    }}
                                                >
                                                    <img src={logo} alt="QR logo" className="h-full w-full rounded-lg object-contain" />
                                                </div>
                                            )}
                                        </div>

                                        {/* BRAND TEXT */}
                                        {brandText.trim() && (
                                            <p
                                                className="mt-3 max-w-[280px] truncate text-center text-sm font-semibold"
                                                style={{
                                                    color: qrColor,
                                                }}
                                            >
                                                {brandText.trim()}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* LINK */}
                                <div className="mt-6">
                                    <p className="text-xs font-medium text-gray-400">Short link</p>
                                    <div className="mt-2 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3">
                                        <p className="truncate text-sm font-semibold text-gray-950">/{selectedLink.shortCode}</p>
                                        <p className="mt-1 truncate text-xs text-gray-400">{getShortUrl(selectedLink)}</p>
                                    </div>
                                </div>

                                {/* CUSTOMIZATION */}
                                <div className="mt-6 border-t border-gray-100 pt-6">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-950">Customize QR</p>
                                        <p className="mt-1 text-xs text-gray-400">Add your brand identity to the QR code.</p>
                                    </div>

                                    {/* Logo */}
                                    <div className="mt-5">
                                        <label className="text-xs font-medium text-gray-600">Brand logo</label>
                                        <div className="mt-2 flex items-center gap-3">
                                            <label className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600 transition hover:border-yellow-400 hover:bg-yellow-50">
                                                Upload logo
                                                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                                            </label>
                                            {logo && (
                                                <button
                                                    type="button"
                                                    onClick={() => setLogo(null)}
                                                    className="text-xs font-medium text-red-500 hover:text-red-600"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Brand Text */}
                                    <div className="mt-5">
                                        <label className="text-xs font-medium text-gray-600">Brand text</label>
                                        <input
                                            type="text"
                                            value={brandText}
                                            maxLength={30}
                                            onChange={(event) => setBrandText(event.target.value)}
                                            placeholder="e.g. Shortify"
                                            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-100"
                                        />
                                        <p className="mt-1 text-[11px] text-gray-400">Optional text displayed below the QR code.</p>
                                    </div>

                                    {/* Colors */}
                                    <div className="mt-5 grid grid-cols-2 gap-4">
                                        {/* QR Color */}
                                        <div>
                                            <label className="text-xs font-medium text-gray-600">QR color</label>
                                            <div className="mt-2 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-2">
                                                <input
                                                    type="color"
                                                    value={qrColor}
                                                    onChange={(event) => setQrColor(event.target.value)}
                                                    className="h-8 w-8 cursor-pointer rounded-lg border-0 bg-transparent p-0"
                                                />
                                                <span className="text-xs font-medium text-gray-500">{qrColor}</span>
                                            </div>
                                        </div>

                                        {/* Background */}
                                        <div>
                                            <label className="text-xs font-medium text-gray-600">Background</label>
                                            <div className="mt-2 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-2">
                                                <input
                                                    type="color"
                                                    value={bgColor}
                                                    onChange={(event) => setBgColor(event.target.value)}
                                                    className="h-8 w-8 cursor-pointer rounded-lg border-0 bg-transparent p-0"
                                                />
                                                <span className="text-xs font-medium text-gray-500">{bgColor}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* QR Size */}
                                    <div className="mt-5">
                                        <label className="text-xs font-medium text-gray-600">QR size</label>
                                        <div className="mt-2 grid grid-cols-3 gap-2">
                                            {[256, 512, 1024].map((size) => (
                                                <button
                                                    key={size}
                                                    type="button"
                                                    onClick={() => setQrSize(size)}
                                                    className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${qrSize === size
                                                        ? "border-yellow-400 bg-yellow-50 text-gray-950"
                                                        : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-white"
                                                        }`}
                                                >
                                                    {size}px
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Logo Size */}
                                    <div className="mt-5">
                                        <label className="text-xs font-medium text-gray-600">Logo size</label>
                                        <div className="mt-2 grid grid-cols-3 gap-2">
                                            {[
                                                { label: "Small", value: 60 },
                                                { label: "Medium", value: 90 },
                                                { label: "Large", value: 120 },
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => setLogoSize(option.value)}
                                                    className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${logoSize === option.value
                                                        ? "border-yellow-400 bg-yellow-50 text-gray-950"
                                                        : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-white"
                                                        }`}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Error Correction */}
                                    <div className="mt-5">
                                        <label className="text-xs font-medium text-gray-600">Error correction</label>
                                        <div className="mt-2 grid grid-cols-4 gap-2">
                                            {[
                                                { value: "L", label: "Low", percentage: "7%" },
                                                { value: "M", label: "Medium", percentage: "15%" },
                                                { value: "Q", label: "Quartile", percentage: "25%" },
                                                { value: "H", label: "High", percentage: "30%" },
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => setErrorCorrection(option.value)}
                                                    className={`rounded-xl border px-2 py-2.5 text-xs font-semibold transition ${errorCorrection === option.value
                                                        ? "border-yellow-400 bg-yellow-50 text-gray-950"
                                                        : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-white"
                                                        }`}
                                                >
                                                    <span className="block">{option.value}</span>
                                                    <span className="mt-0.5 block text-[10px] font-normal text-gray-400">
                                                        {option.percentage}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                        <p className="mt-1 text-[11px] text-gray-400">
                                            Higher correction improves resilience when the QR is damaged or partially covered.
                                        </p>
                                    </div>

                                    {/* QR Style */}
                                    <div className="mt-5">
                                        <label className="text-xs font-medium text-gray-600">QR style</label>
                                        <div className="mt-2 grid grid-cols-2 gap-2">
                                            {[
                                                { value: "square", label: "Square" },
                                                { value: "rounded", label: "Rounded" },
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => setQrStyle(option.value)}
                                                    className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${qrStyle === option.value
                                                        ? "border-yellow-400 bg-yellow-50 text-gray-950"
                                                        : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-white"
                                                        }`}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Reset */}
                                    <div className="mt-5 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={resetCustomization}
                                            className="text-xs font-medium text-gray-500 transition hover:text-gray-950"
                                        >
                                            Reset customization
                                        </button>
                                    </div>
                                </div>

                                {/* PRESETS */}
                                <div className="mt-6 border-t border-gray-100 pt-6">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-950">Saved presets</p>
                                        <p className="mt-1 text-xs text-gray-400">Save your favorite branding configuration.</p>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <input
                                            type="text"
                                            value={presetName}
                                            onChange={(event) => setPresetName(event.target.value)}
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter") {
                                                    savePreset();
                                                }
                                            }}
                                            placeholder="Preset name..."
                                            className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs outline-none transition focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-100"
                                        />
                                        <button
                                            type="button"
                                            onClick={savePreset}
                                            disabled={!presetName.trim()}
                                            className="rounded-xl bg-gray-950 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            Save
                                        </button>
                                    </div>

                                    {presets.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                            {presets.map((preset) => (
                                                <div
                                                    key={preset.id}
                                                    className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5"
                                                >
                                                    <p className="min-w-0 flex-1 truncate text-xs font-medium text-gray-700">{preset.name}</p>
                                                    <button
                                                        type="button"
                                                        onClick={() => loadPreset(preset)}
                                                        className="text-xs font-semibold text-gray-600 hover:text-gray-950"
                                                    >
                                                        Load
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => deletePreset(preset.id)}
                                                        className="text-xs font-semibold text-red-500 hover:text-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* ACTIONS */}
                                <div className="mt-6 grid grid-cols-3 gap-2">
                                    <button
                                        onClick={copyShortUrl}
                                        className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                                            <rect x="9" y="9" width="11" height="11" rx="2" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                        </svg>
                                        Copy
                                    </button>

                                    <button
                                        onClick={downloadQRCode}
                                        className="flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-3 py-3 text-xs font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m7 10 5 5 5-5" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 21h14" />
                                        </svg>
                                        PNG
                                    </button>

                                    <button
                                        onClick={downloadSVG}
                                        className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
                                    >
                                        SVG
                                    </button>
                                </div>

                                {/* INFO */}
                                <div className="mt-5 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                                    <div className="flex gap-3">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-yellow-400 text-gray-950">
                                            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM9.25 8.5a.75.75 0 0 1 1.5 0v5a.75.75 0 0 1-1.5 0v-5ZM10 5.75a.875.875 0 1 0 0 1.75.875.875 0 0 0 0-1.75Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-yellow-800">Works with your existing link</p>
                                            <p className="mt-1 text-xs leading-5 text-yellow-700">
                                                Anyone scanning this QR code will be redirected through your Shortify link, so its
                                                existing click tracking continues to work.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex min-h-[500px] flex-col items-center justify-center px-6 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
                                    <path d="M4 4h6v6H4z" />
                                    <path d="M14 4h6v6h-6z" />
                                    <path d="M4 14h6v6H4z" />
                                    <path d="M14 14h2v2h-2z" />
                                    <path d="M18 14h2v6h-2z" />
                                    <path d="M14 18h4" />
                                </svg>
                            </div>
                            <p className="mt-4 text-sm font-semibold text-gray-900">Select a link</p>
                            <p className="mt-1 max-w-xs text-xs leading-5 text-gray-400">
                                Choose a link from the list to generate its QR code.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* FOOTNOTE */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-gray-600 shadow-sm">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900">One QR code, one short link</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            Your QR codes point to your Shortify URLs rather than directly to the destination. This means the
                            destination can remain behind the same short link and its clicks can still be tracked.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// PREVIEW QR
const PreviewQR = ({ value, size, qrColor, bgColor, errorCorrection }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        QRCode.toCanvas(
            canvas,
            value,
            {
                width: size,
                margin: 4,
                errorCorrectionLevel: errorCorrection,
                color: {
                    dark: qrColor,
                    light: bgColor,
                },
            },
            (error) => {
                if (error) {
                    console.error("QR preview error:", error);
                }
            }
        );
    }, [value, size, qrColor, bgColor, errorCorrection]);

    return <canvas ref={canvasRef} className="block max-w-full" />;
};

export default QRCodes;
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CreateLinkModal = ({
    isOpen,
    onClose,
    onLinkCreated
}) => {

    const [serverError, setServerError] = useState("");
    const [createdLink, setCreatedLink] = useState(null);
    const [copied, setCopied] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm({
        defaultValues: {
            originalUrl: ""
        }
    });

    // Reset modal whenever it opens
    useEffect(() => {
        if (isOpen) {
            setServerError("");
            setCreatedLink(null);
            setCopied(false);
            reset({
                originalUrl: ""
            });
        }
    }, [isOpen, reset]);

    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener(
            "keydown",
            handleEscape
        );
        return () => {
            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, [isOpen, onClose]);

    // Prevent background scrolling
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);


    const onSubmit = async (data) => {
        setServerError("");
        setCopied(false);
        try {
            const response = await fetch(
                "http://localhost:3000/urls/shorten/authenticated",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        originalUrl: data.originalUrl
                    })
                }
            );

            const result = await response.json();
            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Unable to create short link"
                );
            }
            setCreatedLink(result.data);
            if (onLinkCreated) {
                onLinkCreated(result.data);
            }
        } catch (error) {
            setServerError(
                error.message ||
                "Something went wrong. Please try again."
            );
        }
    };
    const copyLink = async () => {
        if (!createdLink?.shortUrl) return;
        try {
            await navigator.clipboard.writeText(
                createdLink.shortUrl
            );
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error(
                "Failed to copy URL:",
                error
            );
        }
    };

    if (!isOpen) return null;
    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            onMouseDown={(event) => {
                if (
                    event.target === event.currentTarget &&
                    !isSubmitting
                ) {
                    onClose();
                }
            }}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-gray-950/40 backdrop-blur-sm" />
            {/* Modal */}
            <div
                className="relative w-full max-w-lg overflow-hidden rounded-2xl
                border border-gray-200 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.18)]"
            >
                {/* ================= HEADER ================= */}
                <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
                    <div>
                        <div className="flex items-center gap-3">
                            <div
                                className="flex h-10 w-10 items-center
                                justify-center rounded-xl bg-yellow-100
                                text-yellow-700"
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
                            <div>
                                <h2 className="text-base font-semibold text-gray-950">
                                    Create a short link
                                </h2>
                                <p className="mt-0.5 text-xs text-gray-400">
                                    Turn any long URL into a clean,
                                    shareable link.
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="flex h-8 w-8 items-center justify-center
                        rounded-lg text-gray-400 transition-colors
                        hover:bg-gray-100 hover:text-gray-700
                        disabled:cursor-not-allowed disabled:opacity-50"
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
                                d="M6 6l12 12M18 6 6 18"
                            />
                        </svg>
                    </button>
                </div>

                {/* ================= SUCCESS STATE ================= */}
                {createdLink ? (
                    <div className="p-6">
                        {/* Success */}
                        <div className="flex flex-col items-center text-center">
                            <div
                                className="flex h-14 w-14 items-center
                                justify-center rounded-full bg-yellow-100
                                text-yellow-600"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="h-7 w-7"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m5 12 4 4L19 6"
                                    />
                                </svg>
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-gray-950">
                                Your link is ready
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Your short link has been created
                                successfully.
                            </p>
                        </div>
                        {/* Short URL */}
                        <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                Short link
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-gray-950">
                                        {createdLink.shortUrl}
                                    </p>
                                </div>
                                <button
                                    onClick={copyLink}
                                    className="flex shrink-0 items-center gap-2
                                    rounded-lg bg-gray-950 px-3 py-2
                                    text-xs font-semibold text-white
                                    transition-colors hover:bg-gray-800"
                                >
                                    {copied ? (
                                        <>
                                            <svg
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="h-4 w-4"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.25 7.31a1 1 0 0 1-1.42.003l-3.75-3.73a1 1 0 1 1 1.41-1.42l3.04 3.02 6.54-6.59a1 1 0 0 1 1.424-.007Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Copied
                                        </>
                                    ) : (
                                        <>
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
                                            Copy
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Original URL */}
                        <div className="mt-3 rounded-xl border border-gray-100 px-4 py-3">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                Destination
                            </p>
                            <p className="mt-1 truncate text-xs text-gray-600">
                                {createdLink.originalUrl}
                            </p>
                        </div>
                        {/* Actions */}
                        <div className="mt-5 flex gap-3">
                            <button
                                onClick={() => {
                                    setCreatedLink(null);
                                    reset({
                                        originalUrl: ""
                                    });
                                }}
                                className="flex-1 rounded-xl border
                                border-gray-200 px-4 py-3 text-sm
                                font-semibold text-gray-700
                                transition-colors hover:bg-gray-50"
                            >
                                Create another
                            </button>
                            <a
                                href={createdLink.shortUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex flex-1 items-center
                                justify-center gap-2 rounded-xl
                                bg-gray-950 px-4 py-3 text-sm
                                font-semibold text-white
                                transition-colors hover:bg-gray-800"
                            >
                                Open link
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
                ) : (
                    /* ================= FORM ================= */
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="p-6"
                    >
                        <div>
                            <label
                                htmlFor="originalUrl"
                                className="mb-2 block text-sm font-semibold text-gray-800"
                            >
                                Destination URL
                            </label>
                            <div
                                className={`flex items-center gap-3
                                rounded-xl border bg-white px-4
                                transition-all ${errors.originalUrl
                                        ? "border-red-300 ring-2 ring-red-50"
                                        : "border-gray-200 focus-within:border-yellow-400 focus-within:ring-2 focus-within:ring-yellow-50"
                                    }`}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    className="h-5 w-5 shrink-0 text-gray-400"
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
                                <input
                                    id="originalUrl"
                                    type="url"
                                    autoFocus
                                    placeholder="https://example.com/your-long-url"
                                    disabled={isSubmitting}
                                    {...register("originalUrl", {
                                        required:
                                            "Please enter a URL",
                                        validate: (value) => {
                                            try {
                                                const parsed =
                                                    new URL(value);
                                                if (
                                                    parsed.protocol !== "http:" &&
                                                    parsed.protocol !== "https:"
                                                ) {
                                                    return "Only HTTP and HTTPS URLs are allowed";
                                                }
                                                return true;
                                            } catch {
                                                return "Please enter a valid URL";
                                            }
                                        }
                                    })}
                                    className="w-full bg-transparent py-3.5
                                    text-sm text-gray-900 outline-none
                                    placeholder:text-gray-400
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60"
                                />
                            </div>
                            {errors.originalUrl && (
                                <p className="mt-2 text-xs font-medium text-red-500">
                                    {errors.originalUrl.message}
                                </p>
                            )}
                        </div>

                        {/* Server error */}
                        {serverError && (
                            <div
                                className="mt-4 flex items-start gap-3
                                rounded-xl border border-red-100
                                bg-red-50 px-4 py-3"
                            >
                                <svg
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="mt-0.5 h-4 w-4 shrink-0 text-red-500"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-.75-11a.75.75 0 0 1 1.5 0v4a.75.75 0 0 1-1.5 0V7Zm0 6.5a.75.75 0 0 1 1.5 0v.25a.75.75 0 0 1-1.5 0v-.25Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="text-xs font-medium leading-5 text-red-600">
                                    {serverError}
                                </p>
                            </div>

                        )}

                        {/* Helper */}
                        <div className="mt-4 flex items-start gap-2 text-xs text-gray-400">
                            <svg
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="mt-0.5 h-3.5 w-3.5 shrink-0"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM9.25 8.5a.75.75 0 1 1 1.5 0v5a.75.75 0 1 1-1.5 0v-5ZM10 5.25a.875.875 0 1 0 0 1.75.875.875 0 0 0 0-1.75Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>
                                Your short link will be automatically
                                generated and saved to your account.
                            </span>

                        </div>
                        {/* Footer */}
                        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="rounded-xl border border-gray-200
                                px-5 py-3 text-sm font-semibold
                                text-gray-700 transition-colors
                                hover:bg-gray-50
                                disabled:cursor-not-allowed
                                disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center justify-center
                                gap-2 rounded-xl bg-gray-950 px-5 py-3
                                text-sm font-semibold text-white
                                shadow-sm transition-all hover:bg-gray-800
                                active:scale-[0.98]
                                disabled:cursor-not-allowed
                                disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span
                                            className="h-4 w-4 animate-spin
                                            rounded-full border-2
                                            border-white/30
                                            border-t-white"
                                        />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        Create short link
                                        <svg
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-4 w-4"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M3 10a.75.75 0 0 1 .75-.75h10.69l-3.22-3.22-1.06 1.06 3.22 3.22H3.75a.75.75 0 0 1 0 1.5h11.31l-3.22 3.22 1.06 1.06 4.5-4.5a.75.75 0 0 0 0-1.06l-4.5-4.5-1.06 1.06 3.22 3.22H3.75A.75.75 0 0 1 3 10Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CreateLinkModal;
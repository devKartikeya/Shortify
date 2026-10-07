import { useEffect } from "react";

const Toast = ({
    type = "success",
    message,
    onClose,
    duration = 3000,
}) => {
    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [message, duration, onClose]);

    const config = {
        success: {
            title: "Success",
            border: "border-green-200",
            iconBackground: "bg-green-100",
            iconColor: "text-green-600",
        },

        error: {
            title: "Error",
            border: "border-red-200",
            iconBackground: "bg-red-100",
            iconColor: "text-red-600",
        },

        warning: {
            title: "Warning",
            border: "border-yellow-200",
            iconBackground: "bg-yellow-100",
            iconColor: "text-yellow-600",
        },
    };

    const current = config[type] || config.success;

    if (!message) return null;

    return (
        <div
            className={`fixed right-6 top-24 z-[100] flex min-w-[280px] max-w-sm items-start gap-3 rounded-xl border bg-white px-4 py-3 shadow-lg ${current.border}`}
        >
            {/* ICON */}
            <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${current.iconBackground}`}
            >
                {/* SUCCESS */}
                {type === "success" && (
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`h-4 w-4 ${current.iconColor}`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                )}

                {/* ERROR */}
                {type === "error" && (
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`h-4 w-4 ${current.iconColor}`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 6l12 12M18 6L6 18"
                        />
                    </svg>
                )}

                {/* WARNING */}
                {type === "warning" && (
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`h-4 w-4 ${current.iconColor}`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8v4m0 4h.01"
                        />

                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.3 3.8L2.6 17.2A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.8L13.7 3.8a2 2 0 0 0-3.4 0Z"
                        />
                    </svg>
                )}
            </div>

            {/* CONTENT */}
            <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">
                    {current.title}
                </p>

                <p className="mt-0.5 text-xs leading-5 text-gray-500">
                    {message}
                </p>
            </div>

            {/* CLOSE */}
            <button
                type="button"
                onClick={onClose}
                className="mt-0.5 shrink-0 cursor-pointer text-gray-400 transition-colors hover:text-gray-700"
                aria-label="Close notification"
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
                        d="M6 6l12 12M18 6L6 18"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Toast;
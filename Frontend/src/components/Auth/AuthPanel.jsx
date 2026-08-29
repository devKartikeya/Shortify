import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const API_URL = "http://localhost:3000";

const AuthPanel = ({ isOpen, onClose }) => {
    const [mode, setMode] = useState("login");
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onBlur",
    });

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

    // Reset form whenever mode changes
    useEffect(() => {
        reset();
        clearErrors();
        setServerError("");
        setSuccessMessage("");
    }, [mode, reset, clearErrors]);

    // =========================
    // LOGIN
    // =========================

    const onLogin = async (data) => {
        try {
            setServerError("");
            setSuccessMessage("");

            const response = await fetch(
                `${API_URL}/users/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                    credentials: "include"
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Login failed"
                );
            }
            setSuccessMessage(
                "Login successful! Welcome back."
            );

            console.log("Login successful:", result);

            // Close drawer after successful login
            setTimeout(() => {
                onClose();
            }, 800);

        } catch (error) {
            console.error("Login error:", error);

            setServerError(
                error.message ||
                "Something went wrong. Please try again."
            );
        }
    };


    // =========================
    // SIGNUP
    // =========================

    const onSignup = async (data) => {
        try {
            setServerError("");
            setSuccessMessage("");

            const response = await fetch(
                `${API_URL}/users/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                    credentials: "include"
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Registration failed"
                );
            }

            console.log(
                "Registration successful:",
                result
            );

            setSuccessMessage(
                "Account created successfully! You can now sign in."
            );

            // Clear signup form
            reset();

            // Switch to login after a short delay
            setTimeout(() => {
                setMode("login");
            }, 1000);

        } catch (error) {
            console.error(
                "Registration error:",
                error
            );

            setServerError(
                error.message ||
                "Something went wrong. Please try again."
            );
        }
    };
    // =========================
    // SWITCH MODE
    // =========================
    const switchMode = () => {
        setMode((prev) =>
            prev === "login"
                ? "signup"
                : "login"
        );
    };


    return (
        <div
            className={`fixed inset-0 z-[100] transition-all duration-300 ${isOpen
                    ? "visible"
                    : "invisible pointer-events-none"
                }`}
        >
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`absolute inset-0 bg-gray-950/40 backdrop-blur-[2px] transition-opacity duration-300 ${isOpen
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
            />

            {/* Auth Drawer */}
            <aside
                className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${isOpen
                        ? "translate-x-0"
                        : "translate-x-full"
                    }`}
            >

                {/* ================= HEADER ================= */}
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-4.5 w-4.5 text-gray-950"
                            >
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />

                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                            </svg>

                        </div>

                        <span className="text-lg font-bold tracking-tight text-gray-950">
                            Shortify
                        </span>

                    </div>
                    {/* Close */}
                    <button
                        onClick={onClose}
                        aria-label="Close authentication panel"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-950"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 6l12 12M18 6L6 18"
                            />
                        </svg>
                    </button>
                </div>
                {/* ================= CONTENT ================= */}

                <div className="flex-1 overflow-y-auto px-6 py-10 sm:px-8">

                    {/* Heading */}
                    <div className="mb-8">
                        <p className="text-sm font-semibold uppercase tracking-widest text-yellow-600">
                            {mode === "login"
                                ? "Welcome back"
                                : "Get started"}
                        </p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
                            {mode === "login"
                                ? "Sign in to Shortify"
                                : "Create your account"}
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-gray-500">
                            {mode === "login"
                                ? "Access your links, analytics, and dashboard."
                                : "Create an account and start managing your links."}
                        </p>
                    </div>

                    {/* ================= SERVER ERROR ================= */}

                    {serverError && (
                        <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="mt-0.5 h-4 w-4 shrink-0 text-red-500"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="9"
                                />

                                <path d="M12 8v4" />
                                <path d="M12 16h.01" />
                            </svg>

                            <p className="text-sm font-medium text-red-600">
                                {serverError}
                            </p>
                        </div>

                    )}

                    {/* ================= SUCCESS ================= */}
                    {successMessage && (
                        <div className="mb-5 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="mt-0.5 h-4 w-4 shrink-0 text-green-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m5 12 4 4L19 6"
                                />
                            </svg>

                            <p className="text-sm font-medium text-green-600">
                                {successMessage}
                            </p>
                        </div>

                    )}


                    {/* ================= LOGIN ================= */}
                    {mode === "login" ? (
                        <form
                            onSubmit={handleSubmit(onLogin)}
                            className="space-y-5"
                        >
                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="login-email"
                                    className="mb-2 block text-sm font-medium text-gray-800"
                                >
                                    Email address
                                </label>

                                <input
                                    id="login-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"

                                    {...register("email", {
                                        required:
                                            "Email address is required",
                                        pattern: {
                                            value:
                                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message:
                                                "Please enter a valid email address",
                                        },
                                    })}
                                    className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-950 outline-none transition-all placeholder:text-gray-400 focus:ring-4 focus:ring-yellow-400/10 ${errors.email
                                            ? "border-red-400 focus:border-red-400"
                                            : "border-gray-200 focus:border-yellow-400"
                                        }`}
                                />

                                {errors.email && (
                                    <p className="mt-1.5 text-xs font-medium text-red-500">
                                        {errors.email.message}
                                    </p>

                                )}
                            </div>
                            {/* Password */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label
                                        htmlFor="login-password"
                                        className="text-sm font-medium text-gray-800"
                                    >
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        className="text-xs font-semibold text-yellow-600 transition-colors hover:text-yellow-700"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                <input
                                    id="login-password"
                                    type="password"
                                    placeholder="Enter your password"
                                    autoComplete="current-password"

                                    {...register("password", {
                                        required:
                                            "Password is required",

                                        minLength: {
                                            value: 6,

                                            message:
                                                "Password must be at least 6 characters",
                                        },
                                    })}

                                    className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-950 outline-none transition-all placeholder:text-gray-400 focus:ring-4 focus:ring-yellow-400/10 ${errors.password
                                            ? "border-red-400 focus:border-red-400"
                                            : "border-gray-200 focus:border-yellow-400"
                                        }`}
                                />

                                {errors.password && (
                                    <p className="mt-1.5 text-xs font-medium text-red-500">
                                        {errors.password.message}
                                    </p>

                                )}
                            </div>
                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-lg bg-gray-950 py-3.5 text-sm font-semibold text-white transition-all hover:bg-gray-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                            >

                                {isSubmitting
                                    ? "Signing in..."
                                    : "Sign in"}

                            </button>
                        </form>
                    ) : (
                        /* ================= SIGNUP ================= */
                        <form
                            onSubmit={handleSubmit(onSignup)}
                            className="space-y-5"
                        >
                            {/* Username */}
                            <div>
                                <label
                                    htmlFor="signup-username"
                                    className="mb-2 block text-sm font-medium text-gray-800"
                                >
                                    Username
                                </label>
                                <input
                                    id="signup-username"
                                    type="text"
                                    placeholder="Choose a username"
                                    autoComplete="username"
                                    {...register("username", {
                                        required:
                                            "Username is required",
                                        minLength: {
                                            value: 3,
                                            message:
                                                "Username must be at least 3 characters",
                                        },
                                        maxLength: {
                                            value: 30,
                                            message:
                                                "Username cannot exceed 30 characters",
                                        },
                                    })}
                                    className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-950 outline-none transition-all placeholder:text-gray-400 focus:ring-4 focus:ring-yellow-400/10 ${errors.username
                                            ? "border-red-400 focus:border-red-400"
                                            : "border-gray-200 focus:border-yellow-400"
                                        }`}
                                />
                                {errors.username && (
                                    <p className="mt-1.5 text-xs font-medium text-red-500">
                                        {errors.username.message}
                                    </p>
                                )}
                            </div>
                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="signup-email"
                                    className="mb-2 block text-sm font-medium text-gray-800"
                                >
                                    Email address
                                </label>

                                <input
                                    id="signup-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"

                                    {...register("email", {
                                        required:
                                            "Email address is required",

                                        pattern: {
                                            value:
                                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                                            message:
                                                "Please enter a valid email address",
                                        },
                                    })}

                                    className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-950 outline-none transition-all placeholder:text-gray-400 focus:ring-4 focus:ring-yellow-400/10 ${errors.email
                                            ? "border-red-400 focus:border-red-400"
                                            : "border-gray-200 focus:border-yellow-400"
                                        }`}
                                />
                                {errors.email && (
                                    <p className="mt-1.5 text-xs font-medium text-red-500">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            {/* Password */}

                            <div>
                                <label
                                    htmlFor="signup-password"
                                    className="mb-2 block text-sm font-medium text-gray-800"
                                >
                                    Password
                                </label>
                                <input
                                    id="signup-password"
                                    type="password"
                                    placeholder="Create a password"
                                    autoComplete="new-password"

                                    {...register("password", {
                                        required:
                                            "Password is required",

                                        minLength: {
                                            value: 8,

                                            message:
                                                "Password must be at least 8 characters",
                                        },
                                    })}

                                    className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-950 outline-none transition-all placeholder:text-gray-400 focus:ring-4 focus:ring-yellow-400/10 ${errors.password
                                            ? "border-red-400 focus:border-red-400"
                                            : "border-gray-200 focus:border-yellow-400"
                                        }`}
                                />
                                {errors.password && (
                                    <p className="mt-1.5 text-xs font-medium text-red-500">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Signup Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-lg bg-gray-950 py-3.5 text-sm font-semibold text-white transition-all hover:bg-gray-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting
                                    ? "Creating account..."
                                    : "Create account"}

                            </button>

                            {/* Terms */}
                            <p className="text-center text-xs leading-5 text-gray-400">
                                By creating an account, you agree to our{" "}
                                <button
                                    type="button"
                                    className="font-medium text-gray-600 hover:text-gray-950"
                                >
                                    Terms
                                </button>

                                {" "}and{" "}
                                <button
                                    type="button"
                                    className="font-medium text-gray-600 hover:text-gray-950"
                                >
                                    Privacy Policy
                                </button>
                                .
                            </p>
                        </form>
                    )}

                    {/* ================= SWITCH ================= */}
                    <div className="mt-8 border-t border-gray-100 pt-7 text-center">
                        <p className="text-sm text-gray-500">
                            {mode === "login"
                                ? "Don't have an account?"
                                : "Already have an account?"}
                            {" "}
                            <button
                                type="button"
                                onClick={switchMode}
                                className="font-semibold text-gray-950 underline decoration-yellow-400 decoration-2 underline-offset-4 transition-colors hover:text-yellow-600"
                            >
                                {mode === "login"
                                    ? "Create one"
                                    : "Sign in"}
                            </button>
                        </p>
                    </div>
                </div>

                {/* ================= SECURITY FOOTER ================= */}
                <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 sm:px-8">
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4Z"
                            />

                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m9 12 2 2 4-4"
                            />
                        </svg>
                        Your information is securely protected.
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default AuthPanel;
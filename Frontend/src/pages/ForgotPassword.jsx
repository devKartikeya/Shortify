import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const ForgotPassword = () => {
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        mode: "onBlur",
    });

    const onSubmit = async (data) => {
        try {
            setServerError("");
            setSuccessMessage("");

            const response = await fetch(
                `${API_URL}/users/forgot-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Something went wrong"
                );
            }

            setSuccessMessage(
                "If an account exists with this email, a password reset link has been sent."
            );

            reset();

        } catch (error) {
            setServerError(
                error.message ||
                "Something went wrong. Please try again."
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-7">
            <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
                <div className="w-full">
                    {/* Logo */}
                    <div className="mb-10 flex items-center justify-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400">
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

                        <span className="text-xl font-bold tracking-tight text-gray-950">
                            Shortify
                        </span>
                    </div>

                    {/* Card */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">

                        {/* Heading */}
                        <div className="mb-8">
                            <p className="text-sm font-semibold uppercase tracking-widest text-yellow-600">
                                Account recovery
                            </p>

                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
                                Forgot your password?
                            </h1>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Enter the email address associated with
                                your Shortify account and we'll send you
                                a password reset link.
                            </p>
                        </div>

                        {/* Error */}
                        {serverError && (
                            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                                <p className="text-sm font-medium text-red-600">
                                    {serverError}
                                </p>
                            </div>
                        )}

                        {/* Success */}
                        {successMessage && (
                            <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                                <p className="text-sm font-medium leading-5 text-green-600">
                                    {successMessage}
                                </p>
                            </div>
                        )}

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-5"
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-gray-800"
                                >
                                    Email address
                                </label>

                                <input
                                    id="email"
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
                                    className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-950 outline-none transition-all placeholder:text-gray-400 focus:ring-4 focus:ring-yellow-400/10 ${
                                        errors.email
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

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-lg bg-gray-950 py-3.5 text-sm font-semibold text-white transition-all hover:bg-gray-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting
                                    ? "Sending reset link..."
                                    : "Send reset link"}
                            </button>
                        </form>

                        {/* Back */}
                        <div className="mt-7 border-t border-gray-100 pt-6 text-center">
                            <Link
                                to="/"
                                className="text-sm font-semibold text-gray-600 transition-colors hover:text-gray-950"
                            >
                                ← Back to Shortify
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
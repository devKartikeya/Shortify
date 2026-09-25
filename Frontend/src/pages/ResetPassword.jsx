import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { LockKeyhole, Eye, EyeOff, ArrowLeft, CheckCircle2, AlertCircle, Link2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm();

    const newPassword = watch("newPassword");

    const onSubmit = async (data) => {
        setServerError("");
        setSuccessMessage("");

        try {
            const response = await fetch(
                `${API_URL}/users/reset-password`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        token,
                        newPassword: data.newPassword,
                        confirmPassword:
                            data.confirmPassword
                    })
                }
            );

            const result = await response.json();

            if (!response.ok) {
                setServerError(
                    result.message ||
                    "Unable to reset your password."
                );
                return;
            }

            setSuccessMessage(
                result.message ||
                "Password reset successfully."
            );

        } catch (error) {
            console.error(
                "Reset password error:",
                error
            );

            setServerError(
                "Something went wrong. Please try again."
            );
        }
    };

    /*
     * No token in URL
     */
    if (!token) {
        return (
            <div className="min-h-screen bg-white px-4 py-10">
                <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
                    <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                            <AlertCircle
                                size={28}
                                className="text-red-500"
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Invalid reset link
                        </h1>
                        <p className="mt-3 text-sm leading-6 text-slate-500">
                            This password reset link is
                            missing a valid token.
                            Please request a new reset link.
                        </p>
                        <Link
                            to="/"
                            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-yellow-600 transition-colors hover:text-yellow-700"
                        >
                            <ArrowLeft size={16} />
                            Back to home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    /*
     * Successful password reset
     */
    if (successMessage) {
        return (
            <div className="min-h-screen bg-white px-4 py-10">
                <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">

                    <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                            <CheckCircle2
                                size={30}
                                className="text-green-500"
                            />
                        </div>

                        <h1 className="text-2xl font-bold text-slate-900">
                            Password reset successful
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-slate-500">
                            Your password has been updated
                            successfully. You can now log
                            in with your new password.
                        </p>

                        <Link
                            to="/"
                            className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-yellow-600"
                        >
                            Continue to Shortify
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white px-4 py-5">
            <div className="mx-auto flex min-h-[85vh] max-w-md items-center justify-center">
                <div className="w-full">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-50">
                            <LockKeyhole
                                size={27}
                                className="text-yellow-600"
                            />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            Reset your password
                        </h1>
                        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                            Create a new password for your
                            Shortify account.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-5"
                        >

                            {/* New Password */}
                            <div>
                                <label
                                    htmlFor="newPassword"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    New password
                                </label>
                                <div className="relative">
                                    <LockKeyhole
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        id="newPassword"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Enter new password"
                                        autoComplete="new-password"
                                        className={`w-full rounded-xl border bg-white py-3 pl-10 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${errors.newPassword
                                            ? "border-red-400 focus:border-red-500"
                                            : "border-slate-200 focus:border-yellow-500"
                                            }`}
                                        {...register(
                                            "newPassword",
                                            {
                                                required:
                                                    "New password is required",
                                                minLength: {
                                                    value: 8,
                                                    message:
                                                        "Password must be at least 8 characters"
                                                },
                                                pattern: {
                                                    value:
                                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                    message:
                                                        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                                                },
                                            }
                                        )}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (prev) => !prev
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>

                                {errors.newPassword && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {
                                            errors
                                                .newPassword
                                                .message
                                        }
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Confirm password
                                </label>

                                <div className="relative">

                                    <LockKeyhole
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        id="confirmPassword"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Confirm new password"
                                        autoComplete="new-password"
                                        className={`w-full rounded-xl border bg-white py-3 pl-10 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${errors.confirmPassword
                                            ? "border-red-400 focus:border-red-500"
                                            : "border-slate-200 focus:border-yellow-500"
                                            }`}
                                        {...register(
                                            "confirmPassword",
                                            {
                                                required:
                                                    "Please confirm your password",
                                                validate:
                                                    (value) =>
                                                        value ===
                                                        newPassword ||
                                                        "Passwords do not match"
                                            }
                                        )}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (prev) => !prev
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                                        aria-label={
                                            showConfirmPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>

                                {errors.confirmPassword && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {
                                            errors
                                                .confirmPassword
                                                .message
                                        }
                                    </p>
                                )}
                            </div>

                            {/* Server Error */}

                            {serverError && (
                                <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-3.5">
                                    <AlertCircle
                                        size={18}
                                        className="mt-0.5 shrink-0 text-red-500"
                                    />

                                    <p className="text-sm leading-5 text-red-600">
                                        {serverError}
                                    </p>
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <LockKeyhole size={17} />

                                {isSubmitting
                                    ? "Resetting password..."
                                    : "Reset password"}
                            </button>

                        </form>

                        {/* Security note */}
                        <div className="mt-1 flex items-start gap-3 border-t border-slate-100 pt-3">
                            <Link2
                                size={17}
                                className="mt-0.5 shrink-0 text-slate-400"
                            />
                            <p className="text-xs leading-5 text-slate-500">
                                Reset link is valid for
                                30 minutes and can be
                                used once.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
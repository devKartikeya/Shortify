import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

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
                        confirmPassword: data.confirmPassword
                    })
                }
            );

            const result = await response.json();

            if (!response.ok) {
                setServerError(result.message);
                return;
            }

            setSuccessMessage(result.message);

        } catch (error) {
            setServerError(
                "Something went wrong. Please try again."
            );
        }
    };

    if (!token) {
        return (
            <div>
                <h1>Invalid reset link</h1>
                <Link to="/">
                    Back to home
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1>Reset Password</h1>

            <form onSubmit={handleSubmit(onSubmit)}>

                <input
                    type="password"
                    placeholder="New password"
                    {...register("newPassword", {
                        required: "New password is required",
                        minLength: {
                            value: 6,
                            message:
                                "Password must be at least 6 characters"
                        }
                    })}
                />

                {errors.newPassword && (
                    <p>{errors.newPassword.message}</p>
                )}

                <input
                    type="password"
                    placeholder="Confirm password"
                    {...register("confirmPassword", {
                        required: "Please confirm your password"
                    })}
                />

                {errors.confirmPassword && (
                    <p>{errors.confirmPassword.message}</p>
                )}

                {serverError && (
                    <p>{serverError}</p>
                )}

                {successMessage && (
                    <p>{successMessage}</p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Resetting..."
                        : "Reset Password"}
                </button>

            </form>
        </div>
    );
};

export default ResetPassword;a
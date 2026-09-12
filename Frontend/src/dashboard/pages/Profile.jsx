import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";

const Profile = () => {
    const { user } = useOutletContext();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingAccount, setDeletingAccount] = useState(false);

    const [links, setLinks] = useState([]);
    const [loadingStats, setLoadingStats] = useState(true);

    // Change Password
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);

    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showPasswords, setShowPasswords] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const [passwordMessage, setPasswordMessage] = useState({
        type: "",
        text: "",
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoadingStats(true);

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/urls/my-links`,
                    {
                        credentials: "include",
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch profile stats"
                    );
                }

                const fetchedLinks = Array.isArray(data)
                    ? data
                    : Array.isArray(data.data)
                        ? data.data
                        : Array.isArray(data.links)
                            ? data.links
                            : [];

                setLinks(fetchedLinks);
            } catch (error) {
                console.error("Failed to fetch profile stats:", error);
                setLinks([]);
            } finally {
                setLoadingStats(false);
            }
        };

        fetchStats();
    }, []);

    const stats = useMemo(() => {
        const totalLinks = links.length;

        const totalClicks = links.reduce(
            (total, link) => total + (Number(link.clicks) || 0),
            0
        );

        const averageClicks =
            totalLinks > 0
                ? (totalClicks / totalLinks).toFixed(1)
                : "0.0";

        return {
            totalLinks,
            totalClicks,
            averageClicks,
        };
    }, [links]);

    const initials = user?.username
        ? user.username.slice(0, 2).toUpperCase()
        : "US";

    const joinedDate = user?.joinedAt
        ? new Date(user.joinedAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        : "Not available";

    // --------------------------------------------------
    // Change Password
    // --------------------------------------------------

    const handlePasswordInput = (e) => {
        const { name, value } = e.target;

        setPasswordData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear previous message while user is editing
        if (passwordMessage.text) {
            setPasswordMessage({
                type: "",
                text: "",
            });
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        const {
            oldPassword,
            newPassword,
            confirmPassword,
        } = passwordData;

        setPasswordMessage({
            type: "",
            text: "",
        });

        if (!oldPassword || !newPassword || !confirmPassword) {
            setPasswordMessage({
                type: "error",
                text: "Please fill in all password fields.",
            });
            return;
        }

        if (newPassword.length < 6) {
            setPasswordMessage({
                type: "error",
                text: "New password must be at least 6 characters long.",
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordMessage({
                type: "error",
                text: "New password and confirm password do not match.",
            });
            return;
        }

        if (oldPassword === newPassword) {
            setPasswordMessage({
                type: "error",
                text: "New password must be different from your current password.",
            });
            return;
        }

        try {
            setChangingPassword(true);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/users/change-password`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        oldPassword,
                        newPassword,
                        confirmPassword,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to change password."
                );
            }

            setPasswordData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            setPasswordMessage({
                type: "success",
                text: "Your password has been changed successfully.",
            });
        } catch (error) {
            console.error("Failed to change password:", error);

            setPasswordMessage({
                type: "error",
                text: error.message || "Something went wrong.",
            });
        } finally {
            setChangingPassword(false);
        }
    };

    const handleCancelPasswordChange = () => {
        if (changingPassword) return;

        setShowChangePassword(false);

        setPasswordData({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        });

        setPasswordMessage({
            type: "",
            text: "",
        });

        setShowPasswords({
            oldPassword: false,
            newPassword: false,
            confirmPassword: false,
        });
    };

    // --------------------------------------------------
    // Delete Account
    // --------------------------------------------------

    const deleteAccount = async () => {
        try {
            setDeletingAccount(true);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/users/delete`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to delete account"
                );
            }

            window.location.href = "/";
        } catch (error) {
            console.error("Failed to delete account:", error);
            setDeletingAccount(false);
        }
    };

    return (
        <div className="space-y-6 pb-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                    Profile
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage your account and view your Shortify activity.
                </p>
            </div>

            {/* Profile Hero */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="h-32 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500" />

                <div className="px-6 pb-6">
                    <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

                            {/* Avatar */}
                            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-gray-900 text-2xl font-semibold text-white shadow-md">
                                {initials}
                            </div>

                            <div className="pb-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        {user?.username || "User"}
                                    </h2>

                                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                                        Active
                                    </span>
                                </div>

                                <p className="mt-1 text-sm text-gray-500">
                                    {user?.email || "No email available"}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="w-fit rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                <StatCard
                    label="Total Links"
                    value={stats.totalLinks}
                    loading={loadingStats}
                />

                <StatCard
                    label="Total Clicks"
                    value={stats.totalClicks}
                    loading={loadingStats}
                />

                <StatCard
                    label="Avg. Clicks / Link"
                    value={stats.averageClicks}
                    loading={loadingStats}
                />
            </div>

            {/* Main Information */}
            <div className="grid gap-6 lg:grid-cols-3">

                {/* Account Information */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Account Information
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Your personal account details.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <InfoItem
                            label="Username"
                            value={user?.username || "Not available"}
                        />

                        <InfoItem
                            label="Email Address"
                            value={user?.email || "Not available"}
                        />

                        <InfoItem
                            label="Member Since"
                            value={joinedDate}
                        />

                        <InfoItem
                            label="Account Status"
                            value="Active"
                            status
                        />
                    </div>
                </div>

                {/* Activity Summary */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Activity
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Your overall Shortify usage.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <ActivityRow
                            label="Links created"
                            value={
                                loadingStats
                                    ? "..."
                                    : stats.totalLinks
                            }
                        />

                        <ActivityRow
                            label="Total clicks"
                            value={
                                loadingStats
                                    ? "..."
                                    : stats.totalClicks
                            }
                        />

                        <ActivityRow
                            label="Avg. clicks / link"
                            value={
                                loadingStats
                                    ? "..."
                                    : stats.averageClicks
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Security */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Security
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Keep your Shortify account secure.
                    </p>
                </div>

                {!showChangePassword ? (
                    /* Security Overview */
                    <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <p className="text-sm font-medium text-gray-900">
                                Password
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Update your password regularly to keep your
                                account protected.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setShowChangePassword(true);
                                setPasswordMessage({
                                    type: "",
                                    text: "",
                                });
                            }}
                            className="w-fit rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            Change Password
                        </button>
                    </div>
                ) : (
                    /* Change Password Form */
                    <form
                        onSubmit={handlePasswordChange}
                        className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                    >
                        <div className="mb-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100">
                                    <LockIcon />
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        Change your password
                                    </h3>

                                    <p className="mt-0.5 text-xs text-gray-500">
                                        Enter your current password and choose
                                        a new one.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-3">

                            <PasswordField
                                label="Current Password"
                                name="oldPassword"
                                value={passwordData.oldPassword}
                                placeholder="Enter current password"
                                visible={showPasswords.oldPassword}
                                onChange={handlePasswordInput}
                                onToggle={() =>
                                    togglePasswordVisibility("oldPassword")
                                }
                                disabled={changingPassword}
                            />

                            <PasswordField
                                label="New Password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                placeholder="Enter new password"
                                visible={showPasswords.newPassword}
                                onChange={handlePasswordInput}
                                onToggle={() =>
                                    togglePasswordVisibility("newPassword")
                                }
                                disabled={changingPassword}
                            />

                            <PasswordField
                                label="Confirm New Password"
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                placeholder="Confirm new password"
                                visible={showPasswords.confirmPassword}
                                onChange={handlePasswordInput}
                                onToggle={() =>
                                    togglePasswordVisibility(
                                        "confirmPassword"
                                    )
                                }
                                disabled={changingPassword}
                            />
                        </div>

                        <div className="mt-5 flex flex-col gap-4 border-t border-gray-200 pt-5 sm:flex-row sm:items-center sm:justify-between">

                            {/* Message */}
                            <div className="min-h-5">
                                {passwordMessage.text && (
                                    <div
                                        className={`flex items-center gap-2 text-sm ${
                                            passwordMessage.type === "success"
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {passwordMessage.type === "success" ? (
                                            <SuccessIcon />
                                        ) : (
                                            <ErrorIcon />
                                        )}

                                        <span>
                                            {passwordMessage.text}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handleCancelPasswordChange}
                                    disabled={changingPassword}
                                    className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={changingPassword}
                                    className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {changingPassword ? (
                                        <>
                                            <Spinner />
                                            Updating...
                                        </>
                                    ) : (
                                        "Update Password"
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </div>

            {/* Danger Zone */}
            <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">

                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-red-600">
                        Danger Zone
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        These actions can permanently affect your account.
                    </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                            Delete Account
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Permanently delete your account and associated
                            data.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowDeleteModal(true)}
                        className="w-fit rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                        Delete Account
                    </button>
                </div>
            </div>

            {/* Delete Account Modal */}
            {showDeleteModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
                    onClick={() => {
                        if (!deletingAccount) {
                            setShowDeleteModal(false);
                        }
                    }}
                >
                    <div
                        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Icon */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                            <svg
                                className="h-6 w-6 text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v4m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
                                />
                            </svg>
                        </div>

                        {/* Content */}
                        <div className="mt-5">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Delete your account?
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                This action cannot be undone. Your account and
                                associated data will be permanently deleted.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                disabled={deletingAccount}
                                onClick={() => setShowDeleteModal(false)}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                disabled={deletingAccount}
                                onClick={deleteAccount}
                                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {deletingAccount
                                    ? "Deleting..."
                                    : "Delete Account"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

/* --------------------------------------------------
   Reusable Components
-------------------------------------------------- */

const StatCard = ({ label, value, loading }) => {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
                {label}
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
                {loading ? "..." : value}
            </p>
        </div>
    );
};

const InfoItem = ({ label, value, status }) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                {label}
            </p>

            {status ? (
                <div className="mt-2 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                    <p className="text-sm font-medium text-gray-800">
                        {value}
                    </p>
                </div>
            ) : (
                <p className="mt-2 break-all text-sm font-medium text-gray-800">
                    {value}
                </p>
            )}
        </div>
    );
};

const ActivityRow = ({ label, value }) => {
    return (
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
            <span className="text-sm text-gray-500">
                {label}
            </span>

            <span className="text-sm font-semibold text-gray-900">
                {value}
            </span>
        </div>
    );
};

const PasswordField = ({
    label,
    name,
    value,
    placeholder,
    visible,
    onChange,
    onToggle,
    disabled,
}) => {
    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-medium text-gray-700"
            >
                {label}
            </label>

            <div className="relative">
                <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <LockIcon small />
                </div>

                <input
                    id={name}
                    name={name}
                    type={visible ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete="current-password"
                    disabled={disabled}
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                />

                <button
                    type="button"
                    onClick={onToggle}
                    disabled={disabled}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700 disabled:cursor-not-allowed"
                    aria-label={
                        visible
                            ? `Hide ${label}`
                            : `Show ${label}`
                    }
                >
                    {visible ? <EyeOffIcon /> : <EyeIcon />}
                </button>
            </div>
        </div>
    );
};

/* --------------------------------------------------
   Icons
-------------------------------------------------- */

const LockIcon = ({ small = false }) => {
    return (
        <svg
            className={small ? "h-4 w-4" : "h-5 w-5"}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <rect
                x="5"
                y="10"
                width="14"
                height="10"
                rx="2"
                strokeWidth="1.8"
            />

            <path
                d="M8 10V7a4 4 0 018 0v3"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
};

const EyeIcon = () => {
    return (
        <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"
            />

            <circle
                cx="12"
                cy="12"
                r="2.5"
                strokeWidth="1.8"
            />
        </svg>
    );
};

const EyeOffIcon = () => {
    return (
        <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                d="M3 3l18 18"
                strokeWidth="1.8"
                strokeLinecap="round"
            />

            <path
                d="M10.6 6.2A9.7 9.7 0 0112 6c6 0 9.5 6 9.5 6a16.8 16.8 0 01-3.1 3.8M6.3 6.8C3.8 8.3 2.5 12 2.5 12s3.5 6 9.5 6c1.4 0 2.7-.3 3.8-.8"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const SuccessIcon = () => {
    return (
        <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                d="M9 12l2 2 4-4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <circle
                cx="12"
                cy="12"
                r="9"
                strokeWidth="2"
            />
        </svg>
    );
};

const ErrorIcon = () => {
    return (
        <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <circle
                cx="12"
                cy="12"
                r="9"
                strokeWidth="2"
            />

            <path
                d="M12 8v5"
                strokeWidth="2"
                strokeLinecap="round"
            />

            <path
                d="M12 16h.01"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
};

const Spinner = () => {
    return (
        <svg
            className="mr-2 h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />

            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
        </svg>
    );
};

export default Profile;
import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";

const Profile = () => {
    const { user } = useOutletContext();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingAccount, setDeletingAccount] = useState(false);
    const [links, setLinks] = useState([]);
    const [loadingStats, setLoadingStats] = useState(true);

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

                // Handles:
                // { data: [...] }
                // { links: [...] }
                // or directly [...]
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
                        className="w-fit rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                        Change Password
                    </button>
                </div>
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
            {
                showDeleteModal && (
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
                                    {deletingAccount ? "Deleting..." : "Delete Account"}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

/* ---------- Reusable Components ---------- */

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

export default Profile;
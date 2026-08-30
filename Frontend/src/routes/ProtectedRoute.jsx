import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/users/me",
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );
                if (!response.ok) {
                    setUser(null);
                    return;
                }
                const result = await response.json();
                setUser(result.user);
            } catch (error) {
                console.error(
                    "Authentication check failed:",
                    error
                );
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuthentication();
    }, []);
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-9 w-9 animate-spin rounded-full border-2 border-gray-200 border-t-yellow-400" />
                    <p className="text-sm text-gray-400">
                        Checking your session...
                    </p>
                </div>
            </div>
        );
    }
    if (!user) {
        return <Navigate to="/" replace />;
    }
    return (
        <Outlet context={{ user }} />
    );
};

export default ProtectedRoute;
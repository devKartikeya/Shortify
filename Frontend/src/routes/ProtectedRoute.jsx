import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
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
                if (response.ok) {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                }
            } catch (error) {
                console.error(
                    "Authentication check failed:",
                    error
                );
                setAuthenticated(false);
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
    if (!authenticated) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};


export default ProtectedRoute;
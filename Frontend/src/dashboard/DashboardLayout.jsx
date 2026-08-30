import { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useOutletContext();
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                user={user}
            />
            <div className="min-h-screen lg:pl-[270px]">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    user={user}
                />
                <main className="min-h-[calc(100vh-80px)] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                    <Outlet context={{ user }} />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const openSidebar = () => {
        setSidebarOpen(true);
    };
    const closeSidebar = () => {
        setSidebarOpen(false);
    };
    return (
        <div className="min-h-screen bg-gray-50">
            {/* ================= SIDEBAR ================= */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={closeSidebar}
            />
            {/* ================= MAIN AREA ================= */}
            <div className="min-h-screen lg:pl-[270px]">
                {/* Top navigation */}
                <Topbar
                    onMenuClick={openSidebar}
                />
                {/* Page content */}
                <main className="min-h-[calc(100vh-80px)] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
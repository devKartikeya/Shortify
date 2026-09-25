import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HelpSupport from "./pages/HelpSupport";
import MyLinks from "./dashboard/pages/MyLinks";
import QRCodes from "./dashboard/pages/QRCodes";
import Profile from "./dashboard/pages/Profile";
import Overview from "./dashboard/pages/Overview";
import ProtectedRoute from "./routes/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import DashboardLayout from "./dashboard/DashboardLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/help" element={<HelpSupport />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                {/* Dashboard */}
                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/dashboard"
                        element={<DashboardLayout />}
                    >
                        <Route
                            index
                            element={<Overview />}
                        />
                        <Route path="my-links" element={<MyLinks />} />
                        <Route
                            path="qr-codes"
                            element={<QRCodes />}
                        />
                        <Route
                            /* Here i want username as a parameter but user is not defined here, fix it */
                            path="profile/:username"
                            element={<Profile />}
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
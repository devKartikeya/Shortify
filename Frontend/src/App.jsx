import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HelpSupport from "./pages/HelpSupport";
import MyLinks from "./dashboard/pages/MyLinks";
import QRCodes from "./dashboard/pages/QRCodes";
import Profile from "./dashboard/pages/Profile";
import Overview from "./dashboard/pages/Overview";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./routes/ProtectedRoute";
import CookiePolicy from "./pages/legal/CookiePolicy";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import DashboardLayout from "./dashboard/DashboardLayout";
import PublicPagesLayout from "./routes/PublicPagesLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TermsAndConditions from "./pages/legal/TermsAndConditions";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route element={<PublicPagesLayout />}>
                    <Route path="/about" element={<About />} />
                    <Route path="/help" element={<HelpSupport />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/legal/cookie-policy" element={<CookiePolicy />} />
                    <Route path="/legal/terms-and-conditions" element={<TermsAndConditions />} />
                </Route>

                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

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
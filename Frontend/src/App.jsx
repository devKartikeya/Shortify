import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashboardLayout from "./dashboard/DashboardLayout";
import Overview from "./dashboard/pages/Overview";
import ProtectedRoute from "./routes/ProtectedRoute";
import MyLinks from "./dashboard/pages/MyLinks";
import QRCodes from "./dashboard/pages/QRCodes";
import About from "./pages/About";
import Profile from "./dashboard/pages/Profile";
import Contact from "./pages/Contact";
import HelpSupport from "./pages/HelpSupport";

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
                <Route path="/contact" element={<Contact/>} />
                <Route path="/help" element={<HelpSupport/>}/>
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
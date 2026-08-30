import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashboardLayout from "./dashboard/DashboardLayout";
import Overview from "./dashboard/pages/Overview";
import ProtectedRoute from "./routes/ProtectedRoute";
import MyLinks from "./dashboard/pages/MyLinks";
import QRCodes from "./dashboard/pages/QRCodes";
import About from "./pages/About";

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
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
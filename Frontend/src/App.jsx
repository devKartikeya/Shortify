import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashboardLayout from "./dashboard/DashboardLayout";
import Overview from "./dashboard/pages/Overview";
import ProtectedRoute from "./routes/ProtectedRoute";
import MyLinks from "./dashboard/pages/MyLinks";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route
                    path="/"
                    element={<Home />}
                />
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
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
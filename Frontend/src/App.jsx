import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Home from "./pages/Home";
import DashboardLayout from "./dashboard/DashboardLayout";
import Overview from "./dashboard/pages/Overview";

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
                <Route
                    path="/dashboard"
                    element={<DashboardLayout />}
                >
                    <Route
                        index
                        element={<Overview />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
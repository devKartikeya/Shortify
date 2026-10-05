import PagesNavbar from "../components/PagesNavbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const PublicPagesLayout = () => {
    return (
        <>
            <PagesNavbar />
            <Outlet />
            <Footer />
        </>
    );
};

export default PublicPagesLayout;
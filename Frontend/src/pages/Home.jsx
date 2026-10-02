import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Home/Hero";
import Stats from "../components/Home/Stats";
import About from "../components/Home/About";
import Features from "../components/Home/Features";
import HowItWorks from "../components/Home/HowItWorks";
import QRCodePromo from "../components/Home/QRCodePromo";

const Home = () => {
    return (
        <div className="min-h-screen bg-white text-gray-950">
            <Navbar />
            <main>
                <Hero />
                <Stats />
                <About />
                <Features />
                <QRCodePromo />
                <HowItWorks />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
import Navbar from "../components/Navbar";
import Hero from "../components/Home/Hero";
import Stats from "../components/Home/Stats";
import Features from "../components/Home/Features";
import HowItWorks from "../components/Home/HowItWorks";
import Footer from "../components/Footer";
import About from "../components/Home/About";

const Home = () => {
    return (
        <div className="min-h-screen bg-white text-gray-950">
            <Navbar />
            <main>
                <Hero />
                <Stats />
                <About />
                <Features />
                <HowItWorks />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Home/Hero";
import Stats from "../components/Home/Stats";
import Features from "../components/Home/Features";
import HowItWorks from "../components/Home/HowItWorks";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div className="min-h-screen bg-white text-gray-950">
            <Navbar />

            <main>
                <Hero />
                <Stats />
                <Features />
                <HowItWorks />
            </main>

            <Footer />
        </div>
    );
};

export default Home;
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Membership from "@/components/Membership";
import Trainers from "@/components/Trainers";
import Gallery from "@/components/Gallery";
import Hours from "@/components/Hours";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Membership />
      <Trainers />
      <Gallery />
      <Hours />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;

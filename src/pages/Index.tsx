import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Membership from "@/components/Membership";
import Trainers from "@/components/Trainers";
import Gallery from "@/components/Gallery";
import Videos from "@/components/Videos";
import Hours from "@/components/Hours";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Supplements from "@/components/Supplements";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Membership />
      <Supplements />
      <Trainers />
      <Gallery />
      <Videos />
      <Hours />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;

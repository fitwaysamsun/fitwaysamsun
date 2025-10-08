import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

const Hero = () => {
  const handleWhatsAppContact = () => {
    window.open("https://wa.me/905366544655", "_blank");
  };

  const handleFreeTrial = () => {
    window.open("https://wa.me/905366544655?text=Ücretsiz deneme günü hakkında bilgi almak istiyorum", "_blank");
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/87d9d4fd-d25e-4152-ac72-1bf814f9f339.png')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img 
            src="/lovable-uploads/f23cd60b-f90d-47c8-bead-8105d3e398c7.png" 
            alt="FITWAY Fitness Logo" 
            className="h-80 w-auto drop-shadow-2xl"
          />
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-pulse">
          FİTWAY FİTNESS
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl mb-12 text-muted-foreground font-light tracking-wide">
          Enerjini keşfet, en iyi versiyonunu yarat.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-fitness hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105"
            onClick={handleWhatsAppContact}
          >
            <Phone className="mr-2 h-5 w-5" />
            Şimdi Üye Ol
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="text-lg px-8 py-6 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-105"
            onClick={handleFreeTrial}
          >
            Ücretsiz Deneme Günü
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
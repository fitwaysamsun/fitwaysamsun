import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserPlus } from "lucide-react"; // تغيير الأيقونة هنا

const Hero = () => {
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const SHEET_CSV_URL =
    "https://docs.google.com/spreadsheets/d/1CqoozoZNdem8XmeIytSQbu3coFeJtQXhcEXKj2tjHcs/export?format=csv";

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const res = await fetch(SHEET_CSV_URL);
        const csvText = await res.text();

        const [headerLine, ...rows] = csvText.trim().split("\n");
        const headers = headerLine.split(",");

        const data = rows.map((row) => {
          const values = row.split(",");
          return headers.reduce((obj, header, i) => {
            obj[header.trim()] = values[i]?.trim();
            return obj;
          }, {} as Record<string, string>);
        });

        const images: string[] = [];
        if (data[0]?.hero_image) images.push(data[0].hero_image);
        // Assuming the second image is in the second row under the same column 'hero_image'
        if (data[1]?.hero_image) images.push(data[1].hero_image);

        if (images.length > 0) {
          setHeroImages(images);
        }
      } catch (error) {
        console.error("Error fetching hero images from Google Sheets:", error);
      }
    };

    fetchHeroImages();
  }, []);

  useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500); // Switch every 4.5 seconds

    return () => clearInterval(interval);
  }, [heroImages]);

  const handleScrollToMembership = () => {
    const section = document.getElementById("membership");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          style={{
            backgroundImage: `url('${img}')`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-8 flex justify-center">
          <img
            src="/Images/Logo.png"
            alt="FITWAY Fitness Logo"
            className="h-80 w-auto drop-shadow-2xl"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-pulse leading-tight pb-2">
          FİTWAY FİTNESS
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-muted-foreground font-light tracking-wide">
          Enerjini keşfet, en iyi versiyonunu yarat.
        </p>

        <div className="flex justify-center mb-8 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-fitness hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105"
            onClick={handleScrollToMembership}
          >
            <UserPlus className="mr-2 h-5 w-5" /> {/* استخدام الأيقونة الجديدة هنا */}
            Şimdi Üye Ol
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

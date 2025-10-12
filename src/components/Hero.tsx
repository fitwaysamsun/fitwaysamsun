import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

const Hero = () => {
  const [heroImage, setHeroImage] = useState("/Images/Hero.png"); // صورة افتراضية

  // 🔗 رابط Google Sheets المباشر بصيغة CSV
  const SHEET_CSV_URL =
    "https://docs.google.com/spreadsheets/d/1CqoozoZNdem8XmeIytSQbu3coFeJtQXhcEXKj2tjHcs/export?format=csv";

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const res = await fetch(SHEET_CSV_URL);
        const csvText = await res.text();

        // تحويل CSV إلى JSON بسيط
        const [headerLine, ...rows] = csvText.trim().split("\n");
        const headers = headerLine.split(",");

        const data = rows.map((row) => {
          const values = row.split(",");
          return headers.reduce((obj, header, i) => {
            obj[header.trim()] = values[i]?.trim();
            return obj;
          }, {});
        });

        // جلب الصورة من أول صف
        if (data && data[0]?.hero_image) {
          setHeroImage(data[0].hero_image);
        }
      } catch (error) {
        console.error("Error fetching hero image from Google Sheets:", error);
      }
    };

    fetchHeroImage();
  }, []);

  const handleWhatsAppContact = () => {
    window.open("https://wa.me/905366544655", "_blank");
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* الخلفية */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url('${heroImage}')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />

      {/* المحتوى */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-8 flex justify-center">
          <img
            src="/Images/Logo.png"
            alt="FITWAY Fitness Logo"
            className="h-80 w-auto drop-shadow-2xl"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-pulse">
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
            onClick={handleWhatsAppContact}
          >
            <Phone className="mr-2 h-5 w-5" />
            Şimdi Üye Ol
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

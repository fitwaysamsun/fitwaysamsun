import { Button } from "@/components/ui/button";
import { Instagram, ExternalLink } from "lucide-react";
import { useState } from "react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      src: "/lovable-uploads/baffd58b-58c8-40eb-9371-f84cd0f67afd.png",
      alt: "Modern Locker Room - Professional changing facilities"
    },
    {
      src: "/lovable-uploads/a13fe726-a9f5-4feb-909f-4209dca04c6c.png", 
      alt: "Cardio Zone - State-of-the-art exercise bikes"
    },
    {
      src: "/lovable-uploads/87d9d4fd-d25e-4152-ac72-1bf814f9f339.png",
      alt: "Weight Training - Professional strength equipment"
    },
    {
      src: "/lovable-uploads/6322bbc3-fd66-4981-9335-66d75f6099c5.png",
      alt: "Functional Training Area - Versatile workout space"
    },
    {
      src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
      alt: "Grup Dersleri - Group fitness classes"
    },
    {
      src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop", 
      alt: "Stretching Area - Flexibility and recovery zone"
    },
    {
      src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&h=400&fit=crop",
      alt: "Reception Area - Welcome and information"
    },
    {
      src: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=600&h=400&fit=crop",
      alt: "Training Session - Personal training in action"
    }
  ];

  const handleInstagramClick = () => {
    window.open("https://instagram.com/fitwayfitnesspilates", "_blank");
  };

  return (
    <section id="gallery" className="py-20 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Galeri
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Modern tesislerimizi ve profesyonel ekipmanlarımızı keşfedin
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-lg cursor-pointer shadow-card hover:shadow-fitness transition-all duration-300"
              onClick={() => setSelectedImage(image.src)}
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                <p className="text-white text-sm font-medium">{image.alt}</p>
              </div>
              <ExternalLink className="absolute top-4 right-4 h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center">
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
            <Instagram className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Daha Fazlası İçin Instagram'ımızı Takip Edin
            </h3>
            <p className="text-muted-foreground mb-6">
              Günlük antrenman videoları, başarı hikayeleri ve özel etkinliklerimizi kaçırmayın
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleInstagramClick}
            >
              <Instagram className="mr-2 h-5 w-5" />
              @fitwayfitnesspilates
            </Button>
          </div>
        </div>

        {/* Modal for enlarged image */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img 
                src={selectedImage}
                alt="Gallery Image"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <button 
                className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2 text-foreground hover:bg-background transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <ExternalLink className="h-6 w-6 rotate-180" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
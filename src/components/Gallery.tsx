import { Button } from "@/components/ui/button";
import { Instagram, ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useEffect } from "react";

  const SHEETDB_URL = "https://sheetdb.io/api/v1/1rc8rhio1ai28";

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState<
    { src: string; alt: string }[]
  >([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // جلب البيانات من Google Sheet
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(SHEETDB_URL);
        const data = await response.json();
        setGalleryImages(
          data.map((item: any) => ({
            src: item.image_url,
            alt: item.image_alt,
          }))
        );
      } catch (error) {
        console.error("Gallery data fetch error:", error);
      }
    };
    fetchImages();
  }, []);

  // التنقل بين الصور
  const handlePrevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? galleryImages.length - 1 : prev! - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) =>
        prev === galleryImages.length - 1 ? 0 : prev! + 1
      );
    }
  };

  const handleInstagramClick = () => {
    window.open("https://instagram.com/fitwayfitnesspilates", "_blank");
  };

  return (
    <section id="gallery" className="py-20 px-6 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Galeri
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Modern tesislerimizi ve profesyonel ekipmanlarımızı keşfedin
          </p>
        </div>

        {/* شبكة الصور */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg cursor-pointer shadow-card hover:shadow-fitness transition-all duration-300"
              onClick={() => setSelectedImageIndex(index)}
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

        {/* زر الإنستغرام */}
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

        {/* نافذة الصورة المكبرة */}
        {selectedImageIndex !== null && (
          <div
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImageIndex(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img
                src={galleryImages[selectedImageIndex].src}
                alt={galleryImages[selectedImageIndex].alt}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <button
                className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2 text-foreground hover:bg-background transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex(null);
                }}
              >
                <X className="h-6 w-6" />
              </button>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-3 text-foreground hover:bg-background transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-3 text-foreground hover:bg-background transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-foreground text-sm">
                {selectedImageIndex + 1} / {galleryImages.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;

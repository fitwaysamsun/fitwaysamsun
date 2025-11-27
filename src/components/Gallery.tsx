import { Button } from "@/components/ui/button";
import { Instagram, ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useEffect } from "react";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1CqoozoZNdem8XmeIytSQbu3coFeJtQXhcEXKj2tjHcs/export?format=csv";

const Gallery = () => {
  const [yenimahalleImages, setYenimahalleImages] = useState<
    { src: string; alt: string }[]
  >([]);

  const [mimarsinanImages, setMimarsinanImages] = useState<
    { src: string; alt: string }[]
  >([]);

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<"yenimahalle" | "mimarsinan" | null>(
    null
  );

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(SHEET_CSV_URL);
        const text = await response.text();

        const rows = text.split("\n").map((row) => row.split(","));
        const headers = rows[0].map((h) => h.trim());

        const allImages: any[] = [];

        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (row.length < 2) continue;

          const imageData: any = {};
          headers.forEach((header, index) => {
            imageData[header] = row[index]?.trim();
          });

          if (imageData.image_url) {
            allImages.push({
              src: imageData.image_url,
              alt: imageData.image_alt || "",
            });
          }
        }

        setYenimahalleImages(allImages.slice(0, 28));
        setMimarsinanImages(allImages.slice(28));
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };

    fetchImages();
  }, []);

  const activeGallery =
    selectedSection === "yenimahalle"
      ? yenimahalleImages
      : selectedSection === "mimarsinan"
        ? mimarsinanImages
        : [];

  const handlePrevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? activeGallery.length - 1 : prev! - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) =>
        prev === activeGallery.length - 1 ? 0 : prev! + 1
      );
    }
  };

  return (
    <section id="gallery" className="py-20 px-6 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto">

        {/* Main Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight pb-2">
            Galeri
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Spor salonlarımızdan fotoğraflar ve anlar
          </p>
        </div>

        {/* ----- Yenimahalle Title Styled Like Trainers ----- */}
        <div className="flex justify-center mb-6">
          <span className="bg-green-600 text-white px-5 py-2.5 rounded-xl text-lg font-medium">
            Yenimahalle Şubemiz
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {yenimahalleImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg cursor-pointer shadow-card hover:shadow-fitness transition-all duration-300"
              onClick={() => {
                setSelectedSection("yenimahalle");
                setSelectedImageIndex(index);
              }}
            >
              <img src={image.src} alt={image.alt} className="w-full h-64 object-cover group-hover:scale-110 transition-transform" />
              <ExternalLink className="absolute top-4 right-4 h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* ----- Mimarsinan Title Styled Like Trainers ----- */}
        <div className="flex justify-center mb-6 mt-16">
          <span className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-lg font-medium">
            Mimarsinan Şubemiz
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {mimarsinanImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg cursor-pointer shadow-card hover:shadow-fitness transition-all duration-300"
              onClick={() => {
                setSelectedSection("mimarsinan");
                setSelectedImageIndex(index);
              }}
            >
              <img src={image.src} alt={image.alt} className="w-full h-64 object-cover group-hover:scale-110 transition-transform" />
              <ExternalLink className="absolute top-4 right-4 h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* ----- Image Preview ----- */}
        {selectedImageIndex !== null && (
          <div
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImageIndex(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img
                src={activeGallery[selectedImageIndex].src}
                alt={activeGallery[selectedImageIndex].alt}
                className="max-h-[90vh] w-auto object-contain rounded-lg shadow-2xl mx-auto"
              />
              <button
                className="absolute top-4 right-4 bg-background/80 rounded-full p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex(null);
                }}
              >
                <X className="h-6 w-6" />
              </button>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-3"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-3"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 rounded-full px-4 py-2 text-sm">
                {selectedImageIndex + 1} / {activeGallery.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;

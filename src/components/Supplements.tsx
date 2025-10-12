import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SHEETDB_URL = "https://sheetdb.io/api/v1/y0gr42ncazg7t";


interface SheetRow {
  supplement_title?: string;
  supplement_price?: string;
  supplement_image?: string;
  supplement_desc?: string;
}

const Supplements = () => {
  const [supplements, setSupplements] = useState<SheetRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupplements = async () => {
      try {
        const res = await fetch(SHEETDB_URL);
        const data: SheetRow[] = await res.json();
        const filtered = data
          .filter((r) => r.supplement_title && r.supplement_title.trim() !== "")
          .slice(0, 20);
        setSupplements(filtered);
      } catch (err) {
        console.error("Error fetching supplements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplements();
  }, []);

  const handleWhatsApp = (title?: string) => {
    const supplementName = title ?? "supplement";
    const message = `Merhaba, ${supplementName} hakkında bilgi almak istiyorum. Bu supplement stokta mı?`;
    window.open(
      `https://wa.me/905366544655?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section id="supplements" className="py-20 px-6 bg-background text-foreground">
      <style>
        {`
          /* ✅ الأسهم */
          .swiper-button-next,
          .swiper-button-prev {
            color: black;
            opacity: 0.8;
            font-size: 16px;
            transform: scale(0.6);
            transition: opacity 0.3s ease, transform 0.3s ease;
            top: 40%; /* ⬆️ تم الرفع للأعلى (من 45% إلى 40%) */
          }
          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            opacity: 1;
            transform: scale(0.8);
          }
          .swiper-button-next {
            right: -30px;
          }
          .swiper-button-prev {
            left: -30px;
          }

          /* ✅ الدوائر */
          .swiper-pagination {
            position: relative !important;
            margin-top: 20px !important; /* ⬇️ تم تقليل المسافة (من 40px إلى 20px) */
            bottom: 0 !important;
            text-align: center !important;
          }

          .swiper-pagination-bullet {
            background: transparent;
            border: 2px solid white;
            width: 8px;
            height: 8px;
            opacity: 0.5;
            transition: all 0.3s ease;
          }

          .swiper-pagination-bullet-active {
            background: white;
            opacity: 1;
            transform: scale(1.3);
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto">
        {/* ✅ العنوان */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Supplementlerimiz
          </h2>
          <p className="text-sm text-muted-foreground">
            Sporcular için en kaliteli supplementler — hemen keşfedin.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Yükleniyor...</p>
        ) : supplements.length === 0 ? (
          <p className="text-center text-muted-foreground">Supplement bulunamadı.</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={40}
            slidesPerView={4}
            slidesPerGroup={4}
            breakpoints={{
              320: { slidesPerView: 1, slidesPerGroup: 1 },
              640: { slidesPerView: 2, slidesPerGroup: 2 },
              1024: { slidesPerView: 4, slidesPerGroup: 4 },
            }}
            className="pb-12 relative" // ⬇️ قللنا المسافة من pb-24 إلى pb-12
          >
            {supplements.map((s, i) => {
              const isEven = i % 2 === 0;
              const bgColor = isEven ? "#007bff" : "#ff7f2a";
              const buttonColor = isEven ? "#ff7f2a" : "#00bfff";
              const borderColor = isEven ? "#ff7f2a" : "#007bff";

              return (
                <SwiperSlide key={i} className="h-auto">
                  <div
                    className="group rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 scale-95 hover:scale-100"
                    style={{
                      backgroundColor: bgColor,
                      border: `3px solid ${borderColor}`,
                    }}
                  >
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-muted">
                      <img
                        src={s.supplement_image || ""}
                        alt={s.supplement_title || `supplement-${i}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-5 text-left bg-background text-foreground">
                      <h3 className="text-lg font-semibold mb-1">
                        {s.supplement_title}
                      </h3>

                      {s.supplement_desc && (
                        <p className="text-sm opacity-80 mb-3 line-clamp-2">
                          {s.supplement_desc}
                        </p>
                      )}

                      {s.supplement_price && (
                        <p className="text-lg font-bold mb-3">
                          {s.supplement_price.replace("TL", "").replace("$", "")}
                        </p>
                      )}

                      <Button
                        className="w-full font-semibold text-white hover:opacity-90 transition"
                        style={{ backgroundColor: buttonColor }}
                        onClick={() => handleWhatsApp(s.supplement_title)}
                      >
                        WhatsApp ile Kayıt Ol
                      </Button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Supplements;

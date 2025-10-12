import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SHEETDB_URL = "https://sheetdb.io/api/v1/sxnqlqdlcro45";

interface SheetRow {
  product_title?: string;
  product_price?: string;
  product_image?: string;
  product_desc?: string;
}

const Products = () => {
  const [products, setProducts] = useState<SheetRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(SHEETDB_URL);
        const data: SheetRow[] = await res.json();
        const filtered = data
          .filter((r) => r.product_title && r.product_title.trim() !== "")
          .slice(0, 20);
        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleWhatsApp = (title?: string) => {
    const productName = title ?? "ürün";
    const message = `Merhaba, ${productName} hakkında bilgi almak istiyorum.`;
    window.open(
      `https://wa.me/905366544655?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section id="products" className="py-20 px-6 bg-background text-foreground">
      <style>
        {`
          /* ✅ الأسهم */
          .swiper-button-next,
          .swiper-button-prev {
            color: white;
            opacity: 0.8;
            transition: opacity 0.3s ease, transform 0.3s ease;
            top: 45%;
          }
          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            opacity: 1;
            transform: scale(1.2);
          }
          .swiper-button-next {
            right: -40px; /* ⬅️ إبعاد الأسهم عن الصور */
          }
          .swiper-button-prev {
            left: -40px;
          }

          /* ✅ الدوائر (pagination bullets) */
          .swiper-pagination {
            position: relative !important;
            margin-top: 50px !important;
            bottom: 0 !important;
            text-align: center !important;
          }

          .swiper-pagination-bullet {
            background: transparent;
            border: 2px solid white;
            width: 8px; /* ⬅️ حجم أصغر */
            height: 8px;
            opacity: 0.5;
            transition: all 0.3s ease;
          }

          .swiper-pagination-bullet-active {
            background: white; /* داخلها أبيض */
            opacity: 1;
            transform: scale(1.3);
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto">
        {/* ✅ العنوان */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Ürünlerimiz
          </h2>
          <p className="text-sm text-muted-foreground">
            Spor salonu için seçkin ürünler — hemen inceleyin.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Yükleniyor...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-muted-foreground">Ürün bulunamadı.</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={40} /* ⬅️ تباعد بين الكروت */
            slidesPerView={4}
            slidesPerGroup={4}
            breakpoints={{
              320: { slidesPerView: 1, slidesPerGroup: 1 },
              640: { slidesPerView: 2, slidesPerGroup: 2 },
              1024: { slidesPerView: 4, slidesPerGroup: 4 },
            }}
            className="pb-24 relative"
          >
            {products.map((p, i) => {
              const bgColor = i % 2 === 0 ? "#28a745" : "#007bff";

              return (
                <SwiperSlide key={i} className="h-auto">
                  <div
                    className="group rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 scale-95 hover:scale-100"
                    style={{
                      backgroundColor: bgColor,
                    }}
                  >
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-muted">
                      <img
                        src={p.product_image || ""}
                        alt={p.product_title || `product-${i}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-5 text-left text-white">
                      <h3 className="text-lg font-semibold mb-1">
                        {p.product_title}
                      </h3>

                      {p.product_desc && (
                        <p className="text-sm opacity-90 mb-3 line-clamp-2">
                          {p.product_desc}
                        </p>
                      )}

                      {p.product_price && (
                        <p className="text-lg font-bold mb-3">
                          {p.product_price.replace("TL", "").replace("$", "")}
                        </p>
                      )}

                      <Button
                        className="w-full bg-white text-black hover:bg-white/90 transition font-semibold"
                        onClick={() => handleWhatsApp(p.product_title)}
                      >
                        WhatsApp ile Sipariş Ver
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

export default Products;

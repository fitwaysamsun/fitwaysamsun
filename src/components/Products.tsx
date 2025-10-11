// src/components/Products.tsx
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SHEETDB_URL = "https://sheetdb.io/api/v1/sxnqlqdlcro45";

interface SheetRow {
  product_title?: string;
  product_price?: string;
  product_image?: string;
  product_desc?: string;
  [key: string]: any;
}

export default function Products() {
  const [products, setProducts] = useState<SheetRow[]>([]);
  const [loading, setLoading] = useState(true);

  // نستخدم مراجع للأزرار المخصصة لتهيئة Swiper navigation
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      try {
        const res = await fetch(SHEETDB_URL);
        const data: SheetRow[] = await res.json();

        const filtered = data
          .filter((r) => r.product_title && r.product_title.trim() !== "")
          .slice(0, 15);

        if (mounted) setProducts(filtered);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

  const handleWhatsApp = (title?: string) => {
    const productName = title ?? "ürün";
    const message = `Merhaba, ${productName} hakkında bilgi almak istiyorum.`;
    window.open(`https://wa.me/905366544655?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section
      id="products"
      className="py-20 px-6 bg-gradient-to-b from-background/60 to-secondary/20 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Ürünlerimiz
            </h2>
            <p className="text-sm text-muted-foreground">Spor salonu için seçkin ürünler — hemen inceleyin.</p>
          </div>

          {/* أزرار التنقل المخصصة */}
          <div className="hidden md:flex items-center gap-3">
            <button
              ref={prevRef}
              aria-label="Previous"
              className="swiper-nav-btn group"
            >
              <span className="p-2 rounded-full shadow-lg bg-white/90 backdrop-blur-sm group-hover:scale-105 transition-transform">
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </span>
            </button>

            <button
              ref={nextRef}
              aria-label="Next"
              className="swiper-nav-btn group"
            >
              <span className="p-2 rounded-full shadow-lg bg-white/90 backdrop-blur-sm group-hover:scale-105 transition-transform">
                <ChevronRight className="h-5 w-5 text-foreground" />
              </span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="animate-pulse bg-card/40 p-4 rounded-2xl h-[320px]" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-muted-foreground">Ürün bulunamadı.</p>
        ) : (
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={20}
              navigation={{
                prevEl: ".swiper-prev-custom",
                nextEl: ".swiper-next-custom",
              }}
              pagination={{ clickable: true }}
              slidesPerView={5}
              slidesPerGroup={5}
              breakpoints={{
                320: { slidesPerView: 1, slidesPerGroup: 1 },
                640: { slidesPerView: 2, slidesPerGroup: 2 },
                768: { slidesPerView: 3, slidesPerGroup: 3 },
                1024: { slidesPerView: 4, slidesPerGroup: 2 },
                1280: { slidesPerView: 5, slidesPerGroup: 5 },
              }}
              className="py-4"
            >
              {products.map((p, i) => (
                <SwiperSlide key={i} className="h-auto">
                  <Card className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/60 overflow-hidden transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl">
                    <div className="relative w-full h-48 overflow-hidden group">
                      <img
                        src={p.product_image || ""}
                        alt={p.product_title || `product-${i}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* overlay gradient on hover */}
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />

                      {/* price badge top-left */}
                      {p.product_price && (
                        <div className="absolute top-3 left-3">
                          <Badge className="rounded-full px-3 py-1 font-semibold shadow-md bg-emerald-600/95 text-white">
                            {p.product_price}
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4 text-center">
                      <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-2">
                        {p.product_title}
                      </h3>

                      {p.product_desc && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                          {p.product_desc}
                        </p>
                      )}

                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="ghost"
                          className="flex-1 border border-border/50 hover:bg-primary/5"
                          onClick={() => handleWhatsApp(p.product_title)}
                        >
                          WhatsApp ile Sipariş Ver
                        </Button>

                        <button
                          onClick={() => {
                            // مثال: يمكن فتح مودال أو صفحة المنتج — حاليًا نعيد نفس الرابط
                            handleWhatsApp(p.product_title);
                          }}
                          className="px-3 py-2 rounded-lg bg-primary/95 text-white font-medium hover:scale-[1.02] transition-transform"
                        >
                          İncele
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* عناصر التنقل المخصصة (تتوافق مع selectors في navigation) */}
            <div className="hidden md:flex gap-3 absolute right-4 top-1/2 -translate-y-1/2 z-20">
              {/* ربط الأزرار عن طريق الكلاسات المستخدمة في navigation السابق */}
              <button className="swiper-prev-custom p-0" aria-hidden>
                <span className="p-3 rounded-full shadow-lg bg-white/95 backdrop-blur-sm hover:scale-105 transition-transform">
                  <ChevronLeft className="h-5 w-5 text-foreground" />
                </span>
              </button>

              <button className="swiper-next-custom p-0" aria-hidden>
                <span className="p-3 rounded-full shadow-lg bg-white/95 backdrop-blur-sm hover:scale-105 transition-transform">
                  <ChevronRight className="h-5 w-5 text-foreground" />
                </span>
              </button>
            </div>

            {/* pagination small on mobile */}
            <div className="mt-3 md:hidden" />
          </div>
        )}
      </div>

      {/* بعض الستايلات المحلية السهلة */}
      <style jsx>{`
        /* تحسين ظهور الأزرار الافتراضية (في حالة احتياج) */
        :global(.swiper-button-next),
        :global(.swiper-button-prev) {
          opacity: 0;
          pointer-events: none;
        }

        /* إخفاء أزرار الـ Swiper الافتراضية بالكامل (نستخدم أزرار مخصصة) */
        :global(.swiper) {
          padding-bottom: 12px;
        }

        /* line-clamp fallback if plugin not present */
        :global(.line-clamp-2) {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        :global(.line-clamp-3) {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}

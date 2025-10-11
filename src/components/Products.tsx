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
import { Info, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";

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

  // Refs for custom navigation buttons
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
      className="py-20 px-6 bg-gradient-to-b from-background/60 to-secondary/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Ürünlerimiz
            </h2>
            <p className="text-sm text-muted-foreground">Spor salonu için seçkin ürünler — hemen inceleyin.</p>
          </div>

          {/* Top controls (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              ref={prevRef}
              aria-label="Previous"
              className="p-0"
            >
              <span className="p-2 rounded-full shadow-md bg-white/90 backdrop-blur-sm hover:scale-105 transition-transform">
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </span>
            </button>

            <button
              ref={nextRef}
              aria-label="Next"
              className="p-0"
            >
              <span className="p-2 rounded-full shadow-md bg-white/90 backdrop-blur-sm hover:scale-105 transition-transform">
                <ChevronRight className="h-5 w-5 text-foreground" />
              </span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="animate-pulse bg-card/40 p-4 rounded-2xl h-[340px]" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-muted-foreground">Ürün bulunamadı.</p>
        ) : (
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={20}
              slidesPerView={5}
              slidesPerGroup={1}
              pagination={{ clickable: true }}
              navigation={{
                prevEl: prevRef.current ?? undefined,
                nextEl: nextRef.current ?? undefined,
              }}
              onBeforeInit={(swiper) => {
                // link refs to swiper navigation reliably
                // @ts-ignore
                if (typeof swiper.params !== "undefined" && swiper.params.navigation) {
                  // @ts-ignore
                  swiper.params.navigation.prevEl = prevRef.current;
                  // @ts-ignore
                  swiper.params.navigation.nextEl = nextRef.current;
                }
              }}
              breakpoints={{
                320: { slidesPerView: 1, slidesPerGroup: 1 },
                640: { slidesPerView: 2, slidesPerGroup: 1 },
                768: { slidesPerView: 3, slidesPerGroup: 1 },
                1024: { slidesPerView: 4, slidesPerGroup: 1 },
                1280: { slidesPerView: 5, slidesPerGroup: 1 },
              }}
              className="py-4"
            >
              {products.map((p, i) => (
                <SwiperSlide key={i} className="h-auto">
                  <Card className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/60 overflow-hidden transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl">
                    <div className="relative w-full h-48 overflow-hidden group">
                      {/* Image */}
                      <img
                        src={p.product_image || ""}
                        alt={p.product_title || `product-${i}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* soft overlay to improve readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />

                      {/* price badge top-left */}
                      {p.product_price && (
                        <div className="absolute top-3 left-3 z-10">
                          <Badge className="rounded-full px-3 py-1 font-semibold shadow-md bg-emerald-600/95 text-white">
                            {p.product_price}
                          </Badge>
                        </div>
                      )}

                      {/* info icon top-right */}
                      <button
                        aria-label="Detay"
                        title="Detay"
                        onClick={() => handleWhatsApp(p.product_title)}
                        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/90 shadow-md hover:scale-105 transition-transform"
                      >
                        <Info className="h-4 w-4 text-foreground" />
                      </button>
                    </div>

                    <CardContent className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
                        {p.product_title}
                      </h3>

                      {p.product_desc && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                          {p.product_desc}
                        </p>
                      )}

                      <div className="flex items-center gap-3 mt-2">
                        <Button
                          onClick={() => handleWhatsApp(p.product_title)}
                          className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-md"
                        >
                          <MessageSquare className="h-4 w-4" />
                          WhatsApp ile Sipariş Ver
                        </Button>

                        {/* optional small quick action (icon) */}
                        <button
                          onClick={() => handleWhatsApp(p.product_title)}
                          className="p-2 rounded-lg bg-white/90 border border-border/60 shadow-sm hover:scale-105 transition-transform"
                          title="Hızlı bilgi"
                        >
                          <ChevronRight className="h-4 w-4 text-foreground" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* fallback floating navigation for small screen (visible on md+) */}
            <div className="hidden md:flex gap-3 absolute right-2 top-1/2 -translate-y-1/2 z-20">
              <button ref={prevRef} className="p-0" aria-hidden>
                <span className="p-3 rounded-full shadow-lg bg-white/95 backdrop-blur-sm hover:scale-105 transition-transform">
                  <ChevronLeft className="h-5 w-5 text-foreground" />
                </span>
              </button>

              <button ref={nextRef} className="p-0" aria-hidden>
                <span className="p-3 rounded-full shadow-lg bg-white/95 backdrop-blur-sm hover:scale-105 transition-transform">
                  <ChevronRight className="h-5 w-5 text-foreground" />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* local styles */}
      <style>{`
        /* hide default swiper arrows if present */
        :global(.swiper-button-next),
        :global(.swiper-button-prev) {
          display: none !important;
        }

        /* clamp fallback */
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

        /* ensure images don't break layout when missing */
        img {
          background: linear-gradient(135deg, rgba(0,0,0,0.03), rgba(0,0,0,0.06));
        }
      `}</style>
    </section>
  );
}

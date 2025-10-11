import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SHEETDB_URL = "https://sheetdb.io/api/v1/sxnqlqdlcro45";

interface SheetRow {
  product_title?: string;
  product_price?: string;
  product_image?: string;
  product_desc?: string;
  [key: string]: any;
}

const Products = () => {
  const [products, setProducts] = useState<SheetRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(SHEETDB_URL);
        const data: SheetRow[] = await res.json();

        // اختر فقط الصفوف التي تحتوي على product_title واظهر أول 15
        const filtered = data
          .filter((r) => r.product_title && r.product_title.trim() !== "")
          .slice(0, 15);

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
    // رقم WhatsApp الذي زودتنا به
    window.open(`https://wa.me/905366544655?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="products" className="py-20 px-6 bg-card/50 backdrop-blur-sm border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Ürünlerimiz
          </h2>
          <p className="text-lg text-muted-foreground">Spor salonu ürünleri — hemen inceleyin.</p>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Yükleniyor...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-muted-foreground">Ürün bulunamadı.</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={20}
            navigation
            pagination={{ clickable: true }}
            slidesPerView={5}
            slidesPerGroup={5}
            breakpoints={{
              320: { slidesPerView: 1, slidesPerGroup: 1 },
              640: { slidesPerView: 2, slidesPerGroup: 2 },
              768: { slidesPerView: 3, slidesPerGroup: 3 },
              1024: { slidesPerView: 5, slidesPerGroup: 5 },
            }}
            className="py-4"
          >
            {products.map((p, i) => (
              <SwiperSlide key={i} className="h-auto">
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 overflow-hidden">
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={p.product_image || ""}
                      alt={p.product_title || `product-${i}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <CardContent className="p-4 text-center">
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {p.product_title}
                    </h3>

                    {p.product_desc && (
                      <p className="text-sm text-muted-foreground mb-3">
                        {p.product_desc}
                      </p>
                    )}

                    {p.product_price && (
                      <Badge className="mb-3">{p.product_price}</Badge>
                    )}

                    <Button className="w-full mt-2" onClick={() => handleWhatsApp(p.product_title)}>
                      WhatsApp ile Sipariş Ver
                    </Button>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Products;

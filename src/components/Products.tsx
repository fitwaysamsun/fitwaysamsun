import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const SHEETDB_URL = "https://sheetdb.io/api/v1/v413b198kjszj";

interface Product {
  product_name: string;
  product_price: string;
  product_image: string;
  type?: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(SHEETDB_URL);
        const data = await res.json();

        const filtered = data
          .filter((item: Product) => item.type?.toLowerCase() === "product")
          .slice(0, 15); // ✅ فقط أول 15 منتج

        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleBuy = (productName: string) => {
    const message = `Merhaba, ${productName} ürünü hakkında bilgi almak istiyorum.`;
    window.open(`https://wa.me/905366544655?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="products" className="py-20 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Ürünlerimiz
        </h2>

        {products.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={20}
            navigation
            slidesPerView={5}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 5 },
            }}
          >
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 hover:scale-105 overflow-hidden">
                  <img
                    src={product.product_image}
                    alt={product.product_name}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4 text-center">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {product.product_name}
                    </h3>
                    <Badge className="mb-3">{product.product_price}</Badge>
                    <Button className="w-full" onClick={() => handleBuy(product.product_name)}>
                      Satın Al
                    </Button>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-muted-foreground">Yükleniyor...</p>
        )}
      </div>
    </section>
  );
};

export default Products;

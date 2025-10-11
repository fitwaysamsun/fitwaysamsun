import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SHEETDB_URL = "https://sheetdb.io/api/v1/v413b198kjszj";

interface Product {
  product_name: string;
  price: string;
  image: string;
  description: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(SHEETDB_URL);
        const data = await res.json();

        // فقط المنتجات التي تحتوي على product_name
        const filtered = data
          .filter((item: any) => item.product_name)
          .map((item: any) => ({
            product_name: item.product_name,
            price: item.price,
            image: item.image,
            description: item.description,
          }));

        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching products from SheetDB:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleWhatsApp = (productName: string) => {
    const message = `Merhaba, ${productName} ürünü hakkında bilgi almak istiyorum.`;
    window.open(
      `https://wa.me/905366544655?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section id="products" className="py-20 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        {/* العنوان */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Ürünlerimiz
          </h2>
          <p className="text-lg text-muted-foreground">
            Spor salonumuza özel ürünler – hemen inceleyin!
          </p>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Yükleniyor...</p>
        ) : (
          <Swiper spaceBetween={20} slidesPerView={5} className="mySwiper">
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:scale-105">
                  <img
                    src={product.image}
                    alt={product.product_name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold">{product.product_name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                    <p className="text-primary font-bold mb-3">{product.price}</p>
                    <Button
                      className="w-full"
                      onClick={() => handleWhatsApp(product.product_name)}
                    >
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

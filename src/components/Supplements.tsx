import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Dumbbell, Zap, Heart, Activity, Package, Flame, LayoutGrid, MessageCircle } from "lucide-react";
import * as contentful from "contentful";

const CONTENTFUL_SPACE_ID = "p5kasvv6kj11";
const CONTENTFUL_ACCESS_TOKEN = "KSrKb2kKdkgzTYeBgbh6kIe3yvLctdTM51QjpLPisqM";

const CONTENT_TYPE_MAP = {
  packages: "avantajlPaketler",
  protein: "proteinTozlar",
  creatine: "kreatinler",
  vitamins: "vitaminlerMineraller",
  performance: "gucVePerformans",
  equipment: "sporEkipmanlar",
  other: "digerUrunler"
} as const;

interface ContentfulProduct {
  title: string;
  price: number | null;
  priceCash?: number | null;
  priceCard?: number | null;
  description: string;
  image: string;
}

interface Category {
  id: keyof typeof CONTENT_TYPE_MAP;
  title: string;
  icon: JSX.Element;
  contentTypeId: string;
}

const client = contentful.createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN
});

const Supplements = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState<{ category: Category; product: ContentfulProduct | null; }[]>([]);
  const [loading, setLoading] = useState(true);

  const categories: Category[] = [
    { id: "packages", title: "Avantajlı Paketler", icon: <Package className="w-4 h-4" />, contentTypeId: CONTENT_TYPE_MAP.packages },
    { id: "protein", title: "Protein Tozları", icon: <Dumbbell className="w-4 h-4" />, contentTypeId: CONTENT_TYPE_MAP.protein },
    { id: "creatine", title: "Kreatinler", icon: <Zap className="w-4 h-4" />, contentTypeId: CONTENT_TYPE_MAP.creatine },
    { id: "vitamins", title: "Vitaminler & Mineraller", icon: <Heart className="w-4 h-4" />, contentTypeId: CONTENT_TYPE_MAP.vitamins },
    { id: "performance", title: "Güç & Performans", icon: <Flame className="w-4 h-4" />, contentTypeId: CONTENT_TYPE_MAP.performance },
    { id: "equipment", title: "Spor Ekipmanları", icon: <Activity className="w-4 h-4" />, contentTypeId: CONTENT_TYPE_MAP.equipment },
    { id: "other", title: "Diğer Ürünler", icon: <LayoutGrid className="w-4 h-4" />, contentTypeId: CONTENT_TYPE_MAP.other }
  ];

  const handleWhatsApp = (product: ContentfulProduct) => {
    const msg = `Merhaba, ${product.title} ürünü hakkında bilgi almak istiyorum.
Nakit Fiyatı: ${(product.priceCash ?? product.price)?.toLocaleString('tr-TR') || 'Belirtilmemiş'} TL
Kartla Ödeme Fiyatı: ${product.priceCard?.toLocaleString('tr-TR') || 'Belirtilmemiş'} TL`;
    window.open(`https://wa.me/905398937955?text=${encodeURIComponent(msg)}`, "_blank");
  };

  useEffect(() => {
    const fetchSupplements = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          categories.map(async (category) => {
            const response = await client.getEntries({
              content_type: category.contentTypeId,
              limit: 1
            });

            const entry = response.items[0] as any;
            if (!entry) {
              return { category, product: null };
            }

            const entryTitle = entry.fields.name || "Ürün Adı Yok";
            const entryDescription = entry.fields.description || "";

            const getField = (fields: any, keys: string[]) => {
              for (const key of keys) {
                if (fields[key] !== undefined) return Number(fields[key]);
              }
              return null;
            };

            const entryPrice = getField(entry.fields, ['price', 'fiyat']);
            const entryPriceCash = getField(entry.fields, ['priceCash', 'pricecash', 'PriceCash', 'nakit', 'cash']);
            const entryPriceCard = getField(entry.fields, ['priceCard', 'pricecard', 'PriceCard', 'kart', 'card']);

            const photoAsset = entry.fields.photos && entry.fields.photos.length > 0
              ? entry.fields.photos[0]
              : null;

            const imageUrl = photoAsset && photoAsset.fields.file
              ? `https:${photoAsset.fields.file.url}`
              : "";

            const product: ContentfulProduct = {
              title: entryTitle,
              price: entryPrice,
              priceCash: entryPriceCash,
              priceCard: entryPriceCard,
              description: entryDescription,
              image: imageUrl
            };

            return { category, product };
          })
        );

        setFeaturedProducts(results);
      } catch (err) {
        console.error("Error fetching featured supplements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplements();
  }, []);

  return (
    <section id="supplements" className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent inline-block leading-tight pb-2">
            Öne Çıkan Ürünler
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hedeflerinize ulaşmanız için seçtiğimiz en popüler ürünler.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {featuredProducts.map(({ category, product }, i) => {
              if (!product) {
                return null;
              }

              const displayTitle = product.title;
              const slug = product.title.trim().toLowerCase().replace(/\s+/g, "-");

              return (
                <div
                  key={`${category.id}-${i}`}
                  className="group relative bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col cursor-pointer w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]"
                  onClick={() => navigate(`/product/${slug}`)}
                >
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-md text-xs font-bold border border-border/50 flex items-center gap-1.5 shadow-sm text-foreground">
                      {category.icon}
                      {category.title}
                    </span>
                  </div>

                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <img
                      src={product.image || "/placeholder-image.jpg"}
                      alt={displayTitle}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-1 relative">
                    <h3 className="font-bold text-lg mb-4 line-clamp-2 group-hover:text-primary transition-colors h-14">
                      {displayTitle}
                    </h3>

                    <div className="mt-auto pt-4 border-t border-border/50">
                      <div className="flex flex-col mb-4">
                        {(product.priceCash !== null || product.price !== null || product.priceCard !== null) ? (
                          <div className="flex flex-col gap-0.5">
                            {(product.priceCash ?? product.price) !== null && <span className="text-lg font-bold text-primary">Nakit: {product.priceCash ?? product.price} TL</span>}
                            {product.priceCard !== null && <span className="text-xs font-medium text-muted-foreground">Kart: {product.priceCard} TL</span>}
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-primary">Fiyat Sorunuz</span>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-500/10 transition-all duration-300 hover:scale-[1.02] py-5"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWhatsApp(product);
                          }}
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="font-bold">WhatsApp Sipariş</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full rounded-xl border-primary/20 hover:bg-primary/5 hover:text-primary group/btn transition-colors py-5"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product/${slug}`);
                          }}
                        >
                          <span>Detayları Gör</span>
                          <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-16 text-center">
          <Button
            onClick={() => navigate('/products')}
            size="lg"
            className="text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
          >
            Tüm Ürünleri İncele
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Supplements;

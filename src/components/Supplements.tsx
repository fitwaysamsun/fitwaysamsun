import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Dumbbell, Zap, Heart, Activity } from "lucide-react";
import * as contentful from "contentful";

const CONTENTFUL_SPACE_ID = "p5kasvv6kj11";
const CONTENTFUL_ACCESS_TOKEN = "KSrKb2kKdkgzTYeBgbh6kIe3yvLctdTM51QjpLPisqM";

const CONTENT_TYPE_MAP = {
  protein: "proteinTozlar",
  creatine: "kreatinler",
  vitamins: "vitaminlerMineraller",
  equipment: "sporEkipmanlar"
} as const;

interface ContentfulProduct {
  title: string;
  price: number | null;
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
    { id: "protein", title: "Protein Tozları", icon: <Dumbbell className="w-4 h-4" />, contentTypeId: CONTENT_TYPE_MAP.protein },
    { id: "creatine", title: "Kreatinler", icon: <Zap className="w-4 h-4" />, contentTypeId: CONTENT_TYPE_MAP.creatine },
    { id: "vitamins", title: "Vitaminler & Mineraller", icon: <Heart className="w-4 h-4" />, contentTypeId: CONTENT_TYPE_MAP.vitamins },
    { id: "equipment", title: "Spor Ekipmanları", icon: <Activity className="w-4 h-4" />, contentTypeId: CONTENT_TYPE_MAP.equipment }
  ];

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
            const entryPrice = entry.fields.price ? Number(entry.fields.price) : null;

            const photoAsset = entry.fields.photos && entry.fields.photos.length > 0
              ? entry.fields.photos[0]
              : null;
            
            const imageUrl = photoAsset && photoAsset.fields.file
              ? `https:${photoAsset.fields.file.url}`
              : "";

            const product: ContentfulProduct = {
              title: entryTitle,
              price: entryPrice,
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(({ category, product }, i) => {
              if (!product) {
                return null;
              }

              const displayTitle = `${category.title.split(" ")[0]} - ${product.title}`;
              const slug = product.title.trim().toLowerCase().replace(/\s+/g, "-");

              return (
                <div
                  key={`${category.id}-${i}`}
                  className="group relative bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col cursor-pointer"
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
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {displayTitle}
                    </h3>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
                      <span className="text-xl font-bold text-primary">
                        {product.price !== null ? `${product.price} TL` : "Fiyat Sorunuz"}
                      </span>
                      <Button
                        size="icon"
                        className="rounded-full w-10 h-10 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </Button>
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

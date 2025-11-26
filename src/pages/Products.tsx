import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dumbbell, Zap, Heart, Activity, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import * as contentful from "contentful";

// تعاريف Contentful
const CONTENTFUL_SPACE_ID = "p5kasvv6kj11";
const CONTENTFUL_ACCESS_TOKEN = "KSrKb2kKdkgzTYeBgbh6kIe3yvLctdTM51QjpLPisqM";

// إعداد عميل Contentful
const client = contentful.createClient({
    space: CONTENTFUL_SPACE_ID,
    accessToken: CONTENTFUL_ACCESS_TOKEN,
});

// ✨ تم تحديث CONTENT_TYPE_MAP بناءً على الـ IDs المؤكدة
const CONTENT_TYPE_MAP = {
    // الـ IDs المؤكدة من قبلك:
    protein: "proteinTozlar", // كان سابقاً proteinTozlari
    creatine: "kreatinler",
    vitamins: "vitaminlerMineraller", 
    equipment: "sporEkipmanlar", // كان سابقاً sporEkipmanlari
};

// تعريف الواجهة للبيانات المسترجعة من Contentful
interface ContentfulProduct {
    title: string;
    price: number | null; 
    description: string;
    image: string; 
    categoryTitle: string; 
    contentTypeId: string; 
}

// تعريف الواجهة لتصنيفاتنا
interface Category {
    id: keyof typeof CONTENT_TYPE_MAP;
    title: string;
    desc: string;
    icon: JSX.Element;
    contentTypeId: string;
}

const Products = () => {
    const navigate = useNavigate();
    const [supplementsByCategory, setSupplementsByCategory] = useState<Record<string, ContentfulProduct[]>>({});
    const [loading, setLoading] = useState(true);

    const categories: Category[] = [
        // تم تحديث contentTypeId هنا ليعكس التغيير في CONTENT_TYPE_MAP
        { id: "protein", title: "Protein Tozları", desc: "Kas gelişimi için en iyi protein tozları.", icon: <Dumbbell className="w-6 h-6" />, contentTypeId: CONTENT_TYPE_MAP.protein },
        { id: "creatine", title: "Kreatinler", desc: "Güç و performans artışı için kreatin seçenekleri.", icon: <Zap className="w-6 h-6" />, contentTypeId: CONTENT_TYPE_MAP.creatine },
        { id: "vitamins", title: "Vitaminler & Mineraller", desc: "Sağlığınızı destekleyen vitamin و mineraller.", icon: <Heart className="w-6 h-6" />, contentTypeId: CONTENT_TYPE_MAP.vitamins },
        { id: "equipment", title: "Spor Ekipmanları", desc: "Antrenmanlarınız için gerekli ekipmanlar.", icon: <Activity className="w-6 h-6" />, contentTypeId: CONTENT_TYPE_MAP.equipment }
    ];

    useEffect(() => {
        const fetchSupplements = async () => {
            setLoading(true);

            try {
                const promises = categories.map(async (category) => {
                    // استخدام contentTypeId الصحيح الذي تم ربطه في الـ categories
                    const response = await client.getEntries({
                        content_type: category.contentTypeId, 
                        limit: 20, 
                    });
                    
                    const categoryProducts: ContentfulProduct[] = response.items.map((entry: any) => {
                        const entryTitle = entry.fields.name || "Ürün Adı Yok";
                        const entryDescription = entry.fields.description || "";
                        
                        // جلب حقل السعر (Price) من Contentful
                        const entryPrice = entry.fields.price ? Number(entry.fields.price) : null; 

                        // استخراج URL الصورة
                        const photoAsset = entry.fields.photos && entry.fields.photos.length > 0
                            ? entry.fields.photos[0]
                            : null;
                        
                        // يجب أن تكون الصورة منشورة أيضًا
                        const imageUrl = photoAsset && photoAsset.fields.file
                            ? `https:${photoAsset.fields.file.url}`
                            : "";

                        return {
                            title: entryTitle,
                            price: entryPrice,
                            description: entryDescription,
                            image: imageUrl,
                            categoryTitle: category.title,
                            contentTypeId: category.contentTypeId,
                        } as ContentfulProduct;
                    });
                    
                    return { categoryId: category.id, products: categoryProducts };
                });

                const results = await Promise.all(promises);

                const groupedProducts: Record<string, ContentfulProduct[]> = results.reduce((acc, result) => {
                    acc[result.categoryId] = result.products;
                    return acc;
                }, {});

                setSupplementsByCategory(groupedProducts);

            } catch (err) {
                console.error("Error fetching data from Contentful:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSupplements();
    }, []);

    // ... باقي مكون React (JSX) لم يتغير ...

    const handleWhatsApp = (title?: string) => {
        const supplementName = title ?? "supplement";
        const message = `Merhaba, ${supplementName} hakkında bilgi almak istiyorum. Bu supplement stokta mı?`;
        window.open(
            `https://wa.me/905366544655?text=${encodeURIComponent(message)}`,
            "_blank"
        );
    };

    const scrollToCategory = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />

            <main className="pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-pulse leading-tight pb-2">
                            Tüm Ürünlerimiz
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Hedeflerinize ulaşmanız için ihtiyacınız olan tüm supplement ve ekipmanlar burada.
                        </p>
                    </div>

                    {/* Quick Navigation Shortcuts */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                onClick={() => scrollToCategory(cat.id)}
                                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-background border border-border/50 p-6 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 hover:border-primary/50"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="mb-4 p-4 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary/50 transition-all duration-500 shadow-lg shadow-primary/10">
                                        {cat.icon}
                                    </div>
                                    <h3 className="font-bold text-base md:text-lg mb-1 group-hover:text-primary transition-colors duration-300">
                                        {cat.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                        Ürünleri İncele &rarr;
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- Product Listing --- */}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <p className="text-xl text-muted-foreground">Yükleniyor...</p>
                        </div>
                    ) : (
                        <div className="space-y-20">
                            {categories.map((category, catIndex) => {
                                const supplements = supplementsByCategory[category.id] || [];

                                return (
                                    <section key={catIndex} id={category.id} className="space-y-8 pt-4">
                                        <div className="border-l-4 border-primary pl-4">
                                            <h2 className="text-3xl font-bold mb-2">{category.title}</h2>
                                            <p className="text-muted-foreground">{category.desc}</p>
                                        </div>
                                        
                                        {supplements.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                                {supplements.map((s, i) => {
                                                    const itemTitle = s.title;
                                                    const slug = s.title.trim().toLowerCase().replace(/\s+/g, '-');

                                                    return (
                                                        <div
                                                            key={i}
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
                                                                    src={s.image || "/placeholder-image.jpg"}
                                                                    alt={itemTitle}
                                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                            </div>

                                                            <div className="p-5 flex flex-col flex-1 relative">
                                                                <h3 className="font-bold text-base mb-4 pb-2 leading-relaxed group-hover:text-primary transition-colors break-words min-h-[3rem]">
                                                                    {itemTitle}
                                                                </h3>

                                                                <div className="mt-auto flex items-center justify-between pt-6 border-t border-border/50">
                                                                    <span className="text-xl font-bold text-primary">
                                                                        {s.price !== null ? `${s.price} TL` : 'Fiyat Sorunuz'}
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
                                        ) : (
                                            <p className="text-muted-foreground italic">Bu kategoride ürün bulunamadı.</p>
                                        )}
                                    </section>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Products;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dumbbell, Zap, Heart, Activity, ArrowRight, Package, LayoutGrid, Flame } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import * as contentful from "contentful";

// إعداد Contentful
const CONTENTFUL_SPACE_ID = "p5kasvv6kj11";
const CONTENTFUL_ACCESS_TOKEN = "KSrKb2kKdkgzTYeBgbh6kIe3yvLctdTM51QjpLPisqM";

const client = contentful.createClient({
    space: CONTENTFUL_SPACE_ID,
    accessToken: CONTENTFUL_ACCESS_TOKEN,
});

// خريطة أنواع المنتجات
const CONTENT_TYPE_MAP = {
    packages: "avantajlPaketler",
    protein: "proteinTozlar",
    creatine: "kreatinler",
    vitamins: "vitaminlerMineraller",
    performance: "gucVePerformans",
    equipment: "sporEkipmanlar",
    other: "digerUrunler",
};

interface ContentfulProduct {
    title: string;
    price: number | null;
    priceCash?: number | null;
    priceCard?: number | null;
    description: string;
    image: string;
    categoryTitle: string;
    contentTypeId: string;
}

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
        { id: "packages", title: "Avantajlı Paketler", desc: "Sizin için hazırladığımız özel fırsat paketleri.", icon: <Package className="w-6 h-6" />, contentTypeId: CONTENT_TYPE_MAP.packages },
        { id: "protein", title: "Protein Tozları", desc: "Kas gelişimi için en iyi protein tozları.", icon: <Dumbbell className="w-6 h-6" />, contentTypeId: CONTENT_TYPE_MAP.protein },
        { id: "creatine", title: "Kreatinler", desc: "Güç ve performans artışı için kreatin seçenekleri.", icon: <Zap className="w-6 h-6" />, contentTypeId: CONTENT_TYPE_MAP.creatine },
        { id: "vitamins", title: "Vitaminler & Mineraller", desc: "Sağlığınızı destekleyen vitamin ve mineraller.", icon: <Heart className="w-6 h-6" />, contentTypeId: CONTENT_TYPE_MAP.vitamins },
        { id: "performance", title: "Güç & Performans", desc: "Antrenman performansınızı artıracak ürünler.", icon: <Flame className="w-6 h-6" />, contentTypeId: CONTENT_TYPE_MAP.performance },
        { id: "equipment", title: "Spor Ekipmanları", desc: "Antrenmanlarınız için gerekli ekipmanlar.", icon: <Activity className="w-6 h-6" />, contentTypeId: CONTENT_TYPE_MAP.equipment },
        { id: "other", title: "Diğer Ürünler", desc: "Diğer tüm ürün çeşitlerimiz.", icon: <LayoutGrid className="w-6 h-6" />, contentTypeId: CONTENT_TYPE_MAP.other }
    ];

    // حفظ موقع التمرير قبل الانتقال للمنتج
    const goToProduct = (slug: string) => {
        sessionStorage.setItem("scrollPosition", window.scrollY.toString());
        navigate(`/product/${slug}`);
    };

    useEffect(() => {
        const fetchSupplements = async () => {
            setLoading(true);
            try {
                const promises = categories.map(async (category) => {
                    const response = await client.getEntries({
                        content_type: category.contentTypeId,
                        limit: 20,
                    });

                    const products: ContentfulProduct[] = response.items.map((entry: any) => {
                        const entryTitle = entry.fields.name || "Ürün Adı Yok";
                        const entryDescription = entry.fields.description || "";
                        const entryPrice = entry.fields.price ? Number(entry.fields.price) : null;
                        const entryPriceCash = entry.fields.priceCash ? Number(entry.fields.priceCash) : null;
                        const entryPriceCard = entry.fields.priceCard ? Number(entry.fields.priceCard) : null;
                        const photoAsset = entry.fields.photos?.[0] || null;
                        const imageUrl = photoAsset?.fields?.file ? `https:${photoAsset.fields.file.url}` : "";
                        return {
                            title: entryTitle,
                            price: entryPrice,
                            priceCash: entryPriceCash,
                            priceCard: entryPriceCard,
                            description: entryDescription,
                            image: imageUrl,
                            categoryTitle: category.title,
                            contentTypeId: category.contentTypeId,
                        };
                    });

                    return { categoryId: category.id, products };
                });

                const results = await Promise.all(promises);
                const grouped: Record<string, ContentfulProduct[]> = {};
                results.forEach(r => grouped[r.categoryId] = r.products);
                setSupplementsByCategory(grouped);

            } catch (err) {
                console.error("Error fetching data from Contentful:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSupplements();
    }, []);

    // إعادة التمرير إلى الموقع السابق بعد انتهاء التحميل بالكامل
    useEffect(() => {
        if (!loading) {
            const scrollPos = sessionStorage.getItem("scrollPosition");
            if (scrollPos) {
                // نستخدم setTimeout لضمان انتهاء الرندر النهائي قبل التمرير
                setTimeout(() => {
                    window.scrollTo({ top: parseInt(scrollPos), behavior: "auto" });
                    sessionStorage.removeItem("scrollPosition");
                }, 50);
            }
        }
    }, [loading]);

    const handleWhatsApp = (title?: string) => {
        const message = `Merhaba, ${title ?? "supplement"} hakkında bilgi almak istiyorum.`;
        window.open(`https://wa.me/905398937955?text=${encodeURIComponent(message)}`, "_blank");
    };

    const scrollToCategory = (id: string) => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
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

                    {/* Special Featured Category */}
                    <div
                        onClick={() => scrollToCategory(categories[0].id)}
                        className="w-full mb-8 group relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 p-8 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className="p-4 rounded-2xl bg-yellow-500/20 text-yellow-600 ring-1 ring-yellow-500/40 group-hover:scale-110 transition-transform duration-500">
                                    {categories[0].icon}
                                </div>
                                <div className="text-left">
                                    <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-yellow-600 transition-colors">{categories[0].title}</h3>
                                    <p className="text-muted-foreground">{categories[0].desc}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-yellow-600 font-bold group-hover:translate-x-2 transition-transform">
                                İncele <ArrowRight className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
                        {categories.slice(1).map(cat => (
                            <div key={cat.id} onClick={() => scrollToCategory(cat.id)} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-background border border-border/50 p-6 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 hover:border-primary/50">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="mb-4 p-4 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary/50 transition-all duration-500 shadow-lg shadow-primary/10">
                                        {cat.icon}
                                    </div>
                                    <h3 className="font-bold text-base md:text-lg mb-1 group-hover:text-primary transition-colors duration-300">{cat.title}</h3>
                                    <p className="text-xs text-muted-foreground font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                        Ürünleri İncele &rarr;
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <p className="text-xl text-muted-foreground">Yükleniyor...</p>
                        </div>
                    ) : (
                        <div className="space-y-20">
                            {categories.map((category, idx) => {
                                const products = supplementsByCategory[category.id] || [];
                                return (
                                    <section
                                        key={idx}
                                        id={category.id}
                                        className={`space-y-8 pt-4 ${idx === 0 ? 'bg-gradient-to-r from-yellow-500/5 to-transparent p-6 rounded-3xl border border-yellow-500/10' : ''}`}
                                    >
                                        <div className={`border-l-4 pl-4 ${idx === 0 ? 'border-yellow-500' : 'border-primary'}`}>
                                            <h2 className={`text-3xl font-bold mb-2 ${idx === 0 ? 'text-yellow-600' : ''}`}>{category.title}</h2>
                                            <p className="text-muted-foreground">{category.desc}</p>
                                        </div>
                                        {products.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                                {products.map((p, i) => {
                                                    const slug = p.title.trim().toLowerCase().replace(/\s+/g, "-");
                                                    return (
                                                        <div key={i} className="group relative bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col cursor-pointer" onClick={() => goToProduct(slug)}>
                                                            <div className="absolute top-4 left-4 z-20">
                                                                <span className="px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-md text-xs font-bold border border-border/50 flex items-center gap-1.5 shadow-sm text-foreground">
                                                                    {category.icon}{category.title}
                                                                </span>
                                                            </div>
                                                            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                                                                <img src={p.image || "/placeholder-image.jpg"} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                            </div>
                                                            <div className="p-5 flex flex-col flex-1 relative">
                                                                <h3 className="font-bold text-base mb-4 pb-2 leading-relaxed group-hover:text-primary transition-colors break-words min-h-[3rem]">{p.title}</h3>
                                                                <div className="mt-auto flex items-center justify-between pt-6 border-t border-border/50">
                                                                    <div className="flex flex-col">
                                                                        {(p.priceCash !== null || p.price !== null || p.priceCard !== null) ? (
                                                                            <div className="flex flex-col gap-1">
                                                                                {(p.priceCash ?? p.price) !== null && <span className="text-lg font-bold text-primary">Nakit Ödeme: {p.priceCash ?? p.price} TL</span>}
                                                                                {p.priceCard !== null && <span className="text-sm font-medium text-muted-foreground">Kredi Kartı: {p.priceCard} TL</span>}
                                                                            </div>
                                                                        ) : (
                                                                            <span className="text-xl font-bold text-primary">Fiyat Sorunuz</span>
                                                                        )}
                                                                    </div>
                                                                    <Button size="icon" className="rounded-full w-10 h-10 bg-primary text-primary-foreground hover:bg-primary/90">
                                                                        <ArrowRight className="w-5 h-5" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        ) : (
                                            <p className="text-muted-foreground italic">Bu kategoride ürün bulunamadı.</p>
                                        )}
                                    </section>
                                )
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

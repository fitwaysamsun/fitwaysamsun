import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, MessageCircle, Check, ShieldCheck, Zap, Package, Star, TrendingUp, CreditCard, Heart } from "lucide-react";

interface SheetRow {
    supplement_title?: string;
    supplement_price?: string;
    supplement_image?: string;
    supplement_desc?: string;
}

const ProductDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<SheetRow | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const SHEET_ID = "1CqoozoZNdem8XmeIytSQbu3coFeJtQXhcEXKj2tjHcs";
        const GID = "0";
        const GVIZ_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${GID}`;

        const fetchSupplements = async () => {
            try {
                const res = await fetch(GVIZ_URL);
                const text = await res.text();

                const jsonText = text.replace(/^[^\(]*\(\s*/, "").replace(/\);\s*$/, "");
                const parsed = JSON.parse(jsonText);

                const cols = parsed.table.cols.map((c: any) => (c && c.label ? c.label : ""));
                const rows = parsed.table.rows.map((r: any) => {
                    const obj: any = {};
                    r.c.forEach((cell: any, idx: number) => {
                        const key = cols[idx] || `col_${idx}`;
                        obj[key] = cell && typeof cell.v !== "undefined" ? String(cell.v) : "";
                    });
                    return obj;
                });

                const found = rows.find((r: any) => {
                    if (!r.supplement_title) return false;
                    const rSlug = r.supplement_title.trim().toLowerCase().replace(/\s+/g, '-');
                    return rSlug === slug;
                });

                if (found) {
                    setProduct(found);
                }
            } catch (err) {
                console.error("Error fetching product:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSupplements();
    }, [slug]);

    const handleWhatsApp = () => {
        if (!product) return;
        const phoneNumber = "905366544655"; // Mimarsinan branch number
        const message = `Merhaba, ${product.supplement_title} ürünü hakkında bilgi almak ve sipariş vermek istiyorum.`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <div className="h-16 w-16 border-4 border-primary/30 rounded-full"></div>
                        <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0"></div>
                    </div>
                    <p className="text-muted-foreground mt-6 text-lg">Ürün detayları yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navigation />
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <div className="max-w-md">
                        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10">
                            <Package className="w-10 h-10 text-destructive" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ürün Bulunamadı</h2>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Aradığınız ürün mevcut değil veya kaldırılmış olabilir.
                        </p>
                        <Button
                            onClick={() => navigate('/products')}
                            size="lg"
                            className="shadow-lg"
                        >
                            <ArrowLeft className="mr-2 h-5 w-5" />
                            Tüm Ürünlere Dön
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const features = [
        {
            icon: <ShieldCheck className="w-6 h-6" />,
            title: "Orijinal Ürün",
            desc: "%100 Orijinal Garantisi"
        },
        {
            icon: <Heart className="w-6 h-6" />,
            title: "Müşteri Memnuniyeti",
            desc: "Yüksek müşteri memnuniyeti ve olumlu geri bildirimler."
        },
        {
            icon: <Star className="w-6 h-6" />,
            title: "Kalite Garantisi",
            desc: "En Yüksek Standartlar"
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Performans Artışı",
            desc: "Kanıtlanmış Sonuçlar"
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />

            {/* Hero Section with Background */}
            <div className="relative pt-24 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
            </div>

            <main className="relative -mt-12 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <Button
                        onClick={() => navigate('/products')}
                        variant="ghost"
                        className="mb-8 hover:bg-accent/50 group"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Tüm Ürünlere Dön
                    </Button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        {/* Image Section */}
                        <div className="relative">
                            <div className="sticky top-28">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000 animate-pulse"></div>
                                    <div className="relative aspect-square rounded-3xl overflow-hidden bg-card border-2 border-border/50 shadow-2xl">
                                        <img
                                            src={product.supplement_image}
                                            alt={product.supplement_title}
                                            className="w-full h-full object-cover object-center transform transition duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="flex flex-col space-y-8">
                            {/* Title & Price */}
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse leading-relaxed pb-2 break-words">
                                    {product.supplement_title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4">
                                    <span className="text-4xl md:text-5xl font-bold text-primary">
                                        {product.supplement_price?.replace("TL", "").trim()} TL
                                    </span>
                                    <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-500 text-sm font-bold flex items-center gap-2 border border-green-500/20">
                                        <Check className="w-4 h-4" /> Stokta Var
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
                                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                    <Package className="w-5 h-5 text-primary" />
                                    Ürün Açıklaması
                                </h3>
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    {product.supplement_desc || "Bu ürün, fitness hedeflerinize ulaşmanız için özel olarak formüle edilmiştir. Yüksek kaliteli içeriği ve kanıtlanmış etkinliği ile performansınızı artırmanıza yardımcı olur."}
                                </p>
                            </div>

                            {/* Features Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {features.map((feature, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative overflow-hidden flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-card to-background border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="relative p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                                            {feature.icon}
                                        </div>
                                        <div className="relative">
                                            <p className="font-bold text-sm mb-0.5">{feature.title}</p>
                                            <p className="text-xs text-muted-foreground">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Section */}
                            <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-2xl p-8 border border-primary/20 space-y-6">
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-bold">WhatsApp ile Sipariş Ver</h3>
                                    <p className="text-muted-foreground">
                                        WhatsApp üzerinden kolayca sipariş verebilir ve ürün hakkında detaylı bilgi alabilirsiniz.
                                    </p>
                                </div>

                                <Button
                                    size="lg"
                                    className="w-full text-lg px-8 py-7 shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 group bg-green-500 hover:bg-green-600 text-white"
                                    onClick={handleWhatsApp}
                                >
                                    <MessageCircle className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                                    WhatsApp ile İletişime Geç
                                </Button>

                                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span>Güvenli ve hızlı iletişim</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetail;

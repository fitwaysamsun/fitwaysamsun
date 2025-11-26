import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Check, ShoppingBag, Pill, Zap } from "lucide-react";

const Products = () => {
    const proteinProducts = [
        {
            name: "Whey Protein",
            price: "1200 TL",
            color: "primary",
            features: ["25g Protein", "5.5g BCAA", "Düşük Şeker", "72 Servis"],
            popular: true
        },
        {
            name: "Isolate Protein",
            price: "1500 TL",
            color: "accent",
            features: ["27g Protein", "0 Şeker", "Hızlı Emilim", "60 Servis"],
            popular: false
        },
        {
            name: "Casein Protein",
            price: "1300 TL",
            color: "primary",
            features: ["24g Protein", "Gece Kullanımı", "Yavaş Sindirim", "50 Servis"],
            popular: false
        },
        {
            name: "Vegan Protein",
            price: "1100 TL",
            color: "accent",
            features: ["20g Protein", "Bezelye & Pirinç", "Glutensiz", "60 Servis"],
            popular: false
        }
    ];

    const creatineProducts = [
        {
            name: "Creatine Monohydrate",
            price: "600 TL",
            color: "primary",
            features: ["%100 Saf", "Mikronize", "Aromasız", "100 Servis"],
            popular: true
        },
        {
            name: "Creatine HCL",
            price: "750 TL",
            color: "accent",
            features: ["Yüksek Emilim", "Su Tutmaz", "Limon Aromalı", "60 Servis"],
            popular: false
        },
        {
            name: "Creatine Blend",
            price: "850 TL",
            color: "primary",
            features: ["3 Farklı Kreatin", "Beta-Alanine", "Güç Artışı", "50 Servis"],
            popular: false
        }
    ];

    const vitaminProducts = [
        {
            name: "Multivitamin",
            price: "400 TL",
            color: "primary",
            features: ["Günlük İhtiyaç", "Bağışıklık Desteği", "Enerji", "90 Tablet"],
            popular: true
        },
        {
            name: "Omega 3",
            price: "450 TL",
            color: "accent",
            features: ["Kalp Sağlığı", "Beyin Fonksiyonu", "Yüksek EPA/DHA", "60 Kapsül"],
            popular: false
        },
        {
            name: "ZMA",
            price: "350 TL",
            color: "primary",
            features: ["Kas İyileşmesi", "Uyku Kalitesi", "Çinko & Magnezyum", "60 Kapsül"],
            popular: false
        }
    ];

    const handleWhatsAppOrder = (productName: string) => {
        const message = `Merhaba, ${productName} ürünü hakkında bilgi almak ve sipariş vermek istiyorum.`;
        window.open(`https://wa.me/905366544655?text=${encodeURIComponent(message)}`, "_blank");
    };

    const renderProductCards = (products: typeof proteinProducts) => (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
                <Card
                    key={index}
                    className={`relative bg-card/50 backdrop-blur-sm border-border hover:border-${product.color}/50 transition-all duration-300 hover:scale-105 ${product.popular ? 'ring-2 ring-primary/50' : ''
                        } flex flex-col`}
                >
                    {product.popular && (
                        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                            En Çok Satan
                        </Badge>
                    )}

                    <CardHeader className="text-center pb-4">
                        <CardTitle className={`text-2xl font-bold text-${product.color}`}>
                            {product.name}
                        </CardTitle>
                        <div className="text-3xl font-bold text-foreground">
                            {product.price}
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4 flex-grow flex flex-col">
                        <ul className="space-y-3 flex-grow">
                            {product.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-center text-sm">
                                    <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <Button
                            className={`w-full bg-${product.color} hover:bg-${product.color}/90 text-${product.color}-foreground transition-all duration-300 mt-auto`}
                            onClick={() => handleWhatsAppOrder(product.name)}
                        >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Sipariş Ver
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Mağaza & Takviyeler
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Antrenman performansınızı artıracak ve hedeflerinize daha hızlı ulaşmanızı sağlayacak en kaliteli besin takviyeleri.
                        </p>
                    </div>

                    <Tabs defaultValue="protein" className="w-full">
                        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
                            <TabsTrigger value="protein" className="flex items-center gap-2">
                                <ShoppingBag className="h-4 w-4" />
                                Protein Tozları
                            </TabsTrigger>
                            <TabsTrigger value="creatine" className="flex items-center gap-2">
                                <Zap className="h-4 w-4" />
                                Kreatin
                            </TabsTrigger>
                            <TabsTrigger value="vitamins" className="flex items-center gap-2">
                                <Pill className="h-4 w-4" />
                                Vitaminler
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="protein">
                            {renderProductCards(proteinProducts)}
                        </TabsContent>

                        <TabsContent value="creatine">
                            {renderProductCards(creatineProducts)}
                        </TabsContent>

                        <TabsContent value="vitamins">
                            {renderProductCards(vitaminProducts)}
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Products;

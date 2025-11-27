import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Check, Users, User, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Membership = () => {
  const navigate = useNavigate();
  const womenPlans = [
    {
      name: "Aylık",
      price: "1300 TL",
      color: "primary",
      features: ["Tüm ekipman erişimi", "Grup dersleri", "Kadın soyunma odası"],
      popular: false
    },
    {
      name: "3 Aylık",
      price: "3300 TL",
      color: "accent",
      features: ["Tüm ekipman erişimi", "Grup dersleri", "Kişisel antrenör danışmanlığı", "Kadın soyunma odası"],
      popular: true
    },
    {
      name: "6 Aylık",
      price: "6000 TL",
      color: "primary",
      features: ["Tüm ekipman erişimi", "Grup dersleri", "Kişisel antrenör seansları", "Beslenme danışmanlığı", "Kadın soyunma odası"],
      popular: false
    },
    {
      name: "Yıllık",
      price: "9000 TL",
      color: "accent",
      features: ["Tüm ekipman erişimi", "Sınırsız grup dersleri", "Kişisel antrenör seansları", "Beslenme danışmanlığı", "VIP kadın soyunma odası", "Ücretsiz spor içeceği"],
      popular: false
    }
  ];

  const menPlans = [
    {
      name: "Aylık",
      price: "1700 TL",
      color: "primary",
      features: ["Tüm ekipman erişimi", "Grup dersleri", "Erkek soyunma odası"],
      popular: false
    },
    {
      name: "3 Aylık",
      price: "3800 TL",
      color: "accent",
      features: ["Tüm ekipman erişimi", "Grup dersleri", "Kişisel antrenör danışmanlığı", "Erkek soyunma odası"],
      popular: true
    },
    {
      name: "6 Aylık",
      price: "7000 TL",
      color: "primary",
      features: ["Tüm ekipman erişimi", "Grup dersleri", "Kişisel antrenör seansları", "Beslenme danışmanlığı", "Erkek soyunma odası"],
      popular: false
    },
    {
      name: "Yıllık",
      price: "12000 TL",
      color: "accent",
      features: ["Tüm ekipman erişimi", "Sınırsız grup dersleri", "Kişisel antrenör seansları", "Beslenme danışmanlığı", "VIP erkek soyunma odası", "Ücretsiz spor içeceği"],
      popular: false
    }
  ];

  const handleWhatsAppRegister = (planName: string, gender: string) => {
    const message = `${gender} ${planName} üyelik paketi hakkında bilgi almak istiyorum.`;
    window.open(`https://wa.me/905366544655?text=${encodeURIComponent(message)}`, "_blank");
  };

  const renderPlanCards = (plans: typeof womenPlans, gender: string) => (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {plans.map((plan, index) => (
        <Card
          key={index}
          className={`relative bg-card/50 backdrop-blur-sm border-border hover:border-${plan.color}/50 transition-all duration-300 hover:scale-105 ${plan.popular ? 'ring-2 ring-primary/50' : ''
            } flex flex-col`}
        >
          {plan.popular && (
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
              En Popüler
            </Badge>
          )}

          <CardHeader className="text-center pb-4">
            <CardTitle className={`text-2xl font-bold text-${plan.color}`}>
              {plan.name}
            </CardTitle>
            <div className="text-3xl font-bold text-foreground">
              {plan.price}
              <span className="text-sm font-normal text-muted-foreground">/dönem</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 flex-grow flex flex-col">
            <ul className="space-y-3 flex-grow">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className={`w-full bg-${plan.color} hover:bg-${plan.color}/90 text-${plan.color}-foreground transition-all duration-300 mt-auto`}
              onClick={() => handleWhatsAppRegister(plan.name, gender)}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp ile Kayıt Ol
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <section id="membership" className="py-20 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Üyelik Paketleri
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hedeflerinize uygun üyelik paketimizi seçin ve fitness yolculuğunuza bugün başlayın
          </p>
        </div>

        <Tabs defaultValue="women" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="women" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Kadın Üyelikleri
            </TabsTrigger>
            <TabsTrigger value="men" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Erkek Üyelikleri
            </TabsTrigger>
          </TabsList>

          <TabsContent value="women">
            {renderPlanCards(womenPlans, "Kadın")}
          </TabsContent>

          <TabsContent value="men">
            {renderPlanCards(menPlans, "Erkek")}
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Daha fazla bilgi almak veya özel paket teklifleri için bize ulaşın
          </p>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => window.open("https://wa.me/905366544655", "_blank")}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            WhatsApp ile İletişime Geç
          </Button>

          <div className="mt-6">
            <Button
              variant="ghost"
              className="text-foreground hover:text-primary hover:bg-transparent underline decoration-primary underline-offset-4"
              onClick={() => navigate("/products")}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Mağaza ve Takviyeleri İncele
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Membership;
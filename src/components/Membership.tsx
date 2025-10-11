import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Check, Users, User } from "lucide-react";

const SHEETDB_URL = "https://sheetdb.io/api/v1/sxnqlqdlcro45";

interface Plan {
  gender: string; // "Kadın" أو "Erkek"
  plan_name: string; // ← بدّلناها من name إلى plan_name
  price: string;
  color: string; // primary / accent
  features: string; // نص مفصول بفواصل
  popular: string; // "true" أو "false"
}

const Membership = () => {
  const [plans, setPlans] = useState<Plan[]>([]);

  // جلب البيانات من Google Sheet
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(SHEETDB_URL);
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error("Membership data fetch error:", error);
      }
    };
    fetchPlans();
  }, []);

  const handleWhatsAppRegister = (planName: string, gender: string) => {
    const message = `${gender} ${planName} üyelik paketi hakkında bilgi almak istiyorum.`;
    window.open(`https://wa.me/905366544655?text=${encodeURIComponent(message)}`, "_blank");
  };

  const renderPlanCards = (gender: string) => {
    const filteredPlans = plans.filter((p) => p.gender === gender);
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPlans.map((plan, index) => {
          const featureList = plan.features.split(",").map((f) => f.trim());
          const isPopular = plan.popular.toLowerCase() === "true";
          return (
            <Card
              key={index}
              className={`relative bg-card/50 backdrop-blur-sm border-border hover:border-${plan.color}/50 transition-all duration-300 hover:scale-105 ${
                isPopular ? "ring-2 ring-primary/50" : ""
              } flex flex-col`}
            >
              {isPopular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  En Popüler
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className={`text-2xl font-bold text-${plan.color}`}>
                  {plan.plan_name}
                </CardTitle>
                <div className="text-3xl font-bold text-foreground">
                  {plan.price}
                  <span className="text-sm font-normal text-muted-foreground">/dönem</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 flex-grow flex flex-col">
                <ul className="space-y-3 flex-grow">
                  {featureList.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full bg-${plan.color} hover:bg-${plan.color}/90 text-${plan.color}-foreground transition-all duration-300 mt-auto`}
                  onClick={() => handleWhatsAppRegister(plan.plan_name, gender)}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp ile Kayıt Ol
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <section id="membership" className="py-20 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        {/* العنوان والوصف العام */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Üyelik Paketleri
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hedeflerinize uygun üyelik paketimizi seçin ve fitness yolculuğunuza bugün başlayın
          </p>
        </div>

        <Tabs defaultValue="Kadın" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="Kadın" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Kadın Üyelikleri
            </TabsTrigger>
            <TabsTrigger value="Erkek" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Erkek Üyelikleri
            </TabsTrigger>
          </TabsList>

          <TabsContent value="Kadın">{renderPlanCards("Kadın")}</TabsContent>
          <TabsContent value="Erkek">{renderPlanCards("Erkek")}</TabsContent>
        </Tabs>

        {/* القسم السفلي */}
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
        </div>
      </div>
    </section>
  );
};

export default Membership;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Check, Users, User } from "lucide-react";

interface Plan {
  gender: string;
  plan_name: string;
  price: string;
  color: string;
  features: string;
  popular: string;
}

const Membership = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const SHEET_ID = "1CqoozoZNdem8XmeIytSQbu3coFeJtQXhcEXKj2tjHcs";
    const GID = "123456789";
    const GVIZ_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${GID}`;

    const fetchPlans = async () => {
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
        const filtered = rows.filter((r: any) => r.plan_name && r.plan_name.trim() !== "");
        setPlans(filtered);
      } catch (err) {
        console.error("Membership data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleWhatsAppRegister = (planName: string, gender: string) => {
    const message = `${gender} ${planName} üyelik paketi hakkında bilgi almak istiyorum.`;
    window.open(
      `https://wa.me/905366544655?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const renderPlanCards = (gender: string) => {
    const filteredPlans = plans.filter((p) => p.gender === gender);
    if (loading) {
      return <p className="text-center text-muted-foreground py-10">Yükleniyor...</p>;
    }
    if (filteredPlans.length === 0) {
      return <p className="text-center text-muted-foreground py-10">Plan bulunamadı.</p>;
    }

    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        {filteredPlans.map((plan, index) => {
          const featureList = plan.features.split(",").map((f) => f.trim());
          const isPopular = plan.popular.toLowerCase() === "true";
          const color = plan.color || "primary";

          return (
            <Card
              key={index}
              className={`relative bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-lg hover:border-${color}/50 transition-all duration-300 hover:scale-[1.02] flex flex-col`}
            >
              {isPopular && (
                <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground shadow-md">
                  En Popüler
                </Badge>
              )}
              <CardHeader className="text-center pb-4 pt-6">
                <CardTitle className={`text-2xl font-bold text-${color}`}>
                  {plan.plan_name}
                </CardTitle>
                <div className="text-3xl font-extrabold text-foreground mt-2">
                  {plan.price} TL
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    /dönem
                  </span>
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
                  className={`w-full bg-${color} hover:bg-${color}/90 text-${color}-foreground transition-all duration-300 mt-auto`}
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
        <div className="text-center mb-24 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Üyelik Paketleri
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hedeflerinize uygun üyelik paketimizi seçin ve fitness yolculuğunuza bugün başlayın
          </p>
        </div>

        {/* ======== Mobile and Smaller Tablets (Vertical Layout) ======== */}
        <div className="block md:hidden">
          <Tabs defaultValue="Kadın" orientation="vertical" className="w-full flex flex-col items-center">
            <TabsList className="flex flex-col gap-4 w-full max-w-md mb-14">
              <TabsTrigger
                value="Kadın"
                className="w-full px-6 py-4 rounded-xl text-lg font-medium flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition"
              >
                <Users className="h-5 w-5" />
                Kadın Üyelikleri
              </TabsTrigger>
              <TabsTrigger
                value="Erkek_Mimarsinan"
                className="w-full px-6 py-4 rounded-xl text-lg font-medium flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition"
              >
                <User className="h-5 w-5" />
                Erkek Mimarsinan Şubesi Üyelikleri
              </TabsTrigger>
              <TabsTrigger
                value="Erkek_Yenimahalle"
                className="w-full px-6 py-4 rounded-xl text-lg font-medium flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition"
              >
                <User className="h-5 w-5" />
                Erkek Yenimahalle Şubesi Üyelikleri
              </TabsTrigger>
            </TabsList>

            <div className="w-full mt-10">
              <TabsContent value="Kadın">{renderPlanCards("Kadın")}</TabsContent>
              <TabsContent value="Erkek_Mimarsinan">
                {renderPlanCards("Erkek Mimarsinan")}
              </TabsContent>
              <TabsContent value="Erkek_Yenimahalle">
                {renderPlanCards("Erkek Yenimahalle")}
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* ======== Desktop and Larger Tablets (Horizontal Layout) ======== */}
        <div className="hidden md:block">
          <Tabs defaultValue="Kadın" className="w-full">
            <TabsList className="grid w-full max-w-5xl mx-auto grid-cols-3 mb-12 gap-3">
              <TabsTrigger value="Kadın" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Kadın Üyelikleri
              </TabsTrigger>
              <TabsTrigger value="Erkek_Mimarsinan" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Erkek Mimarsinan Şubesi Üyelikleri
              </TabsTrigger>
              <TabsTrigger value="Erkek_Yenimahalle" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Erkek Yenimahalle Şubesi Üyelikleri
              </TabsTrigger>
            </TabsList>

            <TabsContent value="Kadın">{renderPlanCards("Kadın")}</TabsContent>
            <TabsContent value="Erkek_Mimarsinan">
              {renderPlanCards("Erkek Mimarsinan")}
            </TabsContent>
            <TabsContent value="Erkek_Yenimahalle">
              {renderPlanCards("Erkek Yenimahalle")}
            </TabsContent>
          </Tabs>
        </div>

        <div className="text-center mt-24">
          <p className="text-muted-foreground mb-5 text-base">
            Daha fazla bilgi almak veya özel paket teklifleri için bize ulaşın
          </p>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl px-6 py-3"
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
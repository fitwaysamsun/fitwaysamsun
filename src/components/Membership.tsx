import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Check, Users, User, Clock } from "lucide-react";

interface Plan {
  gender: string;
  plan_name: string;
  price: string;
  color?: string;
  features: string;
  popular: string;
}

const Membership = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<string>("");

  // 🕒 Countdown Timer
  useEffect(() => {
    const START_DATE = new Date("2025-11-04T00:00:00Z");

    const getCurrentCycleEnd = () => {
      const now = new Date();
      const diff = now.getTime() - START_DATE.getTime();
      const weekMs = 7 * 24 * 60 * 60 * 1000;
      const weeksPassed = Math.floor(diff / weekMs);
      const nextEnd = new Date(START_DATE.getTime() + (weeksPassed + 1) * weekMs);
      return nextEnd;
    };

    let endDate = getCurrentCycleEnd();

    const timer = setInterval(() => {
      const now = new Date();
      const distance = endDate.getTime() - now.getTime();

      if (distance <= 0) {
        endDate = getCurrentCycleEnd();
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days} gün ${hours} saat ${minutes} dk ${seconds} sn`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 📊 Fetch data from Google Sheet
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

  // 💬 WhatsApp
  const handleWhatsAppRegister = (planName: string, gender: string) => {
    const message = `${gender} ${planName} üyelik paketi hakkında bilgi almak istiyorum.`;
    window.open(`https://wa.me/905366544655?text=${encodeURIComponent(message)}`, "_blank");
  };

  // 💰 Original Prices
  const originalPrices: Record<string, Record<string, number>> = {
    "Erkek Mimarsinan": { "Aylık": 2000, "3 Aylık": 4500, "6 Aylık": 7500, "Yıllık": 13000 },
    "Erkek Yenimahalle": { "Aylık": 2500, "3 Aylık": 5500, "6 Aylık": 8500, "Yıllık": 14000 },
    "Kadın": { "Aylık": 1800, "3 Aylık": 4000, "6 Aylık": 6800, "Yıllık": 11000 },
  };

  const findOriginalPrice = (gender: string, planName: string) => {
    return originalPrices[gender]?.[planName] || null;
  };

  // 🧱 Render Plans
  const renderPlanCards = (gender: string) => {
    const filteredPlans = plans.filter((p) => p.gender === gender);
    if (loading) return <p className="text-center text-muted-foreground py-10">Yükleniyor...</p>;
    if (filteredPlans.length === 0)
      return <p className="text-center text-muted-foreground py-10">Plan bulunamadı.</p>;

    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        {filteredPlans.map((plan, index) => {
          const featureList = plan.features.split(",").map((f) => f.trim());
          const isPopular = plan.plan_name.trim() === "6 Aylık";

          // 🌈 ألوان الأزرار
          let buttonColor = index % 2 === 0 ? "#ff7f2a" : "#00bfff";

          const originalPrice = findOriginalPrice(gender, plan.plan_name);

          return (
            <Card
              key={index}
              className={`relative shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex flex-col ${isPopular ? "border-4 border-primary" : "border border-border/50"
                }`}
              style={{ backgroundColor: "var(--background)" }} // إعادة خلفية الكروت للون الموقع الأصلي
            >
              {isPopular && (
                <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground shadow-md">
                  En Çok Tercih Edilen
                </Badge>
              )}
              <CardHeader className="text-center pb-4 pt-6">
                <CardTitle className={`text-2xl font-bold`} style={{ color: buttonColor }}>
                  {plan.plan_name}
                </CardTitle>
                <div className="text-3xl font-extrabold text-foreground mt-2">
                  {originalPrice && (
                    <span className="text-muted-foreground text-lg line-through mr-2">
                      {originalPrice} TL
                    </span>
                  )}
                  {plan.price} TL
                  <span className="text-sm font-normal text-muted-foreground ml-1">/dönem</span>
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
                {gender === "Kadın" ? (
                  <div className="flex flex-col gap-2 mt-auto w-full">
                    <Button
                      className="w-full font-semibold text-white hover:opacity-90 transition"
                      style={{ backgroundColor: buttonColor }}
                      onClick={() => {
                        const message = `${gender} ${plan.plan_name} üyelik paketi hakkında bilgi almak istiyorum.`;
                        window.open(`https://wa.me/905366544655?text=${encodeURIComponent(message)}`, "_blank");
                      }}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Mimarsinan
                    </Button>
                    <Button
                      className="w-full font-semibold text-white hover:opacity-90 transition"
                      style={{ backgroundColor: buttonColor }}
                      onClick={() => {
                        const message = `${gender} ${plan.plan_name} üyelik paketi hakkında bilgi almak istiyorum.`;
                        window.open(`https://wa.me/905365123655?text=${encodeURIComponent(message)}`, "_blank");
                      }}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Yenimahalle
                    </Button>
                  </div>
                ) : (
                  <div className="relative mt-auto w-full">
                    {/* Invisible buttons to force container height to match Kadın cards */}
                    <div className="flex flex-col gap-2 invisible pointer-events-none" aria-hidden="true">
                      <Button tabIndex={-1} className="w-full">Placeholder</Button>
                      <Button tabIndex={-1} className="w-full">Placeholder</Button>
                    </div>

                    {/* Centered visible button */}
                    <div className="absolute inset-0 flex flex-col justify-center">
                      <Button
                        className="w-full font-semibold text-white hover:opacity-90 transition"
                        style={{ backgroundColor: buttonColor }}
                        onClick={() => {
                          const phoneNumber = gender === "Erkek Yenimahalle" ? "905365123655" : "905366544655";
                          const message = `${gender} ${plan.plan_name} üyelik paketi hakkında bilgi almak istiyorum.`;
                          window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
                        }}
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        WhatsApp ile Kayıt Ol
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card >
          );
        })}
      </div >
    );
  };

  return (
    <section id="membership" className="py-20 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        {/* ====== Countdown Timer ====== */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
          <Clock className="h-10 w-10 text-primary" />
          <span className="text-3xl md:text-4xl font-extrabold text-primary drop-shadow-lg text-center">
            Haftalık İndirim için kalan süre: {timeLeft}
          </span>
        </div>

        <div className="text-center mb-24 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight pb-2">
            Üyelik Paketleri
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hedeflerinize uygun üyelik paketimizi seçin ve fitness yolculuğunuza bugün başlayın
          </p>
        </div>

        {/* ======== Mobile ======== */}
        <div className="block md:hidden">
          <Tabs defaultValue="Kadın" orientation="vertical" className="w-full flex flex-col items-center">
            <TabsList className="flex flex-col gap-4 w-full max-w-md mb-14">
              <TabsTrigger value="Kadın" className="w-full px-6 py-4 rounded-xl text-lg font-medium flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition">
                <Users className="h-5 w-5" /> Kadın Üyelikleri
              </TabsTrigger>
              <TabsTrigger value="Erkek_Mimarsinan" className="w-full px-6 py-4 rounded-xl text-lg font-medium flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition">
                <User className="h-5 w-5" /> Erkek Mimarsinan Şubesi Üyelikleri
              </TabsTrigger>
              <TabsTrigger value="Erkek_Yenimahalle" className="w-full px-6 py-4 rounded-xl text-lg font-medium flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition">
                <User className="h-5 w-5" /> Erkek Yenimahalle Şubesi Üyelikleri
              </TabsTrigger>
            </TabsList>

            <div className="w-full mt-10">
              <TabsContent value="Kadın">{renderPlanCards("Kadın")}</TabsContent>
              <TabsContent value="Erkek_Mimarsinan">{renderPlanCards("Erkek Mimarsinan")}</TabsContent>
              <TabsContent value="Erkek_Yenimahalle">{renderPlanCards("Erkek Yenimahalle")}</TabsContent>
            </div>
          </Tabs>
        </div>

        {/* ======== Desktop ======== */}
        <div className="hidden md:block">
          <Tabs defaultValue="Kadın" className="w-full">
            <TabsList className="grid w-full max-w-5xl mx-auto grid-cols-3 mb-12 gap-3">
              <TabsTrigger value="Kadın" className="flex items-center gap-2">
                <Users className="h-4 w-4" /> Kadın Üyelikleri
              </TabsTrigger>
              <TabsTrigger value="Erkek_Mimarsinan" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Erkek Mimarsinan Şubesi Üyelikleri
              </TabsTrigger>
              <TabsTrigger value="Erkek_Yenimahalle" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Erkek Yenimahalle Şubesi Üyelikleri
              </TabsTrigger>
            </TabsList>

            <TabsContent value="Kadın">{renderPlanCards("Kadın")}</TabsContent>
            <TabsContent value="Erkek_Mimarsinan">{renderPlanCards("Erkek Mimarsinan")}</TabsContent>
            <TabsContent value="Erkek_Yenimahalle">{renderPlanCards("Erkek Yenimahalle")}</TabsContent>
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
            <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp ile İletişime Geç
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Membership;

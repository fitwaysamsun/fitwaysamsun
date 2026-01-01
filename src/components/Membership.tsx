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

  useEffect(() => {
    const START_DATE = new Date("2025-11-04T00:00:00Z");
    const getCurrentCycleEnd = () => {
      const now = new Date();
      const diff = now.getTime() - START_DATE.getTime();
      const weekMs = 7 * 24 * 60 * 60 * 1000;
      const weeksPassed = Math.floor(diff / weekMs);
      return new Date(START_DATE.getTime() + (weeksPassed + 1) * weekMs);
    };

    let endDate = getCurrentCycleEnd();
    const timer = setInterval(() => {
      const now = new Date();
      const distance = endDate.getTime() - now.getTime();
      if (distance <= 0) endDate = getCurrentCycleEnd();

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${d} gün ${h} saat ${m} dk ${s} sn`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const SHEET_ID = "1CqoozoZNdem8XmeIytSQbu3coFeJtQXhcEXKj2tjHcs";
    const GID = "123456789";
    const GVIZ_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${GID}`;

    fetch(GVIZ_URL)
      .then((r) => r.text())
      .then((text) => {
        const json = JSON.parse(text.replace(/^[^\(]*\(\s*/, "").replace(/\);\s*$/, ""));
        const cols = json.table.cols.map((c: any) => c.label || "");
        const rows = json.table.rows.map((r: any) => {
          const obj: any = {};
          r.c.forEach((cell: any, i: number) => (obj[cols[i]] = cell?.v ? String(cell.v) : ""));
          return obj;
        });
        setPlans(rows.filter((r: any) => r.plan_name));
        setLoading(false);
      });
  }, []);

  const renderPlanCards = (gender: string) => {
    const filtered = plans.filter((p) => p.gender === gender);
    if (loading) return <p className="text-center py-10">Yükleniyor...</p>;
    if (!filtered.length) return <p className="text-center py-10">Plan bulunamadı.</p>;

    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        {filtered.map((plan, i) => {
          const featureList = plan.features.split(",").map((f) => f.trim());
          const isPopular = plan.plan_name === "6 Aylık";
          const buttonColor = i % 2 === 0 ? "#ff7f2a" : "#00bfff";

          return (
            <Card key={i} className={`relative ${isPopular ? "border-4 border-primary" : ""}`}>
              {isPopular && (
                <Badge className="absolute -top-4 left-1/2 -translate-x-1/2">
                  En Çok Tercih Edilen
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle style={{ color: buttonColor }}>{plan.plan_name}</CardTitle>
                <div className="text-3xl font-extrabold mt-2">
                  {plan.price} TL
                  <span className="text-sm ml-1 text-muted-foreground">/dönem</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {featureList.map((f, x) => (
                    <li key={x} className="flex items-center text-sm">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <section id="membership" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 text-3xl font-bold text-primary">
          Haftalık İndirim için kalan süre: {timeLeft}
        </div>

        <Tabs defaultValue="Kadın">
          <TabsList className="grid grid-cols-3 mb-12">
            <TabsTrigger value="Kadın">Kadın</TabsTrigger>
            <TabsTrigger value="Erkek Mimarsinan">Erkek Mimarsinan</TabsTrigger>
            <TabsTrigger value="Erkek Yenimahalle">Erkek Yenimahalle</TabsTrigger>
          </TabsList>

          <TabsContent value="Kadın">{renderPlanCards("Kadın")}</TabsContent>
          <TabsContent value="Erkek Mimarsinan">{renderPlanCards("Erkek Mimarsinan")}</TabsContent>
          <TabsContent value="Erkek Yenimahalle">{renderPlanCards("Erkek Yenimahalle")}</TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Membership;

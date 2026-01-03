import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Users, User, Clock } from "lucide-react";

interface Plan {
  gender: string;
  plan_name: string;
  price: string;
}

const Membership = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const START_DATE = new Date("2025-11-04T00:00:00Z");
    const getNext = () => {
      const now = new Date();
      const weeks = Math.floor((now.getTime() - START_DATE.getTime()) / (7 * 86400000));
      return new Date(START_DATE.getTime() + (weeks + 1) * 7 * 86400000);
    };

    let end = getNext();
    const timer = setInterval(() => {
      const diff = end.getTime() - Date.now();
      if (diff <= 0) end = getNext();

      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${d} gün ${h} saat ${m} dk ${s} sn`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const URL =
      "https://docs.google.com/spreadsheets/d/1CqoozoZNdem8XmeIytSQbu3coFeJtQXhcEXKj2tjHcs/gviz/tq?tqx=out:json&gid=123456789";

    fetch(URL)
      .then((r) => r.text())
      .then((t) => {
        const j = JSON.parse(t.replace(/^[^\(]*\(\s*/, "").replace(/\);\s*$/, ""));
        const cols = j.table.cols.map((c: any) => c.label || "");
        const rows = j.table.rows.map((r: any) => {
          const o: any = {};
          r.c.forEach((c: any, i: number) => (o[cols[i]] = c?.v ? String(c.v) : ""));
          return o;
        });
        setPlans(rows.filter((r: any) => r.plan_name));
        setLoading(false);
      });
  }, []);

  const render = (gender: string) => {
    const list = plans.filter((p) => p.gender === gender);
    if (loading) return <p className="text-center py-10">Yükleniyor...</p>;
    if (!list.length) return <p className="text-center py-10">Plan bulunamadı.</p>;

    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {list.map((plan, i) => {
          const popular = plan.plan_name === "6 Aylık";
          const color = i % 2 === 0 ? "#ff7f2a" : "#00bfff";

          return (
            <Card key={i} className={`rounded-2xl shadow-lg hover:scale-[1.03] transition-all ${popular ? "border-4 border-primary" : "border"}`}>
              {popular && <Badge className="absolute -top-4 left-1/2 -translate-x-1/2">En Çok Tercih Edilen</Badge>}

              <CardHeader className="text-center space-y-3">
                <CardTitle className="text-2xl font-bold" style={{ color }}>{plan.plan_name}</CardTitle>
                <div className="text-4xl font-extrabold">{plan.price} TL<div className="text-sm text-muted-foreground">/ dönem</div></div>
              </CardHeader>

              <CardContent>
                {gender === "Kadın" ? (
                  <div className="flex flex-col gap-3">
                    <Button className="w-full py-6 text-white rounded-xl" style={{ backgroundColor: "#00bfff" }}
                      onClick={() => window.open(`https://wa.me/905366544655?text=${encodeURIComponent(`${gender} ${plan.plan_name} üyelik paketi hakkında bilgi almak istiyorum.`)}`, "_blank")}>
                      <MessageCircle className="mr-2 h-4 w-4" /> Mimarsinan ♀
                    </Button>

                    <Button className="w-full py-6 text-white rounded-xl" style={{ backgroundColor: "#ff7f2a" }}
                      onClick={() => window.open(`https://wa.me/905365123655?text=${encodeURIComponent(`${gender} ${plan.plan_name} üyelik paketi hakkında bilgi almak istiyorum.`)}`, "_blank")}>
                      <MessageCircle className="mr-2 h-4 w-4" /> Yenimahalle ♀
                    </Button>
                  </div>
                ) : (
                  <Button className="w-full py-6 text-white rounded-xl" style={{ backgroundColor: color }}
                    onClick={() => window.open(`https://wa.me/${gender === "Erkek Yenimahalle" ? "905365123655" : "905366544655"}?text=${encodeURIComponent(`${gender} ${plan.plan_name} üyelik paketi hakkında bilgi almak istiyorum.`)}`, "_blank")}>
                    <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp ile Kayıt Ol ♂
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <section id="membership" className="py-24 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center gap-3 mb-14 text-primary text-3xl font-bold">
          <Clock /> Haftalık İndirim için kalan süre: {timeLeft}
        </div>

        <Tabs defaultValue="Erkek Mimarsinan">
          <TabsList className="grid grid-cols-3 mb-14 gap-4">
            <TabsTrigger value="Erkek Mimarsinan" className="border-2 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.8)] animate-pulse hover:shadow-[0_0_30px_rgba(56,189,248,1)] transition-all">
              ♂ Mimarsinan
            </TabsTrigger>

            <TabsTrigger value="Erkek Yenimahalle" className="border-2 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.8)] animate-pulse hover:shadow-[0_0_30px_rgba(56,189,248,1)] transition-all">
              ♂ Yenimahalle
            </TabsTrigger>

            <TabsTrigger value="Kadın" className="border-2 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.8)] animate-pulse hover:shadow-[0_0_30px_rgba(56,189,248,1)] transition-all">
              ♀ Kadın
            </TabsTrigger>
          </TabsList>

          <TabsContent value="Erkek Mimarsinan">{render("Erkek Mimarsinan")}</TabsContent>
          <TabsContent value="Erkek Yenimahalle">{render("Erkek Yenimahalle")}</TabsContent>
          <TabsContent value="Kadın">{render("Kadın")}</TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Membership;

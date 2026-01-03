import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Clock } from "lucide-react";

interface Plan {
  gender: string;
  plan_name: string;
  price: string;
}

export default function Membership() {
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
          const color = i % 2 === 0 ? "#ff7f2a" : "#00bfff";

          return (
            <Card key={i} className="rounded-2xl shadow-lg hover:scale-[1.03] transition-all">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold" style={{ color }}>{plan.plan_name}</CardTitle>
                <div className="text-4xl font-extrabold">{plan.price} TL</div>
              </CardHeader>

              <CardContent>
                {gender === "Kadın" ? (
                  <div className="flex flex-col gap-3">
                    <Button className="w-full py-6 text-white rounded-xl bg-sky-500"
                      onClick={() => window.open(`https://wa.me/905366544655?text=${encodeURIComponent(`${gender} ${plan.plan_name} üyelik paketi hakkında bilgi almak istiyorum.`)}`, "_blank")}>
                      Mimarsinan Şubesi
                    </Button>
                    <Button className="w-full py-6 text-white rounded-xl bg-orange-500"
                      onClick={() => window.open(`https://wa.me/905365123655?text=${encodeURIComponent(`${gender} ${plan.plan_name} üyelik paketi hakkında bilgi almak istiyorum.`)}`, "_blank")}>
                      Yenimahalle Şubesi
                    </Button>
                  </div>
                ) : (
                  <Button className="w-full py-6 text-white rounded-xl" style={{ backgroundColor: color }}
                    onClick={() => window.open(`https://wa.me/${gender === "Erkek Yenimahalle" ? "905365123655" : "905366544655"}?text=${encodeURIComponent(`${gender} ${plan.plan_name} üyelik paketi hakkında bilgi almak istiyorum.`)}`, "_blank")}>
                    WhatsApp ile Kayıt Ol
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
      <style>{`
        .tab-glow {
          border: 2px solid #00bfff !important;
          box-shadow: 0 0 15px rgba(0,191,255,0.8);
          animation: pulse 1.5s infinite alternate;
        }
        @keyframes pulse {
          from { box-shadow: 0 0 10px rgba(0,191,255,0.6); }
          to { box-shadow: 0 0 30px rgba(0,191,255,1); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center gap-3 mb-14 text-primary text-3xl font-bold">
          <Clock /> Haftalık İndirim için kalan süre: {timeLeft}
        </div>

        <Tabs defaultValue="Erkek Mimarsinan">
          <TabsList className="grid grid-cols-3 gap-4 mb-14 text-lg font-bold">
            <TabsTrigger className="tab-glow flex flex-col py-4" value="Erkek Mimarsinan">
              <span className="text-3xl">♂</span>
              MIMARSINAN
            </TabsTrigger>

            <TabsTrigger className="tab-glow flex flex-col py-4" value="Erkek Yenimahalle">
              <span className="text-3xl">♂</span>
              YENİMAHALLE
            </TabsTrigger>

            <TabsTrigger className="tab-glow flex flex-col py-4" value="Kadın">
              <span className="text-3xl">♀</span>
              KADIN
            </TabsTrigger>
          </TabsList>

          <TabsContent value="Erkek Mimarsinan">{render("Erkek Mimarsinan")}</TabsContent>
          <TabsContent value="Erkek Yenimahalle">{render("Erkek Yenimahalle")}</TabsContent>
          <TabsContent value="Kadın">{render("Kadın")}</TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

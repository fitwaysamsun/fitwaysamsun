import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);

  // 🔗 SheetDB URL
  const SHEETDB_URL = "https://sheetdb.io/api/v1/v413b198kjszj";

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await fetch(SHEETDB_URL);
        const data = await res.json();

        const formatted = data.map((item) => ({
          name: item.name,
          specialty: item.specialty,
          image: item.image,
          experience: item.experience,
          focus: [item.focus_1, item.focus_2, item.focus_3].filter(Boolean),
        }));

        setTrainers(formatted);
      } catch (error) {
        console.error("Error fetching trainers from SheetDB:", error);
      }
    };

    fetchTrainers();
  }, []);

  return (
    <section id="trainers" className="py-20 px-6 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Antrenörlerimiz
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uzman ve deneyimli antrenör kadromuzla hedeflerinize güvenle ulaşın
          </p>
        </div>

        {/* === Yenimahalle Şubemiz === */}
        <h3 className="text-2xl font-bold text-primary mb-6 text-center">
          🟢 Yenimahalle Şubemiz
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trainers.slice(0, 4).map((trainer, index) => (
            <Card
              key={index}
              className="group bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <Badge className="absolute top-4 right-4 bg-primary/90 text-primary-foreground">
                  {trainer.experience}
                </Badge>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {trainer.name}
                </h3>

                <p className="text-accent font-semibold mb-4">
                  {trainer.specialty}
                </p>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">Uzmanlık Alanları:</p>
                  <div className="flex flex-wrap gap-1">
                    {trainer.focus.map((focus, focusIndex) => (
                      <Badge
                        key={focusIndex}
                        variant="outline"
                        className="text-xs border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-300"
                      >
                        {focus}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* === Mimarsinan Şubemiz === */}
        <h3 className="text-2xl font-bold text-primary mb-6 text-center">
          🔵 Mimarsinan Şubemiz
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.slice(4, 8).map((trainer, index) => (
            <Card
              key={index}
              className="group bg-card/50 backdrop-blur-sm border-border hover:border-accent/50 transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <Badge className="absolute top-4 right-4 bg-accent/90 text-accent-foreground">
                  {trainer.experience}
                </Badge>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                  {trainer.name}
                </h3>

                <p className="text-primary font-semibold mb-4">
                  {trainer.specialty}
                </p>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">Uzmanlık Alanları:</p>
                  <div className="flex flex-wrap gap-1">
                    {trainer.focus.map((focus, focusIndex) => (
                      <Badge
                        key={focusIndex}
                        variant="outline"
                        className="text-xs border-muted-foreground/30 text-muted-foreground hover:border-accent hover:text-accent transition-colors duration-300"
                      >
                        {focus}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Text */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground text-lg">
            Kişisel antrenman seansları için antrenörlerimizle iletişime geçin
          </p>
        </div>
      </div>
    </section>
  );
};

export default Trainers;

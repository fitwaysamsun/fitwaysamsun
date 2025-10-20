import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Trainer {
  name: string;
  specialty: string;
  image: string;
  experience: string;
  focus: string[];
}

const Trainers = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);

  const SHEET_CSV_URL =
    "https://docs.google.com/spreadsheets/d/1CqoozoZNdem8XmeIytSQbu3coFeJtQXhcEXKj2tjHcs/export?format=csv";

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await fetch(SHEET_CSV_URL);
        const csvText = await res.text();

        const [headerLine, ...rows] = csvText.trim().split("\n");
        const headers = headerLine.split(",");

        const data = rows.map((row) => {
          const values = row.split(",");
          const obj = headers.reduce((acc: any, header, i) => {
            acc[header.trim()] = values[i]?.trim();
            return acc;
          }, {});

          return {
            name: obj.name,
            specialty: obj.specialty,
            image: obj.image,
            experience: obj.experience,
            focus: [obj.focus_1, obj.focus_2, obj.focus_3].filter(Boolean),
          };
        });

        setTrainers(data);
      } catch (error) {
        console.error("Error fetching trainers from Google Sheets:", error);
      }
    };

    fetchTrainers();
  }, []);

  return (
    <section id="trainers" className="py-20 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Antrenörlerimiz
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uzman ve deneyimli antrenör kadromuzla hedeflerinize güvenle ulaşın
          </p>
        </div>

        {/* Yenimahalle Şubemiz */}
        <div className="flex justify-center mb-6">
          <span className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium">
            Yenimahalle Şubemiz
          </span>
        </div>

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
                <p className="text-accent font-semibold mb-4">{trainer.specialty}</p>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">
                    Uzmanlık Alanları:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {trainer.focus.map((f, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-xs border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-300"
                      >
                        {f}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mimarsinan Şubemiz */}
        <div className="flex justify-center mb-6 mt-16">
          <span className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
            Mimarsinan Şubemiz
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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
                <p className="text-primary font-semibold mb-4">{trainer.specialty}</p>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">
                    Uzmanlık Alanları:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {trainer.focus.map((f, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-xs border-muted-foreground/30 text-muted-foreground hover:border-accent hover:text-accent transition-colors duration-300"
                      >
                        {f}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pilates Hocamız */}
        <div className="flex justify-center mb-6 mt-16">
          <span className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium">
            Pilates Hocamız
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trainers.slice(8, 9).map((trainer, index) => (
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
                <p className="text-accent font-semibold mb-4">{trainer.specialty}</p>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">
                    Uzmanlık Alanları:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {trainer.focus.map((f, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-xs border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-300"
                      >
                        {f}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground text-lg">
            Hedeflerinize ulaşmak için doğru adımları atın
          </p>
        </div>
      </div>
    </section>
  );
};

export default Trainers;
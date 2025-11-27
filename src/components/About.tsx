import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Zap } from "lucide-react";

const About = () => {
  const [aboutImage1, setAboutImage1] = useState("/Images/About_1.png");
  const [aboutImage2, setAboutImage2] = useState("/Images/About_2.png");

  // 🟢 هذا هو رابط Google Sheet بصيغة CSV
  const SHEET_CSV_URL =
    "https://docs.google.com/spreadsheets/d/1CqoozoZNdem8XmeIytSQbu3coFeJtQXhcEXKj2tjHcs/export?format=csv";

  useEffect(() => {
    const fetchAboutImages = async () => {
      try {
        const res = await fetch(SHEET_CSV_URL);
        const text = await res.text();

        // 🔍 نحول CSV إلى صفوف وأعمدة
        const rows = text.split("\n").map((row) => row.split(","));
        const headers = rows[0];
        const firstRow = rows[1];

        const data = {};
        headers.forEach((header, i) => {
          data[header.trim()] = firstRow[i]?.trim();
        });

        // 🧾 تحديث الصور من الجدول
        if (data.about_image_1) setAboutImage1(data.about_image_1);
        if (data.about_image_2) setAboutImage2(data.about_image_2);
      } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
      }
    };

    fetchAboutImages();
  }, []);

  return (
    <section id="about" className="py-20 px-6 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight pb-2">
            Hakkımızda
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <p className="text-lg leading-relaxed text-muted-foreground">
              <strong className="text-primary">FİTWAY FİTNESS</strong> olarak amacımız; her bireyin sporla sağlıklı, güçlü ve mutlu bir hayata ulaşmasını sağlamaktır.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Son teknoloji ekipmanlar, deneyimli antrenörler ve motive edici bir ortam ile hedeflerine daha hızlı ulaşabilirsin.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 rounded-2xl hover:scale-105 hover:shadow-2xl hover:border-primary/50 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors duration-300">
                    <Target className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Hedef Odaklı</h3>
                  <p className="text-sm text-muted-foreground">Kişiselleştirilmiş antrenman programları</p>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border/50 rounded-2xl hover:scale-105 hover:shadow-2xl hover:border-accent/50 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/30 transition-colors duration-300">
                    <Zap className="h-10 w-10 text-accent group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Son Teknoloji</h3>
                  <p className="text-sm text-muted-foreground">Modern ekipman ve teknoloji</p>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border/50 rounded-2xl hover:scale-105 hover:shadow-2xl hover:border-primary/50 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors duration-300">
                    <Users className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Uzman Ekip</h3>
                  <p className="text-sm text-muted-foreground">Deneyimli ve sertifikalı antrenörler</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* الصور */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src={aboutImage1}
                alt="Modern Cardio Equipment"
                className="rounded-lg shadow-card hover:shadow-fitness transition-all duration-300 hover:scale-105"
              />
            </div>
            <div className="space-y-4 mt-8">
              <img
                src={aboutImage2}
                alt="Weight Training Area"
                className="rounded-lg shadow-card hover:shadow-fitness transition-all duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

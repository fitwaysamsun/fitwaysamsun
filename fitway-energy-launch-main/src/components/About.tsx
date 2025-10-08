import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Zap } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Hakkımızda
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <p className="text-lg leading-relaxed text-muted-foreground">
              <strong className="text-primary">FİTWAY FİTNESS</strong> olarak amacımız; her bireyin sporla sağlıklı, güçlü ve mutlu bir hayata ulaşmasını sağlamaktır.
            </p>
            
            <p className="text-lg leading-relaxed text-muted-foreground">
              Son teknoloji ekipmanlar, deneyimli antrenörler ve motive edici bir ortam ile hedeflerine daha hızlı ulaşabilirsin.
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <Target className="h-10 w-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-semibold text-foreground mb-2">Hedef Odaklı</h3>
                  <p className="text-sm text-muted-foreground">Kişiselleştirilmiş antrenman programları</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-accent/50 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <Zap className="h-10 w-10 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-semibold text-foreground mb-2">Son Teknoloji</h3>
                  <p className="text-sm text-muted-foreground">Modern ekipman ve teknoloji</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <Users className="h-10 w-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-semibold text-foreground mb-2">Uzman Ekip</h3>
                  <p className="text-sm text-muted-foreground">Deneyimli ve sertifikalı antrenörler</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src="/lovable-uploads/a13fe726-a9f5-4feb-909f-4209dca04c6c.png" 
                alt="Modern Cardio Equipment" 
                className="rounded-lg shadow-card hover:shadow-fitness transition-all duration-300 hover:scale-105"
              />
            </div>
            <div className="space-y-4 mt-8">
              <img 
                src="/lovable-uploads/6322bbc3-fd66-4981-9335-66d75f6099c5.png" 
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
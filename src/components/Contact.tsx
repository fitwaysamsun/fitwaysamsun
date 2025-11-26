import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import LocationMap from "./LocationMap";

const Contact = () => {
  const branches = [
    {
      name: "Mimarsinan Şubemiz",
      phone: "0 (536) 654 46 55",
      address: "Mimarsinan, İsmet İnönü Blv. No:163/A, 55200 Atakum/Samsun",
      coordinates: "41.33057292662969, 36.27667643435831", // إحداثيات دقيقة
      whatsapp: "905366544655"
    },
    {
      name: "Yenimahalle Şubemiz",
      phone: "0 (536) 512 36 55",
      address: "Yenimahalle, Vatan Cd. no:30/A, 55200 Atakum/Samsun",
      coordinates: "41.350573492260814, 36.235919214893606", // إحداثيات دقيقة
      whatsapp: "905365123655"
    }
  ];


  const handleWhatsApp = (number: string, branch: string) => {
    const message = `Merhaba, ${branch} hakkında bilgi almak istiyorum.`;
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone.replace(/\s/g, '')}`, "_self");
  };

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight pb-2">
            İletişim
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Size en yakın şubemizden hemen üye olun veya detaylı bilgi alın
          </p>
        </div>

        {/* Branch Cards with Maps */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {branches.map((branch, index) => (
            <div key={index} className="space-y-6">
              <Card
                className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground flex items-center">
                    <MapPin className="mr-3 h-6 w-6 text-primary" />
                    {branch.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground leading-relaxed">
                      {branch.address}
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <a
                      href={`tel:${branch.phone.replace(/\s/g, '')}`}
                      className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                    >
                      {branch.phone}
                    </a>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => handleCall(branch.phone)}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Ara
                    </Button>

                    <Button
                      variant="outline"
                      className="flex-1 border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                      onClick={() => handleWhatsApp(branch.whatsapp, branch.name)}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <LocationMap
                address={branch.coordinates}
                title={branch.name}
              />
            </div>
          ))}
        </div>

        {/* Quick Contact Section */}
        <div className="text-center">
          <Card className="bg-card/50 backdrop-blur-sm border-border max-w-2xl mx-auto">
            <CardContent className="p-8">
              <MessageCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Hızlı İletişim
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Sorularınız için WhatsApp üzerinden 7/24 destek alabilir,
                üyelik işlemlerinizi kolayca gerçekleştirebilirsiniz.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.open("https://wa.me/905366544655", "_blank")}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp ile Mesaj Gönder
                </Button>
              </div>

              {/* Operating Hours */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center justify-center text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  <span className="text-sm">
                    Destek: Pazartesi-Cuma 09:00-18:00 | Acil durumlar 7/24
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
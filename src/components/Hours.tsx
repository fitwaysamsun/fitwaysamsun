import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar } from "lucide-react";

const Hours = () => {
  const schedule = [
    { day: "Pazartesi", hours: "09:00 – 23:00", isOpen: true },
    { day: "Salı", hours: "09:00 – 23:00", isOpen: true },
    { day: "Çarşamba", hours: "09:00 – 23:00", isOpen: true },
    { day: "Perşembe", hours: "09:00 – 23:00", isOpen: true },
    { day: "Cuma", hours: "09:00 – 23:00", isOpen: true },
    { day: "Cumartesi", hours: "10:00 – 22:00", isOpen: true },
    { day: "Pazar", hours: "12:00 – 18:00", isOpen: true }
  ];

  const getCurrentDay = () => {
    const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    return days[new Date().getDay()];
  };

  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const isCurrentlyOpen = () => {
    const now = new Date();
    const currentDay = getCurrentDay();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const todaySchedule = schedule.find(day => day.day === currentDay);
    if (!todaySchedule?.isOpen) return false;

    // Extract start and end time
    const [startStr, endStr] = todaySchedule.hours.replace("–", "-").split("-").map(s => s.trim());
    const startTime = parseTime(startStr);
    const endTime = parseTime(endStr);

    return currentTime >= startTime && currentTime < endTime;
  };

  return (
    <section id="hours" className="py-20 px-6 bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight pb-2">
            Çalışma Saatleri
          </h2>
          <p className="text-lg text-muted-foreground">
            Size en uygun saatte gelip antrenman yapabilirsiniz
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Schedule Card */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                Haftalık Program
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {schedule.map((item, index) => {
                const isToday = item.day === getCurrentDay();
                return (
                  <div
                    key={index}
                    className={`flex justify-between items-center py-2 px-3 rounded-lg transition-all duration-200 ${isToday
                        ? 'bg-primary/10 border border-primary/30'
                        : 'hover:bg-muted/50'
                      }`}
                  >
                    <span className={`font-medium ${isToday ? 'text-primary' : 'text-foreground'
                      }`}>
                      {item.day}
                      {isToday && (
                        <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                          Bugün
                        </span>
                      )}
                    </span>
                    <span className={`${item.isOpen
                        ? isToday
                          ? 'text-primary font-medium'
                          : 'text-muted-foreground'
                        : 'text-destructive'
                      }`}>
                      {item.hours}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Clock className="mr-2 h-5 w-5 text-accent" />
                Şu Anki Durum
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${isCurrentlyOpen()
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${isCurrentlyOpen() ? 'bg-green-400' : 'bg-red-400'
                    } animate-pulse`} />
                  {isCurrentlyOpen() ? 'Şu Anda Açık' : 'Şu Anda Kapalı'}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Rezervasyon</h4>
                  <p className="text-sm text-muted-foreground">
                    Özel ders ve grup dersleri için önceden rezervasyon yapabilirsiniz.
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Giriş</h4>
                  <p className="text-sm text-muted-foreground">
                    Çalışma saatleri içinde mobil uygulama üzerinden giriş yapabilirsiniz.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Özel saatlerde antrenman yapmak istiyorsanız, lütfen önceden iletişime geçin.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hours;

import { Instagram, Phone, MapPin } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (href: string) => {
    if (href === '/') {
      navigate('/');
    } else if (href.startsWith('/#')) {
      const hash = href.substring(2);
      navigate('/', { state: { scrollTo: hash } });
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);
    } else if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img
                  src="/Images/Logo.png"
                  alt="FITWAY Fitness Logo"
                  className="h-12 w-auto brightness-0 invert"
                />
                <span className="text-2xl font-bold">FİTWAY</span>
              </div>
              <p className="text-primary-foreground/80 leading-relaxed">
                Enerjini keşfet, en iyi versiyonunu yarat. Modern ekipmanlar ve uzman kadromuzla fitness hedlerinize ulaşın.
              </p>

              {/* Social Media */}
              <div className="flex items-center space-x-4">
                <a
                  href="https://instagram.com/fitwayfitnesspilates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-foreground/20 hover:bg-primary-foreground/30 p-2 rounded-full transition-colors duration-200"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Branch Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Şubelerimiz</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Mimarsinan Şubesi</h4>
                  <div className="flex items-start space-x-2 text-sm text-primary-foreground/80">
                    <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>0 (536) 654 46 55</span>
                  </div>
                  <div className="flex items-start space-x-2 text-sm text-primary-foreground/80">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Mimar Sinan Mah., İsmet İnönü Bulv., No:163/A Atakum, Samsun</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Yenimahalle Şubesi</h4>
                  <div className="flex items-start space-x-2 text-sm text-primary-foreground/80">
                    <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>0 (536) 512 36 55</span>
                  </div>
                  <div className="flex items-start space-x-2 text-sm text-primary-foreground/80">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Yenimahalle, Vatan Caddesi, No:30/A</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Hızlı Bağlantılar</h3>

              <div className="space-y-3">
                <button onClick={() => handleNavigation('/#about')} className="block text-left w-full text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                  Hakkımızda
                </button>
                <button onClick={() => handleNavigation('/#membership')} className="block text-left w-full text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                  Üyelik Paketleri
                </button>
                <button onClick={() => handleNavigation('/products')} className="block text-left w-full text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                  Supplementlerimiz
                </button>
                <button onClick={() => handleNavigation('/#trainers')} className="block text-left w-full text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                  Antrenörlerimiz
                </button>
                <button onClick={() => handleNavigation('/#gallery')} className="block text-left w-full text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                  Galeri
                </button>
                <button onClick={() => handleNavigation('/#contact')} className="block text-left w-full text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                  İletişim
                </button>
              </div>

              <div className="pt-4">
                <h4 className="font-medium mb-2">Çalışma Saatleri</h4>
                <div className="text-sm text-primary-foreground/80 space-y-1">
                  <p>Pazartesi-Cuma: 09:00-23:00</p>
                  <p>Cumartesi: 10:00-22:00</p>
                  <p>Pazar: 12.00-18.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-primary-foreground/10 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-primary-foreground/80 text-center md:text-left">
              © 2025 FİTWAY FİTNESS – Tüm Hakları Saklıdır.
            </p>

            <div className="flex items-center space-x-4 text-sm text-primary-foreground/80">
              <span>Mimarsinan: 0(536)6544655</span>
              <span className="hidden md:inline">|</span>
              <span>Yenimahalle: 0(536)5123655</span>
            </div>

            <div className="flex items-center space-x-2">
              <Instagram className="h-4 w-4" />
              <span className="text-sm text-primary-foreground/80">@fitwayfitnesspilates</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
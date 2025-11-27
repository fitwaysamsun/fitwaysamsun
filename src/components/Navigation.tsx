import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Ana Sayfa" },
    { href: "/#about", label: "Hakkımızda" },
    { href: "/#membership", label: "Üyelik" },
    { href: "/products", label: "Supplementlerimiz" },
    { href: "/#trainers", label: "Antrenörler" },
    { href: "/#gallery", label: "Galeri" },
    { href: "/#videos", label: "Videolar" },
    { href: "/#contact", label: "İletişim" }
  ];

  const handleNavigation = (href: string) => {
    setIsMobileMenuOpen(false);

    if (href === '/') {
      // Navigate to home page and scroll to top
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
    } else if (href.startsWith('/#')) {
      const hash = href.substring(2); // Remove /# to get just the section name
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

  // جديد: handle logo click بنفس طريقة handleNavigation
  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background shadow-lg border-b border-border"
        : "bg-background shadow-lg border-b border-border lg:bg-transparent lg:border-transparent lg:shadow-none"
      }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLogoClick}>
            <img
              src="/Images/Logo.png"
              alt="FITWAY Fitness Logo"
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-primary">FİTWAY</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.href)}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen
          ? 'max-h-screen opacity-100 pb-6 overflow-y-auto'
          : 'max-h-0 opacity-0'
          }`}>
          <div className="space-y-4 pt-4 border-t border-border/50 flex flex-col items-center">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.href)}
                className="block text-center text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

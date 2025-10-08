import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationMapProps {
  address: string;
  title: string;
}

const LocationMap = ({ address, title }: LocationMapProps) => {
  // Create Google Maps embed URL
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <div className="space-y-3">
      <div className="relative w-full h-[350px] rounded-lg overflow-hidden border border-border shadow-lg bg-card/50">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${title} Harita`}
          className="absolute inset-0"
        />
      </div>
      
      <Button
        variant="outline"
        className="w-full border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
        onClick={() => window.open(directionsUrl, '_blank')}
      >
        <MapPin className="mr-2 h-4 w-4" />
        Yol Tarifi Al
        <ExternalLink className="ml-2 h-3 w-3" />
      </Button>
    </div>
  );
};

export default LocationMap;

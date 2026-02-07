import {
  Dumbbell,
  Car,
  Wifi,
  Zap,
  ShieldCheck,
  Trees,
  Waves,
  Home,
  Wind,
  Utensils,
  Shirt,
  Droplets,
  Route,
  Plug,
  ArrowUp,
} from "lucide-react";

const amenityIcons: Record<string, React.ElementType> = {
  Gym: Dumbbell,
  Lift: ArrowUp,
  Parking: Car,
  Wifi: Wifi,
  "Power Backup": Zap,
  Security: ShieldCheck,
  Garden: Trees,
  "Swimming Pool": Waves,
  Clubhouse: Home,
  AC: Wind,
  Meals: Utensils,
  Laundry: Shirt,
  "Water Supply": Droplets,
  "Road Access": Route,
  Electricity: Plug,
};

interface AmenityIconProps {
  name: string;
  className?: string;
}

export function AmenityIcon({ name, className = "w-5 h-5" }: AmenityIconProps) {
  const Icon = amenityIcons[name] || Home;
  return <Icon className={className} />;
}

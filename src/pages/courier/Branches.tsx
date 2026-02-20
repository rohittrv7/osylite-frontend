import { useState } from "react";
import { Search, MapPin, Clock, Phone, Navigation } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Branch {
  id: number;
  name: string;
  address: string;
  pincode: string;
  phone: string;
  hours: string;
  type: string;
  distance: string;
}

const mockBranches: Branch[] = [
  {
    id: 1,
    name: "New Delhi GPO",
    address: "Sansad Marg, Connaught Place, New Delhi",
    pincode: "110001",
    phone: "011-23362011",
    hours: "9:00 AM - 5:00 PM",
    type: "Head Post Office",
    distance: "1.2 km",
  },
  {
    id: 2,
    name: "Janpath Post Office",
    address: "Janpath Lane, New Delhi",
    pincode: "110001",
    phone: "011-23322456",
    hours: "9:30 AM - 4:30 PM",
    type: "Sub Post Office",
    distance: "2.5 km",
  },
  {
    id: 3,
    name: "Lodi Road Post Office",
    address: "Lodi Road, New Delhi",
    pincode: "110003",
    phone: "011-24652789",
    hours: "9:00 AM - 5:00 PM",
    type: "Branch Post Office",
    distance: "3.1 km",
  },
  {
    id: 4,
    name: "Karol Bagh Delivery Office",
    address: "Pusa Road, Karol Bagh, New Delhi",
    pincode: "110005",
    phone: "011-25721345",
    hours: "9:00 AM - 6:00 PM",
    type: "Delivery Office",
    distance: "4.8 km",
  },
  {
    id: 5,
    name: "South Extension Post Office",
    address: "Ring Road, South Extension",
    pincode: "110049",
    phone: "011-26252389",
    hours: "9:30 AM - 4:30 PM",
    type: "Sub Post Office",
    distance: "6.2 km",
  },
];

export default function BranchesPage() {
  const [query, setQuery] = useState("");

  const filtered = mockBranches.filter(
    (b) =>
      b.name.toLowerCase().includes(query.toLowerCase()) ||
      b.pincode.includes(query),
  );

  return (
    <div className="container py-12">
      <div className="text-center mb-10 animate-fade-in">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Find a Branch
        </h1>
        <p className="text-muted-foreground">
          Search by pincode or city to find your nearest post office
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
        {/* Sidebar */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search pincode or city..."
              className="pl-10 h-12"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {filtered.map((b) => (
              <div
                key={b.id}
                className="bg-card border border-border rounded-lg p-4 shadow-card hover:shadow-elevated hover:border-primary/30 transition-all cursor-pointer animate-fade-in"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">
                      {b.name}
                    </h3>
                    <Badge variant="secondary" className="text-[10px] mt-1">
                      {b.type}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {b.distance}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground flex items-start gap-1 mb-2">
                  <MapPin className="w-3 h-3 mt-0.5 shrink-0" /> {b.address} -{" "}
                  {b.pincode}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {b.hours}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {b.phone}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3 text-xs"
                >
                  <Navigation className="w-3 h-3 mr-1" /> Get Directions
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Map placeholder */}
        <div className="lg:col-span-3 bg-card border border-border rounded-lg shadow-card overflow-hidden min-h-[500px] flex items-center justify-center animate-fade-in">
          <div className="text-center p-8">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">
              Map View
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Interactive map will show nearby branches with branded pins.
              Connect Google Maps API to enable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

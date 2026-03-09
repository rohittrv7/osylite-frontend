import React, { useState } from "react";
import {
  MapPin,
  Calendar as CalendarIcon,
  Search,
  Star,
  Wifi,
  Coffee,
  Wind,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  Users,
  Loader2,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Hotel, HotelRoom, HotelStep } from "@/types/hotel";

// --- MOCK DATA ---
const MOCK_HOTELS: Hotel[] = [
  {
    id: "h1",
    name: "The Grand Maurya",
    location: "Boring Road, Patna",
    rating: 4.8,
    reviews: 1240,
    basePrice: 3500,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    ],
    amenities: ["Free Wifi", "Pool", "Spa"],
    rooms: [
      {
        id: "r1",
        type: "Deluxe King Room",
        price: 3500,
        capacity: 2,
        amenities: ["AC", "Bathtub"],
        image:
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80",
      },
      {
        id: "r2",
        type: "Presidential Suite",
        price: 8500,
        capacity: 4,
        amenities: ["Mini Bar", "City View"],
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80",
      },
    ],
  },
];

export default function HotelBookingSystem() {
  const [step, setStep] = useState<HotelStep>("SEARCH");
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<HotelRoom | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBooking = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("SEARCH");
      alert("Booking Confirmed! Check your email.");
    }, 2000);
  };

  // --- 1. SEARCH & LIST SCREEN ---
  if (step === "SEARCH")
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-10 space-y-10 animate-in fade-in duration-700">
        <div className="space-y-2">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">
            ANG <span className="text-primary">Stays</span>
          </h1>
          <p className="text-muted-foreground font-bold uppercase text-[10px] tracking-[0.2em] flex items-center gap-2">
            <ShieldCheck size={14} className="text-primary" /> Luxury Redefined
          </p>
        </div>

        {/* Search Header */}
        <Card className="border-2 rounded-[2.5rem] shadow-2xl p-8 bg-card border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div className="space-y-2">
              <Label>Destination</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 text-primary w-4 h-4" />
                <Input
                  className="pl-10 h-14 rounded-2xl border-2 font-bold"
                  placeholder="Where are you going?"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Check-in / Out</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-3.5 text-primary w-4 h-4" />
                <Input
                  type="date"
                  className="pl-10 h-14 rounded-2xl border-2 font-bold"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Guests</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3.5 text-primary w-4 h-4" />
                <Input
                  className="pl-10 h-14 rounded-2xl border-2 font-bold"
                  placeholder="2 Adults, 1 Room"
                />
              </div>
            </div>
            <Button className="h-14 rounded-2xl font-black uppercase italic tracking-widest shadow-xl shadow-primary/20">
              <Search className="mr-2" /> Find Stays
            </Button>
          </div>
        </Card>

        {/* Hotel Cards */}
        <div className="grid grid-cols-1 gap-8 pt-4">
          {MOCK_HOTELS.map((hotel) => (
            <Card
              key={hotel.id}
              className="border-2 rounded-[2rem] overflow-hidden group hover:border-primary/50 transition-all"
            >
              <CardContent className="p-0 flex flex-col md:flex-row">
                <div className="md:w-80 h-64 md:h-auto relative overflow-hidden">
                  <img
                    src={hotel.images[0]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <Badge className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border-white/20 font-black italic">
                    TOP RATED
                  </Badge>
                </div>
                <div className="flex-1 p-8 flex flex-col justify-between space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black uppercase italic tracking-tight">
                        {hotel.name}
                      </h3>
                      <p className="text-muted-foreground text-xs font-bold flex items-center gap-1 uppercase tracking-widest">
                        <MapPin size={12} className="text-primary" />{" "}
                        {hotel.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-primary font-black italic text-lg">
                        <Star size={18} fill="currentColor" /> {hotel.rating}
                      </div>
                      <p className="text-[9px] font-bold opacity-40 uppercase">
                        {hotel.reviews} reviews
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Amenity icon={<Wifi size={14} />} label="Free Wifi" />
                    <Amenity icon={<Coffee size={14} />} label="Breakfast" />
                    <Amenity icon={<Wind size={14} />} label="AC" />
                  </div>

                  <Separator className="border-dashed" />

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black uppercase opacity-40">
                        Price per night
                      </p>
                      <p className="text-3xl font-black text-primary italic">
                        ₹{hotel.basePrice}
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        setSelectedHotel(hotel);
                        setStep("ROOMS");
                      }}
                      className="h-14 px-10 rounded-2xl font-black uppercase italic tracking-widest shadow-lg"
                    >
                      Select Room <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );

  // --- 2. ROOM SELECTION SCREEN ---
  if (step === "ROOMS" && selectedHotel)
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-10 space-y-8 animate-in slide-in-from-right duration-500">
        <Button
          variant="ghost"
          onClick={() => setStep("SEARCH")}
          className="font-black uppercase text-xs gap-2"
        >
          <ArrowLeft size={16} /> Back to Results
        </Button>

        <div className="space-y-1">
          <h2 className="text-3xl font-black uppercase italic">
            {selectedHotel.name}
          </h2>
          <p className="text-muted-foreground font-bold uppercase text-xs">
            Available Room Categories
          </p>
        </div>

        <div className="grid gap-6">
          {selectedHotel.rooms.map((room) => (
            <Card
              key={room.id}
              className={cn(
                "border-2 rounded-3xl overflow-hidden transition-all",
                selectedRoom?.id === room.id
                  ? "border-primary shadow-xl scale-[1.02]"
                  : "border-border/50",
              )}
            >
              <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
                <img
                  src={room.image}
                  className="w-40 h-28 rounded-2xl object-cover border-2"
                />
                <div className="flex-1 space-y-1">
                  <h4 className="font-black uppercase italic text-lg">
                    {room.type}
                  </h4>
                  <div className="flex gap-2">
                    {room.amenities.map((a) => (
                      <Badge
                        key={a}
                        variant="outline"
                        className="text-[8px] font-black uppercase"
                      >
                        {a}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right space-y-3">
                  <p className="text-2xl font-black text-primary">
                    ₹{room.price}
                    <span className="text-[10px] text-muted-foreground italic">
                      /night
                    </span>
                  </p>
                  <Button
                    onClick={() => {
                      setSelectedRoom(room);
                      setStep("PAYMENT");
                    }}
                    className="rounded-xl font-black uppercase italic text-xs h-10 px-8"
                  >
                    Book Room
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );

  // --- 3. FINAL PAYMENT SCREEN ---
  if (step === "PAYMENT" && selectedRoom)
    return (
      <div className="max-w-md mx-auto p-4 md:p-10 space-y-8 animate-in zoom-in-95 duration-500">
        <Card className="border-2 rounded-[2.5rem] p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto animate-bounce">
            <CreditCard size={40} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black uppercase italic">
              Finalize <span className="text-primary">Stay</span>
            </h3>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              {selectedHotel?.name} - {selectedRoom.type}
            </p>
          </div>

          <div className="p-6 border-2 border-dashed rounded-2xl bg-muted/10 space-y-1">
            <p className="text-[10px] font-black uppercase opacity-40">
              Total Amount
            </p>
            <p className="text-4xl font-black italic text-primary">
              ₹{selectedRoom.price}
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <Button
              onClick={handleBooking}
              disabled={isLoading}
              className="w-full h-16 rounded-2xl font-black uppercase italic tracking-widest bg-primary shadow-2xl"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Confirm with ANG Wallet"
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setStep("ROOMS")}
              className="w-full text-[10px] font-black uppercase"
            >
              Cancel Booking
            </Button>
          </div>
        </Card>
      </div>
    );

  return null;
}

// --- Internal Helper Components ---
const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="text-[10px] font-black uppercase opacity-60 tracking-widest ml-2">
    {children}
  </label>
);

const Amenity = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter opacity-70">
    <div className="text-primary">{icon}</div> {label}
  </div>
);

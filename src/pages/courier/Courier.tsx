import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Package,
  MapPin,
  Calculator,
  FileText,
  ArrowRight,
  Truck,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const services = [
  {
    icon: Search,
    title: "Track Consignment",
    desc: "Real-time tracking for your parcels & letters with detailed transit history.",
    link: "/track",
    color: "bg-blue-500",
  },
  {
    icon: MapPin,
    title: "Locate Post Office",
    desc: "Find the nearest branch or courier center using your current pincode.",
    link: "/branches",
    color: "bg-orange-500",
  },
  {
    icon: Calculator,
    title: "Postage Calculator",
    desc: "Calculate estimated shipping costs based on weight and distance.",
    link: "/calculator",
    color: "bg-green-500",
  },
  {
    icon: FileText,
    title: "E-Receipt",
    desc: "Download and view digital transaction receipts for your shipments.",
    link: "/receipt",
    color: "bg-purple-500",
  },
  // {
  //   icon: MessageSquare,
  //   title: "Register Complaint",
  //   desc: "File a grievance regarding delays, damage, or service issues.",
  //   link: "/complaints",
  //   color: "bg-red-500",
  // },
  {
    icon: Package,
    title: "Track Complaints",
    desc: "Monitor the resolution status of your previously filed complaints.",
    link: "/complaints",
    color: "bg-slate-700",
  },
];

export default function Courier() {
  const [trackingId, setTrackingId] = useState("");
  const navigate = useNavigate();

  const handleTrack = () => {
    if (trackingId.trim()) {
      navigate(`/track?id=${encodeURIComponent(trackingId.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-transparent pb-10">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-primary/5 border-b py-8 lg:py-16">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Side: Branding */}
            <div className="flex-1 text-center lg:text-left space-y-4">
              <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-foreground italic uppercase">
                ANG <span className="text-primary">Courier</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
                Fast, reliable, and secure logistics solutions for all your
                personal and business needs.
              </p>
            </div>

            {/* Right Side: Quick Actions Tabs */}
            <div className="w-full max-w-lg">
              <Card className="shadow-2xl border-2">
                <CardContent className="p-6">
                  <Tabs defaultValue="track" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="track" className="gap-2">
                        <Truck className="w-4 h-4" /> Track
                      </TabsTrigger>
                      <TabsTrigger value="locate" className="gap-2">
                        <Building2 className="w-4 h-4" /> Locate
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="track" className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold uppercase opacity-70">
                          Consignment Number
                        </label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Example: AG123456789IN"
                            value={trackingId}
                            onChange={(e) => setTrackingId(e.target.value)}
                            className="h-12 border-2 focus-visible:ring-primary"
                          />
                          <Button
                            onClick={handleTrack}
                            className="h-12 px-8 font-bold"
                          >
                            SEARCH
                          </Button>
                        </div>
                      </div>
                      <p className="text-[10px] text-muted-foreground italic">
                        *Enter your 13-digit tracking number to see real-time
                        updates.
                      </p>
                    </TabsContent>

                    <TabsContent value="locate" className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold uppercase opacity-70">
                          Search by Pincode
                        </label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter 6 digit Pincode"
                            className="h-12 border-2"
                          />
                          <Button
                            variant="secondary"
                            className="h-12 px-6 font-bold"
                          >
                            FIND
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="container px-4 mx-auto max-w-6xl mt-16">
        <div className="flex flex-col items-center text-center mb-12 space-y-2">
          <span className="text-primary font-black tracking-widest text-xs uppercase">
            Premium Services
          </span>
          <h2 className="text-3xl font-bold tracking-tight">
            Postage & Tracking Services
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-xl relative overflow-hidden"
            >
              <Link to={service.link}>
                <CardHeader className="pb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-2 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed mb-4">
                    {service.desc}
                  </CardDescription>
                  <div className="flex items-center text-primary text-xs font-black uppercase tracking-wider gap-2">
                    Explore Service{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
                {/* Visual Accent */}
                <div
                  className={`absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full`}
                />
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* --- QUICK INFO BANNER --- */}
      <section className="container px-4 mx-auto max-w-6xl mt-20">
        <div className="bg-background border rounded-3xl p-8 lg:p-12 text-foreground flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-2xl font-bold tracking-tight">
              Need assistance with your shipment?
            </h3>
            <p className="text-foreground/40">
              Our customer support is available 24/7 to resolve your logistics
              queries.
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="text-foreground cursor-pointer bg-foreground border-foreground/20 hover:bg-foreground/10 rounded-xl px-8 h-12"
            >
              HELP CENTER
            </Button>
            <Button className="bg-background cursor-pointer hover:bg-background/90 text-foreground rounded-xl px-8 h-12 font-bold border shadow-lg">
              CONTACT US
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

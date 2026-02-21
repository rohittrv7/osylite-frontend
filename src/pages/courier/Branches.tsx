import { useState, useEffect, useMemo } from "react";
import {
  Search,
  MapPin,
  Navigation,
  Loader2,
  Map as MapIcon,
  Globe,
  Building2,
  Phone,
  Mail,
  Clock,
  ChevronLeft,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetNearbyCouriersQuery,
  useGetAssociateByIdQuery,
} from "@/store/api/courierApi";
import { Skeleton } from "@/components/ui/skeleton";

// Custom Debounce Hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function BranchesPage() {
  const [activeTab, setActiveTab] = useState("gps");
  const [searchTerm, setSearchTerm] = useState("");
  const [coords, setCoords] = useState<{ lat?: number; lng?: number }>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchTerm, 1500);

  // GPS Access
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }, []);

  const queryParams = useMemo(() => {
    const query: any = {};
    const cleanSearch = debouncedSearch.trim();
    if (activeTab === "pincode" && /^\d{6}$/.test(cleanSearch)) {
      query.pincode = cleanSearch;
    } else if (activeTab === "office" && cleanSearch.length > 2) {
      query.officeName = cleanSearch;
    } else if (activeTab === "gps" && coords.lat && coords.lng) {
      query.latitude = coords.lat;
      query.longitude = coords.lng;
      query.radius = 10;
    }
    return query;
  }, [debouncedSearch, coords, activeTab]);

  const shouldSkip = useMemo(() => {
    if (activeTab === "gps") return !coords.lat;
    if (activeTab === "pincode") return !/^\d{6}$/.test(debouncedSearch.trim());
    if (activeTab === "office") return debouncedSearch.trim().length <= 2;
    return true;
  }, [activeTab, coords, debouncedSearch]);

  const {
    data: branches,
    isFetching,
    isLoading,
  } = useGetNearbyCouriersQuery(queryParams, {
    skip: shouldSkip,
  });

  return (
    <div className="container py-8 max-w-7xl px-5 mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black tracking-tighter uppercase italic">
          ANG <span className="text-primary">Courier Finder</span>
        </h1>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <Tabs
            value={activeTab}
            onValueChange={(v) => {
              setActiveTab(v);
              setSearchTerm("");
              setSelectedId(null);
            }}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 h-12 bg-muted/50 rounded-xl p-1">
              <TabsTrigger value="gps" className="rounded-lg gap-2">
                <Globe size={14} /> GPS
              </TabsTrigger>
              <TabsTrigger value="pincode" className="rounded-lg gap-2">
                <MapPin size={14} /> Pincode
              </TabsTrigger>
              <TabsTrigger value="office" className="rounded-lg gap-2">
                <Building2 size={14} /> Office
              </TabsTrigger>
            </TabsList>

            <div className="mt-4 relative">
              {activeTab !== "gps" && (
                <div className="relative">
                  <Search className="absolute left-3 top-4 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder={
                      activeTab === "pincode"
                        ? "Enter 6-digit Pincode..."
                        : "Search Branch Name..."
                    }
                    className="pl-11 h-14 border-2 rounded-xl focus-visible:ring-primary shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              )}
              {(isFetching || isLoading) && (
                <Loader2 className="absolute right-4 top-4 w-5 h-5 animate-spin text-primary" />
              )}
            </div>
          </Tabs>

          <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar scrollbar-hide">
            {isLoading ? (
              <SkeletonList />
            ) : branches?.length ? (
              branches.map((b) => (
                <BranchCard
                  key={b.id}
                  branch={b}
                  isActive={selectedId === b.id}
                  onClick={() => setSelectedId(b.id)}
                />
              ))
            ) : (
              <EmptyState
                isSearching={searchTerm.length > 0}
              />
            )}
          </div>
        </div>

        {/* Right Section: Map or Detail View */}
        <div className="lg:col-span-7">
          {selectedId ? (
            <BranchDetailView
              id={selectedId}
              onClose={() => setSelectedId(null)}
            />
          ) : (
            <div className="bg-muted/30 border-2 border-dashed rounded-3xl min-h-[500px] flex items-center justify-center relative overflow-hidden shadow-inner">
              <div className="text-center z-10 p-6 bg-background/50 backdrop-blur-md rounded-2xl border shadow-xl animate-in fade-in zoom-in">
                <MapIcon className="w-16 h-16 mx-auto mb-4 text-primary opacity-20" />
                <h3 className="text-xl font-bold uppercase italic tracking-tighter">
                  Select a branch
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Click on a card to see full details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Detail View Component ---
function BranchDetailView({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const { data: detail, isLoading } = useGetAssociateByIdQuery(id);

  if (isLoading)
    return (
      <div className="h-[500px] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  if (!detail) return null;

  return (
    <div className="bg-card border-2 rounded-3xl shadow-xl overflow-hidden animate-in slide-in-from-right-4 duration-500 min-h-[500px]">
      {/* Header Info */}
      <div className="p-6 border-b flex justify-between items-start bg-slate-50/50 dark:bg-muted/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-black italic uppercase text-foreground">
              {detail.businessName}
            </h2>
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-[10px]">
              ACTIVE
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-1">
            Office ID:{" "}
            <span className="text-red-500">{detail.id.slice(0, 8)}</span> •{" "}
            {detail.category.replace("_", " ")}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="rounded-full hover:bg-red-50 hover:text-red-500"
        >
          <ChevronLeft size={24} />
        </Button>
      </div>

      <div className="p-8 grid md:grid-cols-2 gap-10">
        {/* Contact Information */}
        <div className="space-y-6">
          <h4 className="text-xs font-black uppercase text-primary tracking-widest border-b pb-2">
            Contact Information
          </h4>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Phone size={14} className="text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">
                  Phone
                </p>
                <p className="text-sm font-semibold">
                  {detail.businessDetails?.businessMobile}
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Mail size={14} className="text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">
                  Email
                </p>
                <p className="text-sm font-semibold truncate max-w-[200px]">
                  {detail.businessDetails?.officeEmail || detail.user?.email}
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Clock size={14} className="text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">
                  Working Hours
                </p>
                <p className="text-sm font-semibold">09:00 to 18:00</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Location Details */}
        <div className="space-y-6">
          <h4 className="text-xs font-black uppercase text-primary tracking-widest border-b pb-2">
            Location
          </h4>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin size={14} className="text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">
                  Address
                </p>
                <p className="text-sm font-semibold">
                  {detail.address}, {detail.city}
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Globe size={14} className="text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">
                  State / Pincode
                </p>
                <p className="text-sm font-semibold">
                  {detail.state} - {detail.pincode}
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Navigation size={14} className="text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">
                  Service Area
                </p>
                <p className="text-sm font-semibold">
                  {detail.businessDetails?.deliveryLocation || "Pan City"}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Administrative Details (Bottom Section) */}
      <div className="p-8 bg-slate-50/50 dark:bg-muted/10">
        <h4 className="text-xs font-black uppercase text-primary tracking-widest border-b pb-2 mb-4">
          Manager Information
        </h4>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-black text-xl">
            {detail.user?.firstName.charAt(0)}
          </div>
          <div>
            <p className="text-base font-black italic uppercase tracking-tight">
              {detail.user?.firstName} {detail.user?.lastName}
            </p>
            <p className="text-[10px] text-muted-foreground font-bold uppercase">
              Authorized Associate • Since{" "}
              {new Date(detail.createdAt).getFullYear()}
            </p>
          </div>
          <Button className="ml-auto gradient-coin rounded-xl font-bold">
            CONTACT MANAGER
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- Branch Card Component ---
function BranchCard({
  branch,
  isActive,
  onClick,
}: {
  branch: any;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-card border-2 rounded-2xl p-5 shadow-sm transition-all cursor-pointer group animate-in slide-in-from-left-4
      ${isActive ? "border-primary shadow-primary/20 scale-[1.02]" : "border-border hover:border-primary/40"}`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-foreground tracking-tight italic uppercase text-sm">
            {branch.businessName}
          </h3>
          <Badge
            variant="outline"
            className="text-[9px] uppercase font-bold tracking-widest border-primary/20 text-primary bg-primary/5 mt-1"
          >
            Click for details
          </Badge>
        </div>
        <div className="text-right">
          <span className="text-sm font-black text-primary italic">
            {parseFloat(branch.distanceInKm).toFixed(2)} KM
          </span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground flex gap-2 items-start">
        <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
        <span>
          {branch.address}, {branch.pincode}
        </span>
      </p>
    </div>
  );
}

function EmptyState({
  isSearching,
}: {
  isSearching: boolean;
}) {
  return (
    <div className="text-center py-20 bg-muted/10 border-2 border-dashed rounded-3xl">
      <MapIcon className="w-12 h-12 mx-auto mb-2 opacity-10" />
      <p className="font-bold text-muted-foreground">
        {isSearching ? "No results" : "Type to search"}
      </p>
    </div>
  );
}

function SkeletonList() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-28 w-full rounded-2xl" />
      ))}
    </div>
  );
}

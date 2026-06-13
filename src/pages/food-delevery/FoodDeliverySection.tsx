import { useState, useMemo, useEffect } from "react";
import {
  MapPin, ChevronDown, Search, Star, Clock, ArrowLeft,
  ChevronRight, Utensils, X, Store, ArrowRight, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useGetNearbyRestaurantsQuery, useGetStoreMenuQuery, type Store as StoreType } from "@/store/api/foodApi";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const FOOD_CATEGORIES = [
  { name: "Biryani", img: "🍛" },
  { name: "Pizza", img: "🍕" },
  { name: "Burger", img: "🍔" },
  { name: "Healthy", img: "🥗" },
  { name: "Dessert", img: "🍩" },
  { name: "Rolls", img: "🌯" },
];

const DietIcon = ({ isVeg }: { isVeg: boolean }) => (
  <div className={cn("w-4 h-4 rounded-sm border flex items-center justify-center shrink-0", isVeg ? "border-green-600" : "border-red-600")}>
    <div className={cn("w-2 h-2 rounded-full", isVeg ? "bg-green-600" : "bg-red-600")} />
  </div>
);

type Screen = "home" | "menu";

export default function FoodDeliverySection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [selectedStore, setSelectedStore] = useState<StoreType | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("Pune");
  const [locationLoading, setLocationLoading] = useState(false);

  // Dynamic location detection
  useEffect(() => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`
            );
            const data = await res.json();
            const detectedCity =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              data.address?.state_district ||
              "Pune";
            setCity(detectedCity);
          } catch {
            // keep default
          } finally {
            setLocationLoading(false);
          }
        },
        () => setLocationLoading(false),
        { timeout: 5000 }
      );
    }
  }, []);

  // Fetch restaurants
  const { data: restaurants = [], isLoading: restaurantsLoading } = useGetNearbyRestaurantsQuery(
    { city, storeType: "restaurant" },
    { skip: !city }
  );

  // Fetch menu for selected store
  const { data: menuItems = [], isLoading: menuLoading } = useGetStoreMenuQuery(
    selectedStore?.id || "",
    { skip: !selectedStore }
  );

  // Filter restaurants
  const filteredRestaurants = useMemo(() => {
    let list = restaurants;
    if (activeCategory) {
      list = list.filter(
        (r) =>
          r.description?.toLowerCase().includes(activeCategory.toLowerCase()) ||
          r.name.toLowerCase().includes(activeCategory.toLowerCase())
      );
    }
    if (searchQuery) {
      list = list.filter((r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return list;
  }, [restaurants, activeCategory, searchQuery]);

  // Cart logic
  const { itemTotal, cartCount } = useMemo(() => {
    let total = 0,
      count = 0;
    Object.entries(cart).forEach(([id, qty]) => {
      const item = menuItems.find((m) => m.id === id);
      if (item) {
        total += Number(item.discountedPrice || item.price) * qty;
        count += qty;
      }
    });
    return { itemTotal: total, cartCount: count };
  }, [cart, menuItems]);

  const updateCart = (id: string, delta: number) => {
    setCart((prev) => {
      const next = (prev[id] || 0) + delta;
      if (next <= 0) {
        const c = { ...prev };
        delete c[id];
        return c;
      }
      return { ...prev, [id]: next };
    });
  };

  const handleAddToGlobalCart = () => {
    if (cartCount === 0) return toast.error("Add items first");
    Object.entries(cart).forEach(([id, qty]) => {
      const item = menuItems.find((m) => m.id === id);
      if (item && selectedStore) {
        dispatch(
          addToCart({
            id: item.id,
            title: item.title,
            price: Number(item.discountedPrice || item.price),
            image: item.fileUrl?.[0] || "",
            quantity: qty,
            associateId: selectedStore.owner?.id || "",
          })
        );
      }
    });
    toast.success("Items added to cart!");
    navigate("/checkout");
  };

  // ── HOME SCREEN ──
  if (currentScreen === "home") {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
        <header className="sticky top-0 z-50 bg-background border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <h1 className="text-3xl font-black tracking-tighter text-primary">Osylite</h1>
              <div className="hidden md:flex items-center gap-2 hover:text-primary cursor-pointer">
                <MapPin size={20} className="text-primary" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold flex items-center gap-1">
                    {locationLoading ? <Loader2 size={14} className="animate-spin" /> : city}
                    <ChevronDown size={14} />
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex flex-1 max-w-2xl relative shadow-sm rounded-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Search for restaurant, cuisine or a dish"
                className="h-14 pl-12 rounded-xl bg-card border-border font-bold text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
          {/* Mobile search */}
          <div className="md:hidden relative shadow-sm rounded-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={20} />
            <Input
              placeholder="Search restaurant or dish"
              className="h-12 pl-10 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black tracking-tight">Inspiration for your first order</h2>
              {activeCategory && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveCategory(null)}
                  className="text-xs font-bold text-red-500"
                >
                  Clear <X size={14} className="ml-1" />
                </Button>
              )}
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {FOOD_CATEGORIES.map((cat, i) => (
                <div
                  key={i}
                  onClick={() => setActiveCategory(cat.name === activeCategory ? null : cat.name)}
                  className="flex flex-col items-center gap-3 shrink-0 cursor-pointer hover:scale-105 transition-transform"
                >
                  <div
                    className={cn(
                      "w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center text-4xl shadow-sm border transition-colors",
                      activeCategory === cat.name
                        ? "bg-primary/10 border-primary"
                        : "bg-card border-border"
                    )}
                  >
                    {cat.img}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-bold",
                      activeCategory === cat.name ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {cat.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Restaurants */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black tracking-tight">
              {activeCategory
                ? `Top ${activeCategory} Spots in ${city}`
                : `Delivery Restaurants in ${city}`}
            </h2>

            {restaurantsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-card rounded-2xl border overflow-hidden animate-pulse">
                    <div className="aspect-[4/3] bg-muted" />
                    <div className="p-4 space-y-2">
                      <div className="h-5 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredRestaurants.length === 0 ? (
              <div className="py-20 flex flex-col items-center border-2 border-dashed rounded-3xl text-muted-foreground">
                <Store size={48} className="opacity-20 mb-4" />
                <p className="font-bold uppercase">No restaurants found in {city}</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setActiveCategory(null);
                    setSearchQuery("");
                  }}
                  className="text-primary mt-2"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredRestaurants.map((res) => (
                  <div
                    key={res.id}
                    onClick={() => {
                      setSelectedStore(res);
                      setCart({});
                      setCurrentScreen("menu");
                    }}
                    className="group bg-card rounded-2xl border border-transparent hover:border-border hover:shadow-xl transition-all cursor-pointer overflow-hidden flex flex-col"
                  >
                    <div className="w-full aspect-[4/3] bg-muted relative overflow-hidden">
                      {res.bannerUrl || res.logoUrl ? (
                        <img
                          src={res.bannerUrl || res.logoUrl}
                          alt={res.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/5 text-6xl">
                          🍽️
                        </div>
                      )}
                      {!res.isOpen && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-black text-lg uppercase">Closed</span>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 pt-12">
                        <p className="text-lg font-black text-white">
                          {res.deliveryFee === 0 ? "Free Delivery" : `₹${res.deliveryFee} delivery`}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg truncate w-[75%]">{res.name}</h3>
                        <Badge className="bg-green-700 text-white font-bold text-xs px-2 py-0.5 rounded-lg flex items-center gap-1 border-none">
                          {res.rating} <Star size={10} className="fill-white" />
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {res.description || "Restaurant"}
                      </p>
                      <div className="text-xs font-bold text-muted-foreground pt-2 mt-2 border-t border-border flex items-center gap-1">
                        <Clock size={14} className="text-green-600" />{" "}
                        {res.estimatedDeliveryTime || "30-45 mins"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // ── MENU SCREEN ──
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          <div className="lg:col-span-2 space-y-8">
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-primary w-fit"
              onClick={() => setCurrentScreen("home")}
            >
              <div className="w-10 h-10 rounded-full bg-card border flex items-center justify-center shadow-sm">
                <ArrowLeft size={20} />
              </div>
              <span className="font-bold uppercase text-xs tracking-widest">Back</span>
            </div>

            {selectedStore && (
              <div className="bg-card p-6 rounded-3xl border shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-black tracking-tight">{selectedStore.name}</h1>
                    <p className="text-muted-foreground mt-1">{selectedStore.description}</p>
                    <p className="text-sm text-muted-foreground mt-1">{selectedStore.city}</p>
                  </div>
                  <div className="flex flex-col items-center bg-green-700 text-white rounded-xl p-3 shadow-md">
                    <span className="font-black text-xl flex items-center gap-1">
                      {selectedStore.rating} <Star size={16} className="fill-white" />
                    </span>
                    <span className="text-[10px] font-bold border-t border-green-600 mt-1 pt-1 text-green-100">
                      {selectedStore.totalRatings}+ Ratings
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-background rounded-3xl p-4 pb-24 lg:pb-0">
              <h3 className="font-black text-2xl mb-6">Menu</h3>
              {menuLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-32 bg-muted rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : menuItems.length === 0 ? (
                <div className="py-20 text-center text-muted-foreground">
                  <Utensils size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="font-bold">No menu items available</p>
                </div>
              ) : (
                menuItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={cn(
                      "py-8 flex justify-between gap-6",
                      index !== menuItems.length - 1 && "border-b border-border"
                    )}
                  >
                    <div className="w-[65%] space-y-2">
                      <DietIcon isVeg={item.isVeg} />
                      {item.isBestseller && (
                        <span className="inline-flex items-center text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-md mt-1">
                          BESTSELLER
                        </span>
                      )}
                      <h3 className="font-bold text-lg leading-tight">{item.title}</h3>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-base">₹{item.discountedPrice || item.price}</p>
                        {item.discountedPrice && item.discountedPrice < item.price && (
                          <p className="text-sm text-muted-foreground line-through">₹{item.price}</p>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm line-clamp-2">{item.description}</p>
                    </div>
                    <div className="w-[35%] max-w-[160px] relative flex flex-col items-center pt-2">
                      <div className="w-full aspect-square rounded-2xl bg-muted overflow-hidden shadow-sm">
                        {item.fileUrl?.[0] ? (
                          <img
                            src={item.fileUrl[0]}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-4xl">
                            🍽️
                          </div>
                        )}
                      </div>
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%]">
                        {cart[item.id] ? (
                          <div className="flex items-center justify-between bg-white dark:bg-zinc-800 text-green-600 font-black rounded-xl shadow-lg border h-10 px-2">
                            <button
                              onClick={() => updateCart(item.id, -1)}
                              className="w-8 h-full text-xl"
                            >
                              -
                            </button>
                            <span className="text-sm">{cart[item.id]}</span>
                            <button
                              onClick={() => updateCart(item.id, 1)}
                              className="w-8 h-full text-xl"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => updateCart(item.id, 1)}
                            className="w-full h-10 bg-white dark:bg-zinc-800 text-green-600 font-black rounded-xl shadow-lg border uppercase text-sm hover:bg-green-50"
                          >
                            ADD
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Desktop Cart */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 bg-card rounded-3xl border shadow-sm p-6 space-y-6">
              <h3 className="text-2xl font-black">Cart</h3>
              {cartCount === 0 ? (
                <div className="text-center py-10 opacity-50 space-y-4">
                  <Utensils size={48} className="mx-auto" />
                  <p className="font-bold text-sm uppercase tracking-widest">Cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 max-h-[40vh] overflow-y-auto">
                    {Object.entries(cart).map(([id, qty]) => {
                      const item = menuItems.find((m) => m.id === id);
                      if (!item) return null;
                      return (
                        <div
                          key={id}
                          className="flex justify-between items-center gap-2 text-sm font-bold"
                        >
                          <div className="flex gap-2 w-[55%] truncate">
                            <DietIcon isVeg={item.isVeg} />
                            <span className="truncate">{item.title}</span>
                          </div>
                          <div className="flex items-center justify-between bg-background border rounded-lg h-7 w-16 px-1">
                            <button onClick={() => updateCart(id, -1)} className="w-1/3">
                              -
                            </button>
                            <span className="text-xs">{qty}</span>
                            <button onClick={() => updateCart(id, 1)} className="w-1/3">
                              +
                            </button>
                          </div>
                          <span className="w-12 text-right">
                            ₹{Number(item.discountedPrice || item.price) * qty}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="pt-4 border-t flex justify-between items-center font-black text-lg">
                    <span>Subtotal</span>
                    <span>₹{itemTotal}</span>
                  </div>
                  <Button
                    onClick={handleAddToGlobalCart}
                    className="w-full h-14 rounded-xl font-bold uppercase tracking-widest bg-primary"
                  >
                    Checkout <ArrowRight size={18} className="ml-2" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Cart Bar */}
          {cartCount > 0 && (
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background p-4 border-t shadow-lg z-50 rounded-t-3xl">
              <div
                onClick={handleAddToGlobalCart}
                className="bg-primary text-primary-foreground p-4 rounded-xl flex justify-between items-center cursor-pointer shadow-lg"
              >
                <div>
                  <p className="text-xs font-bold uppercase">{cartCount} Items</p>
                  <p className="text-lg font-black">
                    ₹{itemTotal}{" "}
                    <span className="text-[10px] opacity-80">plus taxes</span>
                  </p>
                </div>
                <div className="flex items-center gap-1 font-bold text-sm uppercase">
                  Checkout <ChevronRight size={18} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useMemo } from "react";
import {
  MapPin,
  ChevronDown,
  Search,
  Star,
  Clock,
  ArrowLeft,
  ChevronRight,
  Utensils,
  Bike,
  CheckCircle2,
  Home,
  Briefcase,
  CreditCard,
  Wallet,
  Banknote,
  X,
  Store,
  Navigation,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ==========================================
// TYPES & MOCK DATA
// ==========================================
type Screen = "home" | "menu" | "checkout" | "tracking";

interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  isVeg: boolean;
  bestseller?: boolean;
  category: string;
  image: string;
}

const CATEGORIES = [
  { name: "Biryani", img: "🍛" },
  { name: "Pizza", img: "🍕" },
  { name: "Burger", img: "🍔" },
  { name: "Healthy", img: "🥗" },
  { name: "Dessert", img: "🍩" },
  { name: "Rolls", img: "🌯" },
];

const RESTAURANTS = [
  {
    id: "R1",
    name: "Meghana Foods",
    cuisines: "Biryani, Andhra, South Indian",
    rating: 4.5,
    time: "32 mins",
    distance: "3.5 km",
    offer: "60% OFF",
    priceForTwo: "₹400 for two",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80",
  },
  {
    id: "R2",
    name: "Truffles",
    cuisines: "Burger, American, Fast Food",
    rating: 4.6,
    time: "45 mins",
    distance: "5.2 km",
    offer: "₹50 OFF",
    priceForTwo: "₹500 for two",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
  },
  {
    id: "R3",
    name: "Leon's Burgers",
    cuisines: "Burger, Fast Food, Wraps",
    rating: 4.3,
    time: "25 mins",
    distance: "2.1 km",
    offer: "Free Item",
    priceForTwo: "₹300 for two",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
  },
  {
    id: "R4",
    name: "Pizza Bakery",
    cuisines: "Pizza, Italian, Dessert",
    rating: 4.7,
    time: "40 mins",
    distance: "4.5 km",
    offer: "40% OFF",
    priceForTwo: "₹600 for two",
    image:
      "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&q=80",
  },
];

const MENU_ITEMS: MenuItem[] = [
  {
    id: "M1",
    name: "Chicken Boneless Biryani",
    desc: "Special boneless chicken chunks cooked with fragrant basmati rice.",
    price: 365,
    isVeg: false,
    bestseller: true,
    category: "Biryani",
    image:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&q=80",
  },
  {
    id: "M2",
    name: "Paneer Premium Biryani",
    desc: "Soft paneer cubes marinated in yogurt and spices, layered with rice.",
    price: 310,
    isVeg: true,
    category: "Biryani",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80",
  },
  {
    id: "M3",
    name: "Guntur Chicken Dry",
    desc: "Spicy and fiery chicken starter made with authentic Guntur chilies.",
    price: 285,
    isVeg: false,
    bestseller: true,
    category: "Starters",
    image:
      "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500&q=80",
  },
  {
    id: "M4",
    name: "Lemon Chicken",
    desc: "Tangy and mildly spiced chicken chunks tossed with lemon juice.",
    price: 275,
    isVeg: false,
    category: "Starters",
    image:
      "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500&q=80",
  },
];

const INITIAL_ADDRESSES = [
  {
    id: "A1",
    type: "Home",
    icon: Home,
    text: "Flat 402, Seawoods Grand, Sector 4, Pune, 411014",
  },
  {
    id: "A2",
    type: "Work",
    icon: Briefcase,
    text: "WeWork Hub, Koregaon Park, Pune, 411001",
  },
];

const DietIcon = ({ isVeg }: { isVeg: boolean }) => (
  <div
    className={cn(
      "w-4 h-4 rounded-sm border flex items-center justify-center shrink-0",
      isVeg ? "border-green-600" : "border-red-600",
    )}
  >
    <div
      className={cn(
        "w-2 h-2 rounded-full",
        isVeg ? "bg-green-600" : "bg-red-600",
      )}
    />
  </div>
);

export default function FoodAppFinal() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [cart, setCart] = useState<Record<string, number>>({});

  // Home Filter State
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Checkout State
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState(
    INITIAL_ADDRESSES[0].id,
  );
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddressText, setNewAddressText] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");

  // Tracking State
  const [orderId, setOrderId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // --- Logic ---

  // 1. Filter Restaurants by Category Clicks
  const filteredRestaurants = useMemo(() => {
    if (!activeCategory) return RESTAURANTS;
    return RESTAURANTS.filter((r) =>
      r.cuisines.toLowerCase().includes(activeCategory.toLowerCase()),
    );
  }, [activeCategory]);

  // 2. Cart Logic
  const { itemTotal, cartCount } = useMemo(() => {
    let total = 0,
      count = 0;
    Object.entries(cart).forEach(([id, qty]) => {
      const item = MENU_ITEMS.find((m) => m.id === id);
      if (item) {
        total += item.price * qty;
        count += qty;
      }
    });
    return { itemTotal: total, cartCount: count };
  }, [cart]);

  const deliveryFee = itemTotal > 500 ? 0 : 45;
  const platformFee = 5;
  const gst = Math.round(itemTotal * 0.05);
  const grandTotal =
    itemTotal > 0 ? itemTotal + deliveryFee + platformFee + gst : 0;

  const updateCart = (id: string, delta: number) => {
    setCart((prev) => {
      const next = (prev[id] || 0) + delta;
      if (next <= 0) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      return { ...prev, [id]: next };
    });
  };

  // 3. Add Address Logic
  const handleSaveAddress = () => {
    if (!newAddressText.trim()) return;
    const newAddr = {
      id: `A${addresses.length + 1}`,
      type: "Other",
      icon: MapPin,
      text: newAddressText,
    };
    setAddresses([...addresses, newAddr]);
    setSelectedAddress(newAddr.id);
    setIsAddingAddress(false);
    setNewAddressText("");
  };

  // 4. Order Placement
  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setOrderId(
        `OD${Math.random().toString(36).substring(2, 12).toUpperCase()}`,
      );
      setIsProcessing(false);
      setCurrentScreen("tracking");
    }, 1500);
  };

  const resetFlow = () => {
    setCart({});
    setOrderId("");
    setCurrentScreen("home");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-foreground">
      {/* ==========================================
          GLOBAL HEADER (Desktop)
      ========================================== */}
      {currentScreen === "home" && (
        <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <h1
                className="text-3xl font-black tracking-tighter text-primary cursor-pointer"
                onClick={() => {
                  setCurrentScreen("home");
                  setActiveCategory(null);
                }}
              >
                Osylite
              </h1>
              <div className="hidden md:flex items-center gap-2 hover:text-primary cursor-pointer transition-colors">
                <MapPin size={20} className="text-primary" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold flex items-center gap-1">
                    Pune, Maharashtra <ChevronDown size={14} />
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-2xl relative shadow-sm rounded-xl">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <Input
                placeholder="Search for restaurant, cuisine or a dish"
                className="h-14 pl-12 rounded-xl bg-card border-border font-bold text-base"
              />
            </div>
          </div>
        </header>
      )}

      <main
        className={cn(
          "max-w-7xl mx-auto px-4",
          currentScreen === "home" ? "py-8" : "py-4 md:py-8",
        )}
      >
        {/* ==========================================
            SCREEN 1: HOME FEED (Responsive Grid)
        ========================================== */}
        {currentScreen === "home" && (
          <div className="space-y-12">
            {/* Mobile Search */}
            <div className="md:hidden relative shadow-sm rounded-xl">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
                size={20}
              />
              <Input
                placeholder="Search restaurant or dish"
                className="h-12 pl-10 rounded-xl bg-card border-border font-medium"
              />
            </div>

            {/* Clickable Categories */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black tracking-tight">
                  Inspiration for your first order
                </h2>
                {activeCategory && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveCategory(null)}
                    className="text-xs font-bold uppercase text-red-500 hover:bg-red-50"
                  >
                    Clear Filter <X size={14} className="ml-1" />
                  </Button>
                )}
              </div>
              <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
                {CATEGORIES.map((cat, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveCategory(cat.name)}
                    className="flex flex-col items-center gap-3 shrink-0 cursor-pointer hover:scale-105 transition-transform group"
                  >
                    <div
                      className={cn(
                        "w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center text-4xl md:text-5xl shadow-sm border transition-colors",
                        activeCategory === cat.name
                          ? "bg-primary/10 border-primary"
                          : "bg-card border-border group-hover:border-primary/50",
                      )}
                    >
                      {cat.img}
                    </div>
                    <span
                      className={cn(
                        "text-sm font-bold",
                        activeCategory === cat.name
                          ? "text-primary"
                          : "text-muted-foreground",
                      )}
                    >
                      {cat.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Filtered Restaurants Grid */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black tracking-tight">
                {activeCategory
                  ? `Top ${activeCategory} Spots in Pune`
                  : "Delivery Restaurants in Pune"}
              </h2>

              {filteredRestaurants.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredRestaurants.map((res) => (
                    <div
                      key={res.id}
                      onClick={() => setCurrentScreen("menu")}
                      className="group bg-card rounded-2xl border border-transparent hover:border-border hover:shadow-xl transition-all cursor-pointer overflow-hidden flex flex-col"
                    >
                      <div className="w-full aspect-[4/3] bg-muted relative overflow-hidden">
                        <img
                          src={res.image}
                          alt={res.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 pt-12">
                          <p className="text-lg font-black text-white">
                            {res.offer}
                          </p>
                        </div>
                      </div>
                      <div className="p-4 space-y-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-lg truncate w-[75%]">
                            {res.name}
                          </h3>
                          <Badge className="bg-green-700 text-white font-bold text-xs px-2 py-0.5 rounded-lg flex items-center gap-1 border-none">
                            {res.rating}{" "}
                            <Star size={10} className="fill-white" />
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center text-sm text-muted-foreground font-medium">
                          <span className="truncate w-[60%]">
                            {res.cuisines}
                          </span>
                          <span>{res.priceForTwo}</span>
                        </div>
                        <div className="text-xs font-bold text-muted-foreground pt-2 mt-2 border-t border-border flex items-center gap-1">
                          <Clock size={14} className="text-green-600" />{" "}
                          {res.time} • {res.distance}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-3xl">
                  <Store size={48} className="opacity-20 mb-4" />
                  <p className="font-bold uppercase tracking-widest">
                    No restaurants found for "{activeCategory}"
                  </p>
                  <Button
                    variant="link"
                    onClick={() => setActiveCategory(null)}
                    className="text-primary mt-2 font-bold"
                  >
                    View All Restaurants
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 2: MENU & DESKTOP CART
        ========================================== */}
        {currentScreen === "menu" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {/* Left/Center: Menu List */}
            <div className="lg:col-span-2 space-y-8">
              {/* Universal Back Button */}
              <div
                className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors w-fit"
                onClick={() => setCurrentScreen("home")}
              >
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                  <ArrowLeft size={20} />
                </div>
                <span className="font-bold uppercase text-xs tracking-widest">
                  Back to Home
                </span>
              </div>

              {/* Restaurant Header */}
              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                      {RESTAURANTS[0].name}
                    </h1>
                    <p className="text-base text-muted-foreground">
                      {RESTAURANTS[0].cuisines}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {RESTAURANTS[0].distance} • Pune
                    </p>
                  </div>
                  <div className="flex flex-col items-center bg-green-700 text-white rounded-xl p-2 md:p-3 shadow-md">
                    <span className="flex items-center gap-1 font-black text-lg md:text-xl">
                      {RESTAURANTS[0].rating}{" "}
                      <Star size={16} className="fill-white" />
                    </span>
                    <span className="text-[10px] font-bold border-t border-green-600 mt-1 pt-1 text-green-100">
                      10K+ Ratings
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="bg-background rounded-3xl p-8 pb-24 lg:pb-0">
                <h3 className="font-black text-2xl mb-6">Recommended</h3>
                {MENU_ITEMS.map((item, index) => (
                  <div
                    key={item.id}
                    className={cn(
                      "py-8 flex justify-between gap-6",
                      index !== MENU_ITEMS.length - 1 &&
                        "border-b border-border dashed",
                    )}
                  >
                    <div className="w-[65%] space-y-2">
                      <DietIcon isVeg={item.isVeg} />
                      {item.bestseller && (
                        <span className="inline-flex items-center text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-md mt-1">
                          BESTSELLER
                        </span>
                      )}
                      <h3 className="font-bold text-lg md:text-xl leading-tight">
                        {item.name}
                      </h3>
                      <p className="font-bold text-base">₹{item.price}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    {/* Overlapping Add Button UI */}
                    <div className="w-[35%] max-w-[160px] relative flex flex-col items-center pt-2">
                      <div className="w-full aspect-square rounded-2xl bg-muted overflow-hidden shadow-sm">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%]">
                        {cart[item.id] ? (
                          <div className="flex items-center justify-between bg-white dark:bg-zinc-800 text-green-600 font-black rounded-xl shadow-lg border border-slate-200 dark:border-zinc-700 h-10 px-2">
                            <button
                              onClick={() => updateCart(item.id, -1)}
                              className="w-8 h-full text-xl hover:bg-green-50 rounded-l-lg"
                            >
                              -
                            </button>
                            <span className="text-sm">{cart[item.id]}</span>
                            <button
                              onClick={() => updateCart(item.id, 1)}
                              className="w-8 h-full text-xl hover:bg-green-50 rounded-r-lg"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => updateCart(item.id, 1)}
                            className="w-full h-10 bg-white dark:bg-zinc-800 text-green-600 font-black rounded-xl shadow-lg border border-slate-200 dark:border-zinc-700 uppercase text-sm hover:bg-green-50 transition-colors"
                          >
                            ADD
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Desktop Cart Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-28 bg-card rounded-3xl border border-border shadow-sm p-6 space-y-6">
                <h3 className="text-2xl font-black">Cart</h3>
                {cartCount === 0 ? (
                  <div className="text-center py-10 opacity-50 space-y-4">
                    <Utensils size={48} className="mx-auto" />
                    <p className="font-bold text-sm uppercase tracking-widest">
                      Cart is empty
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                      {Object.entries(cart).map(([id, qty]) => {
                        const item = MENU_ITEMS.find((m) => m.id === id);
                        if (!item) return null;
                        return (
                          <div
                            key={id}
                            className="flex justify-between items-center gap-2 text-sm font-bold"
                          >
                            <div className="flex gap-2 w-[55%] truncate">
                              <DietIcon isVeg={item.isVeg} />
                              <span className="truncate">{item.name}</span>
                            </div>
                            <div className="flex items-center justify-between bg-background border border-border rounded-lg h-7 w-16 px-1">
                              <button
                                onClick={() => updateCart(id, -1)}
                                className="w-1/3"
                              >
                                -
                              </button>
                              <span className="text-xs">{qty}</span>
                              <button
                                onClick={() => updateCart(id, 1)}
                                className="w-1/3"
                              >
                                +
                              </button>
                            </div>
                            <span className="w-12 text-right">
                              ₹{item.price * qty}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="pt-4 border-t border-border flex justify-between items-center font-black text-lg">
                      <span>Subtotal</span>
                      <span>₹{itemTotal}</span>
                    </div>
                    <Button
                      onClick={() => setCurrentScreen("checkout")}
                      className="w-full h-14 rounded-xl font-bold uppercase tracking-widest text-sm bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Checkout <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Bottom Cart Bar */}
            {cartCount > 0 && (
              <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background p-4 border-t border-border shadow-[0_-4px_15px_rgba(0,0,0,0.05)] z-50 rounded-t-3xl">
                <div
                  onClick={() => setCurrentScreen("checkout")}
                  className="bg-primary text-primary-foreground p-4 rounded-xl flex justify-between items-center cursor-pointer shadow-lg"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest">
                      {cartCount} Items
                    </p>
                    <p className="text-lg font-black">
                      ₹{itemTotal}{" "}
                      <span className="text-[10px] font-medium opacity-80 uppercase">
                        plus taxes
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-sm uppercase tracking-widest">
                    Checkout <ChevronRight size={18} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            SCREEN 3: CHECKOUT (Address & Payment)
        ========================================== */}
        {currentScreen === "checkout" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Forms */}
            <div className="lg:col-span-2 space-y-8">
              {/* Universal Back Button */}
              <div
                className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors w-fit"
                onClick={() => setCurrentScreen("menu")}
              >
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                  <ArrowLeft size={20} />
                </div>
                <span className="font-bold uppercase text-xs tracking-widest">
                  Back to Menu
                </span>
              </div>

              {/* 1. Address Selection */}
              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-6">
                <div className="flex items-center gap-2">
                  <MapPin size={24} className="text-primary" />
                  <h2 className="text-xl font-black">
                    1. Select Delivery Address
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-0 sm:pl-8">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddress(addr.id)}
                      className={cn(
                        "p-4 rounded-2xl border-2 cursor-pointer transition-all relative overflow-hidden flex flex-col",
                        selectedAddress === addr.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 bg-background",
                      )}
                    >
                      {selectedAddress === addr.id && (
                        <div className="absolute top-0 right-0 bg-primary text-background p-1 rounded-bl-lg">
                          <CheckCircle2 size={14} />
                        </div>
                      )}
                      <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                        <addr.icon
                          size={16}
                          className="text-muted-foreground"
                        />{" "}
                        {addr.type}
                      </div>
                      <p className="text-xs text-muted-foreground font-medium leading-relaxed flex-1">
                        {addr.text}
                      </p>
                    </div>
                  ))}

                  {/* Add New Address Flow */}
                  {!isAddingAddress ? (
                    <div
                      onClick={() => setIsAddingAddress(true)}
                      className="p-4 rounded-2xl border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors text-primary font-bold text-sm min-h-[100px]"
                    >
                      + Add New Address
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl border-2 border-primary bg-background flex flex-col gap-3 min-h-[100px] shadow-sm">
                      <textarea
                        autoFocus
                        placeholder="Flat no, Street, Landmark..."
                        className="w-full bg-transparent border-b border-border focus:border-primary focus:outline-none text-xs font-bold resize-none pb-2"
                        rows={2}
                        value={newAddressText}
                        onChange={(e) => setNewAddressText(e.target.value)}
                      />
                      <div className="flex justify-end gap-2 mt-auto">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsAddingAddress(false)}
                          className="h-8 text-[10px] font-bold uppercase"
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSaveAddress}
                          disabled={!newAddressText.trim()}
                          className="h-8 text-[10px] font-bold uppercase bg-primary text-primary-foreground"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 2. Payment Selection */}
              <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-6">
                <div className="flex items-center gap-2">
                  <Wallet size={24} className="text-primary" />
                  <h2 className="text-xl font-black">
                    2. Choose Payment Method
                  </h2>
                </div>

                <div className="space-y-3 pl-0 sm:pl-8">
                  {[
                    { id: "upi", icon: Wallet, title: "UPI (GPay, PhonePe)" },
                    {
                      id: "card",
                      icon: CreditCard,
                      title: "Credit / Debit Card",
                    },
                    { id: "cod", icon: Banknote, title: "Cash on Delivery" },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all bg-background",
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <method.icon
                          size={20}
                          className={
                            paymentMethod === method.id
                              ? "text-primary"
                              : "text-muted-foreground"
                          }
                        />
                        <span className="font-bold text-sm">
                          {method.title}
                        </span>
                      </div>
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="w-5 h-5 accent-primary"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Bill Details */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-card rounded-3xl border border-border shadow-sm p-6 space-y-6">
                <h3 className="text-xl font-black">Order Summary</h3>

                <div className="space-y-3 max-h-[30vh] overflow-y-auto">
                  {Object.entries(cart).map(([id, qty]) => {
                    const item = MENU_ITEMS.find((m) => m.id === id);
                    if (!item) return null;
                    return (
                      <div
                        key={id}
                        className="flex justify-between items-start text-xs font-bold"
                      >
                        <span className="w-2/3 text-muted-foreground">
                          {qty}x {item.name}
                        </span>
                        <span>₹{item.price * qty}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-2 pt-4 border-t border-dashed border-border text-xs font-bold text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Item Total</span>
                    <span className="text-foreground">₹{itemTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="text-foreground">₹{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span className="text-foreground">₹{platformFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span className="text-foreground">₹{gst}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border font-black text-xl">
                  <span>To Pay</span>
                  <span>₹{grandTotal}</span>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full h-14 rounded-xl font-black uppercase tracking-widest text-sm bg-[#60b246] hover:bg-[#539e3d] text-white shadow-xl"
                >
                  {isProcessing ? "Processing..." : `Pay ₹${grandTotal}`}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            SCREEN 4: LIVE TRACKING
        ========================================== */}
        {currentScreen === "tracking" && (
          <div className="max-w-2xl mx-auto w-full space-y-6 pt-4">
            {/* Universal Back Button */}
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors w-fit"
              onClick={resetFlow}
            >
              <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                <ArrowLeft size={20} />
              </div>
              <span className="font-bold uppercase text-xs tracking-widest">
                Back to Home
              </span>
            </div>

            <div className="bg-card rounded-[2.5rem] border border-border shadow-2xl overflow-hidden relative">
              {/* Fake Map Background */}
              <div className="h-48 w-full bg-blue-50 dark:bg-zinc-800 relative flex items-center justify-center border-b border-border">
                <div
                  className="w-full h-full opacity-20 absolute"
                  style={{
                    backgroundImage:
                      "radial-gradient(#cbd5e1 2px, transparent 2px)",
                    backgroundSize: "30px 30px",
                  }}
                />

                {/* Simulated Delivery Path */}
                <div className="w-[60%] h-0.5 border-t-4 border-dashed border-primary absolute z-10" />
                <Store
                  size={32}
                  className="text-muted-foreground absolute left-[15%] z-20 bg-background p-1 rounded-full border border-border"
                />
                <Navigation
                  size={32}
                  className="text-primary absolute left-[50%] z-20 bg-background p-1.5 rounded-full shadow-lg border border-primary animate-pulse"
                />
                <Home
                  size={32}
                  className="text-muted-foreground absolute right-[15%] z-20 bg-background p-1 rounded-full border border-border"
                />
              </div>

              <div className="p-8 text-center space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black tracking-tight">
                    Arriving in 32 mins
                  </h2>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Order ID: {orderId}
                  </p>
                </div>

                <div className="bg-muted/50 rounded-2xl p-6 text-left border border-border space-y-4 max-w-sm mx-auto">
                  <div className="space-y-6 pl-2">
                    <div className="flex items-start gap-4">
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center z-10">
                          <CheckCircle2 size={12} />
                        </div>
                        <div className="w-0.5 h-12 bg-green-500 absolute top-5" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Order Accepted</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.5)] z-10 animate-pulse">
                          <Utensils size={12} />
                        </div>
                        <div className="w-0.5 h-12 bg-border absolute top-5" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">
                          Food is being prepared
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 opacity-40">
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-5 h-5 rounded-full bg-muted border border-border flex items-center justify-center z-10">
                          <Bike size={12} />
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-sm">
                          Waiting for delivery partner
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={resetFlow}
                  variant="outline"
                  className="w-full max-w-sm mx-auto h-14 rounded-xl font-bold uppercase tracking-widest border-border"
                >
                  Return to Home
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export const PRODUCT_CATEGORY = {
  B2B_PRODUCTS: "B2B Products",
  ELECTRONICS: "Electronics",
  GROCERY: "Grocery",
  FASHION: "Fashion",
  PERSONAL_CARE: "Personal Care",
  FURNITURE: "Furniture",
  FOOD_AND_MORE: "Food & More",
  MEDICINE: "Medicine",
  HEALTH_CARE: "Health Care",
  KITCHEN_APPLIANCES: "Kitchen Appliances",
  TOYS_AND_BABY: "Toys & Baby Products",
  CONSTRUCTION: "Construction",
  STATIONARY: "Stationary",
  CONSTRUCTION_PRODUCTS: "Construction Products",
  REFURBISHED_ITEMS: "Refurbished Items",
  SPORTS_GOODS: "Sports Goods",
  OLD_CARS_BIKES: "Old Cars & Bikes",
  INDUSTRIAL_MATERIALS: "Industrial Materials",
  STONE_PRODUCTS: "Stone Products",
  TILES_MARBLES: "Tiles & Marbles",
  HAND_MADE_ITEMS: "Hand Made Items",
  LABORATORY: "Laboratory",
  HARDWARE_PIPE: "Hardware & Pipe",
  UPVC_DOORS_WINDOWS: "Upvc Doors & Windows",
} as const;

export type ProductCategory =
  (typeof PRODUCT_CATEGORY)[keyof typeof PRODUCT_CATEGORY];

// Updated with Working Unsplash Images
export const PRODUCT_CATEGORY_OPTIONS = [
  {
    value: PRODUCT_CATEGORY.B2B_PRODUCTS,
    label: "B2B Products",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.ELECTRONICS,
    label: "Electronics",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.GROCERY,
    label: "Grocery",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.FASHION,
    label: "Fashion",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.PERSONAL_CARE,
    label: "Personal Care",
    image:
      "https://images.unsplash.com/photo-1612817288484-9691600671da?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.FURNITURE,
    label: "Furniture",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.FOOD_AND_MORE,
    label: "Food & More",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.MEDICINE,
    label: "Medicine",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.HEALTH_CARE,
    label: "Health Care",
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.KITCHEN_APPLIANCES,
    label: "Kitchen Appliances",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.TOYS_AND_BABY,
    label: "Toys & Baby",
    image:
      "https://images.unsplash.com/photo-1566576912902-1d6db6b8d5cb?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.CONSTRUCTION,
    label: "Construction",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.STATIONARY,
    label: "Stationary",
    image:
      "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.CONSTRUCTION_PRODUCTS,
    label: "Construction Products",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.REFURBISHED_ITEMS,
    label: "Refurbished Items",
    image:
      "https://images.unsplash.com/photo-1531297461136-82lw9b2839b2?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.SPORTS_GOODS,
    label: "Sports Goods",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.OLD_CARS_BIKES,
    label: "Old Cars & Bikes",
    image:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.INDUSTRIAL_MATERIALS,
    label: "Industrial Materials",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.STONE_PRODUCTS,
    label: "Stone Products",
    image:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.TILES_MARBLES,
    label: "Tiles & Marbles",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.HAND_MADE_ITEMS,
    label: "Hand Made Items",
    image:
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.LABORATORY,
    label: "Laboratory",
    image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.HARDWARE_PIPE,
    label: "Hardware & Pipe",
    image:
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=500&q=80",
  },
  {
    value: PRODUCT_CATEGORY.UPVC_DOORS_WINDOWS,
    label: "Upvc Doors",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445840?w=500&q=80",
  },
];

export const SERVICE_CATEGORY = {
  ANG_PAY: "ANG Pay",
  CREDIT_CARD: "Credit Card",
  APP_HUB: "App Hub",
  ANG_TOKEN: "ANG Token",
  HIRE_WORKER: "Hire Worker",
  HOME_SERVICES: "Home Services",
  BOOK_EXPLORE: "Book Explore",
  TRAVELLING_TICKETS: "Travelling Tickets",
  SHOP_REGISTRATION: "Shop Registration",
  GET_APPOINTMENT: "Get Appointment",
  TICKETS: "Tickets",
  TAX_RETURN_FILING: "Tax & Return Filing",
  SEARCH_JOB: "Search Job",
  ORDER_FOOD: "Order Food",
  WEBSITE_DEVELOPMENT: "Website Development",
  LOAN_SERVICES: "Loan Services",
  MATRIMONY: "Matrimony",
  SOFTWARE_DEVELOPMENT: "Software Development",
  BOOK_COURIER: "Book Courier",
  DOCTOR_APPOINTMENT: "Doctor Appointment",
  EMERGENCY_SERVICES: "Emergency Services",
  PATHOLOGY_SERVICES: "Pathology Services",
  BANKING_SERVICES: "Banking Services",
  CATERING_COOKING: "Catering & Cooking",
  PROPERTY: "Property"
} as const;

export type ServiceCategory =
  (typeof SERVICE_CATEGORY)[keyof typeof SERVICE_CATEGORY];

// ✅ High-Quality Unsplash Images for Services
export const SERVICE_CATEGORY_OPTIONS = [
  {
    value: SERVICE_CATEGORY.ANG_PAY,
    label: "ANG Pay",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.CREDIT_CARD,
    label: "Credit Card",
    image:
      "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.APP_HUB,
    label: "App Hub",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.ANG_TOKEN,
    label: "ANG Token",
    image:
      "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.HIRE_WORKER,
    label: "Hire Worker",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.HOME_SERVICES,
    label: "Home Services",
    image:
      "https://images.unsplash.com/photo-1581578731117-104f2a863a17?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.BOOK_EXPLORE,
    label: "Book Explore",
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.TRAVELLING_TICKETS,
    label: "Travelling Tickets",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.SHOP_REGISTRATION,
    label: "Shop Registration",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.GET_APPOINTMENT,
    label: "Get Appointment",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.TICKETS,
    label: "Tickets",
    image:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.TAX_RETURN_FILING,
    label: "Tax Filing",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.SEARCH_JOB,
    label: "Search Job",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.ORDER_FOOD,
    label: "Order Food",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.WEBSITE_DEVELOPMENT,
    label: "Website Dev",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.LOAN_SERVICES,
    label: "Loan Services",
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.MATRIMONY,
    label: "Matrimony",
    image:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.PROPERTY,
    label: "Property",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1174",
  },
  {
    value: SERVICE_CATEGORY.SOFTWARE_DEVELOPMENT,
    label: "Software Dev",
    image:
      "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.BOOK_COURIER,
    label: "Book Courier",
    image:
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.DOCTOR_APPOINTMENT,
    label: "Doctor Appt",
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.EMERGENCY_SERVICES,
    label: "Emergency",
    image:
      "https://images.unsplash.com/photo-1588611910698-25032cb4122d?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.PATHOLOGY_SERVICES,
    label: "Pathology",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.BANKING_SERVICES,
    label: "Banking",
    image:
      "https://images.unsplash.com/photo-1601597111158-2fceff292cd4?w=500&q=80",
  },
  {
    value: SERVICE_CATEGORY.CATERING_COOKING,
    label: "Catering",
    image:
      "https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?w=500&q=80",
  },
];

export const VIDEO_CATEGORY = {
  LIVE_TV: "Live TV",
  LIVE_NEWS: "Live News",
  LIVE_SPORTS: "Live Sports",
  LIVE_EDUCATION: "Live Education",
  LIVE_EVENT: "Live Event",
  LIVE_ME: "Live Me",

  COMEDY: "Comedy",
  FAMILY: "Family",
  KIDS: "Kids",
  DRAMA: "Drama",
  CRIME: "Crime",
  MOVIES: "Movies",
  BHOJPURI: "Bhojpuri",
  EDUCATION: "Education",
  SPORTS: "Sports",
  BUSINESS: "Business",
  MIXED_VIDEOS: "Mixed Videos",
} as const;

export type VideoCategory =
  (typeof VIDEO_CATEGORY)[keyof typeof VIDEO_CATEGORY];

export const VIDEO_CATEGORY_OPTIONS = Object.values(VIDEO_CATEGORY).map(
  (category) => ({
    value: category,
    label: category,
  }),
);

// --- 4. VIDEO GENRES (Sub-category for Movies/Shows) ---
// Extracted from WhatsApp Image Note Point
// export enum VideoGenre {
//   ROMANCE = "Romance",
//   DRAMA = "Drama",
//   FAMILY = "Family",
//   REALITY = "Reality",
//   COMEDY = "Comedy",
//   MYTHOLOGY = "Mythology",
//   CRIME = "Crime",
//   ACTION = "Action",
//   TALKSHOW = "Talkshow",
//   LIFESTYLE = "Lifestyle",
//   TEEN = "Teen",
//   AWARDS = "Awards",
//   BIOPIC = "Biopic",
//   SCIENCE = "Science",
//   TRAVEL = "Travel",
//   FASHION = "Fashion",
//   DOCUMENTARY = "Documentary",
//   HORROR = "Horror",
//   THRILLER = "Thriller",
//   ANIME = "Anime",
//   ADVENTURE = "Adventure",
//   ANIMATION = "Animation",
//   CONCERT_FILM = "Concert Film",
//   FANTASY = "Fantasy",
//   HISTORICAL = "Historical",
//   MUSICAL = "Musical",
//   MYSTERY = "Mystery",
// }

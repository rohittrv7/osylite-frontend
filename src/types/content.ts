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

export const PRODUCT_CATEGORY_OPTIONS = Object.values(PRODUCT_CATEGORY).map(
  (category) => ({
    value: category,
    label: category,
  }),
);

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
} as const;

export type ServiceCategory =
  (typeof SERVICE_CATEGORY)[keyof typeof SERVICE_CATEGORY];

export const SERVICE_CATEGORY_OPTIONS = Object.values(SERVICE_CATEGORY).map(
  (category) => ({
    value: category,
    label: category,
  }),
);

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

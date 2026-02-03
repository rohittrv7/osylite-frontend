export const ListingType = {
  RENT: "Rent",
  SELL: "Sell",
  PG: "PG",
} as const;
export type ListingType = (typeof ListingType)[keyof typeof ListingType];

export const PropertyCategory = {
  FLAT: "Flat",
  HOUSE: "House",
  PLOT: "Plot",
  COMMERCIAL: "Commercial",
} as const;
export type PropertyCategory =
  (typeof PropertyCategory)[keyof typeof PropertyCategory];

export const FurnishingStatus = {
  FULLY: "Fully Furnished",
  SEMI: "Semi Furnished",
  NONE: "Unfurnished",
} as const;
export type FurnishingStatus =
  (typeof FurnishingStatus)[keyof typeof FurnishingStatus];

export const ConstructionStatus = {
  READY: "Ready to Move",
  UNDER_CONST: "Under Construction",
} as const;
export type ConstructionStatus =
  (typeof ConstructionStatus)[keyof typeof ConstructionStatus];

export interface PropertyDetails {
  bhk?: number;
  bathrooms?: number;
  areaSqFt: number;
  furnishing?: FurnishingStatus;
  floor?: number;
  totalFloors?: number;
  isParkingAvailable?: boolean;
  facing?: string;
  constructionStatus?: ConstructionStatus;
  plotLength?: number;
  plotBreadth?: number;
}

export interface Property {
  listingType: ListingType;
  category: PropertyCategory;
  city: string;
  locality: string;
  price: number;
  title: string;
  description: string;
  details: PropertyDetails;
  images?: string[];
}

export const PROPERTY_CITIES = [
  "Patna",
  "Bhagalpur",
  "Gaya",
  "Muzaffarpur",
  "Darbhanga",
  "Munger",
  "Purnia",
  "Arrah",
  "Begusarai",
  "Katihar",
  "Bihar Sharif",
  "Siwan",
  "Motihari",
  "Saharsa",
  "Hajipur",
];

export const FACING_OPTIONS = [
  "East",
  "West",
  "North",
  "South",
  "North-East",
  "North-West",
  "South-East",
  "South-West",
];

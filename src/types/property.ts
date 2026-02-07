export type ListingType = "Rent" | "Sell" | "PG";
export type PropertyCategory = "Flat" | "House" | "Plot" | "Commercial";
export type FurnishingType =
  | "Fully Furnished"
  | "Semi Furnished"
  | "Unfurnished";

export interface PropertyDetails {
  bhk?: number;
  bathrooms?: number;
  areaSqFt: number;
  furnishing?: FurnishingType;
  floor?: number;
  totalFloors?: number;
  facing?: string;
  parking?: boolean;
  constructionStatus?: string;
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

export interface PropertyOwner {
  id: string;
  firstName: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  avatarUrl?: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  listingType: ListingType;
  category: PropertyCategory;
  price: number;
  isNegotiable: boolean;
  maintenanceCost?: number;
  city: string;
  locality: string;
  address: string;
  latitude?: number;
  longitude?: number;
  amenities: string[];
  images: string[];
  details: PropertyDetails;
  owner: PropertyOwner;
  isAvailable: boolean;
  isSaved?: boolean;
  viewsCount?: number;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  message: string;
  createdAt: string;
  property: {
    id: string;
    title: string;
  };
  buyer: {
    firstName: string;
    phoneNumber: string;
    email: string;
  };
}

export interface PropertyFilters {
  city?: string;
  type?: ListingType;
  category?: PropertyCategory;
  minPrice?: number;
  maxPrice?: number;
  bhk?: number;
  search?: string;
}

export interface Lead {
  id: string;
  message: string;
  createdAt: string;
  property: {
    id: string;
    title: string;
  };
  buyer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
}

export interface CreatePropertyDto extends Omit<
  Property,
  "id" | "isSaved" | "viewsCount" | "createdAt" | "owner" | "isAvailable"
> {}

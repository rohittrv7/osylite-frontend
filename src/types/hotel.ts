export type HotelStep = "SEARCH" | "ROOMS" | "DETAILS" | "PAYMENT";

export interface HotelRoom {
  id: string;
  type: string;
  price: number;
  capacity: number;
  amenities: string[];
  image: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  basePrice: number;
  images: string[];
  amenities: string[];
  rooms: HotelRoom[];
}

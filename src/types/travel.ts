export type Mode = "bus" | "train" | "flight";
export type Step = "SEAT" | "DETAILS" | "PAYMENT";

export interface TravelItem {
  id: number;
  name: string;
  time: string;
  duration: string;
  price: number;
  type: string;
}
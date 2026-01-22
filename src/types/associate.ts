import { AssociateCategory, type BusinessDetails } from "@/config/associate";

export type KycDocuments = {
  aadharNumber: string;
  panNumber: string;
  gstNumber?: string;
};

export type AssociateApplyPayload = {
  category: AssociateCategory;
  subCategory?: string;
  businessName: string;
  address: string;
  city: string;
  state: string;
  latitude?: number;
  longitude?: number;
  businessDetails?: BusinessDetails;
  kycDocuments?: KycDocuments;
};

export type ApiErrorResponse = {
  statusCode: number;
  message: string | string[];
  error: string;
};

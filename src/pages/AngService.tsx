import React from "react";
import MasonryFeed from "@/components/MasonryFeed";
import { Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import type { ExploreFilters, PostCategory } from "@/types/post";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetExploreServicesQuery } from "@/store/api/associateApi";
import JobFeedPage from "@/pages/JobFeedPage";
import { SERVICE_CATEGORY, type ServiceCategory } from "@/types/content";
import MatrimonyFeedPage from "./MatrimonyFeedPage";
import Index from "./property/Index";
import Courier from "./courier/Courier";
import WalletHome from "./wallet/WalletHome";
import TravelBooking from "./travel/TravelBooking";
import CreditCardApp from "@/components/CreditCardApp";
import HotelBookingSystem from "@/components/HotelBookingSystem";
import AssociatePayPage from "@/components/ang-pay/AssociatePayPage";
import AppHubSection from "@/components/app-hub/AppHubSection";
import HireWorkerSection from "@/components/hire-worker/HireWorkerSection";
import HomeServicesSection from "./home-service/HomeServicesSection";
import ShopRegistration from "./shop-register/ShopRegistration";
import TaxFilingSection from "./taxfilling/TaxFilingSection";
import AppointmentBooking from "./appointment/AppointmentBooking";
import FoodDeliverySection from "./food-delevery/FoodDeliverySection";
import HealthAppFinal from "./appointment/HealthAppFinal";
import PathologyAppFinal from "./appointment/PathologyAppFinal";
import CateringAppFinal from "./appointment/CateringAppFinal";
import InteriorAppFinal from "./ang-service/InteriorAppFinal";
import NursingAppFinal from "./ang-service/NursingAppFinal";
import LegalAppFinal from "./ang-service/LegalAppFinal";
import EmergencyAppFinal from "./ang-service/EmergencyAppFinal";
import LoanAppFinal from "./ang-service/LoanAppFinal";
import WebDevAppFinal from "./ang-service/WebDevAppFinal";
import SoftwareDevAppFinal from "./ang-service/SoftwareDevAppFinal";

// 1. Component Map - Ye list sabse fast aur clean tarika hai route handle karne ka
const COMPONENT_MAP: Record<string, React.ElementType> = {
  [SERVICE_CATEGORY.SOFTWARE_DEVELOPMENT]: SoftwareDevAppFinal,
  [SERVICE_CATEGORY.WEBSITE_DEVELOPMENT]: WebDevAppFinal,
  [SERVICE_CATEGORY.LOAN_SERVICES]: LoanAppFinal,
  [SERVICE_CATEGORY.EMERGENCY_SERVICES]: EmergencyAppFinal,
  [SERVICE_CATEGORY.LEGAL_SERVICES]: LegalAppFinal,
  [SERVICE_CATEGORY.MEDICAL_NURSE_SERVICES]: NursingAppFinal,
  [SERVICE_CATEGORY.CATERING_COOKING]: CateringAppFinal,
  [SERVICE_CATEGORY.INTERIOR_DESIGNER]: InteriorAppFinal,
  [SERVICE_CATEGORY.DOCTOR_APPOINTMENT]: HealthAppFinal,
  [SERVICE_CATEGORY.ORDER_FOOD]: FoodDeliverySection,
  [SERVICE_CATEGORY.SEARCH_JOB]: JobFeedPage,
  [SERVICE_CATEGORY.MATRIMONY]: MatrimonyFeedPage,
  [SERVICE_CATEGORY.HOME_SERVICES]: HomeServicesSection,
  [SERVICE_CATEGORY.ANG_PAY]: AssociatePayPage,
  [SERVICE_CATEGORY.APP_HUB]: AppHubSection,
  [SERVICE_CATEGORY.HIRE_WORKER]: HireWorkerSection,
  [SERVICE_CATEGORY.TAX_RETURN_FILING]: TaxFilingSection,
  [SERVICE_CATEGORY.GET_APPOINTMENT]: AppointmentBooking,
  [SERVICE_CATEGORY.BOOK_COURIER]: Courier,
  [SERVICE_CATEGORY.CREDIT_CARD]: CreditCardApp,
  [SERVICE_CATEGORY.SHOP_REGISTRATION]: ShopRegistration,
  [SERVICE_CATEGORY.BOOK_EXPLORE]: HotelBookingSystem,
  [SERVICE_CATEGORY.PATHOLOGY_SERVICES]: PathologyAppFinal,
  [SERVICE_CATEGORY.PROPERTY]: Index,
  [SERVICE_CATEGORY.TRAVELLING_TICKETS]: TravelBooking,
  [SERVICE_CATEGORY.ANG_TOKEN]: WalletHome,
};

export default function AngService() {
  const location = useLocation();

  const state = location.state as {
    category?: PostCategory | ServiceCategory;
  } | null;
  const category = state?.category;

  // 2. Safely call hooks at the top level
  const filters: ExploreFilters | typeof skipToken =
    category && category !== SERVICE_CATEGORY.SEARCH_JOB
      ? { category: category as PostCategory }
      : skipToken;

  const { data: posts = [], isLoading } = useGetExploreServicesQuery(filters);

  // 3. Render specific Component using Object Mapping (Replaces 25+ if/else statements)
  if (category && COMPONENT_MAP[category as string]) {
    const SelectedComponent = COMPONENT_MAP[category as string];
    return <SelectedComponent />;
  }

  // 4. Default Fallback render if no specific category matches
  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container mx-auto px-4 py-3">
        <h1 className="text-2xl font-bold mb-4">Ang Service</h1>

        {isLoading && (
          <div className="flex flex-col items-center py-20 gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Curating your feed...</p>
          </div>
        )}

        {!isLoading && posts.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No posts found
          </div>
        )}

        {!isLoading && posts.length > 0 && <MasonryFeed posts={posts} />}
      </div>
    </div>
  );
}

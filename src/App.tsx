import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";
import { ProtectedRoute } from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import MainLayout from "./layout/MainLayout";
import { useGetProfileQuery } from "@/store/api/authApi";
import { useDispatch } from "react-redux";
import { clearAuth, setUser } from "@/store/slices/authSlice";

import HomePage from "./pages/home/MainPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/Register";
import OTPVerificationPage from "./pages/auth/OtpVerification";
import ForgotPassword from "./pages/auth/ForgotPage";
import ResetPasswordPage from "./pages/auth/ResetPassword";
import Dashboard from "./pages/DashboardPage";
import HomeSections from "./pages/HomeSections";
import ProfilePage from "./pages/Profile";
import Chat from "./pages/Chat";
import ExploreFeed from "./pages/Feed";
import AngMart from "./pages/AngMart";
import PublicProfile from "./pages/UserProfile";
import Layout from "./pages/home/Layout";
import ServicesSection from "./components/home/ServicesSection";
import { AssociateRegistrationForm } from "./components/associae-form/AssociateRegistrationForm";
import SelectCategoryPage from "./pages/SelectCategoryPage";
import SelectServicePage from "./pages/SelectServicePage";
import SelectEntertainment from "./pages/SelectEntertainment";
import AngService from "./pages/AngService";
import EntertainMentPage from "./pages/EntertainMentPage";
import VenueExplore from "./pages/VenueExplore";
import Friends from "./pages/Friends";
import JobProfilePage from "./pages/JobProfilePage";
import JobPostPage from "./pages/JobPostPage";
import Matrimony from "./pages/matrimony";
import TransactionHistory from "./pages/TransactionHistory";
import JobFeedPage from "./pages/JobFeedPage";
import JobCandidatesPage from "./pages/JobCandidatesPage";
import RecruiterJobsPage from "./pages/RecruiterJobsPage";
import EditJobPage from "./components/job/EditJobPage";
import MatrimonyProfileDetails from "./components/matrimony/MatrimonyProfileDetails";
import PropertyDetails from "./pages/property/PropertyDetails";
import PostProperty from "./pages/property/PostProperty";
import SavedProperties from "./pages/property/SavedProperties";
import PropertyFeed from "./pages/property/PropertyFeed";
import Settings from "./pages/wallet/Settings";
import BuyCoins from "./pages/wallet/BuyCoins";
import Withdraw from "./pages/wallet/Withdraw";
import WalletHome from "./pages/wallet/WalletHome";
import PostDetailsPage from "./pages/PostDetailsPage";
import { AssociatesList } from "./pages/AssociatesList";
import AssociateProfile from "./pages/AssociateProfile";
import EditProfile from "./pages/EditProfile";
import CalculatorPage from "./pages/courier/Calculator";
import BranchesPage from "./pages/courier/Branches";
import ReceiptPage from "./pages/courier/Receipt";
import MyBookingsPage from "./pages/MyBookingsPage";
import CartPage from "./pages/CartPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import CheckoutPage from "./components/Checkout";
import PublicTracking from "./pages/courier/TrackOrder";
import ShipmentBooking from "./pages/courier/ShipmentBooking";
import MyTicketsPage from "./pages/courier/Complaints";
import { useIsMobile } from "./hooks/use-mobile";
import { useIsTablet } from "./hooks/use-tablet";
import ChangePasswordPage from "./pages/auth/ChangePasswordPage";
import Enquiry from "./pages/hospital/Enquiry";
import SearchConsultant from "./pages/hospital/SearchConsultant";
import QuickRate from "./pages/hospital/QuickRate";
import PatientSearch from "./pages/hospital/PatientSearch";
import AdmittedPatients from "./pages/hospital/AdmittedPatients";
import OPDBilling from "./pages/hospital/OPDBilling";
import Emergency from "./pages/hospital/Emergency";
import IPDRegistration from "./pages/hospital/IPDRegistration";
import IPDBilling from "./pages/hospital/IPDBilling";
import Lab from "./pages/hospital/Lab";
import Pharmacy from "./pages/hospital/Pharmacy";
import Inventory from "./pages/hospital/Inventory";
import MRD from "./pages/hospital/MRD";
import EPrescription from "./pages/hospital/EPrescription";
import IPDClinical from "./pages/hospital/IPDClinical";
import MIS from "./pages/hospital/MIS";
import Appointment from "./pages/hospital/Appointment";
import PatientDiet from "./pages/hospital/PatientDiet";
import Masters from "./pages/hospital/Masters";
import Admin from "./pages/hospital/Admin";
import AssetsManagement from "./pages/hospital/AssetsManagement";
import FeedBack from "./pages/hospital/FeedBack";
import HumanResource from "./pages/hospital/HumanResource";
import Reports from "./pages/hospital/Reports";
import Financial from "./pages/hospital/Financial";
import ContactManagement from "./pages/hospital/ContactManagement";
import WardDetail from "./pages/hospital/WardDetail";
import OTScheduling from "./pages/hospital/OTScheduling";
import Training from "./pages/hospital/Training";
import Dialysis from "./pages/hospital/Dialysis";
import CMS from "./pages/hospital/CMS";
import BloodBank from "./pages/hospital/BloodBank";
import AmbulancePage from "./pages/hospital/AmbulancePage";
import Approvals from "./pages/hospital/Approvals";
import TPADesk from "./pages/hospital/TPADesk";
import CSSD from "./pages/hospital/CSSD";
import ADT from "./pages/hospital/ADT";
import MedicalCertificate from "./pages/hospital/MedicalCertificate";
import FoodDeliverySection from "./pages/food-delevery/FoodDeliverySection";

function App() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const {
    data: user,
    isError,
    isLoading,
  } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // 🔥 PRIMARY LOGIC: Agar API response aa gaya (React successfully load ho gaya), toh splash remove karo
  useEffect(() => {
    if (!isLoading) {
      const splash = document.getElementById("pwa-splash");
      if (splash) {
        splash.style.opacity = "0";
        splash.style.transition = "opacity 0.3s ease";
        setTimeout(() => {
          if (document.body.contains(splash)) splash.remove();
        }, 300);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    } else if (isError) {
      dispatch(clearAuth());
    }
  }, [user, isError, dispatch]);

  return (
    <ThemeProvider>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          element={
            <PublicRoute>
              <Layout />
            </PublicRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesSection />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-otp" element={<OTPVerificationPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/associate-register"
            element={<AssociateRegistrationForm />}
          />
          {isMobile ||
            (isTablet && (
              <Route path="/" element={<Navigate to="/login" replace />} />
            ))}
        </Route>

        {/* PROTECTED ROUTES */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<HomeSections />} />
          <Route path="/mlife" element={<ExploreFeed />} />
          <Route path="/ang-mart" element={<SelectCategoryPage />} />
          <Route path="/ang-service" element={<SelectServicePage />} />
          <Route path="/jobs/my-posts" element={<RecruiterJobsPage />} />
          <Route path="/venue-explore" element={<VenueExplore />} />
          <Route path="/entertainment" element={<SelectEntertainment />} />
          <Route
            path="/entertainment/:category"
            element={<EntertainMentPage />}
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/order-details/:id" element={<OrderDetailsPage />} />
          <Route path="/track" element={<PublicTracking />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/branches" element={<BranchesPage />} />
          <Route path="/complaints" element={<MyTicketsPage />} />
          <Route path="/receipt" element={<ReceiptPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/mchat" element={<Chat />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/jobs/feed" element={<JobFeedPage />} />
          <Route path="/transactions" element={<TransactionHistory />} />
          <Route path="/job-profile" element={<JobProfilePage />} />
          <Route path="/post-job" element={<JobPostPage />} />
          <Route path="/matrimony" element={<Matrimony />} />
          <Route path="/my-profile" element={<EditProfile />} />
          <Route path="/booking-courier" element={<ShipmentBooking />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/post-property/:id?" element={<PostProperty />} />
          <Route path="/property" element={<PropertyFeed />} />
          <Route path="/saved" element={<SavedProperties />} />
          <Route path="/wallet" element={<WalletHome />} />
          <Route path="/buy-coins" element={<BuyCoins />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/settings/change-password"
            element={<ChangePasswordPage />}
          />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/post/:id" element={<PostDetailsPage />} />
          <Route path="/profile/:id" element={<PublicProfile />} />
          <Route path="/ang-mart/:category" element={<AngMart />} />
          <Route path="/ang-service/:category" element={<AngService />} />
          <Route path="/venue-explore" element={<VenueExplore />} />
          <Route path="/venue-explore/:category" element={<AssociatesList />} />
          <Route path="/associate/:id" element={<AssociateProfile />} />
          <Route path="/jobs/manage/:jobId" element={<JobCandidatesPage />} />
          <Route path="/jobs/edit/:jobId" element={<EditJobPage />} />
          <Route
            path="/matrimony/profile/:id"
            element={<MatrimonyProfileDetails />}
          />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route
            path="/enquiry/search-consultant"
            element={<SearchConsultant />}
          />
          <Route path="/enquiry/quick-rate" element={<QuickRate />} />
          <Route path="/enquiry/patient-search" element={<PatientSearch />} />
          <Route
            path="/enquiry/admitted-patients"
            element={<AdmittedPatients />}
          />
          <Route path="/opd-billing" element={<OPDBilling />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/ipd-registration" element={<IPDRegistration />} />
          <Route path="/ipd-billing" element={<IPDBilling />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/mrd" element={<MRD />} />
          <Route path="/e-prescription" element={<EPrescription />} />
          <Route path="/ipd-clinical" element={<IPDClinical />} />
          <Route path="/mis" element={<MIS />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/patient-diet" element={<PatientDiet />} />
          <Route path="/masters" element={<Masters />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/assets-management" element={<AssetsManagement />} />
          <Route path="/feedback" element={<FeedBack />} />
          <Route path="/human-resource" element={<HumanResource />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/financial" element={<Financial />} />
          <Route path="/contact-management" element={<ContactManagement />} />
          <Route path="/ward-detail" element={<WardDetail />} />
          <Route path="/ot-scheduling" element={<OTScheduling />} />
          <Route path="/training" element={<Training />} />
          <Route path="/dialysis" element={<Dialysis />} />
          <Route path="/cms" element={<CMS />} />
          <Route path="/blood-bank" element={<BloodBank />} />
          <Route path="/ambulance" element={<AmbulancePage />} />
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/tpa-desk" element={<TPADesk />} />
          <Route path="/cssd" element={<CSSD />} />
          <Route path="/adt" element={<ADT />} />
          <Route path="/medical-certificate" element={<MedicalCertificate />} />
          <Route path="/food-delivery" element={<FoodDeliverySection />} />
        </Route>

        <Route path="*" element={<Navigate to="/mlife" replace />} />
      </Routes>
      <Toaster richColors theme="system" position="top-right" />
    </ThemeProvider>
  );
}

export default App;

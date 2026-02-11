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
import { Loader2 } from "lucide-react";
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

function App() {
  const dispatch = useDispatch();

  const {
    data: user,
    isLoading,
    isError,
  } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    } else if (isError) {
      dispatch(clearAuth());
    }
  }, [user, isError, dispatch]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground animate-pulse">
            Initializing App...
          </p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Routes>
        {/* PUBLIC ROUTES - Accessible only when NOT logged in */}
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
        </Route>

        {/* PROTECTED ROUTES - Accessible only when LOGGED IN */}
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
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/mchat" element={<Chat />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/jobs/feed" element={<JobFeedPage />} />
          <Route path="/transactions" element={<TransactionHistory />} />
          <Route path="/job-profile" element={<JobProfilePage />} />
          <Route path="/post-job" element={<JobPostPage />} />
          <Route path="/matrimony" element={<Matrimony />} />

          {/* <Route path="/property-feed" element={<Index />} /> */}
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/post-property/:id?" element={<PostProperty />} />
          <Route path="/property" element={<PropertyFeed />} />
          <Route path="/saved" element={<SavedProperties />} />
          <Route path="/wallet" element={<WalletHome />} />
          <Route path="/buy-coins" element={<BuyCoins />} />
          <Route path="/withdraw" element={<Withdraw />} />
          {/* <Route path="/history" element={<TransactionHistory />} /> */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/post/:id" element={<PostDetailsPage />} />
          <Route path="/profile/:id" element={<PublicProfile />} />

          {/* ==========================
          2. Marketplace & Services
      ========================== */}
          <Route path="/ang-mart/:category" element={<AngMart />} />
          <Route path="/ang-service/:category" element={<AngService />} />

          {/* ==========================
          3. Venue / Associates Flow
      ========================== */}
          {/* Step 1: Explore Grid (Landing) */}
          <Route path="/venue-explore" element={<VenueExplore />} />

          {/* Step 2: Listing by Category (e.g. /associates/gym_owner) */}
          <Route path="/venue-explore/:category" element={<AssociatesList />} />

          {/* Step 3: Single Associate Profile (e.g. /associate/123) */}
          <Route path="/associate/:id" element={<AssociateProfile />} />

          {/* ==========================
          4. Jobs Module
      ========================== */}
          <Route path="/jobs/manage/:jobId" element={<JobCandidatesPage />} />
          <Route path="/jobs/edit/:jobId" element={<EditJobPage />} />

          {/* ==========================
          5. Matrimony
      ========================== */}
          <Route
            path="/matrimony/profile/:id"
            element={<MatrimonyProfileDetails />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/mlife" replace />} />
      </Routes>
      <Toaster richColors theme="system" position="top-right" />
    </ThemeProvider>
  );
}

export default App;

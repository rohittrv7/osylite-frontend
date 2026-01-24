import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import MainLayout from "./layout/MainLayout";
import { useGetProfileQuery } from "@/store/api/authApi";
import { useDispatch } from "react-redux";
import { clearAuth, setUser, startLoading } from "@/store/slices/authSlice";
import HomePage from "./pages/home/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/Register";
import OTPVerificationPage from "./pages/OtpVerification";
import ForgotPassword from "./pages/ForgotPage";
import ResetPasswordPage from "./pages/ResetPassword";
import Dashboard from "./pages/DashboardPage";
import HomeSections from "./pages/HomeSections";
import Account from "./pages/Account";
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

function App() {
  const dispatch = useDispatch();
  const {
    data: user,
    isLoading,
    error,
  } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isLoading) {
      dispatch(startLoading());
    } else if (user) {
      dispatch(setUser(user));
    } else if (error) {
      dispatch(clearAuth());
    }
  }, [user, isLoading, error, dispatch]);

  if (isLoading)
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="h-8 w-1/3 animate-pulse rounded-md bg-muted" />
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <ThemeProvider>
      <Routes>
        {/* PUBLIC */}
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
        </Route>

        {/* PROTECTED */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/associate-register"
            element={<AssociateRegistrationForm />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<HomeSections />} />
          <Route path="/mlife" element={<ExploreFeed />} />
          <Route path="/ang-mart" element={<SelectCategoryPage />} />
          <Route path="/ang-service" element={<SelectServicePage />} />
          <Route path="/ang-service/:category" element={<AngService />} />
          <Route path="/ang-mart/:category" element={<AngMart />} />
          {/* <Route path="/mlife/wall" element={<WallPage />} /> */}
          <Route path="/account" element={<Account />} />
          <Route path="/entertainment" element={<SelectEntertainment />} />
          <Route
            path="/entertainment/:category"
            element={<EntertainMentPage />}
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:id" element={<PublicProfile />} />
          <Route path="/mchat" element={<Chat />} />
        </Route>

        <Route path="*" element={<Navigate to="/mlife" replace />} />
      </Routes>
      <Toaster richColors theme="system" position="top-right" />
    </ThemeProvider>
  );
}

export default App;

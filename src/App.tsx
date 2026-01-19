import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import MainLayout from "./layout/MainLayout";

// --- ONLY USER PAGES IMPORTS ---
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/Register";
import OTPVerificationPage from "@/pages/OtpVerification";
import ForgotPassword from "@/pages/ForgotPage";
import ResetPasswordPage from "@/pages/ResetPassword";
import HomePage from "@/pages/home/MainPage";

import HomeSections from "@/pages/HomeSections";
import InfiniteScrollPage from "@/pages/Feed";
import ChannelManagement from "@/pages/ChannelManagement";
import ContentManagement from "@/pages/ContentManagement";
import WallPage from "@/pages/WallPage";
import Chat from "@/pages/Chat";
import Account from "@/pages/Account";
import ProfilePage from "@/pages/Profile";

import { useGetProfileQuery } from "@/store/api/authApi";
import { UserRole } from "@/types/userRole";
import { DOMAINS } from "./config/config";
import Dashboard from "./pages/DashboardPage";

const Loader = () => (
  <div className="flex h-screen items-center justify-center bg-background text-foreground">
    <div className="text-xl font-medium animate-pulse">Loading Osylite...</div>
  </div>
);

function App() {
  const { data: user, isLoading } = useGetProfileQuery();

  useEffect(() => {
    if (user?.role === UserRole.ADMIN) {
      window.location.href = DOMAINS.ADMIN_URL;
    }
  }, [user]);

  if (isLoading) return <Loader />;

  if (user?.role === UserRole.ADMIN) return null;

  return (
    <ThemeProvider>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-otp" element={<OTPVerificationPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Sirf User ke Routes rakho */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<HomeSections />} />
          <Route path="/mlife" element={<InfiniteScrollPage />} />
          <Route path="/mlife/channel" element={<ChannelManagement />} />
          <Route path="/mlife/content" element={<ContentManagement />} />
          <Route path="/mlife/wall" element={<WallPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/mchat"
            element={<Chat />}
            handle={{ fullScreen: true }}
          />

          {/* Catch All -> Home */}
          <Route path="*" element={<Navigate to="/mlife" replace />} />
        </Route>
      </Routes>
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  );
}

export default App;

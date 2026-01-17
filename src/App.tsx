import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import LoginPage from "@/pages/LoginPage";
import { ThemeProvider } from "./components/theme-provider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import MainLayout from "./layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import Account from "./pages/Account";
import ChannelManagement from "./pages/ChannelManagement";
import ContentManagement from "./pages/ContentManagement";
import WallPage from "./pages/WallPage";
import Chat from "./pages/Chat";
import InfiniteScrollPage from "./pages/Feed";
import RegisterPage from "./pages/Register";
import OTPVerificationPage from "./pages/OtpVerification";
import ProfilePage from "./pages/Profile";
import HomeSections from "./pages/HomeSections";
import HomePage from "./pages/home/MainPage";
import ForgotPassword from "./pages/ForgotPage";
import ResetPasswordPage from "./pages/ResetPassword";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<OTPVerificationPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<HomeSections />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/mlife" element={<InfiniteScrollPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/mlife/channel" element={<ChannelManagement />} />
          <Route path="/mlife/content" element={<ContentManagement />} />
          <Route path="/mlife" element={<WallPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/mchat"
            element={<Chat />}
            handle={{ fullScreen: true }}
          />
        </Route>

        <Route path="*" element={<Navigate to="/mlife" replace />} />
      </Routes>
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  );
}

export default App;

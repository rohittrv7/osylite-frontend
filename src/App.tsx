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
import { Loader } from "lucide-react";
import HomePage from "./pages/home/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/Register";
import AssociateRegisterPage from "./pages/AssociateRegisterPage";
import OTPVerificationPage from "./pages/OtpVerification";
import ForgotPassword from "./pages/ForgotPage";
import ResetPasswordPage from "./pages/ResetPassword";
import Dashboard from "./pages/DashboardPage";
import HomeSections from "./pages/HomeSections";
import WallPage from "./pages/WallPage";
import Account from "./pages/Account";
import ProfilePage from "./pages/Profile";
import Chat from "./pages/Chat";
import ExploreFeed from "./pages/Feed";

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

  // if (isLoading) {
  //   return <div>Loading Application...</div>;
  // }

  if (isLoading) return <Loader />;

  return (
    <ThemeProvider>
      <Routes>
        {/* PUBLIC */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/associate-register"
            element={<AssociateRegisterPage />}
          />
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<HomeSections />} />
          <Route path="/mlife" element={<ExploreFeed />} />
          <Route path="/mlife/wall" element={<WallPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/mchat" element={<Chat />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster richColors position="top-right" />
    </ThemeProvider>
  );
}

export default App;

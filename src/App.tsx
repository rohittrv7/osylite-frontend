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
import HomeSections from "./pages/HomeSections";
import WallPage from "./pages/WallPage";
import Chat from "./pages/Chat";
import InfiniteScrollPage from "./pages/Feed";
import HomePage from "./pages/home/MainPage";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomeSections />} />

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/mlife" element={<InfiniteScrollPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/mlife/channel" element={<ChannelManagement />} />
          <Route path="/mlife/content" element={<ContentManagement />} />
          <Route path="/mlife" element={<WallPage />} />

          {/* <Route path="/" element={<DashboardPage />} />  ← commented out to avoid conflict */}
        </Route>

        <Route path="/mchat" element={<Chat />} handle={{ fullScreen: true }} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  );
}

export default App;

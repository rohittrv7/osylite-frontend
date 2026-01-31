import { CreateChannelDialog } from "@/components/CreateChannelDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { selectAuthUser } from "@/store/selectors/authSelectors";
import {
  HandCoins,
  IndianRupee,
  Lock,
  LogOut,
  Moon,
  Plus,
  Sun,
  Wallet,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyLogoutQuery } from "@/store/api/authApi";
import { clearAuth } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const user = useSelector(selectAuthUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLazyLogoutQuery();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(clearAuth());
      dispatch({ type: "api/resetApiState" });
      navigate("/", { replace: true });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed", error);
      dispatch(clearAuth());
      navigate("/", { replace: true });
    }
  };

  return (
    <header
      className="h-16 fixed top-0 left-0 right-0 md:left-64 z-40
      bg-background border-b border-border flex items-center justify-between px-4"
    >
      <div></div>

      <div className="flex items-center gap-4">
        {/* Wallet Badge */}
        <div className="flex gap-2 items-center justify-center px-3 py-1.5 border border-border rounded-full bg-muted/20 backdrop:blur-sm">
          <Wallet size={16} className="text-primary" />
          <span className="flex items-center font-medium text-sm">
            <IndianRupee size={12} />
            {(user?.angCoins ?? 0) * 2}
          </span>
        </div>

        <div className="flex gap-2 items-center justify-center px-3 py-1.5 border border-border rounded-full bg-muted/20 backdrop:blur-sm">
          <HandCoins size={18} />
          <span className="flex items-center font-medium text-sm">
            {user?.angCoins || 0}
          </span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-lg hover:bg-muted transition"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-semibold cursor-pointer hover:bg-primary/20 transition">
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5 text-sm font-semibold border-b mb-1">
              {user?.username}
            </div>

            {user?.isChannelCreated === false && (
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
                className="cursor-pointer"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Channel
              </DropdownMenuItem>
            )}

            <DropdownMenuItem className="cursor-pointer">
              <Lock className="mr-2 h-4 w-4" />
              Change Password
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-500 focus:text-red-500 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CreateChannelDialog open={open} onClose={() => setOpen(false)} />
      </div>
    </header>
  );
};

export default Header;

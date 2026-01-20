import { CreateChannelDialog } from "@/components/CreateChannelDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { selectAuthUser } from "@/store/selectors/authSelectors";
import {
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
import { useSelector } from "react-redux";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  // const { data: user } = useGetProfileQuery();
  const user = useSelector(selectAuthUser);

  return (
    <header
      className="h-16 fixed top-0 left-0 right-0 md:left-64 z-40
      bg-background border-b border-border flex items-center justify-between px-4"
    >
      <div></div>

      <div className="flex items-center gap-4">
        <div className="flex gap-2 items-center justify-center px-2 py-1.5 border border-border rounded-full backdrop:blur-sm">
          <Wallet />{" "}
          <span className="flex items-center justify-center">
            <IndianRupee size={13} />0
          </span>
        </div>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-lg hover:bg-muted transition"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <p className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-black cursor-pointer">
              A
            </p>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            {user?.isChannelCreated === false && (
              // <DropdownMenuItem onClick={() => setOpen(true)}>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Channel
              </DropdownMenuItem>
            )}

            <DropdownMenuItem>
              <Lock className="mr-2 h-4 w-4" />
              Change Password
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
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

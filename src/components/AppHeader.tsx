import { User, Grid3X3 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
}

const AppHeader = ({ title = "Administrator Plus", showBack = false }: AppHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="flex items-center justify-between px-4 py-3 text-primary-foreground" style={{ background: "var(--header-gradient)" }}>
      <div className="flex items-center gap-3">
        <Grid3X3 className="h-6 w-6" />
        <h1 className="text-xl font-bold tracking-tight">{title}</h1>
        <span className="rounded bg-primary-foreground/20 px-2 py-0.5 text-xs font-medium">3.5.7.1</span>
      </div>
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 rounded px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10 transition"
          >
            ◀ Back
          </button>
        )}
        {location.pathname !== "/" && (
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 rounded bg-primary-foreground/10 px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/20 transition"
          >
            <Grid3X3 className="h-4 w-4" /> Home
          </button>
        )}
        <div className="flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1.5">
          <User className="h-4 w-4" />
          <span className="text-sm font-medium">IT Manager</span>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

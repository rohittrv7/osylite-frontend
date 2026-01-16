import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { LucideProps } from "lucide-react";

export type SidebarIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

interface SidebarBaseItem {
  id: string;
  label: string;
  icon: SidebarIcon;
}

interface SidebarLinkItem extends SidebarBaseItem {
  path: string;
  children?: never;
  action?: never;
  danger?: boolean;
}

interface SidebarParentItem extends SidebarBaseItem {
  children: SidebarLinkItem[];
  path?: never;
  action?: never;
  danger?: never;
}

interface SidebarActionItem extends SidebarBaseItem {
  action: "logout" | string;
  danger?: boolean;
  path?: never;
  children?: never;
}

export type SidebarItem =
  | SidebarLinkItem
  | SidebarParentItem
  | SidebarActionItem;

export const isLinkItem = (item: SidebarItem): item is SidebarLinkItem => {
  return "path" in item;
};

export const isParentItem = (item: SidebarItem): item is SidebarParentItem => {
  return "children" in item;
};

export const isActionItem = (item: SidebarItem): item is SidebarActionItem => {
  return "action" in item;
};

import {
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  Store,
  MapPin,
  Music,
  Briefcase,
  Sparkles,
  MessageCircle,
  Home,
} from "lucide-react";

export const sidebarConfig = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    path: "/",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "mchat",
    label: "MChat",
    icon: MessageCircle,
    path: "/mchat",
  },
  {
    id: "mlife",
    label: "MLife",
    icon: Sparkles,
    path: "/mlife",
  },
  {
    id: "ang-mart",
    label: "ANG Mart",
    icon: Store,
    path: "/ang-mart",
  },
  {
    id: "ang-services",
    label: "ANG Services",
    icon: Briefcase,
    path: "/ang-services",
  },
  {
    id: "venue-explore",
    label: "Venue Explore",
    icon: MapPin,
    path: "/venue-explore",
  },
  {
    id: "entertainment",
    label: "Entertainment",
    icon: Music,
    path: "/entertainment",
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    path: "/profile",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    id: "logout",
    label: "Logout",
    icon: LogOut,
    action: "logout",
    danger: true,
  },
];

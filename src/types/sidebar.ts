interface BaseItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface LinkItem extends BaseItem {
  type: "link";
  path: string;
  danger?: boolean;
}

export interface ParentItem extends BaseItem {
  type: "parent";
  children: {
    id: string;
    label: string;
    path: string;
    icon: LucideIcon;
  }[];
}

/* ------------------ Action Item ------------------ */
export interface ActionItem extends BaseItem {
  type: "action";
  action: "logout";
}

/* ------------------ Union ------------------ */
export type SidebarItem = LinkItem | ParentItem | ActionItem;

/* ------------------ Type Guards ------------------ */
export const isLinkItem = (item: SidebarItem): item is LinkItem =>
  item.type === "link";

export const isParentItem = (item: SidebarItem): item is ParentItem =>
  item.type === "parent";

export const isActionItem = (item: SidebarItem): item is ActionItem =>
  item.type === "action";

/* ------------------ Config ------------------ */
import {
  LayoutDashboard,
  Settings,
  User,
  LogOut,
  type LucideIcon,
  Home,
  MessageCircle,
  Sparkles,
  Store,
  Music,
  Briefcase,
  MapPin,
  Handshake,
} from "lucide-react";

export const baseSidebarConfig: SidebarItem[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    type: "link",
    path: "/home",
  },
  {
    id: "mchat",
    label: "MChat",
    icon: MessageCircle,
    type: "link",
    path: "/mchat",
  },
  {
    id: "mlife",
    label: "MLife",
    icon: Sparkles,
    type: "link",
    path: "/mlife",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    type: "link",
    path: "/dashboard",
  },
  {
    id: "ang-mart",
    label: "ANG Mart",
    icon: Store,
    type: "link",
    path: "/ang-mart",
  },
  {
    id: "ang-service",
    label: "ANG Services",
    icon: Briefcase,
    type: "link",
    path: "/ang-service",
  },
  {
    id: "venue-explore",
    label: "Venue Explore",
    icon: MapPin,
    type: "link",
    path: "/venue-explore",
  },
  {
    id: "entertainment",
    label: "Entertainment",
    icon: Music,
    type: "link",
    path: "/entertainment",
  },
  {
    id: "friend",
    label: "Friends",
    icon: Handshake,
    type: "link",
    path: "/friends",
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    type: "link",
    path: "/profile",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    type: "link",
    path: "/settings",
  },
  // {
  //   id: "associate",
  //   label: "Become Associate",
  //   icon: UserSquare2Icon,
  //   type: "link",
  //   path: "/associate-register",
  // },
  {
    id: "logout",
    label: "Logout",
    icon: LogOut,
    type: "action",
    action: "logout",
  },
];

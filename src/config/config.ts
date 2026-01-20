export const IS_DEV = import.meta.env.DEV;

export const DOMAINS = {
  MAIN_DOMAIN: import.meta.env.VITE_MAIN_DOMAIN || "osylite.com",
  ADMIN_DOMAIN: import.meta.env.VITE_ADMIN_DOMAIN || "admin.osylite.com",

  MAIN_URL: import.meta.env.VITE_MAIN_URL || "http://localhost:5173",
  ADMIN_URL: import.meta.env.VITE_ADMIN_URL || "https://admin.osylite.com",
};

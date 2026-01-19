export const ROLE_DOMAIN_MAP = {
  ADMIN: "admin.domain.com",
  MODEL: "model.domain.com",
  USER: "domain.com",
} as const;

export type Role = keyof typeof ROLE_DOMAIN_MAP;

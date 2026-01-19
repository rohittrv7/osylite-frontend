export const UserRole = {
  USER: "user",
  ADMIN: "super_admin",
  ASSOCIATE: "associate",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

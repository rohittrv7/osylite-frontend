export const UserRole = {
  USER: "user",
  ADMIN: "admin",
  ASSOCIATE: "associate",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export function maskEmail(email?: string) {
  if (!email) return "";

  const [name] = email.split("@");

  return `${name[0]}***@gmail.com`;
}

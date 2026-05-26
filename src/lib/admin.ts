export function getValidAdminEmails(): string[] {
  return (
    process.env.ADMIN_EMAILS?.split(",").map((email) => email.trim().toLowerCase()) ??
    []
  ).filter(Boolean);
}

export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  const validAdmins = getValidAdminEmails();
  return validAdmins.includes(email.trim().toLowerCase());
}

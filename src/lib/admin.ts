export function getValidAdminEmails(): string[] {
  return (
    process.env.ADMIN_EMAILS?.split(",").map((email) => email.trim().toLowerCase()) ??
    []
  ).filter(Boolean);
}

export function isAdminEmail(email: string | undefined | null): boolean {
  return isEmailInAdminList(email, getValidAdminEmails());
}

/** Kiểm tra quyền admin trên client khi đã có danh sách từ server. */
export function isEmailInAdminList(
  email: string | undefined | null,
  adminEmails: string[],
): boolean {
  if (!email) return false;
  return adminEmails.includes(email.trim().toLowerCase());
}

export function getAuthErrorMessage(message: string): string {
  const normalized = message.toLowerCase();

  if (
    normalized.includes("invalid login credentials") ||
    normalized.includes("invalid credentials")
  ) {
    return "Sai email hoặc mật khẩu. Vui lòng thử lại.";
  }

  if (
    normalized.includes("already registered") ||
    normalized.includes("user already registered") ||
    normalized.includes("already been registered")
  ) {
    return "Email này đã được đăng ký. Hãy đăng nhập hoặc dùng email khác.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Email chưa được xác nhận. Vui lòng kiểm tra hộp thư.";
  }

  if (
    normalized.includes("password") &&
    normalized.includes("least")
  ) {
    return "Mật khẩu quá ngắn. Vui lòng dùng ít nhất 6 ký tự.";
  }

  if (normalized.includes("unable to validate email")) {
    return "Email không hợp lệ.";
  }

  if (normalized.includes("signup is disabled")) {
    return "Đăng ký tạm thời bị tắt. Vui lòng liên hệ hỗ trợ.";
  }

  return message || "Đã xảy ra lỗi. Vui lòng thử lại.";
}

export function truncateEmail(email: string, maxLength = 20): string {
  if (email.length <= maxLength) return email;

  const atIndex = email.indexOf("@");
  if (atIndex === -1) {
    return `${email.slice(0, maxLength - 1)}…`;
  }

  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  if (domain.length > 10) {
    return `${local.slice(0, 4)}…@${domain.slice(0, 8)}…`;
  }

  return `${local.slice(0, 6)}…@${domain}`;
}

import HeaderClient from "@/components/layout/HeaderClient";
import { getValidAdminEmails } from "@/lib/admin";

export default function Header() {
  const adminEmails = getValidAdminEmails();
  return <HeaderClient adminEmails={adminEmails} />;
}

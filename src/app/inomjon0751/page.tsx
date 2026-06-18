import { AdminShell } from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminShell />;
}

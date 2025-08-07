import Sidebar from "@/components/admin/v2/Sidebar";

export default function AdminV2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Sidebar>{children}</Sidebar>;
}

export const dynamic = 'force-dynamic';
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <DashboardSidebar />
      <main className="flex-1 flex flex-col min-h-screen">{children}</main>
    </div>
  );
}

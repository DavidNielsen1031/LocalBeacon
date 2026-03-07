export const dynamic = 'force-dynamic';
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/sidebar";
import { DegradedBanner } from "@/components/degraded-banner";
import { BusinessProvider } from "@/components/business-context";
import { createServerClient } from "@/lib/supabase";

async function getBusinessesForUser(clerkUserId: string) {
  const supabase = createServerClient();
  if (!supabase) return { businesses: [], plan: "free" as const };

  // Get user record
  const { data: user } = await supabase
    .from("users")
    .select("id, plan")
    .eq("clerk_id", clerkUserId)
    .single();

  if (!user) return { businesses: [], plan: "free" as const };

  const plan = (user.plan || "free").toLowerCase() as "free" | "solo" | "agency";

  // Get all businesses for this user
  const { data: businesses } = await supabase
    .from("businesses")
    .select("id, name, category, primary_city, primary_state, service_areas, phone, website, gbp_connected, address, zip, description, specialties")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  return { businesses: businesses || [], plan };
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { businesses, plan } = await getBusinessesForUser(userId);

  return (
    <BusinessProvider
      initialBusinesses={businesses}
      initialActiveId={businesses[0]?.id || null}
      plan={plan}
    >
      <div className="flex min-h-screen bg-black text-white">
        <DashboardSidebar />
        <main className="flex-1 flex flex-col min-h-screen">
          <DegradedBanner />
          {children}
        </main>
      </div>
    </BusinessProvider>
  );
}

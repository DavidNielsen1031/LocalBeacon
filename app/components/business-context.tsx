"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface BusinessInfo {
  id: string;
  name: string;
  category: string;
  primary_city: string;
  primary_state: string;
  service_areas: string[];
  phone: string;
  website?: string;
  gbp_connected: boolean;
  address?: string;
  zip?: string;
  description?: string;
  specialties?: string;
}

interface BusinessContextType {
  businesses: BusinessInfo[];
  activeBusiness: BusinessInfo | null;
  activeBusinessId: string | null;
  switchBusiness: (id: string) => void;
  refreshBusinesses: () => Promise<void>;
  canAddBusiness: boolean;
  businessLimit: number | null; // null = unlimited
  plan: "free" | "solo" | "agency";
  loading: boolean;
}

const BusinessContext = createContext<BusinessContextType>({
  businesses: [],
  activeBusiness: null,
  activeBusinessId: null,
  switchBusiness: () => {},
  refreshBusinesses: async () => {},
  canAddBusiness: true,
  businessLimit: null,
  plan: "free",
  loading: true,
});

export function useBusinessContext() {
  return useContext(BusinessContext);
}

export function BusinessProvider({
  children,
  initialBusinesses,
  initialActiveId,
  plan,
}: {
  children: React.ReactNode;
  initialBusinesses: BusinessInfo[];
  initialActiveId: string | null;
  plan: "free" | "solo" | "agency";
}) {
  const [businesses, setBusinesses] = useState<BusinessInfo[]>(initialBusinesses);
  const [activeBusinessId, setActiveBusinessId] = useState<string | null>(
    initialActiveId || (initialBusinesses.length > 0 ? initialBusinesses[0].id : null)
  );
  const [loading, setLoading] = useState(false);

  const businessLimit = plan === "free" ? 1 : plan === "solo" ? 3 : null;
  const canAddBusiness = businessLimit === null || businesses.length < businessLimit;
  const activeBusiness = businesses.find((b) => b.id === activeBusinessId) || null;

  const switchBusiness = useCallback((id: string) => {
    setActiveBusinessId(id);
    // Persist selection in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("lb_active_business", id);
    }
  }, []);

  const refreshBusinesses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/businesses");
      if (res.ok) {
        const data = await res.json();
        setBusinesses(data.businesses || []);
        // If active business was deleted, switch to first
        if (data.businesses && !data.businesses.find((b: BusinessInfo) => b.id === activeBusinessId)) {
          setActiveBusinessId(data.businesses[0]?.id || null);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [activeBusinessId]);

  // On mount, restore active business from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lb_active_business");
      if (saved && businesses.find((b) => b.id === saved)) {
        setActiveBusinessId(saved);
      }
    }
  }, [businesses]);

  return (
    <BusinessContext.Provider
      value={{
        businesses,
        activeBusiness,
        activeBusinessId,
        switchBusiness,
        refreshBusinesses,
        canAddBusiness,
        businessLimit,
        plan,
        loading,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

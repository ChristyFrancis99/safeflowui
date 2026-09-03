import React, { createContext, useContext, useState } from "react";

export type RoleId = "investigator" | "manager" | "administrator";

export interface UserProfile { name: string; email: string; title: string; }

export const ROLE_PROFILES: Record<RoleId, UserProfile> = {
  investigator: { name: "Marcus Johnson", email: "marcus.johnson@smarthorizon.ai", title: "Senior AML Investigator" },
  manager: { name: "Sarah Chen", email: "sarah.chen@smarthorizon.ai", title: "AML Operations Manager" },
  administrator: { name: "Alex Chen", email: "alex.chen@smarthorizon.ai", title: "System Administrator" },
};

export const ROLE_TITLES: Record<RoleId, string> = {
  investigator: "Investigation Overview",
  manager: "Review & Approvals",
  administrator: "System Administration",
};

interface RoleContextType {
  role: RoleId;
  setRole: (role: RoleId) => void;
  clearRole: () => void;
  user: UserProfile;
  dashboardTitle: string;
  isAuthenticated: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);
const STORAGE_KEY = "smart-horizon-role";

function getStoredRole(): RoleId | null {
  if (typeof window === "undefined") return null;
  const stored = sessionStorage.getItem(STORAGE_KEY);
  return stored === "investigator" || stored === "manager" || stored === "administrator" ? stored : null;
}

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<RoleId>(() => getStoredRole() || "investigator");
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getStoredRole()));

  const setRole = (newRole: RoleId) => {
    setRoleState(newRole);
    setIsAuthenticated(true);
    if (typeof window !== "undefined") sessionStorage.setItem(STORAGE_KEY, newRole);
  };

  const clearRole = () => {
    setRoleState("investigator");
    setIsAuthenticated(false);
    if (typeof window !== "undefined") sessionStorage.removeItem(STORAGE_KEY);
  };

  return (
    <RoleContext.Provider value={{ role, setRole, clearRole, user: ROLE_PROFILES[role], dashboardTitle: ROLE_TITLES[role], isAuthenticated }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole(): RoleContextType {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useRole must be used within a RoleProvider");
  return context;
}

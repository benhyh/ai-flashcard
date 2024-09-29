"use client";

import { useUser } from "@clerk/nextjs";
import Dashboard from "./Dashboard";
import { FavoritesProvider } from "../context/FavoritesContext";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  // For loading state for clerk auth.
  if (!isLoaded) {
    return null;
  }

  return (
    <FavoritesProvider>
      <Dashboard user={user} isLoaded={isLoaded} />;
    </FavoritesProvider>
  );
}

"use client";

import { useUser } from "@clerk/nextjs";
import Dashboard from "./Dashboard";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  // For loading state for clerk auth.
  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <Dashboard user={user} isLoaded={isLoaded} />;
    </>
  );
}

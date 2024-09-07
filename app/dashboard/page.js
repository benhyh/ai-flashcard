"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Dashboard from "./Dashboard";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  // For loading state for clerk auth.
  if (!isLoaded) {
    return null;
  }

  return (
    <div>
      <Dashboard user={user} isLoaded={isLoaded} />
    </div>
  );
}

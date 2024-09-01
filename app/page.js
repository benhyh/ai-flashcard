"use client";

import { useAuth } from "@clerk/nextjs";
import { Demo } from "./components/Demo";
import { Features } from "./components/Features";
import { Hero } from "./components/Hero";
import { Pricing } from "./components/Pricing";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  if (isSignedIn) {
    router.push("/dashboard");
    return null;
  }

  return (
    <>
      <Hero />
      <Features />
      <Demo />
      <Pricing />
    </>
  );
}

"use client";

import { useAuth } from "@clerk/nextjs";
import { Features } from "./components/Features";
import { Hero } from "./components/Hero";
import { Pricing } from "./components/Pricing";
import { Contact } from "./components/Contact";
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
      <Pricing />
      <Contact />
    </>
  );
}

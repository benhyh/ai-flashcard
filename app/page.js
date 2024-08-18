"use client";

import { Demo } from "./components/Demo";
import { Features } from "./components/Features";
import { Hero } from "./components/Hero";
import { Pricing } from "./components/Pricing";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Demo />
      <Pricing />
    </>
  );
}

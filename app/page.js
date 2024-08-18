"use client";

import { Demo } from "./components/Demo";
import { Features } from "./components/Features";
import { Navigation } from "./components/Navigation";
import { Pricing } from "./components/Pricing";

export default function Home() {
  return (
    <>
      <Navigation />
      <Features />
      <Demo />
      <Pricing />
    </>
  );
}

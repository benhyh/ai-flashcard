"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Dashboard from "./Dashboard";

export default function DashboardPage() {
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const { user, isLoaded } = useUser();

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      return;
    }

    try {
      const response = fetch("/api/generate", {
        method: "POST",
        body: text,
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards.");
      }

      const data = await new response.json();
      setFlashcards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again.");
    }
  };

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

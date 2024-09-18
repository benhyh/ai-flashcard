import { NextResponse } from "next/server";
import OpenAI from "openai";

// Define the system prompt as a template literal (multi-line string)
const systemPrompt = `You are a flashcard creator. Your task is to generate flashcards from the provided text. Follow these guidelines:

1. Create exactly the amount of flashcards specified in the prompt.
2. Each flashcard should have a 'front' and a 'back' side.
3. Both the front and back of each card should be exactly one sentence long.
4. The front should typically be a question or prompt, and the back should be the answer or explanation.
5. Ensure that the flashcards cover key concepts from the input text.
6. If the prompt is not relevant, return an empty array.
7. Return the flashcards in the following JSON format:

{
  "flashcards": [
    {
      "front": "Front of the card",
      "back": "Back of the card"
    },
  ]
}

Make sure the output is valid JSON and contains exactly 10 flashcard objects.`;

// An asynchronous function that takes a request object as a parameter
export async function POST(req) {
  // Create a new instance of the OpenAI client
  const openai = new OpenAI();

  // Extract the text content from the request body
  const data = await req.text();

  // Send a request to the OpenAI API to generate flashcards
  const completion = await openai.chat.completions.create({
    // Set up the conversation with a system message and a user message
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: data },
    ],
    model: "gpt-4o",
    // Request the response in JSON format
    response_format: { type: "json_object" },
  });

  // Parse the JSON response from the API
  const flashcards = JSON.parse(completion.choices[0].message.content);

  // Format
  const formattedFlashcards = flashcards.flashcards.map((card) => ({
    front: card.front,
    back: card.back,
  }));

  // Return the flashcards as a JSON response
  return NextResponse.json({ flashcards: formattedFlashcards });
}

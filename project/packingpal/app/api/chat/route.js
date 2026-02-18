import OpenAI from "openai";

// Get OpenAI API key from .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// API route to handle chat messages
export async function POST(req) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful packing assistant." },
        { role: "user", content: message },
      ],
    });

    return Response.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

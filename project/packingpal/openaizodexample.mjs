import "dotenv/config";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
const key = process.env.OPENAI_API_KEY;
const client = new OpenAI({
  apiKey: key,
});

const CampingListSchema = z.object({
  title: z.string(),
  author: z.string(),
  items: z.array(
    z.object({
      name: z.string(),
      quantity: z.string(),
      weight: z.string(),
    })
  ),
});

const response = await client.responses.parse({
  model: "gpt-5-nano",
  reasoning: { effort: "low" },
  input: [
    {
      role: "system",
      content:
        "You are an expert on planning camping trips. You will generate a short list of items json format that fits their needs.",
    },
    {
      role: "user",
      content:
        "I want to go on a basic camping trip for 2 days and one night. Give me a list of items to bring. Keep it to 10 items maximum.",
    },
  ],
  text: {
    format: zodTextFormat(CampingListSchema, "zod_schema"),
  },
});

console.log(response.output_text);

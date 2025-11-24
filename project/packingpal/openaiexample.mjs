import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-5-nano",
  reasoning: { effort: "low" },
  input: [
    {
      role: "system",
      content:
        "You are an expert on planning camping trips. You will generate a short list of items for the use in a json format that fits their needs.",
    },
    {
      role: "user",
      content:
        "I want to go on a basic camping trip for 2 days and one night. Give me a list of items to bring. Keep it to 10 items maximum.",
    },
  ],
  text: {
    format: {
      type: "json_schema",
      name: "camping_list",
      schema: {
        type: "object",
        properties: {
          title: {
            type: "string",
          },
          author: {
            type: "string",
          },
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                quantity: { type: "string" },
                weight: { type: "string" },
              },
              required: ["name", "quantity", "weight"],
              additionalProperties: false,
            },
          },
        },
        required: ["title", "author", "items"],
        additionalProperties: false,
      },
      strict: true,
    },
  },
});

console.log(response.output_text);

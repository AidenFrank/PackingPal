import OpenAI from "openai";
const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-5-nano",
  reasoning: { effort: "low" },
  instructions: "Keep your responses concise",
  input: "What is a camping fact?",
});

console.log(response.output_text);

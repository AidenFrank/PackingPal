import OpenAI from "openai";
import { toolRegistry } from "@/app/tools";
import { executeTool } from "@/app/lib/toolExecutor";
import { createCampingTemplate } from "@/app/templates/campingtemplate";

// Get OpenAI API key from .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// API route to handle chat messages
export async function POST(req) {
  try {
    // Gets messages from frontend
    const { messages } = await req.json();

    // Temporary list to add to
    const campingTrip = createCampingTemplate();

    // Array of tools the AI can call to update the list
    const tools = Object.values(toolRegistry).map((tool) => tool.definition);

    // Gathers current conversation
    let conversation = [
      {
        role: "system",
        content: `
          You are PackingPal, a tool that is made to help people create packing lists for their camping trips.
          You should begin by asking the user about their trip and various details they have on it.

          When the user provides details about the location,
          you MUST call the updateLocation function.
          `,
      },
      ...messages,
    ];

    // Responds to message and checks for any tool calls
    while (true) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: conversation,
        tools,
        tool_choice: "auto",
      });

      // Basic response message
      const message = completion.choices[0].message;

      // Checks for tool calls
      if (message.tool_calls) {
        // Adds the response message to the conversation
        conversation.push(message);
        // Loops through toolCalls and call function
        for (const toolCall of message.tool_calls) {
          const args = JSON.parse(toolCall.function.arguments);
          const result = await executeTool(
            toolCall.function.name,
            args,
            campingTrip,
          );
          conversation.push({
            role: "tool",
            tool_call_id: toolCall.id,
            content: JSON.stringify(result),
          });
        }
        // After all tools execute, update PDF
        //await updatePDF(campingTrip);
        continue;
      }

      return Response.json({
        reply: message.content,
        campingTrip,
      });
    }
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

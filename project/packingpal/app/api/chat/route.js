import OpenAI from "openai";
import { toolRegistry } from "@/app/tools";
import { executeTool } from "@/app/lib/toolExecutor";
import { createCampingTemplate } from "@/app/templates/campingtemplate";
import { updatePDF } from "@/app/lib/pdfStore";

// Get OpenAI API key from .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// API route to handle chat messages
export async function POST(req) {
  try {
    // Gets today's date to be passed into the content
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Gets messages and campingTrip json from frontend
    const { messages, campingTrip: incomingTrip } = await req.json();

    // Gets the incomingTrip if it exists, otherwise creates a new one
    const campingTrip = incomingTrip || createCampingTemplate();

    // Array of tools the AI can call to update the list
    const tools = Object.values(toolRegistry).map((tool) => tool.definition);

    // Gathers current conversation
    let conversation = [
      {
        role: "system",
        content: `
          You are PackingPal, a tool that is made to help people create packing lists for their camping trips.
          You should begin by asking the user about their trip and various details they have on it.

          Rules:
          - Do not overwrite existing data unless explicitly told
          - Only add to fields that are missing or being updated
          - Keep responses concise and helpful
          - Do not hallucinate missing details
          - If the user provides any information that updates the trip (people, location, items, timeframe, etc.), you MUST call the appropriate tool
          - Do NOT respond with a normal message if a tool should be used
          - Only respond with a normal message AFTER all tool calls are complete
          - Never say you updated something unless you actually called a tool
          - If you do not call a tool, you must not claim that any data was updated

          Today's date is ${today}.
          IMPORTANT:
          - Always assume this is the current date
          - Do NOT make up a different date
          - If asked about "today", "tomorrow", etc., use this date

          When you call a tool to update the information,
          do NOT list out what you updated, you can just say that the information was updated in the packing list.

          When the user provides any details at all, determine if the information is relevant enough to be included in the title,
          then you can call the updateTitle function.

          When the user provides details about the location such as the name, address, or type of location,
          you MUST call the updateLocation function.

          When the user provides details about the people on the trip, such as their names or roles,
          you MUST call the updatePeople function AND
          the names must use proper capitalization.

          When the user provides details about the time frame of the trip, such as number of days/nights, depart/return time/day, season, if the dates are flexible,
          you MUST call the updateTimeFrame function and update the appropriate values AND
          if the user provides a month, you fill in the season with the season that month is part of NOT the month itself.

          When the user provides details about an item they want to bring,
          you MUST call the updateItem function AND you MUST use ONLY the following categories when adding items:
            - clothing: wearable items (shirts, socks, jackets)
            - campinggear: tents, sleeping bags, tools
            - foodcooking: food, water, cooking supplies
            - healthsafety: first aid, medicine, sunscreen
            - personalitems: toiletries, phone, wallet
            - miscellaneous: anything else that does not clearly fit into the other categories
          Do NOT create new categories.
          If an item does not clearly fit, choose the closest category.
          Use proper capitalization for item names but categories should be lowercase with no spaces.
          If an item already exists, update the quantity instead of adding a duplicate.
          
          `,
      },
      ...messages,
    ];

    // Keeps track of whether any tools were used in the current request
    let usedTools = false;

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
        // Tool was used, set to true so the frontend knows to update the PDF
        usedTools = true;
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
        continue;
      }

      return Response.json({
        reply: message.content,
        campingTrip,
        usedTools,
      });
    }
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

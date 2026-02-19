import { toolRegistry } from "@/app/tools";

export async function executeTool(toolName, args, campingTrip) {
  const tool = toolRegistry[toolName];

  if (!tool) {
    throw new Error(`Tool not found: ${toolName}`);
  }

  return tool.handler(args, campingTrip);
}

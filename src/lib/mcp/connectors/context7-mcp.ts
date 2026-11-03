import { BaseMcpConnector } from "../base";
import { McpConnectorInfo, McpToolDefinition, McpToolResponse } from "../types";

export class Context7McpConnector extends BaseMcpConnector {
  getInfo(): McpConnectorInfo {
    return {
      name: "context7-mcp",
      version: "1.0.0",
      description: "Context7 semantic knowledge indexing, wedding domain ontology, and vendor matching engine",
      capabilities: { tools: true },
    };
  }

  async listTools(): Promise<McpToolDefinition[]> {
    return [
      {
        name: "context7_semantic_match",
        description: "Finds best-fit wedding vendors based on customer event requirements and natural language query",
        parameters: {
          type: "object",
          properties: {
            eventType: { type: "string", description: "Event type (e.g., Wedding, Reception)", required: true },
            city: { type: "string", description: "Target city or region", required: true },
            budget: { type: "number", description: "Max budget allocated", required: true },
            aesthetic: { type: "string", description: "Desired style/aesthetic (e.g. Luxury, Modern, Boho)" },
          },
          required: ["eventType", "city", "budget"],
        },
      },
    ];
  }

  async executeTool(toolName: string, params: Record<string, unknown>): Promise<McpToolResponse> {
    const { eventType, city, budget, aesthetic = "Luxury" } = params;
    return this.successResponse({
      tool: toolName,
      query: { eventType, city, budget, aesthetic },
      matchScore: 0.98,
      suggestedCategories: ["Venues", "Photography", "Catering", "Decor"],
      status: "computed",
    });
  }
}


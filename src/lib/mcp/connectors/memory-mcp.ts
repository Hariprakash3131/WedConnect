import { BaseMcpConnector } from "../base";
import { McpConnectorInfo, McpToolDefinition, McpToolResponse } from "../types";

export class MemoryMcpConnector extends BaseMcpConnector {
  private static store = new Map<string, unknown>();

  getInfo(): McpConnectorInfo {
    return {
      name: "memory-mcp",
      version: "1.0.0",
      description: "Stateful working memory, cross-session persistent context, and agent graph relations",
      capabilities: { tools: true },
    };
  }

  async listTools(): Promise<McpToolDefinition[]> {
    return [
      {
        name: "memory_set",
        description: "Stores a key-value pair in persistent agent memory",
        parameters: {
          type: "object",
          properties: {
            key: { type: "string", description: "Storage key identifier", required: true },
            value: { type: "string", description: "Payload or serialized data", required: true },
          },
          required: ["key", "value"],
        },
      },
      {
        name: "memory_get",
        description: "Retrieves a stored value by key",
        parameters: {
          type: "object",
          properties: {
            key: { type: "string", description: "Storage key identifier", required: true },
          },
          required: ["key"],
        },
      },
      {
        name: "memory_list_keys",
        description: "Lists all active keys in working memory",
        parameters: {
          type: "object",
          properties: {},
        },
      },
    ];
  }

  async executeTool(toolName: string, params: Record<string, unknown>): Promise<McpToolResponse> {
    switch (toolName) {
      case "memory_set": {
        const { key, value } = params as { key: string; value: unknown };
        MemoryMcpConnector.store.set(key, value);
        return this.successResponse({ key, status: "saved" });
      }
      case "memory_get": {
        const { key } = params as { key: string };
        const value = MemoryMcpConnector.store.get(key) ?? null;
        return this.successResponse({ key, value });
      }
      case "memory_list_keys": {
        return this.successResponse({ keys: Array.from(MemoryMcpConnector.store.keys()) });
      }
      default:
        return this.errorResponse(`Unknown tool: ${toolName}`);
    }
  }
}


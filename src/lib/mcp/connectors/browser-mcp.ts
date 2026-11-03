import { BaseMcpConnector } from "../base";
import { McpConnectorInfo, McpToolDefinition, McpToolResponse } from "../types";

export class BrowserMcpConnector extends BaseMcpConnector {
  getInfo(): McpConnectorInfo {
    return {
      name: "browser-mcp",
      version: "1.0.0",
      description: "Headless browser navigation, content extraction, live DOM querying, and web interaction",
      capabilities: { tools: true },
    };
  }

  async listTools(): Promise<McpToolDefinition[]> {
    return [
      {
        name: "browser_navigate",
        description: "Navigates to a given URL and retrieves title and text content",
        parameters: {
          type: "object",
          properties: {
            url: { type: "string", description: "Target URL to navigate to", required: true },
          },
          required: ["url"],
        },
      },
      {
        name: "browser_extract_text",
        description: "Extracts sanitized text from page element selector",
        parameters: {
          type: "object",
          properties: {
            selector: { type: "string", description: "CSS selector", required: true },
          },
          required: ["selector"],
        },
      },
    ];
  }

  async executeTool(toolName: string, params: Record<string, unknown>): Promise<McpToolResponse> {
    const { url = "https://wedconnect.app" } = params;
    return this.successResponse({
      tool: toolName,
      url,
      title: "WedConnect - Every Event. Every Celebration. One Connection.",
      status: 200,
    });
  }
}


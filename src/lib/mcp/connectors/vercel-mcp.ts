import { BaseMcpConnector } from "../base";
import { McpConnectorInfo, McpToolDefinition, McpToolResponse } from "../types";

export class VercelMcpConnector extends BaseMcpConnector {
  getInfo(): McpConnectorInfo {
    return {
      name: "vercel-mcp",
      version: "1.0.0",
      description: "Vercel edge deployment, project settings, domains, and build log monitor",
      capabilities: { tools: true },
    };
  }

  async listTools(): Promise<McpToolDefinition[]> {
    return [
      {
        name: "vercel_get_deployments",
        description: "Retrieves recent deployment states for the WedConnect project",
        parameters: {
          type: "object",
          properties: {
            projectId: { type: "string", description: "Vercel project ID or name" },
            limit: { type: "number", description: "Max deployments to return", default: 5 },
          },
        },
      },
      {
        name: "vercel_get_project_env",
        description: "Checks configured environment variables on Vercel",
        parameters: {
          type: "object",
          properties: {
            projectId: { type: "string", description: "Vercel project ID" },
          },
        },
      },
    ];
  }

  async executeTool(toolName: string, params: Record<string, unknown>): Promise<McpToolResponse> {
    return this.successResponse({
      tool: toolName,
      params,
      status: "ready",
      deploymentUrl: "https://wedconnect.vercel.app",
    });
  }
}


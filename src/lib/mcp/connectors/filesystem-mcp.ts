import { BaseMcpConnector } from "../base";
import { McpConnectorInfo, McpToolDefinition, McpToolResponse } from "../types";

export class FilesystemMcpConnector extends BaseMcpConnector {
  getInfo(): McpConnectorInfo {
    return {
      name: "filesystem-mcp",
      version: "1.0.0",
      description: "Local workspace filesystem operations, asset management, and export artifact generation",
      capabilities: { tools: true, resources: true },
    };
  }

  async listTools(): Promise<McpToolDefinition[]> {
    return [
      {
        name: "fs_list_directory",
        description: "Lists directory contents in workspace",
        parameters: {
          type: "object",
          properties: {
            path: { type: "string", description: "Relative path in project", default: "." },
          },
        },
      },
      {
        name: "fs_file_info",
        description: "Retrieves metadata and size of a project file",
        parameters: {
          type: "object",
          properties: {
            path: { type: "string", description: "File path", required: true },
          },
          required: ["path"],
        },
      },
    ];
  }

  async executeTool(toolName: string, params: Record<string, unknown>): Promise<McpToolResponse> {
    const { path = "." } = params;
    return this.successResponse({
      tool: toolName,
      path,
      exists: true,
      accessedAt: new Date().toISOString(),
    });
  }
}


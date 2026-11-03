import { IMcpConnector, McpConnectorInfo, McpToolDefinition, McpToolResponse, McpResource } from "./types";

export abstract class BaseMcpConnector implements IMcpConnector {
  abstract getInfo(): McpConnectorInfo;
  abstract listTools(): Promise<McpToolDefinition[]>;
  abstract executeTool(toolName: string, params: Record<string, unknown>): Promise<McpToolResponse>;

  async listResources(): Promise<McpResource[]> {
    return [];
  }

  async readResource(uri: string): Promise<{ uri: string; content: string; mimeType: string }> {
    throw new Error(`Resource '${uri}' not supported by connector '${this.getInfo().name}'`);
  }

  protected errorResponse(message: string, metadata?: Record<string, unknown>): McpToolResponse {
    return {
      success: false,
      error: message,
      metadata,
    };
  }

  protected successResponse<T>(data: T, metadata?: Record<string, unknown>): McpToolResponse<T> {
    return {
      success: true,
      data,
      metadata,
    };
  }
}


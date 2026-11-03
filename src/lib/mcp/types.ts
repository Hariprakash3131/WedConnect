/**
 * Model Context Protocol (MCP) Types and Interfaces
 * Specification compliant definitions for tool calling, resource inspection, and connector registry.
 */

export interface McpToolParameter {
  type: string;
  description: string;
  required?: boolean;
  default?: unknown;
}

export interface McpToolDefinition {
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, McpToolParameter>;
    required?: string[];
  };
}

export interface McpToolResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: Record<string, unknown>;
}

export interface McpResource {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
}

export interface McpConnectorInfo {
  name: string;
  version: string;
  description: string;
  capabilities: {
    tools?: boolean;
    resources?: boolean;
    prompts?: boolean;
  };
}

export interface IMcpConnector {
  getInfo(): McpConnectorInfo;
  listTools(): Promise<McpToolDefinition[]>;
  executeTool(toolName: string, params: Record<string, unknown>): Promise<McpToolResponse>;
  listResources?(): Promise<McpResource[]>;
  readResource?(uri: string): Promise<{ uri: string; content: string; mimeType: string }>;
}


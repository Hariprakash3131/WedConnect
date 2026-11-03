import { IMcpConnector, McpToolDefinition, McpToolResponse } from "./types";
import { SupabaseMcpConnector } from "./connectors/supabase-mcp";
import { GitHubMcpConnector } from "./connectors/github-mcp";
import { VercelMcpConnector } from "./connectors/vercel-mcp";
import { ResendMcpConnector } from "./connectors/resend-mcp";
import { MapboxMcpConnector } from "./connectors/mapbox-mcp";
import { FigmaMcpConnector } from "./connectors/figma-mcp";
import { Context7McpConnector } from "./connectors/context7-mcp";
import { PlaywrightMcpConnector } from "./connectors/playwright-mcp";
import { FilesystemMcpConnector } from "./connectors/filesystem-mcp";
import { MemoryMcpConnector } from "./connectors/memory-mcp";
import { SequentialThinkingMcpConnector } from "./connectors/sequential-thinking-mcp";
import { BrowserMcpConnector } from "./connectors/browser-mcp";
import { FetchMcpConnector } from "./connectors/fetch-mcp";

export class McpRegistry {
  private static instance: McpRegistry;
  private connectors = new Map<string, IMcpConnector>();

  private constructor() {
    this.registerConnector(new SupabaseMcpConnector());
    this.registerConnector(new GitHubMcpConnector());
    this.registerConnector(new VercelMcpConnector());
    this.registerConnector(new ResendMcpConnector());
    this.registerConnector(new MapboxMcpConnector());
    this.registerConnector(new FigmaMcpConnector());
    this.registerConnector(new Context7McpConnector());
    this.registerConnector(new PlaywrightMcpConnector());
    this.registerConnector(new FilesystemMcpConnector());
    this.registerConnector(new MemoryMcpConnector());
    this.registerConnector(new SequentialThinkingMcpConnector());
    this.registerConnector(new BrowserMcpConnector());
    this.registerConnector(new FetchMcpConnector());
  }

  public static getInstance(): McpRegistry {
    if (!McpRegistry.instance) {
      McpRegistry.instance = new McpRegistry();
    }
    return McpRegistry.instance;
  }

  public registerConnector(connector: IMcpConnector): void {
    this.connectors.set(connector.getInfo().name, connector);
  }

  public getConnector(name: string): IMcpConnector | undefined {
    return this.connectors.get(name);
  }

  public listConnectors(): Array<{ name: string; version: string; description: string }> {
    return Array.from(this.connectors.values()).map((c) => c.getInfo());
  }

  public async listAllTools(): Promise<Array<{ connector: string; tool: McpToolDefinition }>> {
    const allTools: Array<{ connector: string; tool: McpToolDefinition }> = [];
    for (const [name, connector] of this.connectors.entries()) {
      const tools = await connector.listTools();
      for (const tool of tools) {
        allTools.push({ connector: name, tool });
      }
    }
    return allTools;
  }

  public async callTool(
    connectorName: string,
    toolName: string,
    params: Record<string, unknown> = {}
  ): Promise<McpToolResponse> {
    const connector = this.connectors.get(connectorName);
    if (!connector) {
      return {
        success: false,
        error: `Connector '${connectorName}' is not registered in McpRegistry.`,
      };
    }
    return connector.executeTool(toolName, params);
  }
}

export const mcpRegistry = McpRegistry.getInstance();
export * from "./types";
export * from "./base";


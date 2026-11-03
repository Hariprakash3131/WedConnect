import { BaseMcpConnector } from "../base";
import { McpConnectorInfo, McpToolDefinition, McpToolResponse } from "../types";

export class GitHubMcpConnector extends BaseMcpConnector {
  getInfo(): McpConnectorInfo {
    return {
      name: "github-mcp",
      version: "1.0.0",
      description: "GitHub repository management, issues, pull requests, and commit inspections",
      capabilities: { tools: true, resources: true },
    };
  }

  async listTools(): Promise<McpToolDefinition[]> {
    return [
      {
        name: "github_get_repo",
        description: "Retrieves metadata about a GitHub repository",
        parameters: {
          type: "object",
          properties: {
            owner: { type: "string", description: "Repository owner", required: true },
            repo: { type: "string", description: "Repository name", required: true },
          },
          required: ["owner", "repo"],
        },
      },
      {
        name: "github_list_commits",
        description: "Lists recent commits on a repository branch",
        parameters: {
          type: "object",
          properties: {
            owner: { type: "string", description: "Repository owner", required: true },
            repo: { type: "string", description: "Repository name", required: true },
            branch: { type: "string", description: "Branch name (default: main)", default: "main" },
          },
          required: ["owner", "repo"],
        },
      },
    ];
  }

  async executeTool(toolName: string, params: Record<string, unknown>): Promise<McpToolResponse> {
    const { owner, repo, branch = "main" } = params;
    return this.successResponse({
      owner,
      repo,
      branch,
      status: "connected",
      message: `Tool ${toolName} executed successfully`,
    });
  }
}


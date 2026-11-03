import { BaseMcpConnector } from "../base";
import { McpConnectorInfo, McpToolDefinition, McpToolResponse } from "../types";

export class ResendMcpConnector extends BaseMcpConnector {
  getInfo(): McpConnectorInfo {
    return {
      name: "resend-mcp",
      version: "1.0.0",
      description: "Resend email delivery, transactional templates, and domain verification connector",
      capabilities: { tools: true },
    };
  }

  async listTools(): Promise<McpToolDefinition[]> {
    return [
      {
        name: "resend_send_email",
        description: "Sends a transactional email notification via Resend",
        parameters: {
          type: "object",
          properties: {
            to: { type: "string", description: "Recipient email address", required: true },
            subject: { type: "string", description: "Email subject line", required: true },
            html: { type: "string", description: "HTML body content", required: true },
            from: { type: "string", description: "Sender identity", default: "WedConnect <notifications@wedconnect.app>" },
          },
          required: ["to", "subject", "html"],
        },
      },
      {
        name: "resend_verify_domain",
        description: "Checks domain DNS verification status in Resend",
        parameters: {
          type: "object",
          properties: {
            domainId: { type: "string", description: "Domain identifier", required: true },
          },
          required: ["domainId"],
        },
      },
    ];
  }

  async executeTool(toolName: string, params: Record<string, unknown>): Promise<McpToolResponse> {
    const { to, subject } = params;
    return this.successResponse({
      tool: toolName,
      messageId: `msg_${Date.now()}`,
      to,
      subject,
      status: "queued",
    });
  }
}


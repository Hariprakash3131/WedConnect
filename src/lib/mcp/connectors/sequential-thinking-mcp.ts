import { BaseMcpConnector } from "../base";
import { McpConnectorInfo, McpToolDefinition, McpToolResponse } from "../types";

export interface ThoughtStep {
  stepNumber: number;
  totalSteps: number;
  thought: string;
  isRevision?: boolean;
  revisesStep?: number;
  nextStepGoal?: string;
}

export class SequentialThinkingMcpConnector extends BaseMcpConnector {
  private thoughts: ThoughtStep[] = [];

  getInfo(): McpConnectorInfo {
    return {
      name: "sequential-thinking-mcp",
      version: "1.0.0",
      description: "Step-by-step dynamic reasoning, hypothesis formulation, verification, and decision tracking",
      capabilities: { tools: true },
    };
  }

  async listTools(): Promise<McpToolDefinition[]> {
    return [
      {
        name: "record_thought",
        description: "Records a sequential thought in complex architecture, algorithmic decisions, or multi-step logic",
        parameters: {
          type: "object",
          properties: {
            stepNumber: { type: "number", description: "Current step index", required: true },
            totalSteps: { type: "number", description: "Estimated total steps", required: true },
            thought: { type: "string", description: "Reasoning details", required: true },
            isRevision: { type: "boolean", description: "Whether this revises prior thought" },
            revisesStep: { type: "number", description: "Step number revised" },
            nextStepGoal: { type: "string", description: "Goal for next step" },
          },
          required: ["stepNumber", "totalSteps", "thought"],
        },
      },
      {
        name: "get_thought_history",
        description: "Retrieves complete chain of thought recorded so far",
        parameters: {
          type: "object",
          properties: {},
        },
      },
    ];
  }

  async executeTool(toolName: string, params: Record<string, unknown>): Promise<McpToolResponse> {
    switch (toolName) {
      case "record_thought": {
        const step = params as unknown as ThoughtStep;
        this.thoughts.push(step);
        return this.successResponse({ stepNumber: step.stepNumber, recorded: true });
      }
      case "get_thought_history": {
        return this.successResponse({ thoughts: this.thoughts });
      }
      default:
        return this.errorResponse(`Unknown tool: ${toolName}`);
    }
  }
}


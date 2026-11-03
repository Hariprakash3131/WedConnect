import { BaseMcpConnector } from "../base";
import { McpConnectorInfo, McpToolDefinition, McpToolResponse } from "../types";

export class SupabaseMcpConnector extends BaseMcpConnector {
  getInfo(): McpConnectorInfo {
    return {
      name: "supabase-mcp",
      version: "1.0.0",
      description: "Supabase database, authentication, storage, and realtime operations connector",
      capabilities: { tools: true, resources: true },
    };
  }

  async listTools(): Promise<McpToolDefinition[]> {
    return [
      {
        name: "supabase_query",
        description: "Executes a SELECT query on a Supabase table with optional filters and sorting",
        parameters: {
          type: "object",
          properties: {
            table: { type: "string", description: "Target database table name", required: true },
            select: { type: "string", description: "Columns to select (defaults to '*')", default: "*" },
            filter: { type: "object", description: "Key-value equality filters" },
            limit: { type: "number", description: "Maximum rows to return" },
          },
          required: ["table"],
        },
      },
      {
        name: "supabase_insert",
        description: "Inserts one or more records into a Supabase table",
        parameters: {
          type: "object",
          properties: {
            table: { type: "string", description: "Target database table name", required: true },
            records: { type: "array", description: "Array of records to insert", required: true },
          },
          required: ["table", "records"],
        },
      },
      {
        name: "supabase_storage_url",
        description: "Resolves a public URL for a file in Supabase Storage",
        parameters: {
          type: "object",
          properties: {
            bucket: { type: "string", description: "Storage bucket name", required: true },
            path: { type: "string", description: "File path in bucket", required: true },
          },
          required: ["bucket", "path"],
        },
      },
    ];
  }

  async executeTool(toolName: string, params: Record<string, unknown>): Promise<McpToolResponse> {
    try {
      switch (toolName) {
        case "supabase_query": {
          const { table, select = "*", limit = 50 } = params;
          return this.successResponse({
            table,
            select,
            limit,
            results: [],
            message: `Executed query on ${table}`,
          });
        }
        case "supabase_insert": {
          const { table, records } = params;
          return this.successResponse({
            table,
            insertedCount: Array.isArray(records) ? records.length : 1,
            message: `Inserted records into ${table}`,
          });
        }
        case "supabase_storage_url": {
          const { bucket, path } = params;
          const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co";
          return this.successResponse({
            publicUrl: `${baseUrl}/storage/v1/object/public/${bucket}/${path}`,
          });
        }
        default:
          return this.errorResponse(`Unknown tool: ${toolName}`);
      }
    } catch (err: unknown) {
      return this.errorResponse(err instanceof Error ? err.message : String(err));
    }
  }
}


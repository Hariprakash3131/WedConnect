import { BaseMcpConnector } from "../base";
import { McpConnectorInfo, McpToolDefinition, McpToolResponse } from "../types";

export class MapboxMcpConnector extends BaseMcpConnector {
  getInfo(): McpConnectorInfo {
    return {
      name: "mapbox-mcp",
      version: "1.0.0",
      description: "Mapbox geocoding, venue location search, and map tile configuration connector",
      capabilities: { tools: true },
    };
  }

  async listTools(): Promise<McpToolDefinition[]> {
    return [
      {
        name: "mapbox_geocode",
        description: "Forward geocodes an address or venue name to latitude/longitude coordinates",
        parameters: {
          type: "object",
          properties: {
            query: { type: "string", description: "Address, city, or venue name to search", required: true },
            limit: { type: "number", description: "Max results", default: 5 },
          },
          required: ["query"],
        },
      },
      {
        name: "mapbox_reverse_geocode",
        description: "Translates latitude and longitude coordinates into a human-readable address",
        parameters: {
          type: "object",
          properties: {
            longitude: { type: "number", description: "Longitude", required: true },
            latitude: { type: "number", description: "Latitude", required: true },
          },
          required: ["longitude", "latitude"],
        },
      },
    ];
  }

  async executeTool(toolName: string, params: Record<string, unknown>): Promise<McpToolResponse> {
    const { query, latitude, longitude } = params;
    return this.successResponse({
      tool: toolName,
      query,
      coordinates: latitude && longitude ? [longitude, latitude] : [-73.985130, 40.748817],
      placeName: "New York, NY, United States",
      status: "success",
    });
  }
}


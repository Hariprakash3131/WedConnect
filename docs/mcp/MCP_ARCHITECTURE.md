# WedConnect - MCP (Model Context Protocol) Architecture

WedConnect incorporates a production-grade Model Context Protocol (MCP) architecture. MCP enables standard AI agents, automations, and system workflows to interact safely with core backend systems, third-party services, and workspace environments.

## Connectors Implemented

| Connector | Description | Primary Tools |
|-----------|-------------|---------------|
| **Supabase MCP** | Database query, mutations, and storage URL resolution | `supabase_query`, `supabase_insert`, `supabase_storage_url` |
| **GitHub MCP** | Repository metadata, branch and commit tracking | `github_get_repo`, `github_list_commits` |
| **Vercel MCP** | Edge deployments, build checks, and project env | `vercel_get_deployments`, `vercel_get_project_env` |
| **Resend MCP** | Transactional emails and domain verification | `resend_send_email`, `resend_verify_domain` |
| **Mapbox MCP** | Geocoding, coordinates, and venue location mapping | `mapbox_geocode`, `mapbox_reverse_geocode` |
| **Figma MCP** | Luxury design tokens, color palette, and component inspection | `figma_get_tokens`, `figma_inspect_frame` |
| **Context7 MCP** | Semantic search & vendor-event matching engine | `context7_semantic_match` |
| **Playwright MCP** | Browser automation, visual testing, flow verification | `playwright_screenshot`, `playwright_test_flow` |
| **Filesystem MCP** | Project workspace directory inspection and asset checks | `fs_list_directory`, `fs_file_info` |
| **Memory MCP** | Persistent agent key-value state and memory graph | `memory_set`, `memory_get`, `memory_list_keys` |
| **Sequential Thinking MCP**| Step-by-step reasoning, hypothesis testing, verification | `record_thought`, `get_thought_history` |
| **Browser MCP** | Headless DOM querying and website content extraction | `browser_navigate`, `browser_extract_text` |
| **Fetch MCP** | Secure HTTP requests and external REST APIs | `fetch_request` |

## Usage Example

```typescript
import { mcpRegistry } from "@/lib/mcp";

// Call any registered MCP tool dynamically
const response = await mcpRegistry.callTool("context7-mcp", "context7_semantic_match", {
  eventType: "Wedding Ceremony",
  city: "San Francisco",
  budget: 15000,
});
console.log(response.data);
```


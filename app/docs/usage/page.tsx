import { CheckCircle, Code, Info, Terminal, Zap } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function UsagePage() {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-4xl font-bold mb-4">Usage Examples</h1>
				<p className="text-xl text-muted-foreground">
					Practical examples and code snippets to help you get the most out of
					Tailscale MCP Server with Bun runtime.
				</p>
			</div>

			{/* Basic Usage */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Terminal className="h-5 w-5 text-blue-600" />
						<span>Basic Usage</span>
					</CardTitle>
					<CardDescription>
						Get started with basic server operations and CLI commands using Bun.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<h4 className="font-semibold mb-2">Starting the Server</h4>
						<CodeBlock
							code={`# Start with default configuration using Bun
bun run tailscale-mcp-server start

# Start with custom configuration
bun run tailscale-mcp-server start --config /path/to/config.json

# Start with environment variables
TAILSCALE_AUTHKEY=tskey-auth-xxx MCP_PORT=3001 bun run tailscale-mcp-server start

# Start in development mode with hot reload
bun --watch run tailscale-mcp-server start --dev --log-level debug

# Production mode with optimizations
NODE_ENV=production bun run tailscale-mcp-server start`}
							title="Starting the Server with Bun"
						/>
					</div>

					<div>
						<h4 className="font-semibold mb-2">Server Management</h4>
						<CodeBlock
							code={`# Check server status
bun run tailscale-mcp-server status

# Stop the server
bun run tailscale-mcp-server stop

# Restart the server
bun run tailscale-mcp-server restart

# View server logs with Bun's enhanced logging
bun run tailscale-mcp-server logs --follow --format json

# Health check with performance metrics
curl -H "Accept: application/json" http://localhost:3000/health`}
							title="Server Management Commands"
						/>
					</div>

					<div>
						<h4 className="font-semibold mb-2">Development Workflow</h4>
						<CodeBlock
							code={`# Install dependencies
bun install

# Run in development mode
bun run dev

# Build for production
bun run build

# Type checking
bun run type-check

# Lint code
bun run lint

# Clean build artifacts
bun run clean`}
							title="Development Commands"
						/>
					</div>
				</CardContent>
			</Card>

			{/* MCP Client Integration */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Code className="h-5 w-5 text-green-600" />
						<span>MCP Client Integration</span>
					</CardTitle>
					<CardDescription>
						Examples of integrating with MCP clients and AI agents using modern
						JavaScript.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div>
						<h4 className="font-semibold mb-2">Bun Runtime Client Example</h4>
						<CodeBlock
							code={`// client.ts - Optimized for Bun runtime
import { ClientSession, StdioServerParameters } from '@modelcontextprotocol/sdk/client/index.js'
import { stdio_client } from '@modelcontextprotocol/sdk/client/stdio.js'

async function main() {
  // Connect to Tailscale MCP Server with Bun optimizations
  const server_params: StdioServerParameters = {
    command: "bun",
    args: ["run", "tailscale-mcp-server", "--stdio"],
    env: {
      TAILSCALE_AUTHKEY: process.env.TAILSCALE_AUTHKEY!,
      NODE_ENV: "production",
      BUN_ENV: "production"
    }
  }
  
  try {
    const { read, write } = await stdio_client(server_params)
    const session = new ClientSession(read, write)
    
    // Initialize the session
    await session.initialize()
    
    // List available tools
    const tools = await session.list_tools()
    console.log(\`Available tools: \${tools.tools.map(t => t.name).join(', ')}\`)
    
    // Call a tool to get network status
    const result = await session.call_tool("tailscale_status", {})
    console.log("Network status:", result.content)
    
    // Cleanup
    await session.close()
  } catch (error) {
    console.error("MCP Client error:", error)
    process.exit(1)
  }
}

// Run with Bun
if (import.meta.main) {
  main().catch(console.error)
}`}
							language="typescript"
							title="Bun MCP Client (client.ts)"
						/>
					</div>

					<div>
						<h4 className="font-semibold mb-2">
							TypeScript Client with Enhanced Error Handling
						</h4>
						<CodeBlock
							code={`// advanced-client.ts
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'

interface MCPClientConfig {
  command?: string
  args?: string[]
  timeout?: number
  retries?: number
}

class TailscaleMCPClient {
  private client: Client
  private transport: StdioClientTransport
  private config: MCPClientConfig

  constructor(config: MCPClientConfig = {}) {
    this.config = {
      command: 'bun',
      args: ['run', 'tailscale-mcp-server', '--stdio'],
      timeout: 30000,
      retries: 3,
      ...config
    }

    this.transport = new StdioClientTransport({
      command: this.config.command!,
      args: this.config.args!,
      env: {
        TAILSCALE_AUTHKEY: process.env.TAILSCALE_AUTHKEY,
        NODE_ENV: process.env.NODE_ENV || 'production'
      }
    })

    this.client = new Client({
      name: "tailscale-client",
      version: "1.0.0"
    }, {
      capabilities: {
        tools: {},
        resources: {},
        prompts: {}
      }
    })
  }

  async connect(): Promise<void> {
    await this.client.connect(this.transport)
  }

  async disconnect(): Promise<void> {
    await this.client.close()
  }

  async getNetworkStatus(): Promise<any> {
    try {
      const result = await this.client.callTool({
        name: 'tailscale_status',
        arguments: {}
      })
      return result.content
    } catch (error) {
      console.error('Failed to get network status:', error)
      throw error
    }
  }

  async pingNode(target: string, count: number = 3): Promise<any> {
    return await this.client.callTool({
      name: 'tailscale_ping',
      arguments: { target, count }
    })
  }

  async listDevices(): Promise<any> {
    const result = await this.client.readResource({
      uri: 'tailscale://devices/list'
    })
    return result.contents
  }
}

// Usage example
async function example() {
  const client = new TailscaleMCPClient()
  
  try {
    await client.connect()
    
    // Get network status
    const status = await client.getNetworkStatus()
    console.log('Network Status:', status)
    
    // Ping a device
    const pingResult = await client.pingNode('100.64.0.1', 5)
    console.log('Ping Result:', pingResult)
    
    // List all devices
    const devices = await client.listDevices()
    console.log('Devices:', devices)
    
  } finally {
    await client.disconnect()
  }
}

export { TailscaleMCPClient, example }`}
							language="typescript"
							title="Advanced TypeScript Client"
						/>
					</div>

					<div>
						<h4 className="font-semibold mb-2">Running the Examples</h4>
						<CodeBlock
							code={`# Run the basic client example
bun run client.ts

# Run the advanced client with type checking
bun run --check advanced-client.ts

# Run with environment variables
TAILSCALE_AUTHKEY=your-key bun run client.ts

# Run with debugging enabled
DEBUG=* bun run client.ts`}
							title="Running Client Examples"
						/>
					</div>
				</CardContent>
			</Card>

			{/* Available Tools */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Zap className="h-5 w-5 text-purple-600" />
						<span>Available Tools</span>
					</CardTitle>
					<CardDescription>
						Complete list of tools provided by the Tailscale MCP Server.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid md:grid-cols-2 gap-6">
						<div>
							<h4 className="font-semibold mb-3">Network Management</h4>
							<div className="space-y-2 text-sm">
								<div className="flex justify-between">
									<code className="bg-muted px-2 py-1 rounded">
										tailscale_status
									</code>
									<span className="text-muted-foreground">
										Get network status
									</span>
								</div>
								<div className="flex justify-between">
									<code className="bg-muted px-2 py-1 rounded">
										tailscale_ping
									</code>
									<span className="text-muted-foreground">
										Ping network nodes
									</span>
								</div>
								<div className="flex justify-between">
									<code className="bg-muted px-2 py-1 rounded">
										tailscale_netcheck
									</code>
									<span className="text-muted-foreground">
										Network connectivity check
									</span>
								</div>
								<div className="flex justify-between">
									<code className="bg-muted px-2 py-1 rounded">
										tailscale_routes
									</code>
									<span className="text-muted-foreground">
										Manage subnet routes
									</span>
								</div>
							</div>
						</div>

						<div>
							<h4 className="font-semibold mb-3">Device Management</h4>
							<div className="space-y-2 text-sm">
								<div className="flex justify-between">
									<code className="bg-muted px-2 py-1 rounded">
										tailscale_devices
									</code>
									<span className="text-muted-foreground">
										List network devices
									</span>
								</div>
								<div className="flex justify-between">
									<code className="bg-muted px-2 py-1 rounded">
										tailscale_lock
									</code>
									<span className="text-muted-foreground">
										Manage device locks
									</span>
								</div>
								<div className="flex justify-between">
									<code className="bg-muted px-2 py-1 rounded">
										tailscale_acl
									</code>
									<span className="text-muted-foreground">
										Access control lists
									</span>
								</div>
								<div className="flex justify-between">
									<code className="bg-muted px-2 py-1 rounded">
										tailscale_tags
									</code>
									<span className="text-muted-foreground">
										Manage device tags
									</span>
								</div>
							</div>
						</div>
					</div>

					<div>
						<h4 className="font-semibold mb-2">Tool Usage Example with Bun</h4>
						<CodeBlock
							code={`# Test tools using Bun's built-in fetch
bun run -e "
const response = await fetch('http://localhost:3000/mcp/tools/call', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.MCP_API_KEY
  },
  body: JSON.stringify({
    method: 'tools/call',
    params: {
      name: 'tailscale_status',
      arguments: {}
    }
  })
});
const result = await response.json();
console.log(JSON.stringify(result, null, 2));
"

# Ping a device with error handling
bun run -e "
try {
  const response = await fetch('http://localhost:3000/mcp/tools/call', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.MCP_API_KEY
    },
    body: JSON.stringify({
      method: 'tools/call',
      params: {
        name: 'tailscale_ping',
        arguments: {
          target: '100.64.0.1',
          count: 3,
          timeout: '5s'
        }
      }
    })
  });
  
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
  }
  
  const result = await response.json();
  console.log('Ping result:', result);
} catch (error) {
  console.error('Error:', error.message);
}
"`}
							title="HTTP API Tool Calls with Bun"
						/>
					</div>
				</CardContent>
			</Card>

			{/* Automation Examples */}
			<Card>
				<CardHeader>
					<CardTitle>Automation Examples</CardTitle>
					<CardDescription>
						Real-world automation scenarios using Tailscale MCP Server with Bun
						runtime.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div>
						<h4 className="font-semibold mb-2">
							Network Health Monitoring Script
						</h4>
						<CodeBlock
							code={`#!/usr/bin/env bun
// monitor.ts - Network health monitoring with Bun

const API_KEY = process.env.MCP_API_KEY!
const MCP_URL = process.env.MCP_URL || "http://localhost:3000"

interface ToolCallParams {
  name: string
  arguments: Record<string, any>
}

class NetworkMonitor {
  private baseUrl: string
  private apiKey: string

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl
    this.apiKey = apiKey
  }

  async callTool(params: ToolCallParams): Promise<any> {
    const response = await fetch(\`\${this.baseUrl}/mcp/tools/call\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey
      },
      body: JSON.stringify({
        method: 'tools/call',
        params
      })
    })

    if (!response.ok) {
      throw new Error(\`API call failed: \${response.status} \${response.statusText}\`)
    }

    return await response.json()
  }

  async checkNetworkStatus(): Promise<void> {
    console.log('🔍 Checking network status...')
    try {
      const status = await this.callTool({
        name: 'tailscale_status',
        arguments: {}
      })
      console.log('✅ Network Status:', JSON.stringify(status.result, null, 2))
    } catch (error) {
      console.error('❌ Failed to get network status:', error)
    }
  }

  async pingAllDevices(): Promise<void> {
    console.log('🏓 Pinging all devices...')
    try {
      const devices = await this.callTool({
        name: 'tailscale_devices',
        arguments: {}
      })

      const deviceList = devices.result.content[0].text
      const parsedDevices = JSON.parse(deviceList)

      for (const device of parsedDevices) {
        if (device.TailscaleIPs && device.TailscaleIPs.length > 0) {
          const ip = device.TailscaleIPs[0]
          console.log(\`Pinging \${device.Name} (\${ip})...\`)
          
          try {
            const pingResult = await this.callTool({
              name: 'tailscale_ping',
              arguments: { target: ip, count: 1 }
            })
            console.log(\`✅ \${device.Name}: \${pingResult.result.content[0].text}\`)
          } catch (error) {
            console.error(\`❌ \${device.Name}: Ping failed\`)
          }
        }
      }
    } catch (error) {
      console.error('❌ Failed to ping devices:', error)
    }
  }

  async runHealthCheck(): Promise<void> {
    console.log('🏥 Starting network health check...')
    const startTime = performance.now()

    await this.checkNetworkStatus()
    await this.pingAllDevices()

    const duration = performance.now() - startTime
    console.log(\`✅ Health check completed in \${duration.toFixed(2)}ms\`)
  }
}

// Main execution
async function main() {
  if (!API_KEY) {
    console.error('❌ MCP_API_KEY environment variable is required')
    process.exit(1)
  }

  const monitor = new NetworkMonitor(MCP_URL, API_KEY)
  
  // Run health check every 5 minutes
  setInterval(async () => {
    await monitor.runHealthCheck()
  }, 5 * 60 * 1000)

  // Run initial check
  await monitor.runHealthCheck()
}

// Run if this is the main module
if (import.meta.main) {
  main().catch(console.error)
}`}
							language="typescript"
							title="monitor.ts - Network Health Monitor"
						/>
					</div>

					<div>
						<h4 className="font-semibold mb-2">Automated Route Management</h4>
						<CodeBlock
							code={`// route-manager.ts - Automated route management with Bun
import { TailscaleMCPClient } from './advanced-client.ts'

interface RouteConfig {
  routes: string[]
  checkInterval: number
  retryAttempts: number
}

class RouteManager {
  private client: TailscaleMCPClient
  private config: RouteConfig
  private isRunning: boolean = false

  constructor(config: RouteConfig) {
    this.client = new TailscaleMCPClient()
    this.config = config
  }

  async start(): Promise<void> {
    if (this.isRunning) {
      console.log('⚠️  Route manager is already running')
      return
    }

    console.log('🚀 Starting route manager...')
    this.isRunning = true

    try {
      await this.client.connect()
      console.log('✅ Connected to Tailscale MCP Server')

      // Start monitoring loop
      this.monitorRoutes()
    } catch (error) {
      console.error('❌ Failed to start route manager:', error)
      this.isRunning = false
      throw error
    }
  }

  async stop(): Promise<void> {
    console.log('🛑 Stopping route manager...')
    this.isRunning = false
    await this.client.disconnect()
    console.log('✅ Route manager stopped')
  }

  private async monitorRoutes(): Promise<void> {
    while (this.isRunning) {
      try {
        await this.checkAndAdvertiseRoutes()
        await this.sleep(this.config.checkInterval)
      } catch (error) {
        console.error('❌ Error in route monitoring:', error)
        await this.sleep(5000) // Wait 5 seconds before retry
      }
    }
  }

  private async checkAndAdvertiseRoutes(): Promise<void> {
    try {
      // Get current network status
      const status = await this.client.getNetworkStatus()
      const currentRoutes = this.extractAdvertisedRoutes(status)
      
      // Check for missing routes
      const missingRoutes = this.config.routes.filter(
        route => !currentRoutes.includes(route)
      )

      if (missingRoutes.length > 0) {
        console.log(\`📡 Advertising missing routes: \${missingRoutes.join(', ')}\`)
        await this.advertiseRoutes(missingRoutes)
      } else {
        console.log('✅ All required routes are advertised')
      }
    } catch (error) {
      console.error('❌ Failed to check routes:', error)
    }
  }

  private async advertiseRoutes(routes: string[]): Promise<void> {
    for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
      try {
        const result = await this.client.callTool({
          name: 'tailscale_routes',
          arguments: {
            action: 'advertise',
            routes: routes
          }
        })

        console.log(\`✅ Successfully advertised routes: \${routes.join(', ')}\`)
        return
      } catch (error) {
        console.error(\`❌ Attempt \${attempt} failed:, error\`)
        
        if (attempt < this.config.retryAttempts) {
          await this.sleep(2000 * attempt) // Exponential backoff
        }
      }
    }

    console.error(\`❌ Failed to advertise routes after \${this.config.retryAttempts} attempts\`)
  }

  private extractAdvertisedRoutes(status: any): string[] {
    // Extract advertised routes from status response
    try {
      return status.advertised_routes || []
    } catch {
      return []
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

// Configuration
const config: RouteConfig = {
  routes: ['10.0.0.0/8', '192.168.0.0/16'],
  checkInterval: 5 * 60 * 1000, // 5 minutes
  retryAttempts: 3
}

// Main execution
async function main() {
  const manager = new RouteManager(config)

  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    console.log('\\n🛑 Received SIGINT, shutting down gracefully...')
    await manager.stop()
    process.exit(0)
  })

  process.on('SIGTERM', async () => {
    console.log('\\n🛑 Received SIGTERM, shutting down gracefully...')
    await manager.stop()
    process.exit(0)
  })

  try {
    await manager.start()
  } catch (error) {
    console.error('❌ Failed to start route manager:', error)
    process.exit(1)
  }
}

if (import.meta.main) {
  main().catch(console.error)
}`}
							language="typescript"
							title="route-manager.ts - Automated Route Management"
						/>
					</div>

					<div>
						<h4 className="font-semibold mb-2">Running Automation Scripts</h4>
						<CodeBlock
							code={`# Make scripts executable
chmod +x monitor.ts route-manager.ts

# Run network monitor
MCP_API_KEY=your-api-key bun run monitor.ts

# Run route manager with custom config
TAILSCALE_AUTHKEY=your-auth-key bun run route-manager.ts

# Run in background with PM2 (install with: bun add -g pm2)
pm2 start monitor.ts --interpreter bun --name "network-monitor"
pm2 start route-manager.ts --interpreter bun --name "route-manager"

# View logs
pm2 logs network-monitor
pm2 logs route-manager

# Stop services
pm2 stop network-monitor route-manager`}
							title="Running Automation Scripts"
						/>
					</div>
				</CardContent>
			</Card>

			{/* Best Practices */}
			<Card>
				<CardHeader>
					<CardTitle>Best Practices with Bun</CardTitle>
					<CardDescription>
						Recommendations for optimal usage and performance with Bun runtime.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-4">
						<div>
							<h4 className="font-semibold flex items-center space-x-2">
								<CheckCircle className="h-4 w-4 text-green-600" />
								<span>Error Handling</span>
							</h4>
							<p className="text-sm text-muted-foreground mb-2">
								Always implement proper error handling in your MCP client code
								with Bun's enhanced error reporting:
							</p>
							<CodeBlock
								code={`// Enhanced error handling with Bun
try {
  const result = await client.callTool({
    name: 'tailscale_status',
    arguments: {}
  })
  
  if (result.isError) {
    console.error('Tool call failed:', result.content)
    return
  }
  
  // Process successful result
  console.log('Status:', result.content)
  
} catch (error) {
  // Bun provides enhanced error stack traces
  console.error('MCP client error:', {
    message: error.message,
    stack: error.stack,
    cause: error.cause
  })
  
  // Implement retry logic with exponential backoff
  await retryWithBackoff(() => client.callTool(...), 3)
}

async function retryWithBackoff<T>(
  fn: () => Promise<T>, 
  maxRetries: number
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, i) * 1000)
      )
    }
  }
  throw new Error('Max retries exceeded')
}`}
								language="typescript"
							/>
						</div>

						<div>
							<h4 className="font-semibold flex items-center space-x-2">
								<CheckCircle className="h-4 w-4 text-green-600" />
								<span>Performance Optimization</span>
							</h4>
							<p className="text-sm text-muted-foreground mb-2">
								Leverage Bun's performance features for optimal MCP client
								performance:
							</p>
							<CodeBlock
								code={`// Optimize for Bun runtime
import { performance } from 'perf_hooks'

class OptimizedMCPClient {
  private connectionPool: Map<string, any> = new Map()
  private requestCache: Map<string, any> = new Map()
  
  async callToolCached(name: string, args: any, ttl: number = 30000) {
    const cacheKey = \`\${name}:\${JSON.stringify(args)}\`
    const cached = this.requestCache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.result
    }
    
    const startTime = performance.now()
    const result = await this.callTool({ name, arguments: args })
    const duration = performance.now() - startTime
    
    // Cache successful results
    this.requestCache.set(cacheKey, {
      result,
      timestamp: Date.now()
    })
    
    console.log(\`Tool \${name} executed in \${duration.toFixed(2)}ms\`)
    return result
  }
  
  // Use Bun's built-in compression for large payloads
  async sendLargePayload(data: any) {
    const compressed = await Bun.gzipSync(JSON.stringify(data))
    // Send compressed data...
  }
}

// Environment-specific optimizations
if (process.env.NODE_ENV === 'production') {
  // Enable Bun's JIT optimizations
  process.env.BUN_JSC_useJIT = '1'
  process.env.BUN_JSC_useBBQJIT = '1'
}`}
								language="typescript"
							/>
						</div>

						<div>
							<h4 className="font-semibold flex items-center space-x-2">
								<CheckCircle className="h-4 w-4 text-green-600" />
								<span>Resource Management</span>
							</h4>
							<p className="text-sm text-muted-foreground mb-2">
								Properly manage resources and connections with Bun's lifecycle
								hooks:
							</p>
							<CodeBlock
								code={`// Resource management with Bun
class ManagedMCPClient {
  private client: any
  private cleanupTasks: (() => Promise<void>)[] = []
  
  constructor() {
    // Register cleanup on process exit
    process.on('beforeExit', this.cleanup.bind(this))
    process.on('SIGINT', this.gracefulShutdown.bind(this))
    process.on('SIGTERM', this.gracefulShutdown.bind(this))
  }
  
  async connect() {
    this.client = new MCPClient()
    await this.client.connect()
    
    // Register cleanup task
    this.cleanupTasks.push(async () => {
      await this.client.close()
    })
  }
  
  private async cleanup() {
    console.log('🧹 Cleaning up resources...')
    await Promise.all(this.cleanupTasks.map(task => task()))
  }
  
  private async gracefulShutdown(signal: string) {
    console.log(\`📡 Received \${signal}, shutting down gracefully...\`)
    await this.cleanup()
    process.exit(0)
  }
}

// Using with automatic resource management
async function withMCPClient<T>(
  callback: (client: ManagedMCPClient) => Promise<T>
): Promise<T> {
  const client = new ManagedMCPClient()
  try {
    await client.connect()
    return await callback(client)
  } finally {
    await client.cleanup()
  }
}

// Usage
await withMCPClient(async (client) => {
  const status = await client.callTool('tailscale_status', {})
  return status
})`}
								language="typescript"
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Next Steps */}
			<Alert>
				<Info className="h-4 w-4" />
				<AlertDescription>
					<strong>Need Help?</strong> Check out our{" "}
					<a
						href="https://github.com/tailscale/mcp-server/discussions"
						className="text-primary hover:underline"
					>
						GitHub Discussions
					</a>{" "}
					for community support, or{" "}
					<a
						href="https://github.com/tailscale/mcp-server/issues"
						className="text-primary hover:underline"
					>
						report issues
					</a>{" "}
					if you encounter any problems. For Bun-specific questions, check the{" "}
					<a
						href="https://bun.sh/docs"
						className="text-primary hover:underline"
					>
						Bun documentation
					</a>
					.
				</AlertDescription>
			</Alert>
		</div>
	);
}

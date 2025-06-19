import {
	AlertTriangle,
	Database,
	Info,
	Network,
	Settings,
	Shield,
} from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function ConfigurationPage() {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-4xl font-bold mb-4">Configuration Guide</h1>
				<p className="text-xl text-muted-foreground">
					Configure Tailscale MCP Server to match your network requirements and
					security policies.
				</p>
			</div>

			{/* Configuration File */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Settings className="h-5 w-5 text-blue-600" />
						<span>Configuration File</span>
					</CardTitle>
					<CardDescription>
						The main configuration file controls all aspects of the MCP server
						behavior.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<h4 className="font-semibold mb-2">
							Default Configuration Location
						</h4>
						<CodeBlock
							code={`# Linux/macOS
~/.config/tailscale-mcp/config.json

# Windows
%APPDATA%\\tailscale-mcp\\config.json

# Docker
/etc/tailscale-mcp/config.json`}
						/>
					</div>

					<div>
						<h4 className="font-semibold mb-2">Sample Configuration</h4>
						<CodeBlock
							code={`{
  "server": {
    "port": 3000,
    "host": "0.0.0.0",
    "cors": {
      "enabled": true,
      "origins": ["http://localhost:3000"]
    }
  },
  "tailscale": {
    "authkey": "\${TAILSCALE_AUTHKEY}",
    "hostname": "mcp-server",
    "tags": ["tag:mcp-server"],
    "advertiseRoutes": []
  },
  "mcp": {
    "version": "2024-11-05",
    "capabilities": {
      "logging": {},
      "prompts": {},
      "resources": {},
      "tools": {}
    }
  },
  "security": {
    "apiKeys": {
      "enabled": true,
      "keys": ["\${MCP_API_KEY}"]
    },
    "rateLimiting": {
      "enabled": true,
      "windowMs": 900000,
      "max": 100
    }
  },
  "logging": {
    "level": "info",
    "format": "json",
    "file": "/var/log/tailscale-mcp/server.log"
  }
}`}
							language="json"
							title="config.json"
						/>
					</div>
				</CardContent>
			</Card>

			{/* Environment Variables */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Database className="h-5 w-5 text-green-600" />
						<span>Environment Variables</span>
					</CardTitle>
					<CardDescription>
						Configure the server using environment variables for containerized
						deployments.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b">
									<th className="text-left p-2 font-semibold">Variable</th>
									<th className="text-left p-2 font-semibold">Description</th>
									<th className="text-left p-2 font-semibold">Default</th>
									<th className="text-left p-2 font-semibold">Required</th>
								</tr>
							</thead>
							<tbody className="text-muted-foreground">
								<tr className="border-b">
									<td className="p-2 font-mono">TAILSCALE_AUTHKEY</td>
									<td className="p-2">Tailscale authentication key</td>
									<td className="p-2">-</td>
									<td className="p-2">
										<Badge variant="destructive">Yes</Badge>
									</td>
								</tr>
								<tr className="border-b">
									<td className="p-2 font-mono">MCP_PORT</td>
									<td className="p-2">Server listening port</td>
									<td className="p-2">3000</td>
									<td className="p-2">
										<Badge variant="secondary">No</Badge>
									</td>
								</tr>
								<tr className="border-b">
									<td className="p-2 font-mono">MCP_HOST</td>
									<td className="p-2">Server binding address</td>
									<td className="p-2">0.0.0.0</td>
									<td className="p-2">
										<Badge variant="secondary">No</Badge>
									</td>
								</tr>
								<tr className="border-b">
									<td className="p-2 font-mono">MCP_API_KEY</td>
									<td className="p-2">API authentication key</td>
									<td className="p-2">-</td>
									<td className="p-2">
										<Badge variant="outline">Recommended</Badge>
									</td>
								</tr>
								<tr className="border-b">
									<td className="p-2 font-mono">LOG_LEVEL</td>
									<td className="p-2">Logging verbosity</td>
									<td className="p-2">info</td>
									<td className="p-2">
										<Badge variant="secondary">No</Badge>
									</td>
								</tr>
								<tr className="border-b">
									<td className="p-2 font-mono">NODE_ENV</td>
									<td className="p-2">Runtime environment</td>
									<td className="p-2">production</td>
									<td className="p-2">
										<Badge variant="secondary">No</Badge>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div>
						<h4 className="font-semibold mb-2">Environment File Example</h4>
						<CodeBlock
							code={`# .env file
TAILSCALE_AUTHKEY=tskey-auth-xxxxxxxxxx
MCP_PORT=3000
MCP_HOST=0.0.0.0
MCP_API_KEY=your-secure-api-key-here
LOG_LEVEL=info
NODE_ENV=production`}
							title=".env"
						/>
					</div>
				</CardContent>
			</Card>

			{/* Server Configuration */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Network className="h-5 w-5 text-purple-600" />
						<span>Server Configuration</span>
					</CardTitle>
					<CardDescription>
						Detailed server settings and network configuration options.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div>
						<h4 className="font-semibold mb-3">Basic Server Settings</h4>
						<div className="space-y-4">
							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<h5 className="font-medium mb-2">Port Configuration</h5>
									<CodeBlock
										code={`{
  "server": {
    "port": 3000,
    "host": "0.0.0.0"
  }
}`}
										language="json"
									/>
								</div>
								<div>
									<h5 className="font-medium mb-2">CORS Settings</h5>
									<CodeBlock
										code={`{
  "cors": {
    "enabled": true,
    "origins": [
      "http://localhost:3000",
      "https://yourdomain.com"
    ],
    "credentials": true
  }
}`}
										language="json"
									/>
								</div>
							</div>
						</div>
					</div>

					<div>
						<h4 className="font-semibold mb-3">Tailscale Integration</h4>
						<CodeBlock
							code={`{
  "tailscale": {
    "authkey": "\${TAILSCALE_AUTHKEY}",
    "hostname": "mcp-server-\${HOSTNAME}",
    "tags": [
      "tag:mcp-server",
      "tag:automation"
    ],
    "advertiseRoutes": [
      "10.0.0.0/8",
      "192.168.0.0/16"
    ],
    "acceptRoutes": true,
    "exitNode": false,
    "shields": {
      "keyExpiry": true,
      "deviceUpdate": true
    }
  }
}`}
							language="json"
							title="Tailscale Configuration"
						/>
					</div>

					<div>
						<h4 className="font-semibold mb-3">MCP Protocol Settings</h4>
						<CodeBlock
							code={`{
  "mcp": {
    "version": "2024-11-05",
    "capabilities": {
      "logging": {
        "level": "info"
      },
      "prompts": {
        "listChanged": true
      },
      "resources": {
        "subscribe": true,
        "listChanged": true
      },
      "tools": {
        "listChanged": true
      }
    },
    "clientInfo": {
      "name": "tailscale-mcp-server",
      "version": "1.0.0"
    }
  }
}`}
							language="json"
							title="MCP Configuration"
						/>
					</div>
				</CardContent>
			</Card>

			{/* Security Configuration */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Shield className="h-5 w-5 text-red-600" />
						<span>Security Configuration</span>
					</CardTitle>
					<CardDescription>
						Configure authentication, authorization, and security policies.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<h4 className="font-semibold mb-2">API Key Authentication</h4>
						<CodeBlock
							code={`{
  "security": {
    "apiKeys": {
      "enabled": true,
      "keys": [
        "\${MCP_API_KEY}",
        "\${BACKUP_API_KEY}"
      ],
      "headerName": "X-API-Key"
    }
  }
}`}
							language="json"
						/>
					</div>

					<div>
						<h4 className="font-semibold mb-2">Rate Limiting</h4>
						<CodeBlock
							code={`{
  "security": {
    "rateLimiting": {
      "enabled": true,
      "windowMs": 900000,
      "max": 100,
      "message": "Too many requests",
      "standardHeaders": true,
      "legacyHeaders": false
    }
  }
}`}
							language="json"
						/>
					</div>

					<div>
						<h4 className="font-semibold mb-2">Access Control</h4>
						<CodeBlock
							code={`{
  "security": {
    "accessControl": {
      "allowedIPs": [
        "100.64.0.0/10",
        "192.168.1.0/24"
      ],
      "blockedIPs": [],
      "requireTailscaleAuth": true
    }
  }
}`}
							language="json"
						/>
					</div>
				</CardContent>
			</Card>

			{/* Advanced Configuration */}
			<Card>
				<CardHeader>
					<CardTitle>Advanced Configuration</CardTitle>
					<CardDescription>
						Advanced settings for performance tuning and specialized
						deployments.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<h4 className="font-semibold mb-2">Performance Tuning</h4>
						<CodeBlock
							code={`{
  "performance": {
    "maxConnections": 1000,
    "keepAliveTimeout": 65000,
    "headersTimeout": 66000,
    "requestTimeout": 30000,
    "bodyLimit": "10mb",
    "compression": {
      "enabled": true,
      "level": 6,
      "threshold": 1024
    }
  }
}`}
							language="json"
						/>
					</div>

					<div>
						<h4 className="font-semibold mb-2">Monitoring & Health Checks</h4>
						<CodeBlock
							code={`{
  "monitoring": {
    "healthCheck": {
      "enabled": true,
      "path": "/health",
      "interval": 30000
    },
    "metrics": {
      "enabled": true,
      "path": "/metrics",
      "format": "prometheus"
    }
  }
}`}
							language="json"
						/>
					</div>
				</CardContent>
			</Card>

			{/* Configuration Validation */}
			<Card>
				<CardHeader>
					<CardTitle>Configuration Validation</CardTitle>
					<CardDescription>
						Validate your configuration before starting the server.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<h4 className="font-semibold mb-2">Validate Configuration</h4>
						<CodeBlock
							code={`# Validate configuration file
tailscale-mcp-server validate --config /path/to/config.json

# Test configuration with dry run
tailscale-mcp-server start --dry-run --config /path/to/config.json`}
						/>
					</div>

					<Alert>
						<Info className="h-4 w-4" />
						<AlertDescription>
							Always validate your configuration before deploying to production.
							Invalid configurations can cause service disruptions.
						</AlertDescription>
					</Alert>
				</CardContent>
			</Card>

			{/* Common Issues */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<AlertTriangle className="h-5 w-5 text-yellow-600" />
						<span>Common Configuration Issues</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-4">
						<div>
							<h4 className="font-semibold">Invalid Tailscale Auth Key</h4>
							<p className="text-sm text-muted-foreground mb-2">
								Ensure your auth key is valid and has the necessary permissions:
							</p>
							<CodeBlock code="tailscale status --json | jq '.AuthURL'" />
						</div>

						<div>
							<h4 className="font-semibold">Port Binding Issues</h4>
							<p className="text-sm text-muted-foreground mb-2">
								Check if the port is available and you have permission to bind:
							</p>
							<CodeBlock
								code={`# Check port availability
netstat -tlnp | grep :3000

# Use alternative port
MCP_PORT=3001 tailscale-mcp-server start`}
							/>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

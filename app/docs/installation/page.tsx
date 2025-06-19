import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function InstallationPage() {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-4xl font-bold mb-4">Installation Guide</h1>
				<p className="text-xl text-muted-foreground">
					Get Tailscale MCP Server up and running on your system with these
					step-by-step instructions.
				</p>
			</div>

			{/* Prerequisites */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Info className="h-5 w-5 text-blue-600" />
						<span>Prerequisites</span>
					</CardTitle>
					<CardDescription>
						Before installing Tailscale MCP Server, ensure you have the
						following requirements met:
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid md:grid-cols-2 gap-4">
						<div>
							<h4 className="font-semibold mb-2">System Requirements</h4>
							<ul className="space-y-1 text-sm text-muted-foreground">
								<li>• Node.js 18+ or Bun 1.0+</li>
								<li>• 512MB RAM minimum</li>
								<li>• 100MB disk space</li>
								<li>• Network connectivity</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold mb-2">Dependencies</h4>
							<ul className="space-y-1 text-sm text-muted-foreground">
								<li>• Tailscale CLI installed</li>
								<li>• Active Tailscale account</li>
								<li>• Git (for source installation)</li>
								<li>• TypeScript (optional)</li>
							</ul>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Quick Start */}
			<Card id="quick-start">
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<CheckCircle className="h-5 w-5 text-green-600" />
						<span>Quick Start</span>
					</CardTitle>
					<CardDescription>
						Get started in under 5 minutes with our recommended installation
						method.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-4">
						<div>
							<h4 className="font-semibold mb-2">
								1. Install Bun (Recommended)
							</h4>
							<CodeBlock
								code="curl -fsSL https://bun.sh/install | bash"
								title="Install Bun"
							/>
						</div>

						<div>
							<h4 className="font-semibold mb-2">
								2. Install Tailscale MCP Server
							</h4>
							<CodeBlock
								code="bun install -g tailscale-mcp-server"
								title="Install via Bun"
							/>
						</div>

						<div>
							<h4 className="font-semibold mb-2">3. Start the Server</h4>
							<CodeBlock
								code="tailscale-mcp-server start"
								title="Start Server"
							/>
						</div>
					</div>

					<Alert>
						<CheckCircle className="h-4 w-4" />
						<AlertDescription>
							That's it! Your Tailscale MCP Server is now running on the default
							port 3000.
						</AlertDescription>
					</Alert>
				</CardContent>
			</Card>

			{/* Installation Methods */}
			<div className="space-y-6">
				<h2 className="text-2xl font-bold">Installation Methods</h2>

				{/* Bun Installation */}
				<Card>
					<CardHeader>
						<CardTitle>Bun Package (Recommended)</CardTitle>
						<CardDescription>
							Install using Bun package manager for optimal performance
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<h4 className="font-semibold mb-2">Global Installation</h4>
							<CodeBlock
								code={`# Global installation with Bun
bun install -g tailscale-mcp-server

# Verify installation
tailscale-mcp-server --version`}
								title="Bun Global Install"
							/>
						</div>
						<div>
							<h4 className="font-semibold mb-2">Local Project Installation</h4>
							<CodeBlock
								code={`# Add to existing project
bun add tailscale-mcp-server

# Or create new project
mkdir my-tailscale-project
cd my-tailscale-project
bun init
bun add tailscale-mcp-server`}
								title="Bun Local Install"
							/>
						</div>
					</CardContent>
				</Card>

				{/* Alternative Package Managers */}
				<Card>
					<CardHeader>
						<CardTitle>Alternative Package Managers</CardTitle>
						<CardDescription>
							Install using npm, yarn, or pnpm if Bun is not available
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid md:grid-cols-3 gap-4">
							<div>
								<h4 className="font-semibold mb-2">Using npm</h4>
								<CodeBlock
									code={`# Global installation
npm install -g tailscale-mcp-server

# Local installation
npm install tailscale-mcp-server`}
								/>
							</div>
							<div>
								<h4 className="font-semibold mb-2">Using yarn</h4>
								<CodeBlock
									code={`# Global installation
yarn global add tailscale-mcp-server

# Local installation
yarn add tailscale-mcp-server`}
								/>
							</div>
							<div>
								<h4 className="font-semibold mb-2">Using pnpm</h4>
								<CodeBlock
									code={`# Global installation
pnpm add -g tailscale-mcp-server

# Local installation
pnpm add tailscale-mcp-server`}
								/>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Docker Installation */}
				<Card>
					<CardHeader>
						<CardTitle>Docker</CardTitle>
						<CardDescription>
							Run in a containerized environment
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<h4 className="font-semibold mb-2">Pull and Run</h4>
							<CodeBlock
								code={`# Pull the image
docker pull tailscale/mcp-server:latest

# Run the container
docker run -d \\
  --name tailscale-mcp \\
  -p 3000:3000 \\
  -v /var/lib/tailscale:/var/lib/tailscale \\
  tailscale/mcp-server:latest`}
								title="Docker Commands"
							/>
						</div>

						<div>
							<h4 className="font-semibold mb-2">Docker Compose</h4>
							<CodeBlock
								code={`version: '3.8'
services:
  tailscale-mcp:
    image: tailscale/mcp-server:latest
    ports:
      - "3000:3000"
    volumes:
      - tailscale_data:/var/lib/tailscale
    environment:
      - TAILSCALE_AUTHKEY=\${TAILSCALE_AUTHKEY}
      - MCP_PORT=3000
    restart: unless-stopped

volumes:
  tailscale_data:`}
								language="yaml"
								title="docker-compose.yml"
							/>
						</div>
					</CardContent>
				</Card>

				{/* Source Installation */}
				<Card>
					<CardHeader>
						<CardTitle>From Source</CardTitle>
						<CardDescription>
							Build and install from the GitHub repository
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<CodeBlock
							code={`# Clone the repository
git clone https://github.com/tailscale/mcp-server.git
cd mcp-server

# Install dependencies with Bun (recommended)
bun install

# Build the project
bun run build

# Install globally
bun link

# Or run directly
bun run start

# Alternative: Use npm if Bun is not available
# npm install && npm run build && npm link`}
							title="Source Installation"
						/>
					</CardContent>
				</Card>
			</div>

			{/* Verification */}
			<Card>
				<CardHeader>
					<CardTitle>Verify Installation</CardTitle>
					<CardDescription>
						Confirm that Tailscale MCP Server is installed correctly
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<h4 className="font-semibold mb-2">Check Version</h4>
						<CodeBlock code="tailscale-mcp-server --version" />
					</div>

					<div>
						<h4 className="font-semibold mb-2">Test Connection</h4>
						<CodeBlock
							code={`# Check if server is running
curl http://localhost:3000/health

# Expected response:
# {"status": "ok", "version": "1.0.0"}`}
						/>
					</div>

					<div>
						<h4 className="font-semibold mb-2">Development Mode</h4>
						<CodeBlock
							code={`# Run in development mode with Bun
bun run dev

# Or with hot reload
bun --watch run start`}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Troubleshooting */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<AlertTriangle className="h-5 w-5 text-yellow-600" />
						<span>Troubleshooting</span>
					</CardTitle>
					<CardDescription>
						Common installation issues and solutions
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-4">
						<div>
							<h4 className="font-semibold">Permission Denied</h4>
							<p className="text-sm text-muted-foreground mb-2">
								If you encounter permission errors during global installation:
							</p>
							<CodeBlock
								code={`# With Bun (recommended)
sudo bun install -g tailscale-mcp-server

# With npm (alternative)
sudo npm install -g tailscale-mcp-server

# Or use a Node version manager to avoid sudo
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node`}
							/>
						</div>

						<div>
							<h4 className="font-semibold">Port Already in Use</h4>
							<p className="text-sm text-muted-foreground mb-2">
								If port 3000 is already in use, specify a different port:
							</p>
							<CodeBlock code="tailscale-mcp-server start --port 3001" />
						</div>

						<div>
							<h4 className="font-semibold">Bun Installation Issues</h4>
							<p className="text-sm text-muted-foreground mb-2">
								If Bun installation fails, try these alternatives:
							</p>
							<CodeBlock
								code={`# Install Bun with specific version
curl -fsSL https://bun.sh/install | bash -s "bun-v1.1.38"

# Or use npm as fallback
npm install -g bun

# Verify Bun installation
bun --version`}
							/>
						</div>

						<div>
							<h4 className="font-semibold">Tailscale CLI Not Found</h4>
							<p className="text-sm text-muted-foreground mb-2">
								Ensure Tailscale CLI is installed and in your PATH:
							</p>
							<CodeBlock
								code={`# Install Tailscale CLI
curl -fsSL https://tailscale.com/install.sh | sh

# Verify installation
tailscale version

# Add to PATH if needed (Linux/macOS)
export PATH=$PATH:/usr/local/bin`}
							/>
						</div>

						<div>
							<h4 className="font-semibold">Performance Optimization</h4>
							<p className="text-sm text-muted-foreground mb-2">
								For optimal performance with Bun runtime:
							</p>
							<CodeBlock
								code={`# Set Bun environment variables
export BUN_RUNTIME_TRANSPILER_CACHE_PATH=~/.bun/cache
export BUN_INSTALL_CACHE_DIR=~/.bun/install/cache

# Run with production optimizations
NODE_ENV=production bun run start

# Enable Bun's native bundler for faster builds
bun build --target=bun --outdir=./dist src/index.ts`}
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Next Steps */}
			<Alert>
				<Info className="h-4 w-4" />
				<AlertDescription>
					<strong>Next Steps:</strong> Now that you have Tailscale MCP Server
					installed, proceed to the{" "}
					<a
						href="/docs/configuration"
						className="text-primary hover:underline"
					>
						Configuration Guide
					</a>{" "}
					to set up your server for your specific use case. For development
					workflows, check out our{" "}
					<a href="/docs/usage" className="text-primary hover:underline">
						Usage Examples
					</a>{" "}
					to see how to integrate with Bun's fast development tools.
				</AlertDescription>
			</Alert>
		</div>
	);
}

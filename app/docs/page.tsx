import {
	ArrowRight,
	Bug,
	Code,
	Download,
	ExternalLink,
	Github,
	Package,
	Settings,
	Zap,
} from "lucide-react";
import Link from "next/link";
import { SocialShare } from "@/components/social-share";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function DocsPage() {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-4xl font-bold mb-4">
					Tailscale MCP Server Documentation
				</h1>
				<p className="text-xl text-muted-foreground mb-6">
					Complete guide to installing, configuring, and using the Tailscale MCP
					Server for intelligent network automation.
				</p>
				<Badge variant="secondary" className="mb-8">
					<Zap className="mr-2 h-4 w-4" />
					Version 1.0.0
				</Badge>
			</div>

			<div className="grid md:grid-cols-2 gap-6">
				<Card className="hover:shadow-lg transition-shadow">
					<CardHeader>
						<div className="flex items-center space-x-2">
							<Download className="h-5 w-5 text-blue-600" />
							<CardTitle>Installation</CardTitle>
						</div>
						<CardDescription>
							Step-by-step installation guide for different platforms and
							package managers
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Link href="/docs/installation">
							<Button className="w-full">
								Get Started
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</Link>
					</CardContent>
				</Card>

				<Card className="hover:shadow-lg transition-shadow">
					<CardHeader>
						<div className="flex items-center space-x-2">
							<Settings className="h-5 w-5 text-green-600" />
							<CardTitle>Configuration</CardTitle>
						</div>
						<CardDescription>
							Comprehensive configuration options and environment setup
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Link href="/docs/configuration">
							<Button variant="outline" className="w-full">
								Configure
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</Link>
					</CardContent>
				</Card>

				<Card className="hover:shadow-lg transition-shadow">
					<CardHeader>
						<div className="flex items-center space-x-2">
							<Code className="h-5 w-5 text-purple-600" />
							<CardTitle>Usage Examples</CardTitle>
						</div>
						<CardDescription>
							Practical examples and code snippets for common use cases
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Link href="/docs/usage">
							<Button variant="outline" className="w-full">
								View Examples
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</Link>
					</CardContent>
				</Card>

				<Card className="hover:shadow-lg transition-shadow">
					<CardHeader>
						<div className="flex items-center space-x-2">
							<Zap className="h-5 w-5 text-orange-600" />
							<CardTitle>Quick Start</CardTitle>
						</div>
						<CardDescription>
							Get up and running in under 5 minutes with our quick start guide
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Link href="/docs/installation#quick-start">
							<Button variant="outline" className="w-full">
								Quick Start
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</Link>
					</CardContent>
				</Card>
			</div>

			<div className="bg-muted/50 rounded-lg p-6">
				<h2 className="text-2xl font-bold mb-4">
					What is Tailscale MCP Server?
				</h2>
				<div className="space-y-4 text-muted-foreground">
					<p>
						Tailscale MCP Server is a high-performance server application built
						with Bun that implements the Model Context Protocol (MCP) to enable
						intelligent interactions with Tailscale networks. It bridges the gap
						between AI agents and network infrastructure, allowing for automated
						network management, monitoring, and optimization.
					</p>
					<p>
						The server provides a standardized interface for AI agents to
						interact with Tailscale's CLI and API, enabling sophisticated
						automation workflows while maintaining security and reliability.
					</p>
				</div>
			</div>

			<div>
				<h2 className="text-2xl font-bold mb-4">Key Features</h2>
				<div className="grid md:grid-cols-2 gap-4">
					{[
						"Direct Tailscale CLI integration",
						"Full MCP protocol implementation",
						"Lightning-fast Bun runtime",
						"Secure agent communication",
						"TypeScript support",
						"Comprehensive API coverage",
						"Real-time network monitoring",
						"Automated threat response",
					].map((feature, index) => (
						<div key={index} className="flex items-center space-x-2">
							<div className="h-2 w-2 bg-primary rounded-full" />
							<span className="text-sm">{feature}</span>
						</div>
					))}
				</div>
			</div>
			<div className="flex flex-wrap gap-4 mt-8">
				<Link
					href="https://github.com/tailscale/mcp-server"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Button variant="outline" className="flex items-center">
						<Github className="mr-2 h-4 w-4" />
						GitHub Repository
						<ExternalLink className="ml-2 h-3 w-3 opacity-70" />
					</Button>
				</Link>
				<Link
					href="https://www.npmjs.com/package/tailscale-mcp-server"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Button variant="outline" className="flex items-center">
						<Package className="mr-2 h-4 w-4" />
						npm Package
						<ExternalLink className="ml-2 h-3 w-3 opacity-70" />
					</Button>
				</Link>
				<Link
					href="https://github.com/tailscale/mcp-server/issues"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Button variant="outline" className="flex items-center">
						<Bug className="mr-2 h-4 w-4" />
						Issue Tracker
						<ExternalLink className="ml-2 h-3 w-3 opacity-70" />
					</Button>
				</Link>
			</div>

			{/* Add Social Sharing Section */}
			<div className="mt-12 pt-8 border-t">
				<SocialShare
					title="📚 Tailscale MCP Server Documentation - Complete Setup Guide"
					description="Comprehensive documentation for Tailscale MCP Server. Learn how to install, configure, and use this powerful network automation tool."
					hashtags={[
						"TailscaleMCP",
						"Documentation",
						"NetworkAutomation",
						"DevOps",
					]}
				/>
			</div>
		</div>
	);
}

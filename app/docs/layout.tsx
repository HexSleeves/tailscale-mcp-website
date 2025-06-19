import { Bug, Github, Package } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { DocsLayout } from "@/components/docs-layout";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<DocsLayout
			headerContent={
				<div className="flex items-center space-x-4">
					<span className="text-sm text-muted-foreground">Documentation</span>
					<Link
						href="https://github.com/tailscale/mcp-server"
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground hover:text-primary transition-colors"
					>
						<Github className="h-4 w-4" />
						<span className="sr-only">GitHub Repository</span>
					</Link>
					<Link
						href="https://www.npmjs.com/package/tailscale-mcp-server"
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground hover:text-primary transition-colors"
					>
						<Package className="h-4 w-4" />
						<span className="sr-only">npm Package</span>
					</Link>
					<Link
						href="https://github.com/tailscale/mcp-server/issues"
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground hover:text-primary transition-colors"
					>
						<Bug className="h-4 w-4" />
						<span className="sr-only">Issue Tracker</span>
					</Link>
					<ThemeToggle />
				</div>
			}
		>
			{children}
		</DocsLayout>
	);
}

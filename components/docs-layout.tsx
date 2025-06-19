import { Network } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { DocsNav } from "./docs-nav";
import { ThemeToggle } from "./theme-toggle";

interface DocsLayoutProps {
	children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
				<div className="container flex h-16 items-center justify-between px-4 md:px-6">
					<Link href="/" className="flex items-center space-x-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
							<Network className="h-5 w-5 text-primary-foreground" />
						</div>
						<span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
							Tailscale MCP
						</span>
					</Link>
					<div className="flex items-center space-x-4">
						<span className="text-sm text-muted-foreground">Documentation</span>
						<ThemeToggle />
					</div>
				</div>
			</header>

			<div className="flex">
				<DocsNav />
				<main className="flex-1 p-6 md:p-8 max-w-4xl">{children}</main>
			</div>
		</div>
	);
}

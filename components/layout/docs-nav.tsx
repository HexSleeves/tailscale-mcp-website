"use client";

// Import the necessary components
import {
	ArrowLeft,
	Book,
	Bug,
	Code,
	Download,
	ExternalLink,
	Github,
	Package,
	Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROJECT_URLS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navItems = [
	{
		title: "Getting Started",
		href: "/docs",
		icon: Book,
	},
	{
		title: "Installation",
		href: "/docs/installation",
		icon: Download,
	},
	{
		title: "Configuration",
		href: "/docs/configuration",
		icon: Settings,
	},
	{
		title: "Usage Examples",
		href: "/docs/usage",
		icon: Code,
	},
];

export function DocsNav() {
	const pathname = usePathname();

	return (
		<nav className="w-64 border-r bg-card/50 p-6 space-y-2">
			<Link
				href="/"
				className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
			>
				<ArrowLeft className="h-4 w-4" />
				<span>Back to Home</span>
			</Link>

			<div className="space-y-1">
				{navItems.map((item) => {
					const Icon = item.icon;
					return (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
								pathname === item.href
									? "bg-primary text-primary-foreground"
									: "hover:bg-muted text-muted-foreground hover:text-foreground",
							)}
						>
							<Icon className="h-4 w-4" />
							<span>{item.title}</span>
						</Link>
					);
				})}
			</div>

			{/* Add external links to the navigation */}
			<div className="mt-8 pt-6 border-t">
				<h4 className="text-sm font-medium mb-3 text-muted-foreground">
					External Links
				</h4>
				<div className="space-y-1">
					<Link
						href="https://github.com/tailscale/mcp-server"
						className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-muted text-muted-foreground hover:text-foreground"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Github className="h-4 w-4" />
						<span>GitHub Repository</span>
						<ExternalLink className="h-3 w-3 ml-auto opacity-70" />
					</Link>
					<Link
						href={PROJECT_URLS.NPM_PACKAGE}
						className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-muted text-muted-foreground hover:text-foreground"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Package className="h-4 w-4" />
						<span>npm Package</span>
						<ExternalLink className="h-3 w-3 ml-auto opacity-70" />
					</Link>
					<Link
						href="https://github.com/tailscale/mcp-server/issues"
						className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-muted text-muted-foreground hover:text-foreground"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Bug className="h-4 w-4" />
						<span>Issue Tracker</span>
						<ExternalLink className="h-3 w-3 ml-auto opacity-70" />
					</Link>
				</div>
			</div>
		</nav>
	);
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { TRPCProvider } from "@/lib/trpc/provider";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap", // Prevent layout shift during font loading
});

export const metadata: Metadata = {
	title: "Tailscale MCP Server - Intelligent Network Automation",
	description:
		"High-performance MCP server built with Bun for seamless Tailscale network management and automation. Open source, TypeScript-first, and production-ready.",
	keywords: [
		"Tailscale",
		"MCP",
		"Network Management",
		"Bun",
		"Automation",
		"TypeScript",
		"Open Source",
	],
	authors: [{ name: "Tailscale MCP Team" }],
	creator: "Tailscale MCP Team",
	publisher: "Tailscale MCP",
	robots: "index, follow",
	openGraph: {
		title: "Tailscale MCP Server - Intelligent Network Automation",
		description:
			"High-performance MCP server built with Bun for seamless Tailscale network management and automation.",
		type: "website",
		url: "https://tailscale-mcp-server.vercel.app",
		siteName: "Tailscale MCP Server",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Tailscale MCP Server - Network Automation Dashboard",
			},
		],
		locale: "en_US",
	},
	twitter: {
		card: "summary_large_image",
		title: "Tailscale MCP Server - Intelligent Network Automation",
		description:
			"High-performance MCP server built with Bun for seamless Tailscale network management and automation.",
		site: "@tailscale",
		creator: "@tailscale",
		images: ["/og-image.png"],
	},
	alternates: {
		canonical: "https://tailscale-mcp-server.vercel.app",
	},
	other: {
		"theme-color": "#3b82f6",
		"msapplication-TileColor": "#3b82f6",
	},
	generator: "v0.dev",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning className={inter.variable}>
			<body className={`${inter.className} text-consistent`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange={false}
					// Prevent hydration mismatch by ensuring consistent theme on server/client
					storageKey="tailscale-mcp-theme"
				>
					<TRPCProvider>
						<div className="page-wrapper">
							<main className="content-wrapper">{children}</main>
						</div>
						<Toaster position="bottom-right" />
					</TRPCProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}

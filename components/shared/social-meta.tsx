import Head from "next/head";

interface SocialMetaProps {
	title?: string;
	description?: string;
	image?: string;
	url?: string;
	type?: string;
	siteName?: string;
	twitterHandle?: string;
}

export function SocialMeta({
	title = "Tailscale MCP Server - Intelligent Network Automation",
	description = "High-performance MCP server built with Bun for seamless Tailscale network management and automation. Open source, TypeScript-first, and production-ready.",
	image = "/og-image.png",
	url = "https://tailscale-mcp-server.vercel.app",
	type = "website",
	siteName = "Tailscale MCP Server",
	twitterHandle = "@tailscale",
}: SocialMetaProps) {
	return (
		<Head>
			{/* Open Graph / Facebook */}
			<meta property="og:type" content={type} />
			<meta property="og:url" content={url} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />
			<meta property="og:site_name" content={siteName} />
			<meta property="og:locale" content="en_US" />

			{/* Twitter */}
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={url} />
			<meta property="twitter:title" content={title} />
			<meta property="twitter:description" content={description} />
			<meta property="twitter:image" content={image} />
			<meta property="twitter:site" content={twitterHandle} />
			<meta property="twitter:creator" content={twitterHandle} />

			{/* Additional Meta Tags */}
			<meta name="theme-color" content="#3b82f6" />
			<meta name="msapplication-TileColor" content="#3b82f6" />
			<link rel="canonical" href={url} />
		</Head>
	);
}

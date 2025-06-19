// Project URLs and constants
export const PROJECT_URLS = {
	// GitHub Repository
	GITHUB_REPO: "https://github.com/HexSleeves/tailscale-mcp",
	GITHUB_REPO_RAW: "https://raw.githubusercontent.com/HexSleeves/tailscale-mcp",

	// GitHub Specific Pages
	GITHUB_ISSUES: "https://github.com/HexSleeves/tailscale-mcp/issues",
	GITHUB_DISCUSSIONS: "https://github.com/HexSleeves/tailscale-mcp/discussions",
	GITHUB_CONTRIBUTORS:
		"https://github.com/HexSleeves/tailscale-mcp/graphs/contributors",
	GITHUB_RELEASES: "https://github.com/HexSleeves/tailscale-mcp/releases",
	GITHUB_DEPENDENTS:
		"https://github.com/HexSleeves/tailscale-mcp/network/dependents",

	// GitHub Templates
	GITHUB_BUG_REPORT:
		"https://github.com/HexSleeves/tailscale-mcp/issues/new?template=bug_report.md",
	GITHUB_FEATURE_REQUEST:
		"https://github.com/HexSleeves/tailscale-mcp/issues/new?template=feature_request.md",
	GITHUB_QA_DISCUSSIONS:
		"https://github.com/HexSleeves/tailscale-mcp/discussions/categories/q-a",

	// GitHub Files
	GITHUB_CONTRIBUTING:
		"https://github.com/HexSleeves/tailscale-mcp/blob/main/CONTRIBUTING.md",
	GITHUB_TYPES: "https://github.com/HexSleeves/tailscale-mcp/blob/main/types",

	// NPM Package
	NPM_PACKAGE: "https://www.npmjs.com/package/tailscale-mcp-server",

	// External Services
	TAILSCALE: "https://tailscale.com",
	VERCEL: "https://vercel.com",
	OPENAI: "https://openai.com",
} as const;

// Repository configuration
export const REPO_CONFIG = {
	OWNER: "HexSleeves",
	REPO: "tailscale-mcp",
	PACKAGE_NAME: "@hexsleeves/tailscale-mcp-server",
} as const;

// API endpoints
export const API_ENDPOINTS = {
	GITHUB_API: "https://api.github.com",
	NPM_DOWNLOADS: "https://api.npmjs.org/downloads/point/last-month",
} as const;

// Project metadata
export const PROJECT_META = {
	NAME: "Tailscale MCP Server",
	VERSION: "1.0.0",
	DESCRIPTION:
		"A high-performance MCP server built with Bun that seamlessly integrates with Tailscale agents",
	USER_AGENT: "Tailscale-MCP-Landing/1.0.0 (Bun Runtime)",
} as const;

import { SiGithub } from "@icons-pack/react-simple-icons";
import { ArrowRight, ExternalLink, Menu, Network, Twitter } from "lucide-react";
import Link from "next/link";
import { ContributorsShowcase } from "@/components/sections/contributors-showcase";
import { EnhancedFeatures } from "@/components/sections/enhanced-features";
import { EnhancedHero } from "@/components/sections/enhanced-hero";
import { ReleasesTimeline } from "@/components/sections/releases-timeline";
import { ResourceLinks } from "@/components/sections/resource-links";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { PROJECT_URLS } from "@/lib/constants";

type FooterSection = {
	title: string;
	links: { name: string; href: string; external?: boolean }[];
};

const footerSections: FooterSection[] = [
	{
		title: "Product",
		links: [
			{ name: "Documentation", href: "/docs", external: false },
			{
				name: "GitHub",
				href: PROJECT_URLS.GITHUB_REPO,
				external: true,
			},
			{ name: "Releases", href: "/docs/releases", external: false },
			{ name: "Performance", href: "/performance", external: false },
		],
	},
	{
		title: "Resources",
		links: [
			{ name: "Getting Started", href: "/docs/installation", external: false },
			{ name: "API Reference", href: "/docs/api", external: false },
			{ name: "Examples", href: "/docs/examples", external: false },
			{
				name: "Community",
				href: PROJECT_URLS.GITHUB_DISCUSSIONS,
				external: true,
			},
		],
	},
	{
		title: "Company",
		links: [
			{ name: "About", href: "/about", external: false },
			{ name: "Blog", href: "/blog", external: false },
			{ name: "Contact", href: "/contact", external: false },
			{
				name: "MCP Protocol",
				href: "https://modelcontextprotocol.io",
				external: true,
			},
		],
	},
];

const allFooterSections: FooterSection[] = [
	{
		title: "Product",
		links: [
			{ name: "Features", href: "#features" },
			{ name: "Documentation", href: "/docs" },
			{ name: "API Reference", href: "/docs/usage" },
		],
	},
	{
		title: "Community",
		links: [
			{
				name: "GitHub Discussions",
				href: PROJECT_URLS.GITHUB_DISCUSSIONS,
				external: true,
			},
			{
				name: "Contributing Guide",
				href: PROJECT_URLS.GITHUB_CONTRIBUTING,
				external: true,
			},
			{
				name: "Issue Tracker",
				href: PROJECT_URLS.GITHUB_ISSUES,
				external: true,
			},
			{
				name: "Roadmap",
				href: `${PROJECT_URLS.GITHUB_REPO}/projects`,
				external: true,
			},
		],
	},
	...footerSections.filter((section) => section.title === "Resources"),
];

export default function TailscaleMCPLanding() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 w-full">
			{/* Header */}
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
				<div className="container flex h-16 items-center justify-between">
					<div className="flex items-center space-x-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
							<Network className="h-5 w-5 text-primary-foreground" />
						</div>
						<span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
							Tailscale MCP
						</span>
					</div>

					<nav
						className="hidden md:flex items-center space-x-6"
						aria-label="Main navigation"
					>
						<Link
							href="#features"
							className="text-sm font-medium hover:text-primary transition-colors duration-200 focus-visible:focus-visible"
						>
							Features
						</Link>
						<Link
							href="/docs"
							className="text-sm font-medium hover:text-primary transition-colors duration-200 focus-visible:focus-visible"
						>
							Documentation
						</Link>
						<Link
							href="#contact"
							className="text-sm font-medium hover:text-primary transition-colors duration-200 focus-visible:focus-visible"
						>
							Contact
						</Link>
					</nav>

					<div className="flex items-center space-x-2">
						<ThemeToggle />
						<Button
							variant="outline"
							size="sm"
							className="hidden md:inline-flex transition-all duration-200 hover:scale-105"
							asChild
						>
							<Link
								href={PROJECT_URLS.GITHUB_REPO}
								target="_blank"
								rel="noopener noreferrer"
							>
								<SiGithub className="mr-2 h-4 w-4" />
								GitHub
							</Link>
						</Button>
						<Link href="/docs">
							<Button
								size="sm"
								className="transition-all duration-200 hover:scale-105"
							>
								Get Started
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</Link>
						<Button variant="ghost" size="sm" className="md:hidden">
							<Menu className="h-4 w-4" />
							<span className="sr-only">Open menu</span>
						</Button>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<div className="w-full">
				{/* Hero Section */}
				<EnhancedHero />

				{/* Features Section */}
				<EnhancedFeatures />

				{/* Resources Section */}
				<ResourceLinks />

				{/* Contributors Section */}
				<ContributorsShowcase />

				{/* Releases Timeline */}
				<ReleasesTimeline />

				{/* Footer */}
				{/* biome-ignore lint/nursery/useUniqueElementIds: We use page navigation ids */}
				<footer id="contact" className="bg-card border-t py-16">
					<div className="container">
						<AnimatedSection>
							<div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
								<div>
									<div className="flex items-center space-x-2 mb-4">
										<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
											<Network className="h-5 w-5 text-primary-foreground" />
										</div>
										<span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
											Tailscale MCP
										</span>
									</div>
									<p className="text-muted-foreground mb-4 text-sm leading-relaxed">
										High-performance MCP server for intelligent Tailscale
										network management and automation.
									</p>
									<div className="flex space-x-4">
										<Link
											href={PROJECT_URLS.GITHUB_REPO}
											className="text-muted-foreground hover:text-primary transition-colors duration-200"
											aria-label="Visit our GitHub repository"
											target="_blank"
											rel="noopener noreferrer"
										>
											<SiGithub className="h-5 w-5" />
										</Link>
										<Link
											href="https://twitter.com/tailscale"
											className="text-muted-foreground hover:text-primary transition-colors duration-200"
											aria-label="Follow us on Twitter"
											target="_blank"
											rel="noopener noreferrer"
										>
											<Twitter className="h-5 w-5" />
										</Link>
									</div>
								</div>

								{allFooterSections.map((section, index) => (
									<div key={`${section.title}-${index}`}>
										<h3 className="font-semibold mb-4">{section.title}</h3>
										<ul className="space-y-2 text-muted-foreground text-sm">
											{section.links.map((link, linkIndex) => (
												<li key={`${link.name}-${linkIndex}`}>
													<Link
														href={link.href}
														className="hover:text-primary transition-colors duration-200 focus-visible:focus-visible flex items-center"
														target={link.external ? "_blank" : undefined}
														rel={
															link.external ? "noopener noreferrer" : undefined
														}
													>
														{link.name}
														{link.external && (
															<ExternalLink className="ml-1 h-3 w-3" />
														)}
													</Link>
												</li>
											))}
										</ul>
									</div>
								))}
							</div>

							<div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground text-sm">
								<p>
									&copy; {new Date().getFullYear()} Tailscale MCP Server. Open
									source project under MIT License.
								</p>
							</div>
						</AnimatedSection>
					</div>
				</footer>
			</div>
		</div>
	);
}

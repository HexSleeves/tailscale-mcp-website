"use client";

import { Book, Code, ExternalLink, MessageCircle, Users } from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PROJECT_URLS } from "@/lib/constants";

const resources = [
	{
		icon: Book,
		title: "Documentation",
		description:
			"Complete guides and API reference for getting started with Tailscale MCP Server.",
		badge: "Essential",
		links: [
			{ name: "Quick Start Guide", href: "/docs", internal: true },
			{ name: "Installation", href: "/docs/installation", internal: true },
			{ name: "Configuration", href: "/docs/configuration", internal: true },
			{ name: "Usage Examples", href: "/docs/usage", internal: true },
		],
	},
	{
		icon: Code,
		title: "Development",
		description:
			"Resources for developers who want to contribute or extend the functionality.",
		links: [
			{
				name: "GitHub Repository",
				href: PROJECT_URLS.GITHUB_REPO,
				internal: false,
			},
			{
				name: "Contributing Guide",
				href: PROJECT_URLS.GITHUB_CONTRIBUTING,
				internal: false,
			},
			{ name: "API Reference", href: "/docs/usage", internal: true },
			{
				name: "TypeScript Types",
				href: PROJECT_URLS.GITHUB_TYPES,
				internal: false,
			},
		],
		badge: "Developer",
	},
	{
		icon: Users,
		title: "Community",
		description:
			"Connect with other users, get help, and share your experiences.",
		links: [
			{
				name: "GitHub Discussions",
				href: PROJECT_URLS.GITHUB_DISCUSSIONS,
				internal: false,
			},
			{
				name: "Issue Tracker",
				href: PROJECT_URLS.GITHUB_ISSUES,
				internal: false,
			},
			{
				name: "Feature Requests",
				href: PROJECT_URLS.GITHUB_FEATURE_REQUEST,
				internal: false,
			},
			{
				name: "Bug Reports",
				href: PROJECT_URLS.GITHUB_BUG_REPORT,
				internal: false,
			},
		],
		badge: "Community",
	},
	{
		icon: MessageCircle,
		title: "Support",
		description:
			"Get help with implementation, troubleshooting, and best practices.",
		badge: "Help",
		links: [
			{ name: "FAQ", href: "/docs#faq", internal: true },
			{
				name: "Troubleshooting",
				href: "/docs/configuration#troubleshooting",
				internal: true,
			},
			{
				name: "Best Practices",
				href: "/docs/usage#best-practices",
				internal: true,
			},
			{
				name: "Community Help",
				href: PROJECT_URLS.GITHUB_QA_DISCUSSIONS,
				internal: false,
			},
		],
	},
];

export function ResourceLinks() {
	return (
		<section className="py-20 bg-muted/30">
			<div className="container px-4 md:px-6">
				<AnimatedSection>
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Resources & Documentation
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Everything you need to get started, contribute, and get support
							for Tailscale MCP Server.
						</p>
					</div>
				</AnimatedSection>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{resources.map((resource, index) => {
						const Icon = resource.icon;
						return (
							<AnimatedSection
								key={`${resource.title}-${index}`}
								delay={index * 100}
							>
								<Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 group">
									<CardHeader>
										<div className="flex items-center justify-between mb-2">
											<Icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
											<Badge variant="secondary" className="text-xs">
												{resource.badge}
											</Badge>
										</div>
										<CardTitle className="text-lg">{resource.title}</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-muted-foreground text-sm mb-4 leading-relaxed">
											{resource.description}
										</p>
										<div className="space-y-2">
											{resource.links.map((link, linkIndex) => (
												<Link
													key={`${link.name}-${linkIndex}`}
													href={link.href}
													target={link.internal ? undefined : "_blank"}
													rel={
														link.internal ? undefined : "noopener noreferrer"
													}
													className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group/link"
												>
													<span className="group-hover/link:translate-x-1 transition-transform">
														{link.name}
													</span>
													{!link.internal && (
														<ExternalLink className="ml-1 h-3 w-3 opacity-50 group-hover/link:opacity-100" />
													)}
												</Link>
											))}
										</div>
									</CardContent>
								</Card>
							</AnimatedSection>
						);
					})}
				</div>

				<AnimatedSection delay={400}>
					<div className="text-center mt-12">
						<Button asChild size="lg" className="group">
							<Link
								href={PROJECT_URLS.GITHUB_REPO}
								target="_blank"
								rel="noopener noreferrer"
							>
								Explore on GitHub
								<ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
							</Link>
						</Button>
					</div>
				</AnimatedSection>
			</div>
		</section>
	);
}

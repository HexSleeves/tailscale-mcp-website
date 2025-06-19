"use client";

import { ArrowRight, Book, Github, Play, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PROJECT_URLS } from "@/lib/constants";
import { AnimatedSection } from "./animated-section";
import { GitHubStats } from "./github-stats";

const trustedCompanies = [
	{ name: "Vercel", url: "https://vercel.com" },
	{ name: "GitHub", url: "https://github.com" },
	{ name: "Tailscale", url: "https://tailscale.com" },
	{ name: "OpenAI", url: "https://openai.com" },
];

export function EnhancedHero() {
	return (
		<section className="relative py-20 md:py-32 overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

			<div className="container px-4 md:px-6 relative">
				<AnimatedSection className="flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto">
					{/* Status Badge */}
					<Badge
						variant="secondary"
						className="px-4 py-2 animate-pulse bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
					>
						<Zap className="mr-2 h-4 w-4" />
						Powered by Bun Runtime • v1.0.0
					</Badge>

					{/* Main Heading */}
					<div className="space-y-4">
						<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
							Bridge Your
							<span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent animate-gradient">
								{" "}
								Tailscale
							</span>
							<br />
							Network with MCP
						</h1>

						<p className="max-w-3xl text-lg md:text-xl text-muted-foreground leading-relaxed mx-auto">
							A high-performance MCP server built with Bun that seamlessly
							integrates with Tailscale agents. Unlock powerful automation,
							enhance security, and streamline your network operations with
							lightning-fast performance.
						</p>
					</div>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
						<Link href="/docs">
							<Button
								size="lg"
								className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group w-full sm:w-auto"
							>
								Get Started
								<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
							</Button>
						</Link>

						<div className="flex gap-2">
							<Button
								variant="outline"
								size="lg"
								className="px-6 py-3 text-lg font-semibold border-2 hover:bg-accent transition-all duration-300 hover:scale-105"
								asChild
							>
								<Link href="/docs">
									<Book className="mr-2 h-5 w-5" />
									Docs
								</Link>
							</Button>

							<Button
								variant="outline"
								size="lg"
								className="px-6 py-3 text-lg font-semibold border-2 hover:bg-accent transition-all duration-300 hover:scale-105"
								asChild
							>
								<Link
									href={PROJECT_URLS.GITHUB_REPO}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Github className="mr-2 h-5 w-5" />
									GitHub
								</Link>
							</Button>
						</div>
					</div>

					{/* Real-time Stats */}
					<div className="pt-8">
						<GitHubStats variant="compact" />
					</div>

					{/* Hero Image */}
					<div className="pt-12 w-full max-w-5xl">
						<div className="relative group">
							<div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
							<Card className="relative overflow-hidden border-2 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
								<CardContent className="p-0">
									<Image
										src="/placeholder.svg?height=500&width=900&text=Tailscale+MCP+Dashboard+Interface"
										alt="Tailscale MCP Server Dashboard showing network topology, real-time monitoring, and automation controls"
										width={900}
										height={500}
										className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
										priority
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />

									{/* Floating Action Button */}
									<Button
										size="sm"
										className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
									>
										<Play className="h-4 w-4 mr-2" />
										Demo
									</Button>
								</CardContent>
							</Card>
						</div>
					</div>

					{/* Trust Indicators */}
					<div className="flex flex-wrap justify-center items-center gap-8 pt-8 opacity-60">
						<div className="text-sm text-muted-foreground">
							Trusted by developers at
						</div>
						{trustedCompanies.map((company) => (
							<Link
								key={company.name}
								href={company.url}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Badge
									variant="outline"
									className="text-xs hover:bg-muted transition-colors"
								>
									{company.name}
								</Badge>
							</Link>
						))}
					</div>
				</AnimatedSection>
			</div>
		</section>
	);
}

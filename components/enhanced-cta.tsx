"use client";

import { ArrowRight, Download, Github, Star, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PROJECT_URLS } from "@/lib/constants";
import { AnimatedSection } from "./animated-section";

const ctaStats = [
	{
		icon: Star,
		label: "GitHub Stars",
		value: "GitHub",
		link: PROJECT_URLS.GITHUB_REPO,
	},
	{
		icon: Download,
		label: "Downloads",
		value: "npm",
		link: PROJECT_URLS.NPM_PACKAGE,
	},
	{
		icon: Users,
		label: "Contributors",
		value: "Active",
		link: PROJECT_URLS.GITHUB_CONTRIBUTORS,
	},
];

const technologies = ["TypeScript", "Bun Runtime", "Docker Ready", "CI/CD"];

export function EnhancedCTA() {
	return (
		<section className="py-20 relative overflow-hidden">
			{/* Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background/10 via-transparent to-transparent" />

			<div className="container px-4 md:px-6 relative">
				<AnimatedSection>
					<Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-background/95 backdrop-blur">
						<CardContent className="p-8 md:p-12 text-center">
							<Badge
								variant="secondary"
								className="mb-6 bg-primary/10 text-primary"
							>
								Ready to Get Started?
							</Badge>

							<h2 className="text-3xl md:text-4xl font-bold mb-4">
								Transform Your Network Management Today
							</h2>

							<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
								Join thousands of developers and network engineers who are
								already using Tailscale MCP Server to automate their
								infrastructure.
							</p>

							{/* Stats Row */}
							<div className="flex flex-wrap justify-center gap-6 mb-8">
								{ctaStats.map((stat, index) => {
									const Icon = stat.icon;
									return (
										<Link
											key={index}
											href={stat.link}
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-primary transition-colors"
										>
											<div className="flex items-center space-x-2 text-sm text-muted-foreground">
												<Icon className="h-4 w-4 text-primary" />
												<span className="font-semibold text-foreground">
													{stat.label}
												</span>
												<span>on {stat.value}</span>
											</div>
										</Link>
									);
								})}
							</div>

							{/* CTA Buttons */}
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Link href="/docs">
									<Button
										size="lg"
										className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
									>
										Get Started Now
										<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
									</Button>
								</Link>

								<Button
									size="lg"
									variant="outline"
									className="px-8 py-3 text-lg font-semibold border-2 hover:bg-accent transition-all duration-300 hover:scale-105"
									asChild
								>
									<Link
										href={PROJECT_URLS.GITHUB_REPO}
										target="_blank"
										rel="noopener noreferrer"
									>
										<Github className="mr-2 h-5 w-5" />
										View on GitHub
									</Link>
								</Button>
							</div>

							{/* Trust Indicators */}
							<div className="mt-8 pt-8 border-t border-border">
								<p className="text-sm text-muted-foreground mb-4">
									Open source • MIT License • Community driven
								</p>
								<div className="flex flex-wrap justify-center gap-4">
									{technologies.map((tech) => (
										<Badge key={tech} variant="outline" className="text-xs">
											{tech}
										</Badge>
									))}
								</div>
							</div>
						</CardContent>
					</Card>
				</AnimatedSection>
			</div>
		</section>
	);
}

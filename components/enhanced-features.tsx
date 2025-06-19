"use client";

import {
	ArrowRight,
	CheckCircle,
	Lock,
	Server,
	Terminal,
	Zap,
} from "lucide-react";
import { useId } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { AnimatedSection } from "./animated-section";

const features = [
	{
		icon: Terminal,
		title: "Tailscale CLI Integration",
		description:
			"Direct integration with Tailscale CLI commands for seamless network management and automation workflows",
		benefits: [
			"Real-time command execution",
			"Automated network discovery",
			"CLI wrapper functions",
		],
		color: "blue",
		delay: 0,
	},
	{
		icon: Server,
		title: "MCP Protocol Support",
		description:
			"Full Model Context Protocol implementation enabling intelligent agent interactions and automated responses",
		benefits: [
			"Standardized AI integration",
			"Tool and resource management",
			"Event-driven architecture",
		],
		color: "green",
		delay: 100,
	},
	{
		icon: Zap,
		title: "Lightning Fast Performance",
		description:
			"Built with Bun runtime for exceptional performance, minimal resource consumption, and rapid response times",
		benefits: [
			"Sub-millisecond response times",
			"Low memory footprint",
			"Optimized for scale",
		],
		color: "purple",
		delay: 200,
	},
	{
		icon: Lock,
		title: "Secure Agent Communication",
		description:
			"End-to-end encrypted communication channels with robust authentication and authorization mechanisms",
		benefits: [
			"Zero-trust architecture",
			"API key management",
			"Rate limiting & monitoring",
		],
		color: "orange",
		delay: 300,
	},
];

export function EnhancedFeatures() {
	return (
		<section
			id={useId()}
			className="py-20 bg-gradient-to-b from-background to-muted/20"
		>
			<div className="container px-4 md:px-6">
				<AnimatedSection className="text-center mb-16">
					<Badge variant="outline" className="mb-4">
						Features
					</Badge>
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Powerful Features for Modern Networks
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Built from the ground up to provide seamless integration with
						Tailscale&apos;s ecosystem
					</p>
				</AnimatedSection>

				<div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
					{features.map((feature) => {
						const Icon = feature.icon;
						return (
							<AnimatedSection key={feature.title} delay={feature.delay}>
								<Card className="group border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl h-full">
									<CardHeader className="pb-4">
										<div className="flex items-start justify-between">
											<div
												className={`h-12 w-12 rounded-xl bg-${feature.color}-100 dark:bg-${feature.color}-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
											>
												<Icon
													className={`h-6 w-6 text-${feature.color}-600 dark:text-${feature.color}-400`}
												/>
											</div>
											<Badge variant="secondary" className="text-xs">
												Core
											</Badge>
										</div>
										<CardTitle className="text-xl group-hover:text-primary transition-colors">
											{feature.title}
										</CardTitle>
										<CardDescription className="text-base leading-relaxed">
											{feature.description}
										</CardDescription>
									</CardHeader>
									<CardContent className="pt-0">
										<div className="space-y-2 mb-6">
											{feature.benefits.map((benefit) => (
												<div
													key={benefit}
													className="flex items-center text-sm text-muted-foreground"
												>
													<CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
													{benefit}
												</div>
											))}
										</div>
										<Button
											variant="ghost"
											size="sm"
											className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors w-full"
										>
											Learn More
											<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
										</Button>
									</CardContent>
								</Card>
							</AnimatedSection>
						);
					})}
				</div>
			</div>
		</section>
	);
}

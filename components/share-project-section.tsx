"use client";

import {
	Facebook,
	Linkedin,
	LinkIcon,
	Mail,
	Share2,
	Twitter,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PROJECT_URLS } from "@/lib/constants";
import { AnimatedSection } from "./animated-section";

const shareData = {
	title: "Tailscale MCP Server - Intelligent Network Automation",
	description:
		"High-performance MCP server for Tailscale network management and automation. Built with Bun runtime for lightning-fast performance.",
	url: PROJECT_URLS.GITHUB_REPO,
	hashtags: [
		"TailscaleMCP",
		"NetworkAutomation",
		"Bun",
		"OpenSource",
		"DevOps",
	],
};

const shareOptions = [
	{
		name: "Twitter",
		icon: Twitter,
		color: "hover:text-blue-400",
		href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.title)}&url=${encodeURIComponent(shareData.url)}&hashtags=${shareData.hashtags.join(",")}`,
	},
	{
		name: "LinkedIn",
		icon: Linkedin,
		color: "hover:text-blue-600",
		href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`,
	},
	{
		name: "Facebook",
		icon: Facebook,
		color: "hover:text-blue-500",
		href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
	},
	{
		name: "Email",
		icon: Mail,
		color: "hover:text-green-600",
		href: `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(`Check out this awesome project: ${shareData.description}\n\n${shareData.url}`)}`,
	},
];

export function ShareProjectSection() {
	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(shareData.url);
			// You could add a toast notification here
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	return (
		<section className="py-20 bg-gradient-to-r from-primary/5 via-transparent to-accent/5">
			<div className="container px-4 md:px-6">
				<AnimatedSection>
					<div className="text-center mb-12">
						<Badge
							variant="secondary"
							className="mb-4 bg-primary/10 text-primary"
						>
							<Share2 className="mr-2 h-4 w-4" />
							Share the Project
						</Badge>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Help Spread the Word
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Love Tailscale MCP Server? Share it with your network and help
							other developers discover this powerful tool.
						</p>
					</div>
				</AnimatedSection>

				<div className="max-w-4xl mx-auto">
					<div className="grid md:grid-cols-2 gap-8 items-center">
						<AnimatedSection delay={100}>
							<Card className="border-2 hover:shadow-lg transition-all duration-300">
								<CardHeader>
									<CardTitle className="flex items-center">
										<Share2 className="mr-2 h-5 w-5 text-primary" />
										Quick Share
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-6">
										Share Tailscale MCP Server on your favorite social platforms
										or copy the link to share anywhere.
									</p>

									<div className="grid grid-cols-2 gap-3 mb-6">
										{shareOptions.map((option, index) => {
											const Icon = option.icon;
											return (
												<Button
													key={`${option.name}-${index}`}
													variant="outline"
													size="sm"
													className={`justify-start transition-colors ${option.color}`}
													asChild
												>
													<Link
														href={option.href}
														target="_blank"
														rel="noopener noreferrer"
													>
														<Icon className="mr-2 h-4 w-4" />
														{option.name}
													</Link>
												</Button>
											);
										})}
									</div>

									<Button
										variant="secondary"
										size="sm"
										className="w-full"
										onClick={copyToClipboard}
									>
										<LinkIcon className="mr-2 h-4 w-4" />
										Copy Link
									</Button>
								</CardContent>
							</Card>
						</AnimatedSection>

						<AnimatedSection delay={200}>
							<div className="space-y-6">
								<div className="text-center">
									<h3 className="text-2xl font-semibold mb-4">Why Share?</h3>
								</div>

								{[
									{
										title: "Help the Community",
										description:
											"Share knowledge and help other developers discover useful tools for network automation.",
									},
									{
										title: "Support Open Source",
										description:
											"Increase visibility for open source projects and encourage more contributions.",
									},
									{
										title: "Build Your Network",
										description:
											"Connect with like-minded developers and showcase your interest in cutting-edge tech.",
									},
								].map((reason, index) => (
									<div
										key={`${reason.title}-${index}`}
										className="flex items-start space-x-4"
									>
										<div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
											<span className="text-primary font-semibold text-sm">
												{index + 1}
											</span>
										</div>
										<div>
											<h4 className="font-semibold mb-1">{reason.title}</h4>
											<p className="text-muted-foreground text-sm">
												{reason.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</AnimatedSection>
					</div>
				</div>
			</div>
		</section>
	);
}

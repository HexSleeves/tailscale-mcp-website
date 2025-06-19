"use client";

import {
	Check,
	Copy,
	Facebook,
	Linkedin,
	Mail,
	MessageCircle,
	Share2,
	Twitter,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface SocialShareProps {
	url?: string;
	title?: string;
	description?: string;
	hashtags?: string[];
	via?: string;
	className?: string;
	variant?: "default" | "compact" | "floating";
}

const socialPlatforms = [
	{
		name: "Twitter",
		icon: Twitter,
		color: "bg-blue-500 hover:bg-blue-600",
		getUrl: (url: string, title: string, hashtags: string[], via?: string) => {
			const params = new URLSearchParams({
				url,
				text: title,
				hashtags: hashtags.join(","),
				...(via && { via }),
			});
			return `https://twitter.com/intent/tweet?${params.toString()}`;
		},
	},
	{
		name: "LinkedIn",
		icon: Linkedin,
		color: "bg-blue-700 hover:bg-blue-800",
		getUrl: (url: string, title: string) => {
			const params = new URLSearchParams({
				url,
				title,
				summary: "High-performance MCP server for Tailscale network automation",
			});
			return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
		},
	},
	{
		name: "Facebook",
		icon: Facebook,
		color: "bg-blue-600 hover:bg-blue-700",
		getUrl: (url: string) => {
			const params = new URLSearchParams({ u: url });
			return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
		},
	},
	{
		name: "Reddit",
		icon: MessageCircle,
		color: "bg-orange-500 hover:bg-orange-600",
		getUrl: (url: string, title: string) => {
			const params = new URLSearchParams({
				url,
				title,
			});
			return `https://reddit.com/submit?${params.toString()}`;
		},
	},
	{
		name: "Email",
		icon: Mail,
		color: "bg-gray-600 hover:bg-gray-700",
		getUrl: (url: string, title: string, description: string) => {
			const subject = encodeURIComponent(title);
			const body = encodeURIComponent(`${description}\n\n${url}`);
			return `mailto:?subject=${subject}&body=${body}`;
		},
	},
];

export function SocialShare({
	url = typeof window !== "undefined" ? window.location.href : "",
	title = "Tailscale MCP Server - Intelligent Network Automation",
	description = "High-performance MCP server built with Bun for seamless Tailscale network management and automation.",
	hashtags = [
		"TailscaleMCP",
		"NetworkAutomation",
		"Bun",
		"TypeScript",
		"OpenSource",
	],
	via = "tailscale",
	className = "",
	variant = "default",
}: SocialShareProps) {
	const [copied, setCopied] = useState(false);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			toast.success("Link copied to clipboard!");
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			toast.error("Failed to copy link");
		}
	};

	const handleShare = (platform: (typeof socialPlatforms)[0]) => {
		const shareUrl = platform.getUrl(url, title, hashtags, via);
		window.open(shareUrl, "_blank", "width=600,height=400");
	};

	const handleNativeShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title,
					text: description,
					url,
				});
			} catch (err) {
				// User cancelled or error occurred
			}
		}
	};

	if (variant === "compact") {
		return (
			<div className={`flex items-center space-x-2 ${className}`}>
				<span className="text-sm text-muted-foreground">Share:</span>
				{socialPlatforms.slice(0, 3).map((platform) => {
					const Icon = platform.icon;
					return (
						<TooltipProvider key={platform.name}>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										size="sm"
										className="h-8 w-8 p-0"
										onClick={() => handleShare(platform)}
									>
										<Icon className="h-4 w-4" />
										<span className="sr-only">Share on {platform.name}</span>
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Share on {platform.name}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					);
				})}
				<Button
					variant="ghost"
					size="sm"
					className="h-8 w-8 p-0"
					onClick={copyToClipboard}
				>
					{copied ? (
						<Check className="h-4 w-4 text-green-600" />
					) : (
						<Copy className="h-4 w-4" />
					)}
					<span className="sr-only">Copy link</span>
				</Button>
			</div>
		);
	}

	if (variant === "floating") {
		return (
			<div
				className={`fixed left-4 top-1/2 -translate-y-1/2 z-40 space-y-2 ${className}`}
			>
				<div className="bg-background/95 backdrop-blur border rounded-lg p-2 shadow-lg">
					{socialPlatforms.slice(0, 4).map((platform) => {
						const Icon = platform.icon;
						return (
							<TooltipProvider key={platform.name}>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											variant="ghost"
											size="sm"
											className="w-full h-10 mb-1 last:mb-0"
											onClick={() => handleShare(platform)}
										>
											<Icon className="h-4 w-4" />
											<span className="sr-only">Share on {platform.name}</span>
										</Button>
									</TooltipTrigger>
									<TooltipContent side="right">
										<p>Share on {platform.name}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						);
					})}
				</div>
			</div>
		);
	}

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle className="flex items-center text-lg">
					<Share2 className="mr-2 h-5 w-5" />
					Share This Project
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
					{socialPlatforms.map((platform) => {
						const Icon = platform.icon;
						return (
							<Button
								key={platform.name}
								variant="outline"
								className={`${platform.color} text-white border-0 hover:scale-105 transition-transform`}
								onClick={() => handleShare(platform)}
							>
								<Icon className="mr-2 h-4 w-4" />
								{platform.name}
							</Button>
						);
					})}
				</div>

				<div className="flex items-center space-x-2 pt-4 border-t">
					<div className="flex-1 bg-muted rounded px-3 py-2 text-sm font-mono truncate">
						{url}
					</div>
					<Button
						variant="outline"
						size="sm"
						onClick={copyToClipboard}
						className="flex-shrink-0"
					>
						{copied ? (
							<Check className="h-4 w-4 text-green-600" />
						) : (
							<Copy className="h-4 w-4" />
						)}
						{copied ? "Copied!" : "Copy"}
					</Button>
				</div>

				{navigator.share && (
					<Button
						variant="secondary"
						className="w-full"
						onClick={handleNativeShare}
					>
						<Share2 className="mr-2 h-4 w-4" />
						Share via Device
					</Button>
				)}

				<div className="flex flex-wrap gap-1 pt-2">
					{hashtags.map((tag) => (
						<Badge key={tag} variant="secondary" className="text-xs">
							#{tag}
						</Badge>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

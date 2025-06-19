"use client";

import { AlertCircle, ExternalLink, RefreshCw, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc/client";
import { AnimatedSection } from "./animated-section";

interface ContributorsShowcaseProps {
	limit?: number;
	showAll?: boolean;
	className?: string;
}

export function ContributorsShowcase({
	limit = 12,
	showAll = false,
	className = "",
}: ContributorsShowcaseProps) {
	const {
		data: contributorsData,
		isLoading,
		error,
		refetch,
	} = trpc.github.getContributors.useQuery(
		{ limit: showAll ? 100 : limit },
		{
			refetchOnWindowFocus: false,
			refetchOnMount: true,
			staleTime: 15 * 60 * 1000, // 15 minutes
			cacheTime: 60 * 60 * 1000, // 1 hour
		},
	);

	if (error) {
		return (
			<Alert className={className} variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertDescription className="flex items-center justify-between">
					<span>Failed to load contributors: {error.message}</span>
					<Button variant="ghost" size="sm" onClick={() => refetch()}>
						<RefreshCw className="h-4 w-4" />
					</Button>
				</AlertDescription>
			</Alert>
		);
	}

	const contributors = contributorsData?.data || [];
	const totalContributors = contributorsData?.total || 0;

	return (
		<section className={`py-16 ${className}`}>
			<div className="container px-4 md:px-6">
				<AnimatedSection className="text-center mb-12">
					<Badge variant="outline" className="mb-4">
						<Users className="mr-2 h-4 w-4" />
						Contributors
					</Badge>
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Built by the Community
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Tailscale MCP Server is made possible by the contributions of
						developers from around the world.
						{totalContributors > 0 && (
							<span className="block mt-2 font-semibold">
								{totalContributors} contributors and counting!
							</span>
						)}
					</p>
				</AnimatedSection>

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="flex items-center">
								<Users className="mr-2 h-5 w-5" />
								Top Contributors
							</CardTitle>
							<Link
								href="https://github.com/HexSleeves/tailscale-mcp/graphs/contributors"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Button variant="outline" size="sm">
									View All
									<ExternalLink className="ml-2 h-4 w-4" />
								</Button>
							</Link>
						</div>
					</CardHeader>
					<CardContent>
						{isLoading ? (
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
								{Array.from({ length: limit }).map((_, index) => (
									<div
										key={index}
										className="flex flex-col items-center space-y-2"
									>
										<Skeleton className="h-16 w-16 rounded-full" />
										<Skeleton className="h-4 w-20" />
										<Skeleton className="h-3 w-16" />
									</div>
								))}
							</div>
						) : contributors.length > 0 ? (
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
								{contributors.map((contributor, index) => (
									<AnimatedSection key={contributor.id} delay={index * 50}>
										<Link
											href={contributor.html_url}
											target="_blank"
											rel="noopener noreferrer"
											className="group"
										>
											<div className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
												<div className="relative">
													<Image
														src={contributor.avatar_url || "/placeholder.svg"}
														alt={`${contributor.login}'s avatar`}
														width={64}
														height={64}
														className="rounded-full ring-2 ring-transparent group-hover:ring-primary transition-all duration-300"
													/>
													{index < 3 && (
														<div className="absolute -top-1 -right-1 h-6 w-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
															{index + 1}
														</div>
													)}
												</div>
												<div className="text-center">
													<div className="font-medium text-sm group-hover:text-primary transition-colors truncate max-w-[80px]">
														{contributor.login}
													</div>
													<div className="text-xs text-muted-foreground">
														{contributor.contributions} commits
													</div>
												</div>
											</div>
										</Link>
									</AnimatedSection>
								))}
							</div>
						) : (
							<div className="text-center py-8 text-muted-foreground">
								No contributors data available
							</div>
						)}

						{!showAll && totalContributors > limit && (
							<div className="mt-6 text-center">
								<Link
									href="https://github.com/HexSleeves/tailscale-mcp/graphs/contributors"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Button variant="outline">
										View All {totalContributors} Contributors
										<ExternalLink className="ml-2 h-4 w-4" />
									</Button>
								</Link>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}

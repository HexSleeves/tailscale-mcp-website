"use client";

import { format, formatDistanceToNow } from "date-fns";
import {
	AlertCircle,
	Calendar,
	ExternalLink,
	RefreshCw,
	Tag,
} from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc/client";
import { PROJECT_URLS } from "@/lib/constants";
import { AnimatedSection } from "./animated-section";

interface ReleasesTimelineProps {
	limit?: number;
	className?: string;
}

export function ReleasesTimeline({
	limit = 5,
	className = "",
}: ReleasesTimelineProps) {
	const {
		data: releasesData,
		isLoading,
		error,
		refetch,
	} = trpc.github.getReleases.useQuery(
		{ limit },
		{
			refetchOnWindowFocus: false,
			refetchOnMount: true,
			staleTime: 30 * 60 * 1000, // 30 minutes
			gcTime: 2 * 60 * 60 * 1000, // 2 hours
		},
	);

	if (error) {
		return (
			<Alert className={className} variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertDescription className="flex items-center justify-between">
					<span>Failed to load releases: {error.message}</span>
					<Button variant="ghost" size="sm" onClick={() => refetch()}>
						<RefreshCw className="h-4 w-4" />
					</Button>
				</AlertDescription>
			</Alert>
		);
	}

	const releases = releasesData?.data || [];

	return (
		<section className={`py-16 ${className}`}>
			<div className="container px-4 md:px-6">
				<AnimatedSection className="text-center mb-12">
					<Badge variant="outline" className="mb-4">
						<Tag className="mr-2 h-4 w-4" />
						Releases
					</Badge>
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Release History
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Stay up to date with the latest features, improvements, and bug
						fixes in Tailscale MCP Server.
					</p>
				</AnimatedSection>

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="flex items-center">
								<Tag className="mr-2 h-5 w-5" />
								Latest Releases
							</CardTitle>
							<Link
								href={PROJECT_URLS.GITHUB_RELEASES}
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
							<div className="space-y-6">
								{Array.from({ length: limit }).map((_, index) => {
									return (
										<div key={index} className="flex space-x-4">
											<Skeleton className="h-10 w-10 rounded-full" />
											<div className="flex-1 space-y-2">
												<Skeleton className="h-5 w-32" />
												<Skeleton className="h-4 w-24" />
												<Skeleton className="h-16 w-full" />
											</div>
										</div>
									);
								})}
							</div>
						) : releases.length > 0 ? (
							<div className="space-y-6">
								{releases.map((release, index) => (
									<AnimatedSection key={release.id} delay={index * 100}>
										<div className="flex space-x-4 group">
											<div className="flex-shrink-0">
												<div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
													<Tag className="h-5 w-5 text-primary" />
												</div>
												{index < releases.length - 1 && (
													<div className="mt-2 ml-5 h-6 w-px bg-border" />
												)}
											</div>
											<div className="flex-1 min-w-0">
												<div className="flex items-center space-x-2 mb-2">
													<Link
														href={release.html_url}
														target="_blank"
														rel="noopener noreferrer"
														className="font-semibold text-lg hover:text-primary transition-colors"
													>
														{release.name || release.tag_name}
													</Link>
													<Badge variant="secondary">{release.tag_name}</Badge>
													{index === 0 && (
														<Badge variant="default">Latest</Badge>
													)}
												</div>
												<div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
													<div className="flex items-center space-x-1">
														<Calendar className="h-4 w-4" />
														<span>
															{format(
																new Date(release.published_at),
																"MMM d, yyyy",
															)}
														</span>
													</div>
													<span>•</span>
													<span>
														{formatDistanceToNow(
															new Date(release.published_at),
															{ addSuffix: true },
														)}
													</span>
												</div>
												{release.body && (
													<div className="prose prose-sm max-w-none text-muted-foreground">
														<p className="line-clamp-3">
															{release.body.split("\n")[0] ||
																"No description available"}
														</p>
													</div>
												)}
												<div className="mt-3">
													<Link
														href={release.html_url}
														target="_blank"
														rel="noopener noreferrer"
													>
														<Button
															variant="ghost"
															size="sm"
															className="opacity-0 group-hover:opacity-100 transition-opacity"
														>
															View Release
															<ExternalLink className="ml-2 h-3 w-3" />
														</Button>
													</Link>
												</div>
											</div>
										</div>
									</AnimatedSection>
								))}
							</div>
						) : (
							<div className="text-center py-8 text-muted-foreground">
								No releases available
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}

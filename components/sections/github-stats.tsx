"use client";

import {
	AlertCircle,
	Download,
	Eye,
	GitFork,
	Package,
	RefreshCw,
	Star,
	Users,
} from "lucide-react";
import Link from "next/link";
import { HydrationSafeWrapper } from "@/components/shared/hydration-safe-wrapper";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PROJECT_URLS } from "@/lib/constants";
import { trpc } from "@/lib/trpc/client";
import { formatNumber } from "@/lib/utils";

interface GitHubStatsProps {
	variant?: "default" | "compact" | "detailed";
	showRefresh?: boolean;
	className?: string;
}

export function GitHubStats({
	variant = "default",
	showRefresh = false,
	className = "",
}: GitHubStatsProps) {
	const {
		data: statsData,
		isLoading: statsLoading,
		error: statsError,
		refetch: refetchStats,
		isRefetching: isRefetchingStats,
	} = trpc.github.getStats.useQuery(undefined, {
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 15 * 60 * 1000, // 15 minutes (v5 optimization)
		refetchOnWindowFocus: false,
		refetchOnMount: true,
		retry: (failureCount, error) => {
			if (error.message.includes("Rate limit")) {
				return failureCount < 1;
			}
			return failureCount < 3;
		},
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	});

	const {
		data: npmData,
		isLoading: npmLoading,
		refetch: refetchNpm,
		isRefetching: isRefetchingNpm,
	} = trpc.github.getNpmDownloads.useQuery(undefined, {
		staleTime: 60 * 60 * 1000, // 1 hour
		gcTime: 2 * 60 * 60 * 1000, // 2 hours (v5 optimization)
		refetchOnWindowFocus: false,
		refetchOnMount: true,
		retry: (failureCount, error) => {
			if (error.message.includes("404")) {
				return false;
			}
			return failureCount < 2;
		},
		retryDelay: (attemptIndex) => Math.min(2000 * 2 ** attemptIndex, 60000),
	});

	const handleRefresh = async () => {
		if (typeof window !== "undefined") {
			const refreshStart = performance.now();
			await Promise.all([refetchStats(), refetchNpm()]);
			const refreshTime = performance.now() - refreshStart;
			console.log(`🚀 Refresh completed in ${refreshTime.toFixed(2)}ms`);
		} else {
			await Promise.all([refetchStats(), refetchNpm()]);
		}
	};

	const stats = statsData?.data;
	const npmDownloads = npmData?.data;
	const isRefreshing = isRefetchingStats || isRefetchingNpm;

	if (statsError) {
		return (
			<Alert className={className} variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertDescription className="flex items-center justify-between">
					<div>
						<span>Failed to load GitHub data: {statsError?.message}</span>
					</div>

					{showRefresh && (
						<Button
							variant="ghost"
							size="sm"
							onClick={handleRefresh}
							disabled={isRefreshing}
						>
							<RefreshCw
								className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
							/>
						</Button>
					)}
				</AlertDescription>
			</Alert>
		);
	}

	if (variant === "compact") {
		return (
			<HydrationSafeWrapper
				className={`flex flex-wrap gap-4 items-center ${className}`}
			>
				{statsLoading ? (
					<>
						<Skeleton className="h-8 w-20" />
						<Skeleton className="h-8 w-20" />
						<Skeleton className="h-8 w-20" />
					</>
				) : (
					<>
						<Link
							href={PROJECT_URLS.GITHUB_REPO}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Badge
								variant="secondary"
								className="flex items-center gap-1 hover:bg-muted transition-colors"
							>
								<Star className="h-3 w-3" />
								{formatNumber(stats?.stars || 0)}
							</Badge>
						</Link>
						<Link
							href={PROJECT_URLS.NPM_PACKAGE}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Badge
								variant="secondary"
								className="flex items-center gap-1 hover:bg-muted transition-colors"
							>
								<Download className="h-3 w-3" />
								{npmLoading
									? "..."
									: formatNumber(npmDownloads?.downloads || 0)}
								{isRefetchingNpm && (
									<RefreshCw className="h-3 w-3 animate-spin ml-1" />
								)}
							</Badge>
						</Link>
						<Link
							href={PROJECT_URLS.GITHUB_CONTRIBUTORS}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Badge
								variant="secondary"
								className="flex items-center gap-1 hover:bg-muted transition-colors"
							>
								<Users className="h-3 w-3" />
								{formatNumber(stats?.contributors || 0)}
							</Badge>
						</Link>
					</>
				)}
			</HydrationSafeWrapper>
		);
	}

	const statItems = [
		{
			icon: Star,
			label: "Stars",
			value: stats?.stars || 0,
			link: `${PROJECT_URLS.GITHUB_REPO}/stargazers`,
			color: "text-yellow-600",
		},
		{
			icon: GitFork,
			label: "Forks",
			value: stats?.forks || 0,
			link: `${PROJECT_URLS.GITHUB_REPO}/network/members`,
			color: "text-blue-600",
		},
		{
			icon: Eye,
			label: "Watchers",
			value: stats?.watchers || 0,
			link: `${PROJECT_URLS.GITHUB_REPO}/watchers`,
			color: "text-green-600",
		},
		{
			icon: Users,
			label: "Contributors",
			value: stats?.contributors || 0,
			link: PROJECT_URLS.GITHUB_CONTRIBUTORS,
			color: "text-purple-600",
		},
		{
			icon: Download,
			label: "Downloads",
			value: npmDownloads?.downloads || 0,
			link: PROJECT_URLS.NPM_PACKAGE,
			color: "text-red-600",
			suffix: "/month",
		},
		{
			icon: Package,
			label: "Releases",
			value: stats?.releases || 0,
			link: PROJECT_URLS.GITHUB_RELEASES,
			color: "text-orange-600",
		},
	];

	if (variant === "detailed") {
		return (
			<HydrationSafeWrapper className={`space-y-6 ${className}`}>
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold">Project Statistics</h3>
					<div className="flex items-center gap-2">
						{showRefresh && (
							<Button
								variant="ghost"
								size="sm"
								onClick={handleRefresh}
								disabled={statsLoading || npmLoading || isRefreshing}
							>
								<RefreshCw
									className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
								/>
								{isRefreshing ? "Refreshing..." : "Refresh"}
							</Button>
						)}
					</div>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					{statItems.map((item) => (
						<Link
							key={item.label}
							href={item.link}
							target="_blank"
							rel="noopener noreferrer"
							className="group"
						>
							<Card className="transition-all hover:shadow-md">
								<CardContent className="p-4">
									<div className="flex flex-col items-center text-center">
										<item.icon className={`h-6 w-6 mb-2 ${item.color}`} />
										<div className="text-2xl font-bold">
											{statsLoading ||
											(item.label === "Downloads" && npmLoading) ? (
												<Skeleton className="h-8 w-16 mx-auto" />
											) : (
												<>
													{formatNumber(item.value)}
													{item.suffix}
												</>
											)}
										</div>
										<div className="text-sm text-muted-foreground">
											{item.label}
										</div>
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</HydrationSafeWrapper>
		);
	}

	return (
		<HydrationSafeWrapper>
			<Card className={className}>
				<CardContent className="p-6">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold">GitHub Stats</h3>
						{showRefresh && (
							<Button
								size="sm"
								variant="ghost"
								onClick={handleRefresh}
								disabled={statsLoading || npmLoading || isRefreshing}
							>
								<RefreshCw
									className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
								/>
							</Button>
						)}
					</div>

					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						{statItems.map((item) => (
							<Link
								key={item.label}
								href={item.link}
								target="_blank"
								rel="noopener noreferrer"
								className="group"
							>
								<div className="flex flex-col items-center text-center p-2 rounded-lg hover:bg-muted transition-colors">
									<item.icon className={`h-5 w-5 mb-1 ${item.color}`} />
									<div className="text-xl font-bold">
										{statsLoading ||
										(item.label === "Downloads" && npmLoading) ? (
											<Skeleton className="h-7 w-14" />
										) : (
											<>
												{formatNumber(item.value)}
												{item.suffix}
											</>
										)}
									</div>
									<div className="text-xs text-muted-foreground">
										{item.label}
									</div>
								</div>
							</Link>
						))}
					</div>
				</CardContent>
			</Card>
		</HydrationSafeWrapper>
	);
}

"use client";

import {
	AlertCircle,
	CheckCircle,
	Clock,
	Download,
	Github,
	Package,
	RefreshCw,
	Star,
	Users,
	XCircle,
} from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc/client";

interface TestResult {
	name: string;
	status: "pending" | "success" | "error";
	duration?: number;
	data?: any;
	error?: string;
}

export function GitHubAPIDiagnostics() {
	const [testResults, setTestResults] = useState<TestResult[]>([]);
	const [isRunning, setIsRunning] = useState(false);

	// TRPC queries for testing
	const statsQuery = trpc.github.getStats.useQuery(undefined, {
		enabled: false,
	});
	const repoQuery = trpc.github.getRepository.useQuery(undefined, {
		enabled: false,
	});
	const contributorsQuery = trpc.github.getContributors.useQuery(
		{ limit: 5 },
		{ enabled: false },
	);
	const releasesQuery = trpc.github.getReleases.useQuery(
		{ limit: 3 },
		{ enabled: false },
	);
	const npmQuery = trpc.github.getNpmDownloads.useQuery(undefined, {
		enabled: false,
	});
	const rateLimitQuery = trpc.github.getRateLimit.useQuery(undefined, {
		enabled: false,
	});

	const runTests = async () => {
		setIsRunning(true);
		setTestResults([]);

		const tests = [
			{
				name: "Repository Data",
				query: repoQuery,
				icon: Github,
			},
			{
				name: "GitHub Stats",
				query: statsQuery,
				icon: Star,
			},
			{
				name: "Contributors",
				query: contributorsQuery,
				icon: Users,
			},
			{
				name: "Releases",
				query: releasesQuery,
				icon: Package,
			},
			{
				name: "NPM Downloads",
				query: npmQuery,
				icon: Download,
			},
			{
				name: "Rate Limit",
				query: rateLimitQuery,
				icon: Clock,
			},
		];

		for (const test of tests) {
			const startTime = Date.now();

			// Add pending result
			setTestResults((prev) => [
				...prev,
				{
					name: test.name,
					status: "pending",
				},
			]);

			try {
				const result = await test.query.refetch();
				const duration = Date.now() - startTime;

				setTestResults((prev) =>
					prev.map((r) =>
						r.name === test.name
							? {
									...r,
									status: result.isSuccess ? "success" : "error",
									duration,
									data: result.data,
									error: result.error?.message,
								}
							: r,
					),
				);
			} catch (error) {
				const duration = Date.now() - startTime;

				setTestResults((prev) =>
					prev.map((r) =>
						r.name === test.name
							? {
									...r,
									status: "error",
									duration,
									error:
										error instanceof Error ? error.message : "Unknown error",
								}
							: r,
					),
				);
			}

			// Small delay between tests
			await new Promise((resolve) => setTimeout(resolve, 500));
		}

		setIsRunning(false);
	};

	const getStatusIcon = (status: TestResult["status"]) => {
		switch (status) {
			case "success":
				return <CheckCircle className="h-5 w-5 text-green-600" />;
			case "error":
				return <XCircle className="h-5 w-5 text-red-600" />;
			case "pending":
				return <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />;
		}
	};

	const getStatusBadge = (status: TestResult["status"]) => {
		switch (status) {
			case "success":
				return (
					<Badge variant="default" className="bg-green-100 text-green-800">
						Success
					</Badge>
				);
			case "error":
				return <Badge variant="destructive">Error</Badge>;
			case "pending":
				return <Badge variant="secondary">Running...</Badge>;
		}
	};

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Github className="h-6 w-6" />
						GitHub API Diagnostics
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<Alert>
							<AlertCircle className="h-4 w-4" />
							<AlertDescription>
								This tool tests all GitHub API endpoints for the repository{" "}
								<strong>HexSleeves/tailscale-mcp</strong>. It will verify data
								fetching, authentication, and caching mechanisms.
							</AlertDescription>
						</Alert>

						<Button onClick={runTests} disabled={isRunning} className="w-full">
							{isRunning ? (
								<>
									<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
									Running Tests...
								</>
							) : (
								<>
									<Github className="h-4 w-4 mr-2" />
									Run API Tests
								</>
							)}
						</Button>
					</div>
				</CardContent>
			</Card>

			{testResults.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle>Test Results</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{testResults.map((result, index) => (
								<div key={index} className="border rounded-lg p-4">
									<div className="flex items-center justify-between mb-2">
										<div className="flex items-center gap-2">
											{getStatusIcon(result.status)}
											<span className="font-medium">{result.name}</span>
										</div>
										<div className="flex items-center gap-2">
											{result.duration && (
												<span className="text-sm text-muted-foreground">
													{result.duration}ms
												</span>
											)}
											{getStatusBadge(result.status)}
										</div>
									</div>

									{result.error && (
										<Alert variant="destructive" className="mt-2">
											<AlertCircle className="h-4 w-4" />
											<AlertDescription>{result.error}</AlertDescription>
										</Alert>
									)}

									{result.data && result.status === "success" && (
										<div className="mt-2 p-3 bg-muted rounded-md">
											<pre className="text-sm overflow-x-auto">
												{JSON.stringify(result.data, null, 2)}
											</pre>
										</div>
									)}
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			)}

			<Card>
				<CardHeader>
					<CardTitle>Configuration Check</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<span>Repository:</span>
							<Badge variant="outline">HexSleeves/tailscale-mcp</Badge>
						</div>
						<div className="flex items-center justify-between">
							<span>GitHub Token:</span>
							<Badge
								variant={process.env.GITHUB_TOKEN ? "default" : "destructive"}
							>
								{process.env.GITHUB_TOKEN ? "Configured" : "Not Set"}
							</Badge>
						</div>
						<div className="flex items-center justify-between">
							<span>Rate Limit:</span>
							<Badge variant="secondary">
								{process.env.GITHUB_TOKEN ? "5000/hour" : "60/hour"}
							</Badge>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

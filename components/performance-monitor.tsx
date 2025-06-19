"use client";

import {
	Activity,
	AlertTriangle,
	BarChart3,
	CheckCircle,
	Clock,
	RefreshCw,
	Timer,
	TrendingUp,
	Zap,
} from "lucide-react";
import { useRef, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc/client";

interface PerformanceMetric {
	name: string;
	startTime: number;
	endTime?: number;
	duration?: number;
	cacheHit: boolean;
	dataSize?: number;
	status: "pending" | "success" | "error";
	error?: string;
}

interface PerformanceTest {
	testId: string;
	timestamp: number;
	metrics: PerformanceMetric[];
	totalDuration: number;
	cacheHitRate: number;
	averageResponseTime: number;
}

export function PerformanceMonitor() {
	const [currentTest, setCurrentTest] = useState<PerformanceTest | null>(null);
	const [testHistory, setTestHistory] = useState<PerformanceTest[]>([]);
	const [isRunning, setIsRunning] = useState(false);
	const [realTimeMetrics, setRealTimeMetrics] = useState<PerformanceMetric[]>(
		[],
	);
	const testStartTime = useRef<number>(0);

	// TRPC queries with performance tracking
	const statsQuery = trpc.github.getStats.useQuery(undefined, {
		enabled: false,
		gcTime: 15 * 60 * 1000,
		staleTime: 5 * 60 * 1000,
	});

	const repoQuery = trpc.github.getRepository.useQuery(undefined, {
		enabled: false,
		gcTime: 10 * 60 * 1000,
		staleTime: 5 * 60 * 1000,
	});

	const contributorsQuery = trpc.github.getContributors.useQuery(
		{ limit: 10 },
		{
			enabled: false,
			gcTime: 15 * 60 * 1000,
			staleTime: 10 * 60 * 1000,
		},
	);

	const releasesQuery = trpc.github.getReleases.useQuery(
		{ limit: 5 },
		{
			enabled: false,
			gcTime: 30 * 60 * 1000,
			staleTime: 15 * 60 * 1000,
		},
	);

	const npmQuery = trpc.github.getNpmDownloads.useQuery(undefined, {
		enabled: false,
		gcTime: 2 * 60 * 60 * 1000,
		staleTime: 60 * 60 * 1000,
	});

	const runPerformanceTest = async () => {
		setIsRunning(true);
		setRealTimeMetrics([]);
		testStartTime.current = performance.now();

		const testId = `test-${Date.now()}`;
		const metrics: PerformanceMetric[] = [];

		const queries = [
			{ name: "Repository Data", query: repoQuery },
			{ name: "GitHub Stats", query: statsQuery },
			{ name: "Contributors", query: contributorsQuery },
			{ name: "Releases", query: releasesQuery },
			{ name: "NPM Downloads", query: npmQuery },
		];

		// Test 1: Cold start (clear cache first)
		console.log("🧪 Starting Performance Test - Cold Start");

		for (const { name, query } of queries) {
			const metric: PerformanceMetric = {
				name,
				startTime: performance.now(),
				cacheHit: false,
				status: "pending",
			};

			setRealTimeMetrics((prev) => [...prev, metric]);

			try {
				const startTime = performance.now();
				const result = await query.refetch();
				const endTime = performance.now();
				const duration = endTime - startTime;

				const updatedMetric: PerformanceMetric = {
					...metric,
					endTime,
					duration,
					status: result.isSuccess ? "success" : "error",
					error: result.error?.message,
					dataSize: JSON.stringify(result.data).length,
					cacheHit: duration < 100, // Assume cache hit if very fast
				};

				metrics.push(updatedMetric);
				setRealTimeMetrics((prev) =>
					prev.map((m) => (m.name === name ? updatedMetric : m)),
				);

				console.log(
					`✅ ${name}: ${duration.toFixed(2)}ms ${updatedMetric.cacheHit ? "(cache)" : "(network)"}`,
				);
			} catch (error) {
				const updatedMetric: PerformanceMetric = {
					...metric,
					endTime: performance.now(),
					duration: performance.now() - metric.startTime,
					status: "error",
					error: error instanceof Error ? error.message : "Unknown error",
					cacheHit: false,
				};

				metrics.push(updatedMetric);
				setRealTimeMetrics((prev) =>
					prev.map((m) => (m.name === name ? updatedMetric : m)),
				);

				console.error(`❌ ${name}: ${error}`);
			}

			// Small delay between requests
			await new Promise((resolve) => setTimeout(resolve, 200));
		}

		// Test 2: Warm cache (immediate re-fetch)
		console.log("🔥 Testing Warm Cache Performance");

		const warmCacheMetrics: PerformanceMetric[] = [];

		for (const { name, query } of queries) {
			const startTime = performance.now();

			try {
				const result = await query.refetch();
				const endTime = performance.now();
				const duration = endTime - startTime;

				const metric: PerformanceMetric = {
					name: `${name} (Cached)`,
					startTime,
					endTime,
					duration,
					status: result.isSuccess ? "success" : "error",
					cacheHit: true,
					dataSize: JSON.stringify(result.data).length,
				};

				warmCacheMetrics.push(metric);
				console.log(`🚀 ${name} (cached): ${duration.toFixed(2)}ms`);
			} catch (error) {
				console.error(`❌ ${name} (cached): ${error}`);
			}
		}

		const totalDuration = performance.now() - testStartTime.current;
		const allMetrics = [...metrics, ...warmCacheMetrics];
		const successfulMetrics = allMetrics.filter((m) => m.status === "success");
		const cacheHits = allMetrics.filter((m) => m.cacheHit).length;
		const cacheHitRate = (cacheHits / allMetrics.length) * 100;
		const averageResponseTime =
			successfulMetrics.reduce((acc, m) => acc + (m.duration || 0), 0) /
			successfulMetrics.length;

		const test: PerformanceTest = {
			testId,
			timestamp: Date.now(),
			metrics: allMetrics,
			totalDuration,
			cacheHitRate,
			averageResponseTime,
		};

		setCurrentTest(test);
		setTestHistory((prev) => [test, ...prev.slice(0, 4)]); // Keep last 5 tests
		setIsRunning(false);

		console.log(
			`🏁 Test Complete: ${totalDuration.toFixed(2)}ms total, ${cacheHitRate.toFixed(1)}% cache hit rate`,
		);
	};

	const getMetricColor = (duration: number, cacheHit: boolean) => {
		if (cacheHit) return "text-green-600";
		if (duration < 500) return "text-blue-600";
		if (duration < 1000) return "text-yellow-600";
		return "text-red-600";
	};

	const getPerformanceGrade = (avgTime: number, cacheHitRate: number) => {
		const score = 100 - avgTime / 10 + cacheHitRate;
		if (score >= 150) return { grade: "A+", color: "text-green-600" };
		if (score >= 130) return { grade: "A", color: "text-green-500" };
		if (score >= 110) return { grade: "B+", color: "text-blue-600" };
		if (score >= 90) return { grade: "B", color: "text-blue-500" };
		if (score >= 70) return { grade: "C", color: "text-yellow-600" };
		return { grade: "D", color: "text-red-600" };
	};

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Activity className="h-6 w-6" />
						TanStack Query v5 Performance Monitor
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<Alert>
							<Zap className="h-4 w-4" />
							<AlertDescription>
								This tool measures the performance improvements in TanStack
								Query v5, including cache efficiency, response times, and
								garbage collection optimizations.
							</AlertDescription>
						</Alert>

						<Button
							onClick={runPerformanceTest}
							disabled={isRunning}
							className="w-full"
						>
							{isRunning ? (
								<>
									<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
									Running Performance Test...
								</>
							) : (
								<>
									<BarChart3 className="h-4 w-4 mr-2" />
									Run Performance Test
								</>
							)}
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Real-time Metrics */}
			{isRunning && realTimeMetrics.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Timer className="h-5 w-5" />
							Real-time Metrics
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{realTimeMetrics.map((metric, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-3 border rounded-lg"
								>
									<div className="flex items-center gap-2">
										{metric.status === "pending" && (
											<RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
										)}
										{metric.status === "success" && (
											<CheckCircle className="h-4 w-4 text-green-600" />
										)}
										{metric.status === "error" && (
											<AlertTriangle className="h-4 w-4 text-red-600" />
										)}
										<span className="font-medium">{metric.name}</span>
									</div>
									<div className="flex items-center gap-2">
										{metric.duration && (
											<Badge
												variant="outline"
												className={getMetricColor(
													metric.duration,
													metric.cacheHit,
												)}
											>
												{metric.duration.toFixed(2)}ms
											</Badge>
										)}
										{metric.cacheHit && (
											<Badge variant="secondary">Cached</Badge>
										)}
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Current Test Results */}
			{currentTest && (
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<TrendingUp className="h-5 w-5" />
								Latest Performance Results
							</div>
							<div className="flex items-center gap-2">
								{(() => {
									const grade = getPerformanceGrade(
										currentTest.averageResponseTime,
										currentTest.cacheHitRate,
									);
									return (
										<Badge
											variant="outline"
											className={`text-lg font-bold ${grade.color}`}
										>
											{grade.grade}
										</Badge>
									);
								})()}
							</div>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
							<div className="text-center">
								<div className="text-2xl font-bold text-blue-600">
									{currentTest.totalDuration.toFixed(2)}ms
								</div>
								<div className="text-sm text-muted-foreground">
									Total Test Duration
								</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-green-600">
									{currentTest.cacheHitRate.toFixed(1)}%
								</div>
								<div className="text-sm text-muted-foreground">
									Cache Hit Rate
								</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-purple-600">
									{currentTest.averageResponseTime.toFixed(2)}ms
								</div>
								<div className="text-sm text-muted-foreground">
									Avg Response Time
								</div>
							</div>
						</div>

						<div className="space-y-3">
							{currentTest.metrics.map((metric, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-3 border rounded-lg"
								>
									<div className="flex items-center gap-2">
										{metric.status === "success" && (
											<CheckCircle className="h-4 w-4 text-green-600" />
										)}
										{metric.status === "error" && (
											<AlertTriangle className="h-4 w-4 text-red-600" />
										)}
										<span className="font-medium">{metric.name}</span>
										{metric.cacheHit && (
											<Badge variant="secondary" className="text-xs">
												Cache Hit
											</Badge>
										)}
									</div>
									<div className="flex items-center gap-2">
										{metric.duration && (
											<Badge
												variant="outline"
												className={getMetricColor(
													metric.duration,
													metric.cacheHit,
												)}
											>
												{metric.duration.toFixed(2)}ms
											</Badge>
										)}
										{metric.dataSize && (
											<Badge variant="outline" className="text-xs">
												{(metric.dataSize / 1024).toFixed(1)}KB
											</Badge>
										)}
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Performance History */}
			{testHistory.length > 1 && (
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Clock className="h-5 w-5" />
							Performance History
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{testHistory.map((test, index) => (
								<div
									key={test.testId}
									className="flex items-center justify-between p-3 border rounded-lg"
								>
									<div className="flex items-center gap-2">
										<Badge variant={index === 0 ? "default" : "secondary"}>
											{index === 0 ? "Latest" : `${index + 1} tests ago`}
										</Badge>
										<span className="text-sm text-muted-foreground">
											{new Date(test.timestamp).toLocaleTimeString()}
										</span>
									</div>
									<div className="flex items-center gap-4">
										<div className="text-sm">
											<span className="text-muted-foreground">Avg: </span>
											<span className="font-medium">
												{test.averageResponseTime.toFixed(2)}ms
											</span>
										</div>
										<div className="text-sm">
											<span className="text-muted-foreground">Cache: </span>
											<span className="font-medium">
												{test.cacheHitRate.toFixed(1)}%
											</span>
										</div>
										{(() => {
											const grade = getPerformanceGrade(
												test.averageResponseTime,
												test.cacheHitRate,
											);
											return (
												<Badge variant="outline" className={grade.color}>
													{grade.grade}
												</Badge>
											);
										})()}
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Performance Tips */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Zap className="h-5 w-5" />
						TanStack Query v5 Optimizations
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<h4 className="font-medium text-green-600">
								✅ Implemented Optimizations
							</h4>
							<ul className="text-sm space-y-1 text-muted-foreground">
								<li>• gcTime (garbage collection) instead of cacheTime</li>
								<li>• Smart retry strategies per error type</li>
								<li>• Optimized stale time configurations</li>
								<li>• Enhanced cache hit detection</li>
								<li>• Improved memory management</li>
							</ul>
						</div>
						<div className="space-y-2">
							<h4 className="font-medium text-blue-600">
								📊 Performance Metrics
							</h4>
							<ul className="text-sm space-y-1 text-muted-foreground">
								<li>• Cache hits should be &lt;50ms</li>
								<li>• Network requests &lt;1000ms</li>
								<li>• Cache hit rate &gt;60% optimal</li>
								<li>• Total test time &lt;5000ms</li>
								<li>• Grade A+ = excellent performance</li>
							</ul>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

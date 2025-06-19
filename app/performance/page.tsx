import { PerformanceMonitor } from "@/components/performance-monitor";

export default function PerformancePage() {
	return (
		<div className="container py-8">
			<h1 className="text-3xl font-bold mb-6">Performance Monitor</h1>
			<PerformanceMonitor />
		</div>
	);
}

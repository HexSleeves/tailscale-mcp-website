import { GitHubAPIDiagnostics } from "@/components/github-api-diagnostics";

export default function DiagnosticsPage() {
	return (
		<div className="container mx-auto py-8">
			<div className="max-w-4xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold mb-2">API Diagnostics</h1>
					<p className="text-muted-foreground">
						Test and verify GitHub API integration for live data fetching
					</p>
				</div>

				<GitHubAPIDiagnostics />
			</div>
		</div>
	);
}

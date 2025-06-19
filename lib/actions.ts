"use server";

import { githubApi } from "./github";

export async function clearGithubCache() {
	try {
		githubApi.clearCache();
		return {
			success: true,
			message: "Cache cleared successfully",
		};
	} catch (error) {
		console.error("Error in clearCache action:", error);
		return {
			success: false,
			message: "Failed to clear cache",
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}

export async function getGithubStats() {
	try {
		const stats = await githubApi.getStats();
		return {
			success: true,
			data: stats,
		};
	} catch (error) {
		console.error("Error in getStats action:", error);
		return {
			success: false,
			error:
				error instanceof Error ? error.message : "Failed to fetch GitHub stats",
		};
	}
}

import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { githubApi } from "../github";

const t = initTRPC.create();

export const appRouter = t.router({
	github: t.router({
		getStats: t.procedure.query(async () => {
			try {
				const stats = await githubApi.getStats();
				return {
					success: true,
					data: stats,
				};
			} catch (error) {
				console.error("Error in getStats procedure:", error);
				throw new Error(
					error instanceof Error
						? error.message
						: "Failed to fetch GitHub stats",
				);
			}
		}),

		getRepository: t.procedure.query(async () => {
			try {
				const repo = await githubApi.getRepository();
				return {
					success: true,
					data: repo,
				};
			} catch (error) {
				console.error("Error in getRepository procedure:", error);
				throw new Error(
					error instanceof Error
						? error.message
						: "Failed to fetch repository data",
				);
			}
		}),

		getContributors: t.procedure
			.input(
				z.object({
					limit: z.number().min(1).max(100).default(10),
				}),
			)
			.query(async ({ input }) => {
				try {
					const contributors = await githubApi.getContributors();
					const limitedContributors = contributors.slice(0, input.limit);

					return {
						success: true,
						data: limitedContributors,
						total: contributors.length,
					};
				} catch (error) {
					console.error("Error in getContributors procedure:", error);
					throw new Error(
						error instanceof Error
							? error.message
							: "Failed to fetch contributors",
					);
				}
			}),

		getReleases: t.procedure
			.input(
				z.object({
					limit: z.number().min(1).max(20).default(5),
				}),
			)
			.query(async ({ input }) => {
				try {
					const releases = await githubApi.getReleases();
					const limitedReleases = releases
						.filter((r) => !r.prerelease && !r.draft)
						.slice(0, input.limit);

					return {
						success: true,
						data: limitedReleases,
					};
				} catch (error) {
					console.error("Error in getReleases procedure:", error);
					throw new Error(
						error instanceof Error ? error.message : "Failed to fetch releases",
					);
				}
			}),

		getNpmDownloads: t.procedure.query(async () => {
			try {
				const downloads = await githubApi.getNpmDownloads();
				return {
					success: true,
					data: downloads,
				};
			} catch (error) {
				console.error("Error in getNpmDownloads procedure:", error);
				// Don't throw error for NPM downloads - it's optional data
				return {
					success: false,
					data: {
						downloads: 0,
						period: "last-month",
						available: false,
					},
					error:
						error instanceof Error ? error.message : "NPM package not found",
				};
			}
		}),

		getRateLimit: t.procedure.query(async () => {
			try {
				const rateLimit = await githubApi.getRateLimit();
				return {
					success: true,
					data: rateLimit,
				};
			} catch (error) {
				console.error("Error in getRateLimit procedure:", error);
				throw new Error(
					error instanceof Error
						? error.message
						: "Failed to fetch rate limit info",
				);
			}
		}),

		clearCache: t.procedure.mutation(async () => {
			try {
				githubApi.clearCache();
				return {
					success: true,
					message: "Cache cleared successfully",
				};
			} catch (error) {
				console.error("Error in clearCache procedure:", error);
				throw new Error("Failed to clear cache");
			}
		}),

		getCacheStats: t.procedure.query(async () => {
			try {
				const stats = githubApi.getCacheStats();
				return {
					success: true,
					data: stats,
				};
			} catch (error) {
				console.error("Error in getCacheStats procedure:", error);
				throw new Error("Failed to get cache statistics");
			}
		}),
	}),
});

export type AppRouter = typeof appRouter;

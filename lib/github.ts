export interface GitHubRepo {
	id: number;
	name: string;
	full_name: string;
	description: string;
	stargazers_count: number;
	forks_count: number;
	open_issues_count: number;
	watchers_count: number;
	subscribers_count: number;
	network_count: number;
	created_at: string;
	updated_at: string;
	pushed_at: string;
	language: string;
	topics: string[];
	license: {
		key: string;
		name: string;
	} | null;
}

export interface GitHubContributor {
	login: string;
	id: number;
	avatar_url: string;
	html_url: string;
	contributions: number;
	type: string;
}

export interface GitHubRelease {
	id: number;
	tag_name: string;
	name: string;
	body: string;
	published_at: string;
	prerelease: boolean;
	draft: boolean;
	html_url: string;
}

export interface GitHubStats {
	stars: number;
	forks: number;
	watchers: number;
	issues: number;
	contributors: number;
	releases: number;
	lastCommit: string;
	language: string;
	license: string;
	topics: string[];
	description?: string;
	createdAt: string;
	updatedAt: string;
}

interface CacheEntry<T> {
	data: T;
	timestamp: number;
	expiresAt: number;
}

class APICache {
	private cache = new Map<string, CacheEntry<unknown>>();
	private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

	set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
		const now = Date.now();
		this.cache.set(key, {
			data,
			timestamp: now,
			expiresAt: now + ttl,
		});
	}

	get<T>(key: string): T | null {
		const entry = this.cache.get(key);
		if (!entry) return null;

		if (Date.now() > entry.expiresAt) {
			this.cache.delete(key);
			return null;
		}

		return entry.data as T;
	}

	clear(): void {
		this.cache.clear();
	}

	getStats(): { size: number; keys: string[] } {
		return {
			size: this.cache.size,
			keys: Array.from(this.cache.keys()),
		};
	}
}

import { API_ENDPOINTS, PROJECT_META, REPO_CONFIG } from "./constants";

export class GitHubAPI {
	private baseUrl = API_ENDPOINTS.GITHUB_API;
	private owner = REPO_CONFIG.OWNER;
	private repo = REPO_CONFIG.REPO;
	private bunPackage = REPO_CONFIG.PACKAGE_NAME;
	private cache = new APICache();

	private async fetchWithCache<T>(
		endpoint: string,
		cacheKey: string,
		ttl?: number,
	): Promise<T> {
		// Check cache first
		const cached = this.cache.get<T>(cacheKey);
		if (cached) {
			console.log(`Cache hit for ${cacheKey}`);
			return cached;
		}

		console.log(`Fetching from API: ${endpoint}`);
		const url = `${this.baseUrl}/repos/${this.owner}/${this.repo}${endpoint}`;

		const headers: Record<string, string> = {
			Accept: "application/vnd.github.v3+json",
			"User-Agent": PROJECT_META.USER_AGENT,
		};

		// Add GitHub token if available for higher rate limits
		if (process.env.GITHUB_TOKEN) {
			headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
			console.log("Using GitHub token for authentication");
		} else {
			console.warn(
				"No GitHub token found - using unauthenticated requests (60/hour limit)",
			);
		}

		try {
			const response = await fetch(url, {
				headers,
			});

			console.log(`API Response: ${response.status} ${response.statusText}`);

			if (!response.ok) {
				// Log rate limit information if available
				if (response.status === 403) {
					const rateLimitRemaining = response.headers.get(
						"x-ratelimit-remaining",
					);
					const rateLimitReset = response.headers.get("x-ratelimit-reset");
					const resetTime = rateLimitReset
						? new Date(Number.parseInt(rateLimitReset) * 1000).toISOString()
						: "unknown";

					console.error(
						`Rate limit exceeded. Remaining: ${rateLimitRemaining}, Reset: ${resetTime}`,
					);
					throw new Error(`Rate limit exceeded. Reset at: ${resetTime}`);
				}

				if (response.status === 404) {
					throw new Error(`Repository not found: ${this.owner}/${this.repo}`);
				}

				throw new Error(
					`GitHub API error: ${response.status} ${response.statusText}`,
				);
			}

			const data = await response.json();
			console.log(`Successfully fetched data for ${cacheKey}`);

			// Cache the successful response
			this.cache.set(cacheKey, data, ttl);

			return data;
		} catch (error) {
			console.error(`Error fetching ${endpoint}:`, error);
			throw error;
		}
	}

	async getRepository(): Promise<GitHubRepo> {
		return this.fetchWithCache<GitHubRepo>("", "repository", 10 * 60 * 1000); // 10 minutes
	}

	async getContributors(): Promise<GitHubContributor[]> {
		return this.fetchWithCache<GitHubContributor[]>(
			"/contributors?per_page=100",
			"contributors",
			15 * 60 * 1000, // 15 minutes
		);
	}

	async getReleases(): Promise<GitHubRelease[]> {
		return this.fetchWithCache<GitHubRelease[]>(
			"/releases?per_page=10",
			"releases",
			30 * 60 * 1000, // 30 minutes
		);
	}

	async getStats(): Promise<GitHubStats> {
		console.log("Fetching GitHub stats...");

		try {
			const [repo, contributors, releases] = await Promise.all([
				this.getRepository(),
				this.getContributors(),
				this.getReleases(),
			]);

			const stats: GitHubStats = {
				stars: repo.stargazers_count,
				forks: repo.forks_count,
				watchers: repo.watchers_count,
				issues: repo.open_issues_count,
				contributors: contributors.length,
				releases: releases.filter((r) => !r.prerelease && !r.draft).length,
				lastCommit: repo.pushed_at,
				language: repo.language || "TypeScript",
				license: repo.license?.name || "MIT",
				topics: repo.topics || [],
				description: repo.description,
				createdAt: repo.created_at,
				updatedAt: repo.updated_at,
			};

			console.log("GitHub stats compiled successfully:", stats);
			return stats;
		} catch (error) {
			console.error("Error compiling GitHub stats:", error);
			throw error;
		}
	}

	async getBunDownloads(): Promise<{
		downloads: number;
		period: string;
		available: boolean;
	}> {
		const cached = this.cache.get<{
			downloads: number;
			period: string;
			available: boolean;
		}>("bun-downloads");
		if (cached) {
			return cached;
		}

		console.log(`Fetching Bun package downloads for ${this.bunPackage}...`);

		try {
			// Try npm registry first (Bun packages are also published to npm)
			const response = await fetch(
				`${API_ENDPOINTS.NPM_DOWNLOADS}/${this.bunPackage}`,
			);

			if (!response.ok) {
				if (response.status === 404) {
					console.log(
						`Bun package ${this.bunPackage} not found on npm registry`,
					);
					const result = {
						downloads: 0,
						period: "last-month",
						available: false,
					};
					// Cache the "not available" result for 1 hour
					this.cache.set("bun-downloads", result, 60 * 60 * 1000);
					return result;
				}
				throw new Error(
					`npm API error: ${response.status} ${response.statusText}`,
				);
			}

			const data = await response.json();
			const result = {
				downloads: data.downloads || 0,
				period: "last-month",
				available: true,
			};

			// Cache for 1 hour
			this.cache.set("bun-downloads", result, 60 * 60 * 1000);

			console.log(
				`Bun package downloads fetched successfully for ${this.bunPackage}:`,
				result,
			);
			return result;
		} catch (error) {
			console.error(
				`Error fetching Bun package downloads for ${this.bunPackage}:`,
				error,
			);
			throw error;
		}
	}

	// Alias for backward compatibility
	async getNpmDownloads(): Promise<{
		downloads: number;
		period: string;
		available: boolean;
	}> {
		return this.getBunDownloads();
	}

	async getRateLimit(): Promise<{
		limit: number;
		remaining: number;
		reset: number;
		used: number;
	}> {
		const headers: Record<string, string> = {
			Accept: "application/vnd.github.v3+json",
			"User-Agent": PROJECT_META.USER_AGENT,
		};

		if (process.env.GITHUB_TOKEN) {
			headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
		}

		try {
			const response = await fetch(`${this.baseUrl}/rate_limit`, {
				headers,
			});

			if (!response.ok) {
				throw new Error(`Rate limit check failed: ${response.status}`);
			}

			const data = await response.json();
			return data.rate;
		} catch (error) {
			console.error("Error checking rate limit:", error);
			throw error;
		}
	}

	// Cache management methods
	clearCache(): void {
		console.log("Clearing API cache...");
		this.cache.clear();
	}

	getCacheStats(): { size: number; keys: string[] } {
		return this.cache.getStats();
	}
}

export const githubApi = new GitHubAPI();

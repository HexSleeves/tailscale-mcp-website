# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 landing page application for the Tailscale MCP Server project, built with React 19, TypeScript, and Tailwind CSS. It uses tRPC for type-safe API communication with GitHub's API to display live project statistics.

## Development Commands

```bash
# Start development server (uses Turbopack)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting (Next.js built-in)
pnpm lint

# Format and lint code (Biome)
npx biome check .
npx biome check --apply .
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **UI**: React 19, Radix UI components, shadcn/ui styling
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **API Layer**: tRPC with TanStack Query for data fetching
- **Code Quality**: Biome (replaces ESLint/Prettier)
- **Package Manager**: pnpm

### Directory Structure
```
app/                    # Next.js App Router pages
├── page.tsx           # Main landing page
├── layout.tsx         # Root layout with providers
├── docs/              # Documentation section
└── api/trpc/          # tRPC API endpoints

components/             # React components
├── ui/                # Basic UI components (shadcn/ui)
└── [feature]/         # Feature-specific components

lib/                   # Shared utilities
├── trpc/              # tRPC client/server setup
├── github.ts          # GitHub API integration
└── utils.ts           # Utility functions

hooks/                 # Custom React hooks
styles/                # Global CSS styles
```

### Key Patterns

**tRPC API Structure**: All GitHub data fetching goes through `lib/trpc/server.ts` with procedures for:
- `github.getStats` - Repository statistics
- `github.getContributors` - Contributor list with pagination
- `github.getReleases` - Release timeline
- `github.getNpmDownloads` - NPM package downloads
- Cache management procedures

**Component Architecture**: Uses compound components pattern, especially for complex UI sections like hero, stats showcase, and documentation layout.

**Theming**: Next-themes integration with comprehensive CSS custom properties defined in `app/globals.css`.

## Configuration Notes

- **Next.js Config**: TypeScript and ESLint errors are ignored during builds (`next.config.mjs`)
- **Biome**: Uses tab indentation, strict linting rules, and automatic import organization
- **Images**: Unoptimized for this project
- **Path Aliases**: `@/` points to project root (configured in `tsconfig.json`)

## Development Notes

- Uses Biome instead of ESLint/Prettier for consistent code formatting
- GitHub API integration includes caching and rate limiting management
- Theme switching is implemented with next-themes and persisted properly
- All components are TypeScript-first with proper type safety through tRPC
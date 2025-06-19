"use client";

import type React from "react";

import { useEffect, useState } from "react";

interface HydrationSafeWrapperProps {
	children: React.ReactNode;
	fallback?: React.ReactNode;
	className?: string;
}

export function HydrationSafeWrapper({
	children,
	fallback = null,
	className,
}: HydrationSafeWrapperProps) {
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	if (!isHydrated) {
		return <div className={className}>{fallback}</div>;
	}

	return <div className={className}>{children}</div>;
}

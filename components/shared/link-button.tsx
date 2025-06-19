"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface LinkButtonProps {
	href: string;
	children: ReactNode;
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link";
	size?: "default" | "sm" | "lg" | "icon";
	className?: string;
	external?: boolean;
	icon?: ReactNode;
}

export function LinkButton({
	href,
	children,
	variant = "default",
	size = "default",
	className = "",
	external = false,
	icon,
}: LinkButtonProps) {
	return (
		<Button variant={variant} size={size} className={className} asChild>
			<Link
				href={href}
				target={external ? "_blank" : undefined}
				rel={external ? "noopener noreferrer" : undefined}
				className="flex items-center"
			>
				{icon && <span className="mr-2">{icon}</span>}
				{children}
				{external && <ExternalLink className="ml-2 h-4 w-4 opacity-70" />}
			</Link>
		</Button>
	);
}

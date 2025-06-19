"use client";

import { format, formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

interface SafeDateFormatterProps {
	date: string | Date;
	formatType?: "relative" | "absolute" | "both";
	className?: string;
}

export function SafeDateFormatter({
	date,
	formatType = "relative",
	className,
}: SafeDateFormatterProps) {
	const [isClient, setIsClient] = useState(false);
	const [formattedDate, setFormattedDate] = useState<string>("");

	useEffect(() => {
		setIsClient(true);
		const dateObj = typeof date === "string" ? new Date(date) : date;

		try {
			switch (formatType) {
				case "relative":
					setFormattedDate(formatDistanceToNow(dateObj, { addSuffix: true }));
					break;
				case "absolute":
					setFormattedDate(format(dateObj, "MMM d, yyyy"));
					break;
				case "both":
					setFormattedDate(
						`${format(dateObj, "MMM d, yyyy")} (${formatDistanceToNow(dateObj, { addSuffix: true })})`,
					);
					break;
				default:
					setFormattedDate(formatDistanceToNow(dateObj, { addSuffix: true }));
			}
		} catch (error) {
			console.error("Date formatting error:", error);
			setFormattedDate("Invalid date");
		}
	}, [date, formatType]);

	// Show a consistent placeholder during SSR
	if (!isClient) {
		return <span className={className}>Loading...</span>;
	}

	return <span className={className}>{formattedDate}</span>;
}

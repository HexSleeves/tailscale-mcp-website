"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
	code: string;
	language?: string;
	title?: string;
}

export function CodeBlock({ code, language = "bash", title }: CodeBlockProps) {
	const [copied, setCopied] = useState(false);

	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="relative">
			{title && (
				<div className="flex items-center justify-between bg-muted px-4 py-2 rounded-t-lg border-b">
					<span className="text-sm font-medium text-muted-foreground">
						{title}
					</span>
					<Button
						variant="ghost"
						size="sm"
						onClick={copyToClipboard}
						className="h-8 w-8 p-0"
						aria-label="Copy code to clipboard"
					>
						{copied ? (
							<Check className="h-4 w-4 text-green-600" />
						) : (
							<Copy className="h-4 w-4" />
						)}
					</Button>
				</div>
			)}
			<div className="relative">
				<pre
					className={`bg-card border ${title ? "rounded-t-none" : "rounded-lg"} p-4 overflow-x-auto text-sm`}
				>
					<code className={`language-${language}`}>{code}</code>
				</pre>
				{!title && (
					<Button
						variant="ghost"
						size="sm"
						onClick={copyToClipboard}
						className="absolute top-2 right-2 h-8 w-8 p-0"
						aria-label="Copy code to clipboard"
					>
						{copied ? (
							<Check className="h-4 w-4 text-green-600" />
						) : (
							<Copy className="h-4 w-4" />
						)}
					</Button>
				)}
			</div>
		</div>
	);
}

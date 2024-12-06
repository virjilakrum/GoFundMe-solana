"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  segments: {
    title: string;
    href: string;
  }[];
  separator?: React.ReactNode;
}

export function Breadcrumb({
  segments,
  separator = <ChevronRight className="h-4 w-4" />,
  className,
  ...props
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-2 text-sm", className)}
      {...props}
    >
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href="/"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {segments.map((segment, index) => (
          <React.Fragment key={segment.href}>
            <li className="text-muted-foreground">{separator}</li>
            <li>
              <Link
                href={segment.href}
                className={cn(
                  "transition-colors hover:text-primary",
                  index === segments.length - 1
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {segment.title}
              </Link>
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
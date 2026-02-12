import { ROUTE_LABELS } from "@/lib/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(value: string) {
  // If it's an email, use first letter
  if (value.includes("@")) {
    return value.charAt(0).toUpperCase();
  }

  // If it's a name, use first + last initial
  const parts = value.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (
    parts[0].charAt(0).toUpperCase() +
    parts[parts.length - 1].charAt(0).toUpperCase()
  );
}

export function getBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  return segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");

    return {
      label:
        ROUTE_LABELS[segment] ??
        segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      href,
      isLast: index === segments.length - 1,
    };
  });
}

"use client";

import { Loader2, LogOut } from "lucide-react";

import { signOut } from "@/app/auth/_actions/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

type Props = {
  email: string;
  imageUrl?: string | null;
  name?: string | null;
};

export function UserAvatarMenu({ email, imageUrl, name }: Props) {
  const fallbackText = getInitials(name ?? email);

  const [signingOut, setSigningOut] = useState(false);

  function handleSignOut() {
    setSigningOut(true);
    signOut(); // redirect → page unloads
  }

  return (
    <>
      {signingOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            Signing you out…
          </div>
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer rounded-lg">
            {imageUrl ? (
              <AvatarImage src={imageUrl} alt={name ?? email} />
            ) : null}
            <AvatarFallback>{fallbackText}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="p-2">
            <div className="flex items-center gap-3 max-w-full">
              <Avatar className="h-9 w-9 shrink-0 rounded-lg">
                {imageUrl && (
                  <AvatarImage
                    src={imageUrl}
                    alt={name ?? email}
                    referrerPolicy="no-referrer"
                  />
                )}
                <AvatarFallback>{fallbackText}</AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                {name && (
                  <p className="text-sm font-medium leading-tight truncate">
                    {name}
                  </p>
                )}
                <p className="text-xs text-muted-foreground truncate">
                  {email}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => handleSignOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

/* ---------- helpers ---------- */

function getInitials(value: string) {
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

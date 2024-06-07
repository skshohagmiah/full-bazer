"use client";
import React, { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { User, LogOut, Settings, Group, MoreHorizontal, Edit } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const UserPopover = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <HoverCard openDelay={300}>
      <HoverCardTrigger asChild>
        <Button variant="ghost" className="relative aspect-square h-8 w-8 rounded-full overflow-hidden hover:ring-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="space-y-0 text-sm">
              <p className="font-medium leading-none">John Doe</p>
              <p className="text-muted-foreground leading-none">
                admin@example.com
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-2" />

        <Button variant="outline" className="w-full justify-start" onClick={() => router.push("/dashboard/profile")}>
          <User className="mr-2 h-4 w-4" />
          Profile
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={() => router.push("/dashboard/settings")}>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>

        <Separator className="my-2" />
        <Button
          variant="destructive"
          className="w-full justify-start"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserPopover;

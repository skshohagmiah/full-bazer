"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import {
  User,
  LogOut,
  Settings,
  Group,
  MoreHorizontal,
  Edit,
  User2,
  ShoppingBag,
  Heart,
  RefreshCcw,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const UserOptions = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger asChild>
        <Button variant="ghost" size={"icon"} className="rounded-full ">
          {/* <Image src={'/placeholder.png'} alt="placeholder" width={30} height={30} className="rounded-full bg-gray-500"/> */}
          <User />
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

        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => router.push("/profile")}
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => router.push("/compare")}
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Compare
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => router.push("/wishlist")}
        >
          <Heart className="mr-2 h-4 w-4" />
         My Wishlist
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => router.push("/orders")}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
         My Orders
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

export default UserOptions;

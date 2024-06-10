import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "../ui/button";
import {
  User,
  LogOut,
  ShoppingBag,
  Heart,
  RefreshCcw,
  Square,
  LogIn,
  LogInIcon,
  CircuitBoard,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CurrentUser } from "@/lib/getCurrentUser";
import SignInModal from "../modals/SignInModal";
import useSignInModal from "@/hooks/useSignInModal";
import useSignUpModal from "@/hooks/useSignUpModal";


/**
 * UserAccount component renders the user account related options.
 * If the user is logged in, it shows the user's avatar, name, email and
 * log out option. If the user is logged out, it shows sign in and sign up
 * options.
 *
 * @param {Object} user - The current user object.
 * @param {string} user.name - The name of the user.
 * @param {string} user.email - The email of the user.
 * @param {string} user.image - The image of the user.
 * @param {string} user.role - The role of the user.
 * @return {JSX.Element} The rendered UserAccount component.
 */
const UserAccount = ({ user }: { user: CurrentUser }) => {
  const router = useRouter();
  const { onOpen: openSignInModal } = useSignInModal();
  const { onOpen: openSignUpModal } = useSignUpModal();
  const session = useSession();

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  // Render the user account options for the logged in admin users
  if (session.data && user?.role !== "CUSTOMER") {
    return (
      <HoverCard>
        {/* Trigger for the HoverCard */}
        <HoverCardTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full mb-1">
            <User />
          </Button>
        </HoverCardTrigger>
        {/* Content of the HoverCard */}
        <HoverCardContent>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                src={user?.image || "https://github.com/shadcn.png"}
                alt="User"
              />
              <AvatarFallback>{user?.name || "JD"}</AvatarFallback>
            </Avatar>
            <div className="space-y-0 text-sm">
              <p className="font-medium leading-none">{user?.name}</p>
              <p className="text-muted-foreground leading-none">
                {user?.email}
              </p>
            </div>
          </div>
          {/* Render dashboard option */}
          <Separator className="my-2" />
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => router.push("/dashboard")}
          >
            <CircuitBoard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>

          {/* Render log out option */}
          <Separator className="my-2" />
          <Button
            variant="destructive"
            className="w-full justify-start"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </HoverCardContent>
      </HoverCard>
    );
     // Render the user account options for the logged in Customers
  } else if (session.data && user?.role === "CUSTOMER") {

    return (
      <HoverCard>
        {/* Trigger for the HoverCard */}
        <HoverCardTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full mb-1">
            <User />
          </Button>
        </HoverCardTrigger>
        {/* Content of the HoverCard */}
        <HoverCardContent>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                src={user?.image || "https://github.com/shadcn.png"}
                alt="User"
              />
              <AvatarFallback>{user?.name || "JD"}</AvatarFallback>
            </Avatar>
            <div className="space-y-0 text-sm">
              <p className="font-medium leading-none">{user?.name}</p>
              <p className="text-muted-foreground leading-none">
                {user?.email}
              </p>
            </div>
          </div>
          {/* Render profile option */}
          <Separator className="my-2" />
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => router.push("/profile")}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          {/* Render compare option */}
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => router.push("/compare")}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Compare
          </Button>
          {/* Render wishlist option */}
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => router.push("/wishlist")}
          >
            <Heart className="mr-2 h-4 w-4" />
            My Wishlist
          </Button>
          {/* Render orders option */}
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => router.push("/orders")}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            My Orders
          </Button>

          {/* Render log out option */}
          <Separator className="my-2" />
          <Button
            variant="destructive"
            className="w-full justify-start"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </HoverCardContent>
      </HoverCard>
    );
     // Render the user account options for all users who are not logged in
  } else {
    return (
      <HoverCard>
        {/* Trigger for the HoverCard */}
        <HoverCardTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full mb-1">
            <User />
          </Button>
        </HoverCardTrigger>
        {/* Content of the HoverCard */}
        <HoverCardContent>
          {/* Render sign in option */}
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={openSignInModal}
          >
            <LogIn className="mr-2 h-4 w-4" />
            Sign in
          </Button>
          {/* Render compare option */}
          <Separator className="my-2" />
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => router.push("/compare")}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Compare
          </Button>
          {/* Render wishlist option */}
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => router.push("/wishlist")}
          >
            <Heart className="mr-2 h-4 w-4" />
            My Wishlist
          </Button>

          {/* Render sign up option */}
          <Separator className="my-2 mb-4" />
          <Button
            variant="outline"
            className="w-full justify-start -mt-2"
            onClick={openSignUpModal}
          >
            <LogInIcon className="mr-2 h-4 w-4" />
            Sign up
          </Button>
        </HoverCardContent>
      </HoverCard>
    );
  }
};

export default UserAccount;

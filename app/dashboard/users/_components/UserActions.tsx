import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { MoreHorizontal, Trash, View } from "lucide-react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/actions/dashboard/users/usersActions";
import { toast } from "sonner";

const UserActions = ({ user }: { user: User }) => {
  const router = useRouter();

  const handleUserDelete = async () => {
    const res = await deleteUser(user.id);
    if (res.status === 200) {
      toast(res.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center">
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 ">
        <DropdownMenuItem
          className="flex items-center gap-2 text-sm"
          onClick={() => router.push(`/dashboard/users/${user.id}`)}
        >
          {" "}
          <View size={20} /> View details
        </DropdownMenuItem>

        <AlertDialog>
          <AlertDialogTrigger className="flex items-center gap-2 text-sm px-2 py-1.5  rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
            <Trash size={20} /> Delete User
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                User.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-rose-500 hover:bg-rose-600" onClick={handleUserDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActions;

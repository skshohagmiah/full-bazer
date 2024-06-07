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

const OrderActions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center">
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 ">
        <DropdownMenuItem className="flex items-center gap-2 text-sm">
          {" "}
          <View size={20} /> View details
        </DropdownMenuItem>

        <AlertDialog>
          <AlertDialogTrigger className="flex items-center gap-2 text-sm px-2 py-1.5  rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
            <Trash size={20} /> Delete order
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                order.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderActions;

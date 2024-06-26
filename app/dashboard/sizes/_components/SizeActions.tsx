'use client';
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

import { Edit, MoreHorizontal, Trash, View } from "lucide-react";
import { Size } from "@prisma/client";
import { useRouter } from "next/navigation";
import { deleteSize } from "@/actions/dashboard/sizes/sizesActions";
import { toast } from "sonner";

const SizeActions = ({size}:{size:Size}) => {

  const router = useRouter()

  const handleSizeDelete = async () => {
    const res = await deleteSize(size.id);
    if(res.status === 200){
      toast(res.message)
    }else{
      toast(res.message)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center">
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 ">
        <DropdownMenuItem className="flex items-center gap-2 text-sm" onClick={() => router.push(`/dashboard/sizes/${size.id}`)}>
          {" "}
          <Edit size={20} /> Edit size
        </DropdownMenuItem>

        <AlertDialog>
          <AlertDialogTrigger className="flex items-center gap-2 text-sm px-2 py-1.5  rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
            <Trash size={20} /> Delete size
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                Size.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-rose-500 hover:bg-rose-500" onClick={handleSizeDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SizeActions;

'use client';
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { useRouter } from "next/navigation";
import { deleteCategory } from "@/actions/dashboard/categories/categoriesActions";
import { toast } from "sonner";

const CategoryActions = ({categoryId}:{categoryId:string}) => {

    const router = useRouter();

    const handleCategoryDelete = async () => {
      const res = await deleteCategory(categoryId);
      if (res.status === 200) {
        toast(res.message);
        router.refresh();
      } else {
        toast(res.message); 
      }
    }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center">
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 ">
        <DropdownMenuItem className="flex items-center gap-2 text-sm" onClick={() => router.push(`/dashboard/categories/${categoryId}`)}>
          {" "}
          <Edit size={20} /> Edit category
        </DropdownMenuItem>

        <AlertDialog>
          <AlertDialogTrigger className="flex items-center gap-2 text-sm px-2 py-1.5  rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
            <Trash size={20} /> Delete category
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                category.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-rose-500 hover:bg-rose-600" onClick={handleCategoryDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryActions;

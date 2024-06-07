'use client'
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

import { Edit, MoreHorizontal, Play, Trash, View } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import { deleteProduct } from "@/actions/dashboard/products/productActions";
import { toast } from "sonner";

const ProductActions = ({ productId }: { productId: string }) => {
  const router = useRouter();


  const handleProductDelete = async () => {
    const res = await deleteProduct(productId);
    if(res.status === 200){
      toast(res.message);
      router.push("/dashboard/products");
      router.refresh()
    }else{
      toast(res.message);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center">
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 ">
        <DropdownMenuItem className="flex items-center gap-2 text-sm" onClick={() => router.push(`/dashboard/products/${productId}`)}>
          {" "}
          <View size={20} /> View product
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex items-center gap-2 text-sm"
          onClick={() => router.push(`/dashboard/products/${productId}/update`)}
        >
          {" "}
          <Edit size={20} /> Update product
        </DropdownMenuItem>

        <AlertDialog>
          <AlertDialogTrigger className="flex items-center gap-2 text-sm px-2 py-1.5  rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
            <Trash size={20} /> Delete product
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                Product.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className={'bg-rose-500 hover:bg-rose-600'} onClick={handleProductDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductActions;

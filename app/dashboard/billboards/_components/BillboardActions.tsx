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
import { useRouter } from "next/navigation";
import { deleteBillboard } from "@/actions/dashboard/billboard/billboardsActions";
import { toast } from "sonner";

const BillboardActions = ({billboardId}:{billboardId:string}) => {

  const router = useRouter();

  const handleBillboardDelete = async () => {
    const res = await deleteBillboard(billboardId);
    if (res.status === 200) {
      toast(res.message);
      router.push("/dashboard/billboards");
      router.refresh();
    } else {
      toast(res.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center">
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 ">
        <DropdownMenuItem className="flex items-center gap-2 text-sm" onClick={() => router.push(`/dashboard/billboards/${billboardId}`)}>
          {" "}
          <Edit size={20} /> Edit billboard
        </DropdownMenuItem>

        <AlertDialog>
          <AlertDialogTrigger className="flex items-center gap-2 text-sm px-2 py-1.5  rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
            <Trash size={20} /> Delete billboard
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                Billboard.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-rose-500 hover:bg-rose-600" onClick={handleBillboardDelete} >Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BillboardActions;

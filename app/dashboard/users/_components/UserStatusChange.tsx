'use client';
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { changeUserStatus } from "@/actions/dashboard/users/usersActions";
import { toast } from "sonner";

const UserStatusChange = ({ userId }: { userId: string }) => {

  const router = useRouter();
  const handleUserStatusChange = async (v: Role) => {
    const res = await changeUserStatus(userId, v);
    if (res.status === 200) {
      toast(res.message);
      router.refresh();
    } else {
      toast(res.message);
    }
  };

  return (
    <div>
      <Select onValueChange={(v: Role) => handleUserStatusChange(v)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Change Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={Role.ADMIN}>{Role.ADMIN}</SelectItem>
          <SelectItem value={Role.CUSTOMER}>{Role.CUSTOMER}</SelectItem>
          <SelectItem value={Role.SUPER_ADMIN}>{Role.SUPER_ADMIN}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserStatusChange;

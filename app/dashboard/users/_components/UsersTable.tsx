"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import UserActions from "./UserActions"; // Replace with your actual actions component
import { User } from "@prisma/client";


export default function UsersTable({users}:{users:User[]}) {

  return (
    <Table className="border shadow-md rounded-md">
      {/* TableHeader */}
      <TableHeader className="bg-slate-100 dark:bg-slate-800">
        <TableRow>
          <TableHead>Image</TableHead> 
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      {/* TableBody */}
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="relative h-10 w-10">
              <Image
                fill
                src={user?.image || ''}
                alt={user.name}
                className="object-cover rounded-md"
              />
            </TableCell>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.createdAt.toDateString()}</TableCell>
            <TableCell className="block ml-4">
              <UserActions user={user}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = ({image,name, className}:{image?:string,name?:string, className:string}) => {
  return (
    <Avatar className={className} >
      <AvatarImage  src={image || "https://github.com/shadcn.png"} />
      <AvatarFallback>{name || 'User'}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;

import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const CreateButton = ({label, link}:{label:string,link:string}) => {
  return (
    <Link
      href={link}
      className="py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600 duration-200 flex items-center gap-1 whitespace-nowrap"
    >
      <Plus /> {label}
    </Link>
  );
};

export default CreateButton;

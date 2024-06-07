import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";

const SignOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        signOut();
        redirect('/sign-in')
      }}
    >
      <Button variant={"destructive"} type="submit">
        <LogOut /> Exit
      </Button>
    </form>
  );
};

export default SignOut;

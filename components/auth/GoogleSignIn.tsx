import React from "react";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "@/auth";

const GoogleSignIn = ({ text }: { text: string }) => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <Button
        type="submit"
        className="w-full text-base font-medium flex items-center gap-4 p-4 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200"
      >
        <FaGoogle size={22} /> {text}
      </Button>
    </form>
  );
};

export default GoogleSignIn;

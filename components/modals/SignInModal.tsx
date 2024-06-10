import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmailSignInForm from "../auth/EmailSignInForm";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
import GoogleSignIn from "../auth/GoogleSignIn";
import useSignInModal from "@/hooks/useSignInModal";

const SignInModal = () => {

    const {isOpen, onClose} = useSignInModal();

    if(!isOpen) return null

  return (
    <div className="w-full">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-start">Sign in to your account</DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <GoogleSignIn text="Sign in with Google" />

            <div className="relative flex items-center justify-center w-full mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative px-4 text-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300">
                Or continue with
              </div>
            </div>

          <EmailSignInForm />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignInModal;

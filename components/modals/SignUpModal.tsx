import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GoogleSignIn from "../auth/GoogleSignIn";
import EmailSignUpForm from "../auth/EmailSignUpForm";
import useSignUpModal from "@/hooks/useSignUpModal";

const SignUpModal = () => {

    const {isOpen,onClose} = useSignUpModal()

    if(!isOpen) return null

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-start ">Sign up to Full Bazer</DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <GoogleSignIn text="Sign up with Google" />

            <div className="relative flex items-center justify-center w-full mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative px-4 text-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300">
                Or continue with
              </div>
            </div>

            <EmailSignUpForm />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignUpModal;

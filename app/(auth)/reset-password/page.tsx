"use client";
import {
  passwordResetToken,
  resetPassword,
} from "@/actions/tokens/passwordResetToken";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    async function shouldResetPassword() {
      const res = await passwordResetToken(token as string);
      console.log(res);
      if (res.status === 200) {
        setIsTokenValid(true);
      } else {
        setIsTokenValid(false);
      }
    }
    shouldResetPassword();
  }, [token]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newPassword.length > 7 && confirmPassword.length > 7) {
      if (newPassword === confirmPassword) {
        const res = await resetPassword(newPassword);
        if (res.status === 200) {
          router.push("/sign-in");
          toast(res.message);
        }
      } else {
        setError("Password does not match.");
      }
    } else {
      setError("Password length must be greater than 7");
    }
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center gap-2 flex-col min-h-screen w-full">
        <Loader2 className="animate-spin" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 dark:bg-gray-900">
      <div className="p-8 rounded-md shadow-md text-center space-y-4 bg-white dark:bg-gray-800">
        <p className="text-rose-500 text-lg">
          {isTokenValid ? "" : "You cannot reset password, token is invalid."}
        </p>
        <h2 className="text-2xl font-semibold m-8">Enter New Password</h2>
        <form onSubmit={onSubmit} className="space-y-2 text-left">
          <div>
            <Label htmlFor="newpassword">New password :</Label>
            <Input
              id="newpassword"
              type="password"
              placeholder="*******"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="comfirmpassword">Confirm password :</Label>
            <Input
              id="comfirmpassword"
              type="password"
              placeholder="*******"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-rose-500 text-lg">{error}</p>}
          <Button type="submit" className="w-full" disabled={!isTokenValid}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

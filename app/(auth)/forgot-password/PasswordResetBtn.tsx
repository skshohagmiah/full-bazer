"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const PasswordResetBtn = () => {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <Button onClick={() => setSent(true)} type="submit">{sent ? 'Reset link has been sent' : "Send Reset Link"}</Button>
    </div>
  );
};

export default PasswordResetBtn;

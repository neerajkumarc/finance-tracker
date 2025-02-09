"use client";

import React, { useTransition } from "react";
import { signInWithGoogle } from "@/actions/auth";

const LoginGoogle = () => {
  const [isPending, startTransition] = useTransition();

  const handleGoogleLogin = () => {
    startTransition(async () => {
      await signInWithGoogle();
    });
  };
  return (
    <div
      onClick={handleGoogleLogin}
      className="w-full gap-4 hover:cursor-pointer mt-6 bg-stone-900 rounded-md py-3 text-sm flex justify-center items-center"
    >
      <p className="text-white">
        {isPending ? "Redirecting..." : "Login with Google"}
      </p>
    </div>
  );
};

export default LoginGoogle;

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
      <p className="text-white flex -gap-2 items-center">
        <svg
          className="mr-2 -ml-1 w-4 h-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          />
        </svg>
        {isPending ? "Redirecting..." : "Sign in  with Google"}
      </p>
    </div>
  );
};

export default LoginGoogle;

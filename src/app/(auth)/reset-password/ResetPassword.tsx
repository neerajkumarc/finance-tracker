"use client";
import React, { useState } from "react";
import AuthButton from "@/components/AuthButton";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/actions/auth";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formdata = new FormData(event.currentTarget);
    const code = searchParams.get("code") as string;
    const result = await resetPassword(formdata, code);
    if (result.status === "success") {
      router.push("/");
    } else {
      setError(result.status);
    }
    setLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="mt-4">
          <input
            type="password"
            placeholder="Password"
            id="Password"
            name="password"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>

        <div className="mt-4">
          <AuthButton type="Reset Password" loading={loading} />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;

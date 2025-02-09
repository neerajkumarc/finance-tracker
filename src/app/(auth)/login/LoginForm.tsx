"use client";
import React, { useState } from "react";
import AuthButton from "@/components/AuthButton";
import { useRouter } from "next/navigation";
import { signin } from "@/actions/auth";

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formdata = new FormData(event.currentTarget);
    const result = await signin(formdata);
    if(result.status === "success") {
      router.push("/");
    }else{
      setError(result.status);
    }
    setLoading(false);
  };
  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 ">
        <div>
          <input
            type="email"
            placeholder="Email"
            id="Email"
            name="email"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            className="mt-1 w-full px-4 py-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div className="mt-4">
          <AuthButton type="login" loading={loading} />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;

"use client";
import React, { useState } from "react";
import AuthButton from "../../../components/AuthButton";
import { forgotPassword } from "@/actions/auth";

const ForgotPassword = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formdata = new FormData(event.currentTarget);
       const result =    await forgotPassword(formdata);
       if(result.status === "success") {
         alert("Check your email for a link to reset your password");
       }else{
         setError(result.status);
       }  
    setLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="mt-4">
          <input
            type="email"
            placeholder="Email"
            id="Email"
            name="email"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>

        <div className="mt-4">
          <AuthButton type="Forgot Password" loading={loading} />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;

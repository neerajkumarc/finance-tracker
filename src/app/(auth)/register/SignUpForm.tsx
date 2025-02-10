"use client";
import React, { useState } from "react";
import AuthButton from "@/components/AuthButton";
import { signup } from "@/actions/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react";

const SignUpForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showEmailConfirmationMsg, setShowEmailConfirmationMsg] = useState<boolean>(false)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formdata = new FormData(event.currentTarget);
    const result = await signup(formdata);
    if(result.status === "success") {
      setShowEmailConfirmationMsg(true)
    }else{
      setError(result.status);
    }

    setLoading(false);
  };
  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div>
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
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
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div className="mt-4">
          <AuthButton type="Sign up" loading={loading} />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      {showEmailConfirmationMsg && (
       <Alert className="mt-4 text-xs">
       <CheckCircle className="h-4 w-4" />
       <AlertTitle>Registration Successful!</AlertTitle>
       <AlertDescription className="space-y-2 text-xs">
         <p>Your account has been successfully created.</p>
         <p>We've sent a confirmation email to your address. Please click the link in the email to verify your account.</p>
       </AlertDescription>
     </Alert>
    )}
    </div>  
  );
};

export default SignUpForm;

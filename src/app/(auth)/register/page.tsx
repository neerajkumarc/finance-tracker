import SignUpForm from "./SignUpForm";
import Link from "next/link";
import React from "react";

const SignUp = async () => {
  return (
    <div className="w-full flex justify-between items-center h-full">
      <section className="flex flex-col w-full px-8">
      <h1 className="text-6xl w-full text-center font-bold mb-2">
            mift
          </h1>
          <p className="text-center">create your mift account</p>
        <SignUpForm />
        <div className="mt-4 flex items-center justify-center text-sm">
          <h1>Already have an account?</h1>
          <Link className="font-bold ml-2" href="/login">
            Sign In
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SignUp;

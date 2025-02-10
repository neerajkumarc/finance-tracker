import LoginForm from "./LoginForm";
import LoginGoogle from "@/components/LoginGoogle";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full flex justify-between items-center h-full">
      <section className="flex flex-col w-[400px] px-8">
        <h1 className="text-6xl w-full text-center font-bold mb-2">mift</h1>
        <p className="text-center">login to your mift account</p>
        <LoginForm />
        <LoginGoogle />
        <div className="mt-4 flex items-center text-sm justify-center ">
          <h1>{`Don't have an account?`}</h1>
          <Link className="font-bold ml-2" href="/register">
            Sign Up
          </Link>
        </div>
        <div className="mt-2 flex items-center text-sm justify-center">
          <h1 className="text-center">
            Forgot your password?
            <span className="font-bold ml-2 block">
              <Link className="font-bold ml-2" href="/forgot-password">
                Reset Password
              </Link>
            </span>
          </h1>
        </div>
        <div className="flex items-center justify-center w-full my-8">

        <Link href={"/"} className="text-sm underline flex gap-2 items-center"><ArrowLeft className="w-5 h-5"/> Back to homepage</Link>
        </div>
      </section>
    </div>
  );
}

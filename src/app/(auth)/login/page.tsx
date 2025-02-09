import LoginForm from "./LoginForm";
import LoginGoogle from "@/components/LoginGoogle";
import Link from "next/link";

export default function LoginPage() {
  return (
      <div className="w-full flex justify-between items-center h-full">
        <section className="flex flex-col w-[400px] px-8">
          <h1 className="text-6xl w-full text-center font-bold mb-2">
            mift
          </h1>
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
            <h1>{`Forgot your password?`}</h1>
            <Link className="font-bold ml-2" href="/forgot-password">
              Reset Password
            </Link>
          </div>
        </section>
      </div>
  );
}

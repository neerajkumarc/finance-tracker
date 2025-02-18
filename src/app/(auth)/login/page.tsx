import LoginGoogle from "@/components/LoginGoogle";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full flex justify-between items-center h-full">
      <section className="flex flex-col w-full px-8">
        <h1 className="text-6xl w-full text-center font-bold mb-2">mift</h1>
        <p className="text-center">sign in to your mift account</p>
        <LoginGoogle />
        <div className="flex items-center justify-center w-full my-8">
          <Link
            href={"/"}
            className="text-sm underline flex gap-2 items-center"
          >
            <ArrowLeft className="w-5 h-5" /> Back to homepage
          </Link>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { getUserSession } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function Home() {
const {user} = await getUserSession();
  if(user){
    redirect("/dashboard");
  }
  return (
    <main className="flex flex-col gap-2 items-center justify-center p-4 h-full overflow-hidden">
      <div className="relative w-full max-w-md aspect-square">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            src="home.png"
            alt="Mibu app illustration"
            className="w-48 h-48 object-contain"
          />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 -top-4">
          <CategoryPill  label="balance" />
        </div>
        <div className="absolute left-0 top-1/4">
          <CategoryPill  label="income" />
        </div>
        <div className="absolute right-0 top-1/4">
          <CategoryPill  label="expenses" />
        </div>
        <div className="absolute right-0 top-2/4">
          <CategoryPill  label="food" />
        </div>
        <div className="absolute right-0 bottom-10">
          <CategoryPill  label="travel" />
        </div>
          <div className="absolute left-0 top-2/4">
            <CategoryPill  label="fun" />
          </div>
          <div className="absolute left-0 bottom-10">
            <CategoryPill  label="retire" />
          </div>
      </div>
      <div className="text-center">
        <h1 className="text-6xl font-bold ">mift</h1>
        <p>your minimal finance tracker app</p>
      </div>
      <div className="mt-8 w-full">
        <Link href="/dashboard"><button className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-2 px-4 rounded-full">Get Started</button></Link>
      </div>
    </main>
  );
}

function CategoryPill({  label }: {  label: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-400 shadow-sm">
      <span className="text-sm text-stone-900">{label}</span>
    </div>
  )
}

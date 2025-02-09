import { getUserSession } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { user } = await getUserSession();
  if (user) {
    redirect("/");
  }
  return <>{children}</>;
}

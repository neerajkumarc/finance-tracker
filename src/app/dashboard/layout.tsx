import { MobileNav } from "@/components/MobileNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-4 h-screen sm:h-full relative md:py-8 py-6">
      {children}
      <MobileNav />
    </div>
  );
}

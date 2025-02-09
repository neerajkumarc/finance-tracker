import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "mift",
  description: "a minimal finance tracker",
  keywords: "finance, tracker, mift, financial assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-mono antialiased`}
      >
        <div className="mx-auto max-w-sm md:border-2  rounded-xl p-2 h-screen flex flex-col overflow-y-auto no-scrollbar">
          <div className="flex-grow">{children}</div>
        </div>
      </body>
    </html>
  );
}

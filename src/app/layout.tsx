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
      <body className="font-mono antialiased">
        <div className="min-h-screen w-full bg-gray-50 sm:p-4">
          {/* Mobile-first view (shows on all screens)*/}
          <div className="w-full sm:hidden">{children}</div>

          {/* Desktop view with phone mockup (hidden on mobile) */}
          <div className="hidden sm:block">
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[740px] w-[360px] shadow-xl">
              <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
              <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
              <div className="rounded-[2rem] overflow-hidden w-[332px] h-[712px] bg-white dark:bg-gray-800">
                <div className="h-full">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

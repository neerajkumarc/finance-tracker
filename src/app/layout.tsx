import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className="font-mono antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex md:block justify-center items-center w-full sm:p-4">
            {/* Mobile-first view (shows on all screens)*/}
            <div className="w-full sm:hidden">{children}</div>

            {/* Desktop view with phone mockup (hidden on mobile) */}
            <div className="hidden sm:block">
              <div className="relative mx-auto border-neutral-800 dark:border-neutral-800 border-[14px] rounded-[2.5rem] h-[740px] w-[360px] shadow-xl">
                <div className="w-[148px] h-[18px] bg-neutral-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                <div className="h-[46px] w-[3px] bg-neutral-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                <div className="h-[46px] w-[3px] bg-neutral-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                <div className="h-[64px] w-[3px] bg-neutral-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                <div className="rounded-[2rem] overflow-hidden w-[332px] h-[712px]">
                  <div className="h-full">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

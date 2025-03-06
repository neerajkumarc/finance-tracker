"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Settings, Plus, X, ChartColumnBig, Download } from "lucide-react"
import { exportTransactions, importTransactions } from "@/lib/indexedDB"
import AddDataManually from "@/app/dashboard/AddDataManually"
import AddDataWithMic from "@/app/dashboard/AddDataWithMic"
import Link from "next/link"
import { useFloatingMenuStore } from "@/store/useToggleFloatingMenu"
import { usePathname } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function MobileNav() {
  const {isOpen, setIsOpen} = useFloatingMenuStore();
  const pathname = usePathname();

  return (
    <div className="w-full absolute bottom-0">
      {/* Floating Menu Options */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed bottom-28 left-0 right-0 flex justify-center gap-8 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <AddDataManually/>
              <span className="text-xs m-2 text-muted-foreground">manual</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <AddDataWithMic/>
              <span className="text-xs m-2 text-muted-foreground">voice</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Navigation Bar */}
      <div className="">
        <div className="relative flex items-center justify-between p-4 shadow-lg px-8">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center gap-1 transition-colors hover:text-primary ${
              pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Home className="h-6 w-6" />
          </Link>
          <Link
            href="/dashboard/graph"
            className={`flex flex-col items-center gap-1 transition-colors hover:text-primary mr-8 ${
              pathname === '/dashboard/graph' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <ChartColumnBig className="h-6 w-6" />
          </Link>

          {/* Center Plus Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute -top-6 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full shadow-lg bg-black text-white dark:bg-white dark:text-black transition-transform hover:scale-110"
          >
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
              {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
            </motion.div>
          </button>

          <Dialog>
            <DialogTrigger asChild>
              <button className="flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-primary">
                <Download className="h-6 w-6" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import/Export Transactions</DialogTitle>
                <DialogDescription>
                  Download your transactions as a CSV file or import them from a CSV file
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <Button 
                  onClick={async () => {
                    await exportTransactions();
                  }}
                >
                  Download CSV
                </Button>
                <Button 
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.csv';
                    input.onchange = async (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = async (e) => {
                          const csv = e.target?.result as string;
                          await importTransactions(csv);
                          //refresh the ui
                          setTimeout(() => {
                            window.location.reload();
                          }, 500);
                        };
                        reader.readAsText(file);
                      }
                    };
                    input.click();
                  }}
                >
                  Import CSV
                </Button> 
              </div>
            </DialogContent>
          </Dialog>

          <Link
            href="/dashboard/settings"
            className={`flex flex-col items-center gap-1 transition-colors hover:text-primary ${
              pathname === '/dashboard/settings' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Settings className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  )
}

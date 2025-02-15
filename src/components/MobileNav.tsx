"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, User, Settings, Plus, X, ChartColumnBig } from "lucide-react"
import Link from "next/link"
import AddDataWithMic from "@/app/dashboard/AddDataWithMic"
import AddDataManually from "@/app/dashboard/AddDataManually"

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false)

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
        <div className="relative flex items-center justify-between bg-white p-4 shadow-lg px-8">
          <Link
            href="/dashboard"
            className="flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
          >
            <Home className="h-6 w-6" />
          </Link>
          <Link
            href="/graph"
            className="flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-primary mr-8"
          >
            <ChartColumnBig className="h-6 w-6" />
          </Link>

          {/* Center Plus Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute -top-6 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-black text-white shadow-lg transition-transform hover:scale-110"
          >
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
              {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
            </motion.div>
          </button>

          <Link
            href="/profile"
            className="flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
          >
            <User className="h-6 w-6" />
          </Link>
          <Link
            href="/settings"
            className="flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
          >
            <Settings className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  )
}


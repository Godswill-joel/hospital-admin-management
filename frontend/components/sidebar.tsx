"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { mainLinks, toolCategories } from "@/data/data"
import { ChevronDown, Menu, X, Send, LogOut, } from "lucide-react";
import { Button } from "./ui/button";

// ─── Accordion item ──────────────────────────────────────────────────────────
function CategoryItem({ cat }: { cat: typeof toolCategories[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200 group"
      >
        <span className="flex items-center gap-3">
          <cat.icon className="w-4 h-4 flex-shrink-0 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
          <span className="text-sm font-medium">{cat.label}</span>
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-600" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden pl-10 pr-3"
          >
            {cat.items.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="block py-1.5 text-xs text-zinc-500 hover:text-cyan-400 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();


  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-background">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-white/5">
        <div className="flex items-center gap-1 text-black font-black text-lg tracking-tight">
          <span className="text-cyan-400 text-4xl leading-none">⌘</span>
          <span>MediCare</span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto scrollbar-hide py-4 px-3 space-y-0.5">
        {/* Main links */}
        {mainLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-black hover:text-blue hover:bg-white/5 transition-all duration-200 group"
          >
            <link.icon className="w-4 h-4 flex-shrink-0 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
            <span className="text-sm font-medium">{link.label}</span>
            {link.dot && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
            )}
          </a>
        ))}

      </div>

      {/* Footer CTA */}
      <div className="px-4 py-4 border-t border-white/5">
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-3 rounded-xl bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-400 transition-all duration-200 group"
        >
          <Send className="w-4 h-4 flex-shrink-0" />
          <Button
            variant="outline"
            onClick={handleLogout}
            className="gap-2 border-destructive/30 text-black hover:bg-destructive hover:text-destructive-foreground bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </a>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-zinc-800 text-white border border-white/10"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* ── Mobile overlay ───────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/60 z-40"
          />
        )}
      </AnimatePresence>

      {/* ── Mobile drawer ────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="lg:hidden fixed top-0 left-0 h-screen w-[260px] z-50 border-r border-white/5 bg-[#111111]"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-[260px] border-r border-white/5">
        <SidebarContent />
      </aside>
    </>
  );
}
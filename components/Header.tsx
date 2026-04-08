"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FiSettings, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Devices", href: "/dashboard/devices" },
    { label: "Monitoring & Alerts", href: "/dashboard/monitoring" },
    { label: "Automation & Patching", href: "/dashboard/automation" },
    { label: "Remote Access & Support", href: "/dashboard/remote-access" },
    { label: "Reports & Settings", href: "/dashboard/reports" }
  ];

  return (
    <>
      <div className="w-full border-b border-gray-200 bg-white px-4 md:px-6 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-6">
          <Image src="/logo.svg" alt="Logo" width={96} height={32} className="py-4" />

          {/* Desktop Nav */}
          <div className="hidden lg:flex text-sm text-gray-600">
            {links.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className={cn(
                  "px-4 py-5 flex items-center gap-1 border-b-4 border-transparent hover:bg-gray-100",
                  pathname.startsWith(link.href)
                    ? "text-blue-600 bg-blue-50 font-bold border-blue-600"
                    : ""
                )}
              >
                {link.label}
                {i === links.length - 1 && (
                  <span className="py-[1px] px-[4px] rounded-full bg-blue-500 text-white text-xs">
                    20
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Right (Desktop) */}
        <div className="flex items-center gap-5">
          <Link href="#" className="text-sm text-gray-600">
            Changelog
          </Link>

          <div className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full">
            <FiSettings />
          </div>

          <div className="hidden md:block relative w-8 h-8 rounded-full bg-blue-900">
            <Image src="/level.png" alt="avatar" fill className="object-contain" />
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-1 hover:bg-gray-100 rounded-full"
            onClick={() => setOpen(true)}
          >
            <FiMenu size={22} />
          </button>
        </div>

      </div>

      {/* Mobile Slide Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="absolute right-0 top-0 h-full w-72 bg-white shadow-lg flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 mb-2 border-b border-gray-200">
                <span className="font-semibold">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col">
                {links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-4 py-3 text-sm flex justify-between items-center hover:bg-gray-100",
                      pathname.startsWith(link.href)
                        ? "text-blue-600 bg-blue-50 font-medium border-r-4 border-blue-600"
                        : "text-gray-700"
                    )}
                  >
                    {link.label}
                    {i === links.length - 1 && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                        20
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Bottom */}
              <div className="mt-auto p-4 border-t border-gray-200 flex justify-between items-center gap-4">
                <div className="relative w-8 h-8 rounded-full bg-blue-900">
                  <Image src="/level.png" alt="avatar" fill className="object-contain" />
                </div>
                <div className="flex items-center gap-2">
                  <FiSettings />
                  <span className="text-sm">Settings</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
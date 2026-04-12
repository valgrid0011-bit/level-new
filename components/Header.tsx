"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FiSettings, FiMenu, FiX, FiUser, FiLogOut, FiHelpCircle, FiBell, FiKey, FiShield } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // desktop dropdown
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement | null>(null);

  const links = [
    { label: "Devices", href: "/dashboard/devices" },
    { label: "Monitoring", href: "/dashboard/monitoring" },
    { label: "Automation", href: "/dashboard/automation" },
    { label: "Remote Access", href: "/dashboard/remote-access" },
    { label: "Reports", href: "/dashboard/reports" }
  ];

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!settingsRef.current) return;
      if (!settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setSettingsOpen(false);
    // Add your logout logic here
    router.push("/login");
  };

  return (
    <>
      <div className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 md:px-6 flex items-center justify-between transition-colors duration-200">
        {/* Left */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={40}
              height={40}
              className="py-3"
            />
            <Image
              src="/level.svg"
              alt="Level"
              width={70}
              height={70}
              className="py-3 dark:invert"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex text-sm text-gray-600 dark:text-gray-400">
            {links.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className={cn(
                  "px-4 py-5 flex items-center gap-1 border-b-4 border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                  pathname.startsWith(link.href)
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 font-bold border-blue-600"
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
        <div className="flex items-center gap-3">
          <Link
            href="#"
            className="text-sm text-gray-600 dark:text-gray-400 hidden md:block hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            Changelog
          </Link>

          {/* Settings Dropdown */}
          <div className="relative hidden md:block" ref={settingsRef}>
            <button
              onClick={() => setSettingsOpen((prev) => !prev)}
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-400 transition-colors",
                settingsOpen
                  ? "bg-gray-100 dark:bg-gray-800"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              <FiSettings />
            </button>

            <AnimatePresence>
              {settingsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-64 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg overflow-hidden z-50"
                >
                  {/* User Info Section */}
                  <div className="p-3 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full bg-blue-900 flex-shrink-0">
                        <Image
                          src="/level.png"
                          alt="avatar"
                          fill
                          className="object-contain rounded-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                          John Doe
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          john@example.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Appearance Section */}
                  <div className="p-3 border-b border-gray-200 dark:border-gray-800">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Appearance
                    </p>
                    <ThemeToggle showLabels />
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setSettingsOpen(false);
                        router.push("/settings/profile");
                      }}
                      className="w-full px-3 py-2 flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <FiUser className="text-gray-500 dark:text-gray-400" size={16} />
                      <span>Profile Settings</span>
                    </button>

                    <button
                      onClick={() => {
                        setSettingsOpen(false);
                        router.push("/settings/account");
                      }}
                      className="w-full px-3 py-2 flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <FiSettings className="text-gray-500 dark:text-gray-400" size={16} />
                      <span>Account Settings</span>
                    </button>

                    <button
                      onClick={() => {
                        setSettingsOpen(false);
                        router.push("/settings/notifications");
                      }}
                      className="w-full px-3 py-2 flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <FiBell className="text-gray-500 dark:text-gray-400" size={16} />
                      <span>Notifications</span>
                    </button>

                    <button
                      onClick={() => {
                        setSettingsOpen(false);
                        router.push("/settings/security");
                      }}
                      className="w-full px-3 py-2 flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <FiShield className="text-gray-500 dark:text-gray-400" size={16} />
                      <span>Privacy & Security</span>
                    </button>

                    <button
                      onClick={() => {
                        setSettingsOpen(false);
                        router.push("/settings/api-keys");
                      }}
                      className="w-full px-3 py-2 flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <FiKey className="text-gray-500 dark:text-gray-400" size={16} />
                      <span>API Keys</span>
                    </button>

                    <button
                      onClick={() => {
                        setSettingsOpen(false);
                        router.push("/help");
                      }}
                      className="w-full px-3 py-2 flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <FiHelpCircle className="text-gray-500 dark:text-gray-400" size={16} />
                      <span>Help & Support</span>
                    </button>
                  </div>

                  {/* Logout Section */}
                  <div className="border-t border-gray-200 dark:border-gray-800">
                    <button
                      onClick={handleLogout}
                      className="w-full px-3 py-2 flex items-center gap-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                    >
                      <FiLogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden md:block relative w-8 h-8 rounded-full bg-blue-900">
            <Image src="/level.png" alt="avatar" fill className="object-contain" />
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 transition-colors"
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
              className="absolute inset-0 bg-black/40 dark:bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="absolute right-0 top-0 h-full w-72 bg-white dark:bg-gray-900 shadow-lg flex flex-col border-l border-gray-200 dark:border-gray-800 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between p-4 mb-2 border-b border-gray-200 dark:border-gray-800">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Menu
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 transition-colors"
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
                      "px-4 py-3 text-sm flex justify-between items-center transition-colors",
                      pathname.startsWith(link.href)
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 font-medium border-r-4 border-blue-600"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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

              {/* Mobile Settings Section */}
              <div className="mt-auto flex flex-col">
                {/* Theme Toggle */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Appearance
                  </p>
                  <ThemeToggle showLabels />
                </div>

                {/* Menu Items */}
                <div className="border-t border-gray-200 dark:border-gray-800">
                  <button
                    onClick={() => {
                      setOpen(false);
                      router.push("/settings/profile");
                    }}
                    className="w-full px-4 py-3 flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <FiUser className="text-gray-500 dark:text-gray-400" size={18} />
                    <span>Profile Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      setOpen(false);
                      router.push("/settings/account");
                    }}
                    className="w-full px-4 py-3 flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <FiSettings className="text-gray-500 dark:text-gray-400" size={18} />
                    <span>Account Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      setOpen(false);
                      router.push("/settings/notifications");
                    }}
                    className="w-full px-4 py-3 flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <FiBell className="text-gray-500 dark:text-gray-400" size={18} />
                    <span>Notifications</span>
                  </button>

                  <button
                    onClick={() => {
                      setOpen(false);
                      router.push("/settings/security");
                    }}
                    className="w-full px-4 py-3 flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <FiShield className="text-gray-500 dark:text-gray-400" size={18} />
                    <span>Privacy & Security</span>
                  </button>

                  <button
                    onClick={() => {
                      setOpen(false);
                      router.push("/settings/api-keys");
                    }}
                    className="w-full px-4 py-3 flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <FiKey className="text-gray-500 dark:text-gray-400" size={18} />
                    <span>API Keys</span>
                  </button>

                  <button
                    onClick={() => {
                      setOpen(false);
                      router.push("/help");
                    }}
                    className="w-full px-4 py-3 flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <FiHelpCircle className="text-gray-500 dark:text-gray-400" size={18} />
                    <span>Help & Support</span>
                  </button>
                </div>

                {/* User Info + Logout */}
                <div className="border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-3 p-4">
                    <div className="relative w-10 h-10 rounded-full bg-blue-900 flex-shrink-0">
                      <Image
                        src="/level.png"
                        alt="avatar"
                        fill
                        className="object-contain rounded-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                        John Doe
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        john@example.com
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 flex items-center gap-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors border-t border-gray-200 dark:border-gray-800"
                  >
                    <FiLogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
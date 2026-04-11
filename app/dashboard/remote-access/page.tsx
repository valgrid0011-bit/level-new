"use client";

import React from "react";
import {
  FiMonitor,
  FiSearch,
  FiArrowUpRight,
  FiClock,
  FiShield,
  FiTerminal,
  FiUser,
  FiChevronRight
} from "react-icons/fi";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { RiHome6Line } from "react-icons/ri";

const RemoteAccessPage = () => {
  const sessions = [
    { id: "1024", device: "Brenda Jefferson", type: "Desktop Session", duration: "1h 24m", user: "Admin", ip: "192.168.1.14" },
    { id: "1025", device: "Server-Exchange", type: "Terminal", duration: "45m", user: "Admin", ip: "10.0.0.5" },
    { id: "1026", device: "Accounting-PC-02", type: "File Transfer", duration: "12m", user: "IT Support", ip: "192.168.1.55" },
  ];

  return (
    <div className="w-full h-full max-w-8xl mx-auto">
      <div className="flex-1 flex flex-col min-h-screen bg-gray-50/50 dark:bg-gray-950 min-w-0 transition-colors duration-200 p-4 md:p-6">

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Link href="/dashboard" className='text-blue-500 hover:text-blue-600'>
            <RiHome6Line size={18} />
          </Link>
          <FiChevronRight size={14} />
          <span className="text-gray-800 dark:text-gray-200 font-bold">Remote Access</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-wrap py-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <FiMonitor className="text-blue-500" /> Remote Access & Support
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Securely connect to endpoints, manage active sessions, and review audit logs.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors shadow-sm flex items-center gap-2 flex-shrink-0">
              <FiArrowUpRight size={16} /> Quick Connect
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex-1 w-full p-6 flex flex-col gap-6">

          {/* Info Banner */}
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-xl p-4 flex items-start gap-3">
            <FiShield className="text-blue-600 dark:text-blue-400 mt-0.5" size={20} />
            <div>
              <h3 className="text-sm font-bold text-blue-900 dark:text-blue-200">Secure Audit Logging Active</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-0.5">All remote sessions are currently being recorded according to your compliance policies and are retained for 90 days.</p>
            </div>
          </div>

          {/* Quick Connect */}
          <div className="bg-white dark:bg-gray-900 border text-center border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-8 max-w-3xl mx-auto w-full transition-colors duration-200">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMonitor size={32} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Start a new secure session</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-md mx-auto">Enter an endpoint name, IP address, or support code to initiate a direct WebRTC connection.</p>

            <div className="mt-6 flex max-w-md mx-auto items-center">
              <input
                type="text"
                placeholder="Search device..."
                className="flex-1 border border-gray-300 dark:border-gray-700 rounded-l-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
              <button className="bg-blue-600 text-white font-medium px-6 py-2.5 rounded-r-lg border border-blue-600 hover:bg-blue-700 transition">
                Connect
              </button>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex-1 flex flex-col min-h-0 transition-colors duration-200">
            <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] rounded-full animate-pulse"></span>
                Active Sessions ({sessions.length})
              </h3>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">View Audit History</button>
            </div>

            <div className="flex-1 overflow-auto min-h-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900/80 border-b border-gray-100 dark:border-gray-800 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {['Device Target', 'Session Type', 'Initiated By', 'Duration', 'Actions'].map(h => (
                        <th key={h} className={cn("px-5 py-3 whitespace-nowrap", h === 'Actions' ? 'text-right' : '')}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                    {sessions.map((session, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            {session.device}
                            <span className="text-xs font-normal text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">{session.ip}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                            {session.type === 'Terminal' ? <FiTerminal className="text-gray-400 dark:text-gray-500" /> : <FiMonitor className="text-gray-400 dark:text-gray-500" />}
                            {session.type}
                          </span>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                            <FiUser /> {session.user}
                          </span>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 text-sm text-amber-600 dark:text-amber-400 font-medium">
                            <FiClock size={14} /> {session.duration}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right whitespace-nowrap">
                          <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-200 dark:hover:border-red-800 rounded text-sm font-medium transition-colors">
                            Terminate
                          </button>
                        </td>
                      </tr>
                    ))}
                    {sessions.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                          No active sessions running.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoteAccessPage;

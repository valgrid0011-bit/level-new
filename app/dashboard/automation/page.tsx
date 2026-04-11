"use client";

import React, { useState } from "react";
import {
  FiZap,
  FiCode,
  FiClock,
  FiPlayCircle,
  FiCheckCircle,
  FiXCircle,
  FiPlus,
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiRefreshCw,
  FiChevronRight
} from "react-icons/fi";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { RiHome6Line } from "react-icons/ri";

const AutomationPage = () => {
  const [activeTab, setActiveTab] = useState("Scripts");

  const tabs = ["Scripts", "Patch Policies", "Job History", "Scheduled Tasks"];

  const scripts = [
    { name: "Clear Print Spooler", language: "PowerShell", author: "System", runs: 1243, lastRun: "2 mins ago" },
    { name: "Install Next-Gen AV", language: "Bash", author: "Admin", runs: 58, lastRun: "1 hour ago" },
    { name: "Reset Network Adapter", language: "PowerShell", author: "IT Team", runs: 890, lastRun: "3 hours ago" },
    { name: "Deploy Latest Feature Update", language: "Batch", author: "Admin", runs: 12, lastRun: "Yesterday" },
    { name: "Clear Temp Files", language: "PowerShell", author: "System", runs: 5430, lastRun: "2 days ago" },
  ];

  return (
    <div className="w-full h-full max-w-8xl mx-auto">
      <div className="flex-1 flex flex-col min-h-screen p-4 md:p-6 bg-gray-50/50 dark:bg-gray-950 min-w-0 transition-colors duration-200">

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Link href="/dashboard" className='text-blue-500 hover:text-blue-600'>
            <RiHome6Line size={18} />
          </Link>
          <FiChevronRight size={14} />
          <span className="text-gray-800 dark:text-gray-200 font-bold">Automation</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-wrap py-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <FiZap className="text-amber-500" /> Automation & Patching
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Manage scripts, patch policies, and schedule background jobs across your fleet.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 shadow-sm transition-colors text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 flex items-center gap-2 flex-shrink-0">
              <FiRefreshCw size={16} /> Sync Repository
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors shadow-sm flex items-center gap-2 flex-shrink-0">
              <FiPlus size={16} /> New Script
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex-1 w-full p-3 flex flex-col gap-6">

          {/* Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: FiCode, bg: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600', label: 'Total Scripts', value: '142' },
              { icon: FiCheckCircle, bg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600', label: 'Success Rate (24h)', value: '98.5%' },
              { icon: FiXCircle, bg: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600', label: 'Failed Jobs (24h)', value: '3' },
              { icon: FiPlayCircle, bg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600', label: 'Running Now', value: '12' },
            ].map(({ icon: Icon, bg, label, value }) => (
              <div key={label} className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 h-full flex items-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30 gap-4">
                <div className={cn("p-4 rounded-lg", bg)}>
                  <Icon size={22} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Content Area */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex-1 flex flex-col min-h-0 transition-colors duration-200">
            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-800 px-2 flex overflow-x-auto flex-shrink-0">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                    activeTab === tab
                      ? "border-blue-600 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-4 md:p-5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3 bg-gray-50/50 dark:bg-gray-800/30 flex-shrink-0">
              <div className="relative flex-1 w-full sm:max-w-md">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search scripts by name or language..."
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 flex-shrink-0 transition-colors">
                <FiFilter size={16} /> Filters
              </button>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto min-h-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                      {['Script Name', 'Language', 'Author', 'Lifecycle Runs', 'Last Run', 'Actions'].map(h => (
                        <th key={h} className="px-6 py-3 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                    {scripts.map((script, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 group transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 cursor-pointer">{script.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border",
                            script.language === 'PowerShell' ? "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900" :
                              script.language === 'Bash' ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700" :
                                "bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-900"
                          )}>
                            {script.language}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{script.author}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{script.runs.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          <div className="flex items-center gap-1.5"><FiClock size={14} />{script.lastRun}</div>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded transition-colors" title="Run Script">
                              <FiPlayCircle size={18} />
                            </button>
                            <button className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors">
                              <FiMoreVertical size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
              <span>Showing 5 of 142 scripts</span>
              <div className="flex gap-2 text-gray-600 dark:text-gray-400 font-medium">
                <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors">Previous</button>
                <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationPage;

"use client";

import React, { useState } from "react";
import {
  FiFileText,
  FiDownload,
  FiCalendar,
  FiSettings,
  FiPieChart,
  FiClock,
  FiChevronRight
} from "react-icons/fi";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { RiHome6Line } from "react-icons/ri";

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("Templates");

  const templates = [
    { name: "Executive Summary", desc: "High level overview of network health, top alerts, and patch compliance.", type: "PDF", schedule: "Monthly" },
    { name: "Patch Compliance", desc: "Detailed breakdown of installed, missing, and failed OS updates.", type: "CSV, PDF", schedule: "Weekly" },
    { name: "Hardware Inventory", desc: "Complete exported list of physical devices, components, and disks.", type: "CSV", schedule: "Manual" },
    { name: "Security Audit", desc: "Security scores, vulnerabilities, and endpoint firewall statuses.", type: "PDF", schedule: "Daily" },
    { name: "Remote Sessions Log", desc: "All recorded WebRTC connect sessions mapped to users and timestamps.", type: "CSV", schedule: "Monthly" },
  ];

  return (
    <div className="w-full max-w-8xl mx-auto">
      <div className="flex-1 flex flex-col bg-gray-50/50 dark:bg-gray-950 min-w-0 transition-colors duration-200 p-4 md:p-6">

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Link href="/dashboard" className='text-blue-500 hover:text-blue-600'>
            <RiHome6Line size={18} />
          </Link>
          <FiChevronRight size={14} />
          <span className="text-gray-800 dark:text-gray-200 font-bold">Reports</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-wrap py-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-950/50 rounded-lg">
                <FiFileText size={28} className='text-blue-600 dark:text-blue-400' />
              </div>
              Reports & Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base">
              Generate beautiful executive reports, schedule email deliveries, and configure workspace basics.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 shadow-sm transition-colors text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 flex items-center gap-2 flex-shrink-0">
              <FiSettings size={16} /> Global Settings
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors shadow-sm flex items-center gap-2 flex-shrink-0">
              <FiDownload size={16} /> Custom Export
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex-1 w-full p-3 flex flex-col gap-6">
          {/* Settings Teaser Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: FiSettings, bg: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600', title: 'Workspace Configurations', desc: 'Manage API keys, billing, user invites, and notification channels.' },
              { icon: FiPieChart, bg: 'bg-pink-50 dark:bg-pink-950/60 text-pink-600', title: 'Custom Dashboards', desc: 'Edit default widgets and visualizations attached to generated PDFs.' },
              { icon: FiCalendar, bg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600', title: 'Scheduled Deliveries', desc: 'Review active cron jobs routing reports to specific external emails.' },
            ].map(({ icon: Icon, bg, title, desc }) => (
              <button key={title} className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 h-full flex gap-3 items-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30 text-left group">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform", bg)}>
                  <Icon size={20} />
                </div>
                <div className="">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">{title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="self-wrap bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex-1 flex flex-col mt-2 transition-colors duration-200">
            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-800 px-3 pt-2 flex overflow-x-auto flex-shrink-0">
              {['Templates', 'Generated'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab === 'Generated' ? 'Generated' : 'Templates')}
                  className={cn(
                    "px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap",
                    activeTab === tab
                      ? "border-blue-600 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  )}
                >
                  {tab === 'Templates' ? 'Report Templates' : 'Generated History'}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900/80 border-b border-gray-100 dark:border-gray-800 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {['Report Name', 'Description', 'Output Format', 'Delivery Schedule', 'Actions'].map(h => (
                      <th key={h} className={cn("px-6 py-4 whitespace-nowrap", h === 'Actions' ? 'text-right' : '')}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                  {templates.map((tpl, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 group transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center gap-2">
                          <FiFileText className="text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
                          {tpl.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 max-w-sm sm:max-w-none truncate md:whitespace-normal whitespace-nowrap" title={tpl.desc}>
                        {tpl.desc}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
                          {tpl.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
                          {tpl.schedule !== 'Manual' && <FiClock size={14} className="text-blue-500 dark:text-blue-400" />}
                          {tpl.schedule}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex gap-2 justify-end">
                          <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded text-sm font-medium transition-colors">
                            Configure
                          </button>
                          <button className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/60 rounded text-sm font-medium transition-colors shadow-sm">
                            Generate Now
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;

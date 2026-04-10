'use client';

import React from 'react';
import Link from 'next/link';
import {
  FiAlertCircle,
  FiClock,
  FiServer,
  FiHardDrive,
  FiCheckCircle,
  FiXCircle,
  FiTerminal,
  FiExternalLink,
  FiChevronRight
} from 'react-icons/fi';
import { cn } from '@/lib/utils';
import { RiHome6Line } from 'react-icons/ri';

export default function ReportPage() {
  const report = {
    id: "213",
    severity: "Critical",
    title: "Disk Space Below 5%",
    device: "Server-01",
    deviceGroup: "Servers/Internal",
    time: "2 mins ago",
    status: "Open",
    description: "The primary operational drive (C:) has critically low available free space. The disk limit violation policy states that alerts trigger when under 5% free capacity.",
    currentUsage: "475 GB used of 500 GB (95%)",
    triggerRule: "System Health > Disk Space Check",
    resolved: false
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900';
      case 'High': return 'text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900';
      case 'Medium': return 'text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900';
      case 'Low': return 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900';
      default: return 'text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  const cardClass = "bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30";

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50 dark:bg-gray-950 p-6 md:p-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Navigation / Header */}
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
            <Link href="/dashboard" className='text-blue-500 hover:text-blue-600'>
              <RiHome6Line size={18} />
            </Link>
            <FiChevronRight size={14} />
            <Link href="/dashboard/monitoring" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 font-bold cursor-pointer">
              Monitoring
            </Link>
            <FiChevronRight size={14} />
            <span className="text-gray-800 dark:text-gray-200 font-bold">Disk Space</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={cn("p-2.5 rounded-xl border flex items-center justify-center", getSeverityStyles(report.severity))}>
                <FiAlertCircle size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                  {report.title}
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
                    report.status === 'Open' ? "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900" : "text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  )}>
                    {report.status}
                  </span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Alert ID #{report.id} • Triggered {report.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm transition-colors">
                Ignore Alert
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors">
                Acknowledge
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <div className={cardClass}>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Alert Details</h2>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{report.description}</p>
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-red-900 dark:text-red-300">Current Disk Usage (C:)</span>
                    <span className="text-sm font-bold text-red-700 dark:text-red-400">95%</span>
                  </div>
                  <div className="w-full bg-red-200/50 dark:bg-red-900/30 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <p className="text-xs text-red-700 dark:text-red-400 mt-2 font-medium">{report.currentUsage}</p>
                </div>
              </div>
            </div>

            <div className={cardClass}>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recommended Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm rounded-lg transition-all group">
                  <div className="flex items-center gap-3 text-left">
                    <div className="p-2 bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-lg group-hover:scale-105 transition-transform">
                      <FiTerminal size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Run Automated Disk Cleanup Script</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Clears temp files, windows update cache, and recycle bin</p>
                    </div>
                  </div>
                  <FiExternalLink className="text-gray-400 dark:text-gray-500 group-hover:text-blue-500 flex-shrink-0" />
                </button>

                <button className="w-full flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm rounded-lg transition-all group">
                  <div className="flex items-center gap-3 text-left">
                    <div className="p-2 bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-lg group-hover:scale-105 transition-transform">
                      <FiServer size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">View Server Metrics</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Inspect exactly what spaces are taken up live.</p>
                    </div>
                  </div>
                  <FiExternalLink className="text-gray-400 dark:text-gray-500 group-hover:text-blue-500 flex-shrink-0" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className={cardClass}>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wider">Target Endpoint</h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white">
                  <FiServer size={20} />
                </div>
                <div>
                  <Link href="/dashboard/devices/vpn-server" className="font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">{report.device}</Link>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{report.deviceGroup}</p>
                </div>
              </div>
              <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">Status</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-600 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Online
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">Last Seen</span>
                  <span className="text-gray-900 dark:text-gray-100 font-medium pb-1">Just now</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">OS</span>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">Windows Server 2019</span>
                </div>
              </div>
            </div>

            <div className={cardClass}>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wider">Policy Context</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">Policy Group</span>
                  <span className="text-gray-900 dark:text-gray-100 font-medium bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">UBR Basics</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-500 dark:text-gray-400">Trigger Rule</span>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">{report.triggerRule}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-500 dark:text-gray-400">Notifications</span>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">IT Admin Team (Email)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

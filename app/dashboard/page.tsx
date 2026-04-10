"use client";

import React from "react";
import {
  FiMonitor,
  FiAlertCircle,
  FiZap,
  FiShield,
  FiClock,
  FiCheckCircle,
  FiArrowUpRight,
  FiActivity
} from "react-icons/fi";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const StatCard = ({ title, value, change, icon: Icon, colorClass, trendUp }: any) => (
  <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
    <div className="flex items-center justify-between mb-4">
      <div className={cn("p-3 rounded-lg", colorClass)}>
        <Icon size={22} className="text-current" />
      </div>
      <div className={cn("flex items-center text-sm font-medium", trendUp ? "text-emerald-600" : "text-rose-600")}>
        <span>{change}</span>
        <FiArrowUpRight size={16} className={cn("ml-1", !trendUp && "rotate-90")} />
      </div>
    </div>
    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
    <div className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-1">{value}</div>
  </div>
);

const Page = () => {
  const chartData = [
    { time: "00h", reachability: 98 },
    { time: "01h", reachability: 99 },
    { time: "02h", reachability: 100 },
    { time: "03h", reachability: 100 },
    { time: "04h", reachability: 99 },
    { time: "05h", reachability: 98 },
    { time: "06h", reachability: 85 },
    { time: "07h", reachability: 90 },
    { time: "08h", reachability: 100 },
    { time: "09h", reachability: 100 },
    { time: "10h", reachability: 100 },
    { time: "11h", reachability: 99 },
    { time: "12h", reachability: 100 },
    { time: "13h", reachability: 98 },
    { time: "14h", reachability: 100 },
    { time: "15h", reachability: 100 },
    { time: "16h", reachability: 99 },
    { time: "17h", reachability: 100 },
    { time: "18h", reachability: 100 },
    { time: "19h", reachability: 98 },
    { time: "20h", reachability: 100 },
    { time: "21h", reachability: 100 },
    { time: "22h", reachability: 99 },
    { time: "23h", reachability: 100 },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50 dark:bg-blue-950 p-6 md:p-8 transition-colors duration-200">
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Platform Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Here is what's happening in your environment today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Devices" value="1,248" change="+12 this week" icon={FiMonitor} colorClass="bg-blue-50 dark:bg-blue-950/50 text-blue-600" trendUp={true} />
          <StatCard title="Active Alerts" value="14" change="+3 since yesterday" icon={FiAlertCircle} colorClass="bg-rose-50 dark:bg-rose-950/50 text-rose-600" trendUp={false} />
          <StatCard title="Automations Running" value="89" change="100% success rate" icon={FiZap} colorClass="bg-amber-50 dark:bg-amber-950/50 text-amber-600" trendUp={true} />
          <StatCard title="Network Security Score" value="94/100" change="+2 points" icon={FiShield} colorClass="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600" trendUp={true} />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Activity / Chart Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">System Reachability (24h)</h2>
                <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                  <button className="px-3 py-1.5 text-sm font-medium bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded shadow-sm">All Devices</button>
                  <button className="px-3 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded">Servers Only</button>
                </div>
              </div>
              <div className="h-64 pt-4">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorReachability" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'var(--tooltip-bg, white)', color: 'var(--tooltip-text, #111827)' }} />
                    <Area type="monotone" dataKey="reachability" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorReachability)" activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Alerts</h2>
                <Link href="/dashboard/monitoring" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">View all</Link>
              </div>
              <div className="space-y-4">
                {[
                  { title: "High CPU Usage", target: "DB-Server-01", time: "10 mins ago", level: "High" },
                  { title: "Failed Login Attempt", target: "Admin-PC", time: "25 mins ago", level: "Critical" },
                  { title: "Windows Update Failed", target: "Sales-Laptop-4", time: "1 hour ago", level: "Medium" }
                ].map((alert, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors gap-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-full",
                        alert.level === 'Critical' ? 'bg-red-100 dark:bg-red-950/50 text-red-600' :
                          alert.level === 'High' ? 'bg-orange-100 dark:bg-orange-950/50 text-orange-600' : 'bg-yellow-100 dark:bg-yellow-950/50 text-yellow-600'
                      )}>
                        <FiAlertCircle size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">{alert.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-0.5">
                          <span>{alert.target}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                          <span className="flex items-center gap-1"><FiClock size={12} /> {alert.time}</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-sm font-medium px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm text-gray-700 dark:text-gray-300 self-start sm:self-auto transition-colors">Acknowledge</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Area */}
          <div className="space-y-6">
            <div className="bg-blue-600 rounded-xl p-6 text-white shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <FiActivity size={100} />
              </div>
              <h3 className="font-medium text-blue-100 mb-1 relative z-10">System Status</h3>
              <div className="text-2xl font-bold mb-4 relative z-10">All Systems Operational</div>
              <div className="flex items-center gap-2 text-sm text-blue-100 relative z-10">
                <FiCheckCircle />
                <span>Last checked: Just now</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/dashboard/devices" className="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-blue-300 transition-colors text-center gap-2 group">
                  <FiMonitor size={24} className="text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Add Device</span>
                </Link>
                <Link href="/dashboard/automation" className="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-blue-300 transition-colors text-center gap-2 group">
                  <FiZap size={24} className="text-gray-400 dark:text-gray-500 group-hover:text-amber-500 transition-colors" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">New Script</span>
                </Link>
                <Link href="/dashboard/remote-access" className="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-blue-300 transition-colors text-center gap-2 group col-span-2">
                  <FiArrowUpRight size={24} className="text-gray-400 dark:text-gray-500 group-hover:text-emerald-500 transition-colors" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Start Remote Session</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Page;

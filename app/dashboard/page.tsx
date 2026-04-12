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
  FiActivity,
  FiServer,
  FiCpu,
  FiHardDrive,
  FiWifi,
  FiRefreshCw,
  FiTrendingUp,
} from "react-icons/fi";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { cn } from "@/lib/utils";

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  colorClass,
  trendUp,
}: any) => (
  <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10">
    <div className="flex items-center justify-between mb-4">
      <div className={cn("p-3 rounded-2xl", colorClass)}>
        <Icon size={24} className="text-current" />
      </div>
      <div
        className={cn(
          "flex items-center text-sm font-semibold",
          trendUp ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
        )}
      >
        <span>{change}</span>
        <FiArrowUpRight
          size={16}
          className={cn("ml-1 transition-transform", !trendUp && "rotate-90")}
        />
      </div>
    </div>
    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide">{title}</h3>
    <div className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mt-1 tabular-nums">
      {value}
    </div>
  </div>
);

const Page = () => {
  const chartData = [
    { time: "00h", reachability: 98 },
    { time: "02h", reachability: 99 },
    { time: "04h", reachability: 100 },
    { time: "06h", reachability: 85 },
    { time: "08h", reachability: 100 },
    { time: "10h", reachability: 100 },
    { time: "12h", reachability: 100 },
    { time: "14h", reachability: 100 },
    { time: "16h", reachability: 99 },
    { time: "18h", reachability: 100 },
    { time: "20h", reachability: 100 },
    { time: "22h", reachability: 99 },
  ];

  const deviceStatusData = [
    { name: "Online", value: 1124, color: "#3b82f6" },
    { name: "Warning", value: 87, color: "#f59e0b" },
    { name: "Offline", value: 37, color: "#ef4444" },
  ];

  const resourceData = [
    { name: "CPU", usage: 42 },
    { name: "Memory", usage: 68 },
    { name: "Disk", usage: 31 },
    { name: "Network", usage: 19 },
  ];

  const topDevices = [
    { name: "DB-Server-01", cpu: 92, memory: 78, status: "critical" },
    { name: "App-Server-03", cpu: 81, memory: 65, status: "warning" },
    { name: "File-Server-02", cpu: 67, memory: 44, status: "ok" },
    { name: "Proxy-01", cpu: 54, memory: 29, status: "ok" },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50 dark:bg-gray-950 p-6 md:p-8 transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3 flex-wrap">
              Platform Overview
              <span className="text-xs font-medium px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-3xl flex items-center gap-1 whitespace-nowrap mt-1 sm:mt-0">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                LIVE
              </span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm sm:text-base">
              Real-time visibility • 1,248 devices monitored • All systems healthy
            </p>
          </div>

          <div className="flex flex-row gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 px-4 h-9 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl text-gray-500 dark:text-gray-400 text-sm whitespace-nowrap flex-shrink-0">
              <FiClock size={16} />
              <span>Last updated just now</span>
            </div>
            <button className="flex items-center justify-center gap-2 px-5 h-9 bg-white dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-3xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium text-sm whitespace-nowrap">
              <FiRefreshCw size={16} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Expanded Stats Grid – now 6 cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <StatCard
            title="Total Devices"
            value="1,248"
            change="+12"
            icon={FiMonitor}
            colorClass="bg-blue-50 dark:bg-blue-950/50 text-blue-600"
            trendUp={true}
          />
          <StatCard
            title="Active Alerts"
            value="14"
            change="+3"
            icon={FiAlertCircle}
            colorClass="bg-rose-50 dark:bg-rose-950/50 text-rose-600"
            trendUp={false}
          />
          <StatCard
            title="Automations"
            value="89"
            change="100% success"
            icon={FiZap}
            colorClass="bg-amber-50 dark:bg-amber-950/50 text-amber-600"
            trendUp={true}
          />
          <StatCard
            title="Security Score"
            value="94"
            change="+2"
            icon={FiShield}
            colorClass="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600"
            trendUp={true}
          />
          <StatCard
            title="System Uptime"
            value="99.92%"
            change="−0.03%"
            icon={FiActivity}
            colorClass="bg-violet-50 dark:bg-violet-950/50 text-violet-600"
            trendUp={false}
          />
          <StatCard
            title="Resolved Today"
            value="42"
            change="+11"
            icon={FiCheckCircle}
            colorClass="bg-teal-50 dark:bg-teal-950/50 text-teal-600"
            trendUp={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content – 8 columns */}
          <div className="lg:col-span-8 space-y-6">
            {/* Reachability Chart – unchanged but cleaner */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">System Reachability • Last 24h</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Average 98.4% • 2 incidents</p>
                </div>
                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-3xl p-1 text-sm">
                  <button className="px-5 py-2 font-medium bg-white dark:bg-gray-700 dark:text-white shadow-sm rounded-3xl">All Devices</button>
                  <button className="px-5 py-2 font-medium text-gray-500 dark:text-gray-400">Servers Only</button>
                </div>
              </div>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} domain={[80, 100]} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                        backgroundColor: "white",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="reachability"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      fill="url(#colorReach)"
                      activeDot={{ r: 6, fill: "#3b82f6", stroke: "#fff", strokeWidth: 3 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* New: Device Health + Resource Utilization side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Device Status Pie */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                  <FiServer size={18} />
                  Device Status
                </h2>
                <div className="flex justify-center">
                  <div className="w-52 h-52">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={deviceStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={65}
                          outerRadius={95}
                          dataKey="value"
                          paddingAngle={3}
                        >
                          {deviceStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4 text-center text-sm">
                  {deviceStatusData.map((item) => (
                    <div key={item.name} className="flex flex-col items-center dark:text-gray-100">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resource Utilization Bars */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Avg. Resource Utilization</h2>
                <div className="space-y-7">
                  {resourceData.map((item) => (
                    <div key={item.name} className="flex items-center gap-4">
                      <div className="w-10 font-medium text-sm text-gray-500 dark:text-gray-400">{item.name}</div>
                      <div className="flex-1 h-2.5 bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden ">
                        <div
                          className={cn(
                            "h-full transition-all",
                            item.usage > 70
                              ? "bg-rose-500"
                              : item.usage > 40
                                ? "bg-amber-500"
                                : "bg-blue-500"
                          )}
                          style={{ width: `${item.usage}%` }}
                        ></div>
                      </div>
                      <div className="w-12 text-right dark:text-gray-100 font-mono text-sm font-semibold">{item.usage}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* New: Top High-Load Devices */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <FiTrendingUp size={18} />
                  Top High-Load Devices
                </h2>
                <Link href="/dashboard/devices" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                  View all devices →
                </Link>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {topDevices.map((device) => (
                  <div
                    key={device.name}
                    className="flex items-center justify-between py-4 first:pt-0 last:pb-0 group"
                  >
                    <div className="flex items-center gap-3">
                      <FiServer className="text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors" />
                      <span className="font-medium text-gray-900 dark:text-gray-100">{device.name}</span>
                    </div>
                    <div className="flex items-center gap-8 text-sm dark:text-white">
                      <div className="flex items-center gap-2">
                        <FiCpu size={15} />
                        <span className="font-mono">{device.cpu}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiHardDrive size={15} />
                        <span className="font-mono">{device.memory}%</span>
                      </div>
                      <div
                        className={cn(
                          "px-3 py-1 text-xs font-medium rounded-3xl",
                          device.status === "critical"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : device.status === "warning"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        )}
                      >
                        {device.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar – 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            {/* System Status – enhanced */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-7 text-white shadow-inner relative overflow-hidden">
              <div className="absolute top-6 right-6 opacity-10">
                <FiActivity size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <span className="uppercase text-xs font-semibold tracking-widest">LIVE STATUS</span>
                </div>
                <div className="text-3xl font-bold mb-1">All Systems Operational</div>
                <div className="flex items-center gap-2 text-blue-100">
                  <FiCheckCircle size={18} />
                  <span className="text-sm">Last checked moments ago • No incidents</span>
                </div>
              </div>
            </div>

            {/* Quick Actions – same but more options */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-5">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/dashboard/devices"
                  className="flex flex-col items-center justify-center p-5 border border-gray-200 dark:border-gray-700 rounded-3xl hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-blue-300 transition-all group"
                >
                  <FiMonitor size={28} className="text-gray-400 dark:text-gray-500 group-hover:text-blue-500 mb-2 transition-colors" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">Add Device</span>
                </Link>
                <Link
                  href="/dashboard/automation"
                  className="flex flex-col items-center justify-center p-5 border border-gray-200 dark:border-gray-700 rounded-3xl hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-amber-300 transition-all group"
                >
                  <FiZap size={28} className="text-gray-400 dark:text-gray-500 group-hover:text-amber-500 mb-2 transition-colors" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">New Automation</span>
                </Link>
                <Link
                  href="/dashboard/remote-access"
                  className="col-span-2 flex items-center justify-center gap-3 p-5 border border-gray-200 dark:border-gray-700 rounded-3xl hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-emerald-300 transition-all group"
                >
                  <FiArrowUpRight size={28} className="text-gray-400 dark:text-gray-500 group-hover:text-emerald-500 transition-colors" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">Start Remote Session</span>
                </Link>
              </div>
            </div>

            {/* New: Recent Alerts – expanded and cleaner */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Alerts</h2>
                <Link href="/dashboard/monitoring" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1">
                  View all <span className="text-xs">14</span>
                </Link>
              </div>

              <div className="space-y-4 flex-1">
                {[
                  { title: "High CPU Usage", target: "DB-Server-01", time: "9 min ago", level: "Critical" },
                  { title: "Failed RDP Login", target: "Admin-PC-12", time: "22 min ago", level: "High" },
                  { title: "Disk Space Critical", target: "File-Server-02", time: "47 min ago", level: "High" },
                  { title: "Windows Update Failed", target: "Sales-Laptop-07", time: "1 hour ago", level: "Medium" },
                ].map((alert, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-3xl bg-gray-50 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-all"
                  >
                    <div
                      className={cn(
                        "mt-0.5 p-2 rounded-2xl flex-shrink-0",
                        alert.level === "Critical"
                          ? "bg-red-100 dark:bg-red-900/40 text-red-600"
                          : alert.level === "High"
                            ? "bg-orange-100 dark:bg-orange-900/40 text-orange-600"
                            : "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600"
                      )}
                    >
                      <FiAlertCircle size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-gray-100 leading-tight">{alert.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                        <span>{alert.target}</span>
                        <span className="text-[10px] text-gray-300 dark:text-gray-600">•</span>
                        <FiClock size={12} />
                        <span>{alert.time}</span>
                      </div>
                    </div>
                    <button className="text-xs font-medium px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-3xl hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 whitespace-nowrap transition-colors">
                      Acknowledge
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
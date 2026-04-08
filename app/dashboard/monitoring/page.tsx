"use client";

import React from "react";

type Alert = {
  id: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  title: string;
  device: string;
  org: string;
  time: string;
  status: "Open" | "Acknowledged" | "Resolved";
};

const MonitoringPage = () => {
  const alerts: Alert[] = [
    {
      id: "1",
      severity: "Critical",
      title: "Disk Space Below 5%",
      device: "Server-01",
      org: "Acme Corp",
      time: "2 min ago",
      status: "Open",
    },
    {
      id: "2",
      severity: "High",
      title: "CPU Usage > 90%",
      device: "Workstation-11",
      org: "TechZone",
      time: "15 min ago",
      status: "Acknowledged",
    },
    {
      id: "3",
      severity: "Medium",
      title: "Device Offline",
      device: "Router-02",
      org: "BlueNet",
      time: "1 hour ago",
      status: "Open",
    },
    {
      id: "4",
      severity: "Low",
      title: "New Software Installed",
      device: "Laptop-02",
      org: "Acme Corp",
      time: "2 hours ago",
      status: "Resolved",
    },
  ];

  const columns: Alert["severity"][] = ["Critical", "High", "Medium", "Low"];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="space-y-8 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Monitoring & Alerts
            </h1>
            <p className="text-white/60 mt-1">
              Real-time alert detection, history, and monitoring rules.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
              Export Alerts
            </button>
            <button className="px-4 py-2 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition">
              + Create Rule
            </button>
          </div>
        </div>

        {/* Real-time board */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {columns.map((col) => (
            <div
              key={col}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4"
            >
              <h2 className="font-semibold mb-3">{col}</h2>

              <div className="space-y-3">
                {alerts
                  .filter((a) => a.severity === col)
                  .map((a) => (
                    <div
                      key={a.id}
                      className="rounded-xl border border-white/10 bg-black/40 p-4 hover:border-white/20 transition"
                    >
                      <p className="font-medium">{a.title}</p>
                      <p className="text-sm text-white/60 mt-1">
                        {a.device} • {a.org}
                      </p>
                      <div className="flex items-center justify-between mt-3 text-xs text-white/50">
                        <span>{a.time}</span>
                        <span>{a.status}</span>
                      </div>
                    </div>
                  ))}

                {alerts.filter((a) => a.severity === col).length === 0 && (
                  <p className="text-sm text-white/40">No alerts.</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Alert History */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-semibold">Alert History</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-white/70 hover:text-white transition">
                Last 24h
              </button>
              <button className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-white/70 hover:text-white transition">
                Severity
              </button>
              <button className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-white/70 hover:text-white transition">
                Status
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-white/60 border-b border-white/10">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Severity</th>
                  <th className="text-left px-4 py-3 font-medium">Alert</th>
                  <th className="text-left px-4 py-3 font-medium">Device</th>
                  <th className="text-left px-4 py-3 font-medium">Org</th>
                  <th className="text-left px-4 py-3 font-medium">Time</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {alerts.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="px-4 py-4">
                      <SeverityBadge severity={a.severity} />
                    </td>
                    <td className="px-4 py-4 font-medium">{a.title}</td>
                    <td className="px-4 py-4 text-white/70">{a.device}</td>
                    <td className="px-4 py-4 text-white/70">{a.org}</td>
                    <td className="px-4 py-4 text-white/70">{a.time}</td>
                    <td className="px-4 py-4 text-white/70">{a.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rules */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
          <h2 className="text-lg font-semibold mb-4">Monitoring Rules</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RuleCard title="CPU > 90%" desc="Triggers if CPU is above 90% for 5 minutes." />
            <RuleCard title="Disk < 10%" desc="Triggers if disk space is below 10%." />
            <RuleCard title="Offline Device" desc="Triggers when a device is unreachable for 2 minutes." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPage;

const SeverityBadge = ({
  severity,
}: {
  severity: "Critical" | "High" | "Medium" | "Low";
}) => {
  return (
    <span
      className={`text-xs px-2 py-1 rounded-full border ${severity === "Critical"
          ? "border-red-500/40 text-red-400"
          : severity === "High"
            ? "border-orange-500/40 text-orange-400"
            : severity === "Medium"
              ? "border-yellow-500/40 text-yellow-300"
              : "border-green-500/40 text-green-400"
        }`}
    >
      {severity}
    </span>
  );
};

const RuleCard = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4 hover:border-white/20 transition">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-white/60 mt-2">{desc}</p>
      <button className="mt-4 text-sm px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition">
        Edit Rule
      </button>
    </div>
  );
};
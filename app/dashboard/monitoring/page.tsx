'use client';

import React, { useState } from 'react';
import {
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiPlus,
  FiTrash2,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiMoreVertical,
  FiChevronRight,
  FiMonitor,
  FiDownload,
  FiX,
  FiCheck,
  FiRefreshCw,
  FiZap,
} from 'react-icons/fi';
import { BiPurchaseTagAlt } from 'react-icons/bi';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RiHome6Line } from 'react-icons/ri';

interface Alert {
  id: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  title: string;
  device: string;
  deviceGroup: string;
  time: string;
  status: "Open" | "Acknowledged" | "Resolved";
}

const Monitoring: React.FC = () => {
  const router = useRouter();
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>(["Critical", "High", "Low"]);

  const alerts: Alert[] = [
    { id: "1", severity: "Critical", title: "Disk Space Below 5%", device: "Server-01", deviceGroup: "Servers/Internal", time: "2 min ago", status: "Open" },
    { id: "2", severity: "High", title: "CPU Usage > 90%", device: "Workstation-11", deviceGroup: "IT", time: "15 min ago", status: "Acknowledged" },
    { id: "3", severity: "Medium", title: "Device Offline", device: "Router-02", deviceGroup: "Network", time: "1 hour ago", status: "Open" },
    { id: "4", severity: "Low", title: "New Software Installed", device: "Laptop-02", deviceGroup: "Accounting", time: "2 hours ago", status: "Resolved" },
    { id: "5", severity: "Critical", title: "Malware Detected", device: "Desktop-HR", deviceGroup: "HR", time: "3 hours ago", status: "Open" },
    { id: "6", severity: "Medium", title: "High Memory Usage", device: "DB-Server-01", deviceGroup: "Servers/DB", time: "4 hours ago", status: "Open" },
  ];

  // Filtered alerts (search + severity filters) – fixed from original
  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      searchTerm === '' ||
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.deviceGroup.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters =
      activeFilters.length === 0 || activeFilters.includes(alert.severity);

    return matchesSearch && matchesFilters;
  });

  // Stats for quick overview (unchanged data, modernized visuals)
  const stats = [
    {
      label: 'Critical',
      value: alerts.filter((a) => a.severity === 'Critical').length,
      bg: 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400',
      icon: FiAlertCircle,
    },
    {
      label: 'High',
      value: alerts.filter((a) => a.severity === 'High').length,
      bg: 'bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400',
      icon: FiAlertCircle,
    },
    {
      label: 'Medium',
      value: alerts.filter((a) => a.severity === 'Medium').length,
      bg: 'bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400',
      icon: FiAlertCircle,
    },
    {
      label: 'Open',
      value: alerts.filter((a) => a.status === 'Open').length,
      bg: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400',
      icon: FiClock,
    },
  ];

  const toggleAlertSelection = (id: string) => {
    setSelectedAlerts((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const filteredIds = filteredAlerts.map((a) => a.id);
    const allSelected =
      filteredIds.length > 0 &&
      filteredIds.every((id) => selectedAlerts.includes(id));
    setSelectedAlerts(allSelected ? [] : filteredIds);
  };

  const isAllSelected =
    filteredAlerts.length > 0 &&
    filteredAlerts.every((a) => selectedAlerts.includes(a.id));

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const removeFilter = (filter: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  const getSeverityStyles = (severity: Alert['severity']) => {
    switch (severity) {
      case 'Critical':
        return 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-950/50';
      case 'High':
        return 'text-orange-700 bg-orange-100 dark:text-orange-300 dark:bg-orange-950/50';
      case 'Medium':
        return 'text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-950/50';
      case 'Low':
        return 'text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-950/50';
      default:
        return 'text-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-gray-800';
    }
  };

  const getStatusStyles = (status: Alert['status']) => {
    switch (status) {
      case 'Open':
        return 'text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/30 dark:border-red-900';
      case 'Acknowledged':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950/30 dark:border-yellow-900';
      case 'Resolved':
        return 'text-green-700 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950/30 dark:border-green-900';
    }
  };

  const getStatusIcon = (status: Alert['status']) => {
    switch (status) {
      case 'Open':
        return <FiAlertCircle className="text-red-500 dark:text-red-400" size={16} />;
      case 'Acknowledged':
        return <FiClock className="text-yellow-500 dark:text-yellow-400" size={16} />;
      case 'Resolved':
        return <FiCheckCircle className="text-green-500 dark:text-green-400" size={16} />;
    }
  };

  return (
    <div className="w-full max-w-8xl mx-auto">
      <div className="flex flex-col p-4 md:p-6 bg-gray-50/30 dark:bg-gray-950 transition-colors duration-200">

        {/* Breadcrumb – unchanged */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Link href="/dashboard" className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors'>
            <RiHome6Line size={18} />
          </Link>
          <FiChevronRight size={14} />
          <span className="text-gray-800 dark:text-gray-200 font-medium">Monitoring & Alerts</span>
        </div>

        {/* Header – modernized spacing and icon scale */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
              <div className="p-2.5 bg-blue-100 dark:bg-blue-950/50 rounded-2xl">
                <FiMonitor size={32} className='text-blue-600 dark:text-blue-400' />
              </div>
              Monitoring & Alerts
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base">
              Real-time system health • Instant incident response • Zero alert fatigue
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-5 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-500/10 text-sm font-medium transition-all flex items-center gap-2 shadow-sm">
              <FiRefreshCw size={18} />
              <span className="hidden sm:inline">Refresh now</span>
            </button>
            <button className="px-5 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 text-sm font-semibold transition-all shadow-sm flex items-center gap-2">
              <FiPlus size={18} />
              Create policy
            </button>
          </div>
        </div>

        {/* Stats Cards – enhanced with per-stat icons and smoother hover */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map(({ bg, label, value, icon: Icon }) => (
            <div
              key={label}
              className="group bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-4 flex items-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/10 gap-5"
            >
              <div className={cn("p-4 rounded-2xl flex-shrink-0", bg)}>
                <Icon size={28} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide">{label}</p>
                <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-1 tabular-nums">{value}</h3>
              </div>
              <div className="text-xs font-medium text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors">now</div>
            </div>
          ))}
        </div>

        {/* Main Content Card – cleaner, more open layout */}
        <div className="flex-1 pb-2">
          <div className="bg-white min-h-full dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm flex-1 flex flex-col max-h-[80vh] transition-colors duration-200 overflow-hidden">

            {/* Search & Filter Bar – streamlined, removed unused toggle */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                  <input
                    type="text"
                    placeholder="Search alerts, devices, or groups..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-5 py-3.5 border border-gray-200 dark:border-gray-700 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm transition-all"
                  />
                </div>

                <button className="px-6 py-3.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-3xl hover:bg-gray-500/10 transition-all text-gray-700 dark:text-gray-300 font-medium text-sm flex items-center gap-2 shadow-sm">
                  <FiDownload size={18} />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>
              </div>

              {/* Modern quick severity filter pills (replaces old filter button + incomplete panel) */}
              <div className="flex flex-col md:flex-row md:items-center justify-between py-3">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.5px] text-gray-500 dark:text-gray-400 whitespace-nowrap">Severity</span>
                  {(['Critical', 'High', 'Medium', 'Low'] as const).map((sev) => {
                    const count = alerts.filter((a) => a.severity === sev).length;
                    const isActive = activeFilters.includes(sev);
                    return (
                      <button
                        key={sev}
                        onClick={() => toggleFilter(sev)}
                        className={cn(
                          "inline-flex items-center px-5 h-9 text-xs font-semibold rounded-3xl border transition-all active:scale-95",
                          isActive
                            ? getSeverityStyles(sev)
                            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                        )}
                      >
                        {sev}
                        <span className="ml-2 text-[10px] font-normal opacity-70">({count})</span>
                      </button>
                    );
                  })}
                  {activeFilters.length > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="ml-auto text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                    >
                      <FiX size={14} />
                      Clear filters
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 px-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all cursor-pointer"
                    />
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {filteredAlerts.length} alert{filteredAlerts.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="text-sm text-gray-400 dark:text-gray-500 font-medium">Last updated just now</div>
                </div>
              </div>
            </div>

            {/* Bulk Actions – unchanged logic, modern styling */}
            {selectedAlerts.length > 0 && (
              <div className="px-4 py-2 bg-blue-50/80 dark:bg-blue-950/30 border-b border-blue-200 dark:border-blue-900 flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                    {selectedAlerts.length} selected
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="px-5 py-2 flex items-center gap-2 text-sm font-medium bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 text-gray-700 dark:text-gray-300 rounded-2xl hover:shadow transition-all">
                      <FiCheck size={16} />
                      Acknowledge
                    </button>
                    <button className="px-5 py-2 flex items-center gap-2 text-sm font-medium bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 text-gray-700 dark:text-gray-300 rounded-2xl hover:shadow transition-all">
                      <BiPurchaseTagAlt size={16} />
                      Add tag
                    </button>
                    <button className="px-5 py-2 flex items-center gap-2 text-sm font-medium bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-2xl hover:shadow transition-all">
                      <FiTrash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAlerts([])}
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Clear selection
                </button>
              </div>
            )}

            {/* Alert List – redesigned as modern scannable cards (biggest visual upgrade) */}
            <div className="flex-1 flex-wrap overflow-x-auto p-4 space-y-3">
              {filteredAlerts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mb-6">
                    <FiAlertCircle size={42} className="text-gray-300 dark:text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">No matching alerts</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xs">
                    We couldn’t find any alerts matching your search or filters. Try broadening your criteria.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-8 px-6 py-3 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-950/30"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <>
                  {/* Modern alert cards */}
                  {filteredAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="w-fit group flex items-center gap-4 md:gap-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 rounded-3xl px-5 md:px-6 py-4 shadow-sm hover:shadow transition-all duration-200 cursor-pointer min-w-0"
                      onClick={() => router.push('/dashboard/monitoring/report-213')}
                    >
                      {/* Checkbox */}
                      <div className="flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={selectedAlerts.includes(alert.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleAlertSelection(alert.id);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        />
                      </div>

                      {/* Severity */}
                      <div className="flex-shrink-0 w-[78px] md:w-24">
                        <span
                          className={cn(
                            "inline-flex items-center justify-center px-3 md:px-4 h-8 text-xs font-bold rounded-3xl whitespace-nowrap",
                            getSeverityStyles(alert.severity)
                          )}
                        >
                          {alert.severity}
                        </span>
                      </div>

                      {/* Alert Title - Flexible but with proper minimum space */}
                      <div className="flex-1 min-w-[180px] pr-2">
                        <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                          {alert.title}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                          Triggered by monitoring policy
                        </p>
                      </div>

                      {/* Device - Fixed minimum width, doesn't shrink too much */}
                      <div className="flex-shrink-0 w-40 md:w-44">
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-0.5">DEVICE</p>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                          {alert.device}
                        </p>
                      </div>

                      {/* Device Group - Fixed minimum width */}
                      <div className="flex-shrink-0 w-36 md:w-40">
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-0.5">GROUP</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {alert.deviceGroup}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="flex-shrink-0 w-32 md:w-36">
                        <div
                          className={cn(
                            "inline-flex items-center gap-1.5 px-3 h-8 text-xs font-medium border rounded-3xl whitespace-nowrap",
                            getStatusStyles(alert.status)
                          )}
                        >
                          {getStatusIcon(alert.status)}
                          <span>{alert.status}</span>
                        </div>
                      </div>

                      {/* Time */}
                      <div className="flex-shrink-0 w-20 text-right text-xs text-gray-400 dark:text-gray-500">
                        {alert.time}
                      </div>

                      {/* More Menu */}
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <FiMoreVertical size={20} />
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Pagination – cleaned up */}
            <div className="px-6 py-5 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/70 rounded-b-3xl flex items-center justify-between text-sm flex-shrink-0">
              <div className="text-gray-500 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-gray-100">1</span>–<span className="font-semibold text-gray-900 dark:text-gray-100">{filteredAlerts.length}</span> of <span className="font-semibold text-gray-900 dark:text-gray-100">{filteredAlerts.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-6 py-2 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 text-gray-400 hover:bg-gray-500/10 transition-colors" disabled>
                  Previous
                </button>
                <button className="w-9 h-9 bg-blue-600 text-white rounded-2xl text-sm font-semibold flex items-center justify-center">1</button>
                <button className="px-6 py-2 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-500/10 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
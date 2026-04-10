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
  FiMonitor
} from 'react-icons/fi';
import { BiPurchaseTagAlt } from 'react-icons/bi';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RiHome6Line } from 'react-icons/ri';
import { CiMonitor } from 'react-icons/ci';

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
  const [activeFilter, setActiveFilter] = useState('Critical');

  const alerts: Alert[] = [
    { id: "1", severity: "Critical", title: "Disk Space Below 5%", device: "Server-01", deviceGroup: "Servers/Internal", time: "2 min ago", status: "Open" },
    { id: "2", severity: "High", title: "CPU Usage > 90%", device: "Workstation-11", deviceGroup: "IT", time: "15 min ago", status: "Acknowledged" },
    { id: "3", severity: "Medium", title: "Device Offline", device: "Router-02", deviceGroup: "Network", time: "1 hour ago", status: "Open" },
    { id: "4", severity: "Low", title: "New Software Installed", device: "Laptop-02", deviceGroup: "Accounting", time: "2 hours ago", status: "Resolved" },
    { id: "5", severity: "Critical", title: "Malware Detected", device: "Desktop-HR", deviceGroup: "HR", time: "3 hours ago", status: "Open" },
    { id: "6", severity: "Medium", title: "High Memory Usage", device: "DB-Server-01", deviceGroup: "Servers/DB", time: "4 hours ago", status: "Open" },
  ];

  const toggleAlertSelection = (id: string) => {
    setSelectedAlerts(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const getSeverityStyles = (severity: Alert['severity']) => {
    switch (severity) {
      case 'Critical': return 'text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/30 dark:border-red-900';
      case 'High': return 'text-orange-700 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950/30 dark:border-orange-900';
      case 'Medium': return 'text-yellow-700 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950/30 dark:border-yellow-900';
      case 'Low': return 'text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/30 dark:border-blue-900';
      default: return 'text-gray-700 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-700';
    }
  };

  const getStatusIcon = (status: Alert['status']) => {
    switch (status) {
      case 'Open': return <FiAlertCircle className="text-red-500" size={16} />;
      case 'Acknowledged': return <FiClock className="text-yellow-500" size={16} />;
      case 'Resolved': return <FiCheckCircle className="text-green-500" size={16} />;
    }
  };

  return (
    <div className="w-full h-full max-w-8xl mx-auto">
      <div className="flex flex-col h-full p-4 md:p-6 bg-gray-50/30 dark:bg-gray-950 transition-colors duration-200">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Link href="/dashboard" className='text-blue-500 hover:text-blue-600'>
            <RiHome6Line size={18} />
          </Link>
          <FiChevronRight size={14} />
          <span className="text-gray-800 dark:text-gray-200 font-bold">Monitoring</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 mt-3">
          <div className="">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <FiMonitor size={26} className='text-blue-500' />
              Monitoring & Alerts
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Manage scripts, patch policies, and schedule background jobs across your fleet.</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors shadow-sm">
            Create Policy
          </button>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm flex-1 flex flex-col min-h-0 transition-colors duration-200">

          {/* Search row */}
          <div className="flex flex-row sm:items-center gap-3 p-4 md:p-5 flex-shrink-0">
            <div className="flex-1 relative w-full">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search alerts"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex-shrink-0 text-gray-700 dark:text-gray-300">
              <FiFilter size={18} className="text-gray-500" />
              <span className="text-sm font-medium">Filters</span>
            </button>
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap items-center justify-between gap-3 py-3 px-4 md:px-5 bg-gray-50/50 dark:bg-gray-800/50 border-y border-gray-100 dark:border-gray-800 flex-shrink-0">
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Applied Filters:</span>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-md text-sm shadow-sm">
                  <span className="text-gray-600 dark:text-gray-400">Severity: <span className="font-medium text-gray-900 dark:text-gray-100">Critical</span></span>
                  <button onClick={() => setActiveFilter('')} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">&times;</button>
                </div>
              </div>
            </div>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">Clear filters</button>
          </div>

          {/* Bulk actions row */}
          <div className="px-4 md:px-5 py-3 border-b border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-gray-900 flex-shrink-0">
            <div className="flex flex-wrap items-center gap-2">
              <button className="px-3 py-1.5 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md transition-colors shadow-sm">
                <span>Bulk Actions</span>
                <FiChevronDown size={14} className="text-gray-500" />
              </button>
              <button className="p-1.5 flex items-center justify-center bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-sm" title="Manage Tags">
                <BiPurchaseTagAlt size={16} />
              </button>
              <button className="p-1.5 flex items-center justify-center bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-sm" title="Acknowledge Selected">
                <FiClock size={16} />
              </button>
              <button className="p-1.5 flex items-center justify-center bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-gray-500 dark:text-gray-400 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-sm" title="Delete Selected">
                <FiTrash2 size={16} />
              </button>
            </div>
            <button className="px-3 py-1.5 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
              Export to CSV
            </button>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto min-h-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
                  <tr>
                    <th className="w-12 px-5 py-3.5">
                      <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer" />
                    </th>
                    {['Severity', 'Alert', 'Device', 'Device Group', 'Status', 'Time'].map(h => (
                      <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                    <th className="w-12 px-5 py-3.5 text-center"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                  {alerts.map((alert) => (
                    <tr key={alert.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group cursor-pointer" onClick={() => router.push('/dashboard/monitoring/report-213')}>
                      <td className="px-5 py-4">
                        <input type="checkbox" checked={selectedAlerts.includes(alert.id)}
                          onChange={(e) => { e.stopPropagation(); toggleAlertSelection(alert.id); }}
                          onClick={(e) => e.stopPropagation()}
                          className="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-blue-600 focus:ring-blue-500 transition-all"
                        />
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border", getSeverityStyles(alert.severity))}>
                          {alert.severity}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer">{alert.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 max-w-xs truncate">Triggered by monitoring policy</div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer hover:underline">{alert.device}</span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{alert.deviceGroup}</td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {getStatusIcon(alert.status)}
                          <span className={cn("text-sm font-medium", alert.status === 'Open' ? 'text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400')}>
                            {alert.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{alert.time}</td>
                      <td className="px-5 py-4 whitespace-nowrap text-right">
                        <button onClick={(e) => e.stopPropagation()} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors opacity-0 group-hover:opacity-100">
                          <FiMoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/80 rounded-b-lg flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
            <span className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">Showing <span className="font-medium text-gray-900 dark:text-gray-100">1</span> to <span className="font-medium text-gray-900 dark:text-gray-100">6</span> of <span className="font-medium text-gray-900 dark:text-gray-100">6</span> results</span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
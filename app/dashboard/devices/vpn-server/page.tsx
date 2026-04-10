'use client';

import React, { useState } from 'react';
import {
  FiChevronRight,
  FiCpu,
  FiHardDrive,
  FiClock,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
  FiInfo,
  FiServer,
  FiMonitor,
  FiActivity,
} from 'react-icons/fi';
import { BsMemory } from 'react-icons/bs';
import { MdSecurity } from 'react-icons/md';
import { RiHome6Line } from 'react-icons/ri';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import Link from 'next/link';

const DeviceOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const cpuData = Array.from({ length: 30 }).map((_, i) => ({ time: i, value: +(40 + Math.random() * 20).toFixed(1) }));
  const memoryData = Array.from({ length: 30 }).map((_, i) => ({ time: i, value: +(8 + Math.random() * 2).toFixed(1) }));
  const uptimeData = Array.from({ length: 30 }).map((_, i) => ({ time: i, value: 100 }));

  const tabs = ['Overview', 'System', 'Manage', 'Applications', 'Updates', 'Alerts', 'Automations', 'Monitors', 'Policies', 'Permissions'];

  const securityChecks = [
    { name: 'Disk encryption', status: 'inactive', label: 'Primary disk not encrypted', icon: FiXCircle },
    { name: 'Firewall', status: 'active', label: 'Active (ufw)', icon: FiCheckCircle },
    { name: 'OS security', status: 'active', label: 'Active (apparmor)', icon: FiCheckCircle },
    { name: 'Patch compliance', status: 'uptodate', label: 'Up to date', icon: FiCheckCircle },
    { name: 'OS version', status: 'bookworm', label: '12 (bookworm)', icon: FiCheckCircle },
  ];

  const systemInfo = [
    { label: 'Hostname', value: 'VPN-Server' },
    { label: 'Manufacturer', value: 'QEMU' },
    { label: 'Model', value: 'Standard PC (Q35 + ICH9, 2009)' },
    { label: 'Serial number', value: 'Not specified' },
    { label: 'BIOS version', value: 'Not specified' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'uptodate': case 'bookworm': return 'text-teal-600 dark:text-teal-400';
      case 'inactive': return 'text-gray-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'inactive') return FiXCircle;
    return FiCheckCircle;
  };

  const cardClass = "bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex-1 transition-colors duration-200">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-900 px-6 py-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/dashboard" className='text-blue-500 hover:text-blue-600'>
            <RiHome6Line size={18} />
          </Link>
          <FiChevronRight size={14} />
          <Link href="/dashboard/devices" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 font-bold cursor-pointer">
            Devices
          </Link>
          <FiChevronRight size={14} />
          <span className="text-gray-800 dark:text-gray-200 font-bold">VPN Server</span>
        </div>
      </div>

      {/* Device Header */}
      <div className="bg-white dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <FiServer size={24} />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">VPN Server</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-1 text-xs rounded border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 font-medium">SERVER</span>
              <span className="px-2 py-1 text-xs rounded border border-yellow-300 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/30 font-medium">UBR</span>
              <span className="inline-flex items-center gap-1 text-sm text-green-600 ml-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6">
        <div className="w-[80vw] flex gap-3 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap hover:bg-gray-100 dark:hover:bg-gray-800 ${activeTab === tab ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto p-5 md:px-6">
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            <div className="flex flex-col gap-3">
              <div className={cardClass}>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Security Score</h2>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-gray-100">95</span>
                      <span className="text-2xl text-gray-400 dark:text-gray-500">/100</span>
                    </div>
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 dark:bg-green-950/50 dark:text-green-400 rounded">Low risk</span>
                  </div>
                  <div className="relative w-32 h-32">
                    <svg className="transform -rotate-90 w-32 h-32">
                      <circle cx="64" cy="64" r="56" stroke="#e5e7eb71" strokeWidth="12" fill="none" />
                      <circle cx="64" cy="64" r="56" stroke="#10B981" strokeWidth="12" fill="none" strokeDasharray={`${2 * Math.PI * 56 * 0.95} ${2 * Math.PI * 56}`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MdSecurity className="text-gray-900 dark:text-gray-100" size={32} />
                    </div>
                    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
                      <span className="text-sm font-semibold text-green-600">95</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {securityChecks.map((check) => {
                    const StatusIcon = getStatusIcon(check.status);
                    return (
                      <div key={check.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <StatusIcon className={getStatusColor(check.status)} size={16} />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{check.name}</span>
                          <FiInfo className="text-gray-400" size={14} />
                        </div>
                        <span className={`text-sm font-medium ${getStatusColor(check.status)}`}>{check.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={cardClass}>
                <div className="flex items-center gap-2 mb-6">
                  <FiHardDrive className="text-blue-600" size={20} />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Disk</h2>
                </div>
                <div className="space-y-4">
                  {[{ mount: '/', free: '11.91 GB free of 14.23 GB', pct: '86%' }, { mount: '/boot', free: '340.27 MB free of 455.22 MB', pct: '50%' }].map(d => (
                    <div key={d.mount}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{d.mount}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{d.free}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: d.pct }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { label: 'CPU', icon: FiCpu, value: '0.69%', sub: '8 Cores @ 2.40 GHz', data: cpuData, gradId: 'colorCpu' },
                { label: 'Memory', icon: BsMemory, value: '9.77%', sub: '400.18 MB of 4 GB', data: memoryData, gradId: 'colorMem' },
              ].map(({ label, icon: Icon, value, sub, data, gradId }) => (
                <div key={label} className={cardClass}>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className="text-blue-600" size={20} />
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{label}</h2>
                  </div>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{sub}</div>
                  </div>
                  <div className="h-24">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                      <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                        <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill={`url(#${gradId})`} activeDot={{ r: 4, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <div className={cardClass}>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">System</h2>
                <div className="space-y-3">
                  {systemInfo.map((info) => (
                    <div key={info.label} className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{info.label}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{info.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={cardClass}>
                <div className="flex items-center gap-2 mb-4">
                  <FiClock className="text-blue-600" size={20} />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Uptime</h2>
                </div>
                <div className="mb-4">
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">100.0%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">14 mo average ping</div>
                </div>
                <div className="h-24">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <AreaChart data={uptimeData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorUptime" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                      <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorUptime)" activeDot={{ r: 4, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className={cardClass}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">198.190.255.70</div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <span>📍</span>
                      <span>Asheville, NC, US</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-3xl transition-colors">
                    <FiInfo className="text-blue-600" size={20} />
                  </button>
                </div>
              </div>

              <div className={cardClass}>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Active alerts</h2>
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <FiAlertCircle className="mx-auto mb-2" size={32} />
                  <p className="text-sm">No active alerts</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'System' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-start">
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-900 text-sm shadow-sm rounded-3xl border border-gray-200 dark:border-gray-800 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <FiMonitor className="text-blue-600" size={18} />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Operating system</h3>
                </div>
                <div className="space-y-3">
                  {[['Name', 'Windows Server 2019'], ['Version', '10.0.17763'], ['OS architecture', '64-bit'], ['Product type', 'Server'], ['License key', 'MBQM2-DYBBK-JR3RV-29DTR-2KFBP'], ['Serial number', 'VMware-42 29 64 22 cc 26 0e 29-25...'], ['Install date', 'Fri, Apr 02, 2021 6:56 PM'], ['Last boot-up', 'Thu, Apr 13, 2023 1:18 AM'], ['System uptime', '14 days 14 hours 47 minutes']].map(([l, v]) => (
                    <div key={l} className="grid grid-cols-3"><span className="text-gray-500 dark:text-gray-400 font-medium">{l}</span><span className="col-span-2 text-gray-900 dark:text-gray-100 break-all">{v}</span></div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 text-sm shadow-sm rounded-3xl border border-gray-200 dark:border-gray-800 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <FiCpu className="text-blue-600" size={18} />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Processors</h3>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/4 flex flex-row md:flex-col gap-1 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800 pb-2 md:pb-0 md:pr-2 overflow-x-auto">
                    {['CPU 1', 'CPU 2', 'CPU 3'].map((c, i) => (
                      <button key={c} className={`text-left py-1.5 px-3 ${i === 0 ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'} rounded whitespace-nowrap`}>{c}</button>
                    ))}
                  </div>
                  <div className="w-full md:w-3/4 space-y-3">
                    {[['Model', 'Intel(R) Xeon(R) CPU E5-2697 v2 @ 2.70GHz'], ['Processor ID', 'CPU0'], ['CPU speed', '2.70 GHz'], ['CPU cores', '2']].map(([l, v]) => (
                      <div key={l} className="grid grid-cols-3"><span className="text-gray-500 dark:text-gray-400 font-medium">{l}</span><span className="col-span-2 text-gray-900 dark:text-gray-100">{v}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-900 text-sm shadow-sm rounded-3xl border border-gray-200 dark:border-gray-800 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <FiHardDrive className="text-blue-600" size={18} />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Physical drives</h3>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/4 flex flex-row md:flex-col gap-1 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800 pb-2 md:pb-0 md:pr-2 overflow-x-auto">
                    {['Disk 1', 'Disk 2'].map((d, i) => (
                      <button key={d} className={`text-left py-1.5 px-3 ${i === 0 ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'} rounded whitespace-nowrap`}>{d}</button>
                    ))}
                  </div>
                  <div className="w-full md:w-3/4 space-y-3">
                    {[['Type', 'SCSI'], ['Model number', 'VMware Virtual NVMe Disk'], ['Serial number', 'VMware NVMe_0000'], ['Capacity', '39.99 GB']].map(([l, v]) => (
                      <div key={l} className="grid grid-cols-3"><span className="text-gray-500 dark:text-gray-400 font-medium">{l}</span><span className="col-span-2 text-gray-900 dark:text-gray-100">{v}</span></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 text-sm shadow-sm rounded-3xl border border-gray-200 dark:border-gray-800 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <FiActivity className="text-blue-600" size={18} />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Network interfaces</h3>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/4 flex flex-row md:flex-col gap-1 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800 pb-2 md:pb-0 md:pr-2 overflow-x-auto">
                    {['Interface 7', 'Loopback'].map((n, i) => (
                      <button key={n} className={`text-left py-1.5 px-3 ${i === 0 ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'} rounded whitespace-nowrap`}>{n}</button>
                    ))}
                  </div>
                  <div className="w-full md:w-3/4 space-y-3">
                    {[['Name', 'Intel(R) 82574L Gigabit Network Connection'], ['Interface', '7'], ['MAC address', '00:50:56:a9:17:08'], ['IP address', '10.5.23.100, fe80::...'], ['Gateway', '10.5.23.1']].map(([l, v]) => (
                      <div key={l} className="grid grid-cols-3"><span className="text-gray-500 dark:text-gray-400 font-medium">{l}</span><span className="col-span-2 text-gray-900 dark:text-gray-100">{v}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-900 text-sm shadow-sm rounded-3xl border border-gray-200 dark:border-gray-800 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <FiServer className="text-blue-600" size={18} />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">System</h3>
                </div>
                <div className="space-y-3">
                  {[['Manufacturer', 'VMware, Inc.'], ['Model', 'VMware7,1'], ['Architecture', 'amd64'], ['Installed memory', '16 GB'], ['Memory slots', '1 used / 1 total'], ['CPUs', '3'], ['CPU cores', '6'], ['Serial number', 'VMware-42 29 64 22 cc 26 0e 29...']].map(([l, v]) => (
                    <div key={l} className="grid grid-cols-3"><span className="text-gray-500 dark:text-gray-400 font-medium">{l}</span><span className="col-span-2 text-gray-900 dark:text-gray-100 break-all">{v}</span></div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 text-sm shadow-sm rounded-3xl border border-gray-200 dark:border-gray-800 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <FiMonitor className="text-blue-600" size={18} />
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Motherboard</h3>
                </div>
                <div className="space-y-3">
                  {[['Manufacturer', '--'], ['Model', '--'], ['Version', 'None'], ['Serial number', 'None'], ['BIOS version', 'VMW71.00V.17369862.B64.2012240522'], ['Release date', 'December 23, 2020']].map(([l, v]) => (
                    <div key={l} className="grid grid-cols-3"><span className="text-gray-500 dark:text-gray-400 font-medium">{l}</span><span className="col-span-2 text-gray-900 dark:text-gray-100 break-all">{v}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'Manage' && <div></div>}
        {activeTab === 'Applications' && <div></div>}
        {activeTab === 'Updates' && <div></div>}
        {activeTab === 'Alerts' && <div></div>}
        {activeTab === 'Automations' && <div></div>}
        {activeTab === 'Monitors' && <div></div>}
        {activeTab === 'Policies' && <div></div>}
        {activeTab === 'Permissions' && <div></div>}
      </div>
    </div>
  );
};

export default DeviceOverview;
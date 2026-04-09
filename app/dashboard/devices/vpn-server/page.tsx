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

  const tabs = [
    'Overview',
    'System',
    'Manage',
    'Applications',
    'Updates',
    'Alerts',
    'Automations',
    'Monitors',
    'Policies',
    'Permissions',
  ];

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
      case 'active':
      case 'uptodate':
      case 'bookworm':
        return 'text-teal-600';
      case 'inactive':
        return 'text-gray-400';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'inactive') return FiXCircle;
    return FiCheckCircle;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex-1">
      {/* Breadcrumb */}
      <div className="bg-white px-6 py-3">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/dashboard" className='text-blue-500 hover:text-blue-600'>
            <RiHome6Line size={18} />
          </Link>
          <FiChevronRight size={14} />
          <Link href="/dashboard/devices" className="text-blue-500 hover:text-blue-600 font-bold cursor-pointer">
            Devices
          </Link>
          <FiChevronRight size={14} />
          <span className="text-gray-800 font-bold">VPN Server</span>
        </div>
      </div>

      {/* Device Header */}
      <div className="bg-white px-6 py-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <FiServer size={24} />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900">VPN Server</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-1 text-xs rounded border border-red-300 text-red-600 bg-red-50 font-medium">
                SERVER
              </span>
              <span className="px-2 py-1 text-xs rounded border border-yellow-300 text-yellow-700 bg-yellow-50 font-medium">
                UBR
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-green-600 ml-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white border-b border-gray-200 px-6">
        <div className="w-[80vw] flex gap-3 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap hover:bg-gray-100 ${activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
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
              {/* Security Score Card */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Security Score</h2>

                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl md:text-7xl font-bold text-gray-900">95</span>
                      <span className="text-2xl text-gray-400">/100</span>
                    </div>
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded">
                      Low risk
                    </span>
                  </div>

                  <div className="relative w-32 h-32">
                    <svg className="transform -rotate-90 w-32 h-32">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#E5E7EB"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#10B981"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56 * 0.95} ${2 * Math.PI * 56}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MdSecurity className="text-gray-900" size={32} />
                    </div>
                    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 bg-white px-2 py-1 rounded border border-gray-200">
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
                          <StatusIcon
                            className={getStatusColor(check.status)}
                            size={16}
                          />
                          <span className="text-sm text-gray-700">{check.name}</span>
                          <FiInfo className="text-gray-400" size={14} />
                        </div>
                        <span className={`text-sm font-medium ${getStatusColor(check.status)}`}>
                          {check.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Disk Card */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                <div className="flex items-center gap-2 mb-6">
                  <FiHardDrive className="text-blue-600" size={20} />
                  <h2 className="text-lg font-semibold text-gray-900">Disk</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">/</span>
                      <span className="text-sm text-gray-600">11.91 GB free of 14.23 GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '86%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">/boot</span>
                      <span className="text-sm text-gray-600">340.27 MB free of 455.22 MB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {/* CPU Card */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <FiCpu className="text-blue-600" size={20} />
                  <h2 className="text-lg font-semibold text-gray-900">CPU</h2>
                </div>

                <div className="mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-1">0.69%</div>
                  <div className="text-sm text-gray-600">8 Cores @ 2.40 GHz</div>
                </div>

                <div className="h-24">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <AreaChart data={cpuData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                      <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorCpu)" activeDot={{ r: 4, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Memory Card */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <BsMemory className="text-blue-600" size={20} />
                  <h2 className="text-lg font-semibold text-gray-900">Memory</h2>
                </div>

                <div className="mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-1">9.77%</div>
                  <div className="text-sm text-gray-600">400.18 MB of 4 GB</div>
                </div>

                <div className="h-24">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <AreaChart data={memoryData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                      <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorMem)" activeDot={{ r: 4, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {/* System Info Card */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">System</h2>

                <div className="space-y-3">
                  {systemInfo.map((info) => (
                    <div key={info.label} className="flex justify-between">
                      <span className="text-sm text-gray-600">{info.label}</span>
                      <span className="text-sm font-medium text-gray-900">{info.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Uptime Card */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <FiClock className="text-blue-600" size={20} />
                  <h2 className="text-lg font-semibold text-gray-900">Uptime</h2>
                </div>

                <div className="mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-1">100.0%</div>
                  <div className="text-sm text-gray-600">14 mo average ping</div>
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

              {/* IP Address Card */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">198.190.255.70</div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <span>📍</span>
                      <span>Asheville, NC, US</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-3xl">
                    <FiInfo className="text-blue-600" size={20} />
                  </button>
                </div>
              </div>


              {/* Active Alerts Card */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Active alerts</h2>

                <div className="text-center py-8 text-gray-500">
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
              {/* Operating System */}
              <div className="bg-white text-sm shadow-sm rounded-3xl border border-gray-200 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <FiMonitor className="text-blue-600" size={18} />
                  <h3 className="font-semibold text-gray-900">Operating system</h3>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Name</span><span className="col-span-2 text-gray-900">Windows Server 2019</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Version</span><span className="col-span-2 text-gray-900">10.0.17763</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">OS architecture</span><span className="col-span-2 text-gray-900">64-bit</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Product type</span><span className="col-span-2 text-gray-900">Server</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">License key</span><span className="col-span-2 text-gray-900 break-all">MBQM2-DYBBK-JR3RV-29DTR-2KFBP</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Serial number</span><span className="col-span-2 text-gray-900 break-all">VMware-42 29 64 22 cc 26 0e 29-25...</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Install date</span><span className="col-span-2 text-gray-900">Fri, Apr 02, 2021 6:56 PM</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Last boot-up</span><span className="col-span-2 text-gray-900">Thu, Apr 13, 2023 1:18 AM</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">System uptime</span><span className="col-span-2 text-gray-900">14 days 14 hours 47 minutes</span></div>
                </div>
              </div>

              {/* Processors */}
              <div className="bg-white text-sm shadow-sm rounded-3xl border border-gray-200 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <FiCpu className="text-blue-600" size={18} />
                  <h3 className="font-semibold text-gray-900">Processors</h3>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/4 flex flex-row md:flex-col gap-1 border-b md:border-b-0 md:border-r border-gray-100 pb-2 md:pb-0 md:pr-2 overflow-x-auto">
                    <button className="text-left py-1.5 px-3 bg-blue-50 text-blue-600 font-medium rounded whitespace-nowrap">CPU 1</button>
                    <button className="text-left py-1.5 px-3 text-gray-600 hover:bg-gray-50 rounded whitespace-nowrap">CPU 2</button>
                    <button className="text-left py-1.5 px-3 text-gray-600 hover:bg-gray-50 rounded whitespace-nowrap">CPU 3</button>
                  </div>
                  <div className="w-full md:w-3/4 space-y-3">
                    <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Model</span><span className="col-span-2 text-gray-900">Intel(R) Xeon(R) CPU E5-2697 v2 @ 2.70GHz</span></div>
                    <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Processor ID</span><span className="col-span-2 text-gray-900">CPU0</span></div>
                    <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">CPU speed</span><span className="col-span-2 text-gray-900">2.70 GHz</span></div>
                    <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">CPU cores</span><span className="col-span-2 text-gray-900">2</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {/* Physical Drives */}
              <div className="bg-white text-sm shadow-sm rounded-3xl border border-gray-200 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <FiHardDrive className="text-blue-600" size={18} />
                  <h3 className="font-semibold text-gray-900">Physical drives</h3>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/4 flex flex-row md:flex-col gap-1 border-b md:border-b-0 md:border-r border-gray-100 pb-2 md:pb-0 md:pr-2 overflow-x-auto">
                    <button className="text-left py-1.5 px-3 bg-blue-50 text-blue-600 font-medium rounded whitespace-nowrap">Disk 1</button>
                    <button className="text-left py-1.5 px-3 text-gray-600 hover:bg-gray-50 rounded whitespace-nowrap">Disk 2</button>
                  </div>
                  <div className="w-full md:w-3/4 space-y-3">
                    <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Type</span><span className="col-span-2 text-gray-900">SCSI</span></div>
                    <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Model number</span><span className="col-span-2 text-gray-900">VMware Virtual NVMe Disk</span></div>
                    <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Serial number</span><span className="col-span-2 text-gray-900">VMware NVMe_0000</span></div>
                    <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Capacity</span><span className="col-span-2 text-gray-900">39.99 GB</span></div>
                  </div>
                </div>
              </div>

              {/* Network Interfaces */}
              <div className="bg-white text-sm shadow-sm rounded-3xl border border-gray-200 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <FiActivity className="text-blue-600" size={18} />
                  <h3 className="font-semibold text-gray-900">Network interfaces</h3>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/4 flex flex-row md:flex-col gap-1 border-b md:border-b-0 md:border-r border-gray-100 pb-2 md:pb-0 md:pr-2 overflow-x-auto">
                    <button className="text-left py-1.5 px-3 bg-blue-50 text-blue-600 font-medium rounded whitespace-nowrap">Interface 7</button>
                    <button className="text-left py-1.5 px-3 text-gray-600 hover:bg-gray-50 rounded whitespace-nowrap">Loopback</button>
                  </div>
                  <div className="w-full md:w-3/4 space-y-3">
                    <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Name</span><span className="col-span-2 text-gray-900">Intel(R) 82574L Gigabit Network Connection</span></div>
                    <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Interface</span><span className="col-span-2 text-gray-900">7</span></div>
                    <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">MAC address</span><span className="col-span-2 text-gray-900">00:50:56:a9:17:08</span></div>
                    <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">IP address</span><span className="col-span-2 text-gray-900">10.5.23.100, fe80::...</span></div>
                    <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Gateway</span><span className="col-span-2 text-gray-900">10.5.23.1</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {/* System */}
              <div className="bg-white text-sm shadow-sm rounded-3xl border border-gray-200 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <FiServer className="text-blue-600" size={18} />
                  <h3 className="font-semibold text-gray-900">System</h3>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Manufacturer</span><span className="col-span-2 text-gray-900">VMware, Inc.</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Model</span><span className="col-span-2 text-gray-900">VMware7,1</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Architecture</span><span className="col-span-2 text-gray-900">amd64</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Installed memory</span><span className="col-span-2 text-gray-900">16 GB</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Memory slots</span><span className="col-span-2 text-gray-900">1 used / 1 total</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">CPUs</span><span className="col-span-2 text-gray-900">3</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">CPU cores</span><span className="col-span-2 text-gray-900">6</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Serial number</span><span className="col-span-2 text-gray-900 break-all">VMware-42 29 64 22 cc 26 0e 29...</span></div>
                </div>
              </div>

              {/* Motherboard */}
              <div className="bg-white text-sm shadow-sm rounded-3xl border border-gray-200 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <FiMonitor className="text-blue-600" size={18} />
                  <h3 className="font-semibold text-gray-900">Motherboard</h3>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Manufacturer</span><span className="col-span-2 text-gray-900">--</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Model</span><span className="col-span-2 text-gray-900">--</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Version</span><span className="col-span-2 text-gray-900">None</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Serial number</span><span className="col-span-2 text-gray-900">None</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">BIOS version</span><span className="col-span-2 text-gray-900 break-all">VMW71.00V.17369862.B64.2012240522</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Release date</span><span className="col-span-2 text-gray-900">December 23, 2020</span></div>
                </div>
              </div>
            </div>

            {/* Memory */}
            <div className="bg-white text-sm shadow-sm rounded-3xl border border-gray-200 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
              <div className="flex items-center gap-2 mb-4">
                <BsMemory className="text-blue-600" size={18} />
                <h3 className="font-semibold text-gray-900">Memory</h3>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/4 flex flex-row md:flex-col gap-1 border-b md:border-b-0 md:border-r border-gray-100 pb-2 md:pb-0 md:pr-2 overflow-x-auto">
                  <button className="text-left py-1.5 px-3 bg-blue-50 text-blue-600 font-medium rounded whitespace-nowrap">DIMM 1</button>
                </div>
                <div className="w-full md:w-3/4 space-y-3">
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Location</span><span className="col-span-2 text-gray-900">RAM slot #0</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Manufacturer</span><span className="col-span-2 text-gray-900">VMware Virtual RAM</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Form factor</span><span className="col-span-2 text-gray-900">DIMM</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Type</span><span className="col-span-2 text-gray-900">DRAM</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Speed</span><span className="col-span-2 text-gray-900">--</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Capacity</span><span className="col-span-2 text-gray-900">16 GB</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Serial number</span><span className="col-span-2 text-gray-900">00000001</span></div>
                  <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Part number</span><span className="col-span-2 text-gray-900">VMW-16384MB</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'Manage' && (<div></div>)}
        {activeTab === 'Applications' && (<div></div>)}
        {activeTab === 'Updates' && (<div></div>)}
        {activeTab === 'Alerts' && (<div></div>)}
        {activeTab === 'Automations' && (<div></div>)}
        {activeTab === 'Monitors' && (<div></div>)}
        {activeTab === 'Policies' && (<div></div>)}
        {activeTab === 'Permissions' && (<div></div>)}
      </div>
    </div>
  );
};

export default DeviceOverview;
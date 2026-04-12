'use client';

import React, { useState } from 'react';
import {
  FiSearch,
  FiFilter,
  FiStar,
  FiMonitor,
  FiHardDrive,
  FiLink,
  FiAlertTriangle,
  FiX,
  FiChevronDown,
  FiPlus,
  FiTrash2,
  FiChevronRight
} from 'react-icons/fi';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { PiWindowsLogo } from 'react-icons/pi';
import { BiBell, BiPurchaseTagAlt } from 'react-icons/bi';
import { Cascadia_Code } from 'next/font/google';
import Sidebar from '@/components/devices/Sidebar'
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { RiHome6Line } from 'react-icons/ri';
import Link from 'next/link';

const miniChartData = Array.from({ length: 15 }).map((_, i) => ({ time: i, value: +(80 + Math.random() * 20).toFixed(1) }));

const codeFont = Cascadia_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

interface Device {
  id: string;
  name: string;
  icon: string;
  iconColor: string;
  status: 'Online' | 'Offline';
  deviceGroup: string;
  tags: string[];
  securityScore: number;
  reachability: number;
  responseTime: string;
  hasAlert?: boolean;
}

const Devices: React.FC = () => {
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Windows');

  const devices: Device[] = [
    { id: '1', name: 'AD Server', icon: 'server', iconColor: 'bg-gradient-to-br from-red-700 to-red-400', status: 'Online', deviceGroup: 'Servers/Internal', tags: ['SERVER', 'UBR'], securityScore: 85, reachability: 100, responseTime: '7 ms' },
    { id: '2', name: 'Application Server', icon: 'server', iconColor: 'bg-gradient-to-br from-blue-700 to-blue-400', status: 'Online', deviceGroup: 'Servers/App', tags: ['SERVER', 'UBR'], securityScore: 85, reachability: 100, responseTime: '7 ms' },
    { id: '3', name: 'Backup Server', icon: 'server', iconColor: 'bg-gradient-to-br from-green-700 to-green-400', status: 'Online', deviceGroup: 'Servers/Internal', tags: ['SERVER', 'UBR'], securityScore: 85, reachability: 100, responseTime: '8 ms' },
    { id: '4', name: 'Brenda Jefferson', icon: 'workstation', iconColor: 'bg-gradient-to-br from-pink-700 to-pink-400', status: 'Online', deviceGroup: 'Accounting', tags: ['WORKSTATION', 'UBR'], securityScore: 90, reachability: 100, responseTime: '9 ms' },
    { id: '5', name: 'Daniella Oliver', icon: 'workstation', iconColor: 'bg-gradient-to-br from-purple-700 to-purple-400', status: 'Online', deviceGroup: 'IT', tags: ['WORKSTATION'], securityScore: 95, reachability: 100, responseTime: '8 ms' },
    { id: '6', name: 'DHCP Server', icon: 'server', iconColor: 'bg-gradient-to-br from-orange-700 to-orange-400', status: 'Online', deviceGroup: 'Servers/Internal', tags: ['SERVER', 'UBR'], securityScore: 95, reachability: 100, responseTime: '7 ms' },
    { id: '7', name: 'Exchange Server', icon: 'server', iconColor: 'bg-gradient-to-br from-emerald-700 to-emerald-400', status: 'Online', deviceGroup: 'Servers/Internal', tags: ['SERVER', 'UBR'], securityScore: 95, reachability: 100, responseTime: '14 ms', hasAlert: true },
    { id: '8', name: 'File Server', icon: 'server', iconColor: 'bg-gradient-to-br from-purple-700 to-purple-400', status: 'Online', deviceGroup: 'Servers/Internal', tags: ['SERVER', 'UBR'], securityScore: 85, reachability: 100, responseTime: '9 ms' },
    { id: '9', name: 'IIS Server', icon: 'server', iconColor: 'bg-gradient-to-br from-indigo-700 to-indigo-400', status: 'Online', deviceGroup: 'Servers/Internal', tags: ['SERVER', 'UBR'], securityScore: 85, reachability: 100, responseTime: '8 ms', hasAlert: true },
  ];

  const toggleDeviceSelection = (id: string) => {
    setSelectedDevices(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const getSecurityColor = (score: number) => {
    if (score >= 90) return '#10B981';
    if (score >= 80) return '#10B981';
    if (score >= 70) return '#F59E0B';
    return '#EF4444';
  };

  const getDeviceIcon = (type: string) => {
    if (type === 'workstation') return <HiOutlineDesktopComputer size={20} />;
    return <FiHardDrive size={20} />;
  };

  const router = useRouter();

  return (
    <>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-3 md:p-5 overflow-y-auto bg-gray-50 dark:bg-black transition-colors duration-200">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Link href="/dashboard" className='text-blue-500 hover:text-blue-600'>
            <RiHome6Line size={18} />
          </Link>
          <FiChevronRight size={14} />
          <span className="text-gray-800 dark:text-gray-200 font-bold">Devices</span>
        </div>

        <div className="mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-950/50 rounded-lg">
              <FiMonitor size={28} className='text-blue-600 dark:text-blue-400' />
            </div>
            All Devices
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base">
            Connected devices and endpoints
          </p>
        </div>

        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-sm transition-colors duration-200">
          <div className="flex items-center gap-3 mb-4 p-5">
            <div className="md:max-w-1/2 flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search devices"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors">
              <FiFilter size={18} />
              <span className="text-sm font-medium">Filters</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-1 px-5">
            <div className="flex flex-col gap-1 w-64">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Platform</span>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Remove</button>
              </div>
              <div className="flex gap-1 border border-gray-200 dark:border-gray-700 p-1">
                <div className="self-start flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded text-sm">
                  <span>Windows</span>
                  <button onClick={() => setActiveFilter('')}>
                    <FiX size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex">
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 py-1 px-2 rounded-full flex items-center gap-1">
                Clear Filters
                <span className={`bg-blue-500 text-blue-100 rounded-full w-5 h-5 flex items-center justify-center text-xs ${codeFont.className}`}>
                  1
                </span>
              </button>
            </div>
          </div>

          <div className="mt-6 border-y border-gray-200 dark:border-gray-800 px-3 md:px-4 py-2 md:py-4 flex md:items-center justify-center flex-col md:flex-row gap-1">
            <div className="flex items-center gap-1">
              <button className="px-4 py-2 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 bg-gray-100 dark:bg-gray-900 rounded-lg">
                <span>Actions</span>
                <FiChevronDown size={14} />
              </button>
              <button className="p-2 flex items-center gap-1 bg-gray-100 dark:bg-gray-900 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <BiPurchaseTagAlt size={18} />
                <FiChevronDown size={14} />
              </button>
              <button className="p-2 flex items-center gap-1 bg-gray-100 dark:bg-gray-900 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <FiPlus size={18} />
              </button>
              <button className="p-2 flex items-center gap-1 bg-gray-100 dark:bg-gray-900 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <FiTrash2 size={18} />
              </button>
            </div>

            <div className="md:ml-auto">
              <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
                Export to CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
                <tr>
                  <th className="w-12 px-6 py-3">
                    <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-900" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Device</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Device group</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tags</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Security score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reachability</th>
                  <th className="w-12 px-6 py-3">
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map((bar) => (
                        <div key={bar} className={`w-1 h-6 rounded-full border ${bar < 2 ? 'border-gray-400 bg-gray-400' : 'border-gray-300 dark:border-gray-700'}`}></div>
                      ))}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {devices.map((device) => (
                  <tr key={device.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors" onClick={() => router.push("/dashboard/devices/vpn-server")}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedDevices.includes(device.id)}
                        onChange={() => toggleDeviceSelection(device.id)}
                        className="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-900"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-14 h-14 rounded-lg flex items-center justify-center text-white", device.iconColor)}>
                          {getDeviceIcon(device.icon)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{device.name}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <FiMonitor size={20} className="text-gray-400 dark:text-gray-500" />
                            <PiWindowsLogo size={20} className="text-gray-400 dark:text-gray-500" />
                            <FiLink size={20} className="text-gray-400 dark:text-gray-500" />
                            {device.hasAlert
                              ? <FiAlertTriangle size={20} className="text-yellow-500" />
                              : <BiBell size={20} className='text-gray-400 dark:text-gray-500' />
                            }
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-sm text-green-600 px-2 rounded-full bg-green-50 dark:bg-green-950/40">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        {device.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{device.deviceGroup}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {device.tags.map((tag) => (
                          <span key={tag} className={`px-2 py-1 text-xs rounded border ${tag === 'SERVER' ? 'border-red-300 text-red-600 bg-red-50 dark:bg-red-950/30 dark:border-red-900 dark:text-red-400' :
                            tag === 'WORKSTATION' ? 'border-blue-300 text-blue-600 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-900 dark:text-blue-400' :
                              'border-yellow-300 text-yellow-700 bg-yellow-50 dark:bg-yellow-950/30 dark:border-yellow-900 dark:text-yellow-400'
                            }`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4].map((bar) => (
                            <div key={bar} className="w-1 h-6 rounded-sm" style={{ backgroundColor: bar <= Math.floor(device.securityScore / 25) ? getSecurityColor(device.securityScore) : '#e5e7eb7a' }}></div>
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{device.securityScore}/100</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="w-48 h-8 rounded relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                              <AreaChart data={miniChartData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                                <defs>
                                  <linearGradient id="colorMini" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                  </linearGradient>
                                </defs>
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '10px', padding: '4px 8px' }} />
                                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={1.5} fillOpacity={1} fill="url(#colorMini)" activeDot={false} />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-600 dark:text-gray-400">{device.reachability}% Reachable</span>
                          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{device.responseTime}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="text-gray-400 dark:text-gray-500 hover:text-yellow-500 transition-colors">
                          <FiStar size={18} />
                        </button>
                        <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                          <BsThreeDotsVertical size={18} />
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
    </>
  );
};

export default Devices;
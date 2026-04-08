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
  FiFolder,
  FiDelete,
  FiTrash2
} from 'react-icons/fi';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { PiWindowsLogo } from 'react-icons/pi';
import { BiBell, BiPurchaseTagAlt, BiTag, BiTagAlt } from 'react-icons/bi';
import { Cascadia_Code } from 'next/font/google';
import Sidebar from '@/components/devices/Sidebar'
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

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
    {
      id: '1',
      name: 'AD Server',
      icon: 'server',
      iconColor: 'bg-gradient-to-br from-red-700 to-red-400',
      status: 'Online',
      deviceGroup: 'Servers/Internal',
      tags: ['SERVER', 'UBR'],
      securityScore: 85,
      reachability: 100,
      responseTime: '7 ms'
    },
    {
      id: '2',
      name: 'Application Server',
      icon: 'server',
      iconColor: 'bg-gradient-to-br from-blue-700 to-blue-400',
      status: 'Online',
      deviceGroup: 'Servers/App',
      tags: ['SERVER', 'UBR'],
      securityScore: 85,
      reachability: 100,
      responseTime: '7 ms'
    },
    {
      id: '3',
      name: 'Backup Server',
      icon: 'server',
      iconColor: 'bg-gradient-to-br from-green-700 to-green-400',
      status: 'Online',
      deviceGroup: 'Servers/Internal',
      tags: ['SERVER', 'UBR'],
      securityScore: 85,
      reachability: 100,
      responseTime: '8 ms'
    },
    {
      id: '4',
      name: 'Brenda Jefferson',
      icon: 'workstation',
      iconColor: 'bg-gradient-to-br from-pink-700 to-pink-400',
      status: 'Online',
      deviceGroup: 'Accounting',
      tags: ['WORKSTATION', 'UBR'],
      securityScore: 90,
      reachability: 100,
      responseTime: '9 ms'
    },
    {
      id: '5',
      name: 'Daniella Oliver',
      icon: 'workstation',
      iconColor: 'bg-gradient-to-br from-purple-700 to-purple-400',
      status: 'Online',
      deviceGroup: 'IT',
      tags: ['WORKSTATION'],
      securityScore: 95,
      reachability: 100,
      responseTime: '8 ms'
    },
    {
      id: '6',
      name: 'DHCP Server',
      icon: 'server',
      iconColor: 'bg-gradient-to-br from-orange-700 to-orange-400',
      status: 'Online',
      deviceGroup: 'Servers/Internal',
      tags: ['SERVER', 'UBR'],
      securityScore: 95,
      reachability: 100,
      responseTime: '7 ms'
    },
    {
      id: '7',
      name: 'Exchange Server',
      icon: 'server',
      iconColor: 'bg-gradient-to-br from-emerald-700 to-emerald-400',
      status: 'Online',
      deviceGroup: 'Servers/Internal',
      tags: ['SERVER', 'UBR'],
      securityScore: 95,
      reachability: 100,
      responseTime: '14 ms',
      hasAlert: true
    },
    {
      id: '8',
      name: 'File Server',
      icon: 'server',
      iconColor: 'bg-gradient-to-br from-purple-700 to-purple-400',
      status: 'Online',
      deviceGroup: 'Servers/Internal',
      tags: ['SERVER', 'UBR'],
      securityScore: 85,
      reachability: 100,
      responseTime: '9 ms'
    },
    {
      id: '9',
      name: 'IIS Server',
      icon: 'server',
      iconColor: 'bg-gradient-to-br from-indigo-700 to-indigo-400',
      status: 'Online',
      deviceGroup: 'Servers/Internal',
      tags: ['SERVER', 'UBR'],
      securityScore: 85,
      reachability: 100,
      responseTime: '8 ms',
      hasAlert: true
    }
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
      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">All Devices</h1>

        <div className="bg-white border border-gray-200 border rounded-sm">
          <div className="flex items-center gap-3 mb-4 p-5">
            <div className="md:max-w-1/2 flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search devices"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <FiFilter size={18} />
              <span className="text-sm font-medium">Filters</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-1 px-5">
            <div className="flex flex-col gap-1 w-64">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Platform</span>
                <button className="text-sm text-blue-600 hover:underline">Remove</button>
              </div>

              <div className="flex gap-1 border border-gray-200 p-1">
                <div className="self-start flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded text-sm">
                  <span>Windows</span>
                  <button onClick={() => setActiveFilter('')}>
                    <FiX size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex">
              <button className="text-sm text-blue-600 hover:bg-blue-50 py-1 px-2 rounded-full flex items-center gap-1">
                Clear Filters
                <span className={`bg-blue-500 text-blue-100 rounded-full w-5 h-5 flex items-center justify-center text-xs ${codeFont.className}`}>
                  1
                </span>
              </button>
            </div>
          </div>

          <div className="mt-6 border-y border-gray-200 px-3 md:px-4 py-2 md:py-4 flex md:items-center justify-center flex-col md:flex-row gap-1">
            <div className="flex items-center gap-1">
              <button className="px-4 py-2 flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 bg-gray-100 rounded-lg">
                <span>Actions</span>
                <FiChevronDown size={14} />
              </button>
              <button className="p-2 flex items-center gap-1 bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600">
                <BiPurchaseTagAlt size={18} />
                <FiChevronDown size={14} />
              </button>
              <button className="p-2 flex items-center gap-1 bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600">
                <FiPlus size={18} />
              </button>
              <button className="p-2 flex items-center gap-1 bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600">
                <FiTrash2 size={18} />
              </button>
            </div>

            <div className="md:ml-auto">
              <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-50">
                Export to CSV
              </button>
            </div>
          </div>


          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="w-12 px-6 py-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device group
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tags
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Security score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reachability
                  </th>
                  <th className="w-12 px-6 py-3">
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map((bar) => (
                        <div key={bar} className={`w-1 h-6 rounded-full border ${bar < 2 ? 'border-gray-400 bg-gray-400' : 'border-gray-300'}`}></div>
                      ))}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {devices.map((device) => (
                  <tr key={device.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => router.push("/dashboard/devices/vpn-server")}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedDevices.includes(device.id)}
                        onChange={() => toggleDeviceSelection(device.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn("w-14 h-14 rounded-lg flex items-center justify-center text-white", device.iconColor)}
                        >
                          {getDeviceIcon(device.icon)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{device.name}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <FiMonitor size={20} className="text-gray-400" />
                            <PiWindowsLogo size={20} className="relative text-gray-400 after:absolute after:top-0 after:right-0 after:border after:border-white after:size-2 after:rounded-full after:bg-red-500" />
                            <FiLink size={20} className="relative text-gray-400 after:absolute after:top-0 after:right-0 after:border after:border-white after:size-2 after:rounded-full after:bg-red-500" />
                            {device.hasAlert
                              ? <FiAlertTriangle size={20} className="text-yellow-500" />
                              : <BiBell size={20} className='text-gray-400' />
                            }
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-sm text-green-600 px-2 rounded-full bg-green-50">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        {device.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{device.deviceGroup}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {device.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-1 text-xs rounded border ${tag === 'SERVER'
                              ? 'border-red-300 text-red-600 bg-red-50'
                              : tag === 'WORKSTATION'
                                ? 'border-blue-300 text-blue-600 bg-blue-50'
                                : 'border-yellow-300 text-yellow-700 bg-yellow-50'
                              }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4].map((bar) => (
                            <div
                              key={bar}
                              className="w-1 h-6 rounded-sm"
                              style={{
                                backgroundColor:
                                  bar <= Math.floor(device.securityScore / 25)
                                    ? getSecurityColor(device.securityScore)
                                    : '#E5E7EB'
                              }}
                            ></div>
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {device.securityScore}/100
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="w-48 h-8 bg-gray-100 rounded relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center">
                            <svg width="100%" height="100%" className="text-blue-500">
                              <polyline
                                points="0,20 30,15 60,25 90,10 120,18 150,12 180,22 210,16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-600">
                            {device.reachability}% Reachable
                          </span>
                          <span className="text-xs text-blue-600 font-medium">
                            {device.responseTime}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="text-gray-400 hover:text-yellow-500">
                          <FiStar size={18} />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
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
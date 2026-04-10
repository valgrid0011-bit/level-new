import { FiAlertTriangle, FiChevronDown, FiFolder, FiMonitor, FiPlus, FiStar } from "react-icons/fi"

const Sidebar = () => {
  const deviceGroups = [
    { name: 'Accounting', count: 2 },
    { name: 'Customer Service', count: 1 },
    { name: 'Executive', count: 3 },
    { name: 'HR', count: 2 },
    { name: 'IT', count: 2 },
    { name: 'Marketing', count: 2 },
    { name: 'Sales', count: 1 },
    { name: 'Servers', count: 15 }
  ];

  return (
    <div className="hidden md:flex flex-col w-72 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-y-auto transition-colors duration-200">
      <div className="border-b border-gray-200 dark:border-gray-800 flex-center p-2 my-2">
        <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Install new agent
        </button>
      </div>

      <div className="space-y-1 mb-6 p-2">
        <div className="flex items-center justify-between px-3 py-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 rounded-lg cursor-pointer">
          <div className="flex items-center gap-2">
            <FiMonitor size={16} />
            <span className="text-sm font-medium">All Devices</span>
          </div>
          <span className="text-sm font-semibold">28</span>
        </div>

        <div className="flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors">
          <div className="flex items-center gap-2">
            <FiStar size={16} />
            <span className="text-sm">Favorites</span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-500">2</span>
        </div>

        <div className="flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors">
          <div className="flex items-center gap-2">
            <FiMonitor size={16} />
            <span className="text-sm">New Devices</span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-500">0</span>
        </div>

        <div className="flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors">
          <div className="flex items-center gap-2">
            <FiMonitor size={16} />
            <span className="text-sm">Ungrouped Devices</span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-500">0</span>
        </div>

        <div className="flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors">
          <div className="flex items-center gap-2">
            <FiAlertTriangle size={16} />
            <span className="text-sm">Flagged Devices</span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-500">0</span>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 pt-4 px-2">
        <div className="flex items-center justify-between mb-3 px-3">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Device groups</span>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <FiPlus size={14} />
          </button>
        </div>

        <input
          type="text"
          placeholder="Search device groups"
          className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
        />

        <div className="space-y-1">
          {deviceGroups.map((group) => (
            <div
              key={group.name}
              className="flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <FiChevronDown size={14} />
                <FiFolder />
                <span className="text-sm">{group.name}</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-500">{group.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
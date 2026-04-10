'use client';

import { useTheme, Theme } from '@/lib/theme';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import { cn } from '@/lib/utils';

const options: { value: Theme; icon: React.ReactNode; label: string }[] = [
  { value: 'light', icon: <FiSun size={15} />, label: 'Light' },
  { value: 'system', icon: <FiMonitor size={15} />, label: 'System' },
  { value: 'dark', icon: <FiMoon size={15} />, label: 'Dark' },
];

interface ThemeToggleProps {
  /** Show text labels alongside icons */
  showLabels?: boolean;
}

export function ThemeToggle({ showLabels = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 gap-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setTheme(opt.value)}
          title={opt.label}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-medium transition-all duration-150',
            theme === opt.value
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          )}
        >
          {opt.icon}
          {showLabels && <span className="text-xs">{opt.label}</span>}
        </button>
      ))}
    </div>
  );
}

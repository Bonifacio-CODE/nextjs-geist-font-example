import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navigation = [
  { name: 'Dashboard', href: '/', icon: '🏠' },
  { name: 'Devices', href: '/devices', icon: '📱' },
  { name: 'Downlinks', href: '/downlinks', icon: '📤' },
  { name: 'Gateways', href: '/gateways', icon: '🌐' },
  { name: 'Analytics', href: '/analytics', icon: '📊' },
  { name: 'Alerts', href: '/alerts', icon: '🔔' },
  { name: 'Config', href: '/config', icon: '⚙️' },
];

export default function Navigation({ isOpen, onToggle, darkMode, onDarkModeToggle }) {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState(router.pathname);

  return (
    <div className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      <div className="flex items-center justify-between p-4 border-b border-blue-700">
        {isOpen && (
          <h1 className="text-xl font-bold text-white">Water Meter IoT</h1>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <span className="text-white">{isOpen ? '←' : '→'}</span>
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              router.pathname === item.href
                ? 'bg-blue-700 text-white'
                : 'text-blue-100 hover:bg-blue-700 hover:text-white'
            } ${!isOpen && 'justify-center'}`}
          >
            <span className="text-lg mr-3">{item.icon}</span>
            {isOpen && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-blue-700">
        <div className="flex items-center justify-between">
          {isOpen && <span className="text-sm text-blue-200">Dark Mode</span>}
          <button
            onClick={onDarkModeToggle}
            className="p-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <span className="text-white">{darkMode ? '🌙' : '☀️'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

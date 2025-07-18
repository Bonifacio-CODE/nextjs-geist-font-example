import { useState, useEffect } from 'react';
import Card from '../components/shared/Card';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalDevices: 12,
    activeDevices: 10,
    totalGateways: 5,
    totalWater: 1250.5,
    alerts: 3,
  });

  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Water Meter IoT Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Monitor and manage your water meter devices in real-time
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card
          title="Total Devices"
          value={stats.totalDevices}
          icon="📱"
          color="blue"
          onClick={() => router.push('/devices')}
        />
        <Card
          title="Active Devices"
          value={stats.activeDevices}
          icon="✅"
          color="green"
          onClick={() => router.push('/devices')}
        />
        <Card
          title="Gateways"
          value={stats.totalGateways}
          icon="🌐"
          color="purple"
          onClick={() => router.push('/gateways')}
        />
        <Card
          title="Total Water (L)"
          value={stats.totalWater.toLocaleString('en-US')}
          icon="💧"
          color="cyan"
          onClick={() => router.push('/analytics')}
        />
        <Card
          title="Alerts"
          value={stats.alerts}
          icon="🔔"
          color="red"
          onClick={() => router.push('/alerts')}
        />
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Device Status" className="col-span-1">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Online Devices</span>
              <span className="text-green-600 font-semibold">{stats.activeDevices}/{stats.totalDevices}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${(stats.activeDevices / stats.totalDevices) * 100}%` }}
              ></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">85%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Signal Quality</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">98%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Recent Activity" className="col-span-1">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Device SW3L-001</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Water consumption: 45.2L</p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">2 min ago</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Gateway GW-001</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Status: Online</p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">5 min ago</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Alert</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">High water consumption detected</p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">10 min ago</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

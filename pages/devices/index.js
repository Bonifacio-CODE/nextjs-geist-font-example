import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Card from '../../components/shared/Card';

export default function Devices() {
  const router = useRouter();
  const [devices, setDevices] = useState([
    { id: 'SW3L-001', name: 'Water Meter 1', status: 'online', signal: 85, battery: 92 },
    { id: 'SW3L-002', name: 'Water Meter 2', status: 'online', signal: 78, battery: 88 },
    { id: 'SW3L-003', name: 'Water Meter 3', status: 'offline', signal: 45, battery: 65 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Device Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your water meter devices
          </p>
        </div>
        <button
          onClick={() => router.push('/devices/add')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Device
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => (
          <Card
            key={device.id}
            title={device.name}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push(`/devices/${device.id}`)}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  device.status === 'online' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {device.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Signal</span>
                <span className="text-sm">{device.signal}%</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Battery</span>
                <span className="text-sm">{device.battery}%</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

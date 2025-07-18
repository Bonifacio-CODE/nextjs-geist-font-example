import { useState } from 'react';
import { useRouter } from 'next/router';
import Card from '../../components/shared/Card';

export default function Downlinks() {
  const router = useRouter();
  const [commands, setCommands] = useState([
    { id: 1, device: 'SW3L-001', command: 'Reset Counter', status: 'sent', time: '2 min ago' },
    { id: 2, device: 'SW3L-002', command: 'Set Interval', status: 'pending', time: '5 min ago' },
    { id: 3, device: 'SW3L-003', command: 'Calibrate', status: 'failed', time: '10 min ago' },
  ]);

  const sendCommand = (deviceId, command) => {
    // Implementar envío de comandos a través de TTN
    console.log(`Sending ${command} to ${deviceId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Downlink Commands
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Send commands to your water meter devices
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Send Command">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Device
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
                <option>SW3L-001</option>
                <option>SW3L-002</option>
                <option>SW3L-003</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Command
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
                <option>Reset Counter</option>
                <option>Set Report Interval</option>
                <option>Calibrate Sensor</option>
                <option>Enable/Disable Alarms</option>
              </select>
            </div>
            
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Send Command
            </button>
          </div>
        </Card>

        <Card title="Command History">
          <div className="space-y-4">
            {commands.map((cmd) => (
              <div key={cmd.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{cmd.device}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{cmd.command}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    cmd.status === 'sent' ? 'bg-green-100 text-green-800' :
                    cmd.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {cmd.status}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{cmd.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

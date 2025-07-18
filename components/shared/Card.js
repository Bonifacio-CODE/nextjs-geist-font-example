export default function Card({ 
  title, 
  value, 
  icon, 
  color = 'blue', 
  children, 
  className = '',
  onClick 
}) {
  const colorClasses = {
    blue: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
    green: 'border-green-500 bg-green-50 dark:bg-green-900/20',
    purple: 'border-purple-500 bg-purple-50 dark:bg-purple-900/20',
    cyan: 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20',
    red: 'border-red-500 bg-red-50 dark:bg-red-900/20',
  };

  const textColors = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    cyan: 'text-cyan-600 dark:text-cyan-400',
    red: 'text-red-600 dark:text-red-400',
  };

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg border-l-4 ${colorClasses[color]} ${className} ${
        onClick ? 'cursor-pointer hover:shadow-xl transition-shadow' : ''
      }`}
      onClick={onClick}
    >
      <div className="p-6">
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            {icon && (
              <span className={`text-2xl ${textColors[color]}`}>{icon}</span>
            )}
          </div>
        )}
        
        {value !== undefined && (
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </div>
        )}
        
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

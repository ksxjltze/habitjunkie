// components/DailiesList.tsx
import React from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import { getDifficultyColor } from '../utils/taskHelpers';
import Card from './Card';

const DailiesList: React.FC = () => {
  const { tasks, toggleDaily } = useDashboard();

  return (
    <Card title='Dailies' children={
      (<ul className="space-y-3">
        {tasks.dailies.map(daily => (
          <li key={daily.id} className={`p-3 border rounded-lg flex items-center justify-between ${daily.completed ? 'bg-gray-100 text-gray-500' : getDifficultyColor(daily.difficulty)}`}>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={daily.completed}
                onChange={() => toggleDaily(daily.id)}
                className="w-5 h-5 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className={`font-medium ${daily.completed ? 'line-through' : ''}`}>{daily.title}</span>
            </div>
            <div className="flex items-center">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                {daily.streak} day streak
              </span>
            </div>
          </li>
        ))}
        <li className="p-3 border border-dashed border-gray-300 rounded-lg text-center text-gray-500 hover:bg-gray-50 cursor-pointer">
          Add a new daily
        </li>
      </ul>)
    } />
  );
};

export default DailiesList;

// components/RewardsList.tsx
import React from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import Card from './Card';

const RewardsList: React.FC = () => {
  const { tasks, userData, purchaseReward } = useDashboard();

  return (
    <Card title='Rewards'>
      <ul className="space-y-3">
        {tasks.rewards.map(reward => (
          <li key={reward.id} className="p-3 border border-yellow-200 dark:bg-purple-900 bg-yellow-50 rounded-lg flex items-center justify-between">
            <span className="font-medium">{reward.title}</span>
            <button
              onClick={() => purchaseReward(reward.id, reward.cost)}
              disabled={userData.gold < reward.cost}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${userData.gold >= reward.cost
                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              <span>{reward.cost}</span>
              <span className="text-xs">G</span>
            </button>
          </li>
        ))}
        <li className="p-3 border border-dashed border-gray-300 rounded-lg text-center text-gray-500 hover:bg-gray-50 cursor-pointer">
          Add a new reward
        </li>
      </ul>
    </Card>
  );
};

export default RewardsList;

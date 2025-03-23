// components/HabitsList.tsx
import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { getDifficultyColor } from '../utils/taskHelpers';

const HabitsList: React.FC = () => {
  const { tasks, updateHabit } = useDashboard();
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4 text-purple-700">Habits</h2>
      <ul className="space-y-3">
        {tasks.habits.map(habit => (
          <li key={habit.id} className={`p-3 border rounded-lg flex items-center justify-between ${getDifficultyColor(habit.difficulty)}`}>
            <span className="font-medium">{habit.title}</span>
            <div className="flex items-center space-x-2">
              {habit.positive && (
                <button 
                  onClick={() => updateHabit(habit.id, true)}
                  className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600"
                >
                  +
                </button>
              )}
              {habit.negative && (
                <button 
                  onClick={() => updateHabit(habit.id, false)}
                  className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
                >
                  -
                </button>
              )}
              <span className="text-gray-500">{habit.count}</span>
            </div>
          </li>
        ))}
        <li className="p-3 border border-dashed border-gray-300 rounded-lg text-center text-gray-500 hover:bg-gray-50 cursor-pointer">
          Add a new habit
        </li>
      </ul>
    </div>
  );
};

export default HabitsList;

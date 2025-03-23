// components/HabitsList.tsx
import React from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import { getDifficultyColor } from '../utils/taskHelpers';
import Card from './Card';
import ListItem from './ListItem';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

const Habits = () => {
  const { tasks, updateHabit } = useDashboard();

  return (
    <ul className="space-y-3">
      {tasks.habits.map(habit => (
        <ListItem style={getDifficultyColor(habit.difficulty)} titleStyle="font-bold" key={habit.id} title={habit.title}
          pre={
            (
              <div>
                {habit.positive && (
                  <button
                    onClick={() => updateHabit(habit.id, true)}
                    className="w-8 h-8 rounded-full bg-green-500 dark:bg-gray-800 text-white flex items-center justify-center hover:bg-green-600"
                  >
                    <PlusCircleIcon></PlusCircleIcon>
                  </button>
                )}
              </div>
            )
          }
          children={
            (<div className="flex items-center space-x-2">
              {habit.negative && (
                <button
                  onClick={() => updateHabit(habit.id, false)}
                  className="w-8 h-8 rounded-full bg-red-500 dark:bg-gray-800 text-white flex items-center justify-center hover:bg-red-600"
                >
                  <MinusCircleIcon></MinusCircleIcon>
                </button>
              )}
            </div>)
          } />
      ))}
      <li className="p-3 border border-dashed border-gray-300 rounded-lg text-center hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer">
        Add a new habit
      </li>
    </ul>
  )
}

const HabitsList: React.FC = () => {
  return (
    <Card title='Habits' children={Habits()} />
  );
};

export default HabitsList;

// components/HabitsList.tsx
import React from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import { getDifficultyColor } from '../utils/taskHelpers';
import Card from './Card';
import ListItem from './ListItem';

const Habits = () => {
  const { tasks, updateHabit } = useDashboard();

  return (
    <ul className="space-y-3">
      {tasks.habits.map(habit => (
        <ListItem style={getDifficultyColor(habit.difficulty)} key={habit.id} title={habit.title} children={
          (<div className="flex items-center space-x-2">
            {habit.positive && (
              <button
                onClick={() => updateHabit(habit.id, true)}
                className="w-8 h-8 rounded-full bg-green-500 dark:bg-green-900 text-white flex items-center justify-center hover:bg-green-600"
              >
                +
              </button>
            )}
            {habit.negative && (
              <button
                onClick={() => updateHabit(habit.id, false)}
                className="w-8 h-8 rounded-full bg-red-500 bg-red-900 text-white flex items-center justify-center hover:bg-red-600"
              >
                -
              </button>
            )}
            <span className="text-gray-500">{habit.count}</span>
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

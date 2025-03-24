// components/HabitsList.tsx
import React, { useState } from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import { getDifficultyColor } from '../utils/taskHelpers';
import Card from './Card';
import ListItem from './ListItem';
import { MinusCircleIcon, PlusCircleIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import AddHabitModal from './AddHabitModal';

const Habits = () => {
  const { tasks, updateHabit, deleteHabit } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ul className="space-y-3">
      {tasks.habits.map(habit => (
        <ListItem style={getDifficultyColor(habit.difficulty)}
          titleStyle="font-bold flex-grow-2 justify-center" key={habit.id} title={habit.title}
          pre={
            (
              <div className='w-fit'>
                {habit.positive && (
                  <div className="flex">
                    <button
                      onClick={() => updateHabit(habit.id, true)}
                      className="w-8 h-8 rounded-full bg-green-500 dark:bg-gray-800 text-white flex items-center justify-center hover:bg-green-600"
                    >
                      <PlusCircleIcon></PlusCircleIcon>
                    </button>
                    <p className='text-xs px-0.5'>{habit.count}</p>
                  </div>
                )}
              </div>
            )
          }>
          <div className="flex space-x-2 w-1/8 ml-0.5">
            {habit.negative && (
              <div><button
                onClick={() => updateHabit(habit.id, false)}
                className="w-8 h-8 rounded-full bg-red-500 dark:bg-gray-800 text-white flex items-center justify-center hover:bg-red-600"
              >
                <MinusCircleIcon />
              </button><button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                className="w-8 h-8 rounded-full bg-blue-500 dark:bg-gray-800 text-white flex items-center justify-center hover:bg-blue-600"
              >
                  <PencilSquareIcon className="w-4 h-4" />
                </button><button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteHabit(habit.id);
                  }}
                  className="w-8 h-8 rounded-full bg-red-500 dark:bg-gray-800 text-white flex items-center justify-center hover:bg-red-600"
                >
                  <TrashIcon className="w-4 h-4" />
                </button></div>
            )}
          </div>
        </ListItem>
      ))}
      <li onClick={openModal} className="p-3 border border-dashed border-gray-300 rounded-lg text-center text-gray-500 hover:bg-gray-50 cursor-pointer">
        <div>
          <span>Add a new habit</span>
          {isModalOpen && <AddHabitModal isOpen={isModalOpen} onClose={closeModal} habit={undefined} />}
        </div>
      </li>
    </ul>
  )
}

const HabitsList: React.FC = () => {
  return (
    <Card title='Habits'>
      <Habits></Habits>
    </Card>
  );
};

export default HabitsList;

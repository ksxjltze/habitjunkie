// components/HabitsList.tsx
import React, { useState } from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import { getDifficultyColor } from '../utils/taskHelpers';
import Card from './Card';
import ListItem from './ListItem';
import { MinusCircleIcon, PlusCircleIcon, PencilSquareIcon, TrashIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import AddHabitModal from './AddHabitModal';

const Habits = () => {
  const { tasks, updateHabit, deleteHabit } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [showOptions, setShowOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number>(-1);

  const onHabitItemMouseEnter = (id: number, e: React.MouseEvent) => {
    setShowOptions(true);
    setSelectedItem(id);
    console.log(id);
  };

  const onHabitItemMouseLeave = (id: number, e: React.MouseEvent) => {
    setShowOptions(false);
  };
  
  const showOptionsPopup = () => {

  };

  return (
    <ul className="space-y-3">
      {tasks.habits.map(habit => (
        <ListItem mouseEnter={onHabitItemMouseEnter} mouseLeave={onHabitItemMouseLeave} style={getDifficultyColor(habit.difficulty)}
          titleStyle="font-bold flex-grow-2 justify-center" key={habit.id} keyId={habit.id} title={habit.title}
          pre={
            (
              <div className='w-fit mr-2'>
                {(
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
          <div className="flex space-x-2 w-fit">
            {(
              <div className='flex'>
                {<EllipsisVerticalIcon onClick={showOptionsPopup} className={`w-4 h-4 flex align-top ${(showOptions && selectedItem == habit.id) ? 'visible' : 'invisible'}`}></EllipsisVerticalIcon>}
                <button
                  onClick={() => updateHabit(habit.id, false)}
                  className="w-8 h-8 rounded-full bg-red-500 dark:bg-gray-800 text-white flex items-center justify-center hover:bg-red-600"
                >
                  <MinusCircleIcon className='w-full'/>
                </button>
              </div>
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

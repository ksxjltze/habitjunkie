// components/HabitsList.tsx
import React, { useState } from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import { getDifficultyColor } from '../utils/taskHelpers';
import Card from './Card';
import ListItem from './ListItem';
import { MinusCircleIcon, PlusCircleIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import AddHabitModal from './AddHabitModal';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const Habits = () => {
  const { tasks, updateHabit } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [showOptions, setShowOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number>(-1);
  const [isOptionsFocused, setOptionsFocused] = useState(false);

  const onHabitItemMouseEnter = (id: number | undefined, e: React.MouseEvent) => {
    if (!id)
      return;

    setShowOptions(true);
    setSelectedItem(id);
    e.stopPropagation();
  };

  const onHabitItemMouseLeave = (id: number | undefined, e: React.MouseEvent) => {
    if (!id)
      return;

    setShowOptions(false);
      setSelectedItem(id);
    e.stopPropagation();
  };

  const onHabitItemFocusEnter = (id: number | undefined, e: React.FocusEvent) => {
    if (!id)
      return;
    
    setShowOptions(true);
    setSelectedItem(id);
    e.stopPropagation();
  };

  return (
    <ul className="space-y-3">
      {tasks.habits.map(habit => (
        <div key={habit.id}>
          <ContextMenu>
            <ContextMenuTrigger>
              <ListItem mouseEnter={onHabitItemMouseEnter} mouseLeave={onHabitItemMouseLeave} style={getDifficultyColor(habit.difficulty)}
                titleStyle="font-bold flex-grow-2 justify-center" keyId={habit.id} title={habit.title}
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
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger tabIndex={-1} className='relative'>
                            <div className='bg-white w-8 h-8 absolute bottom-2 -left-1.5 opacity-0'></div>
                          </TooltipTrigger>
                          <TooltipContent className='absolute bottom-2 -left-5.5'>
                            <p>Options</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <DropdownMenu onOpenChange={(open) => setOptionsFocused(open)}>
                        <DropdownMenuTrigger onFocus={(e) => onHabitItemFocusEnter(habit.id, e)} className='border-none focus-visible:outline-gray-500'>
                          <EllipsisVerticalIcon className={`w-5 h-5 flex relative bottom-2 transition-opacity 
                                    ${((isOptionsFocused || showOptions) && selectedItem == habit.id) ? 'opacity-100' : 'opacity-0'}`}>
                          </EllipsisVerticalIcon>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Move To Top</DropdownMenuItem>
                          <DropdownMenuItem>Move To Bottom</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <button
                        onClick={() => updateHabit(habit.id, false)}
                        className="w-8 h-8 rounded-full bg-red-500 dark:bg-gray-800 text-white flex items-center justify-center hover:bg-red-600"
                      >
                        <MinusCircleIcon className='w-full' />
                      </button>
                    </div>
                  )}
                </div>
              </ListItem>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Edit</ContextMenuItem>
              <ContextMenuItem>Move To Top</ContextMenuItem>
              <ContextMenuItem>Move To Bottom</ContextMenuItem>
              <ContextMenuItem>Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>

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

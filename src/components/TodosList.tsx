// components/TodosList.tsx
import React from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import { getDifficultyColor } from '../utils/taskHelpers';
import Card from './Card';

const TodosList: React.FC = () => {
  const { tasks, toggleTodo } = useDashboard();

  return (
    <Card title='To-Dos' children={
      (<ul className="space-y-3">
        {tasks.todos.map(todo => (
          <li key={todo.id} className={`p-3 border rounded-lg flex items-center justify-between ${todo.completed ? 'bg-gray-100 text-gray-500' : getDifficultyColor(todo.difficulty)}`}>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 border-gray-300 rounded text-orange-600 focus:ring-orange-500"
              />
              <div>
                <span className={`font-medium ${todo.completed ? 'line-through' : ''}`}>{todo.title}</span>
                {todo.dueDate && (
                  <p className="text-xs text-gray-500">Due: {todo.dueDate}</p>
                )}
              </div>
            </div>
          </li>
        ))}
        <li className="p-3 border border-dashed border-gray-300 rounded-lg text-center text-gray-500 hover:bg-gray-50 cursor-pointer">
          Add a new to-do
        </li>
      </ul>)
    } />
  );
};

export default TodosList;

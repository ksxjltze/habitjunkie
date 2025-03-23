'use client'
import React, { useState } from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import { Difficulty } from '../types/habitjunkie';

interface AddHabitModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose }) => {
    // Use the dashboard context to access the addHabit function
    const { addHabit } = useDashboard();

    // State for the form inputs
    const [title, setTitle] = useState('');
    const [difficulty, setDifficulty] = useState<Difficulty>('medium');
    const [positive, setPositive] = useState(true);
    const [negative, setNegative] = useState(false);

    const handleCloseClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Stop the event from bubbling up
        onClose();
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate the form
        if (!title.trim()) {
            alert('Please enter a habit title');
            return;
        }

        // Call the addHabit function from context
        addHabit(title, difficulty, positive, negative);

        // Reset the form
        setTitle('');
        setDifficulty('medium');
        setPositive(true);
        setNegative(false);

        // Close the modal
        onClose();
    };

    // If the modal is not open, don't render anything
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={(e) => {
                // Only close if the actual background was clicked
                if (e.target === e.currentTarget) {
                    handleCloseClick(e);
                }
            }}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Habit</h2>
                    <button
                        onClick={handleCloseClick}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Habit Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                            placeholder="e.g., Drink water, Exercise, etc."
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Difficulty
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => setDifficulty('easy')}
                                className={`py-2 px-4 rounded-md ${difficulty === 'easy'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                                    }`}
                            >
                                Easy
                            </button>
                            <button
                                type="button"
                                onClick={() => setDifficulty('medium')}
                                className={`py-2 px-4 rounded-md ${difficulty === 'medium'
                                    ? 'bg-yellow-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                                    }`}
                            >
                                Medium
                            </button>
                            <button
                                type="button"
                                onClick={() => setDifficulty('hard')}
                                className={`py-2 px-4 rounded-md ${difficulty === 'hard'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                                    }`}
                            >
                                Hard
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Habit Type
                        </label>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="positive"
                                    checked={positive}
                                    onChange={() => setPositive(!positive)}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                />
                                <label htmlFor="positive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                    Positive (+) - Habits you want to do more often
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="negative"
                                    checked={negative}
                                    onChange={() => setNegative(!negative)}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                />
                                <label htmlFor="negative" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                    Negative (-) - Habits you want to avoid
                                </label>
                            </div>
                            {!positive && !negative && (
                                <p className="text-red-500 text-xs mt-1">Please select at least one habit type</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!title.trim() || (!positive && !negative)}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-purple-400 disabled:cursor-not-allowed"
                        >
                            Add Habit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddHabitModal;
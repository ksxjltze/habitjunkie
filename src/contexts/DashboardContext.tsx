'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserData, TasksData, Habit, Difficulty } from '../types/habitjunkie';

// Extended interface to include new habit functionality
interface DashboardContextType {
  userData: UserData;
  tasks: TasksData;
  toggleDaily: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateHabit: (id: number, isPositive: boolean) => void;
  purchaseReward: (id: number, cost: number) => void;
  resetProgress: () => void;
  isLoaded: boolean;
  addHabit: (title: string, difficulty: Difficulty, positive: boolean, negative: boolean) => void;
  deleteHabit: (id: number) => void;
  editHabit: (id: number, updatedHabit: Omit<Habit, 'id' | 'count'>) => void;
}

const initialUserData: UserData = {
  username: 'Adventurer',
  title: 'Novice',
  level: 10,
  health: 45,
  maxHealth: 50,
  experience: 80,
  maxExperience: 100,
  gold: 25,
  gems: 5,
  streak: 7
};

const initialTasksData: TasksData = {
  habits: [
    { id: 1, title: 'Exercise', difficulty: 'medium', positive: true, negative: true, count: 5 },
    { id: 2, title: 'Meditate', difficulty: 'easy', positive: true, negative: false, count: 3 }
  ],
  dailies: [
    { id: 1, title: 'Morning Routine', difficulty: 'medium', completed: false, streak: 4 },
    { id: 2, title: 'Read 20 Pages', difficulty: 'easy', completed: true, streak: 7 }
  ],
  todos: [
    { id: 1, title: 'Complete Project', difficulty: 'hard', completed: false, dueDate: '2025-03-25' },
    { id: 2, title: 'Buy Groceries', difficulty: 'easy', completed: false, dueDate: '2025-03-24' }
  ],
  rewards: [
    { id: 1, title: 'Watch a Movie', cost: 10 },
    { id: 2, title: 'Buy New Game', cost: 50 }
  ]
};

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
}

// Storage keys for localStorage
const USER_DATA_KEY = 'habitjunkie_userData';
const TASKS_DATA_KEY = 'habitjunkie_tasksData';

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  // Always initialize with the default data for server rendering
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [tasks, setTasks] = useState<TasksData>(initialTasksData);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Load data from localStorage after initial render
  useEffect(() => {
    // This runs only on the client after hydration is complete
    const storedUserData = localStorage.getItem(USER_DATA_KEY);
    const storedTasksData = localStorage.getItem(TASKS_DATA_KEY);
    
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    
    if (storedTasksData) {
      setTasks(JSON.parse(storedTasksData));
    }
    
    setIsLoaded(true);
  }, []);
  
  // Save to localStorage whenever state changes
  // But only after initial client-side load is complete
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    }
  }, [userData, isLoaded]);
  
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(TASKS_DATA_KEY, JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  // Helper function to generate a new unique ID for habits
  const generateNewHabitId = (): number => {
    // Find the maximum ID in the current habits array
    const maxId = tasks.habits.reduce(
      (max, habit) => (habit.id > max ? habit.id : max),
      0
    );
    // Return the next ID in sequence
    return maxId + 1;
  };

  // Add a new habit to the habits list
  const addHabit = (
    title: string,
    difficulty: Difficulty,
    positive: boolean,
    negative: boolean
  ): void => {
    const newHabit: Habit = {
      id: generateNewHabitId(),
      title,
      difficulty,
      positive,
      negative,
      count: 0, // Start with a count of 0
    };

    setTasks({
      ...tasks,
      habits: [...tasks.habits, newHabit],
    });

    // Give the user a small reward for creating a new habit
    setUserData({
      ...userData,
      experience: Math.min(userData.experience + 2, userData.maxExperience),
    });
  };

  // Delete a habit from the habits list
  const deleteHabit = (id: number): void => {
    setTasks({
      ...tasks,
      habits: tasks.habits.filter(habit => habit.id !== id),
    });
  };

  // Edit an existing habit
  const editHabit = (id: number, updatedHabit: Omit<Habit, 'id' | 'count'>): void => {
    setTasks({
      ...tasks,
      habits: tasks.habits.map(habit => 
        habit.id === id ? { ...habit, ...updatedHabit } : habit
      )
    });
  };

  // Reset progress function
  const resetProgress = (): void => {
    localStorage.removeItem(USER_DATA_KEY);
    localStorage.removeItem(TASKS_DATA_KEY);
    setUserData(initialUserData);
    setTasks(initialTasksData);
  };

  // Toggle completion of daily tasks
  const toggleDaily = (id: number): void => {
    setTasks({
      ...tasks,
      dailies: tasks.dailies.map(daily => 
        daily.id === id ? { ...daily, completed: !daily.completed } : daily
      )
    });
  };

  // Toggle completion of todo tasks
  const toggleTodo = (id: number): void => {
    setTasks({
      ...tasks,
      todos: tasks.todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    });
  };

  // Update habit count
  const updateHabit = (id: number, isPositive: boolean): void => {
    setTasks({
      ...tasks,
      habits: tasks.habits.map(habit => 
        habit.id === id 
          ? { ...habit, count: isPositive ? habit.count + 1 : habit.count - 1 } 
          : habit
      )
    });
    
    // Simulate updating health/experience based on habit type
    if (isPositive) {
      setUserData({
        ...userData,
        experience: Math.min(userData.experience + 5, userData.maxExperience),
        gold: userData.gold + 1
      });
    } else {
      setUserData({
        ...userData,
        health: Math.max(userData.health - 3, 0)
      });
    }
    
    // Level up if experience is maxed
    if (userData.experience + 5 >= userData.maxExperience) {
      setUserData({
        ...userData,
        level: userData.level + 1,
        experience: 0,
        maxExperience: userData.maxExperience + 20,
        health: userData.maxHealth,
        gold: userData.gold + 5
      });
    }
  };

  // Purchase a reward
  const purchaseReward = (id: number, cost: number): void => {
    if (userData.gold >= cost) {
      setUserData({
        ...userData,
        gold: userData.gold - cost
      });
    }
  };

  return (
    <DashboardContext.Provider value={{ 
      userData, 
      tasks, 
      toggleDaily, 
      toggleTodo, 
      updateHabit, 
      purchaseReward,
      resetProgress,
      isLoaded,
      addHabit,
      deleteHabit,
      editHabit
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

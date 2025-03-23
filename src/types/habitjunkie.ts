export interface UserData {
  username: string;
  title: string;
  level: number;
  health: number;
  maxHealth: number;
  experience: number;
  maxExperience: number;
  gold: number;
  gems: number;
  streak: number;
}

export interface Habit {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  positive: boolean;
  negative: boolean;
  count: number;
}

export interface Daily {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  streak: number;
}

export interface Todo {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  dueDate: string;
}

export interface Reward {
  id: number;
  title: string;
  cost: number;
}

export interface TasksData {
  habits: Habit[];
  dailies: Daily[];
  todos: Todo[];
  rewards: Reward[];
}

// utils/taskHelpers.ts

export const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard'): string => {
  switch(difficulty) {
    case 'easy': return 'bg-green-100 border-green-300';
    case 'medium': return 'bg-yellow-100 border-yellow-300';
    case 'hard': return 'bg-red-100 border-red-300';
    default: return 'bg-gray-100 border-gray-300';
  }
};

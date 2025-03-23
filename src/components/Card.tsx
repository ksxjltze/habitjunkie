// Example component with dark mode styles
// components/Card.tsx
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default Card;
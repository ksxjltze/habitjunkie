import React from 'react';

interface ItemProps {
  title: string;
  style?: string;
  key?: number;
  children: React.ReactNode;
}

const ListItem: React.FC<ItemProps> = ({ title, key, style, children }) => {
  return (
    <li key={key} className={`${style} bg-white dark:bg-gray-800 shadow-md transition-colors p-3 border rounded-lg flex items-center justify-between`}>
      <h2 className="flex">{title}</h2>
      {children}
    </li>
  );
};

export default ListItem;
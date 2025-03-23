import React from 'react';

interface ItemProps {
  title: string;
  titleStyle?: string;
  style?: string;
  keyId?: number;
  pre?: React.ReactNode;
  children: React.ReactNode;
}

const ListItem: React.FC<ItemProps> = ({ title, titleStyle, keyId, style, pre, children }) => {
  return (
    <li key={keyId} className={`${style} bg-white dark:bg-gray-800 shadow-md transition-colors p-2 border rounded-lg flex items-center justify-between`}>
      {pre}
      <h2 className={`${titleStyle} flex`}>{title}</h2>
      {children}
    </li>
  );
};

export default ListItem;
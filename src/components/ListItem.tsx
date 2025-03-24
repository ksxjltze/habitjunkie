import React from 'react';

interface ItemProps {
  title: string;
  titleStyle?: string;
  style?: string;
  keyId?: number;
  pre?: React.ReactNode;
  children: React.ReactNode;
  mouseEnter?: (keyId: number | undefined, e: React.MouseEvent) => void;
  mouseLeave?: (keyId: number | undefined, e: React.MouseEvent) => void;
}

const ListItem: React.FC<ItemProps> = ({ title, titleStyle, keyId, style, pre, children, mouseEnter, mouseLeave }) => {
  const OnMouseEnter = (e: React.MouseEvent) => {
    if (mouseEnter) {
      mouseEnter(keyId, e);
    }
  };

  const OnMouseLeave = (e: React.MouseEvent) => {
    if (mouseLeave) {
      mouseLeave(keyId, e);
    }
  };

  return (
    <li onMouseEnter={OnMouseEnter} onMouseLeave={OnMouseLeave} key={keyId}
      className={`${style} bg-white dark:bg-gray-800 shadow-md transition-colors p-2 border rounded-lg flex items-center justify-between`}>
      {pre}
      <h2 className={`${titleStyle} flex`}>{title}</h2>
      {children}
    </li>
  );
};

export default ListItem;
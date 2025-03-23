// components/Header.tsx
import React from 'react';
import { useDashboard } from '../context/DashboardContext';

const Header: React.FC = () => {
  const { userData } = useDashboard();
  
  return (
    <header className="bg-purple-700 text-white p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-xl font-bold">
              {userData.level}
            </div>
            <div>
              <h1 className="text-xl font-bold">{userData.username}</h1>
              <p className="text-sm">Mighty Adventurer</p>
            </div>
          </div>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* Health Bar */}
            <div className="flex flex-col">
              <span className="text-xs mb-1">Health</span>
              <div className="w-32 h-4 bg-gray-300 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500" 
                  style={{ width: `${(userData.health / userData.maxHealth) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs mt-1">{userData.health}/{userData.maxHealth}</span>
            </div>
            
            {/* Experience Bar */}
            <div className="flex flex-col">
              <span className="text-xs mb-1">Experience</span>
              <div className="w-32 h-4 bg-gray-300 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400" 
                  style={{ width: `${(userData.experience / userData.maxExperience) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs mt-1">{userData.experience}/{userData.maxExperience}</span>
            </div>
            
            {/* Currency */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-yellow-300 flex items-center justify-center mr-1">
                  <span className="text-yellow-800 text-xs">G</span>
                </div>
                <span>{userData.gold}</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-purple-300 flex items-center justify-center mr-1">
                  <span className="text-purple-800 text-xs">G</span>
                </div>
                <span>{userData.gems}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

'use client'
import React from 'react';
import Header from './Header';
import HabitsList from './HabitsList';
import DailiesList from './DailiesList';
import TodosList from './TodosList';
import RewardsList from './RewardsList';
import Footer from './Footer';
import { DashboardProvider } from '../context/DashboardContext';

const Dashboard: React.FC = () => {
  return (
    <DashboardProvider>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        
        <main className="flex-grow container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HabitsList />
            <DailiesList />
            <TodosList />
            <RewardsList />
          </div>
        </main>
        
        <Footer />
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;

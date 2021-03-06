import React from 'react';
import Version from '../Version'
import UserHeader from './UserHeader';
import StatBar from './StatBar';
import MainMenu from './MainMenu';
import DashHeader from '../DashHeader';

const Dashboard = () => (
  <div className='route-transition enter-left exit-left'>
    <DashHeader />
    <UserHeader />
    <StatBar />
    <MainMenu />
    <Version />
  </div>
);

export default Dashboard;

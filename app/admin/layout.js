
import React from 'react';
import SideNav from './_components/SideNav';
import Provider from './Provider';

function AdminLayout({ children }) {
  return (
    <div className='flex flex-col md:flex-row'>
      {/* Side Navigation */}
      <div className='w-full md:w-16 fixed md:inset-y-0 md:left-0 bg-black/60 backdrop-blur-lg z-50'>
        <SideNav />
      </div>
      {/* Main Content */}
      <div className='flex-1 mt-16 md:mt-0 md:ml-16 p-4'>
        <Provider>{children}</Provider>
      </div>
    </div>
  );
}

export default AdminLayout;
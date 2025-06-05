
'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import { BarChart, Brush, HomeIcon, Layers3, Settings, User, Menu, X } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { db } from '../../../utils';
import { userInfo } from '../../../utils/schema';
import { eq } from 'drizzle-orm';

function SideNav() {
  const { user } = useUser();
  const pathname = usePathname();
  const [username, setUsername] = useState('default');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      GetUsernameFromDatabase(user.primaryEmailAddress.emailAddress);
    }
  }, [user]);

  const GetUsernameFromDatabase = async (email) => {
    try {
      const userData = await db.select().from(userInfo).where(eq(userInfo.email, email));
      setUsername(userData.length > 0 ? userData[0].username : 'default');
    } catch (error) {
      console.error('Error fetching username:', error);
      setUsername('default');
    }
  };

  const menuList = [
    { id: 1, name: 'Home', icon: HomeIcon, path: '/' },
    { id: 2, name: 'Pages', icon: Layers3, path: '/admin' },
    { id: 3, name: 'My Portfolio', icon: User, path: `/${username}` },
    { id: 4, name: 'Style', icon: Brush, path: '/admin/style' },
    { id: 5, name: 'Stats', icon: BarChart, path: '/admin/analytics' },
    // { id: 6, name: 'Settings', icon: Settings, path: '/admin/setting' },
  ];

  return (
    <>
      {/* Light Navbar with Dark Hamburger */}
      <div className="md:hidden flex justify-between items-center p-4 bg-black/80 backdrop-blur-lg fixed top-0 inset-x-0 z-50">
        <UserButton />
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition duration-200"
        >
          <Menu className="text-white w-6 h-6" />
        </button>
      </div>

      {/* Mobile Sidebar (Dark) */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-gray-950 p-6 shadow-xl flex flex-col space-y-4 transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 md:hidden`}
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-800 transition duration-200"
          >
            <X className="text-white w-6 h-6" />
          </button>
        </div>

        {/* Dark Menu List with Background Fix */}
        <div className="bg-gray-950 p-2 rounded-lg shadow-lg">
          {menuList.map((menu) => (
            <Link
              href={menu.path}
              key={menu.id}
              className={`p-3 text-sm rounded-lg flex items-center space-x-3 text-gray-300 transition-all duration-300 hover:bg-gray-800 ${
                pathname === menu.path ? 'bg-primary text-white' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <menu.icon className="w-5 h-5 text-white" />
              <span>{menu.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop SideNav (Light) */}
      <div className="hidden md:flex flex-col fixed inset-y-0 left-0 w-16 bg-black/80 backdrop-blur-lg p-4 space-y-4 z-50">
        {menuList.map((menu) => (
          <Link
            href={menu.path}
            key={menu.id}
            className={`p-2 rounded-lg flex items-center justify-center text-xs transition-all duration-300 ${
              pathname === menu.path ? 'bg-primary' : 'hover:bg-gray-700'
            }`}
          >
            <menu.icon className="w-5 h-5 text-white" />
          </Link>
        ))}
        <div className="mt-auto flex justify-center">
          <UserButton />
        </div>
      </div>
    </>
  );
}

export default SideNav;

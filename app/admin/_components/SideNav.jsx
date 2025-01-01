import { UserButton } from '@clerk/nextjs'
import { BarChart, Brush, Layers3, Settings } from 'lucide-react'
import React from 'react'

function SideNav() {
  const menuList=[
    {
      id:1,
      name:'Pages',
      icon:Layers3
    },
    {
      id:1,
      name:'Style',
      icon:Brush
    },
    {
      id:1,
      name:'Stats',
      icon:BarChart
    },
    {
      id:1,
      name:'Settings',
      icon:Settings
    }
  ]
  return (
    <div className='p-4 bg-[#00000052] h-screen'>
      {menuList.map((menu, index) => (
         <div key={menu.id} className='p-2 py-4 rounded-lg bg-primary flex items-center justify-center mb-5
         tooltip-secondary tooltip tooltip-right'>
            <menu.icon className='text-white text-center' />
         </div>
      ))}

      <div className='fixed bottom-5 px-4'>
        <UserButton/>
      </div>
    </div>  
  )
}

export default SideNav
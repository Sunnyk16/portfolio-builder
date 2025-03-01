import { UserButton } from '@clerk/nextjs'
import { BarChart, Brush, HomeIcon, Layers3, Settings } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function SideNav() {
  const menuList=[
    {
      id:1,
      name:'Home',
      icon:HomeIcon,
      path:'/'

    },
    {
      id:1,
      name:'Pages',
      icon:Layers3,
      path:'/admin'
    },
    
    {
      id:1,
      name:'Style',
      icon:Brush,
      path:'/admin/style'
    },
    {
      id:1,
      name:'Stats',
      icon:BarChart,
      path:'/admin/analytics'
    },
    {
      id:1,
      name:'Settings',
      icon:Settings,
      path:'/admin/setting'
    }
  ]
  return (
    <div className='p-4 bg-[#00000052] h-screen'>
      {menuList.map((menu, index) => (
         <Link href={menu.path} key={menu.id} className='p-2 py-4 rounded-lg bg-primary flex items-center justify-center mb-5
         tooltip-secondary tooltip tooltip-right' data-tip={menu.name}>
            <menu.icon className='text-white text-center' />
         </Link>
      ))}

      <div className='fixed bottom-5 px-4'>
        <UserButton/>
      </div>
    </div>  
  )
}

export default SideNav
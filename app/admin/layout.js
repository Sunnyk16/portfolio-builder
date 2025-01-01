import React from 'react'
import SideNav from './_components/SideNav'

function AdminLayout({children}) {
  return (
    <div>
      <div className='w-24 fixed'>
        <SideNav/>
      </div>
      <div className='ml-24'>{children}</div>
    </div>
   )
}

export default AdminLayout
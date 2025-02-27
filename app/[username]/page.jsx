// 'use client'
// import React, { useContext } from 'react'
// import ProjectListEdit from '../[username]/_components/ProjectList'
// import UserDetailInfo from '../[username]/_components/UserDetailInfo'
// import { UserDetailContext } from './Provider';



// function UserPage() {
//   const { userDetails, setUserDetails } = useContext(UserDetailContext) || {};
//   console.log(`user details on page`+ userDetails);
  
//   return (
//     <div className='p-3 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-5'>
//       <div>
//         <UserDetailInfo userDetails={userDetails}/>
//       </div>
//       <div className='md:col-span-2'>
//         <ProjectListEdit projectList={userDetails?.project || []}/>
//       </div>
//     </div>
//   )
// }

// export default UserPage

'use client'
import React, { useContext } from 'react';
import ProjectList from '../[username]/_components/ProjectList';
import UserDetailInfo from '../[username]/_components/UserDetailInfo';
import { UserDetailContext } from './Provider';

function UserPage() {
  const { userDetails, projects } = useContext(UserDetailContext) || {};
  

  return (
    <div className='p-3 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-5'>
      <div>
        <UserDetailInfo userDetails={userDetails} />
      </div>
      <div className='md:col-span-2'>
        <ProjectList projectList={projects} />
      </div>
    </div>
  );
}

export default UserPage;

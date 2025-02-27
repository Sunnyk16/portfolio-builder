// import React from 'react';
// import { userInfo } from '../../../utils/schema';

// function ProjectList({ projectList }) {
//     console.log(projectList);

//   return (
//     <div className=' grid grid-cols-1 md:grid-cols-2 gap-7'>
//       {projectList?.map((project, index) => (
//         <div key={project.id} className='border shadow-sm rounded-lg'>

//           {/* <TwicPicture src={project.logo} className='w-40 rounded-full' /> */}
//           <img src={project.logo} className='w-40 rounded-full' />
//           <h2>{project?.name}</h2>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ProjectList;
import Link from 'next/link';
import React from 'react';

function ProjectList({ projectList }) {
  console.log("Projects:", projectList);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
      {projectList?.map((project) => (
        <Link href={project?.url} key={project.id} className='border shadow-sm rounded-lg p-4 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
          <div className='flex gap-2 items-center'>
            <img src={project.logo} alt={project.name} className='w-40 rounded-full' />
            <h2 className='font-bold justify-between flex items-center w-full'>{project.name}
            <div className='badge badge-accent text-xs font-normal hidden md:block'>
              {project.category}
            </div>
            </h2>
          </div>
          <h2 className='text-base-content/80 text-xs lg:text-sm my-2'>{project.description}</h2>
        </Link>
      ))}
    </div>
  );
}

export default ProjectList;

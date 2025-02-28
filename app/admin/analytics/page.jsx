import React from 'react'
import ProjectVisitors from './_components/ProjectVisitors';
import UniqueVisitors from './_components/UniqueVisitors';

function Analytics() {
  return (
    <div>
        <div className='h-screen p-10'>
            <h2 className='font-bold text-2xl mt-10 '>
                Analytics
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2  gap-10 my-10'>
                <div>
                    {/* total unique visitors */}
                    <UniqueVisitors />
                </div>
                <div>
                    {/* total project view */}
                    <ProjectVisitors />
                </div>
                {/* <div>
                    Total Subscriber
                </div>
                
                <div>
                    coming soon...
                </div> */}

            </div>
        </div>
    </div>
  )
}

export default Analytics
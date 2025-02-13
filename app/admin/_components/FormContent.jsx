import React, { useEffect } from 'react'
import BasicDetail from './BasicDetail'
import AddProject from './AddProject'
import { db } from '../../../utils'
import { project } from '../../../utils/schema'
import { eq ,desc} from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import ProjectListEdit from './ProjectListEdit'



function FormtContent() {

  const { user } = useUser();
  const [projectList,setProjectList]=useState([])

  useEffect(()=>{
    user && GetProjectList()
  },[user])

  const GetProjectList=async()=>{
    const result =await db.select().from(project).where(eq(project.emailRef,user?.primaryEmailAddress?.emailAddress)).orderBy(desc(project.id))

    console.log(result);
    
    setProjectList(result)

  }

  

  return (
    <div className='py-12 px-6 overflow-auto'>
      <h2 className='text-bold text-3xl'>Start Designing Your portfolio page</h2>
      <BasicDetail/>
      <hr className='my-5'></hr>
      <AddProject/>

      <ProjectListEdit projectList={projectList} refreshData={GetProjectList}/>
      
    </div>
  )
}

export default FormtContent

import React, { useEffect, useState } from 'react';
import BasicDetail from './BasicDetail';
import AddProject from './AddProject';
import { db } from '../../../utils';
import { project } from '../../../utils/schema';
import { eq, asc } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import ProjectListEdit from './ProjectListEdit';

function FormContent() {
  const { user } = useUser();
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    user && GetProjectList();
  }, [user]);

  const GetProjectList = async () => {
    const result = await db.select().from(project).where(eq(project.emailRef, user?.primaryEmailAddress?.emailAddress)).orderBy(asc(project.order));
    setProjectList(result);
  };

  return (
    <div className='py-12 px-6 overflow-auto'>
      <h2 className='font-bold text-3xl'>Start Designing Your Portfolio Page</h2>
      <BasicDetail />
      <hr className='my-5' />
      <AddProject />
      <ProjectListEdit projectList={projectList} refreshData={GetProjectList} />
    </div>
  );
}

export default FormContent;
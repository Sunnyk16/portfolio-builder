'use client';
import { eq, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { project, ProjectClicks, userInfo } from '../../../../utils/schema';
import { db } from '../../../../utils';
import { useUser } from '@clerk/nextjs';
import { BarChart, Bar, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';

function ProjectVisitors() {
    const { user } = useUser();
    const [data, setData] = useState([])
    useEffect(() => {
        user && ProjectAnalyticData();
    }, [user])
    const ProjectAnalyticData = async () => {
        try {

            const result = await db
                .select({
                    totalClicks: sql`COUNT(${ProjectClicks.id})`.as("totalClicks"),
                    projectId: ProjectClicks.projectRef,
                    name: project.name
                })
                .from(ProjectClicks)
                .innerJoin(project, eq(ProjectClicks.projectRef, project.id))
                .innerJoin(userInfo, eq(project.userRef, userInfo.id))
                .where(eq(userInfo.email, user?.primaryEmailAddress?.emailAddress))
                .groupBy(ProjectClicks.projectRef, project.name);
            setData(result)
            console.log("Analytics Result 2:", result);

        } catch (error) {
            console.error("Error fetching analytics data:", error);
        }
    };
    return (
        <div className='border rounded-lg p-7'>
            <h2 className='font-bold text-lg my-3'>Project Visitors</h2>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalClicks" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ProjectVisitors
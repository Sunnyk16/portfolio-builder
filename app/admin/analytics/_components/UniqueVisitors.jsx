'use client';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import { project, ProjectClicks, userInfo } from '../../../../utils/schema';
import { db } from '../../../../utils';
import { eq, sql } from 'drizzle-orm';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { dummyUniqueVisitor } from '../../../_data/GraphData';

function UniqueVisitors() {
    const { user } = useUser();
    const [data, setData] = useState()
    useEffect(() => {
        user && GetTotalVisitors()
    }, [user])
    const GetTotalVisitors = async () => {
        try {

            const result = await db
                .select({
                    totalClicks: sql`COUNT(${ProjectClicks.id})`.as("totalClicks"),
                    //   projectId: ProjectClicks.projectRef,
                })
                .from(ProjectClicks)
                .innerJoin(project, eq(ProjectClicks.projectRef, project.id))
                .innerJoin(userInfo, eq(project.userRef, userInfo.id))
                .where(eq(userInfo.email, user?.primaryEmailAddress?.emailAddress))
                .groupBy(ProjectClicks.month);



            //   console.log("Analytics Result  1:", result);
            const finalResult = [...dummyUniqueVisitor, ...result]
            setData(result)

        } catch (error) {
            console.error("Error fetching analytics data:", error);
        }
    }
    return (
        <div className='border rounded-lg p-7'>
            <h2  className='font-bold text-lg my-3' >Unique Visitors</h2>
            <ResponsiveContainer width={"100%"} height={250}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#333" }}
                    tickFormatter={(month) => month.charAt(0).toUpperCase() + month.slice(1)} // Capitalize month names
                />
                <YAxis tick={{ fontSize: 12, fill: "#333" }} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip contentStyle={{ backgroundColor: "#f5f5f5", border: "none", borderRadius: "5px" }} />
                <Area type="monotone" dataKey="totalClicks" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
        </ResponsiveContainer></div>
    )
}

export default UniqueVisitors
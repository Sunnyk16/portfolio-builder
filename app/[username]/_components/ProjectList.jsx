
"use client";
import { project, ProjectClicks, userInfo } from "../../../utils/schema";
import moment, { months } from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AnalyticChart from "./AnalyticChart";
import { eq, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../utils";

function ProjectList({ projectList }) {
  const { user } = useUser();
  const [projectClickData, setProjectClickData] = useState([])

  useEffect(() => {
    if (user) {
      ProjectAnalyticData();
    }
  }, [user]);

  const OnProjectClick = async (project) => {
    if (!project?.id) {
      console.error("Error: Project ID is null or undefined", project);
      return;
    }

    try {
      await db.insert(ProjectClicks).values({
        month: moment().format("MMM"),
        projectRef: project.id,
      });

      console.log("Project click recorded:", project.id);
      window.open(project.url, "_blank");
    } catch (error) {
      console.error("Error inserting project click:", error);
    }
  };

  const ProjectAnalyticData = async () => {
    try {
      const result = await db
        .select({
          totalClicks: sql`COUNT(${ProjectClicks.id})`.as("totalClicks"),
          projectId: ProjectClicks.projectRef,
        })
        .from(ProjectClicks)
        .innerJoin(project, eq(ProjectClicks.projectRef, project.id))
        .innerJoin(userInfo, eq(project.userRef, userInfo.id))
        .where(eq(userInfo.email, user?.primaryEmailAddress?.emailAddress))
        .groupBy(ProjectClicks.projectRef, ProjectClicks.month);

      setProjectClickData(result)

      console.log("Analytics Result:", result);

    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };
 
  const GetprojectWiseAnalyticData = (projectId) => {
    let resp = projectClickData?.filter((project) => project.projectId == projectId);
  
    // Default months to prevent empty graphs
    let defaultData = [
      { month: "Jan", totalClicks: 0 },
      { month: "Feb", totalClicks: 0 },
      { month: "Mar", totalClicks: 0 },
      { month: "Apr", totalClicks: 0 },
      { month: "May", totalClicks: 0 },
    ];
  
    // Ensure we have valid response data
    if (!resp.length) {
      return defaultData;
    }
  
    // Map the API response to ensure correct month mapping
    let formattedData = resp.map((item) => ({
      month: item.month,  // Assuming `month` exists in the database
      totalClicks: parseInt(item.totalClicks) || 0,
    }));
  
    return formattedData.length ? formattedData : defaultData;
  };
  
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-7 my-5">
      {projectList?.map((project) => (
        <div
          key={project.id}
          className="border shadow-sm rounded-lg p-4 hover:scale-95 transition-all hover:shadow-md cursor-pointer"
          onClick={() => OnProjectClick(project)}
        >
          <div className="flex gap-2 items-center">
            <img
              src={project.logo}
              alt={project.name}
              className="w-40 rounded-full"
            />
            <h2 className="font-bold justify-between flex items-center w-full">
              {project.name}
              <div className="badge badge-accent text-xs font-normal hidden md:block">
                {project.category}
              </div>
            </h2>
          </div>
          <h2 className="text-base-content/80 text-xs lg:text-sm my-2">
            {project.description}
          </h2>
          {project?.showGraph&& <AnalyticChart data={GetprojectWiseAnalyticData(project.id)} />}
        </div>
      ))}
    </div>
  );
}

export default ProjectList;

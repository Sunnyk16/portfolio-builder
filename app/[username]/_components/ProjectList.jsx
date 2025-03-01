
"use client";
import { project, ProjectClicks, userInfo } from "../../../utils/schema";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AnalyticChart from "./AnalyticChart";
import { eq, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../utils";
import { motion } from "framer-motion";

function ProjectList({ projectList }) {
  const { user } = useUser();
  const [projectClickData, setProjectClickData] = useState([]);

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

      setProjectClickData(result);
      console.log("Analytics Result:", result);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  const GetprojectWiseAnalyticData = (projectId) => {
    let resp = projectClickData?.filter((project) => project.projectId == projectId);

    let defaultData = [
      { month: "Jan", totalClicks: 0 },
      { month: "Feb", totalClicks: 0 },
      { month: "Mar", totalClicks: 0 },
      { month: "Apr", totalClicks: 0 },
      { month: "May", totalClicks: 0 },
    ];

    if (!resp.length) {
      return defaultData;
    }

    let formattedData = resp.map((item) => ({
      month: item.month,
      totalClicks: parseInt(item.totalClicks) || 0,
    }));

    return formattedData.length ? formattedData : defaultData;
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger animations for child elements
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Heading */}
      {/* <motion.h2
        className="text-3xl font-bold text-gray-800 mb-8"
        variants={itemVariants}
      >
        Projects
      </motion.h2> */}

      {/* Project List */}
      <div className="flex flex-col gap-6">
        {projectList?.map((project) => (
          <motion.div
            key={project.id}
            className="bg-white flex flex-col md:flex-row items-center gap-4 md:gap-6 rounded-lg shadow-lg p-4 md:p-6 hover:shadow-xl hover:scale-[0.98] transition-all duration-300 cursor-pointer w-full"
            onClick={() => OnProjectClick(project)}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }} // Hover effect
          >
            {/* Project Logo */}
            <motion.img
              src={project.logo}
              alt={project.name}
              className="w-20 h-20 md:w-28 md:h-28 rounded-lg border-2 border-primary shadow-sm"
              whileHover={{ rotate: 5 }} // Logo rotation on hover
            />

            {/* Project Details */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-bold text-lg md:text-xl text-gray-800 flex flex-col md:flex-row items-center justify-between gap-2">
                {project.name}
                <span className="text-xs md:text-sm font-normal bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {project.category}
                </span>
              </h2>
              <p className="text-gray-600 text-sm mt-2">{project.description}</p>

              {/* Analytics Chart */}
              {project?.showGraph && (
                <div className="mt-4">
                  <AnalyticChart data={GetprojectWiseAnalyticData(project.id)} />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default ProjectList;

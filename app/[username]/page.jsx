

'use client';
import React, { useContext } from 'react';
import ProjectList from '../[username]/_components/ProjectList';
import UserDetailInfo from '../[username]/_components/UserDetailInfo';
import { UserDetailContext } from './Provider';
import { motion } from 'framer-motion';

function UserPage() {
  const { userDetails, projects } = useContext(UserDetailContext) || {};

  // Framer Motion Variants for Animations
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

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="p-3 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-5 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* User Detail Info Section */}
      <motion.div variants={itemVariants}>
        <UserDetailInfo userDetails={userDetails} />
      </motion.div>

      {/* Projects Section */}
      <motion.div className="md:col-span-2" variants={itemVariants}>
        {/* Interactive Text */}
        <motion.h1
          className="text-4xl font-bold text-gray-800 mb-8"
          variants={textVariants}
          whileHover={{ scale: 1.05, color: '#6D28D9' }} // Interactive hover effect
          transition={{ type: 'spring', stiffness: 300 }}
        >
          My Projects
          {/* <motion.span
            className="text-primary ml-2"
            animate={{ opacity: [0, 1, 0] }} // Blinking effect
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ✨
          </motion.span> */}
        </motion.h1>

        {/* Project List */}
        <ProjectList projectList={projects} />
      </motion.div>
    </motion.div>
  );
}

export default UserPage;
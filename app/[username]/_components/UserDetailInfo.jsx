
"use client";
import React from "react";
import { MapPin, Share } from "lucide-react";
import { motion } from "framer-motion";

function UserDetailInfo({ userDetails }) {
  if (!userDetails)
    return <p className="text-center text-gray-500">No user details available</p>;

  // Share Profile Functionality
  const handleShareProfile = async () => {
    const profileUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: userDetails.name,
          text: `Check out ${userDetails.name}'s profile!`,
          url: profileUrl,
        });
        console.log("Profile shared successfully!");
      } catch (error) {
        console.error("Error sharing profile:", error);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(profileUrl);
        alert("Profile link copied to clipboard! 📋");
      } catch (error) {
        console.error("Error copying to clipboard:", error);
      }
    }
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
      className="flex flex-col items-center md:items-center md:justify-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Profile Card */}
      <motion.div
        className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-xl flex flex-col items-center transform hover:scale-105 transition-transform duration-300"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }} // Hover effect
      >
        {/* User Image */}
        <motion.div
          className="flex justify-center"
          variants={itemVariants}
          whileHover={{ rotate: 5 }} // Logo rotation on hover
        >
          <img
            src={userDetails.profileImage}
            alt="Profile"
            className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full border-4 border-primary shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </motion.div>

        {/* User Info */}
        <motion.div className="text-center mt-6" variants={itemVariants}>
          <h2 className="font-bold text-2xl md:text-3xl text-gray-800">
            {userDetails.name}
          </h2>
          <h3 className="flex justify-center items-center gap-2 text-gray-600 mt-2">
            <MapPin className="w-5 h-5 text-primary" /> {userDetails.location}
          </h3>
        </motion.div>

        {/* Bio */}
        <motion.p
          className="mt-4 text-gray-600 text-sm md:text-base text-center"
          variants={itemVariants}
        >
          {userDetails.bio}
        </motion.p>

        {/* Share Button */}
        <motion.button
          onClick={handleShareProfile}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg shadow-md hover:bg-primary-dark hover:shadow-lg transition-all duration-300 mt-6"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }} // Button hover effect
        >
          <Share className="w-4 h-4" /> Share Profile
        </motion.button>
      </motion.div>

      {/* Subscription Section */}
      <motion.div
        className="w-full max-w-lg mt-8 p-6 bg-white rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }} // Hover effect
      >
        <h3 className="font-semibold text-xl text-gray-800 text-center">
          Subscribe to Updates
        </h3>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <motion.input
            type="text"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
            variants={itemVariants}
          />
          <motion.button
            className="bg-primary text-white px-6 py-2 rounded-lg shadow-md hover:bg-primary-dark hover:shadow-lg transition-all duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }} // Button hover effect
          >
            Subscribe
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default UserDetailInfo;
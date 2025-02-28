
import React from "react";
import { MapPin, Share } from "lucide-react";

function UserDetailInfo({ userDetails }) {
  if (!userDetails) return <p className="text-center text-gray-500">No user details available</p>;

  return (
    <div className="flex flex-col items-center md:items-center md:justify-center md:h-screen p-6 bg-gray-50">
      {/* Profile Card */}
      <div className="w-full max-w-lg p-6 bg-white rounded-xl shadow-md flex flex-col items-center">
        {/* User Image (Centered) */}
        <div className="flex justify-center">
          <img
            src={userDetails.profileImage}
            alt="Profile"
            className="w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-full border-4 border-primary shadow-lg"
          />
        </div>

        {/* User Info */}
        <div className="text-center mt-4">
          <h2 className="font-bold text-xl md:text-2xl text-gray-800">{userDetails.name}</h2>
          <h3 className="flex justify-center items-center gap-2 text-gray-600 mt-2">
            <MapPin className="w-5 h-5 text-primary" /> {userDetails.location}
          </h3>
        </div>

        {/* Bio */}
        <p className="mt-4 text-gray-600 text-sm md:text-base text-center">
          {userDetails.bio}
        </p>

        {/* Share Button */}
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary-dark transition mt-4 md:hidden">
          <Share className="w-4 h-4" /> Share
        </button>
      </div>

      {/* Subscription Section */}
      <div className="w-full max-w-lg mt-6 p-4 bg-white rounded-xl shadow-md">
        <h3 className="font-semibold text-lg text-gray-800 text-center">Subscribe to Updates</h3>
        <div className="flex flex-col md:flex-row gap-3 mt-3">
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="bg-primary text-white px-5 py-2 rounded-lg shadow-md hover:bg-primary-dark transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetailInfo;

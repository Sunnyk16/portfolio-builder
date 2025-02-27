import { MapPin } from "lucide-react";

function UserDetailInfo({ userDetails }) {
  const userInfo = Array.isArray(userDetails) && userDetails.length > 0 ? userDetails[0].userInfo : null; // Extract userInfo from the first element

  if (!userInfo) return <p>No user details available</p>;

  return (
    <div className="flex flex-col md:justify-center h-screen md:h-screen">
      <div className="w-full flex items-center justify-between ">
        <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0">
          <img src={userInfo?.profileImage} className="w-[90px] h-[90px] md:w-[130px] md:h-[130px] rounded-full" />
        </div>
        <div className="flex flex-col gap-4 mt-4"> 
          <h2 className="font-bold text-lg md:text-2xl">{userInfo?.name}</h2>
          <h2 className="flex gap-2 items-center">
            <MapPin /> {userInfo?.location}
          </h2>
        </div>
        
      </div>
      <h2 className="my-5">
          {userInfo?.bio}
        </h2>
        <div className="flex gap-2">
        <input type="text" placeholder="Add Your Email" className="input input-bordered w-full max-w-xs" />
        <button className="btn btn-primary" >Subscribe</button>
        </div>
    </div>
  );
}

export default UserDetailInfo;

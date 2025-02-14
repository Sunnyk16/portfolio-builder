// import { Camera, Link2, MapPin } from 'lucide-react'
// import React, { useContext, useEffect, useState } from 'react'
// import { db } from '../../../utils';
// import { userInfo } from '../../../utils/schema';
// import { toast } from 'react-toastify';
// import { eq } from 'drizzle-orm';
// import { useUser } from '@clerk/nextjs';

// import { UserDetailContext } from '../Provider';

// function BasicDetail() {
//     let timeoutId;
//     const { user } = useUser();

//     const { userDetails, setUserDetails } = useContext(UserDetailContext);
//     const [selectedOption, setSelectedOption] = useState('')

//     useEffect(() => {
//         userDetails && console.log(userDetails);

//     }, [userDetails])






//     const onInputChange = (event, fieldName) => {

//         clearTimeout(timeoutId)
//         timeoutId = setTimeout(async () => {
//             const result = await db.update(userInfo).set({ [fieldName]: event.target.value }).where(eq(userInfo.email, user?.primaryEmailAddress.emailAddress));

//             if (result) {
//                 toast.success('saved', { position: 'top-right' })
//             }
//             else {
//                 toast.error('Error', { position: 'top-right' })
//             }
//         }, 1000)
//     }

//     const handleFileUpload=async(event)=>{
//         const file=event.target.files[0];
//         console.log(file);
        


//     }
//     return (
//         <div className='p-7 rounded-lg bg-gray-800 my-7'>
//             <div className='flex gap-6 items-center'>

//                 <label htmlFor='file-input'>
//                 <Camera className='p-3 h-12 w-12 bg-gray-500 rounded-full cursor-pointer' />
//                 </label>
//                 <input type='file' id='file-input' style={{display:'none'}}
//                 onChange={handleFileUpload} accept='image/png,img/jpeg ,img/jpg ,img/gif'
//                 /> 

//                 <input type="text" placeholder="Username"
//                     defaultValue={userDetails?.name}

//                     onChange={(event) => onInputChange(event, 'name')}
//                     className="input input-bordered w-full " />

//             </div>
//             <textarea className="textarea textarea-bordered w-full mt-3  " onChange={(event) => onInputChange(event, 'bio')}
//                 defaultValue={userDetails?.bio} placeholder="Write About yourself"></textarea>

//             <div>
//                 <div className='flex gap-3 mt-3 '>
//                     <MapPin className={`h-14 w-12  p-3 rounded-md text-blue-500
//                 hover:bg-gray-600 ${selectedOption == 'location' && 'bg-gray-600'}  `} onClick={() => setSelectedOption('location')} />
//                     <Link2 className={`h-14 w-12  p-3 rounded-md text-yellow-500
//                 hover:bg-gray-600 ${selectedOption == 'link' && 'bg-gray-600'}`} onClick={() => setSelectedOption('link')} />
//                 </div>

//                 {selectedOption == 'location' ?
//                     <div className='mt-3'>
//                         <label className="input input-bordered flex items-center gap-2">
//                             <MapPin />
//                             <input type="text" className="grow" placeholder="location"
//                                 onChange={(event) => onInputChange(event, 'location')}
//                                 key={1}
//                                 defaultValue={userDetails?.location} />
//                         </label>
//                     </div>
//                     : selectedOption == 'link' ?
//                         <div className='mt-3'>
//                             {/* .... */}
//                             <label className="input input-bordered flex items-center gap-2">
//                                 <Link2 />
//                                 <input type="text" className="grow" placeholder="URL"
//                                     onChange={(event) => onInputChange(event, 'link')}
//                                     defaultValue={userDetails?.link}
//                                     key={2} />
//                             </label>
//                         </div>
//                         : null
//                 }
//             </div>


//         </div>
//     )
// }

// export default BasicDetail
import { Camera, Link2, MapPin } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../../utils';
import { userInfo } from '../../../utils/schema';
import { toast } from 'react-toastify';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { CldUploadWidget } from 'next-cloudinary';
import { UserDetailContext } from '../Provider';

function BasicDetail() {
    let timeoutId;
    const { user } = useUser();

    const { userDetails, setUserDetails } = useContext(UserDetailContext);
    const [selectedOption, setSelectedOption] = useState('');
    const [profilePicture, setProfilePicture] = useState(userDetails?.profilePicture || '');

    useEffect(() => {
        userDetails && console.log(userDetails);
    }, [userDetails]);

    const onInputChange = (event, fieldName) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
            const result = await db
                .update(userInfo)
                .set({ [fieldName]: event.target.value })
                .where(eq(userInfo.email, user?.primaryEmailAddress.emailAddress));

            if (result) {
                toast.success('Saved', { position: 'top-right' });
            } else {
                toast.error('Error', { position: 'top-right' });
            }
        }, 1000);
    };

    const handleUploadSuccess = async (result) => {
        if (result && result.info.secure_url) {
            const imageUrl = result.info.secure_url;
            console.log('Uploaded URL:', imageUrl);
            

            // Save the uploaded URL to the database
            const uploadResult = await db
                .update(userInfo)
                .set({ profilePicture: imageUrl }) 
                .where(eq(userInfo.email, user?.primaryEmailAddress.emailAddress));

            if (uploadResult) {
                toast.success('Profile picture updated successfully!', { position: 'top-right' });
                setProfilePicture(imageUrl); 
                setUserDetails((prevDetails) => ({
                    ...prevDetails,
                    profilePicture: imageUrl,
                }));
            } else {
                toast.error('Failed to update profile picture!', { position: 'top-right' });
            }
        }
    };

    return (
        <div className="p-7 rounded-lg bg-gray-800 my-7">
            <div className="flex gap-6 items-center">
                {/* Profile Picture */}
                <div className="relative">
                    <img
                        src={profilePicture || '/default-profile.png'} // Fallback to a default image
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-600"
                    />
                    {/* Cloudinary Upload Widget */}
                    <CldUploadWidget
                        uploadPreset="portfolio-developer" // Replace with your Cloudinary upload preset
                        onSuccess={(result) => handleUploadSuccess(result)}
                    >
                        {({ open }) => (
                            <Camera
                                className="absolute bottom-0 right-0 p-2 h-8 w-8 bg-gray-500 rounded-full cursor-pointer"
                                onClick={() => open()}
                            />
                        )}
                    </CldUploadWidget>
                </div>

                {/* Username Input */}
                <input
                    type="text"
                    placeholder="Username"
                    defaultValue={userDetails?.name}
                    onChange={(event) => onInputChange(event, 'name')}
                    className="input input-bordered w-full"
                />
            </div>

            {/* Bio Input */}
            <textarea
                className="textarea textarea-bordered w-full mt-3"
                onChange={(event) => onInputChange(event, 'bio')}
                defaultValue={userDetails?.bio}
                placeholder="Write about yourself"
            ></textarea>

            {/* Additional Details */}
            <div>
                <div className="flex gap-3 mt-3">
                    <MapPin
                        className={`h-14 w-12 p-3 rounded-md text-blue-500 hover:bg-gray-600 ${
                            selectedOption == 'location' && 'bg-gray-600'
                        }`}
                        onClick={() => setSelectedOption('location')}
                    />
                    <Link2
                        className={`h-14 w-12 p-3 rounded-md text-yellow-500 hover:bg-gray-600 ${
                            selectedOption == 'link' && 'bg-gray-600'
                        }`}
                        onClick={() => setSelectedOption('link')}
                    />
                </div>

                {selectedOption == 'location' ? (
                    <div className="mt-3">
                        <label className="input input-bordered flex items-center gap-2">
                            <MapPin />
                            <input
                                type="text"
                                className="grow"
                                placeholder="Location"
                                onChange={(event) => onInputChange(event, 'location')}
                                key={1}
                                defaultValue={userDetails?.location}
                            />
                        </label>
                    </div>
                ) : selectedOption == 'link' ? (
                    <div className="mt-3">
                        <label className="input input-bordered flex items-center gap-2">
                            <Link2 />
                            <input
                                type="text"
                                className="grow"
                                placeholder="URL"
                                onChange={(event) => onInputChange(event, 'link')}
                                defaultValue={userDetails?.link}
                                key={2}
                            />
                        </label>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default BasicDetail;

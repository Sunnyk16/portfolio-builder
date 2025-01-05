import { Camera, Link2, MapPin } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../../utils';
import { userInfo } from '../../../utils/schema';
import { toast } from 'react-toastify';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';

import { UserDetailContext } from '../Provider';

function BasicDetail() {
    let timeoutId;
    const { user } = useUser();

    const { userDetails, setUserDetails } = useContext(UserDetailContext);
    const [selectedOption, setSelectedOption] = useState('')

    useEffect(() => {
        userDetails && console.log(userDetails);

    }, [userDetails])






    const onInputChange = (event, fieldName) => {

        clearTimeout(timeoutId)
        timeoutId = setTimeout(async () => {
            const result = await db.update(userInfo).set({ [fieldName]: event.target.value }).where(eq(userInfo.email, user?.primaryEmailAddress.emailAddress));

            if (result) {
                toast.success('saved', { position: 'top-right' })
            }
            else {
                toast.error('Error', { position: 'top-right' })
            }
        }, 1000)
    }

    const handleFileUpload=async(event)=>{
        const file=event.target.files[0];
        console.log(file);
        


    }
    return (
        <div className='p-7 rounded-lg bg-gray-800 my-7'>
            <div className='flex gap-6 items-center'>

                <label htmlFor='file-input'>
                <Camera className='p-3 h-12 w-12 bg-gray-500 rounded-full cursor-pointer' />
                </label>
                <input type='file' id='file-input' style={{display:'none'}}
                onChange={handleFileUpload} accept='image/png,img/jpeg ,img/jpg ,img/gif'
                /> 

                <input type="text" placeholder="Username"
                    defaultValue={userDetails?.name}

                    onChange={(event) => onInputChange(event, 'name')}
                    className="input input-bordered w-full " />

            </div>
            <textarea className="textarea textarea-bordered w-full mt-3  " onChange={(event) => onInputChange(event, 'bio')}
                defaultValue={userDetails?.bio} placeholder="Write About yourself"></textarea>

            <div>
                <div className='flex gap-3 mt-3 '>
                    <MapPin className={`h-14 w-12  p-3 rounded-md text-blue-500
                hover:bg-gray-600 ${selectedOption == 'location' && 'bg-gray-600'}  `} onClick={() => setSelectedOption('location')} />
                    <Link2 className={`h-14 w-12  p-3 rounded-md text-yellow-500
                hover:bg-gray-600 ${selectedOption == 'link' && 'bg-gray-600'}`} onClick={() => setSelectedOption('link')} />
                </div>

                {selectedOption == 'location' ?
                    <div className='mt-3'>
                        <label className="input input-bordered flex items-center gap-2">
                            <MapPin />
                            <input type="text" className="grow" placeholder="location"
                                onChange={(event) => onInputChange(event, 'location')}
                                key={1}
                                defaultValue={userDetails?.location} />
                        </label>
                    </div>
                    : selectedOption == 'link' ?
                        <div className='mt-3'>
                            {/* .... */}
                            <label className="input input-bordered flex items-center gap-2">
                                <Link2 />
                                <input type="text" className="grow" placeholder="URL"
                                    onChange={(event) => onInputChange(event, 'link')}
                                    defaultValue={userDetails?.link}
                                    key={2} />
                            </label>
                        </div>
                        : null
                }
            </div>


        </div>
    )
}

export default BasicDetail
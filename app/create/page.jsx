'use client'
import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { db, } from '../../utils'

import { userInfo } from '../../utils/schema'
import { useRouter } from 'next/navigation';


function CreateUsername() {
    const [username, setUsername] = useState();
    const {user}=useUser();
    const router = useRouter();

    const OnCreateBtnClick = async() => {
        if(username.length>10){

            console.log('not more than 10 characters');
            toast.error('Username should not be more than 10 characters',{
                position: "top-right",
            });
            return;
            
        }
        const result= await db.insert(userInfo).values({
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress,
            username: username.replace(' ','')
        })

        if(result){
            toast.success('Username Created',{
                position: "top-right",
            });
            router.replace('/admin')
        }
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='p-10 border rounded-lg flex flex-col'>
                <h2 className='font-bold text-2xl py-3 text-center'>Create Portfolio Username</h2>
                <label className='py-2 capitalize'>add Username for Your Portfolio</label>
                <input type="text" placeholder="Type here" 
                onChange={(event)=>setUsername(event.target.value)} className="input input-bordered w-full max-w-xs" />
                <button disabled={!username} className='btn btn-primary mt-3' onClick={()=>OnCreateBtnClick()}> create</button>
            </div>
        </div>
    )
}

export default CreateUsername
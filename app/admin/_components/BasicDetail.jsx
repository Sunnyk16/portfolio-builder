import { Camera } from 'lucide-react'
import React from 'react'
import { db } from '../../../utils';
import { userInfo } from '../../../utils/schema';
import { toast } from 'react-toastify';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';

function BasicDetail() {
    let timeoutId;
    const {user}=useUser();
    const onInputChange = (event,fieldName) => {
        
        clearTimeout(timeoutId)
        timeoutId=setTimeout(async()=>{
            const result= await db.update(userInfo).set({[fieldName]:event.target.value}).where(eq(userInfo.email,user?.primaryEmailAddress.emailAddress));

            if(result){
                toast.success('saved',{position:'top-right'})
            }
            else{
                toast.error('Error',{position:'top-right'})
            }
        },1000)
    }
  return (
    <div className='p-7 rounded-lg bg-gray-800 my-7'>
        <div className='flex gap-6 items-center'>
            <Camera className='p-3 h-12 w-12 bg-gray-500 rounded-full'/>
            <input type="text" placeholder="Username" 
            
            onChange={(event)=>onInputChange(event,'name')}
            className="input input-bordered w-full " />

        </div>
        <textarea className="textarea textarea-bordered w-full mt-3  " onChange={(event)=>onInputChange(event,'bio')} placeholder="Write About yourself"></textarea>


    </div>
  )  
}

export default BasicDetail
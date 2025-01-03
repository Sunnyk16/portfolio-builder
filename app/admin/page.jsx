'use client'

import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import { db, } from '../../utils'

import { userInfo } from '../../utils/schema'



import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation';

import FormContent from './_components/FormContent'
import Mobilepreview from './_components/Mobilepreview' 


function Admin() {

    const { user } = useUser();
    const router = useRouter();

    useEffect(()=>{
        user && checkUser();
    }, [user])


    const checkUser = async () => {
        const result = await db.select().from(userInfo).where(eq(userInfo.email, user?.primaryEmailAddress?.emailAddress))
        console.log(result)
        if (result?.length == 0) {
            router.replace('/create')
        }
    }

    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-3'>
                <div className='col-span-2'>
                    <FormContent/>
                </div>
                <div>
                    <Mobilepreview/>
                </div>
            </div>
        </div>
    )
}

export default Admin
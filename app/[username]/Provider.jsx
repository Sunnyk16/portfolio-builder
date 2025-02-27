
'use client'
import React, { useEffect, useState, createContext } from 'react'
import { db } from '../../utils'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm';
import { userInfo, project } from '../../utils/schema';

export const UserDetailContext = createContext(null);

function Provider({ children }) {
    const { user } = useUser();
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        if (user?.primaryEmailAddress?.emailAddress) {
            GetUserDetails();
        }
    }, [user]);

    const GetUserDetails = async () => {
        try {
            const result = await db.select()
                .from(userInfo)
                .leftJoin(project, eq(userInfo.id, project.userRef)) 
                .where(eq(userInfo.email, user.primaryEmailAddress.emailAddress));

            if (result.length > 0) {
                setUserDetails(result);
            } else {
                setUserDetails(null);
            }

            console.log("User Data:", result);
        } catch (error) {
            console.error("Error fetching user details:", error);
            setUserDetails(null);
        }
    };

    return (
        <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
            <div data-theme={userDetails?.[0]?.userInfo?.theme }>
                {children}
            </div>
        </UserDetailContext.Provider>
    );
}

export default Provider;

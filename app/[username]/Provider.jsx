// 'use client'
// import React, { useEffect } from 'react'
// import { db } from '../../utils'
// import { useUser } from '@clerk/nextjs'
// import { eq } from 'drizzle-orm';
// import { userInfo } from '../../utils/schema';

// function Provider({children}) {
//     const {user}=useUser();
//     useEffect(() => {
//         user&&GetUserDetails()
//     }, [user])
//     const GetUserDetails=async()=>{
//         const result=await db.query.userInfo.findMany({
//             with:{
//                 projects:true
//             },
//             where:eq(userInfo.email,user?.primaryEmailAddress?.emailAddress)
//         })
//         console.log(db.query);

//         console.log(result)
//     }
//   return (
//     <div data-theme="light"  >
//         {children}
//     </div>
//   )
// }

// export default Provider
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
                .leftJoin(project, eq(userInfo.id, project.userRef))  // ✅ Join with projects
                .where(eq(userInfo.email, user.primaryEmailAddress.emailAddress));

            if (result.length > 0) {
                setUserDetails(result[0]);  // ✅ Store only the first user object
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
            <div data-theme="light">
                {children}
            </div>
        </UserDetailContext.Provider>
    );
}

export default Provider;

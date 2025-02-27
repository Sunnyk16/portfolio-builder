
// 'use client'
// import React, { useEffect, useState, createContext } from 'react'
// import { db } from '../../utils'
// import { useUser } from '@clerk/nextjs'
// import { eq } from 'drizzle-orm';
// import { userInfo, project } from '../../utils/schema';

// export const UserDetailContext = createContext(null);

// function Provider({ children }) {
//     const { user } = useUser();
//     const [userDetails, setUserDetails] = useState(null);

//     useEffect(() => {
//         if (user?.primaryEmailAddress?.emailAddress) {
//             GetUserDetails();
//         }
//     }, [user]);

//     const GetUserDetails = async () => {
//         try {
//             const result = await db.select()
//                 .from(userInfo)
//                 .leftJoin(project, eq(userInfo.id, project.userRef)) 
//                 .where(eq(userInfo.email, user.primaryEmailAddress.emailAddress));

//             if (result.length > 0) {
//                 setUserDetails(result);  // ✅ Store only the first user object
//             } else {
//                 setUserDetails(null);
//             }

//             console.log("User Data:", result);
//         } catch (error) {
//             console.error("Error fetching user details:", error);
//             setUserDetails(null);
//         }
//     };

//     return (
//         <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
//             <div data-theme={userDetails?.[0]?.userInfo?.theme }>
//                 {children}
//             </div>
//         </UserDetailContext.Provider>
//     );
// }

// export default Provider;
'use client'
import React, { useEffect, useState, createContext } from 'react';
import { db } from '../../utils';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { userInfo, project } from '../../utils/schema';

export const UserDetailContext = createContext(null);

function Provider({ children }) {
    const { user } = useUser();
    const [userDetails, setUserDetails] = useState(null);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (user?.primaryEmailAddress?.emailAddress) {
            GetUserDetails();
        }
    }, [user]);

    const GetUserDetails = async () => {
        try {
            const userData = await db.select()
                .from(userInfo)
                .where(eq(userInfo.email, user.primaryEmailAddress.emailAddress));

            if (userData.length > 0) {
                setUserDetails(userData[0]);
                GetUserProjects(userData[0].id);
            } else {
                setUserDetails(null);
                setProjects([]);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
            setUserDetails(null);
            setProjects([]);
        }
    };

    const GetUserProjects = async (userId) => {
        try {
            const projectData = await db.select()
                .from(project)
                .where(eq(project.userRef, userId));
            setProjects(projectData);
        } catch (error) {
            console.error("Error fetching user projects:", error);
            setProjects([]);
        }
    };

    return (
        <UserDetailContext.Provider value={{ userDetails, projects, setUserDetails }}>
            <div data-theme={userDetails?.theme}>
                {children}
            </div>
        </UserDetailContext.Provider>
    );
}

export default Provider;

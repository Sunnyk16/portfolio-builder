
// 'use client';

// import { useUser } from '@clerk/nextjs';
// import React, { useEffect } from 'react';
// import { db } from '../../utils';
// import { userInfo } from '../../utils/schema';
// import { eq } from 'drizzle-orm';
// import { useRouter } from 'next/navigation';
// import FormContent from './_components/FormContent';
// import MobilePreview from './_components/MobilePreview';

// function Admin() {
//   const { user } = useUser();
//   const router = useRouter();

//   useEffect(() => {
//     user && checkUser();
//   }, [user]);

//   const checkUser = async () => {
//     const result = await db.select().from(userInfo).where(eq(userInfo.email, user?.primaryEmailAddress?.emailAddress));
//     if (result?.length == 0) {
//       router.replace('/create');
//     }
//   };

//   return (
//     <div className='p-5 md:ml-16'>
//       <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 h-full'>
//         <div className='col-span-1 lg:col-span-2 flex flex-col'>
//           <FormContent />
//         </div>
//         <div className='col-span-1 flex flex-col'>
//           <MobilePreview />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Admin;
'use client';

import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { db } from '../../utils';
import { userInfo } from '../../utils/schema';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import FormContent from './_components/FormContent';
import MobilePreview from './_components/MobilePreview';

function Admin() {
  const { user } = useUser();
  const router = useRouter();
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (user) checkUser();
  }, [user]);

  const checkUser = async () => {
    const result = await db
      .select()
      .from(userInfo)
      .where(eq(userInfo.email, user?.primaryEmailAddress?.emailAddress));

    if (!result || result.length === 0) {
      router.replace('/create');
    } else {
      // Set the username from database
      setUsername(result[0]?.username);
    }
  };

  return (
    <div className='p-5 md:ml-16'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 h-full'>
        <div className='col-span-1 lg:col-span-2 flex flex-col'>
          <FormContent />
        </div>
        <div className='col-span-1 flex flex-col'>
          {/* Pass username from DB */}
          <MobilePreview username={username} />
        </div>
      </div>
    </div>
  );
}

export default Admin;

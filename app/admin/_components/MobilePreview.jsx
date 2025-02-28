'use client'
import React, { useContext } from 'react';
import { PreviewUpdatedContext } from '../../_context/PreviewUpdatedContext';

function MobilePreview() {
  const { updatePreview, setupdatePreview } = useContext(PreviewUpdatedContext);
  return (
    <div className='p-5 bg-light-theme flex justify-center items-center min-h-screen w-full overflow-hidden'>
      <div className='border-[10px] lg:w-[330px] xl:w-[400px] h-[650px] rounded-[40px] m-2 border-primary shadow-md shadow-primary  flex '>
        <iframe key={updatePreview}
          title='Profile'
          src={process.env.NEXT_PUBLIC_BASE_URL + "sunny"}
          className='w-[100%] h-[100%] rounded-[25px] '
        />
      </div>
    </div>
  );
}

export default MobilePreview;

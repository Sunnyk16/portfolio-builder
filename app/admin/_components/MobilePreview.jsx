import React from 'react';

function MobilePreview() {
  return (
    <div className='p-5 bg-light-theme flex justify-center items-center min-h-screen'>
      <div className='border-[13px] lg:w-[330px] xl:w-[400px] h-[650px] rounded-[40px] m-2 shadow-md shadow-primary  flex'>
        <iframe
          title='Profile'
          src={process.env.NEXT_PUBLIC_BASE_URL + "sunny"}
          className='w-[100%] h-[100%] rounded-[25px] '
        />
      </div>
    </div>
  );
}

export default MobilePreview;

import React from 'react'

function MobilePreview() {
  return (
    <div className='p-5 '>
      <div className='border-[13px] lg:w-[330px] xl:w-[400px] max-h-[650px] border-black min-h-screen rounded-[40px] m-2 shadow-md shadow-primary '>
        {/* ...... */}
        <iframe title='Profile' src={process.env.NEXT_PUBLIC_BASE_URL+"sunny"}
        width="100%" height="100%" className='rounded-[25px]'/>

      </div>
    </div>
  )
}

export default MobilePreview
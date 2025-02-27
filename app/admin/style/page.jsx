import React from 'react'
import MobilePreview from '../_components/Mobilepreview'
import ThemeOptions from './_components/ThemeOptions'

function Style() {
  return (
    <div className=''> 
     <div className='p-5'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                <div className='col-span-2'>
                    <ThemeOptions/>
                </div>
                <div className='h-full flex justify-center items-center'>
                    <MobilePreview/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Style
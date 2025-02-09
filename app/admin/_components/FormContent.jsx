import React from 'react'
import BasicDetail from './BasicDetail'
import AddProject from './AddProject'

function FormtContent() {
  return (
    <div className='py-12 px-6'>
      <h2 className='text-bold text-3xl'>Start Designing Your portfolio page</h2>
      <BasicDetail/>
      <hr className='my-5'></hr>
      <AddProject/>
      
    </div>
  )
}

export default FormtContent
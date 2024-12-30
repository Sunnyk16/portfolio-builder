import React from 'react'

function CreateUsername() {
    return (
        <div>
            <div className='p-10 border rounded-sm'>
                <h2 className='font-bold text-2xl py-3 text-center'>Create Portfolio Username</h2>
                <label>add Username for Your Portfolio</label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
        </div>
    )
}

export default CreateUsername
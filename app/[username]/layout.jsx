import React from 'react'
import Provider from './Provider'

function UserPagelayout({children}) {
  return (
    <div>
        <Provider>
            {children}
        </Provider>

    </div>
  )
}

export default UserPagelayout
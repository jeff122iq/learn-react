import React from 'react'

export default function FlashMessages ({messages}) {
  return (
    <div className='floating-alerts'>
        { messages.map((msg, idx) => {
          return(
            <div className='alert alert-success text-center floating-alert shadow-sm' key={idx}>
              { msg }
            </div>
            )
        }) }
    </div>
  )
};
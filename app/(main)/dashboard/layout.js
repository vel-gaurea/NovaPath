import React, { Suspense } from 'react'
import { PropagateLoader } from 'react-spinners'

const Layout = ({ children }) => {
  return (
    <div className='px-5'>
      <div className='flex items-center justify-between mb-5'>
        <h1 className='text-6xl font-bold gradient-title'>Industry Insights</h1>
      </div>
      {/* <Suspense fallback={<ClimbingBoxLoader className='mt-4' width={"100%"} color='gray'/>}> */}
      <Suspense
        fallback={
          <PropagateLoader
            color='gray'
            size={15}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '1rem', // mt-4 equivalent
              padding: '1rem', // p-4 equivalent
            }}
          />
        }
      >
        {children}
      </Suspense>
    </div>
  )
}

export default Layout

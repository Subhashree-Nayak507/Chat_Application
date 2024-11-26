
import React from 'react'

const EmptyChatContainer = () => {
  return (
    <div className='hidden lg:flex flex-1 bg-[#100d0d] flex-col justify-center items-center duration-1000 transition-all'>
    <div className='text-opacity-80 text-white flex flex-col items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center'>
      <h3 className='Arial-medium'>
        Hi <span className='text-purple-500'>Welcome to</span> 
        <span className='text-purple-500'> chatify</span>
      </h3>
    </div>
  </div>


  )
}

export default  EmptyChatContainer

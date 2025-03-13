import SigninButton from '@/components/signin-button'
import React from 'react'

const Homepage = () => {
  return (
    <div className='text-center '>
      <h1 className="text-3xl font-bold
        text-red-500 hover:text-blue-500">ยินดีต้อนรับเข้าสู่เว็ปไซต์ขายของออนไลน์</h1>
      <p className='text-xl py-3'>This is my first NextJs project</p>
      <p className='text-lg py-5'>สร้างโดย วัชรพล ภูทองทา</p>
      <SigninButton></SigninButton>
    </div>
  )
}

export default Homepage
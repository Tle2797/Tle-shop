'use client'
import SigninButton from '@/components/signin-button'
import { Button } from '@/components/ui/button'
import useCartStor from '@/lib/store/cart'
import React, { useEffect, useState } from 'react'

const Homepage = () => {
  const [count,setcount] = useState(0)
  const [name,setname] = useState('Watcharapon')

  const {items} = useCartStor();
  console.log("🚀 ~ Homepage ~ items:", items) 

  useEffect(() => {
    setname(`watcharapon ${count}`)
  }, [count]);

  const handleClick = () =>{
    setcount(count+1)
  }

  const handleRename = () => {
    setname('Watcharapon Phothongtha')
  }
  return (
    <div className='text-center '>
      <h1 className="text-3xl font-bold
        text-red-500 hover:text-blue-500">ยินดีต้อนรับเข้าสู่เว็ปไซต์ขายของออนไลน์</h1>
        <h2>จำนวนนับ : {count}</h2>
        <Button onClick={()=>handleClick()}>เพิ่มจำนวนนับ</Button>
        <Button onClick={()=>handleRename()}>update ชื่อ</Button>
        <h2>ชื่อ : {name}</h2>
      <p className='text-xl py-3'>This is my first NextJs project</p>
      <p className='text-lg py-5'>สร้างโดย วัชรพล ภูทองทา</p>
      <SigninButton></SigninButton>
    </div>
  )
}

export default Homepage
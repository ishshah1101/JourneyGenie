import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <>
    <div className='flex justify-between w-100 p-5 px-5 shadow text-center bg-blue-200'>
      <img src="public\jouneyGenieLogo.png" className='h-25 w-40' alt="" />
      <div className='flex justify-center items-center'>
        <Button>Sign In</Button>
      </div>
    </div>
    </>
  )
}

export default Header
import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'


function LandingPage() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9 py-5'>
      <h1 className='font-extrabold text-[60px] text-center'><span className='text-[#f56551]'>Plan your next adventure with AI: </span> Easily explore and compare prices without the hassle of booking.</h1>
      <p className='text-xl text-center text-gray-500'>Easily compare the prices of flights and hotels along with planning your trip according to you budget and interests.</p>
      <Link to='/create-trip'>
        <Button className="text-xl">Plan your Trip</Button>
      </Link>
      <img className="rounded-lg" src="/landing-page-wallpaper.jpg" alt="" />
    </div>
  )
}

export default LandingPage;
// import React from 'react'
// import { Button } from '../ui/button'
// import { Link } from 'react-router-dom'


// function LandingPage() {
//   return (
//     <div className='flex flex-col items-center mx-56 gap-9 py-5'>
//       <h1 className='font-extrabold text-[60px] text-center'><span className='text-[#f56551]'>Plan your next adventure with AI: </span> Easily explore and compare prices without the hassle of booking.</h1>
//       <p className='text-xl text-center text-gray-500'>Easily compare the prices of flights and hotels along with planning your trip according to you budget and interests.</p>
//       <Link to='/create-trip'>
//         <Button className="text-xl">Plan your Trip</Button>
//       </Link>
//       <img className="rounded-lg" src="/landing-page-wallpaper.jpg" alt="" />
//     </div>
//   )
// }

// export default LandingPage;


//Devarsh code

import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/landing-page-wallpaper.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>{" "}
      {/* Dark overlay */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto p-100">
        <h1 className="font-extrabold text-white text-5xl sm:text-7xl mb-6">
          <span className="text-[#FFD700]">
            Plan your next adventure with AI:{" "}
          </span>
          Explore and compare prices easily without the hassle of booking.
        </h1>
        <p className="text-lg sm:text-2xl text-gray-300 mb-10">
          Compare the prices of flights and hotels while planning your trip
          according to your budget and interests.
        </p>
        <Link to={"/create-trip"}>
          <Button className="bg-[#FFD700] text-black hover:bg-yellow-600 text-lg sm:text-xl px-6 py-3">
            Plan your Trip
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
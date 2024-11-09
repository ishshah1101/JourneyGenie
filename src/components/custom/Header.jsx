// import React, { useState, useEffect } from 'react';
// import { Button } from '../ui/button';
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// import { Link, useLocation } from 'react-router-dom';
// import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
// import axios from 'axios';
// import { FcGoogle } from 'react-icons/fc';

// function Header() {
//   const user = JSON.parse(localStorage.getItem('user'));
//   const [openDialog, setOpenDialog] = useState(false);
//   const [isMyTripsActive, setIsMyTripsActive] = useState(false);
//   const location = useLocation();

//   const login = useGoogleLogin({
//     onSuccess: (codeResp) => GetUserProfile(codeResp),
//     onError: (error) => console.log(error),
//   });

//   const GetUserProfile = (tokenInfo) => {
//     axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
//       headers: {
//         Authorization: `Bearer ${tokenInfo?.access_token}`,
//         Accept: 'Application/json',
//       },
//     }).then((resp) => {
//       localStorage.setItem('user', JSON.stringify(resp.data));
//       setOpenDialog(false);
//       window.location.reload();
//     });
//   };

//   // Reset My Trips highlight when user navigates away from /my-trips
//   useEffect(() => {
//     if (location.pathname !== '/my-trips') {
//       setIsMyTripsActive(false);
//     }
//   }, [location]);

//   return (
//     <div className='flex justify-between w-full p-5 px-5 shadow text-center bg-blue-200'>
//       <Link to="/create-trip">
//         <img src="/jouneyGenieLogo.png" className='h-25 w-40' alt="Journey Genie Logo" />
//       </Link>
//       <div className='flex justify-center items-center'>
//         {user ? (
//           <div className='flex items-center gap-3'>
//             <Link to="/flight-search" style={{ color: 'inherit' }}>
//               <Button variant="outline" className="rounded-full font-bold">+ Flight Search</Button>
//             </Link>

//             <Link to="/create-journal" style={{ color: 'inherit' }}>
//               <Button variant="outline" className="rounded-full font-bold">+ Journal</Button>
//             </Link>
//             <Link to="/create-trip" style={{ color: 'inherit' }}>
//               <Button variant="outline" className="rounded-full font-bold">+ Trip</Button>
//             </Link>

//             <Popover>
//               <PopoverTrigger>
//                 <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' />
//               </PopoverTrigger>
//               <PopoverContent>
//                 <Link to="/my-trips" style={{ color: 'inherit' }}>
//                   <Button
//                     variant={isMyTripsActive ? "solid" : "ghost"}
//                     className="w-full text-left text-current font-bold"
//                     onClick={() => setIsMyTripsActive(true)}
//                   >
//                     My Trips
//                   </Button>
//                 </Link>
//                 <Link to="/trip-journal" style={{ color: 'inherit' }}>
//                   <Button variant="ghost" className="w-full text-left mt-2 text-current font-bold">
//                     Trip Journal
//                   </Button>
//                 </Link>
//                 <Link to="/favourite-trips" style={{ color: 'inherit' }}>
//                   <Button variant="ghost" className="w-full text-left mt-2 text-current font-bold">
//                     ❤️ Favorite Trips
//                   </Button>
//                 </Link>
//                 <Button
//                   variant="ghost"
//                   className="w-full text-left mt-2 text-current text-red-500 font-semibold" 
//                   onClick={() => {
//                     googleLogout();
//                     localStorage.clear();
//                     window.location.reload();
//                   }}
//                 >
//                   Log Out
//                 </Button>
//               </PopoverContent>
//             </Popover>
//           </div>
//         ) : (
//           <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
//         )}
//       </div>
//       <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogDescription>
//               <div className='flex justify-center'>
//                 <img src="./jouneyGenieLogo.png" width="200" alt="Journey Genie Logo" />
//               </div>
//               <h2 className='text-lg mt-7 text-center font-extrabold text-black'>Sign In With Gmail Account</h2>
//               <p className='text-center'>Sign in to the Website with Google authentication security</p>

//               <Button onClick={login} className="mt-5 w-full flex gap-4 items-center">
//                 <FcGoogle className='h-7 w-7' />
//                 Sign In with Google
//               </Button>

//               <Button
//                 onClick={() => setOpenDialog(false)}
//                 className="mt-3 w-full bg-gray-200 text-gray-600 hover:bg-gray-300"
//               >
//                 Close
//               </Button>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default Header;



//Devarsh code



import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Link, useLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);
  const [isMyTripsActive, setIsMyTripsActive] = useState(false);
  const location = useLocation();

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json',
      },
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    });
  };

  // Reset My Trips highlight when user navigates away from /my-trips
  useEffect(() => {
    if (location.pathname !== '/my-trips') {
      setIsMyTripsActive(false);
    }
  }, [location]);

  // Determine if we are on the Landing Page
  const isLandingPage = location.pathname === '/';

  // Define header background style based on the current page
  const headerStyle = isLandingPage
    ? 'flex justify-between w-full p-5 px-5 text-center bg-transparent absolute top-0 left-0 z-10' // Transparent and positioned for Landing Page
    : 'flex justify-between w-full p-5 px-5 shadow text-center bg-blue-200'; // Default style for other pages

  return (
    <div className={headerStyle}>
      <Link to="/create-trip">
        <img src="/jouneyGenieLogo.png" className='h-25 w-40' alt="Journey Genie Logo" />
      </Link>
      <div className='flex justify-center items-center'>
        {user ? (
          <div className='flex items-center gap-3'>
            <Link to="/flight-search" style={{ color: 'inherit' }}>
              <Button variant="outline" className="rounded-full font-bold">+ Flight Search</Button>
            </Link>

            <Link to="/create-journal" style={{ color: 'inherit' }}>
              <Button variant="outline" className="rounded-full font-bold">+ Journal</Button>
            </Link>
            <Link to="/create-trip" style={{ color: 'inherit' }}>
              <Button variant="outline" className="rounded-full font-bold">+ Trip</Button>
            </Link>

            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' />
              </PopoverTrigger>
              <PopoverContent>
                <Link to="/my-trips" style={{ color: 'inherit' }}>
                  <Button
                    variant={isMyTripsActive ? "solid" : "ghost"}
                    className="w-full text-left text-current font-bold"
                    onClick={() => setIsMyTripsActive(true)}
                  >
                    My Trips
                  </Button>
                </Link>
                <Link to="/trip-journal" style={{ color: 'inherit' }}>
                  <Button variant="ghost" className="w-full text-left mt-2 text-current font-bold">
                    Trip Journal
                  </Button>
                </Link>
                <Link to="/favourite-trips" style={{ color: 'inherit' }}>
                  <Button variant="ghost" className="w-full text-left mt-2 text-current font-bold">
                    ❤️ Favorite Trips
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full text-left mt-2 text-current text-red-500 font-semibold" 
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Log Out
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className='flex justify-center'>
                <img src="./jouneyGenieLogo.png" width="200" alt="Journey Genie Logo" />
              </div>
              <h2 className='text-lg mt-7 text-center font-extrabold text-black'>Sign In With Gmail Account</h2>
              <p className='text-center'>Sign in to the Website with Google authentication security</p>

              <Button onClick={login} className="mt-5 w-full flex gap-4 items-center">
                <FcGoogle className='h-7 w-7' />
                Sign In with Google
              </Button>

              <Button
                onClick={() => setOpenDialog(false)}
                className="mt-3 w-full bg-gray-200 text-gray-600 hover:bg-gray-300"
              >
                Close
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;

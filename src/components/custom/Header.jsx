import React, { useState, useEffect } from 'react'; // Import necessary React hooks
import { Button } from '../ui/button'; // Import Button component
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // Import Popover components for dropdown menu
import { googleLogout, useGoogleLogin } from '@react-oauth/google'; // Import Google OAuth hooks for login and logout
import { Link, useLocation } from 'react-router-dom'; // Import Link for navigation and useLocation to track the current page
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog"; // Import Dialog components for the sign-in modal
import axios from 'axios'; // Import axios for making API requests
import { FcGoogle } from 'react-icons/fc'; // Import Google logo icon for the button

function Header() {
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve user data from localStorage
  const [openDialog, setOpenDialog] = useState(false); // State to control the visibility of the sign-in dialog
  const [isMyTripsActive, setIsMyTripsActive] = useState(false); // State to track if "My Trips" button is active
  const location = useLocation(); // Hook to access the current route

  // Google login hook
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp), // If login is successful, fetch user profile
    onError: (error) => console.log(error), // Log any errors that occur during login
  });

  // Function to fetch user profile after successful login
  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`, // Authorization header with access token
        Accept: 'Application/json',
      },
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data)); // Store user data in localStorage
      setOpenDialog(false); // Close the sign-in dialog
      window.location.reload(); // Reload the page after successful login
    });
  };

  // Reset "My Trips" highlight when the user navigates away from the /my-trips route
  useEffect(() => {
    if (location.pathname !== '/my-trips') {
      setIsMyTripsActive(false);
    }
  }, [location]); // Dependency array ensures effect runs when location changes

  // Check if the current route is the Landing Page
  const isLandingPage = location.pathname === '/';

  // Define header background style based on the current route
  const headerStyle = isLandingPage
    ? 'flex justify-between w-full p-5 px-5 text-center bg-transparent absolute top-0 left-0 z-10' // Transparent header for Landing Page
    : 'flex justify-between w-full p-5 px-5 shadow text-center bg-blue-200'; // Default header style for other pages

  return (
    <div className={headerStyle}>
      <Link to="/"> {/* Navigate to the homepage when logo is clicked */}
        <img src="/jouneyGenieLogo.png" className='h-25 w-40' alt="Journey Genie Logo" />
      </Link>
      <div className='flex justify-center items-center'>
        {user ? ( // If user is logged in, display these options
          <div className='flex items-center gap-3'>
            {/* Navigation buttons for logged-in users */}
            <Link to="/flight-search" style={{ color: 'inherit' }}>
              <Button variant="outline" className="rounded-full font-bold">+ Flight Search</Button>
            </Link>

            <Link to="/create-journal" style={{ color: 'inherit' }}>
              <Button variant="outline" className="rounded-full font-bold">+ Journal</Button>
            </Link>
            <Link to="/create-trip" style={{ color: 'inherit' }}>
              <Button variant="outline" className="rounded-full font-bold">+ Trip</Button>
            </Link>

            {/* User profile dropdown using Popover */}
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' />
              </PopoverTrigger>
              <PopoverContent>
                {/* Navigation to user trips */}
                <Link to="/my-trips" style={{ color: 'inherit' }}>
                  <Button
                    variant={isMyTripsActive ? "solid" : "ghost"} // Active state for My Trips button
                    className="w-full text-left text-current font-bold"
                    onClick={() => setIsMyTripsActive(true)}
                  >
                    My Trips
                  </Button>
                </Link>
                {/* Other user-related navigation */}
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
                {/* Log out button */}
                <Button
                  variant="ghost"
                  className="w-full text-left mt-2 text-current text-red-500 font-semibold" 
                  onClick={() => {
                    googleLogout(); // Log out from Google
                    localStorage.clear(); // Clear localStorage
                    window.location.reload(); // Reload page to reflect changes
                  }}
                >
                  Log Out
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button> // If no user, show sign-in button
        )}
      </div>

      {/* Sign-in dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className='flex justify-center'>
                <img src="./jouneyGenieLogo.png" width="200" alt="Journey Genie Logo" />
              </div>
              <h2 className='text-lg mt-7 text-center font-extrabold text-black'>Sign In With Gmail Account</h2>
              <p className='text-center'>Sign in to the Website with Google authentication security</p>

              {/* Google sign-in button */}
              <Button onClick={login} className="mt-5 w-full flex gap-4 items-center">
                <FcGoogle className='h-7 w-7' />
                Sign In with Google
              </Button>

              {/* Close button for the dialog */}
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

export default Header; // Export the Header component for use in other parts of the app

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

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

  return (
    <div className='flex justify-between w-100 p-5 px-5 shadow text-center bg-blue-200'>
      <Link to="/create-trip">
        <img src="/jouneyGenieLogo.png" className='h-25 w-40' alt="Journey Genie Logo" />
      </Link>
      <div className='flex justify-center items-center'>
        {user ? (
          <div className='flex items-center gap-3'>
            <Link to="/create-journal">
              <Button variant="outline" className="rounded-full">Create Journal</Button>
            </Link>
            <Link to="/trip-journal">
              <Button variant="outline" className="rounded-full">Trip Journal</Button>
            </Link>
            <Link to="/favourite-trips">
              <Button variant="outline" className="rounded-full">Favourite Trips</Button>
            </Link>
            <Link to="/create-trip">
              <Button variant="outline" className="rounded-full">+ Create Trip</Button>
            </Link>
            <Link to="/my-trips">
              <Button variant="outline" className="rounded-full">My Trips</Button>
            </Link>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Log Out</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="./jouneyGenieLogo.png" height="150" width="50" alt="" />
              <h2 className='font-bold text-lg mt-7'>Sign In With Gmail Account</h2>
              <p>Sign in to the App with Google authentication security</p>
              <Button onClick={login} className="mt-5 w-full flex gap-4 items-center">
                <FcGoogle className='h-7 w-7' />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;

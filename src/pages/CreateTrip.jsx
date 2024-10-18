import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/components/constants/options';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chatSession } from '@/service/AIModelTrip';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import { FcGoogle } from "react-icons/fc";
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { db } from '@/service/FirebaseConfig';
import { useNavigate } from 'react-router-dom';


function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  useEffect(() => {
    // console.log(import.meta.env.VITE_GOOGLE_PLACE_API_KEY);
    // console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const OnGenerateTrip = async () => {

    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }

    console.log();

    if (formData?.noOfDays > 5 && (!formData?.location || !formData?.budget || !formData?.traveller)) {
      console.log("Enter Valid details");
      toast("Please fill all the details");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveller}', formData?.traveller)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());

  }

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user.email,
      id: docId
    });
    setLoading(false);
    navigate('/view-trip/'+docId);
  }

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTrip();
    })

  }
  return (
    <div className='sm:x-10 md:px32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us about your travel preferences!! 🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nesciunt, animi deleniti, ea, nulla fugiat sunt vel corrupti delectus facilis sint explicabo maxime natus maiores! Modi quas natus doloremque quisquam.
      </p>
      <div className='flex flex-col mt-20 gap-10'>
        <div className='mt-20'>
          <h2 className='text-xl my-3 font-medium'>What is your destination of your choice?</h2>
          {/* <GooglePlacesAutocomplete apiKey={import.meta.env.GOOGLE_PLACE_API_KEY} /> */}
          <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY} selectProps={{ place, onChange: (v) => { setPlace(v); handleInputChange('location', v) } }} />
        </div>
      </div>
      <div>
        <h2 className='text-xl my-3 font-medium'>How many days you are planning to stay?</h2>
        <Input placeholder='Ex.3' type="number" onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5 '>
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border rounded-lg hover:shadow cursor-pointer *:${formData?.budget == item.title && 'shadow-lg border-black'}`}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>How many persons are travelling including you?</h2>
        <div className='grid grid-cols-4 gap-5 mt-5 '>
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('traveller', item.people)}
              className={`p-4 border rounded-lg hover:shadow cursor-pointer ${formData?.traveller == item.people && 'shadow-lg border-black'}`}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button disabled={loading} onClick={OnGenerateTrip}>{loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> :
          'Generate Trip'
        }
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="./jouneyGenieLogo.png" height="150" width="50" alt="" />
              <h2 className='font-bold text-lg mt-7'>Sign In With Gmail Account</h2>
              <p>Sign in to the App with Google authentication security</p>

              <Button
                onClick={login}
                className="mt-5 w-full flex gap-4 items-center">



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

export default CreateTrip;

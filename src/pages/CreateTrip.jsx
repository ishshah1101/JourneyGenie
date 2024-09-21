import { SelectBudgetOptions, SelectTravelsList } from '@/components/constants/options';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const OnGenerateTrip=()=>{
    if (formData?.noOfDays>5&&(!formData?.location || !formData?.budget || !formData?.traveller)) {
      console.log("Enter Valid details");
      toast("Please fill all the details");
      return;
    }
    console.log(formData);
    
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
          {/* <GooglePlacesAutocomplete apiKey={import.meta.env.GOOGLE_PLACE_API_KEY} selectProps={{place,onChange:(v)=>{setPlace(v);handleInputChange('location',v)}}}/> */}
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
        <Button onClick={OnGenerateTrip}>Generate Trip</Button>
      </div>
    </div>
  );
}

export default CreateTrip;

import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { Button } from "../ui/button";
import { getplacedetails1 } from "@/service/GlobalApi";

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (trip && trip?.userSelection?.location?.value?.place_id) {
      getPlacePhoto1();
    }
  }, [trip]);

  const getPlacePhoto1 = async () => {
    // console.log(trip);

    const placeId = trip?.userSelection?.location?.value?.place_id;
    // console.log(placeId);

    // const getPlaceId = await placeId;

    if (!placeId) {
      console.error("Place ID is missing or undefined");
      return;
    }

    try {
      const result1 = await getplacedetails1(placeId);
      // console.log(result1.data);
      // console.log(result1.data.photos.length);


      // Handle photo URL if available in result1.data
      // For example, if it's in the 'photos' field:
      if (result1.data.photos && result1.data.photos.length > 0) {
        // const photoReference = result1.data.photos[0].name;    
        // const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${photoReference}&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;
        // console.log(photoUrl);
        // setPhotoUrl(photoUrl);

        const photoReference = result1.data.photos[0].name;
        const photoUrl = `https://places.googleapis.com/v1/${photoReference}/media?maxHeightPx=1000&maxWidthPx=1000&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;
        // console.log(photoUrl);
        setPhotoUrl(photoUrl);

      }
    } catch (error) {
      console.error("Error fetching place details", error);
    }
  };

  const GetPlacePhoto = async () => {
    const locationLabel = trip?.userSelection?.location?.label;

    if (!locationLabel) {
      console.error("Location label is missing or undefined");
      return;
    }

    const data = {
      textQuery: locationLabel
    };

    try {
      const result = await getplacedetails1(data); // Pass the `data` object
      // console.log(result.data);

      // Further logic here to handle the API response...
    } catch (error) {
      console.error("Error fetching place details", error);
    }
  };


  return (
    <div>
      {photoUrl && (
        <img
          src={photoUrl}
          className="h-[340px] w-full object-cover rounded-xl"
          alt="Place"
        />
      )}

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label || "No Location Selected"}
          </h2>

          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅 {trip?.userSelection?.noOfDays || "N/A"} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {trip?.userSelection?.budget || "N/A"} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🧑🏻‍🤝‍🧑🏾 No. of Travelers: {trip?.userSelection?.traveller || "N/A"}
            </h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;

import { useEffect, useState } from "react";
import { getplacedetails1 } from "@/service/GlobalApi";

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const placeId = trip?.userSelection?.location?.value?.place_id;

  useEffect(() => {
    if (trip && placeId) {
      getPlacePhoto1();
    }
  }, [trip]);

  // Fetch place photo using place ID
  const getPlacePhoto1 = async () => {
    try {
      const result1 = await getplacedetails1(placeId);

      if (result1.data.photos && result1.data.photos.length > 0) {
        const photoReference = result1.data.photos[0].name;
        const photoUrl = `https://places.googleapis.com/v1/${photoReference}/media?maxHeightPx=1000&maxWidthPx=1000&key=${
          import.meta.env.VITE_GOOGLE_PLACE_API_KEY
        }`;
        setPhotoUrl(photoUrl);
      }
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
            {trip?.userSelection?.location?.label}
          </h2>

          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅 {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🧑🏻‍🤝‍🧑🏾 No. of Travelers: {trip?.userSelection?.traveller}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;

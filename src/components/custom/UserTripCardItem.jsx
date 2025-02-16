import React, { useEffect, useState } from "react";
import { getplacedetails1, deleteTripById } from "@/service/GlobalApi";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function UserTripCardItem({ trip, onDelete }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (trip && trip?.userSelection?.location?.value?.place_id) {
      getPlacePhoto1();
    }
  }, [trip]);

  const getPlacePhoto1 = async () => {
    const placeId = trip?.userSelection?.location?.value?.place_id;

    if (!placeId) {
      console.error("Place ID is missing or undefined");
      return;
    }

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

  const deleteTrip = async (tripId) => {
    try {
      await deleteTripById(tripId);
      if (onDelete) onDelete(tripId);
    } catch (error) {
      console.error("Error deleting trip", error);
    }
  };

  return (
    <div className="hover:scale-105 transition-all">
      <Link to={"/view-trip/" + trip?.id}>
        <img
          src={photoUrl ? photoUrl : "./src/assets/datathon.jpg"}
          className="object-cover rounded-xl h-[280px] w-[300px]"
          alt=""
        />
        <div>
          <h2 className="font-bold text-large">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-500">
            {" "}
            {trip?.userSelection?.noOfDays} Days trip with{" "}
            {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </Link>

      <div>
        <Button
          onClick={() => deleteTrip(trip?.id)}
          className="h-6 bg-red-500 text-sm"
        >
          Delete Trip
        </Button>
      </div>
    </div>
  );
}

export default UserTripCardItem;

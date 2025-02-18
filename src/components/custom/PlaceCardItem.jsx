import { useEffect, useState } from "react";
import { IoLocation } from "react-icons/io5";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import axios from "axios";

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlaceId = async () => {
      if (!place || !place.geoCoordinates) {
        console.error("Invalid place data");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setPhotoUrl(null);

        const { latitude, longitude } = place.geoCoordinates;

        const response = await axios.get(
          `http://localhost:3000/proxy?location=${latitude},${longitude}&radius=500`
        );

        if (response.data.status !== "OK") {
          console.error(
            "API Error:",
            response.data.status,
            response.data.error_message
          );
          setIsLoading(false);
          return;
        }

        if (response.data.results && response.data.results.length > 0) {
          const middleIndex = Math.floor(response.data.results.length / 4);
          const photoReference = response.data.results[middleIndex].photos
            ? response.data.results[middleIndex].photos[0].photo_reference
            : null;

          if (photoReference) {
            const photoUrl =
              await `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${encodeURIComponent(
                photoReference
              )}&maxwidth=1000&key=${encodeURIComponent(
                import.meta.env.VITE_GOOGLE_PLACE_API_KEY
              )}`;
            setPhotoUrl(photoUrl);
          } else {
            console.log("No photo reference found for the place.");
          }
        } else {
          console.error("No results found for the place.");
        }
      } catch (error) {
        console.error("Error fetching place details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaceId();
  }, [place]);

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place?.placeName
      )}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        {isLoading ? (
          <div className="w-[100px] h-[130px] rounded-xl bg-gray-200 animate-pulse"></div>
        ) : photoUrl ? (
          <img
            src={photoUrl}
            alt={place?.placeName}
            className="w-[100px] h-[130px] rounded-xl object-cover"
            onError={(e) => {
              console.error("Image failed to load:", e);
              e.target.src = "../src/assets/place.jpg";
            }}
          />
        ) : (
          <img
            src="../src/assets/place.jpg"
            alt="Default Place"
            className="w-[100px] h-[130px] rounded-xl object-cover"
          />
        )}

        <div>
          <h2 className="font-bold text-lg">{place?.placeName}</h2>
          <p className="text-sm text-gray-400">{place?.placeDetails}</p>
          <Button size="sm">
            <IoLocation />
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;

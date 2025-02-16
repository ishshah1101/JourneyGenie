import axios from "axios"; // Import axios to make API requests
import { useEffect, useState } from "react"; // Import React and hooks for managing state and side-effects
import { Link } from "react-router-dom"; // Import Link for navigation to Google Maps

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlaceId = async () => {
      if (!hotel || !hotel.geoCoordinates) {
        console.error("Invalid place data");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setPhotoUrl(null);

        const { latitude, longitude } = hotel.geoCoordinates;

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
            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${encodeURIComponent(
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
  }, [hotel]);

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        hotel?.hotelName
      )}`}
      target="_blank"
    >
      <div className="hover:scale-105 transition-all">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="Google Street View"
            className="rounded-xl h-[180px] w-full object-cover"
          />
        ) : (
          <img
            src="../src/assets/hotel.jpg"
            alt="Placeholder"
            className="rounded-xl h-[180px] w-full object-cover"
          />
        )}
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{hotel?.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍{hotel?.hotelAddress}</h2>
          <h2 className="text-sm">💰 {hotel?.price}</h2>
          <h2 className="text-sm">⭐ {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;

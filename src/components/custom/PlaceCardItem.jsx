// import React, { useEffect } from 'react';
// import { IoLocation } from "react-icons/io5";
// import { Button } from '../ui/button';
// import { Link } from 'react-router-dom';
// import { getPlaceId } from '@/service/GlobalApi';

// function PlaceCardItem({place}) {

//     // const link = "https://www.google.com/maps/search/?api=1&query=" +place?.placeName;
//     // console.log(link);
//     useEffect(() => {
//         console.log(place);
//         console.log(place.geoCoordinates.latitude);
//         console.log(place.geoCoordinates.longitude);
//     })

//   return (
//     <Link to={
//         "https://www.google.com/maps/search/?api=1&query=" +place?.placeName
//     }
//     target="_blank">
//     <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer '>
//         <img src="../src/assets/datathon.jpg" alt="" className='w-[100px] h-[130px] rounded-xl'/>
//         <div>
//             <h2 className='font-bold text-lg'>{place?.placeName}</h2>
//             <p className='text-sm text-gray-400'>{place.placeDetails}</p>
//             {/* <h2>{place.time}</h2> */}
//             <Button size="sm"><IoLocation /></Button>
//         </div>
//     </div>
//     </Link>
//   )
// }

// export default PlaceCardItem

//below is working code for fetching photo referece id
// import React, { useEffect, useState } from 'react';
// import { IoLocation } from "react-icons/io5";
// import { Button } from '../ui/button';
// import { Link } from 'react-router-dom';
// import axios from "axios";

// function PlaceCardItem({ place }) {
//   const [placeId, setPlaceId] = useState(null); // To store the placeId if found

//   useEffect(() => {
//     const fetchPlaceId = async () => {
//       try {
//         console.log(place);
//         console.log(place.geoCoordinates.latitude);
//         console.log(place.geoCoordinates.longitude);

//         const lat = place.geoCoordinates.latitude;
//         const long = place.geoCoordinates.longitude;

//         // Make the request to your backend proxy instead of Google API directly
//         const response = await axios.get(`http://localhost:3000/proxy`, {
//           params: {
//             location: `${lat},${long}`,
//             radius: 5,
//           },
//         });

//         // Log the response from the proxy server
//         if (response && response.data && response.data.results && response.data.results.length > 0) {
//           console.log('Place ID (photo reference):', response.data.results[0].photos[0].photo_reference);
//           setPlaceId(response.data.results[0].place_id); // Set place ID if found
//         } else {
//           console.error('No results found for the place.');
//         }
//       } catch (error) {
//         console.error('Error fetching place ID:', error);
//       }
//     };

//     // Call the async function inside useEffect
//     if (place && place.geoCoordinates) {
//       fetchPlaceId();
//     }
//   }, [place]); // Runs when the `place` prop changes

//   return (
//     <Link to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`} target="_blank">
//       <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
//         <img src="../src/assets/datathon.jpg" alt="Place" className="w-[100px] h-[130px] rounded-xl" />
//         <div>
//           <h2 className="font-bold text-lg">{place?.placeName}</h2>
//           <p className="text-sm text-gray-400">{place?.placeDetails}</p>
//           <Button size="sm">
//             <IoLocation />
//           </Button>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default PlaceCardItem;

//in below code 3/10 images are coming (using photo reference id)
// import React, { useEffect, useState } from 'react';
// import { IoLocation } from "react-icons/io5";
// import { Button } from '../ui/button';
// import { Link } from 'react-router-dom';
// import axios from "axios";

// function PlaceCardItem({ place }) {
//   // State to store the photo URL
//   const [photoUrl, setPhotoUrl] = useState('');

//   useEffect(() => {
//     const fetchPlaceId = async () => {
//       try {
//         console.log(place);
//         // console.log(place.geoCoordinates.latitude);
//         // console.log(place.geoCoordinates.longitude);

//         // Reset the photoUrl to null before every fetch
//         setPhotoUrl(null);

//         const lat = place.geoCoordinates.latitude;
//         const long = place.geoCoordinates.longitude;

//         // Make the request to the backend proxy
//         const response = await axios.get(`http://localhost:3000/proxy?location=${lat},${long}&radius=180`);

//         // Log the response from the API
//         if (response && response.data && response.data.results && response.data.results.length > 0) {
//           console.log('API Results:', response.data.results);
//           console.log('API Results:', response.data.results[response.data.results.length/2]);
          

//           // Access the last result and get the photo reference
//           // Access the last result and get the photo reference
//           const photoReference = response.data.results[response.data.results.length/2].photos
//   ? response.data.results[0].photos[0].photo_reference
//   : null;

//           console.log("Photo Reference ID:", photoReference);

//           if (photoReference) {
//             // Construct the URL for the place photo using your Google Places API key
//             const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photoReference}&maxwidth=1000&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;
//             setPhotoUrl(photoUrl); // Update the state with the new photo URL
//             console.log("Fetched Photo URL:", photoUrl);
//           } else {
//             console.log("No photo reference found for the place.");
//           }
//         } else {
//           console.error('No results found for the place.');
//         }
//       } catch (error) {
//         console.error('Error fetching place details:', error);
//       }
//     };

//     // Call the async function inside useEffect
//     if (place && place.geoCoordinates) {
//       fetchPlaceId();
//     }
//   }, [place]); // This effect runs whenever the `place` prop changes

//   return (
//     <Link to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`} target="_blank">
//       <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
//         {/* Display photo if available */}
//         {photoUrl ? (
//           <img src={photoUrl} alt="Place" className="w-[100px] h-[130px] rounded-xl" />
//         ) : (
//           <img src="../src/assets/datathon.jpg" alt="Place" className="w-[100px] h-[130px] rounded-xl" />
//         )}
//         <div>
//           <h2 className="font-bold text-lg">{place?.placeName}</h2>
//           <p className="text-sm text-gray-400">{place?.placeDetails}</p>
//           <Button size="sm">
//             <IoLocation />
//           </Button>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default PlaceCardItem;



//in below code 3/10 images are coming (using place id)
import React, { useEffect, useState } from 'react';
import { IoLocation } from "react-icons/io5";
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import axios from "axios";

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlaceId = async () => {
      if (!place || !place.geoCoordinates) {
        console.error('Invalid place data');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setPhotoUrl(null);

        const { latitude, longitude } = place.geoCoordinates;
        const response = await axios.get(`http://localhost:3000/proxy?location=${latitude},${longitude}&radius=500`);

        if (response.data.status !== 'OK') {
          console.error('API Error:', response.data.status, response.data.error_message);
          setIsLoading(false);
          return;
        }

        if (response.data.results && response.data.results.length > 0) {
          // const middleIndex = Math.floor(response.data.results.length/2 - 1);
          const middleIndex = Math.floor((response.data.results.length / 4) );
          // const middleIndex = 5;
          // console.log('Selected Result:', response.data.results[middleIndex]);

          const photoReference = response.data.results[middleIndex].photos
            ? response.data.results[middleIndex].photos[0].photo_reference
            : null;

          // console.log("Photo Reference ID:", photoReference);

          if (photoReference) {
            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${encodeURIComponent(photoReference)}&maxwidth=1000&key=${encodeURIComponent(import.meta.env.VITE_GOOGLE_PLACE_API_KEY)}`;
            setPhotoUrl(photoUrl);
            console.log("Fetched Photo URL:", photoUrl);
          } else {
            console.log("No photo reference found for the place.");
          }
        } else {
          console.error('No results found for the place.');
        }
      } catch (error) {
        console.error('Error fetching place details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaceId();
  }, [place]);

  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName)}`} target="_blank" rel="noopener noreferrer">
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        {isLoading ? (
          <div className="w-[100px] h-[130px] rounded-xl bg-gray-200 animate-pulse"></div>
        ) : photoUrl ? (
          <img 
            src={photoUrl} 
            alt={place?.placeName} 
            className="w-[100px] h-[130px] rounded-xl object-cover"
            onError={(e) => {
              console.error('Image failed to load:', e);
              e.target.src = "../src/assets/place.jpg";
            }}
          />
        ) : (
          <img src="../src/assets/place.jpg" alt="Default Place" className="w-[100px] h-[130px] rounded-xl object-cover" />
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



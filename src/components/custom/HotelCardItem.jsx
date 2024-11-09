// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// function HotelCardItem({ hotel }) {
//     const [placeId, setPlaceId] = useState(null);
//     const [errorMessage, setErrorMessage] = useState(null);
//     const [imageUrl, setImageUrl] = useState(null);
//     console.log(hotel);

//     const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY; // Your API key
//     const hotelQuery = `${hotel?.hotelName} ${hotel?.hotelAddress}`; // Combine hotel name and address

//     // Function to fetch the Place ID using the Places API Text Search with GET request
//     const fetchPlaceId = async () => {
//         try {

//             const response = await axios.get(
//                 `https://maps.googleapis.com/maps/api/place/textsearch/json`,
//                 {
//                     params: {
//                         query: hotelQuery,  // Hotel name and address as the query
//                         key: apiKey,
//                     }
//                 }
//             );

//             const data = response.data;

//             if (data.status === 'OK' && data.results.length > 0) {
//                 const fetchedPlaceId = data.results[0].place_id;
//                 console.log(fetchPlaceId);

//                 setPlaceId(fetchedPlaceId); // Set the fetched place ID

//                 fetchGoogleImage(fetchedPlaceId); // Fetch Google Street View image
//             } else {
//                 setErrorMessage('Place ID not found.');
//             }
//         } catch (error) {
//             setErrorMessage('Error fetching Place ID');
//         }
//     };

//     // Function to fetch the Google Street View image using the Place ID
//     const fetchGoogleImage = (placeId) => {
//         const imageUrl = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=place_id:${placeId}&key=${apiKey}`;
//         setImageUrl(imageUrl);  // Set the image URL in the state
//     };

//     useEffect(() => {
//         if (hotel) {
//             fetchPlaceId();  // Fetch place ID when the hotel details are available
//         }
//     }, [hotel]);

//     return (
//         <Link
//             to={
//                 "https://www.google.com/maps/search/?api=1&query=" + hotel?.hotelName + ',' + hotel?.hotelAddress
//             }
//             target="_blank"
//         >
//             <div className="hover:scale-105 transition-all">
//                 {imageUrl ? (
//                     <img src={imageUrl} alt="Google Street View" className="rounded-xl h-[180px] w-full object-cover" />
//                 ) : (
//                     <img src='../src/assets/datathon.jpg' alt="Placeholder" className="rounded-xl h-[180px] w-full object-cover" />
//                 )}
//                 <div className="my-2 flex flex-col gap-2">
//                     <h2 className="font-medium">{hotel?.hotelName}</h2>
//                     <h2 className="text-xs text-gray-500">📍{hotel?.hotelAddress}</h2>
//                     <h2 className="text-sm">💰 {hotel?.price}</h2>
//                     <h2 className="text-sm">⭐ {hotel?.rating}</h2>
//                 </div>
//             </div>
//         </Link>
//     );
// }

// export default HotelCardItem;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoLocation } from "react-icons/io5";
import { Button } from '../ui/button';

function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPlaceId = async () => {
            if (!hotel || !hotel.geoCoordinates) {
                console.error('Invalid place data');
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setPhotoUrl(null);

                const { latitude, longitude } = hotel.geoCoordinates;
                const response = await axios.get(`http://localhost:3000/proxy?location=${latitude},${longitude}&radius=500`);

                if (response.data.status !== 'OK') {
                    console.error('API Error:', response.data.status, response.data.error_message);
                    setIsLoading(false);
                    return;
                }

                if (response.data.results && response.data.results.length > 0) {
                    const middleIndex = Math.floor((response.data.results.length / 4));

                    const photoReference = response.data.results[middleIndex].photos
                        ? response.data.results[middleIndex].photos[0].photo_reference
                        : null;

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
    }, [hotel]);
    return (
        <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName)}`}
            target="_blank"
        >
            <div className="hover:scale-105 transition-all">
                {photoUrl ? (
                    <img src={photoUrl} alt="Google Street View" className="rounded-xl h-[180px] w-full object-cover" />
                ) : (
                    <img src='../src/assets/hotel.jpg' alt="Placeholder" className="rounded-xl h-[180px] w-full object-cover" />
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
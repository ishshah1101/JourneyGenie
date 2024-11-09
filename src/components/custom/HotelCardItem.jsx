import axios from 'axios'; // Import axios to make API requests
import React, { useEffect, useState } from 'react'; // Import React and hooks for managing state and side-effects
import { Link } from 'react-router-dom'; // Import Link for navigation to Google Maps

function HotelCardItem({ hotel }) {
    // State for storing photo URL and loading state
    const [photoUrl, setPhotoUrl] = useState(''); // Stores the URL for the hotel photo
    const [isLoading, setIsLoading] = useState(true); // Tracks whether data is still loading

    useEffect(() => {
        // Function to fetch the place details from the API based on geo-coordinates
        const fetchPlaceId = async () => {
            // Early return if hotel or geoCoordinates are missing
            if (!hotel || !hotel.geoCoordinates) {
                console.error('Invalid place data');
                setIsLoading(false);
                return;
            }

            try {
                // Set loading state to true while fetching
                setIsLoading(true);
                setPhotoUrl(null); // Reset the photo URL to null while loading

                // Destructure latitude and longitude from the hotel's geo-coordinates
                const { latitude, longitude } = hotel.geoCoordinates;

                // Make a request to the backend API for the place's details based on the geo-coordinates
                const response = await axios.get(`http://localhost:3000/proxy?location=${latitude},${longitude}&radius=500`);

                // Handle API errors or non-OK statuses
                if (response.data.status !== 'OK') {
                    console.error('API Error:', response.data.status, response.data.error_message);
                    setIsLoading(false); // Set loading to false on error
                    return;
                }

                // Process the results if available
                if (response.data.results && response.data.results.length > 0) {
                    // Get the photo reference of a place from the middle of the results array
                    const middleIndex = Math.floor((response.data.results.length / 4));
                    const photoReference = response.data.results[middleIndex].photos
                        ? response.data.results[middleIndex].photos[0].photo_reference
                        : null;

                    // If photo reference exists, construct the photo URL using the Google Places API
                    if (photoReference) {
                        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${encodeURIComponent(photoReference)}&maxwidth=1000&key=${encodeURIComponent(import.meta.env.VITE_GOOGLE_PLACE_API_KEY)}`;
                        setPhotoUrl(photoUrl); // Update state with the photo URL
                    } else {
                        console.log("No photo reference found for the place.");
                    }
                } else {
                    console.error('No results found for the place.');
                }
            } catch (error) {
                // Log any errors encountered during the API request
                console.error('Error fetching place details:', error);
            } finally {
                // Set loading to false when the fetch is complete
                setIsLoading(false);
            }
        };

        fetchPlaceId(); // Call the function to fetch place details when the component mounts or hotel data changes
    }, [hotel]); // The effect depends on the `hotel` prop

    return (
        <Link
            // Navigate to the Google Maps search for the hotel using its name
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName)}`}
            target="_blank" // Open the link in a new tab
        >
            <div className="hover:scale-105 transition-all">
                {/* Display the photo or a placeholder image while loading */}
                {photoUrl ? (
                    <img src={photoUrl} alt="Google Street View" className="rounded-xl h-[180px] w-full object-cover" />
                ) : (
                    <img src='../src/assets/hotel.jpg' alt="Placeholder" className="rounded-xl h-[180px] w-full object-cover" />
                )}
                <div className="my-2 flex flex-col gap-2">
                    {/* Display the hotel name, address, price, and rating */}
                    <h2 className="font-medium">{hotel?.hotelName}</h2>
                    <h2 className="text-xs text-gray-500">📍{hotel?.hotelAddress}</h2>
                    <h2 className="text-sm">💰 {hotel?.price}</h2>
                    <h2 className="text-sm">⭐ {hotel?.rating}</h2>
                </div>
            </div>
        </Link>
    );
}

export default HotelCardItem; // Export the component for use in other parts of the app
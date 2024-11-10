// Import necessary modules from React and components
import React, { useEffect, useState } from "react";
import UserTripCardItem from "@/components/custom/UserTripCardItem";

// Define the FavouriteTrips functional component
function FavouriteTrips() {
  // Initialize state to store the list of favorite trips
  const [favoriteTrips, setFavoriteTrips] = useState([]);

  // useEffect hook to load favorite trips when the component mounts
  useEffect(() => {
    GetFavoriteTrips();
  }, []);

  /**
   * Retrieves the list of favorite trips from localStorage
   * and updates the favoriteTrips state
   */
  const GetFavoriteTrips = () => {
    const storedFavorites = localStorage.getItem('favoriteTrips');
    if (storedFavorites) {
      // Parse the stored favorite trips and set them in state
      setFavoriteTrips(JSON.parse(storedFavorites));
    }
  };

  /**
   * Removes a trip from the list of favorite trips
   * @param {string} tripId - The unique ID of the trip to be removed
   */
  const handleRemoveFavorite = (tripId) => {
    // Filter out the trip with the given ID from favoriteTrips
    const updatedFavorites = favoriteTrips.filter((trip) => trip.id !== tripId);
    // Update the favoriteTrips state and localStorage
    setFavoriteTrips(updatedFavorites);
    localStorage.setItem('favoriteTrips', JSON.stringify(updatedFavorites));
  };

  // Render the Favorite Trips section
  return (
    <div className="sm:px-10 md:px-32 p-10 md:px-20 mt-10 lg:px-36">
      <h2 className="font-bold text-3xl">Favorite Trips</h2>

      {/* Display favorite trips or a message if there are none */}
      <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
        {favoriteTrips?.length > 0
          ? favoriteTrips.map((trip, index) => (
              // Render each favorite trip as a UserTripCardItem with a delete handler
              <UserTripCardItem key={index} trip={trip} onDelete={handleRemoveFavorite} />
            ))
          : <div>
              {/* Display message when there are no favorite trips */}
              <h3 className="w-full">No trip added as Favourite Trips</h3>
            </div>
        }
      </div>
    </div>
  );
}

// Export the FavouriteTrips component
export default FavouriteTrips;

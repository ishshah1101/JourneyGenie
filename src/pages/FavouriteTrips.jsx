import  { useEffect, useState } from "react";
import UserTripCardItem from "@/components/custom/UserTripCardItem";


function FavouriteTrips() {

  const [favoriteTrips, setFavoriteTrips] = useState([]);


  useEffect(() => {
    GetFavoriteTrips();
  }, []);

  
  const GetFavoriteTrips = () => {
    const storedFavorites = localStorage.getItem('favoriteTrips');
    if (storedFavorites) {
     
      setFavoriteTrips(JSON.parse(storedFavorites));
    }
  };

  
  const handleRemoveFavorite = (tripId) => {
  
    const updatedFavorites = favoriteTrips.filter((trip) => trip.id !== tripId);

    setFavoriteTrips(updatedFavorites);
    localStorage.setItem('favoriteTrips', JSON.stringify(updatedFavorites));
  };

 
  return (
    <div className="sm:px-10 md:px-32 p-10 md:px-20 mt-10 lg:px-36">
      <h2 className="font-bold text-3xl">Favorite Trips</h2>

    
      <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
        {favoriteTrips?.length > 0
          ? favoriteTrips.map((trip, index) => (
           
              <UserTripCardItem key={index} trip={trip} onDelete={handleRemoveFavorite} />
            ))
          : <div>
              <h3 className="w-full">No trip added as Favourite Trips</h3>
            </div>
        }
      </div>
    </div>
  );
}

export default FavouriteTrips;

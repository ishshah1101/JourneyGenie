import Footer from '@/components/custom/Footer';
import Hotels from '@/components/custom/Hotels';
import InfoSection from '@/components/custom/InfoSection';
import PlacesToVisit from '@/components/custom/PlacesToVisit';
import { Button } from '@/components/ui/button';
import { db } from '@/service/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function ViewTrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState({});
    const [favorites, setFavorites] = useState(() => {
        // Load favorites from local storage on initial render
        const storedFavorites = localStorage.getItem('favoriteTrips');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    useEffect(() => {
        if (tripId) {
            GetTripData();
        }
    }, [tripId]);

    // Fetch trip data from Firestore
    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setTrip(docSnap.data());
        } else {
            console.log("No such document exists in firebase");
            toast("No trip found");
        }
    };

    // Function to handle adding/removing from favorites
    const toggleFavorite = () => {
        const isFavorite = favorites.some(favorite => favorite.id === tripId);
        
        if (isFavorite) {
            // Remove from favorites
            const updatedFavorites = favorites.filter(favorite => favorite.id !== tripId);
            setFavorites(updatedFavorites);
            localStorage.setItem('favoriteTrips', JSON.stringify(updatedFavorites));
            toast("Removed from favorites");
        } else {
            // Add to favorites
            const newFavorite = { id: tripId, ...trip }; // Assuming trip contains necessary info
            const updatedFavorites = [...favorites, newFavorite];
            setFavorites(updatedFavorites);
            localStorage.setItem('favoriteTrips', JSON.stringify(updatedFavorites));
            toast("Added to favorites");
        }
    };

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {/* Information section */}
            <InfoSection trip={trip} />
            {/* Hotels Section */}
            <Hotels trip={trip} />
            {/* Daily Itinerary plan */}
            <PlacesToVisit trip={trip} />

            {/* Add to favorite trip button */}
            <div className='mt-10 flex pe-3 justify-end '>
                <Button className='hover:scale-105 transition-all' onClick={toggleFavorite}>
                    {favorites.some(favorite => favorite.id === tripId) ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
            </div>

            {/* Footer section */}
            <Footer trip={trip} />
        </div>
    );
}

export default ViewTrip;

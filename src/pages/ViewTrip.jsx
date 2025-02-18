import { useEffect, useState } from 'react';
import Hotels from '@/components/custom/Hotels';
import InfoSection from '@/components/custom/InfoSection';
import PlacesToVisit from '@/components/custom/PlacesToVisit';
import { Button } from '@/components/ui/button';
import { db } from '@/service/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function ViewTrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState({});
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem('favoriteTrips');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    useEffect(() => {
        if (tripId) {
            GetTripData();
        }
    }, [tripId]);

   
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

   
    const toggleFavorite = () => {
        const isFavorite = favorites.some(favorite => favorite.id === tripId);
        
        if (isFavorite) {
            const updatedFavorites = favorites.filter(favorite => favorite.id !== tripId);
            setFavorites(updatedFavorites);
            localStorage.setItem('favoriteTrips', JSON.stringify(updatedFavorites));
            toast("Removed from favorites");
        } else {
            const newFavorite = { id: tripId, ...trip };
            const updatedFavorites = [...favorites, newFavorite];
            setFavorites(updatedFavorites);
            localStorage.setItem('favoriteTrips', JSON.stringify(updatedFavorites));
            toast("Added to favorites");
        }
    };

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
   
            <InfoSection trip={trip} />
       
            <Hotels trip={trip} />
          
            <PlacesToVisit trip={trip} />

         
            <div className='mt-10 flex pe-3 justify-end '>
                <Button className='hover:scale-105 transition-all' onClick={toggleFavorite}>
                    {favorites.some(favorite => favorite.id === tripId) ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
            </div>
        </div>
    );
}

export default ViewTrip;
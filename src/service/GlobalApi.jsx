import axios from "axios";
import { doc, deleteDoc } from "firebase/firestore"; 
import { db } from "./FirebaseConfig";

const base_url1 = 'https://places.googleapis.com/v1/places/';


const config1 = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask': [
            'places.photos',
            'places.displayName',
            'places.id',
        ]
    }
}

export const getplacedetails1 = (placeId) =>
    axios.get(`${base_url1}${placeId}?fields=id,photos,displayName,id&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`);

export const deleteTripById = async (tripId) => {
    try {
        const tripRef = doc(db, 'AITrips', tripId);
        await deleteDoc(tripRef); // Delete the document
        console.log("Trip deleted successfully from Firebase");
    } catch (error) {
        console.error('Error deleting trip from Firebase', error);
        throw error;
    }
};

// export const getHotelDetails1 = (query) => axios.get(`${base_hotel_url}${query}&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`);

import axios from "axios";
import { doc, deleteDoc } from "firebase/firestore"; 
import { db } from "./FirebaseConfig";

// to get place details by place ID
export const getplacedetails1 = async (placeId) =>
    await axios.get(`https://places.googleapis.com/v1/places/${placeId}?fields=id,photos,displayName,id&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`);

//to delete a trip by its document ID in Firebase
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

//to get place ID based on latitude and longitude
export const getPlaceId = async (latitude, longitude) => {
    await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`);
};
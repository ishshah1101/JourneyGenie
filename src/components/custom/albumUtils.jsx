import { db } from "@/service/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

// Function to organize photos into albums based on date and location
export const createPhotoAlbum = async (tripId) => {
  const tripQuery = query(collection(db, 'trips'), where('tripId', '==', tripId));
  const querySnapshot = await getDocs(tripQuery);
  const tripData = querySnapshot.docs[0].data();

  const albums = {};
  tripData.photos.forEach(photo => {
    const albumKey = `${photo.dateTaken}_${photo.location}`;
    
    if (!albums[albumKey]) {
      albums[albumKey] = [];
    }
    albums[albumKey].push(photo.url);
  });

  return albums;  // Returns albums grouped by date and location
};

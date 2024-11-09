import { db, storage } from "@/service/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const addTripJournalEntry = async (journalEntryData, photos, videos) => {
  try {
    const { note } = journalEntryData;

    // Generate a unique document ID using timestamp
    const docId = Date.now().toString(); 

    let photoURLs = [];
    let videoURLs = [];

    // Upload photos and get their download URLs
    if (photos && photos.length > 0) {
      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        const photoRef = ref(storage, `journalPhotos/${docId}/${photo.name}`);
        await uploadBytes(photoRef, photo);
        const downloadURL = await getDownloadURL(photoRef);
        photoURLs.push(downloadURL);
      }
    }

    // Upload videos and get their download URLs
    if (videos && videos.length > 0) {
      for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        const videoRef = ref(storage, `journalVideos/${docId}/${video.name}`);
        await uploadBytes(videoRef, video);
        const downloadURL = await getDownloadURL(videoRef);
        videoURLs.push(downloadURL);
      }
    }

    // Create journal entry object
    const journalEntry = {
      note,
      photos: photoURLs,
      videos: videoURLs,
      timestamp: new Date().toISOString(), 
    };

    // Save journal entry to Firestore
    await setDoc(doc(db, "TripJournals", docId), journalEntry);

    console.log("Journal entry uploaded successfully.");
  } catch (error) {
    console.error("Error uploading journal entry: ", error);
    throw new Error("Failed to upload journal entry. Please try again.");
  }
};
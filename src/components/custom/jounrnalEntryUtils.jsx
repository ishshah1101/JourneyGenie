import { db, storage } from "@/service/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


export const addTripJournalEntry = async (journalEntryData, photos, videos) => {
  try {
    const { note } = journalEntryData;

    // 1. Create a unique ID for the journal entry
    const docId = Date.now().toString(); // Example: using timestamp

    // 2. Initialize arrays to store the URLs of uploaded photos and videos
    let photoURLs = [];
    let videoURLs = [];

    // 3. Upload photos to Firebase Storage (if photos exist)
    if (photos) {
      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        const photoRef = ref(storage, `journalPhotos/${docId}/${photo.name}`);
        await uploadBytes(photoRef, photo); // Upload the photo
        const downloadURL = await getDownloadURL(photoRef); // Get the download URL
        photoURLs.push(downloadURL); // Add the URL to the array
      }
    }

    // 4. Upload videos to Firebase Storage (if videos exist)
    if (videos) {
      for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        const videoRef = ref(storage, `journalVideos/${docId}/${video.name}`);
        await uploadBytes(videoRef, video); // Upload the video
        const downloadURL = await getDownloadURL(videoRef); // Get the download URL
        videoURLs.push(downloadURL); // Add the URL to the array
      }
    }

    // 5. Prepare the journal entry object with note, photo URLs, and video URLs
    const journalEntry = {
      note,
      photos: photoURLs, // Store the photo URLs
      videos: videoURLs, // Store the video URLs
      timestamp: new Date().toISOString(), // Optional: add timestamp
    };

    // 6. Store the journal entry in Firestore
    await setDoc(doc(db, "TripJournals", docId), journalEntry);

    console.log("Journal entry uploaded successfully.");
  } catch (error) {
    console.error("Error uploading journal entry: ", error);
    throw new Error("Failed to upload journal entry. Please try again.");
  }
};

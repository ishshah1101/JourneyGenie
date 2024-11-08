import React, { useState } from 'react';
import { db, storage } from '@/service/FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const CreateJournal = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Get the current user info from local storage
  const [note, setNote] = useState('');
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [journalDate, setJournalDate] = useState(''); // State for selected date
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (file) => {
    const storageRef = ref(storage, `journals/${user.email}/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef); // Return the URL for the uploaded file
  };

  const handleCreateJournal = async () => {
    if (!user) {
      toast("User not logged in!", { status: 'error' });
      return;
    }

    if (!journalDate) {
      toast("Please select a date for the journal entry.", { status: 'error' });
      return;
    }

    if (!note && photos.length === 0 && videos.length === 0) {
      toast("Please add notes, photos, or videos to create a journal entry.", { status: 'error' });
      return;
    }

    setLoading(true);
    try {
      // Upload photos and videos and get their URLs
      const photoUrls = await Promise.all(photos.map(photo => handleFileUpload(photo)));
      const videoUrls = await Promise.all(videos.map(video => handleFileUpload(video)));

      // Create a journal entry linked to the user's Gmail account (user.email)
      const journalEntry = {
        userId: user.email,  // Use the user's email as unique ID
        notes: [note],       // Notes entered by the user
        photos: photoUrls,   // Uploaded photo URLs
        videos: videoUrls,   // Uploaded video URLs
        journalDate,         // Selected date of the journal entry
        createdAt: new Date(),
      };

      await addDoc(collection(db, 'TripJournals'), journalEntry);

      // Show success toast after journal entry submission
      toast("Journal entry created successfully!", { status: 'success' });

      // Reset form fields
      setNote('');
      setPhotos([]);
      setVideos([]);
      setJournalDate('');
    } catch (error) {
      console.error('Error creating journal entry:', error);
      toast("Failed to create journal entry. Please try again.", { status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Create Journal Entry</h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your notes..."
        className="w-full p-4 mt-4 border rounded-lg"
      />
      <div className='mt-4'>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setPhotos([...e.target.files])}
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="file"
          multiple
          accept="video/*"
          onChange={(e) => setVideos([...e.target.files])}
          className="w-full p-2 mt-4 border rounded-lg"
        />
      </div>
      <div className='mt-4'>
        <label htmlFor="journalDate" className='block font-semibold mb-2'>Journal Date:</label>
        <input
          type="date"
          id="journalDate"
          value={journalDate}
          onChange={(e) => setJournalDate(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <div className='my-10 justify-end flex'>
        <Button onClick={handleCreateJournal} disabled={loading} className=" text-white p-4 rounded-lg">
          {loading ? 'Submitting...' : 'Submit Journal Entry'}
        </Button>
      </div>
    </div>
  );
};

export default CreateJournal;

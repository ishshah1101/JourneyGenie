// import React, { useEffect, useState } from 'react';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { format, parseISO, isWithinInterval } from 'date-fns';
// import { db } from '@/service/FirebaseConfig';

// const TripJournal = () => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   const [journalEntries, setJournalEntries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   useEffect(() => {
//     const fetchJournalEntries = async () => {
//       if (!user) {
//         console.error("User not logged in");
//         setLoading(false);
//         return;
//       }

//       try {
//         const q = query(collection(db, 'TripJournals'), where('userId', '==', user.email));
//         const querySnapshot = await getDocs(q);
//         const entries = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

//         // Sort entries by journalDate in descending order
//         const sortedEntries = entries.sort((a, b) => {
//           return new Date(b.journalDate) - new Date(a.journalDate);
//         });

//         setJournalEntries(sortedEntries);
//       } catch (error) {
//         console.error("Error fetching journal entries:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJournalEntries();
//   }, [user]);

//   const filteredEntries = journalEntries.filter(entry => {
//     if (!startDate && !endDate) return true;
//     const entryDate = new Date(entry.journalDate);
//     const start = startDate ? parseISO(startDate) : new Date(0);
//     const end = endDate ? parseISO(endDate) : new Date();
//     return isWithinInterval(entryDate, { start, end });
//   });

//   if (loading) {
//     return <p>Loading journal entries...</p>;
//   }

//   if (filteredEntries.length === 0) {
//     return (
//         <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
//         <h2 className="text-3xl font-bold mb-6">My Journal Entries</h2>
//         <p>No journal entries found for the selected date range.</p>
//         </div>
//     );
//   }

//   return (
//     <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
//       <h2 className="text-3xl font-bold mb-6">My Journal Entries</h2>

//       <div className="mb-4 flex gap-4">
//         <div>
//           <label htmlFor="startDate" className="block mb-2">Start Date:</label>
//           <input
//             type="date"
//             id="startDate"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="border rounded p-2 w-full"
//           />
//         </div>
//         <div>
//           <label htmlFor="endDate" className="block mb-2">End Date:</label>
//           <input
//             type="date"
//             id="endDate"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             className="border rounded p-2 w-full"
//           />
//         </div>
//       </div>

//       {filteredEntries.map((entry, index) => (
//         <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-8 border">
//           <div className="mb-4">
//             <h3 className="text-2xl font-semibold mb-2">Journal Entry {index + 1}</h3>
//             <p className="text-gray-600">Date: {format(new Date(entry.journalDate), 'MMMM d, yyyy')}</p>
//           </div>

//           {/* Notes */}
//           <div className="mb-4">
//             <h4 className="text-xl font-semibold">Notes:</h4>
//             {entry.notes?.length > 0 ? (
//               entry.notes.map((note, i) => <p key={i} className="text-gray-700">{note}</p>)
//             ) : (
//               <p className="text-gray-500">No notes available.</p>
//             )}
//           </div>

//           {/* Photos */}
//           <div className="mb-4">
//             <h4 className="text-xl font-semibold">Photos:</h4>
//             {entry.photos?.length > 0 ? (
//               <div className="flex gap-4 flex-wrap">
//                 {entry.photos.map((photoUrl, i) => (
//                   <img key={i} src={photoUrl} alt={`Photo ${i}`} className="w-40 h-40 object-cover rounded-md shadow-md" />
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No photos available.</p>
//             )}
//           </div>

//           {/* Videos */}
//           <div className="mb-4">
//             <h4 className="text-xl font-semibold">Videos:</h4>
//             {entry.videos?.length > 0 ? (
//               <div className="flex gap-4 flex-wrap">
//                 {entry.videos.map((videoUrl, i) => (
//                   <video key={i} controls className="w-80 rounded-md shadow-md">
//                     <source src={videoUrl} type="video/mp4" />
//                   </video>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No videos available.</p>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TripJournal;

import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { format, parseISO, isWithinInterval } from 'date-fns';
import { db } from '@/service/FirebaseConfig';

const TripJournal = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [journalEntries, setJournalEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchJournalEntries = async () => {
      if (!user) {
        console.error("User not logged in");
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, 'TripJournals'), where('userId', '==', user.email));
        const querySnapshot = await getDocs(q);
        const entries = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Sort entries by journalDate in descending order
        const sortedEntries = entries.sort((a, b) => {
          return new Date(b.journalDate) - new Date(a.journalDate);
        });

        setJournalEntries(sortedEntries);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJournalEntries();
  }, [user]);

  const filteredEntries = journalEntries.filter(entry => {
    if (!startDate && !endDate) return true;
    const entryDate = new Date(entry.journalDate);
    const start = startDate ? parseISO(startDate) : new Date(0);
    const end = endDate ? parseISO(endDate) : new Date();
    return isWithinInterval(entryDate, { start, end });
  });

  if (loading) {
    return <p>Loading journal entries...</p>;
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="text-3xl font-bold mb-6">My Journal Entries</h2>

      <div className="mb-4 flex gap-4">
        <div>
          <label htmlFor="startDate" className="block mb-2">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block mb-2">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
      </div>

      {filteredEntries.length === 0 ? (
        <p className='pt-10 pb-10'>No journal entries found for the selected date range.</p>
      ) : (
        filteredEntries.map((entry, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-8 border">
            <div className="mb-4">
              <h3 className="text-2xl font-semibold mb-2">Journal Entry {index + 1}</h3>
              <p className="text-gray-600">Date: {format(new Date(entry.journalDate), 'MMMM d, yyyy')}</p>
            </div>

            {/* Notes */}
            <div className="mb-4">
              <h4 className="text-xl font-semibold">Notes:</h4>
              {entry.notes?.length > 0 ? (
                entry.notes.map((note, i) => <p key={i} className="text-gray-700">{note}</p>)
              ) : (
                <p className="text-gray-500">No notes available.</p>
              )}
            </div>

            {/* Photos */}
            <div className="mb-4">
              <h4 className="text-xl font-semibold">Photos:</h4>
              {entry.photos?.length > 0 ? (
                <div className="flex gap-4 flex-wrap">
                  {entry.photos.map((photoUrl, i) => (
                    <img key={i} src={photoUrl} alt={`Photo ${i}`} className="w-40 h-40 object-cover rounded-md shadow-md" />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No photos available.</p>
              )}
            </div>

            {/* Videos */}
            <div className="mb-4">
              <h4 className="text-xl font-semibold">Videos:</h4>
              {entry.videos?.length > 0 ? (
                <div className="flex gap-4 flex-wrap">
                  {entry.videos.map((videoUrl, i) => (
                    <video key={i} controls className="w-80 rounded-md shadow-md">
                      <source src={videoUrl} type="video/mp4" />
                    </video>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No videos available.</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TripJournal;
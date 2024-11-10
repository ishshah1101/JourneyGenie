import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore"; // Firebase Firestore utilities
import React, { useEffect, useState } from "react"; // React hooks for component state and lifecycle
import { useNavigate } from "react-router-dom"; // Navigation hook
import { db } from "@/service/FirebaseConfig"; // Firebase configuration
import UserTripCardItem from "@/components/custom/UserTripCardItem"; // Component for displaying individual trips
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog"; // Dialog components
import { Button } from "@/components/ui/button"; // Button component

function MyTrips() {
  const [userTrips, setUserTrips] = useState([]); // Stores user trips
  const [openDialog, setOpenDialog] = useState(false); // Dialog visibility state
  const [tripToDelete, setTripToDelete] = useState(null); // Stores ID of trip to delete
  const navigation = useNavigate();

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigation("/"); // Redirect to home if user not found
      return;
    }

    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push({ ...doc.data(), id: doc.id }); // Retrieve trip data with ID
    });
    setUserTrips(trips);
  };

  const handleDeleteTrip = (tripId) => {
    setTripToDelete(tripId);
    setOpenDialog(true); // Show delete confirmation dialog
  };

  const confirmDelete = async () => {
    if (tripToDelete) {
      await deleteDoc(doc(db, "AITrips", tripToDelete)); // Delete trip from Firestore
      setUserTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripToDelete)); // Update local trips state
    }
    setOpenDialog(false); // Close dialog after deletion
  };

  return (
    <div className="sm:px-10 md:px-32 p-10 md:px-20 mt-10 lg:px-36">
      <h2 className="font-bold text-3xl">My Trips</h2>

      {/* Trip display grid */}
      <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
        {userTrips.length > 0
          ? userTrips.map((trip, index) => (
              <UserTripCardItem
                key={index}
                trip={trip}
                onDelete={handleDeleteTrip} // Trigger delete dialog on click
              />
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div> // Placeholder for loading state
            ))}
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <h2 className="font-bold text-lg mt-7 text-black">Confirm Deletion</h2>
              <p>Are you sure you want to delete this trip? This action cannot be undone.</p>
              <div className="flex justify-end mt-5">
                <Button onClick={confirmDelete} className="bg-red-600 text-white">Delete</Button>
                <Button onClick={() => setOpenDialog(false)} className="ml-3">Cancel</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MyTrips;

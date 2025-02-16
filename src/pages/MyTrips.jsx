import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "@/service/FirebaseConfig";
import UserTripCardItem from "@/components/custom/UserTripCardItem";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function MyTrips() {
  const [userTrips, setUserTrips] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);
  const navigation = useNavigate();

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigation("/");
      return;
    }

    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push({ ...doc.data(), id: doc.id });
    });
    setUserTrips(trips);
  };

  const handleDeleteTrip = (tripId) => {
    setTripToDelete(tripId);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (tripToDelete) {
      await deleteDoc(doc(db, "AITrips", tripToDelete));
      setUserTrips((prevTrips) =>
        prevTrips.filter((trip) => trip.id !== tripToDelete)
      );
    }
    setOpenDialog(false);
  };

  return (
    <div className="sm:px-10 md:px-32 p-10 md:px-20 mt-10 lg:px-36">
      <h2 className="font-bold text-3xl">My Trips</h2>

      <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
        {userTrips.length > 0
          ? userTrips.map((trip, index) => (
              <UserTripCardItem
                key={index}
                trip={trip}
                onDelete={handleDeleteTrip}
              />
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div>
            ))}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <h2 className="font-bold text-lg mt-7 text-black">
                Confirm Deletion
              </h2>
              <p>
                Are you sure you want to delete this trip? This action cannot be
                undone.
              </p>
              <div className="flex justify-end mt-5">
                <Button
                  onClick={confirmDelete}
                  className="bg-red-600 text-white"
                >
                  Delete
                </Button>
                <Button onClick={() => setOpenDialog(false)} className="ml-3">
                  Cancel
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MyTrips;

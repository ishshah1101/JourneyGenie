import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import { db } from "@/service/FirebaseConfig";
import UserTripCardItem from "@/components/custom/UserTripCardItem";

function MyTrips() {
  useEffect(() => {
    GetUserTrips();
  }, []);

  const navigation = useNavigation();
  const [userTrips, setUserTrips] = useState([]);

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
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      setUserTrips((prevVal) => [...prevVal, { ...doc.data(), id: doc.id }]); // Include the document ID
    });
  };

  const handleDeleteTrip = (tripId) => {
    // Filter out the deleted trip from the state
    setUserTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
  };

  return (
    <div className="sm:px-10 md:px-32 p-10 md:px-20 mt-10 lg:px-36">
      <h2 className="font-bold text-3xl">My Trips</h2>

      <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
        {userTrips?.length > 0
          ? userTrips.map((trip, index) => (
              <UserTripCardItem key={index} trip={trip} onDelete={handleDeleteTrip} />
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default MyTrips;

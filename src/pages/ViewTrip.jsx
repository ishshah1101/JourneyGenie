import Footer from '@/components/custom/Footer';
import Hotels from '@/components/custom/Hotels';
import InfoSection from '@/components/custom/InfoSection';
import PlacesToVisit from '@/components/custom/PlacesToVisit';
import { db } from '@/service/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';

function ViewTrip() {
    const {tripId} = useParams();
    // console.log(tripId);
    
    const[trip,setTrip] = useState([]);
    useEffect(()=>{
       tripId && GetTripData();
    },[tripId]);

    // to get the information from the firebase
    const GetTripData = async()=>{
        const docRef = doc(db,'AITrips',tripId);
        const docSnap = await getDoc(docRef);
    
        if(docSnap.exists()){
            // console.log("Document:",docSnap.data());
            setTrip(docSnap.data());
        } else{
            console.log("No such document exists in firebase");
            toast("No trip found");
        }
    }

    return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* Information section */}
        <InfoSection trip={trip}/>
        {/* Hotels Section */}
        <Hotels trip={trip}/>
        {/* Dail Itinary plan */}
        <PlacesToVisit trip={trip}/>
        {/* Footer section */}
        <Footer trip={trip}/>
    </div>
  )
}

export default ViewTrip;
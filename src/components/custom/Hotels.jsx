import React from "react";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
    return (
        <div>
            <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>
            {/* Grid layout for hotel cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {/* Map through hotels and render HotelCardItem for each */}
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <HotelCardItem key={index} hotel={hotel}/> 
                ))}
            </div>
        </div>
    );
}

export default Hotels;
import React, { useEffect } from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className='font-bold text-lg'>Places to Visit</h2>
        <div>
            {/* Map through each day in the itinerary */}
            {trip?.tripData?.itinerary?.map((item,index)=>(
                <div key={index} className='mt-5'>
                    {/* Display the day */}
                    <h2 className='font-medium text-lg'>{item?.day}</h2>
                    {/* Grid layout for activities */}
                    <div className='grid md:grid-cols-2 gap-5'>
                    {/* Map through activities for each day */}
                    {item.activities.map((place,index)=>(
                        <div key={index} >
                            {/* Display activity time */}
                            <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
                            {/* Render PlaceCardItem component for each place */}
                            <PlaceCardItem place={place}/>
                        </div>
                    ))}
                </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit
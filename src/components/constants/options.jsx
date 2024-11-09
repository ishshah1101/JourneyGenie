export const SelectTravelsList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveles in exploration',
        icon: '🧍',
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travellers in tandem',
        icon: '👫',
        people: '2 people'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'Group of fun loving adv',
        icon: '👨‍👩‍👦',
        people: '3 to 5 people'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seeks',
        icon: '🧑‍🧑‍🧒‍🧒',
        people: '5 to 10 people'
    },
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay consicous of costs',
        icon: '🏷',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on average size',
        icon: '💲',
    },
    {
        id: 3,
        title: 'Luxary',
        desc: 'Dont worry about cost',
        icon: '💵',
    },
]

export const AI_PROMPT = 'Generate Travel Plan for Location: {location} for {totalDays} Days for {traveller} people with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format. Generate for hotels recommendations as well as for trip itinaery planner in array in json format.';
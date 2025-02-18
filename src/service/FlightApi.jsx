import axios from 'axios';

const API_HOST = 'https://tripadvisor16.p.rapidapi.com';
// const API_KEY = '67d9de671emsh00be9539178feb5p1b440djsnd2d955e57427';
const API_KEY = '0064acb0bdmsh8ce8335f616311dp1446fcjsn94de5b0ede26';

export const searchAirports = async (query) => {
  const response = await axios.get(`${API_HOST}/api/v1/flights/searchAirport?query=${query.toLowerCase()}`,
   { headers: {
      'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com',
      'x-rapidapi-key': API_KEY,
    },
  });
  console.log(query.toLowerCase());
  
  return response;
};


export const searchFlights = async (sourceAirportCode, destinationAirportCode, travelDate, numAdults, numSeniors) => {
  try {
    console.log(sourceAirportCode);
    console.log(destinationAirportCode);
    console.log(travelDate);

      const response = await axios.get(`https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights?sourceAirportCode=${sourceAirportCode}&destinationAirportCode=${destinationAirportCode}&date=${travelDate}&itineraryType=ONE_WAY&sortOrder=ML_BEST_VALUE&numAdults=${numAdults}&numSeniors=${numSeniors}&classOfService=ECONOMY&pageNumber=1&nonstop=yes&currencyCode=USD&region=USA`, {
          headers: {
              'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com',
              'x-rapidapi-key': '0064acb0bdmsh8ce8335f616311dp1446fcjsn94de5b0ede26',
          },
      });
      console.log("Inside the FlightAPI := ",response.data);
      return response.data; 
  } catch (error) {
      console.error("Error in searchFlights:", error);
      throw error;
  }
};


export const getAirports = async() => {
    const resp = await axios.get("https://sky-scanner3.p.rapidapi.com/flights/airports",
    { headers: {
       'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
       'x-rapidapi-key': API_KEY,
     },
   });
   console.log(resp.data);
  return resp.data;
};

export const getOneWayTrip = async (source,destination,departDate) => {

}
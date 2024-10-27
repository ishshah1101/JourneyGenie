import axios from 'axios';

const API_HOST = 'https://tripadvisor16.p.rapidapi.com';
const API_KEY = 'a6d4450286mshabb0a167be0e629p1e141cjsne2c4999456dd';

export const searchAirports = async (query) => {
  const response = await axios.get(`${API_HOST}/api/v1/flights/searchAirport`, {
    params: { query },
    headers: {
      'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com',
      'x-rapidapi-key': API_KEY,
    },
  });
  return response.data;
};

// export const searchFlights = async (sourceAirportCode, destinationAirportCode) => {
//     const response = await axios.get(`${API_HOST}/api/v1/flights/searchFlights`, {
//       params: {
//         sourceAirportCode,
//         destinationAirportCode,
//         itineraryType: 'ONE_WAY',
//         sortOrder: 'PRICE',
//         numAdults: 1,
//         numSeniors: 0,
//         classOfService: 'ECONOMY',
//         pageNumber: 1,
//         nearby: 'yes',
//         nonstop: 'yes',
//         currencyCode: 'USD',
//         region: 'USA',
//       },
//       headers: {
//         'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com',
//         'x-rapidapi-key': API_KEY,
//       },
//     });
//     return response.data;
//   };

export const searchFlights = async (sourceAirportCode, destinationAirportCode, travelDate, numAdults, numSeniors, classOfService) => {
    const response = await axios.get(`${API_HOST}/api/v1/flights/searchFlights?`, {
      params: {
        sourceAirportCode,
        destinationAirportCode,
        travelDate,
        numAdults,
        numSeniors,
        classOfService,
        itineraryType: 'ONE_WAY',
        sortOrder: 'PRICE',
        pageNumber: 1,
        nearby: 'yes',
        nonstop: 'yes',
        currencyCode: 'USD',
        region: 'USA',
      },
      headers: {
        'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com',
        'x-rapidapi-key': API_KEY,
      },
    });
    return response.data;
  };
  
// import { searchFlights } from '@/service/FlightApi';
// import React, { useState } from 'react';
// import './FlightSearch.css';
// import { airportData } from '@/assets/airportData';


// const FlightSearch = () => {
//   const [sourceAirportCode, setSourceAirportCode] = useState('');
//   const [destinationAirportCode, setDestinationAirportCode] = useState('');
//   const [travelDate, setTravelDate] = useState('');
//   const [numAdults, setNumAdults] = useState(1);
//   const [numSeniors, setNumSeniors] = useState(0);
//   const [classOfService, setClassOfService] = useState('ECONOMY');
//   const [flights, setFlights] = useState([]);
//   const [error, setError] = useState(null);

//   const handleFlightSearch = async () => {
//     setError(null);
//     try {
//       const data = await searchFlights(
//         sourceAirportCode,
//         destinationAirportCode,
//         travelDate,
//         numAdults,
//         numSeniors,
//         classOfService
//       );
//       console.log("Flight search response:", data);
//       setFlights(data); // Adjust based on actual response structure
//     } catch (err) {
//       setError(err);
//     }
//   };

//   const airportOptions = Object.values(airportData).map(airport => ({
//     code: airport.icao,
//     name: `${airport.city}, ${airport.state}`
//   }));

//   return (
//     <div className="flight-search">
//       <h1>Flight Search</h1>

//       <div className="form-group">
//         <label htmlFor="sourceAirport">Source Airport:</label>
//         <select
//           id="sourceAirport"
//           value={sourceAirportCode}
//           onChange={(e) => setSourceAirportCode(e.target.value)}
//         >
//           <option value="">Select Source Airport</option>
//           {airportOptions.map((airport) => (
//             <option key={airport.code} value={airport.code}>
//               {airport.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="form-group">
//         <label htmlFor="destinationAirport">Destination Airport:</label>
//         <select
//           id="destinationAirport"
//           value={destinationAirportCode}
//           onChange={(e) => setDestinationAirportCode(e.target.value)}
//         >
//           <option value="">Select Destination Airport</option>
//           {airportOptions.map((airport) => (
//             <option key={airport.code} value={airport.code}>
//               {airport.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="form-group">
//         <label htmlFor="travelDate">Travel Date:</label>
//         <input
//           id="travelDate"
//           type="date"
//           value={travelDate}
//           onChange={(e) => setTravelDate(e.target.value)}
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="numAdults">Adults:</label>
//         <input
//           id="numAdults"
//           type="number"
//           min="1"
//           value={numAdults}
//           onChange={(e) => setNumAdults(Number(e.target.value))}
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="numSeniors">Seniors:</label>
//         <input
//           id="numSeniors"
//           type="number"
//           min="0"
//           value={numSeniors}
//           onChange={(e) => setNumSeniors(Number(e.target.value))}
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="classOfService">Class of Service:</label>
//         <select
//           id="classOfService"
//           value={classOfService}
//           onChange={(e) => setClassOfService(e.target.value)}
//         >
//           <option value="ECONOMY">Economy</option>
//           <option value="PREMIUM_ECONOMY">Premium Economy</option>
//           <option value="BUSINESS">Business</option>
//           <option value="FIRST">First</option>
//         </select>
//       </div>

//       <button className="search-button" onClick={handleFlightSearch}>
//         Search Flights
//       </button>

//       {/* Error Message */}
//       {error && <div className="error-message">Error: {error.message}</div>}

//       {/* Flights List */}
//       {flights.length > 0 && (
//         <div>
//           <h2>Available Flights</h2>
//           <ul className="flights-list">
//             {flights.slice(0, 10).map((flight) => (
//               <li key={flight.id}>{flight.details}</li> // Adjust based on actual response structure
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FlightSearch;


import { searchFlights, searchAirports } from '@/service/FlightApi';
import React, { useState, useEffect } from 'react';
import './FlightSearch.css';
import { airportData } from '@/assets/airportData';

const FlightSearch = () => {
  const [sourceCity, setSourceCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [sourceAirportCode, setSourceAirportCode] = useState('');
  const [destinationAirportCode, setDestinationAirportCode] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [numAdults, setNumAdults] = useState(1);
  const [numSeniors, setNumSeniors] = useState(0);
  const [classOfService, setClassOfService] = useState('ECONOMY');
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [sourceAirportOptions, setSourceAirportOptions] = useState([]);
  const [destinationAirportOptions, setDestinationAirportOptions] = useState([]);

  // Create a list of unique city names from airportData
  const cities = Object.values(airportData)
    .map(airport => airport.city)
    .filter((value, index, self) => self.indexOf(value) === index);

  const handleAirportSearch = async (city, isSource) => {
    try {
      const data = await searchAirports(city);
      const options = data.map(airport => ({
        code: airport.icao,
        name: `${airport.name} (${airport.city}, ${airport.state})`
      }));

      if (isSource) {
        setSourceAirportOptions(options);
        setSourceAirportCode(options.length > 0 ? options[0].code : '');
      } else {
        setDestinationAirportOptions(options);
        setDestinationAirportCode(options.length > 0 ? options[0].code : '');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFlightSearch = async () => {
    setError(null);
    
    // Validate the travel date
    const today = new Date();
    const selectedDate = new Date(travelDate);
    if (selectedDate < today) {
      setError("Travel date should not be in the past.");
      return;
    }

    // Ensure source and destination airport codes are set
    if (!sourceAirportCode || !destinationAirportCode) {
      setError("Please select both source and destination airports.");
      return;
    }

    try {
      const data = await searchFlights(
        sourceAirportCode,
        destinationAirportCode,
        travelDate,
        numAdults,
        numSeniors,
        classOfService
      );

      if (!data.status) {
        const errorMessages = data.message.map(msg => (typeof msg === 'object' ? JSON.stringify(msg) : msg));
        setError(errorMessages.join(', '));
        return;
      }

      setFlights(data.flights);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flight-search">
      <h1>Flight Search</h1>

      <div className="form-group">
        <label htmlFor="sourceCity">Source City:</label>
        <select
          id="sourceCity"
          value={sourceCity}
          onChange={(e) => {
            setSourceCity(e.target.value);
            handleAirportSearch(e.target.value, true);
          }}
        >
          <option value="">Select Source City</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        {sourceAirportOptions.length > 0 && (
          <select
            value={sourceAirportCode}
            onChange={(e) => setSourceAirportCode(e.target.value)}
          >
            <option value="">Select Source Airport</option>
            {sourceAirportOptions.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="destinationCity">Destination City:</label>
        <select
          id="destinationCity"
          value={destinationCity}
          onChange={(e) => {
            setDestinationCity(e.target.value);
            handleAirportSearch(e.target.value, false);
          }}
        >
          <option value="">Select Destination City</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        {destinationAirportOptions.length > 0 && (
          <select
            value={destinationAirportCode}
            onChange={(e) => setDestinationAirportCode(e.target.value)}
          >
            <option value="">Select Destination Airport</option>
            {destinationAirportOptions.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="travelDate">Travel Date:</label>
        <input
          id="travelDate"
          type="date"
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="numAdults">Adults:</label>
        <input
          id="numAdults"
          type="number"
          min="1"
          value={numAdults}
          onChange={(e) => setNumAdults(Number(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label htmlFor="numSeniors">Seniors:</label>
        <input
          id="numSeniors"
          type="number"
          min="0"
          value={numSeniors}
          onChange={(e) => setNumSeniors(Number(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label htmlFor="classOfService">Class of Service:</label>
        <select
          id="classOfService"
          value={classOfService}
          onChange={(e) => setClassOfService(e.target.value)}
        >
          <option value="ECONOMY">Economy</option>
          <option value="PREMIUM_ECONOMY">Premium Economy</option>
          <option value="BUSINESS">Business</option>
          <option value="FIRST">First</option>
        </select>
      </div>

      <button className="search-button" onClick={handleFlightSearch}>
        Search Flights
      </button>

      {error && <div className="error-message">Error: {error}</div>}

      {flights.length > 0 && (
        <div>
          <h2>Available Flights</h2>
          <ul className="flights-list">
            {flights.slice(0, 10).map((flight) => (
              <li key={flight.id}>
                <a href={flight.link} target="_blank" rel="noopener noreferrer">
                  {flight.details}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;

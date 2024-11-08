import { searchFlights, searchAirports } from '@/service/FlightApi';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { toast } from 'sonner'; // Import toast
import './FlightSearch.css';
import { airportData } from '@/assets/airportData';
// import { s } from 'vite/dist/node/types.d-aGj9QkWt';

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

  const handleSourceAirportSearch = async (city) => {
    try {
      const response = await searchAirports(city);
      if (response && response.data && response.data.data.length > 0) {
        const airportCode = response.data.data[0].airportCode;
        setSourceAirportCode(airportCode);
        return airportCode;
      } else {
        setError(`No airport found for ${city}`);
        return null;
      }
    } catch (err) {
      setError(`Error fetching airport data: ${err.message}`);
      return null;
    }
  };

  const handleDestinationAirportSearch = async (city) => {
    try {
      const response = await searchAirports(city);
      if (response && response.data && response.data.data.length > 0) {
        const airportCode = response.data.data[0].airportCode;
        setDestinationAirportCode(airportCode);
        return airportCode;
      } else {
        setError(`No airport found for ${city}`);
        return null;
      }
    } catch (err) {
      setError(`Error fetching airport data: ${err.message}`);
      return null;
    }
  };

  const handleFlightSearch = async () => {
    // Display loading toast
    const loadingToast = toast.loading("Fetching flight details...");

    setError(null);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(travelDate);

    if (selectedDate < today) {
      setError("Travel date should not be in the past.");
      toast.dismiss(loadingToast); // Dismiss loading toast
      return;
    }

    let sourcecode = sourceAirportCode;
    let destinationcode = destinationAirportCode;

    if (!sourcecode) {
      sourcecode = await handleSourceAirportSearch(sourceCity);
      console.log('Source Code:', sourcecode);
    }
    if (!destinationcode) {
      destinationcode = await handleDestinationAirportSearch(destinationCity);
      console.log('Destination Code:', destinationcode);

    }

    if (!sourcecode || !destinationcode) {
      setError("Please select both source and destination airports.");
      toast.dismiss(loadingToast); // Dismiss loading toast
      return;
    }

    console.log('Source Code:', sourcecode); // Log the source airport code
    console.log('Destination Code:', destinationcode); // Log the destination airport code

    try {
      const response = await searchFlights(
        sourcecode,
        destinationcode,
        travelDate,
        numAdults,
        numSeniors,
        classOfService
      );

      console.log('API Response:', response.data); // Log the full response
      if (response && response.data && response.data.flights) {
        setFlights(response.data.flights);
        console.log('Fetched Flights:', response.data.flights); // Log the flights array
        toast.success("Flights fetched successfully!"); // Show success toast
      } else {
        setFlights([]);
        setError("No flights found.");
        toast.error("No flights found."); // Show error toast
      }
    } catch (err) {
      setError(err.message);
      toast.error(`Error: ${err.message}`); // Show error toast
    } finally {
      toast.dismiss(loadingToast); // Dismiss loading toast
    }
  };


  return (
    <div>
      <div className="flight-search">
        <h1>Flight Search</h1>
        <div className="form-group">
          <label htmlFor="sourceCity">Source City:</label>
          <select
            id="sourceCity"
            value={sourceCity}
            onChange={(e) => setSourceCity(e.target.value)}
          >
            <option value="">Select Source City</option>
            {airportData.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="destinationCity">Destination City:</label>
          <select
            id="destinationCity"
            value={destinationCity}
            onChange={(e) => setDestinationCity(e.target.value)}
          >
            <option value="">Select Destination City</option>
            {airportData.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
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

        <Button className="search-button" onClick={handleFlightSearch}>
          Search Flights
        </Button>

        {error && <div className="error-message">Error: {error}</div>}
      </div>

      <div className="flight-results">
        <h2>Available Flights</h2>
        {flights.length > 0 ? (
          <ul className="flights-list">
            {flights.slice(0, 10).map((flight, flightIndex) => {
              // Calculate the provider index using modulo
              const providerIndex = flightIndex % 4; // Alternates between 0, 1, 2, 3

              // Check if there are valid purchase links available
              if (flight.purchaseLinks && flight.purchaseLinks.length > 0 && providerIndex < flight.purchaseLinks.length) {
                return (
                  <li key={flightIndex}>
                    <div className="purchase-link">
                      <p><strong className='text-xl'>Total Passengers:</strong> <span className='text-2xl'>{numAdults + numSeniors}</span></p>
                      <div className='flex gap-10'>
                        <p><strong>Adults:</strong> {numAdults}</p>
                        <p><strong>Seniors:</strong> {numSeniors}</p>
                      </div>
                      <p><strong>Total Price:</strong> <span className="text-2xl">${flight.purchaseLinks[providerIndex].totalPrice}</span></p>
                      <div className='text-center'>
                        <a
                          href={flight.purchaseLinks[providerIndex].url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Book on {flight.purchaseLinks[providerIndex].providerId}
                        </a>
                      </div>
                    </div>
                  </li>
                );
              }

              // Skip rendering this flight if no purchase links are available
              return null;
            })}
          </ul>
        ) : (
          <p>No flights found.</p>
        )}
      </div>



    </div>
  );
};

export default FlightSearch;

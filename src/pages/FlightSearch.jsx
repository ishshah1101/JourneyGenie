import { searchFlights, searchAirports } from '@/service/FlightApi';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { airportData } from '@/components/constants/airportData';

const FlightSearch = () => {
  const [sourceCity, setSourceCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [sourceAirportCode, setSourceAirportCode] = useState('');
  const [destinationAirportCode, setDestinationAirportCode] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [numAdults, setNumAdults] = useState(1);
  const [numSeniors, setNumSeniors] = useState(0);
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const handleSourceAirportSearch = async (city) => {
    try {
      const response = await searchAirports(city);
      if (response?.data?.data?.length > 0) {
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
      if (response?.data?.data?.length > 0) {
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

  useEffect(() => {
    if (sourceCity) {
      handleSourceAirportSearch(sourceCity);
    }
  }, [sourceCity]);

  useEffect(() => {
    if (destinationCity) {
      handleDestinationAirportSearch(destinationCity);
    }
  }, [destinationCity]);

  useEffect(() => {
    if (sourceAirportCode && destinationAirportCode && travelDate) {
      handleFlightSearch();
    }
  }, [sourceAirportCode, destinationAirportCode, travelDate]);

  const handleFlightSearch = async () => {
    const loadingToast = toast.loading('Fetching flight details...');
    setError(null);
    setFlights([]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(travelDate);

    if (selectedDate < today) {
      setError('Travel date should not be in the past.');
      toast.dismiss(loadingToast);
      return;
    }

    let sourcecode = sourceAirportCode || (await handleSourceAirportSearch(sourceCity));
    let destinationcode = destinationAirportCode || (await handleDestinationAirportSearch(destinationCity));

    if (!sourcecode || !destinationcode) {
      setError('Please select both source and destination airports.');
      toast.dismiss(loadingToast);
      return;
    }

    try {
      const response = await searchFlights(sourcecode, destinationcode, travelDate, numAdults, numSeniors);
      if (response?.data?.flights) {
        setFlights(response.data.flights);
        toast.success('Flights fetched successfully!');
      } else {
        setFlights([]);
        setError('No flights found.');
        toast.error('No flights found.');
      }
    } catch (err) {
      setError(err.message);
      toast.error(`Error: ${err.message}`);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="max-w-lg w-full p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
        <h1 className="text-2xl font-bold text-center mb-4">Flight Search</h1>

        <div className="mb-4">
          <label className="block font-medium mb-1">Source City:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={sourceCity}
            onChange={(e) => setSourceCity(e.target.value)}
          >
            <option value="">Select Source City</option>
            {airportData.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Destination City:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={destinationCity}
            onChange={(e) => setDestinationCity(e.target.value)}
          >
            <option value="">Select Destination City</option>
            {airportData.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Travel Date:</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
          />
        </div>

        <div className="mb-4 flex gap-4">
          <div>
            <label className="block font-medium mb-1">Adults:</label>
            <input
              type="number"
              min="1"
              className="w-full p-2 border border-gray-300 rounded"
              value={numAdults}
              onChange={(e) => setNumAdults(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Seniors:</label>
            <input
              type="number"
              min="0"
              className="w-full p-2 border border-gray-300 rounded"
              value={numSeniors}
              onChange={(e) => setNumSeniors(Number(e.target.value))}
            />
          </div>
        </div>

        <Button className="w-full bg-black hover:bg-blue-600 text-white py-2 rounded-lg" onClick={handleFlightSearch}>
          Search Flights
        </Button>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>

      <div className="w-full max-w-lg m-6">
        <h2 className="text-xl font-semibold text-center mb-4">Available Flights</h2>
        {flights.length > 0 ? (
          <ul className="space-y-4">
            {flights.slice(0, 10).map((flight, index) => (
              <li key={index} className="border p-4 rounded-lg shadow-md">
                <p><strong>Total Passengers:</strong> {numAdults + numSeniors}</p>
                <div className='flex gap-3 justify-between'>
                <p><strong>Adults:</strong><span> {numAdults}</span></p>
                <p><strong>Seniors:</strong><span> {numSeniors}</span></p>
                </div>
                <p className='text-center'><strong>Total Price:</strong> ${flight.purchaseLinks?.[0]?.totalPrice || 'N/A'}</p>
                {flight.purchaseLinks?.[0]?.url && (
                  <a href={flight.purchaseLinks[0].url} target="_blank" className="text-blue-500 underline">
                    Book on {flight.purchaseLinks[0].providerId}
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : <p className="text-center text-gray-500">No flights found.</p>}
      </div>
    </div>
  );
};

export default FlightSearch;

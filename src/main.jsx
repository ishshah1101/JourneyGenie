import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CreateTrip from './pages/CreateTrip.jsx';
import ViewTrip from './pages/ViewTrip.jsx';
import MyTrips from './pages/MyTrips.jsx';
import FavouriteTrips from './pages/FavouriteTrips.jsx';
import TripJournal from './pages/TripJournal.jsx';
import CreateJournal from './components/custom/CreateJournal.jsx';
import FlightSearch from './pages/FlightSearch.jsx';
import LandingPage from './components/custom/LandingPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // This includes the Header and will render the Outlet
    children: [
      {
        path: '/',
        element: <LandingPage/>,
      },
      {
        path: 'create-trip',
        element: <CreateTrip />,
      },
      {
        path: 'view-trip/:tripId',
        element: <ViewTrip />,
      },
      {
        path: 'my-trips',
        element: <MyTrips />,
      },
      {
        path: 'favourite-trips',
        element: <FavouriteTrips />,
      },
      {
        path: 'trip-journal', // Updated to include tripId
        element: <TripJournal />,
      },
      {
        path: 'create-journal',
        element: <CreateJournal />,
      },
      {
        path: 'flight-search',
        element: <FlightSearch/>
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);

import './App.css';
import { Outlet } from 'react-router-dom'; // Import Outlet to render the matched child route
import Header from './components/custom/Header'; // Import Header component
import LandingPage from './components/custom/LandingPage';

import CreateTrip from './pages/CreateTrip';

function App() {
  return (
    <>
      <Header /> {/* Place Header here */}
      <Outlet /> {/* This will render the matched route's component */}
    </>
  );
}

export default App;

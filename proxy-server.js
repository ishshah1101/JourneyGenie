import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();

// Enable CORS for all origins
app.use(cors());

// Example proxy endpoint
app.get('/proxy', async (req, res) => {
    const { location, radius } = req.query;
    const googleAPIKey = "AIzaSyCGCejPxj93O5lcGEezTVJ7QhO6YvC-oMw";  // Replace with your actual Google Places API key

    if (!location || !radius) {
        return res.status(400).send('Missing location or radius');
    }

    const [lat, long] = location.split(',');

    try {
        // Make the request to Google Places API
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
            params: {
                location: `${lat},${long}`,
                radius: radius,
                key: googleAPIKey  // Use the actual key here
            }
        });

        res.json(response.data);  // Send the response from the Google API back to the client
    } catch (error) {
        console.error('Error fetching from Google Places API:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});

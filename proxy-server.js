import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();


app.use(cors());


app.get('/proxy', async (req, res) => {
    const { location, radius } = req.query;
    const googleAPIKey = "-";  // Replace with your actual Google Places API key

    if (!location || !radius) {
        return res.status(400).send('Missing location or radius');
    }

    const [lat, long] = location.split(',');

    try {
      
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
            params: {
                location: `${lat},${long}`,
                radius: radius,
                key: googleAPIKey  
            }
        });

        res.json(response.data); 
    } catch (error) {
        console.error('Error fetching from Google Places API:', error);
        res.status(500).send('Internal Server Error');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});

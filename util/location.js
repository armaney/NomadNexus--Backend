const axios = require('axios');
const HttpError = require('../models/http-error');

const API_KEY = process.env.API_KEYIQ; // Replace with your LocationIQ API key

async function getCoordsForAddress(address) {
  try {
    const response = await axios.get(
      `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${encodeURIComponent(
        address
      )}&format=json`
    );

    const data = response.data;

    if (!data || data.length === 0) {
      throw new HttpError('Could not find location for the specified address.', 422);
    }

    const coordinates = {
      lat: data[0].lat,
      lng: data[0].lon
    };

    return coordinates;
  } catch (error) {
    throw new HttpError('Could not fetch location data, please try again later.', 500);
  }
}

module.exports = getCoordsForAddress;

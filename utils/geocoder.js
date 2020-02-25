const NodeGeocoder = require('node-geocoder');

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};

const geocoder = NodeGeocoder(options);

// Using callback
// geocoder.geocode('29 champs elysée paris', function(err, res) {
//   console.log(res);
// });

module.exports = geocoder;

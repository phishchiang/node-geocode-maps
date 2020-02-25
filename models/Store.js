const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const StoreSchema = new mongoose.Schema({
  storeID: {
    type: String,
    required: [true, 'Please add your store ID'],
    unique: true,
    trim: true,
    maxlength: [10, 'Store ID must be less than 10 chars']
  },
  // User enter address: not save to DB
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  // Only this save to DB
  // Mongoose-geojson example
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Geocode & create location Middleware
// .pre = before save
StoreSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  console.log(loc);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  };

  // Do not save address
  this.address = undefined;
  next();
});

// Call it "Store" and pass the StoreSchema
module.exports = mongoose.model('Store', StoreSchema);

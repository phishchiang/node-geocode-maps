const mongoose = require('mongoose');

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

// Call it "Store" and pass the StoreSchema
module.exports = mongoose.model('Store', StoreSchema);

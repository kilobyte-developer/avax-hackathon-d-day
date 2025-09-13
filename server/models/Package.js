// models/Package.js
const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['FLIGHT_DELAY', 'BAGGAGE', 'MEDICAL', 'TRIP_CANCELLATION'],
    required: true
  },
  coverage: {
    type: Number,
    required: true
  },
  premium: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }],
  duration: {
    type: Number, // in hours
    required: true
  },
  claimsProcess: {
    type: String,
    default: 'Automatic payout after verification'
  },
  payoutTime: {
    type: Number, // in minutes
    default: 5
  },
  active: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    enum: ['BASIC', 'STANDARD', 'PREMIUM'],
    default: 'STANDARD'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Package', packageSchema);
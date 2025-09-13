// scripts/seedPackages.js
const mongoose = require('mongoose');
const Package = require('../models/Package');

const samplePackages = [
  {
    name: "Flight Delay Protection - Basic",
    type: "FLIGHT_DELAY",
    coverage: 250,
    premium: 12.50,
    description: "Get compensated for flight delays over 2 hours",
    features: [
      "Automatic delay detection",
      "Instant payout",
      "Covers all airlines",
      "No paperwork required"
    ],
    duration: 24,
    claimsProcess: "Automatically triggered when flight delay exceeds 2 hours",
    payoutTime: 5,
    category: "BASIC"
  },
  {
    name: "Flight Delay Protection - Premium",
    type: "FLIGHT_DELAY",
    coverage: 500,
    premium: 22.99,
    description: "Enhanced coverage for frequent travelers",
    features: [
      "Higher coverage amount",
      "1-hour delay threshold",
      "Priority support",
      "Multi-flight discounts"
    ],
    duration: 48,
    payoutTime: 2,
    category: "PREMIUM"
  },
  {
    name: "Baggage Protection",
    type: "BAGGAGE",
    coverage: 500,
    premium: 8.75,
    description: "Coverage for lost, delayed, or damaged baggage",
    features: [
      "Covers lost luggage",
      "Delayed baggage compensation",
      "Essential items coverage",
      "24/7 support"
    ],
    duration: 72,
    claimsProcess: "File claim through app with photos and documentation",
    payoutTime: 15,
    category: "STANDARD"
  },
  {
    name: "Emergency Medical Coverage",
    type: "MEDICAL",
    coverage: 10000,
    premium: 45.00,
    description: "Emergency medical expenses coverage while traveling",
    features: [
      "Hospitalization coverage",
      "Emergency evacuation",
      "Medical consultation",
      "Prescription coverage"
    ],
    duration: 168, // 7 days
    category: "PREMIUM"
  },
  {
    name: "Trip Cancellation Protection",
    type: "TRIP_CANCELLATION",
    coverage: 2000,
    premium: 35.50,
    description: "Get reimbursed for non-refundable trip expenses",
    features: [
      "Weather-related cancellations",
      "Illness coverage",
      "Family emergencies",
      "Work-related cancellations"
    ],
    duration: 240, // 10 days
    category: "STANDARD"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/yourapp');
    
    // Clear existing packages
    await Package.deleteMany({});
    
    // Insert sample packages
    await Package.insertMany(samplePackages);
    
    console.log('✅ Database seeded successfully!');
    console.log(`📦 Added ${samplePackages.length} packages`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
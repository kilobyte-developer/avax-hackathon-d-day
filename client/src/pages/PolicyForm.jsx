// pages/PolicyForm.jsx - New policy purchase form
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Users, Calendar, MapPin, CreditCard, FileText } from 'lucide-react';

const PolicyForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    policyType: 'flight_delay',
    numberOfTravelers: 1,
    destination: '',
    departureDate: '',
    returnDate: '',
    flightNumber: '',
    hotel: '',
    ticketCost: '',
    idType: 'passport',
    idNumber: '',
    agreeToTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Simulate successful submission
    alert('Policy application submitted! Verification will be completed within 24 hours.');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-white pt-20 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            to="/dashboard" 
            className="flex items-center text-blue-300 hover:text-white transition-colors mr-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-light bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 bg-clip-text text-transparent">
            Purchase New Policy
          </h1>
        </div>

        {/* Form */}
        <div className="bg-blue-900/30 rounded-2xl p-8 border border-blue-600/30 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Policy Type */}
            <div>
              <h2 className="text-xl font-medium text-white mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-blue-400" />
                Policy Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-blue-300 mb-2">Policy Type</label>
                  <select 
                    name="policyType"
                    value={formData.policyType}
                    onChange={handleInputChange}
                    className="w-full bg-blue-800/50 border border-blue-600/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="flight_delay">Flight Delay Protection</option>
                    <option value="baggage">Baggage Protection</option>
                    <option value="trip_cancel">Trip Cancellation</option>
                    <option value="medical">Medical Add-on</option>
                  </select>
                </div>
                <div>
                  <label className="block text-blue-300 mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Number of Travelers
                  </label>
                  <input 
                    type="number" 
                    name="numberOfTravelers"
                    value={formData.numberOfTravelers}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    className="w-full bg-blue-800/50 border border-blue-600/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Travel Details */}
            <div>
              <h2 className="text-xl font-medium text-white mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-blue-400" />
                Travel Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-blue-300 mb-2">Destination Country</label>
                  <input 
                    type="text" 
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-blue-800/50 border border-blue-600/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-blue-300 mb-2">Flight Number</label>
                  <input 
                    type="text" 
                    name="flightNumber"
                    value={formData.flightNumber}
                    onChange={handleInputChange}
                    className="w-full bg-blue-800/50 border border-blue-600/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-blue-300 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Departure Date
                  </label>
                  <input 
                    type="date" 
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-blue-800/50 border border-blue-600/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-blue-300 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Return Date
                  </label>
                  <input 
                    type="date" 
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    className="w-full bg-blue-800/50 border border-blue-600/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Accommodation & Cost */}
            <div>
              <h2 className="text-xl font-medium text-white mb-6 flex items-center">
                <CreditCard className="w-6 h-6 mr-3 text-blue-400" />
                Accommodation & Costs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-blue-300 mb-2">Hotel/Accommodation</label>
                  <input 
                    type="text" 
                    name="hotel"
                    value={formData.hotel}
                    onChange={handleInputChange}
                    className="w-full bg-blue-800/50 border border-blue-600/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-blue-300 mb-2">Ticket Cost (USD)</label>
                  <input 
                    type="number" 
                    name="ticketCost"
                    value={formData.ticketCost}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full bg-blue-800/50 border border-blue-600/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Identification */}
            <div>
              <h2 className="text-xl font-medium text-white mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-blue-400" />
                Identification
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-blue-300 mb-2">ID Type</label>
                  <select 
                    name="idType"
                    value={formData.idType}
                    onChange={handleInputChange}
                    className="w-full bg-blue-800/50 border border-blue-600/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="passport">Passport</option>
                    <option value="drivers_license">Driver's License</option>
                    <option value="national_id">National ID</option>
                  </select>
                </div>
                <div>
                  <label className="block text-blue-300 mb-2">ID Number</label>
                  <input 
                    type="text" 
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-blue-800/50 border border-blue-600/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                required
                className="w-4 h-4 text-blue-600 bg-blue-800/50 border-blue-600/30 rounded focus:ring-blue-500"
              />
              <label htmlFor="agreeToTerms" className="ml-2 text-blue-300">
                I agree to the terms and conditions and understand that verification may take up to 24 hours
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-blue-600/30">
              <button 
                type="submit"
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Shield className="w-5 h-5" />
                <span>Purchase Policy</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PolicyForm;
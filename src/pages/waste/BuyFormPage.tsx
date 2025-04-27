import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, CreditCard, FileText, Phone, Mail } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { WasteItem } from '../../types';

const BuyFormPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    pickupDate: '',
    pickupTime: '',
    notes: ''
  });

  // Mock data - replace with API call
  const item: WasteItem = {
    id: '1',
    userId: 'user1',
    title: 'Old LED Bulbs',
    description: 'Pack of 5 LED bulbs that need repair',
    category: 'bulbs',
    condition: 'repairable',
    images: ['https://images.pexels.com/photos/577514/pexels-photo-577514.jpeg'],
    price: 200,
    status: 'listed',
    location: {
      address: 'Gandhi Nagar, Delhi',
      coordinates: { lat: 28.6139, lng: 77.2090 }
    },
    createdAt: new Date().toISOString()
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit buy request:', { itemId: id, ...formData });
    // Implement form submission
    navigate('/waste');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Item Preview */}
            <div className="p-6 bg-gray-50 border-b">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Buy for Repair</h2>
              <div className="flex items-start space-x-4">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-lg font-semibold text-green-600 mt-2">
                    ₹{item.price}
                  </p>
                </div>
              </div>
            </div>

            {/* Buy Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  fullWidth
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  startIcon={<Phone className="h-5 w-5" />}
                  required
                  fullWidth
                />
              </div>

              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                startIcon={<Mail className="h-5 w-5" />}
                required
                fullWidth
              />

              <Input
                label="Delivery Address"
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                startIcon={<MapPin className="h-5 w-5" />}
                required
                fullWidth
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Preferred Date"
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                  startIcon={<Calendar className="h-5 w-5" />}
                  required
                  fullWidth
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      <Clock className="h-5 w-5" />
                    </div>
                    <select
                      className="pl-10 w-full rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200"
                      value={formData.pickupTime}
                      onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                      required
                    >
                      <option value="">Select a time slot</option>
                      <option value="09:00-12:00">Morning (9AM - 12PM)</option>
                      <option value="13:00-16:00">Afternoon (1PM - 4PM)</option>
                      <option value="17:00-20:00">Evening (5PM - 8PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  className="w-full rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any special instructions..."
                ></textarea>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Purchase Information</h4>
                    <ul className="mt-2 text-sm text-blue-700 list-disc list-inside">
                      <li>Payment will be collected at the time of delivery</li>
                      <li>You can inspect the item before payment</li>
                      <li>Warranty terms will be provided with the item</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  type="submit"
                  variant="primary"
                  icon={<CreditCard className="h-5 w-5" />}
                  fullWidth
                >
                  Confirm Purchase (₹{item.price})
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/waste')}
                  fullWidth
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BuyFormPage;
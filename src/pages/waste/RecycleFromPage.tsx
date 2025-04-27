import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Truck, FileText } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { WasteItem } from '../../types';

const RecycleFormPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickupDate: '',
    pickupTime: '',
    address: '',
    notes: ''
  });

  // Mock data - replace with API call
  const item: WasteItem = {
    id: '2',
    userId: 'user2',
    title: 'Damaged Laptop',
    description: 'HP laptop with broken screen',
    category: 'computers',
    condition: 'damaged',
    images: ['https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg'],
    weight: 2.5,
    status: 'listed',
    location: {
      address: 'Sector 18, Noida',
      coordinates: { lat: 28.5707, lng: 77.3219 }
    },
    createdAt: new Date().toISOString()
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit recycling request:', { itemId: id, ...formData });
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Recycle Item</h2>
              <div className="flex items-start space-x-4">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Weight: {item.weight}kg
                  </p>
                </div>
              </div>
            </div>

            {/* Recycling Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Pickup Date"
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

              <Input
                label="Pickup Address"
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                startIcon={<MapPin className="h-5 w-5" />}
                placeholder="Enter complete address for pickup"
                required
                fullWidth
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  className="w-full rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any special instructions for pickup..."
                ></textarea>
              </div>

              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-yellow-500 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Important Information</h4>
                    <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside">
                      <li>Please ensure the item is properly packaged</li>
                      <li>Remove any batteries or hazardous components</li>
                      <li>Keep the item ready at the specified pickup time</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  type="submit"
                  variant="primary"
                  icon={<Truck className="h-5 w-5" />}
                  fullWidth
                >
                  Schedule Recycling Pickup
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

export default RecycleFormPage;
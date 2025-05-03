import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Pickup, WasteItem } from '../../types';

// Mock data - replace with API calls
const mockPickups: (Pickup & { item: WasteItem })[] = [
  {
    id: '1',
    wasteItemId: '1',
    riderId: 'rider1',
    status: 'pending',
    scheduledTime: '2024-01-15T09:00:00Z',
    createdAt: new Date().toISOString(),
    item: {
      id: '1',
      userId: 'user1',
      title: 'Old LED Bulbs',
      description: 'Pack of 5 LED bulbs that need repair',
      category: 'bulbs',
      condition: 'repairable',
      images: ['https://images.pexels.com/photos/577514/pexels-photo-577514.jpeg'],
      price: 200,
      status: 'pending_pickup',
      location: {
        address: 'Gandhi Nagar, Delhi',
        coordinates: { lat: 28.6139, lng: 77.2090 }
      },
      createdAt: new Date().toISOString()
    }
  }
];

const RiderDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'available' | 'ongoing' | 'completed'>('available');

  const handleAcceptPickup = (pickupId: string) => {
    console.log('Accept pickup:', pickupId);
    // Implement pickup acceptance
  };

  const handleCompletePickup = (pickupId: string) => {
    console.log('Complete pickup:', pickupId);
    // Implement pickup completion
  };

  const filteredPickups = mockPickups.filter(pickup => {
    switch (activeTab) {
      case 'available':
        return pickup.status === 'pending';
      case 'ongoing':
        return pickup.status === 'accepted' || pickup.status === 'in_progress';
      case 'completed':
        return pickup.status === 'completed';
      default:
        return false;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Rider Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your pickup requests and deliveries</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Pickups</p>
                <h3 className="text-2xl font-bold text-gray-900">5</h3>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Deliveries</p>
                <h3 className="text-2xl font-bold text-gray-900">3</h3>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Completed</p>
                <h3 className="text-2xl font-bold text-gray-900">128</h3>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-500" />
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b">
            <div className="flex">
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'available'
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('available')}
              >
                Available Pickups
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'ongoing'
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('ongoing')}
              >
                Ongoing
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'completed'
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('completed')}
              >
                Completed
              </button>
            </div>
          </div>

          {/* Pickup List */}
          <div className="divide-y">
            {filteredPickups.map((pickup) => (
              <motion.div
                key={pickup.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={pickup.item.images[0]}
                    alt={pickup.item.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-grow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {pickup.item.title}
                        </h3>
                        <p className="text-gray-600">{pickup.item.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        pickup.item.condition === 'repairable'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {pickup.item.condition}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{pickup.item.location.address}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          Scheduled: {new Date(pickup.scheduledTime).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-4">
                      {pickup.status === 'pending' && (
                        <Button
                          variant="primary"
                          onClick={() => handleAcceptPickup(pickup.id)}
                          icon={<CheckCircle className="h-4 w-4" />}
                        >
                          Accept Pickup
                        </Button>
                      )}
                      {pickup.status === 'in_progress' && (
                        <Button
                          variant="primary"
                          onClick={() => handleCompletePickup(pickup.id)}
                          icon={<CheckCircle className="h-4 w-4" />}
                        >
                          Mark as Completed
                        </Button>
                      )}
                      {pickup.status === 'pending' && (
                        <Button
                          variant="outline"
                          className="text-red-600 border-red-600 hover:bg-red-50"
                          icon={<XCircle className="h-4 w-4" />}
                        >
                          Decline
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredPickups.length === 0 && (
              <div className="p-8 text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pickups found</h3>
                <p className="text-gray-600">
                  {activeTab === 'available'
                    ? 'No available pickups at the moment'
                    : activeTab === 'ongoing'
                    ? 'No ongoing pickups'
                    : 'No completed pickups'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboardPage;
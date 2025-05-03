import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Package, Truck, Award, ArrowRight, Clock, MapPin } from 'lucide-react';
import { pickupRequests } from '../data/mockData';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import PickupDetailsModal from '../components/features/dashboard/PickupDetailsModal';
import { PickupRequest } from '../types';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  // Add other fields if needed
}

const DashboardPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // or sessionStorage.getItem()
    
    if (userId) {
      axios.get<User[]>('/api/getUsers') // your actual endpoint
        .then((res) => {
          const user = res.data.find(u => u.id === userId);
          setCurrentUser(user || null);
        })
        .catch((err) => {
          console.error('Error fetching users:', err);
        });
    }
  }, []);
  
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [selectedPickup, setSelectedPickup] = useState<PickupRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const upcomingPickups = pickupRequests.filter(request => 
    ['pending', 'scheduled'].includes(request.status)
  );
  
  const completedPickups = pickupRequests.filter(request => 
    request.status === 'completed'
  );

  const stats = {
    totalItems: 45,
    totalWeight: 230,
    pointsEarned: 450,
    co2Saved: 1200
  };

  const handleViewDetails = (pickup: PickupRequest) => {
    setSelectedPickup(pickup);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-20">
      {/* Header Section */}
      <section className="bg-green-600 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2">Welcome back, {currentUser?.name || 'Guest'}!</h1>
            <p className="text-lg opacity-90">
              Track your recycling impact and manage your pickups
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg p-6 shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Items Recycled</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.totalItems}</h3>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg p-6 shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Points Earned</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.pointsEarned}</h3>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg p-6 shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Truck className="h-6 w-6 text-amber-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Weight (kg)</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.totalWeight}</h3>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg p-6 shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">CO₂ Saved (kg)</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.co2Saved}</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/services/pickup">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule Pickup</h3>
                    <p className="text-gray-600">Book a new pickup request</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-green-600" />
                </div>
              </motion.div>
            </Link>

            <Link to="/locations">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Find Locations</h3>
                    <p className="text-gray-600">Locate drop-off centers</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-green-600" />
                </div>
              </motion.div>
            </Link>

            <Link to="/education">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Learn More</h3>
                    <p className="text-gray-600">Educational resources</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-green-600" />
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Pickup History */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Pickup History</h2>
            <div className="flex space-x-2">
              <Button
                variant={activeTab === 'upcoming' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming
              </Button>
              <Button
                variant={activeTab === 'completed' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('completed')}
              >
                Completed
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {(activeTab === 'upcoming' ? upcomingPickups : completedPickups).map((pickup) => (
              <motion.div
                key={pickup.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg border p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-900 font-medium">
                        {pickup.scheduledDate} - {pickup.scheduledTimeSlot}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-600">{pickup.address}</span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-600">
                        {pickup.items.length} item{pickup.items.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      pickup.status === 'completed' ? 'bg-green-100 text-green-800' :
                      pickup.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1)}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(pickup)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

            {(activeTab === 'upcoming' ? upcomingPickups : completedPickups).length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">No {activeTab} pickups found</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pickup Details Modal */}
      {selectedPickup && (
        <PickupDetailsModal
          pickup={selectedPickup}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPickup(null);
          }}
        />
      )}
    </div>
  );
};

export default DashboardPage;
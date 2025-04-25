import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { recyclingCenters } from '../data/mockData';
import Input from '../components/ui/Input';

const LocationsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = recyclingCenters.filter(center =>
    center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Recycling Locations</h1>
            <p className="text-xl mb-8">
              Find the nearest e-waste recycling center in your area.
            </p>
            <div className="max-w-xl mx-auto">
              <Input
                type="text"
                placeholder="Search by location or center name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startIcon={<MapPin className="h-5 w-5" />}
                fullWidth
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredLocations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLocations.map((center, index) => (
                <motion.div
                  key={center.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{center.name}</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <p className="ml-3 text-gray-600">{center.address}</p>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <div className="ml-3">
                          {center.operatingHours.map((hours, idx) => (
                            <p key={idx} className="text-gray-600">
                              <span className="font-medium">{hours.day}:</span> {hours.hours}
                            </p>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <p className="ml-3 text-gray-600">{center.phone}</p>
                      </div>
                      
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <p className="ml-3 text-gray-600">{center.email}</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Accepted Items:</h4>
                      <div className="flex flex-wrap gap-2">
                        {center.acceptedItems.map((item, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                          >
                            {item.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No locations found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LocationsPage;
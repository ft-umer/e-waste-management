import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import WasteItemCard from '../../components/features/waste/WasteItemCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { WasteItem, WasteCategory } from '../../types';

// Mock data - replace with actual API call
const mockWasteItems: WasteItem[] = [
  {
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
  },
  {
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
  }
];

const ListWastePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<WasteCategory | 'all'>('all');
  const [selectedCondition, setSelectedCondition] = useState<'all' | 'repairable' | 'damaged'>('all');

  const handleAction = (action: 'pickup' | 'buy' | 'recycle', item: WasteItem) => {
    console.log(`Action: ${action}`, item);
    // Implement action handling
  };

  const filteredItems = mockWasteItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesCondition = selectedCondition === 'all' || item.condition === selectedCondition;
    
    return matchesSearch && matchesCategory && matchesCondition;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">E-Waste Items</h1>
            <p className="text-gray-600">Browse available items for recycling or repair</p>
          </motion.div>

          <Link to="/waste/new">
            <Button
              variant="primary"
              icon={<Plus className="h-5 w-5" />}
              className="mt-4 md:mt-0"
            >
              List New Item
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startIcon={<Search className="h-5 w-5" />}
              fullWidth
            />

            <select
              className="rounded-lg border-gray-300 focus:ring-green-500 focus:border-green-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as WasteCategory | 'all')}
            >
              <option value="all">All Categories</option>
              <option value="bulbs">Bulbs</option>
              <option value="wires">Wires</option>
              <option value="batteries">Batteries</option>
              <option value="electronics">Electronics</option>
              <option value="appliances">Appliances</option>
              <option value="computers">Computers</option>
              <option value="phones">Phones</option>
              <option value="other">Other</option>
            </select>

            <select
              className="rounded-lg border-gray-300 focus:ring-green-500 focus:border-green-500"
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value as 'all' | 'repairable' | 'damaged')}
            >
              <option value="all">All Conditions</option>
              <option value="repairable">Repairable</option>
              <option value="damaged">Damaged</option>
            </select>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <WasteItemCard
              key={item.id}
              item={item}
              onAction={handleAction}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListWastePage;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import WasteItemCard from '../../components/features/waste/WasteItemCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { WasteItem } from '../../types';

const ListWastePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | string>('all');
  const [selectedCondition, setSelectedCondition] = useState<'all' | 'repairable' | 'damaged'>('all');
  const [wasteItems, setWasteItems] = useState<WasteItem[]>([]);

  // Fetch waste items from the API
  useEffect(() => {
    const fetchWasteItems = async () => {
      try {
        const response = await fetch('https://backend-e-waste-management.vercel.app/api/waste');
        const data = await response.json();
        setWasteItems(data);
      } catch (error) {
        console.error('Error fetching waste items:', error);
      }
    };

    fetchWasteItems();
  }, []);

  const handleAction = (action: 'pickup' | 'buy' | 'recycle', item: WasteItem) => {
    console.log(`Action: ${action}`, item);
    // Implement action handling
  };

  const filteredItems = wasteItems.filter(item => {
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
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {/* Add more options here */}
            </select>

            <select
              className="rounded-lg border-gray-300 focus:ring-green-500 focus:border-green-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EducationCard from '../components/features/education/EducationCard';
import { educationalContent } from '../data/mockData';
import { EducationalContent } from '../types';

const EducationPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'impact', name: 'Environmental Impact' },
    { id: 'recycling', name: 'Recycling Process' },
    { id: 'disposal', name: 'Proper Disposal' },
    { id: 'conservation', name: 'Conservation' },
  ];

  const filteredContent = educationalContent.filter((content: EducationalContent) => {
    const matchesCategory = activeCategory === 'all' || content.category === activeCategory;
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          content.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-20">
      {/* Header Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Education Center</h1>
            <p className="text-xl max-w-3xl mx-auto text-center mb-8">
              Learn about e-waste, its environmental impact, and how proper recycling makes a difference.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for topics..."
                  className="w-full py-4 px-6 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-4 top-4">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Category Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center space-x-2 space-y-2 md:space-y-0">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Content Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredContent.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredContent.map((content, index) => (
                <EducationCard key={content.id} content={content} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">No results found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Join Our Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Join Our Mission</h2>
              <p className="text-xl text-gray-600 mb-8">
                Share your knowledge with your community. Spread awareness about proper e-waste disposal to protect our environment for future generations.
              </p>
              
              <div className="bg-green-50 border border-green-100 rounded-lg p-8 mt-12">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Want to learn more?</h3>
                <p className="text-gray-600 mb-6">
                  Subscribe to our newsletter for regular updates on e-waste management, recycling best practices, and upcoming events.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EducationPage;
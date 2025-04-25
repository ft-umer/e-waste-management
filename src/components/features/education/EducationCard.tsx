import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { EducationalContent } from '../../../types';
import EducationContentModal from '../education/EducationContentModal';

interface EducationCardProps {
  content: EducationalContent;
  index: number;
}

const EducationCard: React.FC<EducationCardProps> = ({ content, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categoryColors = {
    impact: 'bg-red-100 text-red-800',
    recycling: 'bg-green-100 text-green-800',
    disposal: 'bg-blue-100 text-blue-800',
    conservation: 'bg-amber-100 text-amber-800',
  };

  const getCategoryColor = (category: EducationalContent['category']) => {
    return categoryColors[category];
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group h-full"
      >
        <div className="h-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={content.imageUrl} 
              alt={content.title} 
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 right-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(content.category)}`}>
                {content.category.charAt(0).toUpperCase() + content.category.slice(1)}
              </span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{content.title}</h3>
            <p className="text-gray-600 mb-4 text-sm">{content.description}</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center text-green-600 hover:text-green-800 font-medium text-sm"
            >
              Read More
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>

      <EducationContentModal
        content={content}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default EducationCard;
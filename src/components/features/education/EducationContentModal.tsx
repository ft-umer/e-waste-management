import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import Button from '../../ui/Button';
import { EducationalContent } from '../../../types';

interface EducationContentModalProps {
  content: EducationalContent;
  isOpen: boolean;
  onClose: () => void;
}

const EducationContentModal: React.FC<EducationContentModalProps> = ({ content, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl relative"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{content.title}</h3>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(content.createdAt).toLocaleDateString()}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <img
                src={content.imageUrl}
                alt={content.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            <div className="prose max-w-none">
              {content.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-600 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-6 flex items-center">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                content.category === 'impact' ? 'bg-red-100 text-red-800' :
                content.category === 'recycling' ? 'bg-green-100 text-green-800' :
                content.category === 'disposal' ? 'bg-blue-100 text-blue-800' :
                'bg-amber-100 text-amber-800'
              }`}>
                {content.category.charAt(0).toUpperCase() + content.category.slice(1)}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EducationContentModal;
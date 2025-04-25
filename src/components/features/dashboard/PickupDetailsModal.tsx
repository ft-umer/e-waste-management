import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, MapPin, Calendar, Clock, AlertCircle } from 'lucide-react';
import Button from '../../ui/Button';
import { PickupRequest } from '../../../types';

interface PickupDetailsModalProps {
  pickup: PickupRequest;
  isOpen: boolean;
  onClose: () => void;
}

const PickupDetailsModal: React.FC<PickupDetailsModalProps> = ({ pickup, isOpen, onClose }) => {
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
          className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl relative"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Pickup Request Details</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            {/* Status and Date */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  pickup.status === 'completed' ? 'bg-green-100 text-green-800' :
                  pickup.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1)}
                </span>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{pickup.scheduledDate}</span>
                  <Clock className="h-4 w-4 ml-4 mr-2" />
                  <span>{pickup.scheduledTimeSlot}</span>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                <span className="text-gray-600">{pickup.address}</span>
              </div>
            </div>

            {/* Items List */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Items for Pickup</h4>
              <div className="space-y-3">
                {pickup.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start p-3 bg-gray-50 rounded-lg"
                  >
                    <Package className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">
                          {item.description}
                        </span>
                        <span className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 capitalize">
                        {item.category.replace('_', ' ')}
                      </span>
                      {item.weight && (
                        <span className="text-sm text-gray-500 block">
                          Weight: {item.weight} kg
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            {pickup.notes && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Additional Notes</h4>
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2" />
                    <p className="text-sm text-gray-600">{pickup.notes}</p>
                  </div>
                </div>
              </div>
            )}
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

export default PickupDetailsModal;
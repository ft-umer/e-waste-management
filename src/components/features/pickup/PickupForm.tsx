import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Plus, Trash2 } from 'lucide-react';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { WasteCategory } from '../../../types';

const PickupForm: React.FC = () => {
  const [items, setItems] = useState([{ id: '1', category: 'electronics' as WasteCategory, description: '', quantity: 1 }]);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  
  const addItem = () => {
    const newItem = {
      id: Math.random().toString(),
      category: 'electronics' as WasteCategory,
      description: '',
      quantity: 1
    };
    setItems([...items, newItem]);
  };
  
  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };
  
  const updateItem = (id: string, field: string, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would handle the form submission, e.g., send to an API
    console.log({
      items,
      date,
      timeSlot,
      address,
      notes
    });
    
    // Display success message or redirect
    alert('Pickup request submitted successfully!');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Schedule an E-Waste Pickup</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Items Section */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-800">Items to be picked up</h3>
            
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex-grow md:w-1/3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      className="w-full rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200"
                      value={item.category}
                      onChange={(e) => updateItem(item.id, 'category', e.target.value)}
                    >
                      <option value="electronics">Electronics</option>
                      <option value="batteries">Batteries</option>
                      <option value="appliances">Appliances</option>
                      <option value="computers">Computers</option>
                      <option value="mobile_devices">Mobile Devices</option>
                      <option value="peripherals">Peripherals</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                  
                  <div className="flex-grow md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., Old laptop, broken TV"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      fullWidth
                    />
                  </div>
                  
                  <div className="md:w-24">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value))}
                      fullWidth
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 p-2"
                      onClick={() => removeItem(item.id)}
                      disabled={items.length <= 1}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={addItem}
              icon={<Plus className="h-4 w-4" />}
            >
              Add Another Item
            </Button>
          </div>
          
          {/* Pickup Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                label="Pickup Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                startIcon={<Calendar className="h-5 w-5" />}
                required
                fullWidth
              />
            </div>
            
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
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
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
          
          {/* Address */}
          <div>
            <Input
              label="Pickup Address"
              type="text"
              placeholder="Enter your complete address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              startIcon={<MapPin className="h-5 w-5" />}
              required
              fullWidth
            />
          </div>
          
          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes (Optional)
            </label>
            <textarea
              className="w-full rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200"
              placeholder="Any special instructions or details we should know..."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
          
          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
            >
              Schedule Pickup
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PickupForm;
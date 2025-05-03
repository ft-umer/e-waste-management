import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Camera, MapPin, Package, Info, Upload, Plus, Trash2
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { WasteCategory, WasteCondition } from '../../types';
import { classifyImage } from '../../utils/classifyImage';
import { toast } from 'react-toastify';

const AddWasteItemPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '' as WasteCategory,
    condition: '' as WasteCondition,
    images: [] as string[],
    price: '',
    weight: '',
    address: '',
    coordinates: { lat: 0, lng: 0 }
  });

  const [loadingImage, setLoadingImage] = useState(false);

  const handleImageAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const formDataImage = new FormData();
    formDataImage.append('file', file);
    formDataImage.append('upload_preset', 'waste_products');
  
    try {
      setLoadingImage(true);
      const res = await axios.post('https://api.cloudinary.com/v1_1/dtipim18j/image/upload', formDataImage);
      const imageUrl = res.data.secure_url;
  
      // 🔍 Call Gemini to classify
      const classification = await classifyImage(imageUrl);
      toast.success(`Image classified as: ${classification}`);
    //   alert(`Image classified as: ${classification}`);
  
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrl],
        condition: classification === 'repairable'
          ? classification
          : prev.condition // Keep the previous condition if classification is not valid
      }));
    } catch (error) {
      console.error('Image upload or classification failed:', error);
        toast.error('Image upload/classification failed. Try again.');
    } finally {
      setLoadingImage(false);
    }
  };

  const handleImageRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to submit a listing.');
        return;
      }


      const res = await axios.post(
        'https://backend-e-waste-management.vercel.app/api/waste',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      console.log('Waste item listed:', res.data);
      navigate('/waste');
    } catch (err) {
      console.error('Error listing item:', err);
      alert('Failed to submit. Please check form or login again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 bg-gray-50 border-b">
              <h2 className="text-2xl font-bold text-gray-900">List New Item</h2>
              <p className="text-gray-600 mt-2">Add your electronic waste item for recycling or repair</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <Input
                label="Item Title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Old LED Bulbs, Broken Laptop"
                startIcon={<Package className="h-5 w-5" />}
                required
                fullWidth
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the item's condition, specifications, and any relevant details..."
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    className="w-full rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as WasteCategory })}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="bulbs">Bulbs</option>
                    <option value="wires">Wires</option>
                    <option value="batteries">Batteries</option>
                    <option value="electronics">Electronics</option>
                    <option value="appliances">Appliances</option>
                    <option value="computers">Computers</option>
                    <option value="phones">Phones</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Condition
                  </label>
                  <select
                    className="w-full rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200"
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value as WasteCondition })}
                    required
                  >
                    <option value="">Select condition</option>
                    <option value="repairable">Repairable</option>
                    <option value="damaged">Damaged</option>
                    <option value="working">Working</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img src={image} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => handleImageRemove(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {formData.images.length < 5 && (
                    <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-600 hover:border-green-500 hover:text-green-500 cursor-pointer">
                      <Upload className="h-8 w-8 mb-2" />
                      <span className="text-sm">Add Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageAdd}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">Add up to 5 images</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.condition === 'repairable' && (
                  <Input
                    label="Price (₹)"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Enter price"
                    required
                    fullWidth
                  />
                )}

                {formData.condition === 'damaged' && (
                  <Input
                    label="Weight (kg)"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="Approximate weight"
                    required
                    fullWidth
                  />
                )}
              </div>

              <Input
                label="Location"
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                startIcon={<MapPin className="h-5 w-5" />}
                placeholder="Enter your address"
                required
                fullWidth
              />

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Listing Guidelines</h4>
                    <ul className="mt-2 text-sm text-blue-700 list-disc list-inside">
                      <li>Provide clear, well-lit photos of the item</li>
                      <li>Accurately describe the item's condition</li>
                      <li>Include any relevant measurements or specifications</li>
                      <li>Be honest about any damage or issues</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  type="submit"
                  variant="primary"
                  icon={<Plus className="h-5 w-5" />}
                  fullWidth
                >
                  List Item
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/waste')}
                  fullWidth
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddWasteItemPage;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Video, Users, Link as LinkIcon } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const CreateSeminarPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    speaker: '',
    date: '',
    time: '',
    platform: 'zoom',
    link: ''
  });
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token"); // ✅ Get the actual token
    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }
    
    try {
      const res = await fetch('http://localhost:5000/api/seminars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // ✅ Correct usage of token
        },
        body: JSON.stringify(formData),
      });
    
      if (res.ok) {
        const data = await res.json();
        console.log('Seminar created:', data);
        navigate('/seminars');
      } else {
        console.error('Failed to create seminar:', await res.text());
      }
    } catch (err) {
      console.error('Error creating seminar:', err);
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
              <h2 className="text-2xl font-bold text-gray-900">Schedule New Seminar</h2>
              <p className="text-gray-600 mt-2">Create a new online seminar about e-waste management</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <Input
                label="Seminar Title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter seminar title"
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
                  placeholder="Describe what the seminar will cover..."
                  required
                ></textarea>
              </div>

              <Input
                label="Speaker Name"
                type="text"
                value={formData.speaker}
                onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                startIcon={<Users className="h-5 w-5" />}
                placeholder="Enter speaker's name"
                required
                fullWidth
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  startIcon={<Calendar className="h-5 w-5" />}
                  required
                  fullWidth
                />

                <Input
                  label="Time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  startIcon={<Clock className="h-5 w-5" />}
                  required
                  fullWidth
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Platform
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <Video className="h-5 w-5" />
                  </div>
                  <select
                    className="pl-10 w-full rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200"
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    required
                  >
                    <option value="zoom">Zoom</option>
                    <option value="google_meet">Google Meet</option>
                    <option value="teams">Microsoft Teams</option>
                  </select>
                </div>
              </div>

              <Input
                label="Meeting Link"
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                startIcon={<LinkIcon className="h-5 w-5" />}
                placeholder="Enter meeting URL"
                required
                fullWidth
              />

             
              <div className="flex space-x-4">
                <Button
                  type="submit"
                  variant="primary"
                  icon={<Video className="h-5 w-5" />}
                  fullWidth
                >
                  Schedule Seminar
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/seminars')}
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

export default CreateSeminarPage;
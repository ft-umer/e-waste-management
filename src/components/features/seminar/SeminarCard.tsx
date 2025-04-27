import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Video, ExternalLink } from 'lucide-react';
import { Seminar } from '../../../types';
import Button from '../../ui/Button';

interface SeminarCardProps {
  seminar: Seminar;
  onJoin: (seminar: Seminar) => void;
}

const SeminarCard: React.FC<SeminarCardProps> = ({ seminar, onJoin }) => {
  const isUpcoming = new Date(seminar.date) > new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      {seminar.image && (
        <img 
          src={seminar.image} 
          alt={seminar.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{seminar.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{seminar.description}</p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span className="text-sm">Speaker: {seminar.speaker}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{new Date(seminar.date).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">{seminar.time}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Video className="h-4 w-4 mr-2" />
            <span className="text-sm capitalize">{seminar.platform.replace('_', ' ')}</span>
          </div>

          {seminar.attendees > 0 && (
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              <span className="text-sm">{seminar.attendees} registered attendees</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {isUpcoming ? (
            <Button
              variant="primary"
              onClick={() => onJoin(seminar)}
              fullWidth
              icon={<ExternalLink className="h-4 w-4" />}
            >
              Join Seminar
            </Button>
          ) : seminar.recordingUrl && (
            <Button
              variant="outline"
              onClick={() => window.open(seminar.recordingUrl, '_blank')}
              fullWidth
              icon={<Video className="h-4 w-4" />}
            >
              Watch Recording
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SeminarCard;
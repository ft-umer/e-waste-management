import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Video, ExternalLink } from 'lucide-react';
import { Seminar } from '../../../types';
import { useDeleteSeminar } from "../../../hooks/useDeleteSeminar";
import Button from '../../ui/Button';

interface SeminarCardProps {
  seminar: Seminar;
  onJoin: (seminar: Seminar) => void;
  onRemove?: (id: string) => void; // Only for past seminars
}

const SeminarCard: React.FC<SeminarCardProps> = ({ seminar, onJoin, onRemove }) => {
  const isUpcoming = new Date(seminar.date) > new Date();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
  }, []);
  
  const { deleteSeminar } = useDeleteSeminar();


  const handleRemovePastSeminars = () => {
    deleteSeminar(seminar._id, () => {
      if (onRemove) onRemove(seminar._id);
    });
  };

 

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
          ) : (
            isAdmin && (
              <Button
                onClick={handleRemovePastSeminars}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </Button>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SeminarCard;

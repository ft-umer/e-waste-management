import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import SeminarCard from "../../components/features/seminar/SeminarCard";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Seminar } from "../../types";
import axios from "axios";

const SeminarsPage: React.FC = () => {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<
    "all" | "zoom" | "google_meet" | "teams"
  >("all");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

// Handler to remove a seminar by its ID
const handleRemoveSeminar = (id: string) => {
  setSeminars((prev) => prev.filter((seminar) => seminar._id !== id));
};

  // Fetch seminars from backend
  useEffect(() => {
    const fetchSeminars = async () => {
      try {
        const res = await axios.get("https://backend-e-waste-management.vercel.app/api/seminars");
        setSeminars(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching seminars:", err);
        setError("Failed to load seminars.");
        setLoading(false);
      }
    };

    fetchSeminars();
  }, []);

  // Detect admin role
  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
  }, []);

  const handleJoinSeminar = (seminar: Seminar) => {
    window.open(seminar.link, "_blank");
  };

  const filteredSeminars = seminars.filter((seminar) => {
    const matchesSearch =
      seminar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seminar.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seminar.speaker.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPlatform =
      selectedPlatform === "all" || seminar.platform === selectedPlatform;

    return matchesSearch && matchesPlatform;
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              E-Waste Management Seminars
            </h1>
            <p className="text-gray-600">
              Join our expert-led sessions to learn about proper e-waste
              disposal
            </p>
          </motion.div>

          {isAdmin && (
            <Link to="/seminars/new">
              <Button
                variant="primary"
                icon={<Plus className="h-5 w-5" />}
                className="mt-4 md:mt-0"
              >
                Schedule Seminar
              </Button>
            </Link>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Search seminars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startIcon={<Search className="h-5 w-5" />}
              fullWidth
            />

            <select
              className="rounded-lg border-gray-300 focus:ring-green-500 focus:border-green-500"
              value={selectedPlatform}
              onChange={(e) =>
                setSelectedPlatform(
                  e.target.value as "all" | "zoom" | "google_meet" | "teams"
                )
              }
            >
              <option value="all">All Platforms</option>
              <option value="zoom">Zoom</option>
              <option value="google_meet">Google Meet</option>
              <option value="teams">Microsoft Teams</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p>Loading seminars...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <>
            {/* Upcoming Seminars */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Calendar className="h-6 w-6 text-green-600 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Upcoming Seminars
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSeminars
                  .filter((seminar) => new Date(seminar.date) > new Date())
                  .map((seminar) => (
                    <SeminarCard
                      key={seminar.id}
                      seminar={seminar}
                      onJoin={handleJoinSeminar}
                    />
                  ))}
              </div>
            </div>

            {/* Past Seminars */}
            <div>
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Previous Seminars
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSeminars
                  .filter((seminar) => new Date(seminar.date) <= new Date())
                  .map((seminar) => (
                    <SeminarCard
                      key={seminar.id}
                      seminar={seminar}
                      onJoin={handleJoinSeminar}
                       onRemove={handleRemoveSeminar} // 👈 pass the remover
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SeminarsPage;

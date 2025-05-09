import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Package,
  Truck,
  Award,
  ArrowRight,
  Clock,
  MapPin,
} from "lucide-react";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import PickupDetailsModal from "../components/features/dashboard/PickupDetailsModal";
import { PickupRequest } from "../types";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
}

interface WasteItem {
  weight: number;
  user: string;
  // any other fields
}

const DashboardPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userPickups, setUserPickups] = useState<PickupRequest[]>([]);
  const [wasteItems, setWasteItems] = useState<WasteItem[]>([]);
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed">(
    "upcoming"
  );
  const [selectedPickup, setSelectedPickup] = useState<PickupRequest | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    console.log("userId from localStorage:", userId);

    if (!token || !userId) return;

    axios
      .get("https://backend-e-waste.vercel.app/api/auth/users")
      .then((res) => {
        const users = res.data;
        const matchedUser = users.find(
          (u) => u._id === userId || u.id === userId
        );
        if (matchedUser) {
          setCurrentUser(matchedUser);
        } else {
          setCurrentUser(null);
          console.warn("User not found in list");
        }
      })
      .catch((err) => console.error("Error fetching users:", err));

    // Fetch pickups data
    axios
      .get("https://backend-e-waste.vercel.app/api/pickups")
      .then((res) => {
        const pickups = Array.isArray(res.data) ? res.data : [];
        const pickupsForUser = pickups.filter((p) => {
          const id = typeof p.userId === "object" ? p.userId._id : p.userId;
          return String(id) === userId;
        });
        setUserPickups(pickupsForUser);
      })
      .catch((err) => console.error("Error fetching pickups:", err));

      axios
      .get(`https://backend-e-waste.vercel.app/api/waste/user/${userId}`)
      .then((res) => {
        console.log("Fetched waste items:", res.data); // Inspect this data
    
        const allItems = Array.isArray(res.data) ? res.data : [];
    
        // Convert userId (from waste item) and userId (from localStorage) to strings for comparison
        const userItems = allItems.filter((item) => item.user === userId);
    
        setWasteItems(userItems);
        console.log("Filtered waste items:", userItems);
      })
      .catch((err) => console.error("Error fetching waste items:", err));
    
    
  }, []);

  // Calculated stats
  const totalItems = userPickups.length; // Only the logged-in user's waste items
  const totalWeight = wasteItems.reduce(
    (sum, item) => sum + Number(item.weight || 0),
    0
  ); // Weight calculation for logged-in user's waste items

  const pointsEarned = userPickups.length * 5;
  const co2Saved = totalWeight * 5.2;

  const upcomingPickups = userPickups.filter((p) =>
    ["pending", "scheduled"].includes(p.status)
  );
  const completedPickups = userPickups.filter((p) => p.status === "completed");

  const handleViewDetails = (pickup: PickupRequest) => {
    setSelectedPickup(pickup);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-green-600 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {currentUser?.name || "Guest"}!
            </h1>
            <p className="text-lg opacity-90">
              Track your recycling impact and manage your pickups
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Items */}
            <StatCard
              icon={<Package className="h-6 w-6 text-green-600" />}
              label="Total Items Recycled"
              value={totalItems}
              bgColor="green"
            />
            {/* Points */}
            <StatCard
              icon={<Award className="h-6 w-6 text-blue-600" />}
              label="Points Earned"
              value={pointsEarned}
              bgColor="blue"
            />
            {/* Weight */}
            <StatCard
              icon={<Truck className="h-6 w-6 text-amber-600" />}
              label="Total Weight (kg)"
              value={totalWeight}
              bgColor="amber"
            />
            {/* CO₂ */}
            <StatCard
              icon={<Calendar className="h-6 w-6 text-purple-600" />}
              label="CO₂ Saved (kg)"
              value={co2Saved.toFixed(1)}
              bgColor="purple"
            />
          </div>
        </div>
      </section>

      {/* Pickup History */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Pickup History
            </h2>
            <div className="flex space-x-2">
              <Button
                variant={activeTab === "upcoming" ? "primary" : "outline"}
                size="sm"
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming
              </Button>
              <Button
                variant={activeTab === "completed" ? "primary" : "outline"}
                size="sm"
                onClick={() => setActiveTab("completed")}
              >
                Completed
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {(activeTab === "upcoming"
              ? upcomingPickups
              : completedPickups
            ).map((pickup) => (
              <motion.div
                key={pickup.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg border p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-900 font-medium">
                        {pickup.scheduledDate} - {pickup.scheduledTimeSlot}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-600">{pickup.address}</span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-600">
                        {pickup.items.length} item
                        {pickup.items.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        pickup.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : pickup.status === "scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {pickup.status.charAt(0).toUpperCase() +
                        pickup.status.slice(1)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(pickup)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

            {(activeTab === "upcoming" ? upcomingPickups : completedPickups)
              .length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">No {activeTab} pickups found</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedPickup && (
        <PickupDetailsModal
          pickup={selectedPickup}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPickup(null);
          }}
        />
      )}
    </div>
  );
};

// --- Helper Components ---

const StatCard = ({
  icon,
  label,
  value,
  bgColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  bgColor: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg p-6 shadow-md"
  >
    <div className="flex items-center mb-4">
      <div
        className={`w-12 h-12 bg-${bgColor}-100 rounded-full flex items-center justify-center`}
      >
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-600">{label}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  </motion.div>
);

const ActionCard = ({
  to,
  title,
  subtitle,
  delay,
}: {
  to: string;
  title: string;
  subtitle: string;
  delay: number;
}) => (
  <Link to={to}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        <ArrowRight className="h-6 w-6 text-green-600" />
      </div>
    </motion.div>
  </Link>
);

export default DashboardPage;

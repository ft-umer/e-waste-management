import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, MapPin, Clock, CheckCircle, XCircle } from "lucide-react";
import Button from "../../components/ui/Button";
import { Pickup, WasteItem } from "../../types";
import axios from "axios";
import { toast } from "react-toastify";

const RiderDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "available" | "ongoing" | "completed"
  >("available");
  const [pickups, setPickups] = useState<(Pickup & { items: WasteItem[] })[]>(
    []
  );

  const [riders, setRiders] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const response = await axios.get("https://backend-e-waste.vercel.app/api/pickups");
        setPickups(response.data);
      } catch (error) {
        console.error("Error fetching pickups:", error);
      }
    };

    fetchPickups();
    const interval = setInterval(fetchPickups, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchRidersId = async () => {
      try {
        const response = await axios.get(
          "https://backend-e-waste.vercel.app/api/riders/riders"
        );
        setRiders(response.data);
      } catch (error) {
        console.error("Error fetching riders:", error);
      }
    };

    fetchRidersId();
  }, []);

  const handleAcceptPickup = async (pickupId: string) => {
    try {
      await axios.put(`https://backend-e-waste.vercel.app/api/${pickupId}/accept`, {
        riderId: user._id,
      });
      setPickups((prev) =>
        prev.map((pickup) =>
          pickup.id === pickupId
            ? { ...pickup, status: "in_progress", riderId: user._id }
            : pickup
        )
      );
    } catch (error) {
      console.error("Error accepting pickup:", error);
    }
  };

  const handleCompletePickup = async (pickupId: string) => {
    try {
      await axios.put(`https://backend-e-waste.vercel.app/api/${pickupId}/complete`, {
        riderId: user._id, // ✅ Send riderId in the body
      });
      setPickups((prev) =>
        prev.map((pickup) =>
          pickup._id === pickupId // Use _id instead of id
            ? { ...pickup, status: "completed" }
            : pickup
        )
      );
    } catch (error) {
      console.error("Error completing pickup:", error);
    }
  };
  
  const handleDeclinePickup = async (pickupId: string) => {
    try {
      await axios.delete(`https://backend-e-waste.vercel.app/api/${pickupId}`);
      setPickups((prev) => prev.filter((pickup) => pickup._id !== pickupId));
      toast.success("Pickup declined successfully!");
    } catch (error) {
      console.error("Error declining pickup:", error);
    }
  };
  

  const filteredPickups = pickups.filter((pickup) => {
    switch (activeTab) {
      case "available":
        return pickup.status === "pending";
      case "ongoing":
        return pickup.status === "in-progress" && pickup.riderId === user._id;
      case "completed":
        return pickup.status === "completed" && pickup.riderId === user._id;
      default:
        return false;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Rider Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage your pickup requests and deliveries
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Pickups</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {pickups.filter((p) => p.status === "pending").length}
                </h3>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ongoing</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {
                    pickups.filter(
                      (p) =>
                        p.status === "in-progress" && p.riderId === user._id
                    ).length
                  }
                </h3>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {
                    pickups.filter(
                      (p) => p.status === "completed" && p.riderId === user._id
                    ).length
                  }
                </h3>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-500" />
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b">
            <div className="flex">
              {["available", "ongoing", "completed"].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === tab
                      ? "text-green-600 border-b-2 border-green-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab(tab as any)}
                >
                  {tab[0].toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Pickup List */}
          <div className="divide-y">
            {filteredPickups.map((pickup) => {
              const item = pickup.items?.[0];
              return (
                <motion.div
                  key={pickup.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={item?.images?.[0] || "#"}
                      alt={item?.title || "Waste item"}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-grow">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item?.title || "Untitled Item"}
                          </h3>
                          <p className="text-gray-600">{item?.description}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item?.condition === "repairable"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {item?.condition || "unknown"}
                        </span>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span className="text-sm">
                            {item?.location?.address || "No address"}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="text-sm">
                            Scheduled:{" "}
                            {new Date(pickup.scheduledDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex space-x-4">
                        {pickup.status === "pending" && (
                          <Button
                            variant="primary"
                            onClick={() => handleAcceptPickup(pickup._id)}
                            icon={<CheckCircle className="h-4 w-4" />}
                          >
                            Accept Pickup
                          </Button>
                        )}
                        {pickup.status === "in-progress" &&
                          pickup.riderId === user._id && (
                            <Button
                              variant="primary"
                              onClick={() => handleCompletePickup(pickup._id)}
                              icon={<CheckCircle className="h-4 w-4" />}
                            >
                              Mark as Completed
                            </Button>
                          )}
                        {pickup.status === "pending" && (
                          <Button
                            variant="outline"
                            onClick={() =>
                              handleDeclinePickup(pickup._id)}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            icon={<XCircle className="h-4 w-4" />}
                          >
                            Decline
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {filteredPickups.length === 0 && (
              <div className="p-8 text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No pickups found
                </h3>
                <p className="text-gray-600">
                  {activeTab === "available"
                    ? "No available pickups at the moment"
                    : activeTab === "ongoing"
                    ? "No ongoing pickups"
                    : "No completed pickups"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboardPage;

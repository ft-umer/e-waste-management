import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  FileText,
  Phone,
  Mail,
} from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { WasteItem } from "../../types";
import axios from "axios";

const BuyFormPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pickupDate: "",
    pickupTime: "",
    notes: "",
  });

  const [item, setItem] = useState<WasteItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetched item id:", id); // Check if the id is coming through correctly
    const fetchWasteItem = async () => {
      try {
        const response = await axios.get(
          `https://backend-e-waste.vercel.app/api/waste/${id}`
        );
        console.log("Fetched waste item:", response.data);
        if (response.data && response.data._id === id) {
          setItem(response.data);
        } else {
          console.error("Item not found or invalid response.");
        }
      } catch (error) {
        console.error("Error fetching waste item:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWasteItem();
    } else {
      setLoading(false); // Set loading to false if id is invalid
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted"); // Check if the function is triggered

    if (!item) {
      console.error("Item is not available for submission.");
      return;
    }

    const purchaseRequestData = {
      userId: item.user,
      itemId: item._id,
      address: formData.address,
      scheduledDate: formData.pickupDate,
      scheduledTimeSlot: formData.pickupTime,
      notes: formData.notes,
    };

    try {
      const response = await axios.post(
        "https://backend-e-waste.vercel.app/api/purchase",
        purchaseRequestData
      );
      console.log("Buy request submitted:", response.data);

      // Check the status code and handle the response properly
      if (response.status === 200) {
        console.log("Form submission success");
        navigate("/waste"); // Redirect if successful
      } else {
        console.error("Failed to submit form:", response.status);
      }
    } catch (error) {
      console.error("Error submitting pickup request:", error);
    }
  };

  if (!item)
    return (
      <div className="text-center mt-10 text-red-500">Item not found.</div>
    );

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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Buy for Repair
              </h2>
              <div className="flex items-start space-x-4">
                {item.images?.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">
                    No image
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-lg font-semibold text-green-600 mt-2">
                    ₹{item.price}
                  </p>
                </div>
              </div>
            </div>

            <form className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  fullWidth
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  startIcon={<Phone className="h-5 w-5" />}
                  required
                  fullWidth
                />
              </div>

              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                startIcon={<Mail className="h-5 w-5" />}
                required
                fullWidth
              />

              <Input
                label="Delivery Address"
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                startIcon={<MapPin className="h-5 w-5" />}
                required
                fullWidth
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Preferred Date"
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) =>
                    setFormData({ ...formData, pickupDate: e.target.value })
                  }
                  startIcon={<Calendar className="h-5 w-5" />}
                  required
                  fullWidth
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                      <Clock className="h-5 w-5" />
                    </div>
                    <select
                      className="pl-10 w-full rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200"
                      value={formData.pickupTime}
                      onChange={(e) =>
                        setFormData({ ...formData, pickupTime: e.target.value })
                      }
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  className="w-full rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Any special instructions..."
                ></textarea>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">
                      Purchase Information
                    </h4>
                    <ul className="mt-2 text-sm text-blue-700 list-disc list-inside">
                      <li>Payment will be collected at the time of delivery</li>
                      <li>You can inspect the item before payment</li>
                      <li>Warranty terms will be provided with the item</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleSubmit}
                  type="button"
                  variant="primary"
                  icon={<CreditCard className="h-5 w-5" />}
                  fullWidth
                >
                  Confirm Purchase (₹{item.price})
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/waste")}
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

export default BuyFormPage;

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Tag, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { WasteItem } from "../../../types";
import Button from "../../ui/Button";

interface WasteItemCardProps {
  item: WasteItem;
  onAction: (action: "pickup" | "buy" | "recycle", item: WasteItem) => void;
}

const WasteItemCard: React.FC<WasteItemCardProps> = ({ item }) => {
  const isRepairable = item.condition === "repairable";
  const isDamaged = item.condition === "damaged";

  const getStatusColor = (status: WasteItem["status"]) => {
    switch (status) {
      case "listed":
        return "bg-blue-100 text-blue-800";
      case "pending_pickup":
        return "bg-yellow-100 text-yellow-800";
      case "in_transit":
        return "bg-purple-100 text-purple-800";
      case "with_mechanic":
        return "bg-orange-100 text-orange-800";
      case "with_recycler":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="relative">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              item.status
            )}`}
          >
            {(item.status || "").replace("_", " ").toUpperCase()}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {item.location?.address || "Address not available"}
            </span>
          </div>

          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">
              Listed {new Date(item.createdAt).toLocaleDateString()}
            </span>
          </div>

          {item.price && (
            <div className="flex items-center text-gray-600">
              <Tag className="h-4 w-4 mr-2" />
              <span className="text-sm">₹{item.price}</span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Condition</p>
              <p className="text-sm text-gray-600">{item.condition}</p>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-6">{item.description}</p>

        <div className="flex space-x-3">
          {isRepairable && (
            <Link to={`/waste/buy/${item.id}`} className="flex-1">
              <Button variant="primary" fullWidth>
                Buy for Repair
              </Button>
            </Link>
          )}

          {isDamaged && (
            <Link to={`/waste/recycle/${item.id}`} className="flex-1">
              <Button variant="accent" fullWidth>
                Recycle Item
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default WasteItemCard;

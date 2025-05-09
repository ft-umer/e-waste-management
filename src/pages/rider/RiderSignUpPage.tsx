import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Bike,
  FileText,
  Camera,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { classifyImage } from "../../utils/classifyImage"; // Import Cloudinary util
import axios from "axios";

const RiderSignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    vehicleType: "",
    licenseNumber: "",
    profileImage: null as File | null,
    idProof: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      // Upload profile image
      let profileImageUrl = "";
      if (formData.profileImage) {
        const formDataImage = new FormData();
        formDataImage.append("file", formData.profileImage);
        formDataImage.append("upload_preset", "waste_products");
  
        const resp = await axios.post(
          "https://api.cloudinary.com/v1_1/dtipim18j/image/upload",
          formDataImage
        );
        profileImageUrl = resp.data.secure_url;
      }
  
      // Upload ID proof
      let idProofUrl = "";
      if (formData.idProof) {
        const idProofData = new FormData();
        idProofData.append("file", formData.idProof);
        idProofData.append("upload_preset", "waste_products");
  
        const idResp = await axios.post(
          "https://api.cloudinary.com/v1_1/dtipim18j/image/upload",
          idProofData
        );
        idProofUrl = idResp.data.secure_url;
      }
  
      // Prepare full data with Cloudinary URLs
      const riderData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        vehicleType: formData.vehicleType,
        licenseNumber: formData.licenseNumber,
        profileImage: profileImageUrl,
        idProof: idProofUrl,
      };
  
      const res = await fetch("https://backend-e-waste.vercel.app/api/riders/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(riderData),
      });
  
      if (!res.ok) throw new Error("Signup failed");
      const data = await res.json();
      console.log("Success:", data);
      navigate("/rider/dashboard");
    } catch (err) {
      console.error(err);
      alert("Signup failed. Please try again.");
    }
  };
  

  const handleImageUpload = (
    field: "profileImage" | "idProof",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [field]: file,
      }));
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex flex-col bg-gray-50">
      <div className="container mx-auto px-4 flex-grow flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Join as a Rider
            </h1>
            <p className="text-gray-600 mt-2">
              Help us collect and deliver e-waste items
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                startIcon={<User className="h-5 w-5" />}
                required
                fullWidth
              />

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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                startIcon={<Lock className="h-5 w-5" />}
                required
                fullWidth
              />

              <Input
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                startIcon={<Lock className="h-5 w-5" />}
                required
                fullWidth
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <Input
                label="Address"
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                startIcon={<MapPin className="h-5 w-5" />}
                required
                fullWidth
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Type
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <Bike className="h-5 w-5" />
                  </div>
                  <select
                    className="pl-10 w-full rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200"
                    value={formData.vehicleType}
                    onChange={(e) =>
                      setFormData({ ...formData, vehicleType: e.target.value })
                    }
                    required
                  >
                    <option value="">Select vehicle type</option>
                    <option value="bicycle">Bicycle</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="scooter">Scooter</option>
                    <option value="car">Car</option>
                  </select>
                </div>
              </div>

              <Input
                label="License Number"
                type="text"
                value={formData.licenseNumber}
                onChange={(e) =>
                  setFormData({ ...formData, licenseNumber: e.target.value })
                }
                startIcon={<FileText className="h-5 w-5" />}
                required
                fullWidth
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload("profileImage", e)}
                  className="w-full text-sm text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Proof
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload("idProof", e)}
                  className="w-full text-sm text-gray-600"
                />
              </div>
            </div>

            <Button
            onClick={handleSubmit}
              type="submit"
              variant="primary"
              fullWidth
              icon={<Bike className="h-5 w-5" />}
            >
              Sign Up as Rider
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-green-600 hover:text-green-500 font-medium"
              >
                Sign in
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RiderSignupPage;

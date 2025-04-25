import React from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, Building2, ShieldCheck, Smartphone, Laptop, Battery, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const ServicesPage: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl">
              Comprehensive e-waste management solutions for individuals and businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Truck className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold">Pickup Service</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Schedule convenient pickups for your electronic waste. Our team will collect items directly from your location.
              </p>
              <Link to="/services/pickup">
                <Button variant="primary">Schedule Pickup</Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold">Drop-off Locations</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Find convenient drop-off points near you for easy disposal of your electronic waste.
              </p>
              <Link to="/locations">
                <Button variant="primary">Find Locations</Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Building2 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold">Business Solutions</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Customized e-waste management programs for businesses of all sizes.
              </p>
              <Button variant="primary">Learn More</Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <ShieldCheck className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold">Data Security</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Secure data destruction and certified disposal of sensitive electronic equipment.
              </p>
              <Button variant="primary">Learn More</Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Accepted Items */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What We Accept</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mobile Devices</h3>
              <p className="text-gray-600">Phones, tablets, and accessories</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Laptop className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Computers</h3>
              <p className="text-gray-600">Laptops, desktops, and monitors</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Battery className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Batteries</h3>
              <p className="text-gray-600">All types of batteries accepted</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Printer className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Peripherals</h3>
              <p className="text-gray-600">Printers, keyboards, and other accessories</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
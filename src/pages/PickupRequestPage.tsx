import React from 'react';
import { motion } from 'framer-motion';
import PickupForm from '../components/features/pickup/PickupForm';

const PickupRequestPage: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Header Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Request an E-Waste Pickup</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Schedule a convenient pickup for your electronic waste and contribute to a cleaner, more sustainable world.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Main Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PickupForm />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">
                Find answers to common questions about our e-waste pickup service.
              </p>
            </motion.div>
            
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">What items do you accept for pickup?</h3>
                <p className="text-gray-600">
                  We accept a wide range of electronic items including computers, laptops, monitors, TVs, mobile phones, tablets, printers, batteries, and household appliances. If you're unsure about a specific item, please contact us.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Is there a fee for pickup service?</h3>
                <p className="text-gray-600">
                  Our standard pickup service is free for most residential customers. For large volumes or business pickups, there may be a nominal fee depending on the quantity and type of items.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">How do I prepare my electronics for pickup?</h3>
                <p className="text-gray-600">
                  Please remove any batteries from devices when possible, and back up and erase personal data from computers, phones, and tablets. Package smaller items together and ensure larger items are accessible for our pickup team.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">What happens to my e-waste after pickup?</h3>
                <p className="text-gray-600">
                  All collected items are taken to our processing center where they are sorted. Working devices are wiped of data and refurbished when possible. Non-working items are dismantled for recycling, with materials separated for proper processing.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I track the status of my pickup request?</h3>
                <p className="text-gray-600">
                  Yes, once your pickup is scheduled, you'll receive a confirmation email with a tracking link. You can use this to monitor the status of your request and get updates on the pickup process.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PickupRequestPage;
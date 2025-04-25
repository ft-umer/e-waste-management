import React from 'react';
import { motion } from 'framer-motion';
import { Truck, RefreshCw, BarChart, LightbulbIcon, MapPin } from 'lucide-react';
import Hero from '../components/features/hero/Hero';
import ServiceCard from '../components/features/services/ServiceCard';
import EducationCard from '../components/features/education/EducationCard';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { educationalContent } from '../data/mockData';
import { useNavigate } from 'react-router-dom';


const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Hero Section */}
      <Hero />
      
      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide comprehensive e-waste management solutions for individuals and businesses.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Truck className="h-8 w-8" />}
              title="E-Waste Pickup"
              description="Schedule a convenient pickup at your home or office. We'll collect your electronic waste and ensure it's properly recycled."
              buttonText="Schedule Pickup"
              onClick={() => {
                navigate("/services/pickup");
              console.log('Schedule Pickup');
              }}
              delay={1}
            />
            
            <ServiceCard
              icon={<MapPin className="h-8 w-8" />}
              title="Drop-off Locations"
              description="Find nearby drop-off points where you can deposit your e-waste for recycling at your convenience."
              buttonText="Find Locations"
              onClick={() => {
                navigate("/locations");
                console.log('Find Locations');
              }}
              delay={2}
            />
            
            <ServiceCard
              icon={<RefreshCw className="h-8 w-8" />}
              title="Corporate Programs"
              description="Tailored solutions for businesses looking to dispose of electronic waste responsibly and securely."
              buttonText="Learn More"
              onClick={() => {
                navigate("education");
                console.log('Learn More');
              }}
              delay={3}
            />
            
           
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our simple 3-step process makes recycling your e-waste effortless.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <span className="text-3xl font-bold text-green-600">1</span>
                </div>
                {/* Connector line */}
                <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-green-200 -z-10"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Schedule a Pickup</h3>
              <p className="text-gray-600">
                Book a convenient time for us to collect your e-waste directly from your location.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <span className="text-3xl font-bold text-green-600">2</span>
                </div>
                {/* Connector line */}
                <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-green-200 -z-10"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">We Collect & Process</h3>
              <p className="text-gray-600">
                Our team collects your items and ensures they're properly sorted for recycling.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <span className="text-3xl font-bold text-green-600">3</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Your Impact</h3>
              <p className="text-gray-600">
                Receive updates on how your contribution has helped the environment.
              </p>
            </motion.div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="primary" size="lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Educational Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Learn About E-Waste</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover why proper e-waste disposal is crucial for our environment and future generations.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {educationalContent.slice(0, 3).map((content, index) => (
              <EducationCard key={content.id} content={content} index={index} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/education">
              <Button variant="outline" size="lg">
                View All Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl mb-8">
                Join thousands of environmentally conscious individuals and businesses in the mission to reduce e-waste and protect our planet.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register">
                  <Button 
                    variant="accent" 
                    size="lg"
                    className="bg-white text-green-600 hover:bg-gray-100"
                  >
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/locations">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Find Drop-off Locations
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-green-600 mb-2">10,000+</div>
              <p className="text-gray-700">Items Recycled</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <p className="text-gray-700">Tons of CO₂ Saved</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-green-600 mb-2">2,500+</div>
              <p className="text-gray-700">Happy Customers</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-green-600 mb-2">20+</div>
              <p className="text-gray-700">Collection Centers</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
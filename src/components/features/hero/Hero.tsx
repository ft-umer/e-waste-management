import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../../ui/Button';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/6647120/pexels-photo-6647120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 min-h-screen flex flex-col justify-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Recycle Your E-Waste for a <span className="text-green-400">Greener Future</span>
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Join our mission to reduce electronic waste and protect the environment. 
            Schedule a pickup, find drop-off locations, and learn how your actions make a difference.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
           <Link to="/services/pickup">
           <Button 
              variant="primary" 
              size="lg" 
              icon={<ArrowRight className="h-5 w-5" />} 
              iconPosition="right"
            >
              Schedule a Pickup
            </Button>
           </Link>
            <Link to={"education"}>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              Learn More
            </Button>
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/10 transform transition-transform hover:scale-105">
              <div className="text-green-400 font-bold text-4xl mb-2">200+</div>
              <div className="text-white">Tons of e-waste recycled</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/10 transform transition-transform hover:scale-105">
              <div className="text-green-400 font-bold text-4xl mb-2">5,000+</div>
              <div className="text-white">Happy customers</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/10 transform transition-transform hover:scale-105">
              <div className="text-green-400 font-bold text-4xl mb-2">20+</div>
              <div className="text-white">Recycling centers</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" className="fill-white">
          <path d="M0,96L60,106.7C120,117,240,139,360,138.7C480,139,600,117,720,112C840,107,960,117,1080,117.3C1200,117,1320,107,1380,101.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
import React from 'react';
import { FaBolt, FaMobileAlt, FaPercent, FaFileAlt, FaSyncAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title }) => (
  <div className="flex flex-col items-center text-center p-6 min-w-[180px]">
    <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-white to-purple-50 group-hover:from-blue-50 group-hover:to-purple-100 transition-all">
      <span className="text-sky-600 text-4xl group-hover:scale-110 transition-transform duration-200">{icon}</span>
    </div>
    <h3 className="text-base font-medium text-gray-700 transition-colors duration-200">{title}</h3>
  </div>
);

const FeaturesSection = () => {
  const features = [
    { icon: <FaBolt />, title: 'Instant Disbursal' },
    { icon: <FaMobileAlt />, title: '100% Digital Process' },
    { icon: <FaPercent />, title: 'Low Interest Rates' },
    { icon: <FaFileAlt />, title: 'No Collateral Required' },
    { icon: <FaSyncAlt />, title: 'Flexible Repayment Options' }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
          Features & Benefits of Personal Loan
        </h2>
        <p className="text-gray-500 text-base">Simple, fast, and flexible for your needs</p>
      </div>

      {/* Marquee Animation */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-8 py-2"
          initial={{ x: 0 }}
          animate={{ x: '-50%' }}
          transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
          style={{ minWidth: '200%' }}
        >
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              {features.map((feature, idx) => (
                <FeatureCard key={i + '-' + idx} icon={feature.icon} title={feature.title} />
              ))}
            </React.Fragment>
          ))}
        </motion.div>
        {/* Optional: gradient fade on edges for better UX */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-gray-50 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-gray-50 to-transparent" />
      </div>
    </section>
  );
};

export default FeaturesSection;

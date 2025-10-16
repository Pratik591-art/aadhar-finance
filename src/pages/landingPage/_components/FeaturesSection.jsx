import React from 'react';
import { FaBolt, FaMobileAlt, FaPercent, FaFileAlt, FaSyncAlt } from 'react-icons/fa';

const FeatureCard = ({ icon, title }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-4 rounded-full mb-4">
        <div className="text-purple-600 text-3xl">
          {icon}
        </div>
      </div>
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    { icon: <FaBolt />, title: 'Instant Disbursal' },
    { icon: <FaMobileAlt />, title: '100% Digital Process' },
    { icon: <FaPercent />, title: 'Low Interest Rates' },
    { icon: <FaFileAlt />, title: 'No Collateral Required' },
    { icon: <FaSyncAlt />, title: 'Flexible Repayment Options' }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Features and Benefits of Personal Loan
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} icon={feature.icon} title={feature.title} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;

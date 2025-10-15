import React from "react";
import { FaBolt, FaWallet, FaPercent, FaFileAlt, FaSyncAlt } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4">
      {/* Header Section */}
      <header className="text-center mt-10">
        <h1 className="text-3xl font-bold text-indigo-700">Instant Loan</h1>
        <p className="text-gray-600 mt-2">Get up to ₹50,000 instantly with 100% digital process</p>
      </header>

      {/* Loan Offer Section */}
      <section className="mt-10 grid md:grid-cols-2 gap-6 w-full max-w-5xl">
        {/* Instant Loan Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700">Instant Loan</h2>
          <p className="text-gray-500 text-sm mt-1">Up to ₹50,000</p>
          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <p>✅ 100% Digital</p>
            <p>⚡ Instant Disbursal</p>
            <p>💰 Starts @10.5% p.a</p>
          </div>
        </div>

        {/* Personal Loan Card */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold">Personal Loan</h2>
          <p className="text-sm mt-1">EMIs starting as low as ₹999</p>
          <button className="mt-4 bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100">
            Check Offers
          </button>
          <p className="text-xs mt-2">✨ 4 Lacs+ customers have availed loans with us</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-12 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Features and Benefits of Personal Loan
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
          <FeatureCard icon={<FaBolt />} title="Instant Disbursal" />
          <FeatureCard icon={<FaWallet />} title="100% Digital Process" />
          <FeatureCard icon={<FaPercent />} title="Low Interest Rates" />
          <FeatureCard icon={<FaFileAlt />} title="No Collateral Required" />
          <FeatureCard icon={<FaSyncAlt />} title="Flexible Repayment" />
        </div>
      </section>

      {/* Partners Section */}
      <section className="mt-16 max-w-5xl w-full">
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-8">Our Lending Partners</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PartnerCard name="L&T Finance Limited" />
          <PartnerCard name="Phaix Finance and Investment Limited (CASHe)" />
          <PartnerCard name="Cred Capital Service Pvt. Ltd." />
        </div>
      </section>

      <footer className="mt-12 mb-6 text-sm text-gray-500">
        © 2025 MoneyControl Loans. All Rights Reserved.
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title }) => (
  <div className="bg-white p-6 rounded-xl shadow hover:shadow-md flex flex-col items-center justify-center space-y-3">
    <div className="text-indigo-600 text-3xl">{icon}</div>
    <p className="text-gray-700 font-medium text-sm text-center">{title}</p>
  </div>
);

// Partner Card Component
const PartnerCard = ({ name }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 text-center">
    <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
    <p className="text-gray-500 text-sm mt-1">Personal Loan Partner</p>
  </div>
);

export default LandingPage;

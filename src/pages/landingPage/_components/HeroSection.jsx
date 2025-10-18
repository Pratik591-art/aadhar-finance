import React, { useState, useEffect } from "react";
import {
  FaBolt,
  FaCheckCircle,
  FaClock,
  FaRupeeSign,
  FaArrowRight,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [loanAmount, setLoanAmount] = useState(250000);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const navigate = useNavigate();
  // Calculate EMI
  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => {
      const rate = 10.5 / 12 / 100; // Monthly interest rate
      const n = tenure;
      const calculatedEmi =
        (loanAmount * rate * Math.pow(1 + rate, n)) /
        (Math.pow(1 + rate, n) - 1);
      setEmi(Math.round(calculatedEmi));
      setIsCalculating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [loanAmount, tenure]);

  const formatCurrency = (amount) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const handleApplyNow = () => {
    navigate("/loan"); // 🔹 your route path
  };

  return (
    <section className="bg-gray-50 py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Heading - Minimal */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
            <FaBolt className="text-xs" />2 Minutes Approval
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
            Personal Loans Made Simple
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            100% digital • No collateral • Instant disbursal
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Loan Calculator */}
          <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-5">
              Calculate Your Loan
            </h2>

            {/* Loan Amount Section */}
            <div className="mb-5">
              <div className="flex items-baseline justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Loan Amount
                </label>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(loanAmount)}
                  </span>
                </div>
              </div>

              <div className="relative">
                <input
                  type="range"
                  min="50000"
                  max="5000000"
                  step="50000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #2563eb 0%, #2563eb ${
                      ((loanAmount - 50000) / (5000000 - 50000)) * 100
                    }%, #e5e7eb ${
                      ((loanAmount - 50000) / (5000000 - 50000)) * 100
                    }%, #e5e7eb 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹50K</span>
                  <span>₹50L</span>
                </div>
              </div>
            </div>

            {/* Tenure Section */}
            <div className="mb-5">
              <div className="flex items-baseline justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Tenure
                </label>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900">
                    {tenure}
                  </span>
                  <span className="text-sm text-gray-600 ml-1">months</span>
                </div>
              </div>

              <div className="relative">
                <input
                  type="range"
                  min="3"
                  max="60"
                  step="3"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #2563eb 0%, #2563eb ${
                      ((tenure - 3) / (60 - 3)) * 100
                    }%, #e5e7eb ${
                      ((tenure - 3) / (60 - 3)) * 100
                    }%, #e5e7eb 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>3 months</span>
                  <span>60 months</span>
                </div>
              </div>
            </div>

            {/* EMI Display - Minimal */}
            <div className="bg-blue-50 p-4 rounded-xl mb-5 border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Monthly EMI</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {isCalculating ? (
                      <span className="text-gray-400">...</span>
                    ) : (
                      `₹${emi.toLocaleString()}`
                    )}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    @ 10.5% • Total: ₹{(emi * tenure).toLocaleString()}
                  </p>
                </div>
                <div className="text-blue-600">
                  <FaRupeeSign className="text-3xl" />
                </div>
              </div>
            </div>

            {/* CTA Button - Clean */}
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold text-base transition-colors flex items-center justify-center gap-2 group mb-5"
              onClick={handleApplyNow}
            >
              Apply Now
              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Quick Features - Minimal */}
            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-gray-200">
              <div className="text-center">
                <FaCheckCircle className="text-green-600 text-base mx-auto mb-1" />
                <p className="text-xs text-gray-600">Digital</p>
              </div>
              <div className="text-center">
                <FaClock className="text-blue-600 text-base mx-auto mb-1" />
                <p className="text-xs text-gray-600">2 Min</p>
              </div>
              <div className="text-center">
                <FaShieldAlt className="text-gray-600 text-base mx-auto mb-1" />
                <p className="text-xs text-gray-600">Secure</p>
              </div>
            </div>
          </div>

          {/* Right Side - Benefits & Stats */}
          <div className="space-y-6">
            {/* Key Benefits - Clean Cards */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Why Choose Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      No Hidden Charges
                    </p>
                    <p className="text-sm text-gray-600">
                      Transparent pricing with no surprises
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Flexible Repayment
                    </p>
                    <p className="text-sm text-gray-600">
                      Choose tenure from 3 to 60 months
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Quick Disbursal
                    </p>
                    <p className="text-sm text-gray-600">
                      Get funds in your account instantly
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">24/7 Support</p>
                    <p className="text-sm text-gray-600">
                      Always here to help you
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card - Minimal */}
            <div className="bg-blue-600 text-white p-6 md:p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <FaUsers className="text-2xl" />
                </div>
                <div>
                  <p className="text-3xl font-bold">4+ Lacs</p>
                  <p className="text-sm text-blue-100">Happy Customers</p>
                </div>
              </div>
              <p className="text-sm text-blue-100">
                Trusted by thousands across India
              </p>
            </div>

            {/* Quick Info - Minimal */}
            <div className="bg-gray-100 p-6 rounded-2xl">
              <h4 className="font-semibold text-gray-900 mb-3">
                Loan Features
              </h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                  <span>Interest Rate</span>
                  <span className="font-semibold">From 10.5%</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                  <span>Processing Fee</span>
                  <span className="font-semibold">Up to 3%</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Loan Amount</span>
                  <span className="font-semibold">₹50K - ₹50L</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

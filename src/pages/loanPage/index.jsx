
import { Briefcase, Home, ChevronRight, Check, Building2, GraduationCap, Car, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

  export default function LoanSelector() {
    const navigate = useNavigate();

    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto py-16 px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Choose Your Loan Type</h2>
          <p className="text-gray-500 mb-10 text-center">Select the loan that best fits your needs</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <button
              onClick={() => navigate("/loan/business")}
              className="flex items-center gap-3 md:gap-4 border-2 border-blue-100 rounded-xl p-5 md:p-6 hover:shadow-lg hover:border-blue-200 transition-all bg-white group"
            >
              <span className="bg-blue-600 text-white rounded-lg p-2.5 md:p-3 group-hover:scale-110 transition-transform"><Briefcase className="w-6 h-6 md:w-7 md:h-7" /></span>
              <span className="flex-1 text-left">
                <span className="block font-semibold text-gray-900 text-base md:text-lg">Business Loan</span>
                <span className="block text-gray-500 text-xs md:text-sm">For entrepreneurs & businesses</span>
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate("/loan/personal")}
              className="flex items-center gap-3 md:gap-4 border-2 border-green-100 rounded-xl p-5 md:p-6 hover:shadow-lg hover:border-green-200 transition-all bg-white group"
            >
              <span className="bg-green-600 text-white rounded-lg p-2.5 md:p-3 group-hover:scale-110 transition-transform"><Home className="w-6 h-6 md:w-7 md:h-7" /></span>
              <span className="flex-1 text-left">
                <span className="block font-semibold text-gray-900 text-base md:text-lg">Personal Loan</span>
                <span className="block text-gray-500 text-xs md:text-sm">For your personal needs</span>
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Disabled Loan Options */}
            <div className="relative">
              <div className="flex items-center gap-3 md:gap-4 border border-gray-200 rounded-xl p-5 md:p-6 bg-gray-50 opacity-70 cursor-not-allowed">
                <span className="bg-orange-500 text-white rounded-lg p-2.5 md:p-3"><Building2 className="w-6 h-6 md:w-7 md:h-7" /></span>
                <span className="flex-1 text-left">
                  <span className="block font-semibold text-gray-700 text-base md:text-lg">Mortgage Loan</span>
                  <span className="block text-gray-500 text-xs md:text-sm">Secure your property dreams</span>
                </span>
                <Lock className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              </div>
              <span className="absolute top-2 right-2 bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-medium">Coming Soon</span>
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 md:gap-4 border border-gray-200 rounded-xl p-5 md:p-6 bg-gray-50 opacity-70 cursor-not-allowed">
                <span className="bg-purple-500 text-white rounded-lg p-2.5 md:p-3"><Home className="w-6 h-6 md:w-7 md:h-7" /></span>
                <span className="flex-1 text-left">
                  <span className="block font-semibold text-gray-700 text-base md:text-lg">Home Loan</span>
                  <span className="block text-gray-500 text-xs md:text-sm">Build your dream home</span>
                </span>
                <Lock className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              </div>
              <span className="absolute top-2 right-2 bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-medium">Coming Soon</span>
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 md:gap-4 border border-gray-200 rounded-xl p-5 md:p-6 bg-gray-50 opacity-70 cursor-not-allowed">
                <span className="bg-indigo-500 text-white rounded-lg p-2.5 md:p-3"><GraduationCap className="w-6 h-6 md:w-7 md:h-7" /></span>
                <span className="flex-1 text-left">
                  <span className="block font-semibold text-gray-700 text-base md:text-lg">Education Loan</span>
                  <span className="block text-gray-500 text-xs md:text-sm">Invest in your future</span>
                </span>
                <Lock className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              </div>
              <span className="absolute top-2 right-2 bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-medium">Coming Soon</span>
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 md:gap-4 border border-gray-200 rounded-xl p-5 md:p-6 bg-gray-50 opacity-70 cursor-not-allowed">
                <span className="bg-red-500 text-white rounded-lg p-2.5 md:p-3"><Car className="w-6 h-6 md:w-7 md:h-7" /></span>
                <span className="flex-1 text-left">
                  <span className="block font-semibold text-gray-700 text-base md:text-lg">Vehicle Loan</span>
                  <span className="block text-gray-500 text-xs md:text-sm">Drive your dream vehicle</span>
                </span>
                <Lock className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              </div>
              <span className="absolute top-2 right-2 bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-medium">Coming Soon</span>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="mt-12 md:mt-16 border border-gray-100 rounded-xl p-6 md:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 text-center md:text-left">Why Choose Aadhar Finance</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm md:text-base">No Hidden Charges</p>
                  <p className="text-gray-500 text-xs md:text-sm mt-0.5">Transparent pricing</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm md:text-base">Flexible Repayment</p>
                  <p className="text-gray-500 text-xs md:text-sm mt-0.5">Tenure from 3 to 60 months</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm md:text-base">Quick Disbursal</p>
                  <p className="text-gray-500 text-xs md:text-sm mt-0.5">Funds in your account instantly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm md:text-base">24/7 Support</p>
                  <p className="text-gray-500 text-xs md:text-sm mt-0.5">Always here to help you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

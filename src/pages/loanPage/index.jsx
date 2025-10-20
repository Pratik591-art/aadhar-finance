
import { Briefcase, Home, ChevronRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

  export default function LoanSelector() {
    const navigate = useNavigate();

    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Choose Your Loan Type</h2>
          <p className="text-gray-500 mb-10 text-center">Select the loan that best fits your needs</p>
          <div className="grid grid-cols-1 gap-6">
            <button
              onClick={() => navigate("/loan/business")}
              className="flex items-center gap-4 border border-gray-200 rounded-xl p-6 hover:shadow-sm transition bg-white"
            >
              <span className="bg-blue-600 text-white rounded-lg p-3"><Briefcase className="w-7 h-7" /></span>
              <span className="flex-1 text-left">
                <span className="block font-semibold text-gray-900">Business Loan</span>
                <span className="block text-gray-500 text-sm">For entrepreneurs & businesses</span>
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button
              onClick={() => navigate("/loan/personal")}
              className="flex items-center gap-4 border border-gray-200 rounded-xl p-6 hover:shadow-sm transition bg-white"
            >
              <span className="bg-green-600 text-white rounded-lg p-3"><Home className="w-7 h-7" /></span>
              <span className="flex-1 text-left">
                <span className="block font-semibold text-gray-900">Personal Loan</span>
                <span className="block text-gray-500 text-sm">For your personal needs</span>
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Why Choose Us Section */}
          <div className="mt-16 border border-gray-100 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Why Choose Aadhar Finance</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">No Hidden Charges</p>
                  <p className="text-gray-500 text-xs">Transparent pricing</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Flexible Repayment</p>
                  <p className="text-gray-500 text-xs">Tenure from 3 to 60 months</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Quick Disbursal</p>
                  <p className="text-gray-500 text-xs">Funds in your account instantly</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">24/7 Support</p>
                  <p className="text-gray-500 text-xs">Always here to help you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

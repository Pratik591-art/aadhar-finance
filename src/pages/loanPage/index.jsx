import { useState } from "react";
import { Briefcase, Home, ChevronRight, Check } from "lucide-react";

export default function LoanSelector() {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showPartners, setShowPartners] = useState(false);

  const businessPartners = [
    {
      id: 1,
      name: "L&T Finance Limited",
      rating: 4.5,
      type: "Business Loan",
      loanAmount: "₹50 L to 1 Cr",
      interestRate: "starting from 9.5%",
      tenure: "12 to 60 Months",
      processingFee: "Up to 3% + taxes",
    },
    {
      id: 2,
      name: "Dhanax Finance",
      rating: 4.4,
      type: "Business Loan",
      loanAmount: "₹10 L to 50 L",
      interestRate: "starting from 12%",
      tenure: "6 to 48 Months",
      processingFee: "Up to 5% + GST",
    },
    {
      id: 3,
      name: "Axis Business Loan",
      rating: 4.6,
      type: "Business Loan",
      loanAmount: "₹25 L to 2 Cr",
      interestRate: "starting from 10.5%",
      tenure: "12 to 84 Months",
      processingFee: "Up to 2.5% + taxes",
    },
  ];

  const personalPartners = [
    {
      id: 1,
      name: "L&T Finance Limited",
      rating: 4.5,
      type: "Personal Loan",
      loanAmount: "₹30 K to 15 Lacs",
      interestRate: "starting from 11%",
      tenure: "12 to 48 Months",
      processingFee: "Up to 3% of loan amount + applicable taxes",
    },
    {
      id: 2,
      name: "Dhanax Finance and Investment Limited",
      rating: 4.4,
      type: "Personal Loan",
      loanAmount: "₹10 K to 4 Lacs",
      interestRate: "starting from 18%",
      tenure: "3 to 24 Months",
      processingFee: "Up to 10% + GST",
    },
    {
      id: 3,
      name: "Si Creva Capital Service Private Limited",
      rating: 4.3,
      type: "Personal Loan",
      loanAmount: "₹5 K to 2 Lacs",
      interestRate: "starting from 24%",
      tenure: "3 to 12 Months",
      processingFee: "Upto 2.5% of Loan Amount",
    },
  ];

  const handleLoanSelect = (loanType) => {
    setSelectedLoan(loanType);
    setShowPartners(true);
  };

  if (selectedLoan) {
    const partners =
      selectedLoan === "business" ? businessPartners : personalPartners;
    const title =
      selectedLoan === "business" ? "Business Loan" : "Personal Loan";

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm py-6 px-4 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => {
                setSelectedLoan(null);
                setShowPartners(false);
              }}
              className="flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-4"
            >
              <ChevronRight className="w-5 h-5 transform -rotate-180" />
              Back to Selection
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              {title} Options
            </h1>
            <p className="text-gray-600 mt-2">
              Choose from our trusted partner lenders
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      {partner.name}
                    </h3>
                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 font-semibold text-gray-800">
                        {partner.rating}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-gray-600 text-sm">Loan Amount</p>
                      <p className="text-blue-600 font-semibold text-lg">
                        {partner.loanAmount}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Interest Rate</p>
                      <p className="text-blue-600 font-semibold">
                        {partner.interestRate}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Tenure</p>
                      <p className="text-gray-900 font-semibold">
                        {partner.tenure}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Processing Fee</p>
                      <p className="text-gray-900 font-semibold">
                        {partner.processingFee}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center">
                      Apply Now <ChevronRight className="w-4 h-4 ml-2" />
                    </button>
                    <button className="w-full text-blue-600 hover:text-blue-700 font-semibold py-2 flex items-center justify-center">
                      <span className="text-lg">ℹ</span>
                      <span className="ml-2">View Contact Details</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Choose Your Loan Type
          </h2>
          <p className="text-gray-600 text-lg">
            Select the loan that best fits your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Business Loan Card */}
          <button
            onClick={() => handleLoanSelect("business")}
            className="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 cursor-pointer"
          >
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white">
              <Briefcase className="w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold">Business Loan</h3>
              <p className="text-blue-100 text-sm mt-1">
                For entrepreneurs & businesses
              </p>
            </div>
            <div className="p-8">
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">
                      Loan up to 1 Crore
                    </p>
                    <p className="text-gray-600 text-sm">
                      Flexible loan amounts
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">
                      Competitive Rates
                    </p>
                    <p className="text-gray-600 text-sm">
                      Starting from 9.5% p.a
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">
                      Quick Disbursal
                    </p>
                    <p className="text-gray-600 text-sm">Funds in 2 minutes</p>
                  </div>
                </div>
              </div>
              <span className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg group-hover:bg-blue-700 transition">
                Explore Options →
              </span>
            </div>
          </button>

          {/* Personal Loan Card */}
          <button
            onClick={() => handleLoanSelect("personal")}
            className="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 cursor-pointer"
          >
            <div className="bg-gradient-to-br from-green-600 to-green-700 p-8 text-white">
              <Home className="w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold">Personal Loan</h3>
              <p className="text-green-100 text-sm mt-1">
                For your personal needs
              </p>
            </div>
            <div className="p-8">
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">
                      Loan up to 15 Lakhs
                    </p>
                    <p className="text-gray-600 text-sm">
                      No collateral required
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">
                      Flexible Terms
                    </p>
                    <p className="text-gray-600 text-sm">
                      3 to 60 months tenure
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">
                      Minimal Documentation
                    </p>
                    <p className="text-gray-600 text-sm">
                      Quick approval process
                    </p>
                  </div>
                </div>
              </div>
              <span className="inline-block bg-green-600 text-white font-semibold py-3 px-8 rounded-lg group-hover:bg-green-700 transition">
                Explore Options →
              </span>
            </div>
          </button>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Why Choose Aadhar Finance
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start">
              <Check className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">No Hidden Charges</p>
                <p className="text-gray-600 text-sm mt-1">
                  Transparent pricing with no surprises
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Check className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">
                  Flexible Repayment
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  Choose tenure from 3 to 60 months
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Check className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Quick Disbursal</p>
                <p className="text-gray-600 text-sm mt-1">
                  Get funds in your account instantly
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Check className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">24/7 Support</p>
                <p className="text-gray-600 text-sm mt-1">
                  Always here to help you
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

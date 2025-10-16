import React from 'react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

const DownloadAppSection = () => {
  return (
    <section className="bg-gradient-to-r from-purple-100 to-blue-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text and Buttons */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Easy, Quick and Hassle-free
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Download Moneycontrol app<br />
              and get instant cash
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
              >
                <FaGooglePlay className="text-2xl" />
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </a>

              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
              >
                <FaApple className="text-3xl" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side - QR Code and Phone */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* Phone Mockup */}
              <div className="w-64 h-96 bg-white rounded-3xl shadow-2xl p-4 border-8 border-gray-800 relative">
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-4">
                      <div className="w-12 h-12 bg-white rounded-full mx-auto mb-2"></div>
                      <div className="text-sm font-semibold">moneycontrol</div>
                    </div>
                    <p className="text-sm">Instant Loan App</p>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-2xl shadow-xl">
                <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  {/* QR Code Pattern */}
                  <div className="grid grid-cols-8 gap-1 p-2">
                    {[...Array(64)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 ${
                          Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-center mt-2 text-gray-600">Scan to Download</p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-300 rounded-full opacity-50 blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-300 rounded-full opacity-50 blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadAppSection;

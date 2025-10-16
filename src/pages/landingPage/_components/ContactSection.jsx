import React from 'react';
import { FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
          We're always here to help you
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Call Us */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-600 text-white p-4 rounded-full">
                <FaPhone className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Call us</h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              For product, questions, loan status or anything else, our customer care team is ready to help you
            </p>

            <div className="space-y-2">
              <a href="tel:02269716161" className="text-2xl font-bold text-blue-600 hover:text-blue-700 block">
                022 - 69716161
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaClock />
                <span>Monday to Saturday (9:00 AM to 6:00 PM)</span>
              </div>
            </div>
          </div>

          {/* Write to Us */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-600 text-white p-4 rounded-full">
                <FaEnvelope className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Write to us</h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              Feel free to reach out with any inquiries, feedback, or just to chat. We'll get back to you soon.
            </p>

            <a 
              href="mailto:moneycontrolpar@nw18.com"
              className="text-xl font-bold text-purple-600 hover:text-purple-700 break-all"
            >
              moneycontrolpar@nw18.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

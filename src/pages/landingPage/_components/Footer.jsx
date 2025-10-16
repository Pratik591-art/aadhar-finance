import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-3 py-1 rounded font-bold text-lg inline-block mb-4">
              moneycontrol
            </div>
            <p className="text-sm text-gray-400 mb-4">
              MONEYCONTROL DOT COM INDIA LIMITED<br />
              Unit No. 101/102, 1st Floor, Akruti Trade Centre,<br />
              Road No 7, MIDC, Andheri (East),<br />
              Mumbai - 400 093
            </p>
            <p className="text-sm text-gray-400">
              <strong>NBFC Registration Number:</strong> N-09.03023<br />
              <strong>RBI Certificate of Registration No.:</strong> N-09.03023<br />
              <strong>Telephone No:</strong> 022-69716161
            </p>
          </div>

          {/* Statutory Information */}
          <div>
            <h3 className="text-white font-bold mb-4">Statutory Information</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Company Info Details</a></li>
              <li><a href="#" className="hover:text-white transition">Transfer Charter (O)</a></li>
              <li><a href="#" className="hover:text-white transition">Financial Statements</a></li>
              <li><a href="#" className="hover:text-white transition">Compliance Audit</a></li>
              <li><a href="#" className="hover:text-white transition">Circulars Advisories</a></li>
            </ul>
          </div>

          {/* Digital Lending */}
          <div>
            <h3 className="text-white font-bold mb-4">Digital Lending</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Service Guidelines</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Complaints Resolution</a></li>
            </ul>
          </div>

          {/* Compliance & Grievances */}
          <div>
            <h3 className="text-white font-bold mb-4">Compliance & Grievances</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Investor Complaints</a></li>
              <li><a href="#" className="hover:text-white transition">Grievance Redressal Mech.</a></li>
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition">
                  <FaFacebookF />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-400 transition">
                  <FaTwitter />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-700 transition">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2025 Moneycontrol. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms & Conditions</a>
              <a href="#" className="hover:text-white transition">Disclaimer</a>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Disclaimer */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <p className="text-xs text-gray-500 text-center">
            <strong>Disclaimer:</strong> Registration granted by SEBI, membership of BASL (in case of IAs) and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors. The examples and/or scurities quoted (if any) are for illustration only and are not recommendatory.
          </p>
          <p className="text-xs text-gray-500 text-center mt-2">
            <strong>Warning:</strong> Investment in equity/capital market securities available in India is subject to market risks. Read all the related documents carefully before investing.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

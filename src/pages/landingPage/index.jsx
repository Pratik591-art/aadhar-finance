import React from 'react';
import HeroSection from './_components/HeroSection';
import FeaturesSection from './_components/FeaturesSection';
import PartnersSection from './_components/PartnersSection';
import TestimonialsSection from './_components/TestimonialsSection';
import DownloadAppSection from './_components/DownloadAppSection';
import ContactSection from './_components/ContactSection';
import Footer from './_components/Footer';
import SEO from '../../components/SEO';
import { seoConfigs, createLoanProductStructuredData } from '../../utils/seo';

const LandingPage = () => {
  // Personal Loan Structured Data
  const personalLoanStructuredData = createLoanProductStructuredData({
    name: 'Personal Loan',
    description: 'Get instant personal loans from ₹50,000 to ₹50,00,000 with flexible repayment options',
    minAmount: 50000,
    maxAmount: 5000000,
    interestRate: '10.5%',
    tenure: '3-60 months',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        {...seoConfigs.home}
        structuredData={personalLoanStructuredData}
      />
      <main>
        <section id="hero">
          <HeroSection />
        </section>
        <section id="features">
          <FeaturesSection />
        </section>
        <section id="partners">
          <PartnersSection />
        </section>
        <section id="testimonials">
          <TestimonialsSection />
        </section>
        {/* <section id="download">
          <DownloadAppSection />
        </section> */}
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

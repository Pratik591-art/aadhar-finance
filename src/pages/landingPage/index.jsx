import React from 'react';
import Header from './_components/Header';
import HeroSection from './_components/HeroSection';
import FeaturesSection from './_components/FeaturesSection';
import PartnersSection from './_components/PartnersSection';
import TestimonialsSection from './_components/TestimonialsSection';
import DownloadAppSection from './_components/DownloadAppSection';
import ContactSection from './_components/ContactSection';
import Footer from './_components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
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
        <section id="download">
          <DownloadAppSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

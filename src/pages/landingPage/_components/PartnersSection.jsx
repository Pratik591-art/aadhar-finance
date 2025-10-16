import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaCheckCircle, FaInfoCircle, FaStar } from 'react-icons/fa';

const PartnerCard = ({ logo, name, loanType, grievanceRedressal, contactPerson, email, phone, productFeaturesLink, rbiSachetLink, loanOffered, loanTenure, processingFee, interestRate, privacyLink, registerComplaintLink, tncLink, rating = 4.5 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-gray-200 hover:border-gray-300 transition-all duration-300 overflow-hidden hover:shadow-xl relative">
      {/* Header - Compact */}
      <div className="px-6 pt-6 pb-4">
        {/* Company Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-3">{name}</h3>
        
        {/* Rating and Type */}
        <div className="flex items-center gap-2 text-sm mb-4">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400 text-sm" />
            <span className="text-gray-700 font-semibold">{rating}</span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600">{loanType}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100"></div>

      {/* Content - Clean Grid */}
      <div className="px-6 py-4 space-y-0">
        {/* Loan Details */}
        <div className="space-y-0">
          <div className="flex items-start justify-between py-3 border-b border-gray-50">
            <span className="text-sm text-gray-600">Loan Amount</span>
            <span className="text-sm font-bold text-gray-900 text-right">{loanOffered}</span>
          </div>

          <div className="flex items-start justify-between py-3 border-b border-gray-50">
            <span className="text-sm text-gray-600">Interest Rate</span>
            <span className="text-sm font-bold text-blue-600 text-right">{interestRate}</span>
          </div>

          <div className="flex items-start justify-between py-3 border-b border-gray-50">
            <span className="text-sm text-gray-600">Tenure</span>
            <span className="text-sm font-bold text-gray-900 text-right">{loanTenure}</span>
          </div>

          <div className="flex items-start justify-between py-3">
            <span className="text-sm text-gray-600">Processing Fee</span>
            <span className="text-xs font-bold text-gray-900 text-right max-w-[55%] leading-tight">{processingFee}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100"></div>

      {/* Actions */}
      <div className="px-6 py-4">
        {/* CTA Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-6 rounded-xl font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-2">
          Apply Now
          <span>→</span>
        </button>

        {/* Contact Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center justify-center gap-2 py-3 mt-2"
        >
          <FaInfoCircle className="text-xs" />
          <span className="font-medium">{isExpanded ? 'Hide' : 'View'} Contact Details</span>
          <FaChevronRight className={`text-xs transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </button>

        {/* Expandable Contact */}
        {isExpanded && (
          <div className="mt-3 p-4 bg-gray-50 rounded-xl space-y-3 text-sm border border-gray-100">
            <div>
              <p className="text-gray-500 text-xs mb-1">{grievanceRedressal}</p>
              <p className="font-semibold text-gray-900">{contactPerson}</p>
            </div>
            <div>
              <a href={`mailto:${email}`} className="text-blue-600 hover:underline font-medium">{email}</a>
              {phone && <p className="text-gray-600 text-xs mt-1">{phone}</p>}
            </div>
            <div className="flex gap-2 pt-2 text-xs">
              <a href={productFeaturesLink} className="text-blue-600 hover:underline font-medium">Features</a>
              <span className="text-gray-300">•</span>
              <a href={rbiSachetLink} className="text-blue-600 hover:underline font-medium">RBI Sachet</a>
            </div>
          </div>
        )}

        {/* Footer Links */}
        <div className="flex justify-center gap-2 text-xs text-gray-500 pt-3">
          <a href={privacyLink} className="hover:text-blue-600 transition-colors">Privacy</a>
          {registerComplaintLink && (
            <>
              <span>•</span>
              <a href={registerComplaintLink} className="hover:text-blue-600 transition-colors">Complaint</a>
            </>
          )}
          {tncLink && (
            <>
              <span>•</span>
              <a href={tncLink} className="hover:text-blue-600 transition-colors">T&C</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const PartnersSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  // DLA carousel state
  const [dlaCurrentIndex, setDlaCurrentIndex] = useState(0);
  const [dlaItemsPerPage, setDlaItemsPerPage] = useState(2);
  const [dlaIsHovered, setDlaIsHovered] = useState(false);
  const [dlaTouchStart, setDlaTouchStart] = useState(0);
  const [dlaTouchEnd, setDlaTouchEnd] = useState(0);
  const [dlaIsDragging, setDlaIsDragging] = useState(false);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Update items per page based on screen size
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
        setDlaItemsPerPage(1); // Mobile: 1 DLA card
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
        setDlaItemsPerPage(2); // Tablet: 2 DLA cards
      } else {
        setItemsPerPage(3);
        setDlaItemsPerPage(2); // Desktop: 2 DLA cards
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dlaPartners = [
    {
      name: "pretr",
      type: "DLA Partner",
      interestRate: "12% onwards",
      processingFee: "Free",
      tenure: "As Applicable Internally",
      amount: "₹10,000 - ₹5,00,000",
      registrationLink: "#",
      privacyLink: "#",
      tncLink: "#",
    },
    {
      name: "moneyview",
      type: "DLA Partner",
      interestRate: "16% onwards",
      processingFee: "As Applicable",
      tenure: "As per partner policy",
      amount: "Upto ₹10,00,000",
      registrationLink: "#",
      privacyLink: "#",
      tncLink: "#",
    },
  ];

  // Calculate total slides
  const totalSlides = React.useMemo(() => Math.ceil(lendingPartners.length / itemsPerPage), [lendingPartners.length, itemsPerPage]);
  const dlaTotalSlides = React.useMemo(() => Math.ceil(dlaPartners.length / dlaItemsPerPage), [dlaPartners.length, dlaItemsPerPage]);

  // Auto-play functionality for lending partners
  React.useEffect(() => {
    if (isHovered || isDragging || totalSlides === 0) return; // Pause on hover or drag

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isHovered, isDragging, totalSlides]); // Re-run when dependencies change

  // Auto-play functionality for DLA partners (mobile only)
  React.useEffect(() => {
    if (dlaItemsPerPage !== 1 || dlaTotalSlides === 0) return; // Only auto-play on mobile
    if (dlaIsHovered || dlaIsDragging) return; // Pause on hover or drag

    const interval = setInterval(() => {
      setDlaCurrentIndex((prev) => (prev + 1) % dlaTotalSlides);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [dlaIsHovered, dlaItemsPerPage, dlaIsDragging, dlaTotalSlides]); // Re-run when dependencies change

  // Touch handlers
  const onTouchStart = (e) => {
    setTouchEnd(0); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    setIsDragging(false);
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Mouse drag handlers for desktop
  const onMouseDown = (e) => {
    setTouchEnd(0);
    setTouchStart(e.clientX);
    setIsDragging(true);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };



  // DLA Touch handlers
  const onDlaTouchStart = (e) => {
    setDlaTouchEnd(0);
    setDlaTouchStart(e.targetTouches[0].clientX);
    setDlaIsDragging(true);
  };

  const onDlaTouchMove = (e) => {
    setDlaTouchEnd(e.targetTouches[0].clientX);
  };

  const onDlaTouchEnd = () => {
    setDlaIsDragging(false);
    if (!dlaTouchStart || !dlaTouchEnd) return;
    
    const distance = dlaTouchStart - dlaTouchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && dlaCurrentIndex < dlaTotalSlides - 1) {
      setDlaCurrentIndex(prev => prev + 1);
    } else if (isRightSwipe && dlaCurrentIndex > 0) {
      setDlaCurrentIndex(prev => prev - 1);
    }
  };

  // DLA Mouse drag handlers
  const onDlaMouseDown = (e) => {
    setDlaTouchEnd(0);
    setDlaTouchStart(e.clientX);
    setDlaIsDragging(true);
  };

  const onDlaMouseMove = (e) => {
    if (!dlaIsDragging) return;
    setDlaTouchEnd(e.clientX);
  };

  const onDlaMouseUp = () => {
    if (!dlaIsDragging) return;
    setDlaIsDragging(false);
    if (!dlaTouchStart || !dlaTouchEnd) return;
    
    const distance = dlaTouchStart - dlaTouchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && dlaCurrentIndex < dlaTotalSlides - 1) {
      setDlaCurrentIndex(prev => prev + 1);
    } else if (isRightSwipe && dlaCurrentIndex > 0) {
      setDlaCurrentIndex(prev => prev - 1);
    }
  };



  const lendingPartners = [
    {
      logo: null,
      name: 'L&T Finance Limited',
      loanType: 'Personal Loan',
      grievanceRedressal: 'Grievance Redressal',
      contactPerson: 'Mr. Vinod Varadan',
      email: 'gro@ltfs.com',
      phone: null,
      productFeaturesLink: '#',
      rbiSachetLink: '#',
      loanOffered: '₹30 K to 15 Lacs*',
      loanTenure: '12 to 48 Months',
      processingFee: 'Up to 3% of loan amount + applicable taxes',
      interestRate: 'starting from 11%*',
      privacyLink: '#',
      registerComplaintLink: null,
      tncLink: null
    },
    {
      logo: null,
      name: 'Bhanix Finance and Investment Limited(CASHe)',
      loanType: 'Personal Loan',
      grievanceRedressal: 'Grievance Redressal',
      contactPerson: 'Mrs. Pushpinder Kaur',
      email: 'grievance@bhanix.in',
      phone: '+919983107444',
      productFeaturesLink: '#',
      rbiSachetLink: '#',
      loanOffered: '₹10 K to 4 Lacs*',
      loanTenure: '3 to 24 Months',
      processingFee: 'Up to 10% + GST',
      interestRate: 'starting from 18%*',
      privacyLink: '#',
      registerComplaintLink: '#',
      tncLink: null
    },
    {
      logo: null,
      name: 'Si Creva Capital Service Private Limited',
      loanType: 'Personal Loan',
      grievanceRedressal: 'Grievance Redressal',
      contactPerson: 'Mr. Mukul Dwivedi',
      email: 'care@paywithring.com',
      phone: '08044745880 | 08062816300',
      productFeaturesLink: '#',
      rbiSachetLink: '#',
      loanOffered: '₹5 K to 2 Lacs*',
      loanTenure: '3 to 12 Months',
      processingFee: 'Upto 2.5% of Loan Amount',
      interestRate: 'starting from 24%*',
      privacyLink: '#',
      registerComplaintLink: null,
      tncLink: '#'
    },
    {
      logo: null,
      name: 'Shriram Capital',
      loanType: 'Personal Loan',
      grievanceRedressal: 'Grievance Redressal',
      contactPerson: 'Mr. Rajesh Kumar',
      email: 'support@shriramcapital.com',
      phone: '1800-267-6666',
      productFeaturesLink: '#',
      rbiSachetLink: '#',
      loanOffered: '₹20 K to 10 Lacs*',
      loanTenure: '6 to 12 Months',
      processingFee: 'As decided Internally',
      interestRate: 'starting from 12%*',
      privacyLink: '#',
      registerComplaintLink: '#',
      tncLink: '#'
    },
    {
      logo: null,
      name: 'Bajaj Finance Limited',
      loanType: 'Personal Loan',
      grievanceRedressal: 'Grievance Redressal',
      contactPerson: 'Customer Care',
      email: 'support@bajajfinserv.in',
      phone: '020-30305555',
      productFeaturesLink: '#',
      rbiSachetLink: '#',
      loanOffered: '₹1 Lac to 40 Lacs*',
      loanTenure: '6 to 60 Months',
      processingFee: 'Upto 3% with GST',
      interestRate: 'Customized',
      privacyLink: '#',
      registerComplaintLink: '#',
      tncLink: '#'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Lending Partners Carousel */}
        <div className="mb-16">
          {/* Section Header - Minimal */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-3">
              <FaCheckCircle className="text-green-500 text-xs" />
              <span>Verified Partners</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Our Lending Partners
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trusted financial institutions offering competitive loan products
            </p>
          </div>

          {/* Carousel Container - Clean */}
          <div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Navigation Buttons - Minimal */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white border border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-600 p-3 rounded-full shadow-sm hover:shadow-md transition-all"
              aria-label="Previous partners"
            >
              <FaChevronLeft className="text-lg" />
            </button>

            {/* Cards Container */}
            <div 
              className="overflow-hidden cursor-grab active:cursor-grabbing"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={() => {
                if (isDragging) {
                  setIsDragging(false);
                }
              }}
            >
              <div 
                className={`flex ${isDragging ? '' : 'transition-transform duration-500 ease-out'}`}
                style={{ 
                  transform: `translateX(-${currentIndex * 100}%)`,
                  userSelect: isDragging ? 'none' : 'auto',
                  gap: itemsPerPage === 1 ? '0' : '1.5rem',
                }}
              >
                {lendingPartners.map((partner, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0"
                    style={{
                      width: itemsPerPage === 1 ? '100%' : 
                             itemsPerPage === 2 ? 'calc(50% - 0.75rem)' : 
                             'calc(33.333% - 1rem)'
                    }}
                  >
                    <PartnerCard {...partner} rating={4.5 - (index * 0.1)} />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white border border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-600 p-3 rounded-full shadow-sm hover:shadow-md transition-all"
              aria-label="Next partners"
            >
              <FaChevronRight className="text-lg" />
            </button>

            
          </div>

          {/* Dots - Minimal */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Stats - Clean */}
          <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
            <div className="text-center py-4 border-r border-gray-200 last:border-r-0">
              <div className="text-2xl font-bold text-gray-900">5+</div>
              <p className="text-xs text-gray-600 mt-1">Partners</p>
            </div>
            <div className="text-center py-4 border-r border-gray-200 last:border-r-0">
              <div className="text-2xl font-bold text-gray-900">₹50L</div>
              <p className="text-xs text-gray-600 mt-1">Max Amount</p>
            </div>
            <div className="text-center py-4">
              <div className="text-2xl font-bold text-gray-900">10.5%</div>
              <p className="text-xs text-gray-600 mt-1">From</p>
            </div>
          </div>
        </div>

        {/* Disclaimer - Minimal */}
        <div className="border-l-2 border-yellow-400 bg-yellow-50 p-4 rounded-r-lg mb-16">
          <p className="text-xs text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Disclaimer:</strong> Moneycontrol Doit Care India Limited is a digital loan partner authorized to provide services on behalf of its Lending Partners. All approvals subject to partner's terms.
          </p>
        </div>

        {/* DLA Partners - Minimal */}
        <div>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-3">
              <FaStar className="text-yellow-500 text-xs" />
              <span>Digital Lending</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              DLA Partners
            </h2>
            <p className="text-gray-600">
              Quick digital lending solutions
            </p>
          </div>

          {/* DLA Carousel Container - Mobile */}
          <div 
            className="md:hidden relative max-w-4xl mx-auto"
            onMouseEnter={() => setDlaIsHovered(true)}
            onMouseLeave={() => setDlaIsHovered(false)}
          >
            <div 
              className="overflow-hidden cursor-grab active:cursor-grabbing"
              onTouchStart={onDlaTouchStart}
              onTouchMove={onDlaTouchMove}
              onTouchEnd={onDlaTouchEnd}
              onMouseDown={onDlaMouseDown}
              onMouseMove={onDlaMouseMove}
              onMouseUp={onDlaMouseUp}
              onMouseLeave={() => {
                if (dlaIsDragging) {
                  setDlaIsDragging(false);
                }
              }}
            >
              <div 
                className={`flex ${dlaIsDragging ? '' : 'transition-transform duration-500 ease-out'}`}
                style={{ 
                  transform: `translateX(-${dlaCurrentIndex * 100}%)`,
                  userSelect: dlaIsDragging ? 'none' : 'auto',
                }}
              >
                {dlaPartners.map((partner, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0"
                    style={{ width: '100%' }}
                  >
                    <div className="bg-white rounded-3xl border border-gray-200 hover:border-gray-300 transition-all overflow-hidden hover:shadow-xl shadow-lg relative">
                      {/* Header */}
                      <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-xl font-bold text-blue-600">{partner.name.charAt(0)}</span>
                          </div>
                          <span className="text-xs text-gray-600 border border-gray-200 px-2 py-1 rounded">{partner.type}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">{partner.name}</h3>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-2">
                        <div className="flex items-center justify-between py-2 border-b border-gray-50">
                          <span className="text-sm text-gray-600">Loan Amount</span>
                          <span className="text-sm font-semibold text-gray-900">{partner.amount}</span>
                        </div>

                        <div className="flex items-center justify-between py-2 border-b border-gray-50">
                          <span className="text-sm text-gray-600">Interest Rate</span>
                          <span className="text-sm font-semibold text-blue-600">{partner.interestRate}</span>
                        </div>

                        <div className="flex items-center justify-between py-2 border-b border-gray-50">
                          <span className="text-sm text-gray-600">Tenure</span>
                          <span className="text-xs font-semibold text-gray-900 text-right max-w-[50%]">{partner.tenure}</span>
                        </div>

                        <div className="flex items-center justify-between py-2">
                          <span className="text-sm text-gray-600">Processing Fee</span>
                          <span className="text-sm font-semibold text-gray-900">{partner.processingFee}</span>
                        </div>

                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium text-sm transition-colors mt-4">
                          Apply with {partner.name} →
                        </button>

                        <div className="flex justify-center gap-2 text-xs text-gray-500 pt-2">
                          <a href={partner.registrationLink} className="hover:text-blue-600 transition-colors">Registration</a>
                          <span>•</span>
                          <a href={partner.privacyLink} className="hover:text-blue-600 transition-colors">Privacy</a>
                          <span>•</span>
                          <a href={partner.tncLink} className="hover:text-blue-600 transition-colors">T&C</a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots - DLA Mobile */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: dlaTotalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setDlaCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === dlaCurrentIndex 
                      ? 'bg-blue-600 w-8' 
                      : 'bg-gray-300 w-2 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to DLA slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* DLA Grid - Tablet and Desktop */}
          <div className="hidden md:grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {dlaPartners.map((partner, index) => (
              <div key={index} className="bg-white rounded-3xl border border-gray-200 hover:border-gray-300 transition-all overflow-hidden hover:shadow-xl relative">
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl font-bold text-blue-600">{partner.name.charAt(0)}</span>
                    </div>
                    <span className="text-xs text-gray-600 border border-gray-200 px-2 py-1 rounded">{partner.type}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{partner.name}</h3>
                </div>

                {/* Content */}
                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-600">Loan Amount</span>
                    <span className="text-sm font-semibold text-gray-900">{partner.amount}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-600">Interest Rate</span>
                    <span className="text-sm font-semibold text-blue-600">{partner.interestRate}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-600">Tenure</span>
                    <span className="text-xs font-semibold text-gray-900 text-right max-w-[50%]">{partner.tenure}</span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600">Processing Fee</span>
                    <span className="text-sm font-semibold text-gray-900">{partner.processingFee}</span>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium text-sm transition-colors mt-4">
                    Apply with {partner.name} →
                  </button>

                  <div className="flex justify-center gap-2 text-xs text-gray-500 pt-2">
                    <a href={partner.registrationLink} className="hover:text-blue-600 transition-colors">Registration</a>
                    <span>•</span>
                    <a href={partner.privacyLink} className="hover:text-blue-600 transition-colors">Privacy</a>
                    <span>•</span>
                    <a href={partner.tncLink} className="hover:text-blue-600 transition-colors">T&C</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;

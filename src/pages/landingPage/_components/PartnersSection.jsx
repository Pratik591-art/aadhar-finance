import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaCheckCircle, FaInfoCircle, FaStar } from 'react-icons/fa';

const PartnerCard = ({ logo, name, loanType, grievanceRedressal, contactPerson, email, phone, privacyLink, registerComplaintLink, tncLink }) => {
  return (
    <div className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 overflow-hidden hover:shadow-lg">
      {/* Logo and Name */}
      <div className="text-center py-6 border-b border-gray-100">
        {logo && (
          <img 
            src={logo} 
            alt={name}
            className="h-12 mx-auto mb-3 object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}
        <h3 className="text-base font-semibold text-gray-900 px-4 mb-2">{name}</h3>
        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium inline-block">{loanType}</span>
      </div>

      {/* Contact Info */}
      <div className="p-6 text-center">
        <p className="text-xs text-gray-500 mb-2">{grievanceRedressal}</p>
        <p className="text-sm font-medium text-gray-900 mb-2">{contactPerson}</p>
        <a href={`mailto:${email}`} className="text-sm text-blue-600 hover:underline break-all block mb-1">{email}</a>
        {phone && <p className="text-xs text-gray-600">{phone}</p>}
      </div>

      {/* Footer Links */}
      <div className="px-6 py-4 border-t border-gray-100 flex justify-center gap-3 text-xs">
        <a href={privacyLink} className="text-blue-600 hover:underline">Privacy Policy</a>
        {tncLink && (
          <>
            <span className="text-gray-300">|</span>
            <a href={tncLink} className="text-blue-600 hover:underline">T&C</a>
          </>
        )}
        {registerComplaintLink && (
          <>
            <span className="text-gray-300">|</span>
            <a href={registerComplaintLink} className="text-blue-600 hover:underline">Grievance Redressal</a>
          </>
        )}
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
      name: "Dreamplug Technologies Private Limited",
      shortName: "prefr",
      logo: "/prefr_logo.svg",
      type: "Personal Loan",
      contactPerson: "Mr. Mallikarjun Maduraj",
      email: "nodal.officer@prefr.com",
      grievanceRedressal: "Grievance Redressal",
      privacyLink: "#",
      tncLink: "#",
      bureauConsentLink: "#",
    },
    {
      name: "Moneyview Limited",
      shortName: "moneyview",
      logo: "/moneyview_logo.webp",
      type: "Personal Loan",
      contactPerson: "Mr. Rishov Bhattacharjee",
      email: "grievance@moneyview.in",
      phone: "080 6939 0476",
      grievanceRedressal: "Grievance Redressal",
      privacyLink: "#",
      tncLink: "#",
      bureauConsentLink: "#",
    },
  ];

  const lendingPartners = [
    {
      logo: "/kbnbfc_logo.svg",
      name: "KrazyBee Services Limited",
      loanType: "Personal Loan",
      grievanceRedressal: "Grievance Redressal",
      contactPerson: "Mr. Sauraw Kumar",
      email: "reachus@kbnbfc.in",
      phone: "8044292555 | 8068534555",
      privacyLink: "#",
      registerComplaintLink: null,
      tncLink: "#",
    },
    {
      logo: "/Bajaj_Finserv_Logo.png",
      name: "Bajaj Finserv Limited",
      loanType: "Personal Loan",
      grievanceRedressal: "Grievance Redressal",
      contactPerson: "Manish Bhargav",
      email: "grievanceredressalteam@bajajfinserv.in",
      phone: "02241803901",
      privacyLink: "#",
      registerComplaintLink: null,
      tncLink: "#",
    },
    {
      logo: "/Incred-finance-Logo.webp",
      name: "InCred Financial Services Limited",
      loanType: "Personal Loan",
      grievanceRedressal: "Grievance Redressal",
      contactPerson: "Mr. Vaidyanathan Ramamoorthy",
      email: "incred.grievance@incred.com",
      phone: "022-42117799",
      privacyLink: "#",
      registerComplaintLink: "#",
      tncLink: null,
    },
    {
      logo: "/poonawala_fincorp_logo.svg",
      name: "Poonawalla Fincorp Limited",
      loanType: "Personal Loan",
      grievanceRedressal: "Grievance Redressal",
      contactPerson: "Mr. Arnab Das",
      email: "grievance@poonawallafincorp.com",
      phone: "020-67808090",
      privacyLink: "#",
      registerComplaintLink: null,
      tncLink: null,
    },
    {
      logo: "/fibe-logo.svg",
      name: "EarlySalary Services Pvt. Ltd.",
      loanType: "Personal Loan",
      grievanceRedressal: "Grievance Redressal",
      contactPerson: "Mr. Amit Nosina",
      email: "grievance@earlysalary.com",
      phone: "020-67639797",
      privacyLink: "#",
      registerComplaintLink: null,
      tncLink: "#",
    },
    {
      logo: "/ABCL-LOGO.svg",
      name: "Aditya Birla Capital Ltd.",
      loanType: "Personal Loan",
      grievanceRedressal: "Grievance Redressal",
      contactPerson: "Mr. Arijit Sen",
      email: "grievance.finance@adityabirlacapital.com",
      phone: null,
      privacyLink: "#",
      registerComplaintLink: null,
      tncLink: "#",
    },
    {
      logo: "/l&t-LOGO.svg",
      name: "L&T Finance Limited",
      loanType: "Personal Loan",
      grievanceRedressal: "Grievance Redressal",
      contactPerson: "Mr. Vinod Varadhan",
      email: "gro@ltfs.com",
      phone: null,
      privacyLink: "#",
      registerComplaintLink: null,
      tncLink: "#",
    },
    {
      logo: "/Bhanix_Logo.svg",
      name: "Bhanix Finance and Investment Limited(CASHe)",
      loanType: "Personal Loan",
      grievanceRedressal: "Grievance Redressal",
      contactPerson: "Mrs. Pushpinder Kaur",
      email: "grievance@bhanix.in",
      phone: "+919983107444",
      privacyLink: "#",
      registerComplaintLink: "#",
      tncLink: null,
    },
    {
      logo: "/paywithring-LOGO.svg",
      name: "Si Creva Capital Service Private Limited",
      loanType: "Personal Loan",
      grievanceRedressal: "Grievance Redressal",
      contactPerson: "Mr. Mukul Dwivedi",
      email: "care@paywithring.com",
      phone: "08044745880 | 08062816300",
      privacyLink: "#",
      registerComplaintLink: null,
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
                className={`flex ${
                  isDragging ? "" : "transition-transform duration-500 ease-out"
                }`}
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  userSelect: isDragging ? "none" : "auto",
                  gap: itemsPerPage === 1 ? "0" : "1.5rem",
                }}
              >
                {lendingPartners.map((partner, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0"
                    style={{
                      width:
                        itemsPerPage === 1
                          ? "100%"
                          : itemsPerPage === 2
                          ? "calc(50% - 0.75rem)"
                          : "calc(33.333% - 1rem)",
                    }}
                  >
                    <PartnerCard {...partner} rating={4.5 - index * 0.1} />
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
                    ? "bg-blue-600 w-8"
                    : "bg-gray-300 w-2 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Stats - Clean */}
          <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
            <div className="text-center py-4 border-r border-gray-200 last:border-r-0">
              <div className="text-2xl font-bold text-gray-900">4+</div>
              <p className="text-xs text-gray-600 mt-1">Partners</p>
            </div>
            <div className="text-center py-4 border-r border-gray-200 last:border-r-0">
              <div className="text-2xl font-bold text-gray-900">₹40L</div>
              <p className="text-xs text-gray-600 mt-1">Max Amount</p>
            </div>
            <div className="text-center py-4">
              <div className="text-2xl font-bold text-gray-900">11%</div>
              <p className="text-xs text-gray-600 mt-1">From</p>
            </div>
          </div>
        </div>

        <div className="border-l-2 border-yellow-400 bg-yellow-50 p-4 rounded-r-lg mb-16">
          <p className="text-xs text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Disclaimer:</strong> Aadhar
            Finance (Aadhar) acts as a digital lending facilitator connecting
            borrowers with lending partners. Loan approvals, terms and
            eligibility are determined solely by the lending partners. Aadhar is
            not the lender.
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
            <p className="text-gray-600">Quick digital lending solutions</p>
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
                className={`flex ${
                  dlaIsDragging
                    ? ""
                    : "transition-transform duration-500 ease-out"
                }`}
                style={{
                  transform: `translateX(-${dlaCurrentIndex * 100}%)`,
                  userSelect: dlaIsDragging ? "none" : "auto",
                }}
              >
                {dlaPartners.map((partner, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 px-2"
                    style={{ width: "100%" }}
                  >
                    <div className="overflow-hidden">
                      {/* Logo and Name */}
                      <div className="text-center py-6 ">
                        <img
                          src={partner.logo}
                          alt={partner.shortName}
                          className="h-12 mx-auto mb-3 object-contain"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 items-center justify-center hidden">
                          <span className="text-xl font-bold text-blue-600">
                            {partner.shortName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-gray-900 px-4">
                          {partner.name}
                        </h3>
                        <p className="text-sm bg-blue-500 p-1 px-2 rounded-full font-semibold text-white inline-block mt-1">
                          {partner.type}
                        </p>
                      </div>

                      {/* Contact Info */}
                      <div className="p-6 text-center">
                        <p className="text-xs text-gray-600 mb-2">
                          {partner.grievanceRedressal}
                        </p>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {partner.contactPerson}
                        </p>
                        <a
                          href={`mailto:${partner.email}`}
                          className="text-sm text-blue-600 hover:underline break-all"
                        >
                          {partner.email}
                        </a>
                        {partner.phone && (
                          <p className="text-xs text-gray-600 mt-1">
                            {partner.phone}
                          </p>
                        )}
                      </div>

                      {/* Footer Links */}
                      <div className="px-6 py-4 flex justify-center gap-3 text-xs">
                        <a
                          href={partner.privacyLink}
                          className="text-blue-600 hover:underline"
                        >
                          Privacy Policy
                        </a>
                        <span className="text-gray-300">|</span>
                        <a
                          href={partner.tncLink}
                          className="text-blue-600 hover:underline"
                        >
                          T&C
                        </a>
                        <span className="text-gray-300">|</span>
                        <a
                          href={partner.bureauConsentLink}
                          className="text-blue-600 hover:underline"
                        >
                          Bureau Consent
                        </a>
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
                      ? "bg-blue-600 w-8"
                      : "bg-gray-300 w-2 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to DLA slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* DLA Grid - Tablet and Desktop */}
          <div className="hidden md:grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {dlaPartners.map((partner, index) => (
              <div key={index} className="overflow-hidden">
                {/* Logo and Name */}
                <div className="text-center py-6">
                  <img
                    src={partner.logo}
                    alt={partner.shortName}
                    className="h-12 mx-auto mb-3 object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 items-center justify-center hidden">
                    <span className="text-xl font-bold text-blue-600">
                      {partner.shortName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 px-4">
                    {partner.name}
                  </h3>
                  <p className="text-sm bg-blue-500 p-1 px-2 rounded-full font-semibold text-white inline-block mt-1">
                    {partner.type}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="p-6 text-center">
                  <p className="text-xs text-gray-600 mb-2">
                    {partner.grievanceRedressal}
                  </p>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {partner.contactPerson}
                  </p>
                  <a
                    href={`mailto:${partner.email}`}
                    className="text-sm text-blue-600 hover:underline break-all"
                  >
                    {partner.email}
                  </a>
                  {partner.phone && (
                    <p className="text-xs text-gray-600 mt-1">
                      {partner.phone}
                    </p>
                  )}
                </div>

                {/* Footer Links */}
                <div className="px-6 py-4 flex justify-center gap-3 text-xs">
                  <a
                    href={partner.privacyLink}
                    className="text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </a>
                  <span className="text-gray-300">|</span>
                  <a
                    href={partner.tncLink}
                    className="text-blue-600 hover:underline"
                  >
                    T&C
                  </a>
                  <span className="text-gray-300">|</span>
                  <a
                    href={partner.bureauConsentLink}
                    className="text-blue-600 hover:underline"
                  >
                    Bureau Consent
                  </a>
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

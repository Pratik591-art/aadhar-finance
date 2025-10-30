import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';

function TestimonialCard({ quote, authorName, avatarSrc, avatarInitials }) {
  // fallback initials from name if avatarInitials not provided
  const initials =
    avatarInitials ||
    (authorName
      ? authorName
          .split(" ")
          .map((n) => n[0])
          .filter(Boolean)
          .slice(0, 2)
          .join("")
          .toUpperCase()
      : "");

  return (
    <div className="max-w-2xl mx-auto my-6">
      <div className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        {/* decorative quote */}
        <svg
          className="absolute -top-4 left-4 w-8 h-8 text-purple-500"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M7.17 6A5.003 5.003 0 002 11v6a3 3 0 003 3h3a3 3 0 003-3v-6a5 5 0 00-4.83-5zM17.17 6A5.003 5.003 0 0012 11v6a3 3 0 003 3h3a3 3 0 003-3v-6a5 5 0 00-4.83-5z" />
        </svg>

        <p className="text-gray-700 leading-relaxed text-sm md:text-base pl-1">
          {quote}
        </p>

        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt={authorName ? `${authorName} avatar` : "avatar"}
                className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-200"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center font-semibold">
                {initials}
              </div>
            )}
          </div>

          <div className="ml-3">
            <div className="text-sm font-semibold text-gray-900">
              {authorName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const minSwipeDistance = 50;

  const testimonials = [
    {
      quote: "Aadhar Finance ne meri business loan ki application bahut jaldi approve kar di. Process bilkul simple tha aur koi hidden charges nahi the. Bahut badiya experience!",
      name: "Rohit Sharma",
      avatar: "RS"
    },
    {
      quote: "Personal loan lene ka process Aadhar Finance par bahut hi smooth tha. Sirf kuch documents upload kiye aur paise turant mil gaye. Shukriya Aadhar team!",
      name: "Priya Singh",
      avatar: "PS"
    },
    {
      quote: "I was worried about my credit score, but Aadhar Finance helped me get a loan easily. The support team was very helpful and explained everything clearly.",
      name: "Amit Verma",
      avatar: "AV"
    },
    {
      quote: "Bahut hi fast service! Loan approval aur disbursal dono ekdum time pe ho gaya. Main apne dosto ko bhi recommend karunga.",
      name: "Sunita Yadav",
      avatar: "SY"
    },
    {
      quote: "Aadhar Finance ki website par sab kuch online ho jata hai. Koi bhi dikkat ho toh customer care turant help karta hai. Best experience!",
      name: "Deepak Joshi",
      avatar: "DJ"
    },
    {
      quote: "I needed funds urgently for a medical emergency. Aadhar Finance processed my loan within hours. Thank you for the quick support!",
      name: "Meena Gupta",
      avatar: "MG"
    }
  ];


  // Auto-play functionality
  React.useEffect(() => {
    if (isHovered || isDragging) return; // Pause on hover or drag
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds
    return () => clearInterval(interval);
  }, [isHovered, isDragging, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Touch handlers
  const onTouchStart = (e) => {
    setTouchEnd(0);
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
      nextTestimonial();
    } else if (isRightSwipe) {
      prevTestimonial();
    }
  };

  // Mouse drag handlers
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
      nextTestimonial();
    } else if (isRightSwipe) {
      prevTestimonial();
    }
  };

  return (
    <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
          Customer Feedback
        </h2>

        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Sliding Cards Container */}
          <div
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={() => {
              if (isDragging) setIsDragging(false);
            }}
          >
            <div
              className={`flex ${
                isDragging ? "" : "transition-transform duration-500 ease-out"
              }`}
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                userSelect: isDragging ? "none" : "auto",
              }}
            >
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0"
                  style={{ width: "100%" }}
                >
                  <TestimonialCard
                    quote={testimonial.quote}
                    authorName={testimonial.name}
                    avatarSrc={testimonial.avatar}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-blue-600 w-8" : "bg-gray-300 w-2"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

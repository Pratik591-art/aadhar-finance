import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';

const TestimonialCard = ({ quote, name, avatar }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
      <FaQuoteLeft className="text-purple-600 text-3xl mb-4" />
      <p className="text-gray-700 text-lg mb-6 leading-relaxed">
        {quote}
      </p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          {avatar}
        </div>
        <div className="font-semibold text-gray-800">{name}</div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const testimonials = [
    {
      quote: "I needed the RD Loan Moneycontrol to clear. Now I was faced with an option you to loan with Moneycontrol. They loaned me the way to clear the deal. I think a instant settle Moneycontrol. They helped me to clear my deal as a total to move.",
      name: "Suresh V Raghunathan",
      avatar: "SR"
    },
    {
      quote: "I received super loans with Moneycontrol in easy really good. I applied for an online personal loan and the service was very quick. The entire process was fast and smooth and the loan was sanctioned without any hassle.",
      name: "Parveen Modharje",
      avatar: "PM"
    },
    {
      quote: "Amazing service! Got my loan approved within 24 hours. The process was completely digital and hassle-free. Highly recommend Moneycontrol for personal loans.",
      name: "Rajesh Kumar",
      avatar: "RK"
    }
  ];

  // Auto-play functionality
  React.useEffect(() => {
    if (isHovered) return; // Pause on hover

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [isHovered, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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
          {/* Testimonial Card with Fade Animation */}
          <div className="transition-opacity duration-500">
            <TestimonialCard {...testimonials[currentIndex]} />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all hover:bg-purple-50 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="text-purple-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all hover:bg-purple-50 hover:scale-110"
              aria-label="Next testimonial"
            >
              <FaChevronRight className="text-purple-600" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-purple-600 w-8' : 'bg-gray-300 w-2'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          {!isHovered && (
            <div className="absolute top-4 right-4 bg-purple-600/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm animate-pulse">
              Auto-playing
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

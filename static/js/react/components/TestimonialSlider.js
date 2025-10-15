import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TestimonialSlider = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    // Fetch testimonials from Django backend
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (isAutoPlaying && testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [testimonials.length, isAutoPlaying]);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/testimonials/");
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      // Fallback data
      setTestimonials([
        {
          id: 1,
          client_name: "Sarah & Michael",
          testimonial:
            "Diamond Band made our wedding day absolutely magical! Their music was perfect and they were so professional.",
          rating: 5,
          event_type: "Wedding",
        },
        {
          id: 2,
          client_name: "Corporate Events Inc.",
          testimonial:
            "Outstanding performance at our annual gala. The band created the perfect atmosphere for our guests.",
          rating: 5,
          event_type: "Corporate Event",
        },
      ]);
    }
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.i
        key={i}
        className={i < rating ? "fas fa-star" : "far fa-star"}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1 }}
      />
    ));
  };

  if (testimonials.length === 0) {
    return (
      <div className="testimonial-slider-component text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div
      className="testimonial-slider-component position-relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="testimonial-slide text-center p-4"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <div className="testimonial-stars mb-3 text-warning">
            {renderStars(currentTestimonial.rating)}
          </div>

          <blockquote className="blockquote mb-4">
            <p className="mb-0 fs-5 fst-italic">
              "{currentTestimonial.testimonial}"
            </p>
          </blockquote>

          <div className="testimonial-author">
            <strong className="d-block mb-1">
              {currentTestimonial.client_name}
            </strong>
            {currentTestimonial.event_type && (
              <small className="text-gold">
                {currentTestimonial.event_type}
              </small>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      {testimonials.length > 1 && (
        <>
          <motion.button
            className="btn btn-outline-primary position-absolute start-0 top-50 translate-middle-y"
            onClick={prevTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ zIndex: 10 }}
          >
            <i className="fas fa-chevron-left"></i>
          </motion.button>

          <motion.button
            className="btn btn-outline-primary position-absolute end-0 top-50 translate-middle-y"
            onClick={nextTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ zIndex: 10 }}
          >
            <i className="fas fa-chevron-right"></i>
          </motion.button>
        </>
      )}

      {/* Indicators */}
      {testimonials.length > 1 && (
        <div className="testimonial-indicators d-flex justify-content-center mt-3">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`btn btn-sm rounded-circle mx-1 ${
                index === currentIndex ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              style={{ width: "12px", height: "12px", padding: 0 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialSlider;

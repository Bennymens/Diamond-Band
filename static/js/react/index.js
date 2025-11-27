import React from "react";
import ReactDOM from "react-dom/client";

// Import React components for the Diamond Band website
import GalleryFilter from "./components/GalleryFilter";
import BookingForm from "./components/BookingForm";
import ContactForm from "./components/ContactForm";
import TestimonialSlider from "./components/TestimonialSlider";
import AnimatedButton from "./components/AnimatedButton";
import CircularGallery from "./components/CircularGallery";
import Gallery from "./components/Gallery";

// Initialize React components when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Gallery Filter Component
  const galleryFilterContainer = document.getElementById("gallery-filter");
  if (galleryFilterContainer) {
    const root = ReactDOM.createRoot(galleryFilterContainer);
    root.render(<GalleryFilter />);
  }

  // Booking Form Component
  const bookingFormContainer = document.getElementById("booking-form-react");
  if (bookingFormContainer) {
    const root = ReactDOM.createRoot(bookingFormContainer);
    root.render(<BookingForm />);
  }

  // Contact Form Component
  const contactFormContainer = document.getElementById("contact-form-react");
  if (contactFormContainer) {
    const root = ReactDOM.createRoot(contactFormContainer);
    root.render(<ContactForm />);
  }

  // Testimonial Slider Component
  const testimonialSliderContainer =
    document.getElementById("testimonial-slider");
  if (testimonialSliderContainer) {
    const root = ReactDOM.createRoot(testimonialSliderContainer);
    root.render(<TestimonialSlider />);
  }

  // Animated Button Components
  const animatedButtons = document.querySelectorAll(".animated-button");
  animatedButtons.forEach((container) => {
    const buttonText = container.getAttribute("data-text") || "Click Me";
    const buttonVariant = container.getAttribute("data-variant") || "primary";
    const root = ReactDOM.createRoot(container);
    root.render(
      <AnimatedButton variant={buttonVariant}>{buttonText}</AnimatedButton>
    );
  });

  // Circular Gallery Component
  const circularGalleryContainer = document.getElementById(
    "circular-gallery-container"
  );
  if (circularGalleryContainer) {
    console.log("Found circular gallery container:", circularGalleryContainer);
    const root = ReactDOM.createRoot(circularGalleryContainer);
    root.render(
      <CircularGallery
        bend={3}
        textColor="#ffffff"
        borderRadius={0.05}
        scrollEase={0.02}
      />
    );
    console.log("CircularGallery rendered");
  } else {
    console.error("Could not find circular-gallery-container element");
  }

  // Gallery Component
  const galleryContainer = document.getElementById("gallery-container");
  if (galleryContainer) {
    const root = ReactDOM.createRoot(galleryContainer);
    root.render(<Gallery />);
  }
});

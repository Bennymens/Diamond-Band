import React, { useState } from "react";
import { motion } from "framer-motion";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    event_type: "",
    event_date: "",
    venue: "",
    guest_count: "",
    budget_range: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/booking/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]")
            .value,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          event_type: "",
          event_date: "",
          venue: "",
          guest_count: "",
          budget_range: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="booking-form-component"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="event_type" className="form-label">
            Event Type
          </label>
          <select
            className="form-select"
            id="event_type"
            name="event_type"
            value={formData.event_type}
            onChange={handleChange}
            required
          >
            <option value="">Select Event Type</option>
            <option value="wedding">Wedding</option>
            <option value="corporate">Corporate Event</option>
            <option value="church">Church Service</option>
            <option value="birthday">Birthday Party</option>
            <option value="anniversary">Anniversary</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="event_date" className="form-label">
            Event Date
          </label>
          <input
            type="date"
            className="form-control"
            id="event_date"
            name="event_date"
            value={formData.event_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="guest_count" className="form-label">
            Expected Guests
          </label>
          <select
            className="form-select"
            id="guest_count"
            name="guest_count"
            value={formData.guest_count}
            onChange={handleChange}
          >
            <option value="">Select Guest Count</option>
            <option value="1-50">1-50 guests</option>
            <option value="51-100">51-100 guests</option>
            <option value="101-200">101-200 guests</option>
            <option value="201-500">201-500 guests</option>
            <option value="500+">500+ guests</option>
          </select>
        </div>

        <div className="col-12">
          <label htmlFor="venue" className="form-label">
            Venue/Location
          </label>
          <input
            type="text"
            className="form-control"
            id="venue"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            placeholder="Enter venue name or address"
          />
        </div>

        <div className="col-12">
          <label htmlFor="message" className="form-label">
            Additional Details
          </label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us more about your event, special requests, or questions..."
          ></textarea>
        </div>

        <div className="col-12">
          <motion.button
            type="submit"
            className="btn btn-primary btn-lg w-100"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Submitting...
              </>
            ) : (
              "Send Booking Request"
            )}
          </motion.button>
        </div>
      </form>

      {submitStatus === "success" && (
        <motion.div
          className="alert alert-success mt-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Thank you! Your booking request has been sent successfully. We'll get
          back to you soon!
        </motion.div>
      )}

      {submitStatus === "error" && (
        <motion.div
          className="alert alert-danger mt-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Sorry, there was an error sending your request. Please try again or
          contact us directly.
        </motion.div>
      )}
    </motion.div>
  );
};

export default BookingForm;

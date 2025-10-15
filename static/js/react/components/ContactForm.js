import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
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
      const response = await fetch("/contact/", {
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
        setFormData({ name: "", email: "", subject: "", message: "" });
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
      className="contact-form-component"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="contact-name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="contact-email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <label htmlFor="contact-subject" className="form-label">
            Subject
          </label>
          <input
            type="text"
            className="form-control"
            id="contact-subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <label htmlFor="contact-message" className="form-label">
            Message
          </label>
          <textarea
            className="form-control"
            id="contact-message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="How can we help you?"
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
                Sending...
              </>
            ) : (
              "Send Message"
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
          Thank you! Your message has been sent successfully. We'll get back to
          you soon!
        </motion.div>
      )}

      {submitStatus === "error" && (
        <motion.div
          className="alert alert-danger mt-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Sorry, there was an error sending your message. Please try again or
          contact us directly.
        </motion.div>
      )}
    </motion.div>
  );
};

export default ContactForm;

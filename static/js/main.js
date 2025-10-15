// Diamond Band Website - Main JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });

  // Navbar scroll effect
  function handleNavbarScroll() {
    const navbar = document.getElementById("mainNav");
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // Back to top button
  function handleBackToTop() {
    const backToTopBtn = document.getElementById("btn-back-to-top");
    if (window.scrollY > 300) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  }

  // Smooth scroll to top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Event listeners
  window.addEventListener("scroll", function () {
    handleNavbarScroll();
    handleBackToTop();
  });

  // Back to top button click
  const backToTopBtn = document.getElementById("btn-back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", scrollToTop);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Stats counter animation
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.ceil(start);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }

    updateCounter();
  }

  // Trigger counter animation when stats section is visible
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll("[data-count]");
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-count"));
          animateCounter(counter, target);
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe stats section
  const statsSection = document.querySelector(".stats-counter");
  if (statsSection) {
    observer.observe(statsSection);
  }

  // Gallery filtering
  const galleryFilters = document.querySelectorAll(".gallery-filter");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (galleryFilters.length > 0) {
    galleryFilters.forEach((filter) => {
      filter.addEventListener("click", function (e) {
        e.preventDefault();

        // Remove active class from all filters
        galleryFilters.forEach((f) => f.classList.remove("active"));

        // Add active class to clicked filter
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");

        // Show/hide gallery items
        galleryItems.forEach((item) => {
          if (filterValue === "all" || item.classList.contains(filterValue)) {
            item.style.display = "block";
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            }, 100);
          } else {
            item.style.opacity = "0";
            item.style.transform = "scale(0.8)";
            setTimeout(() => {
              item.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }

  // Newsletter subscription
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Subscribing...";
      submitBtn.disabled = true;

      fetch(this.action, {
        method: "POST",
        body: formData,
        headers: {
          "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]")
            .value,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            showNotification(data.message, "success");
            this.reset();
          } else {
            showNotification(data.message, "error");
          }
        })
        .catch((error) => {
          showNotification("An error occurred. Please try again.", "error");
        })
        .finally(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  // Show notification
  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `alert alert-${
      type === "error" ? "danger" : type
    } alert-dismissible fade show position-fixed`;
    notification.style.cssText =
      "top: 100px; right: 20px; z-index: 9999; min-width: 300px;";

    notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  // Form validation enhancement
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input, textarea, select");

    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this);
      });

      input.addEventListener("input", function () {
        if (this.classList.contains("is-invalid")) {
          validateField(this);
        }
      });
    });

    form.addEventListener("submit", function (e) {
      let isValid = true;

      inputs.forEach((input) => {
        if (!validateField(input)) {
          isValid = false;
        }
      });

      if (!isValid) {
        e.preventDefault();
        showNotification("Please correct the errors in the form.", "error");
      }
    });
  });

  function validateField(field) {
    let isValid = true;
    const value = field.value.trim();

    // Remove existing feedback
    const existingFeedback =
      field.parentNode.querySelector(".invalid-feedback");
    if (existingFeedback) {
      existingFeedback.remove();
    }

    field.classList.remove("is-invalid", "is-valid");

    // Required field validation
    if (field.hasAttribute("required") && !value) {
      showFieldError(field, "This field is required.");
      return false;
    }

    // Email validation
    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showFieldError(field, "Please enter a valid email address.");
        return false;
      }
    }

    // Phone validation
    if (field.type === "tel" && value) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(value.replace(/\s/g, ""))) {
        showFieldError(field, "Please enter a valid phone number.");
        return false;
      }
    }

    // Date validation (not in the past for event dates)
    if (field.type === "date" && value && field.name.includes("event_date")) {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        showFieldError(field, "Event date cannot be in the past.");
        return false;
      }
    }

    if (value || field.hasAttribute("required")) {
      field.classList.add("is-valid");
    }

    return isValid;
  }

  function showFieldError(field, message) {
    field.classList.add("is-invalid");

    const feedback = document.createElement("div");
    feedback.className = "invalid-feedback";
    feedback.textContent = message;

    field.parentNode.appendChild(feedback);
  }

  // Image lazy loading
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Audio player controls
  const audioPlayers = document.querySelectorAll(".audio-player");
  audioPlayers.forEach((player) => {
    const audio = player.querySelector("audio");
    const playBtn = player.querySelector(".play-btn");
    const progressBar = player.querySelector(".progress-bar");
    const timeDisplay = player.querySelector(".time-display");

    if (playBtn && audio) {
      playBtn.addEventListener("click", function () {
        if (audio.paused) {
          audio.play();
          this.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
          audio.pause();
          this.innerHTML = '<i class="fas fa-play"></i>';
        }
      });
    }

    if (audio && progressBar) {
      audio.addEventListener("timeupdate", function () {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progress + "%";

        if (timeDisplay) {
          const current = formatTime(audio.currentTime);
          const duration = formatTime(audio.duration);
          timeDisplay.textContent = `${current} / ${duration}`;
        }
      });
    }
  });

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  // Video modal
  const videoTriggers = document.querySelectorAll(
    '[data-bs-toggle="modal"][data-video]'
  );
  videoTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const videoUrl = this.getAttribute("data-video");
      const modal = document.querySelector(this.getAttribute("data-bs-target"));
      const videoContainer = modal.querySelector(".modal-body");

      videoContainer.innerHTML = `
                <div class="ratio ratio-16x9">
                    <iframe src="${videoUrl}" allowfullscreen></iframe>
                </div>
            `;
    });
  });

  // Clear video when modal closes
  const videoModals = document.querySelectorAll(".modal");
  videoModals.forEach((modal) => {
    modal.addEventListener("hidden.bs.modal", function () {
      const videoContainer = this.querySelector(".modal-body");
      if (videoContainer) {
        videoContainer.innerHTML = "";
      }
    });
  });

  console.log("Diamond Band Website initialized successfully!");
});

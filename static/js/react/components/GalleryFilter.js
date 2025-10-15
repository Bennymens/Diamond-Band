import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GalleryFilter = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [galleryItems, setGalleryItems] = useState([]);

  const filters = [
    { key: "all", label: "All" },
    { key: "wedding", label: "Weddings" },
    { key: "corporate", label: "Corporate" },
    { key: "church", label: "Church Events" },
    { key: "concert", label: "Concerts" },
  ];

  useEffect(() => {
    // Fetch gallery items from Django backend
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch("/api/gallery/");
      const data = await response.json();
      setGalleryItems(data);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
    }
  };

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.event_type === activeFilter);

  return (
    <div className="gallery-filter-component">
      {/* Filter Buttons */}
      <div className="filter-buttons mb-4">
        <div className="btn-group" role="group">
          {filters.map((filter) => (
            <motion.button
              key={filter.key}
              type="button"
              className={`btn ${
                activeFilter === filter.key
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setActiveFilter(filter.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <motion.div className="row" layout>
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              className="col-lg-4 col-md-6 mb-4"
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="gallery-item">
                <img
                  src={item.image || item.thumbnail}
                  alt={item.title}
                  className="img-fluid"
                />
                <div className="gallery-overlay">
                  <div>
                    <h5 className="text-white">{item.title}</h5>
                    <p className="text-gold">{item.event_type}</p>
                    <p className="text-light">{item.event_date}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredItems.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No items found for this filter.</p>
        </div>
      )}
    </div>
  );
};

export default GalleryFilter;

import React, { useState, useEffect } from "react";
import Masonry from "./Masonry";

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/gallery/filter/")
      .then((response) => response.json())
      .then((data) => {
        const formattedItems = data.items.map((item) => ({
          id: item.id.toString(),
          img: item.image_url,
          url: "#",
          height: Math.floor(Math.random() * 300) + 300, // Random height between 300-600
          description: item.description || item.title,
        }));
        setItems(formattedItems);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching gallery items:", error);
        setLoading(false);
      });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
          break;
        case "ArrowRight":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
          break;
        case "Escape":
          e.preventDefault();
          setSelectedIndex(null);
          break;
      }
    };

    if (selectedIndex !== null) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, items.length]);

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const goToNext = () => {
    setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1 style={{ color: "#d4af37" }}>Loading Gallery...</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{ textAlign: "center", marginBottom: "40px", color: "#d4af37" }}
      >
        Diamond Band Gallery
      </h1>
      <Masonry
        items={items}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover={true}
        hoverScale={0.95}
        blurToFocus={true}
        colorShiftOnHover={false}
        onImageClick={(image) => {
          const index = items.findIndex((item) => item.id === image.id);
          setSelectedIndex(index);
        }}
      />

      {/* Image Modal */}
      {selectedIndex !== null && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setSelectedIndex(null)}
        >
          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            style={{
              position: "absolute",
              left: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0, 0, 0, 0.7)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              fontSize: "24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1001,
            }}
          >
            ‹
          </button>

          <img
            src={items[selectedIndex].img}
            alt={items[selectedIndex].description}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
              borderRadius: "10px",
              boxShadow: "0 10px 50px rgba(0, 0, 0, 0.5)",
            }}
          />

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            style={{
              position: "absolute",
              right: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0, 0, 0, 0.7)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              fontSize: "24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1001,
            }}
          >
            ›
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(null);
            }}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(0, 0, 0, 0.7)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1001,
            }}
          >
            ×
          </button>

          {/* Image Counter */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              background: "rgba(0, 0, 0, 0.7)",
              padding: "5px 15px",
              borderRadius: "20px",
              fontSize: "14px",
              zIndex: 1001,
            }}
          >
            {selectedIndex + 1} / {items.length}
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              textAlign: "center",
              background: "rgba(0, 0, 0, 0.7)",
              padding: "10px 20px",
              borderRadius: "10px",
              maxWidth: "80%",
              zIndex: 1001,
            }}
          >
            {items[selectedIndex].description}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

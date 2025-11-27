import React, { useState } from "react";
import Masonry from "./Masonry";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const items = [
    {
      id: "1",
      img: "/static/images/WhatsApp%20Image%202025-10-14%20at%2021.24.57_3a657a25.jpg",
      url: "#",
      height: 400,
      description: "Diamond Band performing live at a corporate event",
    },
    {
      id: "2",
      img: "/static/images/WhatsApp%20Image%202025-11-27%20at%2013.55.01_504db127.jpg",
      url: "#",
      height: 350,
      description: "Live performance showcase",
    },
    {
      id: "3",
      img: "/static/images/WhatsApp%20Image%202025-11-27%20at%2013.55.01_47426ab4.jpg",
      url: "#",
      height: 450,
      description: "Band members in action",
    },
    {
      id: "4",
      img: "/static/images/WhatsApp%20Image%202025-11-27%20at%2013.55.02_2dba3492.jpg",
      url: "#",
      height: 300,
      description: "Musical performance highlight",
    },
    {
      id: "5",
      img: "/static/images/WhatsApp%20Image%202025-11-27%20at%2013.55.02_369f389e.jpg",
      url: "#",
      height: 500,
      description: "Diamond Band live concert",
    },
    {
      id: "6",
      img: "/static/images/WhatsApp%20Image%202025-11-27%20at%2013.55.02_946de9dd.jpg",
      url: "#",
      height: 380,
      description: "Jazz and Afro-pop fusion",
    },
    {
      id: "7",
      img: "/static/images/WhatsApp%20Image%202025-11-27%20at%2013.55.03_abdafe07.jpg",
      url: "#",
      height: 420,
      description: "Professional band performance",
    },
    {
      id: "8",
      img: "/static/images/WhatsApp%20Image%202025-11-27%20at%2013.55.03_f50ad34f.jpg",
      url: "#",
      height: 320,
      description: "Live music entertainment",
    },
    {
      id: "9",
      img: "/static/images/WhatsApp%20Image%202025-11-27%20at%2013.55.04_617031bb.jpg",
      url: "#",
      height: 480,
      description: "Diamond Band showcase",
    },
    {
      id: "10",
      img: "/static/images/WhatsApp%20Image%202025-11-27%20at%2013.55.04_f3e06a0e.jpg",
      url: "#",
      height: 360,
      description: "Musical excellence in action",
    },
    {
      id: "11",
      img: "/static/images/WhatsApp%20Image%202025-11-27%20at%2013.55.05_6b2b6923.jpg",
      url: "#",
      height: 440,
      description: "Versatile band performance",
    },
    {
      id: "12",
      img: "/static/images/WhatsApp%20Image%202025-11-27%20at%2013.55.05_73f97c91.jpg",
      url: "#",
      height: 340,
      description: "Live event entertainment",
    },
    {
      id: "13",
      img: "/static/images/WhatsApp%20Image%202025-11-27%20at%2013.55.05_fb6ea21c.jpg",
      url: "#",
      height: 390,
      description: "Diamond Band live music",
    },
  ];

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
        onImageClick={setSelectedImage}
      />

      {/* Image Modal */}
      {selectedImage && (
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
            cursor: "pointer",
          }}
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage.img}
            alt={selectedImage.description}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
              borderRadius: "10px",
              boxShadow: "0 10px 50px rgba(0, 0, 0, 0.5)",
            }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
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
            }}
          >
            ×
          </button>
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
            }}
          >
            {selectedImage.description}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

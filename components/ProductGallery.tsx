"use client";

import { useState, useRef, useEffect } from "react";

export default function ProductGallery({ images, title, fallbackImage }: { images: string[], title: string, fallbackImage: string }) {
  const allImages = images && images.length > 0 ? images : [fallbackImage];
  const [mainIndex, setMainIndex] = useState(0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  
  const mainImage = allImages[mainIndex] || allImages[0];

  useEffect(() => {
    if (thumbnailsRef.current) {
      const container = thumbnailsRef.current;
      const activeThumbnail = container.children[mainIndex] as HTMLElement;
      if (activeThumbnail) {
        const scrollLeft = activeThumbnail.offsetLeft - (container.clientWidth / 2) + (activeThumbnail.clientWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }, [mainIndex]);

  const handleNext = () => {
    setMainIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrev = () => {
    setMainIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="prod-gallery">
      <div className="prod-gallery__main" style={{ position: "relative" }}>
        <img src={mainImage} alt={title} />
        {allImages.length > 1 && (
          <>
            <button 
              onClick={handlePrev}
              style={{
                position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)",
                background: "rgba(0, 0, 0, 0.5)", color: "white", border: "none", borderRadius: "50%",
                width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", zIndex: 10
              }}
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button 
              onClick={handleNext}
              style={{
                position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)",
                background: "rgba(0, 0, 0, 0.5)", color: "white", border: "none", borderRadius: "50%",
                width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", zIndex: 10
              }}
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </>
        )}
      </div>
      
      {allImages.length > 1 && (
        <div className="prod-gallery__details" ref={thumbnailsRef}>
          {allImages.map((img, idx) => (
            <div 
              key={idx} 
              className={`prod-gallery__detail-cell ${idx === mainIndex ? 'active' : ''}`}
              onClick={() => setMainIndex(idx)}
              style={{ 
                cursor: "pointer", 
                opacity: idx === mainIndex ? 0.5 : 1,
                transition: "opacity 0.2s ease"
              }}
            >
              <img src={img} alt={`${title} Thumbnail ${idx + 1}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Simple Carousel (no external libraries, no context system)

import { useState } from "react";


// Main Carousel wrapper
export function Carousel({ items }) {

  const [currentIndex, setCurrentIndex] = useState(0);

  const total = items.length;


  function goNext() {
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }


  function goPrev() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }


  return (
    <div className="carousel">

      {/* Current slide */}
      <div className="carousel-window">
        {items[currentIndex]}
      </div>


      {/* Controls */}
      <div className="carousel-controls">

        <button onClick={goPrev} disabled={currentIndex === 0}>
          ← Prev
        </button>

        <button onClick={goNext} disabled={currentIndex === total - 1}>
          Next →
        </button>

      </div>

    </div>
  );
}

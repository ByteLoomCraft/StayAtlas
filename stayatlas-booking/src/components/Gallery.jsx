import { useState } from "react";
import { FaImage, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";

export default function Gallery({ photos = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index = 0) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  const showPrev = () =>
    setCurrentIndex((idx) => (idx > 0 ? idx - 1 : photos.length - 1));
  const showNext = () =>
    setCurrentIndex((idx) => (idx + 1) % photos.length);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => showNext(),
    onSwipedRight: () => showPrev(),
    trackMouse: true,
  });

  // No images placeholder
  if (photos.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <span className="text-gray-500">No Images available</span>
      </div>
    );
  }

  // Limit preview to max 3
  const previewCount = Math.min(photos.length, 3);
  const previewPhotos = photos.slice(0, previewCount);

  // Responsive container classes per count
  let containerClasses = "";
  if (previewCount === 1) {
    // Single image full width
    containerClasses = "w-full max-w-3xl mx-auto";
  } else if (previewCount === 2) {
    // Stack on mobile, side-by-side on md
    containerClasses = "flex flex-col md:flex-row gap-2.5 w-full max-w-4xl mx-auto";
  } else if (previewCount === 3) {
    // One large vertical and two stacked
    containerClasses = "grid grid-cols-1 gap-2.5 w-full max-w-5xl mx-auto md:grid-cols-[2fr_1fr] md:grid-rows-2 md:max-h-[600px]";
  }

  return (
    <div className="flex justify-center bg-white py-5 px-4">
      <div className={containerClasses}>
        {previewPhotos.map((photo, idx) => {
          // For 3 images, span first image across two rows
          const spanClass = previewCount === 3 && idx === 0 ? 'md:row-span-2' : '';
          return (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-lg cursor-pointer ${spanClass}`}
              onClick={() => openModal(idx)}
            >
              <img
                src={photo}
                alt={`Image ${idx + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />

              {/* "View Photos" button on first image when more than 3 photos exist */}
              {idx === 0 && photos.length > 3 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(0);
                  }}
                  className="absolute left-5 bottom-5 bg-white text-gray-700 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-100 transition-all duration-200"
                >
                  <FaImage /> View Photos
                </button>
              )}
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col"
          {...swipeHandlers}
        >
          <header className="flex items-center justify-between p-4">
            <button onClick={closeModal} className="cursor-pointer text-white text-2xl">
              <FaTimes />
            </button>
            <span className="text-white">
              {currentIndex + 1} / {photos.length}
            </span>
          </header>

          <div className="flex-1 flex items-center justify-center relative px-2">
            <button
              onClick={showPrev}
              className="absolute cursor-pointer text-white sm:text-3xl text-2xl sm:left-5 left-4 top-1/2 -translate-y-1/2"
            >
              <FaChevronLeft />
            </button>

            <img
              src={photos[currentIndex]}
              alt={photos[currentIndex]}
              className="max-w-[90%] max-h-[70vh] object-contain"
            />

            <button
              onClick={showNext}
              className="absolute cursor-pointer text-white sm:text-3xl text-2xl sm:right-5 right-4 top-1/2 -translate-y-1/2"
            >
              <FaChevronRight />
            </button>
          </div>

          <footer className="p-4 text-center text-white bg-black bg-opacity-50">
            {photos[currentIndex].caption}
          </footer>
        </div>
      )}
    </div>
  );
}

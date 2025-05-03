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

  // Render placeholders for no images
  if (photos.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <span className="text-gray-500">No Images by Villa Owner</span>
      </div>
    );
  }

  // Decide how many to show in preview (max 3)
  const previewCount = Math.min(photos.length, 3);
  const previewPhotos = photos.slice(0, previewCount);

  return (
    <div className="flex justify-center bg-white py-5 px-4 mx-auto max-w-[2560px]">
      <div className="grid gap-2.5 md:aspect-[16/9] md:max-h-[600px]"
          style={{ gridTemplateColumns: getGridCols(previewCount) }}>
        {previewPhotos.map((photo, idx) => (
          <div
            key={idx}
            className={getItemClasses(previewCount, idx)}
            onClick={() => openModal(idx)}
          >
            <img
              src={photo}
              alt={`Image ${idx + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
            />
            {idx === 0 && photos.length > 3 && (
              <button
                onClick={(e) => { e.stopPropagation(); openModal(0); }}
                className="absolute left-5 bottom-5 bg-white text-gray-700 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-100 transition-all duration-200"
              >
                <FaImage />
                View Photos
              </button>
            )}
          </div>
        ))}
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

// Helper to compute grid columns
function getGridCols(count) {
  if (count === 1) return "1fr";
  if (count === 2) return "1fr 1fr";
  if (count === 3) return "3fr 1fr 1fr";
  return "1fr 1fr 1fr";
}

// Helper to assign item classes
function getItemClasses(count, idx) {
  // All items simply overflow-hidden clickable
  return "relative overflow-hidden cursor-pointer";
}

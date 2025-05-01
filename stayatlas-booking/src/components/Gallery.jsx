import { useState } from "react";
import { FaImage, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";
import front1 from "../assets/frontv.jpg";
import bedroom from "../assets/bdroom.jpg";
import bedroom2 from "../assets/bdroom2.jpg";
import slide1 from "../assets/slide1.jpg"

const photos = [
  { src: front1, alt: "Villa Main View", caption: "Villa Main View" },
  { src: bedroom, alt: "Bedroom", caption: "Bedroom" },
  { src: bedroom2, alt: "Pool View", caption: "Pool View" },
  { src: slide1, alt: "xyz", caption: "xyz"}
];

export default function Gallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const showPrev = () =>
    setCurrentIndex((idx) => (idx > 0 ? idx - 1 : photos.length - 1));

  const showNext = () =>
    setCurrentIndex((idx) => (idx + 1) % photos.length);

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => showNext(),
    onSwipedRight: () => showPrev(),
    trackMouse: true
  });

  return (
    <div className="flex justify-center bg-white py-5 px-4 mx-auto max-w-[2560px]">
      {/* Gallery Grid */}
      <div className="grid gap-2.5 md:grid-cols-[2fr_1fr] md:grid-rows-auto aspect-auto md:aspect-[16/9] md:max-h-[600px]">
        {/* Main Image */}
        <div className="relative overflow-hidden rounded-lg cursor-pointer" onClick={() => openModal(0)}>
          <img
            src={front1}
            alt="Villa Main View"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={(e) => { e.stopPropagation(); openModal(0); }}
            className="absolute left-5 bottom-5 bg-white text-gray-700 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-100 transition-all duration-200 hover:-translate-y-[2px]"
          >
            <FaImage />
            View Photos
          </button>
        </div>

        {/* Sub Gallery */}
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-1">
          <div
            className="relative overflow-hidden rounded-lg cursor-pointer"
            onClick={() => openModal(1)}
          >
            <img
              src={bedroom}
              alt="Bedroom"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div
            className="relative overflow-hidden rounded-lg cursor-pointer"
            onClick={() => openModal(2)}
          >
            <img
              src={bedroom2}
              alt="Pool View"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            {/* <div className="absolute right-5 bottom-5 bg-black/70 text-white px-3 py-2 rounded-md text-sm">
              +{photos.length - 3} More
            </div> */}
          </div>
        </div>
      </div>

      {/* Modal */}
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
              className="cursor-pointer absolute text-white sm:text-3xl text-2xl sm:left-5 left-4 sm:top-1/2 sm:-translate-y-1/2 bottom-10"
            >
              <FaChevronLeft />
            </button>

            <img
              src={photos[currentIndex].src}
              alt={photos[currentIndex].alt}
              className="max-w-[90%] max-h-[70vh] object-contain"
            />

            <button
              onClick={showNext}
              className="cursor-pointer absolute text-white sm:text-3xl text-2xl sm:right-5 right-4 sm:top-1/2 sm:-translate-y-1/2 bottom-10"
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

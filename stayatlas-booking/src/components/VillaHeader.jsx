import React, { useState } from 'react';
import ShareModel from './ShareModel';
import frontVilla from '../assets/frontv.jpg'; // Update path as needed

function VillaHeader({title}) {
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <div className="villa-header-wrapper w-full px-6 py-6 relative">
      <div className="villa-header flex justify-between items-center">
      <h1 className="text-gray-900 px-4 md:px-20 text-xl md:text-2xl font-bold font-montserrat">
      {title}
        </h1>
        <button
          onClick={() => setIsShareOpen(true)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-full flex items-center font-montserrat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
          Share
        </button>
      </div>

      {isShareOpen && (
        <ShareModel 
          isOpen={isShareOpen} 
          onClose={() => setIsShareOpen(false)} 
          villaImage={frontVilla}
        />
      )}
    </div>
  );
}

export default VillaHeader;
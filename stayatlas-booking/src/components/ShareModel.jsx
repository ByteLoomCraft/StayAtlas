import React from 'react';
import ShareOptions from './ShareOptions';

function ShareModal({ isOpen, onClose, villaImage }) {
  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
<div 
  className="fixed inset-0 z-40 flex items-center justify-center" 
  style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Share this place</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Villa Info */}
        <div className="p-4 bg-gray-50">
          <div className="flex gap-3">
            <img
              src={villaImage}
              alt="Villa Preview"
              className="w-16 h-16 rounded-md object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-800">
                Villa in Khanavale <span className="text-gray-600">• ★4.93</span>
              </h3>
              <p className="text-sm text-gray-500">
                3 bedrooms • 3 beds • 3 bathrooms
              </p>
            </div>
          </div>
        </div>
        
        {/* Share Options */}
        <ShareOptions onClose={onClose} />
      </div>
    </div>
  );
}

export default ShareModal;
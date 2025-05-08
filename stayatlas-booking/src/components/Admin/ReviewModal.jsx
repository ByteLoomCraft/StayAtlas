import React from "react";

export const ReviewModal = ({
  modalOpen,
  editedVilla,
  closeModal,
  handleInputChange,
  handleAddressChange,
  handleAmenityChange,
  handleAddAmenity,
  handleRemoveAmenity,
  handleCategoryChange,
  handleAddCategory,
  handleRemoveCategory,
  handleAvailabilityChange,
  handleAddAvailability,
  handleRemoveAvailability,
  handleImageChange,
  handleAddImage,
  handleRemoveImage,
  saveChanges,
}) => {
  if (!modalOpen || !editedVilla) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-full overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Review Villa Details</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Basic Owner & Villa Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Villa Owner', name: 'villaOwner', type: 'text' },
              { label: 'Villa Name', name: 'villaName', type: 'text' },
              { label: 'Property Type', name: 'propertyType', type: 'text' },
              { label: 'Number of Rooms', name: 'numberOfRooms', type: 'text' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Phone Number', name: 'phoneNumber', type: 'text' },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={editedVilla[name] || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            ))}
          </div>

          {/* Address Section */}
          <div>
            <h3 className="text-lg font-medium mb-3">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(editedVilla.address).map(([field, value]) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={`address.${field}`}
                    value={value}
                    onChange={handleAddressChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Amenities</h3>
              <button onClick={handleAddAmenity} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                Add Amenity
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              {editedVilla.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={amenity}
                    onChange={(e) => handleAmenityChange(idx, e.target.value)}
                    className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <button onClick={() => handleRemoveAmenity(idx)} className="text-red-500 hover:text-red-700">Remove</button>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Images (URLs)</h3>
              <button onClick={handleAddImage} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                Add Image
              </button>
            </div>
            <div className="space-y-2">
              {editedVilla.images.map((img, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => handleImageChange(idx, e.target.value)}
                    className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <button onClick={() => handleRemoveImage(idx)} className="text-red-500 hover:text-red-700">Remove</button>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Fields */}
          <div>
            <h3 className="text-lg font-medium mb-3">Admin Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Night</label>
                <input
                  type="number"
                  name="pricePerNight"
                  value={editedVilla.pricePerNight}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                <input
                  type="number"
                  name="discountPercent"
                  value={editedVilla.discountPercent || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                  min={0}
                  max={100}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Promotion Text</label>
                <textarea
                  name="promotionText"
                  value={editedVilla.promotionText || ''}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isExclusive"
                  checked={editedVilla.isExclusive}
                  onChange={handleInputChange}
                  className="h-4 w-4"
                />
                <label className="text-sm font-medium text-gray-700">Is Exclusive</label>
              </div>
              {/* <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <div className="space-y-2">
                  {editedVilla.category.map((cat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={cat}
                        onChange={(e) => handleCategoryChange(idx, e.target.value)}
                        className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                      <button onClick={() => handleRemoveCategory(idx)} className="text-red-500 hover:text-red-700">Remove</button>
                    </div>
                  ))}
                  <button onClick={handleAddCategory} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Add Category</button>
                </div>
              </div> */}
              {/* <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                <div className="space-y-4">
                  {editedVilla.availability.map((slot, idx) => (
                    <div key={idx} className="grid grid-cols-3 gap-2 items-end">
                      <div>
                        <label className="block text-xs text-gray-600">Start</label>
                        <input
                          type="date"
                          name={`availability.${idx}.start`}
                          value={slot.start}
                          onChange={(e) => handleAvailabilityChange(idx, 'start', e.target.value)}
                          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600">End</label>
                        <input
                          type="date"
                          name={`availability.${idx}.end`}
                          value={slot.end}
                          onChange={(e) => handleAvailabilityChange(idx, 'end', e.target.value)}
                          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name={`availability.${idx}.isAvailable`}
                          checked={slot.isAvailable}
                          onChange={(e) => handleAvailabilityChange(idx, 'isAvailable', e.target.checked)}
                        />
                        <label className="text-sm text-gray-700">Available</label>
                        <button onClick={() => handleRemoveAvailability(idx)} className="text-red-500 hover:text-red-700 text-xs">Remove</button>
                      </div>
                    </div>
                  ))}
                  <button onClick={handleAddAvailability} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Add Availability Slot</button>
                </div>
              </div> */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Approval Status</label>
                <select
                  name="approvalStatus"
                  value={editedVilla.approvalStatus}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Approval Comment</label>
                <textarea
                  name="approvalComment"
                  value={editedVilla.approvalComment || ''}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-6 border-t flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={saveChanges}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";

const PropertyRequestForm = ({ isFormOpen, setIsFormOpen }) => {
  const [formData, setFormData] = useState({});
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [customAmenity, setCustomAmenity] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setSelectedAmenities((prev) =>
        checked ? [...prev, value] : prev.filter((item) => item !== value)
      );
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCustomAmenity = () => {
    if (customAmenity.trim()) {
      setSelectedAmenities([...selectedAmenities, customAmenity.trim()]);
      setCustomAmenity("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...formData, amenities: selectedAmenities };
    console.log(finalData);
  };

  return (
    <>
      {/* Only render the form if isFormOpen is true */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full relative max-h-full overflow-y-auto">
            {/* Cross button to close the form */}
            <button
              onClick={() => setIsFormOpen(false)} // Close the form on cross button click
              className="absolute top-4 right-4 text-xl font-bold text-black"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-center text-black">Property Request Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <input
                  name="firstName"
                  onChange={handleChange}
                  placeholder="First Name *"
                  required
                  className="input text-black border p-2 rounded"
                />
                <input
                  name="lastName"
                  onChange={handleChange}
                  placeholder="Last Name *"
                  required
                  className="input text-black border p-2 rounded"
                />
                <input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  placeholder="Email ID *"
                  required
                  className="input text-black border p-2 rounded"
                />
                <input
                  name="mobile"
                  type="tel"
                  onChange={handleChange}
                  placeholder="Mobile Phone *"
                  required
                  className="input text-black border p-2 rounded"
                />
                <input
                  name="location"
                  onChange={handleChange}
                  placeholder="Property Location *"
                  required
                  className="input text-black border p-2 rounded"
                />
                <input
                  name="rooms"
                  type="number"
                  onChange={handleChange}
                  placeholder="Number of Rooms *"
                  required
                  className="input text-black border p-2 rounded"
                />
                <select
                  name="propertyType"
                  onChange={handleChange}
                  required
                  className="input text-black border p-2 rounded"
                >
                  <option value="">Select Property Type *</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-black">Select Amenities</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {[
                    "Air Conditioner",
                    "Private Parking",
                    "Barbeque (Chargeable)",
                    "Microwave",
                    "Sofa",
                    "Dining Table",
                    "Flat Screen Tv",
                    "Wardrobe",
                    "Refrigerator",
                    "WiFi",
                  ].map((item) => (
                    <label key={item} className="flex items-center text-black">
                      <input
                        type="checkbox"
                        value={item}
                        className="mr-2"
                        onChange={handleChange}
                      />
                      {item}
                    </label>
                  ))}
                  <label className="flex items-center col-span-2 text-black">
                    Other:
                    <input
                      type="text"
                      className="ml-2 input flex-grow text-black border p-2 rounded"
                      value={customAmenity}
                      onChange={(e) => setCustomAmenity(e.target.value)}
                    />
                    <button
                      type="button"
                      className="ml-2 px-3 py-1 bg-blue-600 text-white rounded"
                      onClick={handleCustomAmenity}
                    >
                      Add
                    </button>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-black">Photos (Upload)</label>
                <input
                  type="file"
                  name="photos"
                  accept="image/*"
                  multiple
                  className="input w-full text-black border p-2 rounded"
                />
              </div>
              <textarea
                name="description"
                rows="4"
                placeholder="Describe Your Property"
                onChange={handleChange}
                className="input w-full text-black border p-2 rounded"
              ></textarea>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyRequestForm;

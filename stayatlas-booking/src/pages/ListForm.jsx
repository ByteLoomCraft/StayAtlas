import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "../utils/axios";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Initial form state matches Zod schema expectations
const initialFormData = {
  villaOwner: "",
  villaName: "",
  email: "",
  phoneNumber: "",
  numberOfRooms: "",
  propertyType: "",
  address: {
    street: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    zipcode: ""
  },
  amenities: [],
  description: ""
};

export default function PropertyRequestPage() {
  const minPhotos = 3;
  const [formData, setFormData] = useState(initialFormData);
  const [selectedAmenities, setSelectedAmenities] = useState("");
  const [allAmenities, setAllAmenities] = useState([
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
  ]);
  const [customAmenity, setCustomAmenity] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const addressFields = ["street", "landmark", "city", "state", "country", "zipcode"];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // Amenities checkboxes
    if (type === "checkbox" && name === "amenities") {
      const amenity = value;
      setSelectedAmenities((prev) =>
        checked ? [...prev, amenity] : prev.filter((item) => item !== amenity)
      );
      return;
    }

    // Address fields
    if (addressFields.includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }));
      return;
    }

    // File inputs (images)
    if (type === "file") {
      const fileArray = Array.from(files);
      setImages((prev) => [...prev, ...fileArray]);
      return;
    }

    // All other inputs
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomAmenity = () => {
    if (customAmenity.trim()) {
      setAllAmenities(prev => [...prev,customAmenity.trim()])
      setSelectedAmenities((prev) => [...prev, customAmenity.trim()]);
      setCustomAmenity("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.phoneNumber.length)
    if(formData.phoneNumber.length !== 10){
      toast.error("Please enter a valid phone number!")
      return;
    }


    if (images.length < minPhotos) {
      toast.error(`Please upload at least ${minPhotos} photos.`);
      return;
    }

    const finalData = { ...formData, amenities: selectedAmenities, images };
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      for (const key in finalData) {
        if (key === "images") {
          finalData[key].forEach((file) => formDataToSend.append(key, file));
        } else if (key === "address") {
          Object.entries(finalData.address).forEach(([k, v]) =>
            formDataToSend.append(`address[${k}]`, v)
          );
        } else if (key === "amenities") {
          finalData[key].forEach((amenity) => formDataToSend.append(key, amenity));
        } else {
          formDataToSend.append(key, finalData[key]);
        }
      }

      const response = await axios.post("/v1/villas/create-villa", formDataToSend);
      if (response.data.statusCode === 201) {
        toast.success("Villa successfully listed for review.");
        setFormData(initialFormData);
        setSelectedAmenities([]);
        setImages([]);
        setCustomAmenity("");
        // navigate("/"); 
      } else {
        toast.error("Error while submitting the form. Please try again.");
        // setFormData({ address: {} });
        // setSelectedAmenities([]);
        // setImages([]);
        // setCustomAmenity("");
        setFormData(null)
      }
    } catch (err) {
      toast.error("Error while submitting the form. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Property Request Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "villaOwner", placeholder: "Villa Owner Name *", type: "text" },
              { name: "villaName", placeholder: "Villa Name *", type: "text" },
              { name: "email", placeholder: "Email ID *", type: "email" },
              { name: "phoneNumber", placeholder: "Mobile Phone *", type: "tel" },
              { name: "numberOfRooms", placeholder: "Number of Rooms *", type: "number" }
            ].map((field) => (
              <input
                key={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                required
                placeholder={field.placeholder}
                className="w-full border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 rounded-lg p-3 text-gray-800"
              />
            ))}
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 rounded-lg p-3 text-gray-800"
            >
              <option value="">Select Property Type *</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          {/* Address Section */}
          <div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addressFields.map((field) => (
                <input
                  key={field}
                  name={field}
                  type="text"
                  value={formData.address[field]}
                  onChange={handleChange}
                  required
                  placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} *`}
                  className="w-full border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 rounded-lg p-3 text-gray-800"
                />
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Amenities</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {allAmenities.map((item) => (
                <label key={item} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="amenities"
                    value={item}
                    checked={selectedAmenities.includes(item)}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-green-600"
                  />
                  <span className="ml-2 text-gray-800">{item}</span>
                </label>
              ))}
              <div className="col-span-1 sm:col-span-2 flex items-center">
                <input
                  type="text"
                  value={customAmenity}
                  onChange={(e) => setCustomAmenity(e.target.value)}
                  placeholder="Other amenity"
                  className="flex-grow border border-gray-300 rounded-lg p-3 text-gray-800 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                />
                <button
                  type="button"
                  onClick={handleCustomAmenity}
                  className="ml-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Photos & Preview */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Photos</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-800"
            />
            {images.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                {images.length} photo{images.length > 1 ? "s" : ""} selected
              </div>
            )}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {images.map((file, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(file)}
                    alt={`preview-${idx}`}
                    className="h-24 w-full 객체-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe Your Property"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200"
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Loader className="animate-spin" />
              </div>
            ) : (
              "Send Request"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
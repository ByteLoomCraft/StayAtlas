import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import front1 from "../assets/frontv.jpg";
import bedroom from "../assets/bdroom.jpg";
import bedroom2 from "../assets/bdroom2.jpg";
import axios from "../utils/axios";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function PropertyListingGrid() {
  const [favorites, setFavorites] = useState({});
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

    useEffect(() => {
  
      async function fetchExclusive() {
        try{
          const {data:{data}} = await axios.get("/v1/villas");
          console.log(data);
          const finalData = data.filter((property) => property.isExclusive ===false)
          // const finalData = data.filter((property) => property.isTrending ===false)
          // console.log(finalData); 
          setProperties(finalData);
          
        }catch(err){
          console.log(err);
          toast.error("Error fetching explore data")  
        }
      }
      fetchExclusive()
    }, []);


  if (properties.length === 0) {
    <div className="flex justify-center items-center h-screen">
      No Villas Found
    </div>
  }
  return (
    <div className="bg-gray-50 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {properties.map((property) => (
          <div key={property._id} className="hover:bg-gray-100 bg-white rounded-lg overflow-hidden shadow">
            <div className="relative">
              <img 
                src={property.images[0]} 
                alt={property.villaName} 
                className="w-full h-48 object-cover"
              />
              <button 
                onClick={() => toggleFavorite(property.id)}
                className=" absolute top-3 cursor-pointer hover:bg-gray-300 p-1 right-3 bg-white rounded-full"
              >
                <Heart 
                  size={20} 
                  fill={favorites[property.id] ? "red" : "none"} 
                  color={favorites[property.id] ? "none" : "#000000"} 
                />
              </button>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-base mb-1">{property.villaName}</h3>
              
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{property.address.city}</span>
              </div>
              
              {/* <div className="flex text-sm text-gray-600 mb-3 gap-2">
                <span>{property.beds} Beds</span>
                <span>|</span>
                <span>{property.baths} Baths</span>
                <span>|</span>
                <span>{property.guests} guests</span>
              </div> */}

              {/* <div className="text-sm text-gray-700 mb-3 flex space-x-1">
                {
                  property?.amenities.length > 0 && (
                    property.amenities.map((amenity, index) => (
                      <div key={index}>
                        {(index > 3) ? "" : `${amenity} `} {index < 3 && "•"}
                      </div>
                    ))
                  )
                }
              </div> */}
              <div className="w-full line-clamp-2 text-sm text-gray-700 mb-3">
                {property?.amenities?.join(' • ')}
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold">₹ {property.pricePerNight}</span>
                  <span className="text-gray-600 text-sm"> per night</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 font-bold">{property.rating}</span>
                </div>
              </div>
              
              <button onClick={() => navigate(`/booking/${property._id}`)} className="w-full mt-4 bg-black hover:bg-gray-800 cursor-pointer text-white font-medium py-2 rounded-md">
                Enquire Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
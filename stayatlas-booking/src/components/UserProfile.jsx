import { useState } from 'react';
import { Calendar, User, Home, Phone, Mail, Clock, MapPin, Check, Menu, X } from 'lucide-react';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const userData = {
  id: 101,
  fullName: "Priya Sharma",
  email: "priya.sharma@example.com",
  mobile: "+91 98765 43210",
  dateOfBirth: "1990-05-15",
  address: "42 Lake View Road, Mumbai, Maharashtra",
  profilePicture: "/api/placeholder/150/150",
};


const bookingsData = [
  {
    id: 104,
    fullName: "Neha Joshi",
    villaName: "Himalayan Pine Lodge",
    email: "neha.joshi@example.com",
    mobile: "+91 65432 10987",
    rooms: 4,
    propertyType: "Mountain Lodge",
    address: {
      street: "112 Cedar Lane",
      landmark: "Near Hadimba Temple",
      city: "Manali",
      state: "Himachal Pradesh",
      country: "India",
      zipcode: "175131"
    },
    bookingDate: "2025-03-15",
    checkIn: "2025-04-10",
    checkOut: "2025-04-17",
    guests: 6,
    status: "Confirmed",
    totalAmount: "₹65,000",
    amenities: ["Heated Floors", "Apple Orchard", "Snowview Terrace", "Traditional Himachali Kitchen"],
    photos: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
    description: "A cozy wooden lodge nestled among pine forests with stunning views of snow-capped peaks. Features traditional Himachali architecture with modern amenities and easy access to adventure activities."
  },
  {
    id: 105,
    fullName: "Neha Joshi",
    villaName: "Beachside Bliss Villa",
    email: "neha.joshi@example.com",
    mobile: "+91 65432 10987",
    rooms: 3,
    propertyType: "Beach Villa",
    address: {
      street: "7 Seaside Avenue",
      landmark: "Anjuna Beach",
      city: "Goa",
      state: "Goa",
      country: "India",
      zipcode: "403509"
    },
    bookingDate: "2025-01-10",
    checkIn: "2025-02-05",
    checkOut: "2025-02-12",
    guests: 4,
    status: "Completed",
    totalAmount: "₹48,000",
    amenities: ["Private Pool", "Beach Access", "Outdoor Bar", "BBQ Area"],
    photos: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
    description: "A stunning beachfront villa with direct access to the golden sands of Anjuna. Enjoy the sunset from your private infinity pool or relax in the artfully designed interior spaces."
  },
  {
    id: 106,
    fullName: "Neha Joshi",
    villaName: "Desert Oasis Retreat",
    email: "neha.joshi@example.com",
    mobile: "+91 65432 10987",
    rooms: 2,
    propertyType: "Heritage Haveli",
    address: {
      street: "23 Camel Path",
      landmark: "Near Sam Sand Dunes",
      city: "Jaisalmer",
      state: "Rajasthan",
      country: "India",
      zipcode: "345001"
    },
    bookingDate: "2024-11-20",
    checkIn: "2024-12-15",
    checkOut: "2024-12-22",
    guests: 3,
    status: "Completed",
    totalAmount: "₹36,000",
    amenities: ["Rooftop Terrace", "Desert View", "Traditional Decor", "Folk Music Nights"],
    photos: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
    description: "Experience the magic of the Thar Desert in this beautifully restored haveli. Intricate stone carvings, colorful textiles, and modern comforts create a perfect blend of heritage and luxury."
  }
];

export default function UserProfile() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const user = useSelector((state)=>state.auth)
  console.log(user)

  useEffect(()=>{
    const fetchData = async ()=>{
        try{
            const response = await axios.get(`/v1/villas/my-villas`)
            const data = response.data;
            console.log(data)
        }catch(err){
            console.log(err);
            toast.error("An error occurred while submitting the form. Please try again.");
        }
    }

    fetchData()
  })

  return (
    <>
    <div className="bg-gray-50 min-h-screen">

    
      <main className="container mx-auto px-4 pt-20 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex flex-col items-center">
                <img 
                  src={userData.profilePicture} 
                  alt={user.firstName} 
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <h2 className="text-xl font-bold">{user.firstName}</h2>
                <p className="text-gray-600 mb-4">{user.email}</p>
                <div className="flex space-x-4 mt-2">
                  <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div 
                className={`flex items-center p-4 cursor-pointer ${activeTab === 'profile' ? 'bg-teal-50 border-l-4 border-teal-600' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <User className="text-teal-600 mr-3" size={20} />
                <span className={activeTab === 'profile' ? 'font-medium text-teal-600' : 'text-gray-700'}>
                  Profile
                </span>
              </div>
              
              <div 
                className={`flex items-center p-4 cursor-pointer ${activeTab === 'bookings' ? 'bg-teal-50 border-l-4 border-teal-600' : ''}`}
                onClick={() => setActiveTab('bookings')}
              >
                <Home className="text-teal-600 mr-3" size={20} />
                <span className={activeTab === 'bookings' ? 'font-medium text-teal-600' : 'text-gray-700'}>
                  My Bookings
                </span>
              </div>
            </div>
          </div>
          
          <div className="md:w-3/4">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-6 pb-2 border-b">User Information</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <div className="flex items-center">
                        <User className="text-gray-500 mr-2" size={18} />
                        <p className="text-gray-900">{user.firstName}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <div className="flex items-center">
                        <Mail className="text-gray-500 mr-2" size={18} />
                        <p className="text-gray-900">{user.email}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <div className="flex items-center">
                        <Phone className="text-gray-500 mr-2" size={18} />
                        <p className="text-gray-900">{user.userPhone}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                      <div className="flex items-center">
                        <Calendar className="text-gray-500 mr-2" size={18} />
                        <p className="text-gray-900">{userData.dateOfBirth}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <div className="flex items-center">
                      <MapPin className="text-gray-500 mr-2" size={18} />
                      <p className="text-gray-900">{userData.address}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <h4 className="text-lg font-medium mb-4">Account Preferences</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="newsletter"
                        name="newsletter"
                        type="checkbox"
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="newsletter" className="ml-3 text-sm text-gray-700">
                        Receive newsletter and promotional emails
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="sms"
                        name="sms"
                        type="checkbox"
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="sms" className="ml-3 text-sm text-gray-700">
                        Receive SMS notifications for bookings
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-xl font-bold mb-6">My Bookings</h3>
                  
                  {bookingsData.map((booking) => (
                    <div key={booking.id} className="mb-6 p-6 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <h4 className="text-lg font-bold mb-2 md:mb-0">{booking.villaName}</h4>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                          ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                            booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {booking.status}
                        </span>
                      </div>
                      
                      <div className="flex flex-col md:flex-row mb-4">
                        <div className="md:w-1/3 mb-4 md:mb-0">
                          <img 
                            src={booking.photos[0]} 
                            alt={booking.villaName} 
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="md:w-2/3 md:pl-6 space-y-3">
                          <div className="flex items-start">
                            <MapPin className="text-gray-500 mr-2 mt-1" size={16} />
                            <p className="text-gray-700">
                              {booking.address.street}, {booking.address.landmark}, {booking.address.city}, {booking.address.state}
                            </p>
                          </div>
                          
                          <div className="flex items-center">
                            <Clock className="text-gray-500 mr-2" size={16} />
                            <p className="text-gray-700">
                              {booking.checkIn} to {booking.checkOut}
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-3">
                            {booking.amenities.slice(0, 4).map((amenity, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                                <Check className="text-teal-500 mr-1" size={12} />
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <p className="text-gray-700">
                            <span className="font-medium">Total:</span> {booking.totalAmount}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">Guests:</span> {booking.guests} • <span className="font-medium">Rooms:</span> {booking.rooms}
                          </p>
                        </div>
                        
                        <div className="mt-3 md:mt-0 flex space-x-3">
                          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
    </>
  );
}
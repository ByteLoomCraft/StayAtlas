import { useState } from 'react';
import { Calendar, User, Home, Phone, Mail, Clock, MapPin, Check, Menu, X } from 'lucide-react';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { ContactlessOutlined } from '@mui/icons-material';



export default function UserProfile() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [bookings,setBookings] = useState([])
  
  

  const user = useSelector((state)=>state.auth)
  console.log(user.role);
  console.log(typeof user.role)

  

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/v1/bookings/user');
        const data = response.data;
        setBookings(data.data);
        console.log(data.data);
      } catch (error) {
        console.error('Fetch bookings error:', error);
        toast.error('An error occurred while fetching bookings. Please try again.');
      }
    };
  
    fetchBookings();
  }, []);
  

  return (
    <>
    <div className="bg-gray-50 min-h-screen">

    
      <main className="container mx-auto px-4 pt-20 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex flex-col items-center">
                <img 
                  src={`https://api.dicebear.com/5.x/initials/svg/seed=${user.firstName}`}
                  alt={user.firstName} 
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <h2 className="text-xl font-bold">{user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}</h2>
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
                        <p className="text-gray-900">{user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}</p>
                      </div>
                    </div>
                    
                    {user.email && <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <div className="flex items-center">
                        <Mail className="text-gray-500 mr-2" size={18} />
                        <p className="text-gray-900">{user.email}</p>
                      </div>
                    </div>}
                    
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

    {bookings.length > 0 && activeTab === 'bookings' && (
      <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-6">My Bookings</h3>

      {bookings.map((booking) => (
        <div key={booking._id} className="mb-6 p-6 border rounded-lg hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div className="text-lg font-bold mb-2 md:mb-0">{booking.villaDetails?.name}</div>
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
                src={booking.villaDetails?.images?.[0]} 
                alt={booking.villaDetails?.name} 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            <div className="md:w-2/3 md:pl-6 space-y-3">
              <div className="flex items-start">
                <MapPin className="text-gray-500 mr-2 mt-1" size={16} />
                <p className="text-gray-700">
                  {booking.villaDetails?.address?.street}, {booking.villaDetails?.address?.landmark}, {booking.villaDetails?.address?.city}, {booking.villaDetails?.address?.state}
                </p>
              </div>

              <div className="flex items-center">
                <Clock className="text-gray-500 mr-2" size={16} />
                <p className="text-gray-700">
                  {new Date(booking.checkIn).toLocaleDateString()} to {new Date(booking.checkOut).toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {booking.villaDetails?.amenities?.slice(0, 4).map((amenity, index) => (
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
                <span className="font-medium">Total:</span> ₹{parseFloat(booking.totalAmount?.toString()).toFixed(2)}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Guests:</span> {booking.guests?.adults + booking.guests?.children + booking.guests?.pets} • <span className="font-medium">Rooms:</span> {booking.rooms ?? 'N/A'}
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
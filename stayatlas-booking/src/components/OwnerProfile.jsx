import { useEffect, useState } from 'react';
import { User, Home, Phone, Mail, Calendar, MapPin, Settings, ChevronDown, ChevronUp, Menu, X, Edit, Trash, Plus, Users, FileText, Star, DollarSign, Clock, AlertTriangle, Loader } from 'lucide-react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const villasData = [
    {
        id: 301,
        villaName: "Sunset Beachfront Villa",
        propertyType: "Beach Villa",
        address: {
            street: "42 Coastal Avenue",
            landmark: "Near Calangute Beach",
            city: "Calangute",
            state: "Goa",
            country: "India",
            zipcode: "403516"
        },
        amenities: ["Private Pool", "Direct Beach Access", "Outdoor Dining", "Home Theater"],
        rooms: 4,
        maxGuests: 8,
        pricePerNight: "₹25,000",
        rating: 4.8,
        totalBookings: 32,
        photos: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
        description: "Luxurious beachfront villa with spectacular sunset views. Features modern amenities while maintaining a traditional Goan architectural style.",
        status: "Active",
        upcomingBookings: 3,
        recentBookings: [
            { guestName: "Arjun ", checkIn: "2025-06-10", checkOut: "2025-06-15", guests: 6, amount: "₹1,25,000" }
        ]
    },
    {
        id: 302,
        villaName: "Mountain View Cottage",
        propertyType: "Hill Villa",
        address: {
            street: "15 Pine Ridge Road",
            landmark: "Near Sunset Point",
            city: "Shimla",
            state: "Himachal Pradesh",
            country: "India",
            zipcode: "171001"
        },
        amenities: ["Fireplace", "Mountain Views", "Hiking Trails", "Hot Tub"],
        rooms: 3,
        maxGuests: 6,
        pricePerNight: "₹18,000",
        photos: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
        description: "Charming cottage nestled in the Himalayan foothills with panoramic mountain views. Perfect for a peaceful retreat in nature.",
        status: "Pending",
        submittedDate: "2025-04-25",
        adminFeedback: "Awaiting initial review from the admin team."
    },
    {
        id: 303,
        villaName: "Riverside Eco Retreat",
        propertyType: "Eco Villa",
        address: {
            street: "78 River Bank Road",
            landmark: "Near Alaknanda River",
            city: "Rishikesh",
            state: "Uttarakhand",
            country: "India",
            zipcode: "249201"
        },
        amenities: ["Solar Power", "Organic Garden", "Meditation Deck", "River Access"],
        rooms: 2,
        maxGuests: 4,
        pricePerNight: "₹12,000",
        photos: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
        description: "Eco-friendly retreat powered by renewable energy, featuring sustainable design and located steps away from the sacred Ganges river.",
        status: "Rejected",
        submittedDate: "2025-03-15",
        rejectionDate: "2025-04-02",
        adminFeedback: "Property does not meet our luxury standards. Bathroom facilities need upgrading and professional photography is required."
    }
];

export default function VillaOwnerProfile() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [expandedVilla, setExpandedVilla] = useState(null);
    const [propertyStatus, setPropertyStatus] = useState('all');
    const [villas, setVillas] = useState(null)
    const [villaBookings, setVillaBookings] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const user = useSelector((state)=>state.auth)
    const navigate = useNavigate()
   
    // console.log(villas)
    // console.log(villaBookings)

    useEffect(()=>{
        async function fetchData() {
            setIsLoading(true)
            try{
                const [villas, bookings] = await Promise.all([
                    axios.get('/v1/villas/my-villas'),
                    axios.get('/v1/bookings/villaowner')
                ])
                if(villas.data.statusCode === 200){
                    setVillas(villas.data.data)
                }else{
                    toast.error("Error in fetching villas")
                }

                if(bookings.data.statusCode === 200){
                    setVillaBookings(bookings.data.data)
                }else{
                    toast.error("Error in fetching bookings")
                }
                
                
            }catch(err){
                console.log("Error:",err)
                toast.error("Error in fetching villa owner, Please try again later!")
            }
            setIsLoading(false)
        }
        fetchData()
    },[])



    

    const toggleVillaDetails = (villaId) => {
        if (expandedVilla === villaId) {
            setExpandedVilla(null);
        } else {
            setExpandedVilla(villaId);
        }
    };

    if(isLoading){
        return <div className="h-screen text-2xl flex justify-center items-center text-red-800">
           <Loader className='animate-spin'/>
        </div>
    }

    if(!villas){
        return  <div className="h-screen text-2xl flex justify-center items-center text-red-800">
            No villa to fetch!
        </div>
    }

    const totalVillas = villas.length;
    const activeVillas = villas.filter(villa => villa.approvalStatus === 'approved').length;
    const pendingVillas = villas.filter(villa => villa.approvalStatus === 'pending').length;
    const rejectedVillas = villas.filter(villa => villa.approvalStatus === 'rejected').length;
    const totalBookings = villaBookings.reduce((acc, villa) => acc + (villa.totalBookings || 0), 0);
    const upcomingBookings = villaBookings.reduce((acc, villa) => acc + (villa.upcomingBookings || 0), 0);

    const filteredVillas = propertyStatus === 'all'
        ? villas
        : villas.filter(villa => villa.approvalStatus.toLowerCase() === propertyStatus);


    return (
        <div className="bg-gray-50 min-h-screen">
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4">
                        <div className="bg-white rounded-lg shadow p-6 mb-6">
                            <div className="flex flex-col items-center">
                                <img
                                    src={`https://api.dicebear.com/5.x/initials/svg/seed=${user.firstName}`}
                                    alt={user.firstName}
                                    className="w-32 h-32 rounded-full object-cover mb-4"
                                />
                                <h2 className="text-xl font-bold">{`${user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)} ${user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}`}</h2>
                                {user.email && <p className="text-gray-600">{user.email}</p>}
                                {/* <div className="flex items-center mt-2">
                                    <Star className="text-yellow-500" size={16} />
                                    <span className="ml-1 text-gray-700">{ownerData.rating} Rating</span>
                                </div> */}
                                <span className="mt-2 px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                    Verified
                                </span>
                                {/* <div className="flex space-x-4 mt-4">
                                    <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                                        Edit Profile
                                    </button>
                                </div> */}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div
                                className={`flex items-center p-4 cursor-pointer ${activeTab === 'dashboard' ? 'bg-teal-50 border-l-4 border-teal-600' : ''}`}
                                onClick={() => setActiveTab('dashboard')}
                            >
                                <Home className="text-teal-600 mr-3" size={20} />
                                <span className={activeTab === 'dashboard' ? 'font-medium text-teal-600' : 'text-gray-700'}>
                                    Dashboard
                                </span>
                            </div>

                            <div
                                className={`flex items-center p-4 cursor-pointer ${activeTab === 'properties' ? 'bg-teal-50 border-l-4 border-teal-600' : ''}`}
                                onClick={() => setActiveTab('properties')}
                            >
                                <Home className="text-teal-600 mr-3" size={20} />
                                <span className={activeTab === 'properties' ? 'font-medium text-teal-600' : 'text-gray-700'}>
                                    My Properties
                                </span>
                            </div>

                            <div
                                className={`flex items-center p-4 cursor-pointer ${activeTab === 'bookings' ? 'bg-teal-50 border-l-4 border-teal-600' : ''}`}
                                onClick={() => setActiveTab('bookings')}
                            >
                                <Calendar className="text-teal-600 mr-3" size={20} />
                                <span className={activeTab === 'bookings' ? 'font-medium text-teal-600' : 'text-gray-700'}>
                                    Bookings
                                </span>
                            </div>

                            <div
                                className={`flex items-center p-4 cursor-pointer ${activeTab === 'profile' ? 'bg-teal-50 border-l-4 border-teal-600' : ''}`}
                                onClick={() => setActiveTab('profile')}
                            >
                                <User className="text-teal-600 mr-3" size={20} />
                                <span className={activeTab === 'profile' ? 'font-medium text-teal-600' : 'text-gray-700'}>
                                    Profile
                                </span>
                            </div>

                            {/* <div
                                className={`flex items-center p-4 cursor-pointer ${activeTab === 'settings' ? 'bg-teal-50 border-l-4 border-teal-600' : ''}`}
                                onClick={() => setActiveTab('settings')}
                            >
                                <Settings className="text-teal-600 mr-3" size={20} />
                                <span className={activeTab === 'settings' ? 'font-medium text-teal-600' : 'text-gray-700'}>
                                    Settings
                                </span>
                            </div> */}
                        </div>
                    </div>

                    <div className="md:w-3/4">
                        {activeTab === 'dashboard' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-xl font-bold mb-6">Dashboard</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-blue-700 font-medium">Total Properties</h4>
                                                <Home className="text-blue-500" size={20} />
                                            </div>
                                            <p className="text-2xl font-bold text-blue-800">{villas.length}</p>
                                            <p className="text-sm text-blue-600">{activeVillas} active listings</p>
                                        </div>

                                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-purple-700 font-medium">Pending Review</h4>
                                                <Clock className="text-purple-500" size={20} />
                                            </div>
                                            <p className="text-2xl font-bold text-purple-800">{pendingVillas}</p>
                                            <p className="text-sm text-purple-600">Awaiting approval</p>
                                        </div>

                                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-green-700 font-medium">Total Bookings</h4>
                                                <Calendar className="text-green-500" size={20} />
                                            </div>
                                            <p className="text-2xl font-bold text-green-800">{villaBookings.length}</p>
                                            {/* <p className="text-sm text-green-600">{upcomingBookings} upcoming</p> */}
                                        </div>

                                        {/* <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-amber-700 font-medium">Total Earnings</h4>
                                                <DollarSign className="text-amber-500" size={20} />
                                            </div>
                                            <p className="text-2xl font-bold text-amber-800">{ownerData.totalEarnings}</p>
                                            <p className="text-sm text-amber-600">Lifetime earnings</p>
                                        </div> */}
                                    </div>


                                    {/* <div>
                                        <h4 className="text-lg font-medium mb-4">Recent Activity</h4>
                                        <div className="border rounded-lg divide-y">
                                            <div className="p-4 flex items-start">
                                                <div className="bg-blue-100 p-2 rounded-full mr-4">
                                                    <Calendar className="text-blue-600" size={18} />
                                                </div>
                                                <div>
                                                    <p className="font-medium">New Booking: Sunset Beachfront Villa</p>
                                                    <p className="text-gray-600 text-sm">Booked by Arjun  for Jun 10-15, 2025</p>
                                                    <p className="text-sm text-gray-500 mt-1">2 hours ago</p>
                                                </div>
                                            </div>

                                            <div className="p-4 flex items-start">
                                                <div className="bg-green-100 p-2 rounded-full mr-4">
                                                    <Star className="text-green-600" size={18} />
                                                </div>
                                                <div>
                                                    <p className="font-medium">New Review: Sunset Beachfront Villa</p>
                                                    <p className="text-gray-600 text-sm">Arjun gave your property 5 stars</p>
                                                    <p className="text-sm text-gray-500 mt-1">1 day ago</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        )}

                        {activeTab === 'properties' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-lg shadow p-6">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                        <h3 className="text-xl font-bold">My Properties</h3>
                                        <button onClick={() => navigate("/list")} className="cursor-pointer mt-4 md:mt-0 flex items-center bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                                            <Plus size={18} className="mr-2" />
                                            Add New Property
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <button
                                            onClick={() => setPropertyStatus('all')}
                                            className={`px-3 py-1 rounded-md text-sm font-medium ${propertyStatus === 'all' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                        >
                                            All ({totalVillas})
                                        </button>
                                        <button
                                            onClick={() => setPropertyStatus('approved')}
                                            className={`px-3 py-1 rounded-md text-sm font-medium ${propertyStatus === 'active' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                        >
                                            Approved ({activeVillas})
                                        </button>
                                        <button
                                            onClick={() => setPropertyStatus('pending')}
                                            className={`px-3 py-1 rounded-md text-sm font-medium ${propertyStatus === 'pending' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                        >
                                            Pending Review ({pendingVillas})
                                        </button>
                                        <button
                                            onClick={() => setPropertyStatus('rejected')}
                                            className={`px-3 py-1 rounded-md text-sm font-medium ${propertyStatus === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                        >
                                            Rejected ({rejectedVillas})
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        {console.log(filteredVillas)}
                                        {filteredVillas.map((villa) => (
                                            <div key={villa._id} className={`border rounded-lg overflow-hidden bg-white ${villa.approvalStatus === 'pending' ? 'border-l-4 border-l-purple-500' :
                                                villa.approvalStatus === 'rejected' ? 'border-l-4 border-l-red-500' :
                                                    'border-l-4 border-l-green-500'
                                                }`}>
                                                <div className="p-6">
                                                    <div className="flex flex-col md:flex-row">
                                                        <div className="md:w-1/3 mb-4 md:mb-0">
                                                            <img
                                                                src={villa.images[0]}
                                                                alt={villa.villaName}
                                                                className="w-full h-48 object-cover rounded-lg"
                                                            />
                                                        </div>

                                                        <div className="md:w-2/3 md:pl-6">
                                                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                                                                <h4 className="text-lg font-bold mb-2 md:mb-0">{villa.villaName}</h4>
                                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                                                                        ${villa.approvalStatus === 'approved' ? 'bg-green-100 text-green-800' :
                                                                        villa.approvalStatus === 'pending' ? 'bg-purple-100 text-purple-800' :
                                                                            'bg-red-100 text-red-800'}`}>
                                                                    {villa.approvalStatus.charAt(0).toUpperCase() + villa.approvalStatus.slice(1)}
                                                                </span>
                                                            </div>

                                                            <div className="mb-3">
                                                                <div className="flex items-start mb-1">
                                                                    <MapPin className="text-gray-500 mr-2 mt-1" size={16} />
                                                                    <p className="text-gray-700">
                                                                        {villa.address.street}, {villa.address.landmark}, {villa.address.city}, {villa.address.state}
                                                                    </p>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <Home className="text-gray-500 mr-2" size={16} />
                                                                    <p className="text-gray-700">
                                                                        {villa.propertyType.charAt(0).toUpperCase() + villa.propertyType.slice(1)} • {villa.numberOfRooms} Rooms • Max {villa.numberOfRooms*2} Guests
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="flex flex-wrap gap-2 mt-2">
                                                                {villa.amenities.slice(0, 3).map((amenity, index) => (
                                                                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                                                                        {amenity}
                                                                    </span>
                                                                ))}
                                                                {villa.amenities.length > 3 && (
                                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                                                                        +{villa.amenities.length - 3} more
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {villa.approvalStatus === 'approved' && (
                                                                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                                                                    <div className="text-center p-2 bg-gray-50 rounded">
                                                                        <p className="text-sm text-gray-600">Price/Night</p>
                                                                        <p className="font-medium">{villa.pricePerNight}</p>
                                                                    </div>
                                                                    {/* <div className="text-center p-2 bg-gray-50 rounded">
                                                                        <p className="text-sm text-gray-600">Total Bookings</p>
                                                                        <p className="font-medium">{villa.totalBookings}</p>
                                                                    </div> */}
                                                                    {/* <div className="text-center p-2 bg-gray-50 rounded">
                                                                        <p className="text-sm text-gray-600">Rating</p>
                                                                        <p className="font-medium flex items-center justify-center">
                                                                            {villa.rating} <Star className="text-yellow-500 ml-1" size={14} />
                                                                        </p>
                                                                    </div> */}
                                                                </div>
                                                            )}

                                                            {villa.approved === 'pending' && (
                                                                <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
                                                                    <div className="flex items-start">
                                                                        <Clock className="text-purple-500 mr-2 mt-1" size={18} />
                                                                        <div>
                                                                            <p className="font-medium text-purple-700">Awaiting Admin Review</p>
                                                                            <p className="text-sm text-purple-600">Submitted on: {villa.submittedDate}</p>
                                                                            <p className="text-sm text-gray-600 mt-1">{villa.adminFeedback}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {villa.approved === 'rejected' && (
                                                                <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
                                                                    <div className="flex items-start">
                                                                        <AlertTriangle className="text-red-500 mr-2 mt-1" size={18} />
                                                                        <div>
                                                                            <p className="font-medium text-red-700">Property Rejected</p>
                                                                            <p className="text-sm text-red-600">Rejected on: {villa.rejectionDate}</p>
                                                                            <p className="text-sm text-gray-600 mt-1"><span className="font-medium">Feedback:</span> {villa.adminFeedback}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                                                        <div className="flex space-x-3">
                                                            {/* <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                                                                <Edit size={16} className="inline mr-1" /> Edit
                                                            </button>
                                                            <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                                                                <Trash size={16} className="inline mr-1" /> Delete
                                                            </button>
                                                            {villa.approved === 'rejected' && (
                                                                <button className="px-3 py-1 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                                                                    <Edit size={16} className="inline mr-1" /> Resubmit
                                                                </button>
                                                            )} */}
                                                        </div>

                                                        <button
                                                            className="flex items-center text-teal-600 hover:text-teal-800"
                                                            onClick={() => toggleVillaDetails(villa._id)}
                                                        >
                                                            {expandedVilla === villa._id ? (
                                                                <>Less Details <ChevronUp size={18} className="ml-1" /></>
                                                            ) : (
                                                                <>More Details <ChevronDown size={18} className="ml-1" /></>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>

                                                {expandedVilla === villa._id && (
                                                    <div className="bg-gray-50 p-6 border-t">
                                                        {villa.status === 'Active' && villa.recentBookings && villa.recentBookings.length > 0 && (
                                                            <>
                                                                <h5 className="font-medium mb-4">Recent Bookings</h5>
                                                                <div className="overflow-x-auto">
                                                                    <table className="min-w-full divide-y divide-gray-200">
                                                                        <thead className="bg-gray-100">
                                                                            <tr>
                                                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                                                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                                                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
                                                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                                            {villa.recentBookings.map((booking, index) => (
                                                                                <tr key={index}>
                                                                                    <td className="px-4 py-3 text-sm text-gray-900">{booking.guestName}</td>
                                                                                    <td className="px-4 py-3 text-sm text-gray-900">{booking.checkIn} to {booking.checkOut}</td>
                                                                                    <td className="px-4 py-3 text-sm text-gray-900">{booking.guests}</td>
                                                                                    <td className="px-4 py-3 text-sm text-gray-900">{booking.amount}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </>
                                                        )}

                                                        <div className={villa.recentBookings && villa.recentBookings.length > 0 ? "mt-6" : ""}>
                                                            <h5 className="font-medium mb-3">Property Description</h5>
                                                            <p className="text-gray-700">{villa.description}</p>
                                                        </div>

                                                        <div className="mt-6">
                                                            <h5 className="font-medium mb-3">All Amenities</h5>
                                                            <div className="flex flex-wrap gap-2">
                                                                {villa.amenities.map((amenity, index) => (
                                                                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                                                                        {amenity}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {villa.status === 'Rejected' && (
                                                            <div className="mt-6">
                                                                <h5 className="font-medium mb-3 text-red-700">Admin Feedback Details</h5>
                                                                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                                                    <p className="text-gray-700">{villa.adminFeedback}</p>
                                                                    <div className="mt-4">
                                                                        <h6 className="font-medium text-gray-700">Required Actions:</h6>
                                                                        <ul className="list-disc pl-5 mt-2 text-gray-700">
                                                                            <li>Update bathroom facilities to meet luxury standards</li>
                                                                            <li>Arrange for professional photography</li>
                                                                            <li>Review pricing strategy</li>
                                                                        </ul>
                                                                    </div>
                                                                    <button className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                                                                        Resubmit with Changes
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'profile' && (
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-xl font-bold mb-6 pb-2 border-b">Owner Information</h3>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                            <div className="flex items-center">
                                                <User className="text-gray-500 mr-2" size={18} />
                                                <p className="text-gray-900">{`${user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)} ${user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}`}</p>
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

                                        {user.dob && <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                                            <div className="flex items-center">
                                                <Calendar className="text-gray-500 mr-2" size={18} />
                                                <p className="text-gray-900">{user.dob}</p>
                                            </div>
                                        </div>}

                                        {/* <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                            <div className="flex items-center">
                                                <MapPin className="text-gray-500 mr-2" size={18} />
                                                <p className="text-gray-900">{ownerData.address}</p>
                                            </div>
                                        </div> */}

                                        {/* <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                                            <div className="flex items-center">
                                                <Calendar className="text-gray-500 mr-2" size={18} />
                                                <p className="text-gray-900">{ownerData.joinedDate}</p>
                                            </div>
                                        </div> */}
                                    </div>

                                    {/* <div className="mt-8 pt-6 border-t">
                                        <h4 className="text-lg font-medium mb-4">Bank Information</h4>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name</label>
                                                <div className="flex items-center">
                                                    <User className="text-gray-500 mr-2" size={18} />
                                                    <p className="text-gray-900">{ownerData.bankDetails.accountHolderName}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                                                <div className="flex items-center">
                                                    <FileText className="text-gray-500 mr-2" size={18} />
                                                    <p className="text-gray-900">{ownerData.bankDetails.accountNumber}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                                                <div className="flex items-center">
                                                    <Home className="text-gray-500 mr-2" size={18} />
                                                    <p className="text-gray-900">{ownerData.bankDetails.bankName}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
                                                <div className="flex items-center">
                                                    <FileText className="text-gray-500 mr-2" size={18} />
                                                    <p className="text-gray-900">{ownerData.bankDetails.ifscCode}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                                                <div className="flex items-center">
                                                    <MapPin className="text-gray-500 mr-2" size={18} />
                                                    <p className="text-gray-900">{ownerData.bankDetails.branch}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <button className="flex items-center bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                                                <Edit size={18} className="mr-2" />
                                                Update Bank Details
                                            </button>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        )}

                        {activeTab === 'bookings' && (
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-xl font-bold mb-6">Bookings</h3>

                                {!villaBookings.length === 0 ? <div className='flex justify-center items-center text-gray-400'>No Bookings Found</div> :  <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> */}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {
                                                villaBookings.map((booking, index) => (
                                                    <tr key={`${booking._id}-${index}`}>
                                                        <td className="px-4 py-3 text-sm text-gray-900">{booking.villa.villaName}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-900">{`${booking.user.firstName.charAt(0).toUpperCase() + booking.user.firstName.slice(1)} ${booking.user.lastName.charAt(0).toUpperCase() + booking.user.lastName.slice(1)}`}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-900">{new Date(booking.checkIn).toLocaleDateString()}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-900">{new Date(booking.checkOut).toLocaleDateString()}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-900">{booking.guests.adults + booking.guests.children + booking.guests.pets }</td>
                                                        <td className="px-4 py-3 text-sm text-gray-900">{booking.totalAmount.$numberDecimal}</td>
                                                        <td className="px-4 py-3 text-sm">
                                                            <span className={`px-2 py-1 text-xs rounded-full  ${booking.status === "Confirmed" ? "text-green-800 bg-green-100" : booking.status === "Cancelled" ? "text-white bg-red-600" : "text-white bg-purple-900"}`}>
                                                                {booking.status}
                                                            </span>
                                                        </td>
                                                        {/* <td className="px-4 py-3 text-sm">
                                                            <div className="flex space-x-2">
                                                                <button className="p-1 text-blue-600 hover:text-blue-800">
                                                                    <Edit size={16} />
                                                                </button>
                                                                <button className="p-1 text-red-600 hover:text-red-800">
                                                                    <Trash size={16} />
                                                                </button>
                                                            </div>
                                                        </td> */}
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>}
                            </div>
                        )}




                        {/* {activeTab === 'settings' && (
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-xl font-bold mb-6">Account Settings</h3>

                                <div className="space-y-6">
                                    <div className="border-b pb-6">
                                        <h4 className="text-lg font-medium mb-4">Profile Settings</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                                                <div className="flex items-center">
                                                    <img
                                                        src={ownerData.profilePicture}
                                                        alt={ownerData.fullName}
                                                        className="w-16 h-16 rounded-full object-cover mr-4"
                                                    />
                                                    <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50">
                                                        Change Photo
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                        defaultValue={ownerData.fullName}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                                    <input
                                                        type="email"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                        defaultValue={ownerData.email}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                        defaultValue={ownerData.mobile}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                                                    <input
                                                        type="date"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                        defaultValue={ownerData.dateOfBirth}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                                <textarea
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                    rows="3"
                                                    defaultValue={ownerData.address}
                                                ></textarea>
                                            </div>

                                            <div>
                                                <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-b pb-6">
                                        <h4 className="text-lg font-medium mb-4">Password Settings</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                                <input
                                                    type="password"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                    placeholder="Enter current password"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                                <input
                                                    type="password"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                    placeholder="Enter new password"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                                <input
                                                    type="password"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                    placeholder="Confirm new password"
                                                />
                                            </div>

                                            <div>
                                                <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                                                    Change Password
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-medium mb-4">Notification Settings</h4>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h5 className="font-medium">Email Notifications</h5>
                                                    <p className="text-sm text-gray-600">Receive booking and account updates via email</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                                </label>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h5 className="font-medium">SMS Notifications</h5>
                                                    <p className="text-sm text-gray-600">Receive booking updates via SMS</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                                </label>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h5 className="font-medium">Marketing Updates</h5>
                                                    <p className="text-sm text-gray-600">Receive marketing and promotional emails</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                                </label>
                                            </div>

                                            <div>
                                                <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                                                    Save Preferences
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )} */}
                    </div>
                </div>
            </main>
        </div>
    );
}
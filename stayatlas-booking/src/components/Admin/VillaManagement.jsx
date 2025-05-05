import { useState } from "react";

const VillaManagement = () => {
  const [activeTab, setActiveTab] = useState(0);

  const manageVillasData = [
    {
      id: 1,
      fullName: "Rajesh Sharma",
      villaName: "Ganga View Retreat",
      email: "rajesh.sharma@example.com",
      mobile: "+91 98765 43210",
      rooms: 5,
      propertyType: "Riverside Villa",
      address: {
        street: "42 Riverfront Road",
        landmark: "Near Parmarth Niketan",
        city: "Rishikesh",
        state: "Uttarakhand",
        country: "India",
        zipcode: "249201"
      },
      amenities: ["Yoga Deck", "Private Ghat", "Meditation Room", "Organic Garden", "Custom: Ayurvedic Spa"],
      photos: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      description: "A serene riverside villa overlooking the sacred Ganges. Perfect for spiritual retreats and yoga enthusiasts with direct river access and stunning mountain views."
    },
    {
      id: 2,
      fullName: "Priya Patel",
      villaName: "Sea Breeze Haven",
      email: "priya.patel@example.com",
      mobile: "+91 87654 32109",
      rooms: 4,
      propertyType: "Beach Villa",
      address: {
        street: "78 Coastal Highway",
        landmark: "Opposite Morjim Beach",
        city: "Morjim",
        state: "Goa",
        country: "India",
        zipcode: "403512"
      },
      amenities: ["Infinity Pool", "Beach Access", "Open Kitchen", "BBQ Area", "Custom: Sunset Deck"],
      photos: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      description: "A luxurious beachfront property in North Goa with direct beach access. The villa offers beautiful sunset views, modern amenities, and a perfect blend of indoor and outdoor living spaces."
    },
    {
      id: 3,
      fullName: "Vikram Singh",
      villaName: "Royal Heritage Haveli",
      email: "vikram.singh@example.com",
      mobile: "+91 76543 21098",
      rooms: 6,
      propertyType: "Heritage Villa",
      address: {
        street: "15 Palace Road",
        landmark: "Near Amber Fort",
        city: "Jaipur",
        state: "Rajasthan",
        country: "India",
        zipcode: "302001"
      },
      amenities: ["Private Courtyard", "Jharokha Balconies", "Heritage Art Collection", "Custom: Royal Kitchen"],
      photos: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      description: "An authentic Rajasthani haveli restored with modern amenities while preserving its historical charm. Features traditional architecture, hand-painted murals, and royal hospitality."
    }
  ];
  
  const viewVillasData = [
    {
      id: 101,
      fullName: "Ananya Reddy",
      villaName: "Mountain Mist Cottage",
      email: "ananya.reddy@example.com",
      mobile: "+91 94567 89012",
      rooms: 3,
      propertyType: "Hill Station Villa",
      address: {
        street: "23 Hillview Road",
        landmark: "Near Lal Tibba",
        city: "Mussoorie",
        state: "Uttarakhand",
        country: "India",
        zipcode: "248179"
      },
      amenities: ["Fireplace", "Mountain View Deck", "Library", "Custom: Outdoor Bonfire Pit"],
      photos: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      description: "A charming cottage nestled in the Himalayas with panoramic valley views. The property features colonial architecture with wooden interiors and is surrounded by pine and deodar forests."
    },
    {
      id: 102,
      fullName: "Arjun Nair",
      villaName: "Coconut Grove Estate",
      email: "arjun.nair@example.com",
      mobile: "+91 85432 10987",
      rooms: 4,
      propertyType: "Backwater Villa",
      address: {
        street: "56 Canal Bank",
        landmark: "Opposite Kumarakom Bird Sanctuary",
        city: "Kumarakom",
        state: "Kerala",
        country: "India",
        zipcode: "686563"
      },
      amenities: ["Private Jetty", "Houseboat Dock", "Ayurvedic Massage Room", "Custom: Traditional Kerala Kitchen"],
      photos: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      description: "A traditional Kerala-style villa situated on the serene backwaters. Features authentic architecture with modern comforts, surrounded by coconut groves and offering spectacular sunset views."
    },
    {
      id: 103,
      fullName: "Kiran Mehta",
      villaName: "Vineyard Valley Retreat",
      email: "kiran.mehta@example.com",
      mobile: "+91 74321 09876",
      rooms: 5,
      propertyType: "Countryside Villa",
      address: {
        street: "88 Vineyard Avenue",
        landmark: "Near York Winery",
        city: "Nashik",
        state: "Maharashtra",
        country: "India",
        zipcode: "422003"
      },
      amenities: ["Wine Cellar", "Grape Farm Access", "Outdoor Dining", "Custom: Wine Tasting Room"],
      photos: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      description: "A modern villa surrounded by lush vineyards in India's wine country. Perfect for wine enthusiasts with exclusive access to private vineyard tours and premium wine tasting experiences."
    },
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
      amenities: ["Heated Floors", "Apple Orchard", "Snowview Terrace", "Custom: Traditional Himachali Kitchen"],
      photos: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      description: "A cozy wooden lodge nestled among pine forests with stunning views of snow-capped peaks. Features traditional Himachali architecture with modern amenities and easy access to adventure activities."
    }
  ];

  const VillaCard = ({ villa, isManage }) => {
    const [expanded, setExpanded] = useState(false);
    
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">{villa.villaName}</h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {villa.propertyType}
            </span>
          </div>
          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Owner</p>
              <p className="font-medium">{villa.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Contact</p>
              <p className="font-medium">{villa.email}</p>
              <p className="font-medium">{villa.mobile}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Rooms</p>
              <p className="font-medium">{villa.rooms}</p>
            </div>
          </div>
 
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center mb-2"
          >
            {expanded ? "Show less" : "Show more"}
            <svg 
              className={`w-4 h-4 ml-1 transition-transform ${expanded ? "rotate-180" : ""}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
   
          {expanded && (
            <div className="mt-4 space-y-4 border-t pt-4">
    
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Address</p>
                <div className="pl-2 border-l-2 border-gray-200">
                  <p>{villa.address.street}</p>
                  <p>{villa.address.landmark}</p>
                  <p>{villa.address.city}, {villa.address.state}</p>
                  <p>{villa.address.country}, {villa.address.zipcode}</p>
                </div>
              </div>
              
        
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {villa.amenities.map((amenity, index) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              
     
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Description</p>
                <p className="text-gray-700">{villa.description}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Photos</p>
                <div className="grid grid-cols-2 gap-2">
                  {villa.photos.map((photo, index) => (
                    <img 
                      key={index}
                      src={photo} 
                      alt={`${villa.villaName} photo ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
 
        {isManage && (
          <div className="px-6 py-4 bg-gray-50 flex gap-3">
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Approve
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
              Reject
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full overflow-hidden min-h-screen bg-gray-100 p-4">

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab(0)}
          className={`px-4 py-2 rounded-md transition ${
            activeTab === 0 ? "bg-blue-600 text-white" : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          Manage Villas
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`px-4 py-2 rounded-md transition ${
            activeTab === 1 ? "bg-blue-600 text-white" : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          View Villas
        </button>
      </div>

      <div className="relative w-full">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeTab * 100}%)` }}
        >
          <div className="min-w-full grid gap-6">
            {manageVillasData.map((villa) => (
              <VillaCard key={villa.id} villa={villa} isManage={true} />
            ))}
          </div>

          <div className="min-w-full grid gap-6">
            {viewVillasData.map((villa) => (
              <VillaCard key={villa.id} villa={villa} isManage={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaManagement;
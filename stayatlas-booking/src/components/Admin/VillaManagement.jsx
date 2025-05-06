import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../../utils/axios.js"
import { Search } from "lucide-react";

const VillaManagement = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [manageVillasData, setManageVillasData] = useState([]);
  const [viewVillasData, setViewVillasData] = useState([]);

  async function handleApprove(id) {
    try{
      console.log("Approving villa with ID:", id);
    }catch(err){
      toast.error("Error approving villa");
      console.error("Error approving villa:", err);
    }
  }

  async function handleReject(id) {
    try{
      console.log("Approving villa with ID:", id);
    }catch(err){
      toast.error("Error approving villa");
      console.error("Error approving villa:", err);
    }
  }

  const VillaCard = ({ villa, isManage }) => {
    const [expanded, setExpanded] = useState(false);
    // console.log("Villa Card:", villa);
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
              <p className="font-medium">{`${villa?.ownerId.firstName} ${villa?.ownerId.lastName}`}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Contact</p>
              <p className="font-medium">{villa.email}</p>
              <p className="font-medium">{villa.phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Rooms</p>
              <p className="font-medium">{villa.numberOfRooms}</p>
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
                  <p>{villa?.address.street}</p>
                  <p>{villa?.address.landmark}</p>
                  <p>{villa?.address.city}, {villa?.address.state}</p>
                  <p>{villa?.address.country}, {villa?.address.zipcode}</p>
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
                  {villa.images.map((photo, index) => (
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
            <button onClick={() => handleApprove(villa._id)} className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Approve
            </button>
            <button onClick={() => handleReject(villa._id)} className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
              Reject
            </button>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    async function fetchData() {
      try{
        const [pendingResponse, approvedResponse] = await Promise.all([
          axios.get("/v1/admin/get-all-pending-villa"),
          axios.get("/v1/admin/get-all-approved-villa")
        ])

        console.log("Pending Villas:", pendingResponse.data);
        console.log("Manage Villas:", approvedResponse.data);
        if(pendingResponse.data.statusCode == 200){
          // console.log("Pending Villas:", response.data.data.villas);
          const set = Array.isArray(pendingResponse.data.data.villas) ? pendingResponse.data.data.villas : [];
          setManageVillasData(set);
          setFilteredManageVillas(set);
        }else{
          toast.error("Error fetching pending villas");
          console.error("Error fetching pending villas:", pendingResponse.data.message);
        }

        if(approvedResponse.data.statusCode == 200){
          // console.log("Pending Villas:", response.data.data.villas);
          const set = Array.isArray(approvedResponse.data.data.villas) ? approvedResponse.data.data.villas : [];
          setViewVillasData(set);
          setFilteredViewVillas(set);
        }else{
          toast.error("Error fetching pending villas");
          console.error("Error fetching pending villas:", approvedResponse.data.message);
        }
      }catch(err){
        toast.error("Error fetching villa data:", err);
        console.error("Error fetching data:", err);
      }
    }
    fetchData();
  },[])


  const [searchQuery, setSearchQuery] = useState("");
  const [filteredManageVillas, setFilteredManageVillas] = useState(manageVillasData);
  const [filteredViewVillas, setFilteredViewVillas] = useState(viewVillasData);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    // console.log("Search query:", query);
    if(activeTab == 0){
      const filtered = manageVillasData.filter((villa) =>
        villa.phoneNumber.toLowerCase().includes(query)
      );
      setFilteredManageVillas(filtered);
    }else{
      const filtered = viewVillasData.filter((villa) =>
        villa.mobile.toLowerCase().includes(query)
      );
      setFilteredViewVillas(filtered);
    }
    
  }



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
        {/* <input
          type="text"
          placeholder="Search by mobile number"
          value={searchQuery}
          onChange={handleSearch}  
          className="px-4 py-2 border rounded-md w-1/3"
        /> */}
        <div className="flex items-center border border-gray-400 rounded-md px-2 w-1/3 focus-within:border-blue-500 focus-within:border-2">
          <Search className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by mobile number"
            value={searchQuery}
            onChange={handleSearch}
            className="py-2 outline-none w-full"
          />
        </div>
      </div>

      <div className="relative w-full">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeTab * 100}%)` }}
        >
          {manageVillasData.length === 0 && activeTab === 0 ? 
            (
              <div className="flex items-center justify-center min-h-screen bg-gray-100 min-w-full">
                <p className="text-lg text-gray-500">No pending villas to manage.</p>
              </div>
            ) 
            :
            (
              <div className="min-w-full grid gap-6">
                {filteredManageVillas.map((villa) => (
                  <VillaCard key={villa._id} villa={villa} isManage={true} />
                ))}
              </div>
            )
          }

          {viewVillasData.length === 0 && activeTab === 1 ? 
            (
              <div className="flex items-center justify-center min-h-screen bg-gray-100 min-w-full">
                <p className="text-lg text-gray-500">No villas to manage.</p>
              </div>
            ) 
            :
            <div className="min-w-full grid gap-6">
              {filteredViewVillas.map((villa) => (
                <VillaCard key={villa.id} villa={villa} isManage={false} />
              ))}
              {/* <div>Hi</div> */}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default VillaManagement;

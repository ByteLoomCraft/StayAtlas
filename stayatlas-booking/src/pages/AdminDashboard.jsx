import React, { useState } from "react";
import Sidebar from "../components/Admin/Sidebar.jsx"
import Dashboard from "../components/Admin/Dashboard.jsx";
import VillaManagement from "../components/Admin/VillaManagement.jsx";
import BookingManagement from "../components/Admin/BookingManagement.jsx";
import UserManagement from "../components/Admin/UserManagement.jsx";
import ContentManagement from "../components/Admin/ContentManagement.jsx";
   
const AdminDashboard = () => {

  const [selectedPage, setSelectedPage] = useState("Dashboard");

  const showContent = () => {
    switch(selectedPage) {
      case "Dashboard":
        return <Dashboard></Dashboard>;
      case "VillaManagement":
        return <VillaManagement></VillaManagement>;
      case "BookingManagement":
        return <BookingManagement></BookingManagement>;
      case "UserManagement":
        return <UserManagement></UserManagement>;
      case "ContentManagement":
        return <ContentManagement></ContentManagement>;
      default:
        return <p>Select a page</p>
    }
  }

    return (
      <>
        <div className="flex">
          <Sidebar setSelectedPage={setSelectedPage}></Sidebar>
          <div  className="flex-1 p-6 overflow-y-auto h-screen">{showContent()}</div>
        </div>
      </>
    );
  };
  
export default AdminDashboard;
  
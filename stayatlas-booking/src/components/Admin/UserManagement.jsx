import { useState } from "react";

const usersData = [
  {
    id: 1,
    name: "Abhishek Choudhary",
    email: "abhishek@example.com",
    bookingHistory: [
      { room: "Room 101", date: "2023-05-15", nights: 2, status: "Completed" },
      { room: "Room 203", date: "2023-06-20", nights: 3, status: "Completed" }
    ],
    isBanned: false,
  },
  {
    id: 2,
    name: "Ravi Kumar",
    email: "ravi@example.com",
    bookingHistory: [
      { room: "Room 302", date: "2023-07-10", nights: 1, status: "Cancelled" }
    ],
    isBanned: true,
  },
  {
    id: 3,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    bookingHistory: [
      { room: "Room 405", date: "2023-08-05", nights: 4, status: "Completed" },
      { room: "Room 408", date: "2023-09-12", nights: 2, status: "Completed" },
      { room: "Room 501", date: "2023-10-01", nights: 5, status: "Upcoming" }
    ],
    isBanned: false,
  },
];

export default function UserManagement() {
  const [users, setUsers] = useState(usersData);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeUser, setActiveUser] = useState(null);

  const toggleBanStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isBanned: !user.isBanned } : user
      )
    );

    if (activeUser?.id === id) {
      setActiveUser((prev) => ({ ...prev, isBanned: !prev.isBanned }));
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bookingHistory.some((booking) =>
        booking.room.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="p-10 bg-white min-h-screen text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <input
          type="text"
          placeholder="Search users..."
          className="px-5 py-3 w-80 border border-gray-500 rounded-md text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex gap-6">
        {/* User List - Left Side */}
        <div className={`space-y-4 ${activeUser ? "w-2/3" : "w-full"}`}>
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => setActiveUser(user)}
              className={`cursor-pointer border border-gray-400 hover:border-blue-500 p-4 rounded-lg bg-gray-100 shadow-sm ${
                activeUser?.id === user.id ? "border-blue-500 bg-blue-50" : ""
              }`}
            >
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={user.isBanned ? "text-red-500" : "text-green-600"}>
                  {user.isBanned ? "Banned" : "Active"}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Bookings:</strong> {user.bookingHistory.length}
              </p>
            </div>
          ))}
        </div>

        {/* User Detail Section - Right Side */}
        {activeUser && (
          <div className="w-1/3 border border-gray-300 rounded-lg bg-gray-50 p-6 shadow-md sticky top-10 h-fit">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">User Details</h2>
              <button
                onClick={() => setActiveUser(null)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ✖ Close
              </button>
            </div>
            
            <div className="mb-6">
              <p className="mb-2"><strong>Name:</strong> {activeUser.name}</p>
              <p className="mb-2"><strong>Email:</strong> {activeUser.email}</p>
              <p className="mb-2">
                <strong>Status:</strong>{" "}
                <span className={activeUser.isBanned ? "text-red-500" : "text-green-600"}>
                  {activeUser.isBanned ? "Banned" : "Active"}
                </span>
              </p>
              <button
                onClick={() => toggleBanStatus(activeUser.id)}
                className={`mt-2 px-4 py-2 rounded ${
                  activeUser.isBanned
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                } text-white`}
              >
                {activeUser.isBanned ? "Unban User" : "Ban User"}
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Booking History</h3>
              {activeUser.bookingHistory.length > 0 ? (
                <div className="space-y-3">
                  {activeUser.bookingHistory.map((booking, index) => (
                    <div key={index} className="border-b border-gray-200 pb-3 last:border-0">
                      <p><strong>Room:</strong> {booking.room}</p>
                      <p><strong>Date:</strong> {booking.date}</p>
                      <p><strong>Duration:</strong> {booking.nights} night(s)</p>
                      <p>
                        <strong>Status:</strong>{" "}
                        <span className={
                          booking.status === "Completed" ? "text-green-600" :
                          booking.status === "Cancelled" ? "text-red-500" :
                          "text-blue-600"
                        }>
                          {booking.status}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No booking history found</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState } from "react";
import {
  FaHouse,
  FaPersonWalkingLuggage,
  FaSink,
  FaFire,
  FaCouch,
  FaUtensils,
  FaTv,
  FaDoorClosed,
  FaSnowflake,
  FaChair,
  FaWifi,
  FaSeedling,
  FaCar,
} from "react-icons/fa6";
import { FaHotjar } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const VilaDetail = () => {
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [pets, setPets] = useState(0);
  const [children, setChildren] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);

  return (
    <div className="font-custom min-h-screen flex items-center justify-center bg-[#f8f7f6] text-black p-6">
      <div className="flex flex-col md:flex-row gap-6 max-w-7xl w-full">
        <div className="md:w-2/3 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">
              Stayatlas - Highland Villa 8BHK
            </h1>
            <p className="text-lg">Panchgani, Maharashtra</p>
          </div>

          <div>
            <p className="text-sm">
              Post Bhilar Taluka Mahabaleshwar District Satara Landmark: Behind
              shivnya palace Panchgani Maharashtra - 412805
            </p>
            <p className="mt-2 font-semibold">5.0 ★</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 border px-3 py-1 rounded-full text-sm">
              <FaHouse /> 8BHK
            </div>
            <div className="flex items-center gap-2 border px-3 py-1 rounded-full text-sm">
              <FaPersonWalkingLuggage /> 10 MAX GUEST
            </div>
            <div className="flex items-center gap-2 border px-3 py-1 rounded-full text-sm">
              <FaSink /> 8 BATH
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Property Description</h2>
            <p className="text-sm leading-relaxed">
              This villa is located in the most peaceful region of Maharashtra.
              Our 8BHK Highland Villa in Panchgani offers stunning views and
              luxurious amenities. It is elegantly furnished with comfortable
              seating, a serene pool, and a relaxing patio. Perfect for hosting
              events or enjoying a getaway with family and friends. Features
              include spacious bedrooms, a large lawn, a fully-equipped kitchen,
              king-size beds, and pet-friendly accommodation.
            </p>
          </div>

          <div className="flex gap-4">
            <button className="border px-4 py-1 rounded-full text-xs transition duration-300 ease-in-out hover:bg-gray-200">
              PROPERTY BROCHURE
            </button>
            <button className="border px-4 py-1 rounded-full text-xs transition duration-300 ease-in-out hover:bg-gray-200">
              PROPERTY VIDEOS
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {[
                { icon: <FaSnowflake className="text-black" />, label: "Air Conditioner" },
                { icon: <FaCar />, label: "Private Parking" },
                { icon: <FaFire />, label: "Barbeque (Chargeable)" },
                { icon: <FaHotjar />, label: "Microwave" },
                { icon: <FaCouch />, label: "Sofa" },
                { icon: <FaUtensils />, label: "Dining Table" },
                { icon: <FaTv />, label: "Flat Screen TV" },
                { icon: <FaDoorClosed />, label: "Wardrobe" },
                { icon: <FaSnowflake />, label: "Refrigerator" },
                { icon: <FaChair />, label: "Outdoor Furniture" },
                { icon: <FaWifi />, label: "WiFi" },
                { icon: <FaSeedling />, label: "Garden" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center text-xs"
                >
                  <div className="text-xl font-black">{item.icon}</div>
                  <div className="mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[340px] space-y-4 p-4 shadow-lg rounded-lg bg-white text-sm">
          <div className="text-base font-bold">From ₹ / Person</div>

          <div>
            <div className="font-semibold">Guests</div>
            <div
              onClick={() => setGuestDropdownOpen(!guestDropdownOpen)}
              className="border px-3 py-2 rounded cursor-pointer"
            >
              {adults + pets + children} Guests
            </div>
            {guestDropdownOpen && (
              <div className="border p-4 mt-2 rounded shadow bg-white space-y-4 max-h-56 overflow-y-auto">
                {[
                  { label: "Adults", value: adults, setter: setAdults },
                  { label: "Pets", value: pets, setter: setPets },
                  {
                    label: "Children Under 6",
                    value: children,
                    setter: setChildren,
                  },
                ].map(({ label, value, setter }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center"
                  >
                    <div>{label}</div>
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => setter(Math.max(0, value - 1))}
                        className="border px-2"
                      >
                        -
                      </button>
                      <div className="w-6 text-center">{value}</div>
                      <button
                        onClick={() => setter(value + 1)}
                        className="border px-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex gap-2">
                  <button
                    onClick={() => setGuestDropdownOpen(false)}
                    className="bg-black text-white px-4 py-1 rounded"
                  >
                    APPLY
                  </button>
                  <button
                    onClick={() => {
                      setAdults(1);
                      setPets(0);
                      setChildren(0);
                    }}
                    className="border px-4 py-1 rounded"
                  >
                    CLEAR
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="font-semibold">Check in - Check out</div>
            <div className="flex gap-2 mt-1">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}  
                maxDate={endDate}
                placeholderText="Check in"
                className="w-full px-3 py-2 border rounded"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                // startDate={startDate}
                endDate={endDate}
                minDate={startDate || tomorrow}
                placeholderText="Check out"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          <div>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="Have a Discount Coupon?"
            />
          </div>

          <button className="w-full bg-black text-white font-bold py-2 rounded">
            VIEW OFFERS
          </button>

          <table className="w-full text-sm mt-2">
            <tbody>
              <tr>
                <td>Tariff</td>
                <td className="text-right">₹5000</td>
              </tr>
              <tr>
                <td>Rs. × nights</td>
                <td className="text-right">₹20000</td>
              </tr>
              <tr>
                <td>Flat 10% off</td>
                <td className="text-right">-₹2500.00</td>
              </tr>
              <tr>
                <td>GST (18%)</td>
                <td className="text-right">+₹4050.00</td>
              </tr>
              <tr className="font-bold">
                <td>Total Amount</td>
                <td className="text-right">₹26550.00</td>
              </tr>
            </tbody>
          </table>

          <p className="text-[10px] text-gray-600 leading-tight">
            You will find the best rates on our website. No discounts will be
            given on phone.
          </p>

          <button className="w-full bg-black text-white py-2 rounded font-bold">
            BOOK NOW
          </button>
          <button className="w-full border py-2 rounded text-xs font-bold">
            CONTACT YOUR HOST
            <br />
            +91 8591131447
          </button>
        </div>
      </div>
    </div>
  );
};

export default VilaDetail;

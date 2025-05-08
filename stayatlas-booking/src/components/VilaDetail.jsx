import React, { use, useEffect, useState } from "react";
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
import { DoorClosed, Dot, DotSquareIcon, Loader } from "lucide-react";
import toast from "react-hot-toast";
import axios from "../utils/axios"
import { useParams } from "react-router-dom";

const VilaDetail = ({property=null}) => {
  const {id} = useParams()
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [pets, setPets] = useState(0);
  const [children, setChildren] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const [couponCode, setCouponCode] = useState("");
  const [bookNow, setBookNow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [charges, setCharges] = useState({
    tariff: 5000,
    gst: 18,
    discount: 10,
    totalNights:0,
    totalCost: 5000
  })

  useEffect(() => {
    if (property !== null && startDate && endDate) {
      // Calculate the number of nights
      const timeDiff = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
      const baseCost = diffDays * property?.pricePerNight;
  
      const discountAmount = (charges.discount / 100) * baseCost;
  
      const costAfterDiscount = baseCost - discountAmount;

      const gstAmount = (charges.gst / 100) * costAfterDiscount;
  
      // Calculate total cost
      const totalCost = costAfterDiscount + gstAmount ;
  
      // Update the charges state with calculated values
      setCharges((prevCharges) => ({
        ...prevCharges,
        totalNights: diffDays,
        totalCost: totalCost,
      }));
    } else {
      // Set default values if dates or property are missing
      setCharges((prevCharges) => ({
        ...prevCharges,
        totalNights: 0,
        discount:property.discountPercent || 0,
        totalCost: 0,
      }));
    }
  }, [startDate, endDate, property]);

  useEffect(() => {
    if(startDate && endDate){
      async function fetchDateAvailability() {
        try{
          const response = await axios.get(`/v1/bookings/check-availability/${id}?checkIn=${startDate.toISOString()}&checkOut=${endDate.toISOString()}`);
          console.log("Dates are available for booking", response.data.data);
          if(response.data.data.isAvailable){
            // console.log("Dates are available for booking", response.data.data);
            toast.success("Dates are available for booking");
            setBookNow(true)
          }else{
            toast.error("Dates are not available for booking");
            setBookNow(false)
          }
        }catch(error){
          toast.error("Dates are not available for booking");
          console.error("Dates are not available for booking", error);
          setBookNow(false)
        }
      }
      fetchDateAvailability()
      
    }
  },[startDate, endDate])

  // useEffect(() => {
  //   if (property!==null&&startDate && endDate) {
  //     const timeDiff = Math.abs(endDate - startDate);
  //     const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  //     setCharges((prevCharges) => ({
  //       ...prevCharges,
  //       totalNights: diffDays,
  //     }));
  //   } else {
  //     setCharges((prevCharges) => ({
  //       ...prevCharges,
  //       totalNights: 1,
  //     }));
  //   }
  // },[startDate, endDate]);

  const handleBooking = async() => {
    const timeDiff = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    // console.log("Total Nights:", diffDays);
    setIsLoading(true)
    try{
      const bookingData = {
        villa:id,
        guests:{adults,pets,children},
        adults,
        pricePerNightAtBooking:property?.pricePerNight,
        pets,
        children,
        checkIn:startDate,
        checkOut:endDate,
        nights:diffDays,
        discountPercentApplied:charges.discount,
        couponCode
      };
      // console.log("Booking Data:", bookingData);
      const response = await axios.post("/v1/bookings", bookingData);
      // console.log("Booking Response:", response.data);
      if(response.data.statusCode===201){
        toast.success("Booking Successful");
        setBookNow(false)
        setStartDate(null)
        setEndDate(null)
        setAdults(1)
        setPets(0)
        setChildren(0)
      }else{
        toast.error("Booking Failed");
      }
    }catch(error){
      console.error("Error fetching exclusive data:", error);
    }
    setIsLoading(false)
  }

  if(property===null){
    return <div>
      <h1 className="flex justify-center items-center h-screen"><Loader className=" font-extrabold size-11 animate-spin"/></h1>
    </div>
  }

  // console.log(property)

  return (
    <div className="font-custom min-h-screen flex items-center justify-center bg-[#f8f7f6] text-black p-6">
      <div className="flex flex-col md:flex-row gap-6 max-w-7xl w-full">
        <div className="md:w-2/3 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">
              {property.villaName}
            </h1>
            <p className="text-lg">{`${property?.address?.city}, ${property?.address?.country}`}</p>
          </div>

          <div>
            <p className="text-sm">
              {
               `${property?.address?.street}, ${property?.address?.city}, ${property?.address?.state}, ${property?.address?.country}, ${property?.address?.zipcode}` 
              }
            </p>
            <p className="mt-2 font-semibold">5.0 ★</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 border px-3 py-1 rounded-full text-sm">
              <FaHouse /> {property.numberOfRooms} BHK
            </div>
            <div className="flex items-center gap-2 border px-3 py-1 rounded-full text-sm">
              <FaPersonWalkingLuggage /> {property.numberOfRooms*2} MAX GUEST
            </div>
            {/* <div className="flex items-center gap-2 border px-3 py-1 rounded-full text-sm">
              <FaSink /> 8 BATH
            </div> */}
            <div className="flex items-center gap-2 border px-3 py-1 rounded-full text-sm">
              <DoorClosed /> {property.numberOfRooms} ROOMS
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold pb-2">Property Description</h2>
            <p className="text-sm leading-relaxed">
              {
                property.description
              }
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
              {
              // [
              //   { icon: <FaSnowflake className="text-black" />, label: "Air Conditioner" },
              //   { icon: <FaCar />, label: "Private Parking" },
              //   { icon: <FaFire />, label: "Barbeque (Chargeable)" },
              //   { icon: <FaHotjar />, label: "Microwave" },
              //   { icon: <FaCouch />, label: "Sofa" },
              //   { icon: <FaUtensils />, label: "Dining Table" },
              //   { icon: <FaTv />, label: "Flat Screen TV" },
              //   { icon: <FaDoorClosed />, label: "Wardrobe" },
              //   { icon: <FaSnowflake />, label: "Refrigerator" },
              //   { icon: <FaChair />, label: "Outdoor Furniture" },
              //   { icon: <FaWifi />, label: "WiFi" },
              //   { icon: <FaSeedling />, label: "Garden" },
              // ]
              property.amenities && property.amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center text-xs"
                >
                  <div className="text-xl font-black"><DotSquareIcon/></div>
                  <div className="mt-1">{item}</div>
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
                        className="border px-2 cursor-pointer hover:bg-gray-200"
                      >
                        -
                      </button>
                      <div className="w-6 text-center">{value}</div>
                      <button
                        onClick={() => setter(value + 1)}
                        className="border px-2 cursor-pointer hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex gap-2">
                  <button
                    onClick={() => setGuestDropdownOpen(false)}
                    className="cursor-pointer bg-black text-white px-4 py-1 rounded"
                  >
                    APPLY
                  </button>
                  <button
                    onClick={() => {
                      setAdults(1);
                      setPets(0);
                      setChildren(0);
                    }}
                    className="cursor-pointer border px-4 py-1 rounded"
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
                minDate={startDate ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000) : tomorrow}
                placeholderText="Check out"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          <div>
            <input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
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
              {/* <tr>
                <td>Tariff</td>
                <td className="text-right">₹{charges.tariff}</td>
              </tr> */}
              <tr>
                <td>{charges.totalNights} nights</td>
                <td className="text-right">₹{charges.totalNights * property?.pricePerNight}</td>
              </tr>
              <tr>
                <td>Flat {charges.discount}% off</td>
                <td className="text-right">-₹{(charges.discount/100) * (charges.totalNights * property?.pricePerNight)}</td>
              </tr>
              <tr>
                <td>GST (18%)</td>
                <td className="text-right">+₹{(charges.gst/100) * (charges.totalNights * property?.pricePerNight)}</td>
              </tr>
              <tr className="font-bold">
                <td>Total Amount</td>
                <td className="text-right">₹{charges.totalCost}</td>
              </tr>
            </tbody>
          </table>

          <p className="text-[10px] text-gray-600 leading-tight">
            You will find the best rates on our website. No discounts will be
            given on phone.
          </p>

          <button disabled={!bookNow} onClick={handleBooking} className={`cursor-pointer w-full text-white py-2 rounded font-bold ${bookNow ? "bg-black" : "bg-gray-400"}`}>
            {isLoading ? <div className="flex justify-center"><Loader className="animate-spin"/></div> : "BOOK NOW"}
          </button>
          <button className="w-full border py-2 rounded text-xs font-bold">
            CONTACT YOUR HOST
            <br />
            {property.email || "+91 8591131447"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VilaDetail;

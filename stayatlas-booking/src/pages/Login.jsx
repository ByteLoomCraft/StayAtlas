import axios from "../utils/axios.js";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../state/features/authSlice.js";
import { useDispatch } from "react-redux";

const bottleGreen = "#006A4E";

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [form, setForm] = useState({
    phoneNumber:"",
    countryCode: "+91",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(number);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validatePhoneNumber(form.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid 10-digit phone number.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try{
        const response = await axios.post(`/v1/users/login`,form)
        const { data } = response;
        if(data.statusCode === 200){
          dispatch(setUser(data.data.user))
          toast.success("Login successful!");
          navigate("/");
        }
        
      }catch(err){
        console.log(err);
        toast.error("An error occurred while submitting the form. Please try again.");
      }finally{
        setForm({
          phoneNumber: "",
          countryCode: "+91",
          password: "",
        });
      }
      
    }
  };

  return (
    <div className="py-7 min-h-screen flex items-center justify-center bg-gray-900">
      <form
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: bottleGreen }}
        >
          Login
        </h2>

        {/* Contact Number with Country Code */}
        <div className="flex mt-4 gap-2">
          <select
            name="countryCode"
            value={form.countryCode}
            onChange={handleChange}
            className="border p-2 rounded bg-white"
          >
            <option value="+91">🇮🇳 +91</option>
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+61">🇦🇺 +61</option>
            <option value="+81">🇯🇵 +81</option>
          </select>

          <input
            type="tel"
            name="phoneNumber"
            placeholder="Contact Number"
            value={form.phoneNumber}
            onChange={handleChange}
            required
            className="border p-2 rounded flex-1"
            maxLength={10}
            pattern="\d*"
          />
        </div>
        {errors.contact && (
          <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
        )}

        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border p-2 rounded mt-4 w-full"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}

        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2"
          />
          <label>Show Passwords</label>
        </div>


        <button
          type="submit"
          className="cursor-pointer mt-6 w-full p-2 rounded text-white font-semibold"
          style={{ backgroundColor: bottleGreen }}
        >
          Login
        </button>
        <div className="py-2 flex gap-1">
          <p className="font-semibold">New user?</p>
          <Link to={"/signup"} className="hover:text-blue-500 hover:underline">Signup</Link>
        </div>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";

const bottleGreen = "#006A4E";

export default function SignupForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    countryCode: "+91",
    dob: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateAge = (dob) => {
    const dobDate = new Date(dob);
    // console.log(dobDate)
    const ageDifMs = Date.now() - dobDate.getTime();
    // console.log(ageDifMs)
    const ageDate = new Date(ageDifMs);
    // console.log(ageDate)
    const age =  Math.abs(ageDate.getUTCFullYear() - 1970);
    // console.log(age)
    return age >= 18 && age <= 100;
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateAge(form.dob)) {
      newErrors.dob = "Your age must be between 18 years to 100 years.";
    }

    if (!validatePhoneNumber(form.contact)) {
      newErrors.contact = "Enter a valid 10-digit phone number.";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.password = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully!");
      setForm({
        firstName: "",
        lastName: "",
        contact: "",
        countryCode: "+91",
        dob: "",
        password: "",
        confirmPassword: "",
        email: ""
      });
      console.log(form);
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
          Sign Up
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
        </div>

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
            name="contact"
            placeholder="Contact Number"
            value={form.contact}
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
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          required
          className="border p-2 rounded mt-4 w-full"
        />
        {errors.dob && (
          <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
        )}

        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Create Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border p-2 rounded mt-4 w-full"
        />

        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
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

        <input
          type="email"
          name="email"
          placeholder="Email (Optional)"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded mt-4 w-full"
        />

        <button
          type="submit"
          className="mt-6 w-full p-2 rounded text-white font-semibold"
          style={{ backgroundColor: bottleGreen }}
        >
          Register
        </button>
        <div className="py-2 flex gap-1">
          <p className="font-semibold">Already registered?</p>
          <Link to={"/login"} className="hover:text-blue-500 hover:underline">Login</Link>
        </div>
      </form>
    </div>
  );
}

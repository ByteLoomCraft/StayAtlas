// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   IconButton,
//   Paper
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import GoogleIcon from '@mui/icons-material/Google';

// const Login = ({ onClose }) => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [captcha, setCaptcha] = useState('ABCD1234');

//   const sendOTP = () => {
//     if (phoneNumber.length !== 10) {
//       alert('Phone number must be exactly 10 digits.');
//       return;
//     }
//     setOtpSent(true);
//     alert('OTP Sent!');
//   };

//   const verifyOTP = () => {
//     setOtpVerified(true);
//   };

//   const refreshCaptcha = () => {
//     const newCaptcha = Math.random().toString(36).substring(2, 10).toUpperCase();
//     setCaptcha(newCaptcha);
//   };

//   const signInWithGoogle = () => {
//     alert('Google Sign-In triggered');
//   };

//   return (
//     <Box
//       className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
//     >
//       <Paper elevation={3} className="relative p-6 w-[380px]">
//         {/* Close Icon */}
//         <IconButton
//           onClick={onClose}
//           className="absolute top-2 right-2"
//         >
//           <CloseIcon />
//         </IconButton>

//         <Typography variant="h5" className="text-center mb-4">
//           Login
//         </Typography>

//         <Box component="form" className="flex flex-col gap-4">
//           <TextField
//             fullWidth
//             type="tel"
//             label="Phone Number"
//             variant="filled"
//             required
//             value={phoneNumber}
//             onChange={(e) => {
//               const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
//               if (value.length <= 10) {
//                 setPhoneNumber(value);
//               }
//             }}
//             inputProps={{ maxLength: 10 }}
//           />

//           <Button variant="contained" onClick={sendOTP}>
//             Send OTP
//           </Button>

//           {otpSent && (
//             <>
//               <TextField
//                 fullWidth
//                 type="text"
//                 label="Enter OTP"
//                 variant="filled"
//                 required
//               />

//               <Button variant="contained" color="success" onClick={verifyOTP}>
//                 Verify OTP
//               </Button>
//             </>
//           )}

//           <Box className="bg-gray-100 p-3 rounded">
//             <Box className="flex items-center justify-between mb-2">
//               <Typography variant="body1" fontFamily="monospace">{captcha}</Typography>
//               <Button size="small" onClick={refreshCaptcha}>
//                 Refresh CAPTCHA
//               </Button>
//             </Box>
//             <TextField
//               fullWidth
//               type="text"
//               label="Enter CAPTCHA"
//               variant="filled"
//               required
//             />
//           </Box>

//           <Button
//             variant="outlined"
//             startIcon={<GoogleIcon />}
//             onClick={signInWithGoogle}
//           >
//             Sign in with Google
//           </Button>

//           {otpVerified && (
//             <Typography className="text-green-600 text-center mt-2">
//               ✅ OTP Verified!
//             </Typography>
//           )}
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { Link } from "react-router-dom";

const bottleGreen = "#006A4E";

export default function Login() {
  const [form, setForm] = useState({
    contact: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validatePhoneNumber(form.contact)) {
      newErrors.contact = "Enter a valid 10-digit phone number.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully!");
      setForm({
        contact: "",
        countryCode: "+91",
        password: "",
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
          className="mt-6 w-full p-2 rounded text-white font-semibold"
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

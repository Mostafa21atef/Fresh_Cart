import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ResetPass() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetPassword = () => {
    if (!email || !newPassword) {
      alert("Please enter both email and new password.");
      return;
    }

    setLoading(true);
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
        email: email,
        newPassword: newPassword,
      })
      .then((response) => {
        setLoading(false);
        toast.success("Password reset successfully!");
        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          toast.error(
            "Error resetting password: " + error.response.data.message
          );
          console.error(error.response.data);
        } else {
          toast.error("Error resetting password. Please try again.");
        }
      });
  };

  return <> 
  <div className='mx-auto w-full lg:w-1/2 p-10 rounded-lg bg-[#F8F9FA] shadow-lg mt-10'>
  <h1 className='text-emerald-500 text-2xl text-center my-5 font-bold'>Account Recovery</h1>
  <div className="mb-6">
  <label htmlFor="email" className="text-start block mb-2 text-2xl text-emerald-500">Email Address</label>
        <input type="email" 
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 " placeholder="Enter Your E-mail" required />
    </div>
    <div>
        <input
          type="password"
          className="w-[80%] p-2 border my-3 focus:border-emerald-500 focus:outline-none"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)} 
        />
      </div>

      <button
        onClick={resetPassword}
        className="py-2 px-3 rounded-lg border border-emerald-600 text-emerald-500 mt-4 hover:text-white hover:bg-emerald-600"
      >
        {loading ? (
          <i className="fas fa-spinner fa-spin"></i>
        ) : (
          "Reset Password"
        )}
      </button>
  </div>
  </>
}

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { Mail, Loader } from "lucide-react";
import { Link } from "react-router-dom";

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");

  const { mutate: forgetPasswordMutation, isLoading } = useMutation({
    mutationFn: (userEmail) =>
      axiosInstance.post("/users/forgetpassword", userEmail),
    onSuccess: (res) => {
      toast.success(res.data.message || "Reset link sent to your email.");
      setEmail(""); // clear email field
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    forgetPasswordMutation({ email });
  };

  return (
    <div className="max-w-md w-full bg-white p-8 ">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1CA59A] focus:border-[#1CA59A] pl-10 transition"
            placeholder="Enter your Email"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#1CA59A] text-white py-3 rounded-2xl hover:bg-[#159A9C] transition-colors font-semibold flex items-center justify-center disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="w-5 h-5 animate-spin mr-2" />
              Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </button>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            <Link
              to="/signin"
              className="hover:underline font-medium text-[#1CA59A]"
            >
              ← Return to Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgetPasswordForm;

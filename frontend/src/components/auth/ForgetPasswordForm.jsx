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
    <div className="max-w-md w-full bg-white p-8 rounded shadow">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-blue-200 rounded-2xl">
          <Mail className="text-blue-600 w-8 h-8" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-blue-800 mb-2 text-center">
        Forgot Password?
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        Enter your email and we'll send you reset instructions.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
            placeholder="Enter your Email"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-2 disabled:opacity-50 flex items-center justify-center"
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
      style={{ color: '#159A9C' }}
      className="hover:underline font-medium"
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

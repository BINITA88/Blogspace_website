import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import LoginForm from "../../components/auth/LoginForm";
import loginImage from "../../assets/imgg/imag.png"; // ✅ same or another image

const LoginPage = () => {
  return (
    <div className="min-h-screen  mt-0 flex items-center justify-center font-[Poppins] ">
      <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-6xl h-[600px]">

        {/* Left Image Side */}
        <div className="lg:w-1/2 w-full px-10 py-16 h-full">
          <img
            src={loginImage}
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form Side */}
        <div className="lg:w-1/2 w-full flex flex-col justify-center px-16 mt-0">
          <div className="max-w-md mx-auto w-full mt-0">
            <div className="flex items-center gap-3 mb-4">
              <FaSignInAlt className="text-2xl text-[#1CA59A]" />
              <h2 className="text-3xl font-semibold  text-lm text-gray-800">
                Sign in to your account
              </h2>
            </div>

            <p className="text-gray-500 text-lm mb-6">
              Welcome back to <span className="font-medium text-[#1CA59A]">Blogspace</span>. Let's continue your journey.
            </p>

            <LoginForm />

            {/* Forgot Password Link */}
            <div className="text-right mt-3">
              <Link
                to="/forgot"
                className="text-lm font-medium text-[#1CA59A] hover:text-[#128a8c]"
              >
                Forgot password?
              </Link>
            </div>

            {/* Separator */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-2 text-gray-500 text-lm bg-white">
                New to Blogspace?
              </span>
              <div className="flex-grow border-t text-lm border-gray-300"></div>
            </div>

            {/* Join Now Button */}
            <div>
              <Link
                to="/signup"
                className="w-full flex justify-center text-lm text-[#1CA59A] hover:text-[#128a8c] py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50"
              >
                Join now
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;

import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import SignUpForm from "../../components/auth/SignUpForm";
import signupImage from "../../assets/imgg/blog.jpg";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center font-[Poppins]  px-10 mt-0 py-10">
      <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-6xl h-[600px]">

        {/* Left Image Side */}
        <div className="lg:w-1/2 w-full h-full p-10">
          <img
            src={signupImage}
            alt="Sign Up Visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form Side */}
        <div className="lg:w-1/2 w-full flex flex-col justify-center px-8 py-10">
          <div className="max-w-md mx-auto w-full">
            <div className="flex items-center gap-3 mb-4">

              <h1 className="text-3xl font-semibold text-gray-800">Create Account</h1>
            </div>

            <p className="text-gray-500 text-sm mb-6">
              Join <span className="font-medium text-lm text-[#1CA59A]">Blogspace</span> and start sharing your stories.
            </p>

            <SignUpForm />

            <div className="text-center mt-6 border-t pt-4 border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Already have an account?</p>
              <Link
                to="/login"
                className="text-[#1CA59A] hover:underline text-sm font-medium"
              >
                Sign in instead
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;

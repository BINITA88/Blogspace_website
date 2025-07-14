import { FaKey } from "react-icons/fa";
import forgetImage from "../../assets/imgg/FORGOT.png"; // 🔁 Replace with your own image path
import ForgetPasswordForm from "../../components/auth/ForgetPasswordForm";


const ForgetPasswordPage = () => {
  return (
    <div className="min-h-screen flex  justify-center font-[Poppins] ">
      <div className="flex flex-col mt-28 lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-6xl h-[390px]">

        {/* Left Image Side */}
        <div className="lg:w-1/2 w-full h-auto">
          <img
            src={forgetImage}
            alt="Forgot Password Visual"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Right Form Side */}
        <div className="lg:w-1/2 mt-0 w-full flex flex-col py-20 ">
          <div className="max-w-md mx-auto w-full">
            <div className="flex items-center ml-10  gap-3 mb-4">
              <FaKey className="text-2xl text-[#1CA59A]" />
              <h2 className="text-3xl font-semibold text-gray-800">
                Forgot Password?
              </h2>
            </div>

            <p className="text-gray-500 text-sm ml-10 mb-2">
              Enter your email and we'll send you instructions to reset your password.
            </p>

      <ForgetPasswordForm />
           </div>
        </div>

      </div>
    </div>
  );
};

export default ForgetPasswordPage;

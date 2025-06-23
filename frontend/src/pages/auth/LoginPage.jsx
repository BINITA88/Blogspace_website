import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";
import logo from "../../assets/imgg/logo.png"; // ✅ import the logo

const LoginPage = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img className='mx-auto h-40 w-auto' src={logo} alt='Blogspace' />
        <h2 className='text-center text-3xl font-extrabold text-gray-900'>
          Sign in to your account
        </h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <LoginForm />

          <div className='mt-6'>
            {/* Separator with "New to Blogspace?" */}
            <div className='flex items-center'>
              <div className='flex-grow border-t border-gray-300'></div>
              <span className='px-2 bg-white text-gray-500 text-sm'>
                New to Blogspace?
              </span>
              <div className='flex-grow border-t border-gray-300'></div>
            </div>

            {/* Forgot Password Link */}
            <div className='mt-4 flex justify-end'>
              <Link
                to='/forgot'
                className='text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200'
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Join Now Button */}
          <div className='mt-6'>
            <Link
              to='/signup'
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50'
            >
              Join now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

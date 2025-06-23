// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const ResetPassword = () => {
//     const { token } = useParams();
//     const navigate = useNavigate();
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (password !== confirmPassword) {
//             setError('Passwords do not match');
//             return;
//         }
//         setIsLoading(true);
//         try {
//             const response = await fetch(`http://localhost:9000/api/resetpassword/${token}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ password }),
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 setError('');
//                 setMessage('Password reset successfully. Redirecting to login page...');
//                 setTimeout(() => {
//                     navigate('/login');
//                 }, 2000);
//             } else {
//                 setError(data.error || 'Failed to reset password.');
//                 setMessage('');
//             }
//         } catch (error) {
//             setError('An error occurred. Please try again.');
//             setMessage('');
//         }
//         setIsLoading(false);
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-pink-100 flex items-center justify-center -mt-16 p-4">
//             <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
//                 {/* Decorative Elements */}
//                 <div className="absolute -top-4 -left-4 w-24 h-24 bg-pink-200 rounded-full opacity-50 blur-lg"></div>
//                 <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-pink-300 rounded-full opacity-50 blur-lg"></div>
//                 <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-100 to-transparent opacity-40 rounded-full transform translate-x-16 -translate-y-16"></div>

//                 <div className="text-center mb-8 relative">
//                     {/* Sparkles */}
//                     <div className="absolute -top-2 left-12 text-pink-400 transform rotate-45">✦</div>
//                     <div className="absolute top-6 right-16 text-pink-300 transform -rotate-12">✦</div>
                    
//                     {/* Main Icon */}
//                     <div className="mx-auto w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
//                         <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                         </svg>
//                     </div>

//                     <h2 className="text-3xl font-bold text-gray-800 mb-2">
//                         Reset Password
//                     </h2>
//                     <p className="text-gray-600 text-sm px-4">
//                         Please enter your new password below
//                     </p>
//                 </div>

//                 {message && (
//                     <div className="mb-6 text-green-600 bg-green-50 border-2 border-green-200 p-4 rounded-xl flex items-center">
//                         <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                         </svg>
//                         <span className="font-medium">{message}</span>
//                     </div>
//                 )}

//                 {error && (
//                     <div className="mb-6 text-red-600 bg-red-50 border-2 border-red-200 p-4 rounded-xl flex items-center">
//                         <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                         </svg>
//                         <span className="font-medium">{error}</span>
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
//                     <div className="relative">
//                         <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                             New Password
//                         </label>
//                         <div className="relative group">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                 <svg className="h-5 w-5 text-pink-400 group-hover:text-pink-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                                 </svg>
//                             </div>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 className="w-full pl-10 pr-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 hover:border-pink-300 bg-white bg-opacity-80 backdrop-blur-sm"
//                                 placeholder="Enter new password"
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <div className="relative">
//                         <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                             Confirm Password
//                         </label>
//                         <div className="relative group">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                 <svg className="h-5 w-5 text-pink-400 group-hover:text-pink-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                                 </svg>
//                             </div>
//                             <input
//                                 type="password"
//                                 id="confirmPassword"
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                                 className="w-full pl-10 pr-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 hover:border-pink-300 bg-white bg-opacity-80 backdrop-blur-sm"
//                                 placeholder="Confirm your password"
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <button 
//                         type="submit"
//                         disabled={isLoading}
//                         className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-4 rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
//                     >
//                         <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
//                         {isLoading ? (
//                             <div className="flex items-center justify-center">
//                                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                 </svg>
//                                 Processing...
//                             </div>
//                         ) : (
//                             "Reset Password"
//                         )}
//                     </button>
//                 </form>

//                 {/* Bottom Decorative Wave */}
//                 <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 rounded-b-2xl"></div>
//             </div>
//         </div>
//     );
// };

// export default ResetPassword;



import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/v1/users/resetpassword/${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });
            const data = await response.json();
            if (response.ok) {
                setError('');
                setMessage('Password reset successfully. Redirecting to login page...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(data.error || 'Failed to reset password.');
                setMessage('');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            setMessage('');
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center -mt-16 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200 rounded-full opacity-50 blur-lg"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-300 rounded-full opacity-50 blur-lg"></div>
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-transparent opacity-40 rounded-full transform translate-x-16 -translate-y-16"></div>

                <div className="text-center mb-8 relative">
                    {/* Sparkles */}
                    <div className="absolute -top-2 left-12 text-blue-400 transform rotate-45">✦</div>
                    <div className="absolute top-6 right-16 text-blue-300 transform -rotate-12">✦</div>
                    
                    {/* Main Icon */}
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Reset Password
                    </h2>
                    <p className="text-gray-600 text-sm px-4">
                        Please enter your new password below
                    </p>
                </div>

                {message && (
                    <div className="mb-6 text-green-600 bg-green-50 border-2 border-green-200 p-4 rounded-xl flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{message}</span>
                    </div>
                )}

                {error && (
                    <div className="mb-6 text-red-600 bg-red-50 border-2 border-red-200 p-4 rounded-xl flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter new password"
                            required
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Processing..." : "Reset Password"}
                    </button>
                </form>

                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-b-2xl"></div>
            </div>
        </div>
    );
};

export default ResetPassword;

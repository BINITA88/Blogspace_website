// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { axiosInstance } from "../../lib/axios";
// import toast from "react-hot-toast";
// import { Loader } from "lucide-react";

// const LoginForm = () => {
// 	const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");
// 	const queryClient = useQueryClient();

// 	const { mutate: loginMutation, isLoading } = useMutation({
// 		mutationFn: (userData) => axiosInstance.post("/auth/login", userData),
// 		onSuccess: (res) => {
// 			// ✅ Corrected: use res.data
// 			const { token, userData } = res.data;

	
// 			toast.success("Logged in successfully!");
// 			queryClient.invalidateQueries({ queryKey: ["authUser"] });
// 		},
// 		onError: (err) => {
// 			toast.error(err.response?.data?.message || "Something went wrong");
// 		},
// 	});

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		loginMutation({ username, password });
// 	};

// 	return (
// 		<form onSubmit={handleSubmit} className='space-y-4 w-full max-w-md'>
// 			<input
// 				type='text'
// 				placeholder='Username'
// 				value={username}
// 				onChange={(e) => setUsername(e.target.value)}
// 				className='input input-bordered w-full'
// 				required
// 			/>
// 			<input
// 				type='password'
// 				placeholder='Password'
// 				value={password}
// 				onChange={(e) => setPassword(e.target.value)}
// 				className='input input-bordered w-full'
// 				required
// 			/>

// 			<button
//   type='submit'
//   className='w-full bg-[#159A9C] hover:bg-[#128a8c] text-white py-2 px-4 rounded disabled:opacity-50'
//   disabled={isLoading}
// >
//   {isLoading ? <Loader className='size-5 animate-spin' /> : "Login"}
// </button>

// 		</form>
// 	);
// };

// export default LoginForm;

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { axiosInstance } from "../../lib/axios";
// import toast from "react-hot-toast";
// import { Loader } from "lucide-react";

// const LoginForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const queryClient = useQueryClient();

//   const { mutate: loginMutation, isLoading } = useMutation({
//     mutationFn: (userData) => axiosInstance.post("/auth/login", userData),
//     onSuccess: (res) => {
//       const { token, userData } = res.data;
//       toast.success("Logged in successfully!");
//       queryClient.invalidateQueries({ queryKey: ["authUser"] });
//     },
//     onError: (err) => {
//       toast.error(err.response?.data?.message || "Something went wrong");
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     loginMutation({ username, password });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         className="input input-bordered w-full text-xl py-4 px-4"
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="input input-bordered w-full text-xl py-4 px-4"
//         required
//       />
//       <button
//         type="submit"
//         className="w-full bg-[#159A9C] hover:bg-[#128a8c] text-white text-xl py-4 px-5 rounded disabled:opacity-50"
//         disabled={isLoading}
//       >
//         {isLoading ? <Loader className="size-5 animate-spin" /> : "Login"}
//       </button>
//     </form>
//   );
// };

// export default LoginForm;

// ......................................................newww......................................
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginMutation, isLoading } = useMutation({
    mutationFn: (userData) => axiosInstance.post("/auth/login", userData),
    onSuccess: (res) => {
      const { token, userData } = res.data;

      // Save token
      localStorage.setItem("token", token);

      // Refetch user data
      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      toast.success("Logged in successfully!");

      // Navigate based on role
      if (String(userData.role) === "1") {
        navigate("/dash");
      } else if (String(userData.role) === "0") {
        navigate("/");
      } else {
        navigate("/"); // fallback
      }
    },
  
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input input-bordered w-full text-xl py-4 px-4"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full text-xl py-4 px-4"
        required
      />
      <button
        type="submit"
        className="w-full bg-[#159A9C] hover:bg-[#128a8c] text-white text-xl py-4 px-5 rounded disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? <Loader className="size-5 animate-spin" /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;



// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { axiosInstance } from "../../lib/axios";
// import toast from "react-hot-toast";
// import { Loader } from "lucide-react";

// const LoginForm = () => {
// 	const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [role, setRole] = useState(0); // 0 = user, 1 = admin
// 	const queryClient = useQueryClient();

// 	const { mutate: loginMutation, isLoading } = useMutation({
// 		mutationFn: (userData) => axiosInstance.post("/auth/login", userData),
// 		onSuccess: (res) => {
// 			const { token, userData } = res.data;

// 			localStorage.setItem("token", token);
// 			localStorage.setItem("user", JSON.stringify(userData));

// 			toast.success(`Logged in as ${role === 0 ? "User" : "Admin"} successfully!`);
// 			queryClient.invalidateQueries({ queryKey: ["authUser"] });
// 		},
// 		onError: (err) => {
// 			toast.error(err.response?.data?.message || "Something went wrong");
// 		},
// 	});

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		loginMutation({ username, password, role }); // send numeric role to backend
// 	};

// 	return (
// 		<div className='space-y-6 w-full max-w-md mx-auto'>
// 			<div className='flex justify-center gap-4'>
// 				<button
// 					type='button'
// 					onClick={() => setRole(0)}
// 					className={`btn ${role === 0 ? "btn-primary" : "btn-outline"}`}
// 				>
// 					Login as User
// 				</button>
// 				<button
// 					type='button'
// 					onClick={() => setRole(1)}
// 					className={`btn ${role === 1 ? "btn-primary" : "btn-outline"}`}
// 				>
// 					Login as Admin
// 				</button>
// 			</div>

// 			<form onSubmit={handleSubmit} className='space-y-4'>
// 				<input
// 					type='text'
// 					placeholder='Username'
// 					value={username}
// 					onChange={(e) => setUsername(e.target.value)}
// 					className='input input-bordered w-full'
// 					required
// 				/>
// 				<input
// 					type='password'
// 					placeholder='Password'
// 					value={password}
// 					onChange={(e) => setPassword(e.target.value)}
// 					className='input input-bordered w-full'
// 					required
// 				/>
// 				<button type='submit' className='btn btn-primary w-full' disabled={isLoading}>
// 					{isLoading ? <Loader className='size-5 animate-spin' /> : `Login as ${role === 0 ? "User" : "Admin"}`}
// 				</button>
// 			</form>
// 		</div>
// 	);
// };

// export default LoginForm;

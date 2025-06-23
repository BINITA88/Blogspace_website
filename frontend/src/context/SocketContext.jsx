// import { createContext, useState, useEffect, useContext } from "react";
// import io from "socket.io-client";

// const SocketContext = createContext();

// export const useSocketContext = () => useContext(SocketContext);

// export const SocketContextProvider = ({ children }) => {
//   const [authUser] = useState(() => {
//     const storedUser = localStorage.getItem("jwt");
//     console.log("Stored User:", storedUser); // Log the stored user for debugging
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   const [socket, setSocket] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);

//   useEffect(() => {
//     console.log("authUser:", authUser); // Log the authUser for debugging
//     if (authUser) {
//       const socketInstance = io("/api", {
//         query: { userId: authUser._id },
//       });

//       setSocket(socketInstance);

//       socketInstance.on("getOnlineUsers", (users) => setOnlineUsers(users));

//       return () => socketInstance.close();
//     } else {
//       // Close the existing socket connection if authUser is null
//       if (socket) {
//         socket.close();
//         setSocket(null);
//       }
//     }
//   }, [authUser]); // Dependency on authUser, to rerun when it's updated

//   return (
//     <SocketContext.Provider value={{ socket, onlineUsers }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };




import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

   const [authUser] = useState(() => {
        const storedUser = localStorage.getItem("jwt");
        console.log("Stored authUser:", storedUser); // Log the stored user for debugging
        return storedUser ? JSON.parse(storedUser) : null;
      });

  useEffect(() => {
  console.log("authUser:", authUser); // Log the authUser for debugging
  if (authUser) {
    const socketInstance = io("/api", {
      query: { userId: authUser._id },
    });

    setSocket(socketInstance);

    socketInstance.on("getOnlineUsers", (users) => setOnlineUsers(users));

    return () => socketInstance.close();
  } else {
    // Close the existing socket connection if authUser is null
    if (socket) {
      socket.close();
      setSocket(null);
    }
  }
}, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};


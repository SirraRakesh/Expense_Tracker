import React from "react";
import { useEffect } from "react";

import { useContext, createContext, useState } from "react";

const DataContext = createContext();

function DataProvider({ children }) {
  const [data, setData] = useState([
    {
      type: "",
      category: "",
      money: 0,
      product: "",
      date: "",
    },
  ]);
  useEffect(() => {
    const localData = localStorage.getItem("data");
    console.log(data, "context");

    if (localData?.length > 1) {
      const parsedData = JSON.parse(localData);
      if (JSON.stringify(parsedData) !== JSON.stringify(data)) {
        setData(parsedData);
      }
    } else {
      localStorage.setItem("data", JSON.stringify(data));
      console.log(data);
    }
  }, []);

  return (
    <DataContext.Provider value={[data, setData]}>
      {children}
    </DataContext.Provider>
  );
}
const useData = () => useContext(DataContext);

export { DataProvider, useData };

// import { useState, useEffect, useContext, createContext } from "react";
// import axios from "axios";
// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     user: null,
//     token: "",
//   });
//   //default header
//   console.log(auth);
//   axios.defaults.headers.common["Authorization"] = auth?.token;
//   useEffect(() => {
//     const user_data = localStorage.getItem("auth");
//     if (user_data) {
//       const parseData = JSON.parse(user_data);
//       setAuth({
//         ...auth,
//         user: parseData.userdata,
//         token: parseData.token,
//       });
//     }
//   }, []);

//   // console.log(auth);
//   return (
//     <AuthContext.Provider value={[auth, setAuth]}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);
// export { useAuth, AuthProvider };

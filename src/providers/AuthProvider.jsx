import React, { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = (props) => {
  const [user, setUser] = useState();
  const { children } = props;
  const [loading, setLoading] = useState(true);

  const volunteerLogin = async (username, password) => {
    const userResponse = await fetch("/api/volunteer/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (userResponse.ok) {
      const userData = await userResponse.json();
      setUser(userData);
      // set the token to a cookie

      return true;
    } else {
      setUser(null);
      return false;
    }
  };
  const companyLogin = async (username, password) => {
    const userResponse = await fetch("/api/company/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (userResponse.ok) {
      const userData = await userResponse.json();
      setUser(userData);
      return true;
    } else {
      setUser(null);
      return false;
    }
  };
  const logout = async () => {
    const logoutResponse = await fetch("/api/logout", { method: "POST" });
    if (logoutResponse.ok) setUser(null);
  };

  //   useEffect(() => {
  //     const getUser = async () => {
  //       const userResponse = await fetch("/api/");
  //       if (userResponse.ok) {
  //         const userData = await userResponse.json();
  //         setUser(userData);
  //       } else {
  //         setUser(null);
  //       }
  //       setLoading(false);
  //     };
  //     getUser();
  //   }, []);

  const contextValue = {
    logout,
    volunteerLogin,
    companyLogin,
    user,
    setUser,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

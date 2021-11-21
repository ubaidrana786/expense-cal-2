import React, { useState, useEffect } from "react";

import { auth, db } from "../firebase";
const AuthContext = React.createContext({
  isLoggedIn: false,
});
export const AuthContextProvider = (props) => {
  const [user, setuser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setuser(user);
    });
  }, []);

  const userIsLoggedIn = user;

  const contextValue = {
    isLoggedIn: userIsLoggedIn,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;

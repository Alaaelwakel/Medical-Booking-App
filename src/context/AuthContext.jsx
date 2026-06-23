import {
  createContext,
  useState,
  useEffect
} from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

  }, []);



  const login = async (email, password) => {

    const fakeToken =
      "medical-token-" + Date.now();

    const authData = {

      name: "Patient User",

      email,

      role: "patient",

      token: fakeToken

    };


    localStorage.setItem(
      "user",
      JSON.stringify(authData)
    );

    setUser(authData);

    return authData;
  };



  const logout = () => {

    localStorage.removeItem("user");

    setUser(null);

  };



  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}

export default AuthProvider;
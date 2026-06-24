import {
  createContext,
  useState,
  useEffect
} from "react";


import {
  loginApi,
  registerApi
} from "../api/authApi";



export const AuthContext = createContext();




function AuthProvider({ children }) {



  const [user, setUser] = useState(null);



  useEffect(()=>{


    const savedUser =
      localStorage.getItem("user");


    if(savedUser){

      setUser(
        JSON.parse(savedUser)
      );

    }


  },[]);





  const login = async(
    email,
    password
  )=>{


    const userData =
      await loginApi(
        email,
        password
      );



    const authData = {


      ...userData,


      token:
      "medical-token-" + Date.now()


    };




    localStorage.setItem(

      "user",

      JSON.stringify(authData)

    );



    setUser(authData);



    return authData;



  };







  const register = async(userData)=>{



    const newUser =
      await registerApi(
        userData
      );




    const authData = {



      ...newUser,



      token:
      "medical-token-" + Date.now()



    };





    localStorage.setItem(

      "user",

      JSON.stringify(authData)

    );




    setUser(authData);




    return authData;



  };









  const logout = ()=>{



    localStorage.removeItem(
      "user"
    );



    setUser(null);



  };








  return (



    <AuthContext.Provider


      value={{
        user,
        login,
        register,
        logout
      }}


    >


      {children}


    </AuthContext.Provider>



  );



}




export default AuthProvider;
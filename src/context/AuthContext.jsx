import {
  createContext,
  useState,
  useEffect
} from "react";


export const AuthContext = createContext();



function AuthProvider({ children }) {


  const [user, setUser] = useState(null);



  useEffect(()=>{

    const savedUser =
      localStorage.getItem("user");


    if(savedUser){

      setUser(JSON.parse(savedUser));

    }


  },[]);




  const login = async(email,password)=>{


    const response = await fetch(
      `http://localhost:5000/users?email=${email}&password=${password}`
    );


    const data = await response.json();



    if(data.length === 0){

      throw new Error("Invalid");

    }




    const authData = {

      ...data[0],

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


    const response = await fetch(
      "http://localhost:5000/users",
      {

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },


        body:JSON.stringify(userData)

      }
    );



    const newUser =
      await response.json();




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


    localStorage.removeItem("user");

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
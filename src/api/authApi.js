import api from "./axios";


export const loginApi = async (
  email,
  password
) => {

  const res = await api.get(
    `/users?email=${email}`
  );


  if (res.data.length === 0) {

    throw new Error(
      "Invalid email or password"
    );

  }


  const user = res.data[0];


  if (user.password !== password) {

    throw new Error(
      "Invalid email or password"
    );

  }


  return user;

};





export const registerApi = async (user) => {

  const existingUser = await api.get(
    `/users?email=${user.email}`
  );


  if (existingUser.data.length > 0) {

    throw new Error(
      "Email already exists"
    );

  }


  const res = await api.post(
    "/users",
    user
  );


  return res.data;

};
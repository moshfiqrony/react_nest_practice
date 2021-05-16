import React, { Fragment } from "react";
import { useQuery, useQueryClient } from "react-query";
import { DangerButton } from "../components/Buttons";
import { getUser, loginUser, logoutUser, registerUser } from "../services/User.service";
import LoginForm from "./Login";
import RegisterForm from "./Register";

const ClientApp = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: "user",
    queryFn: getUser,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const queryClient = useQueryClient();

  const handleRegister = async (
    username: string,
    password: string,
    email: string
  ) => {
    const response = await registerUser(username, email, password);
    if (response?.ok) {
      alert("Registration successful");
    } else {
      alert("Registration unsuccessful");
    }
  };

  const handleLogin = async (username: string, password: string) => {
    const response = await loginUser(username, password);
    if (response?.ok) {
      localStorage.setItem("token", response.data.access_token);
      queryClient.invalidateQueries("user");
    } else {
      alert("Login unsuccessful");
    }
  };

  const handleLogout = async() => {
    const response = await logoutUser();
    console.log('logout response', response);
    if(response.ok){
      localStorage.clear();
      queryClient.invalidateQueries("user");
    }
  }

  const state = data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Fragment>
        {state && (
          <div>
            <h1>Logged in user:</h1>
            <p>Username: {state.username}</p>
            <p>Email: {state.email}</p>
            <p>Is active: {state.isActive.toString()}</p>
            <div style={{width: 100}}>
              <DangerButton name="Logout" onClick={handleLogout}/>
            </div>
          </div>
        )}

        <div className="container">
          <div className="row">
            <div className="col-6">
              {!state && (
                <div>
                  <RegisterForm onSubmit={handleRegister} />
                </div>
              )}
            </div>
            <div className="col-6">
              {!state && (
                <div>
                  <LoginForm onSubmit={handleLogin} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
};

export default ClientApp;

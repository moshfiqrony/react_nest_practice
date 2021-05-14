import React, { Fragment } from "react";
import { useQuery } from "react-query";
import LoginForm from "./Login";
import RegisterForm from "./Register";

const ClientApp = () => {
    const { data, error, isLoading } = useQuery("user", () =>
      fetch(`http://localhost:8000/api/me`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json())
    );
  
    const handleRegister = (
      username: string,
      password: string,
      email: string
    ) => {
      fetch(
        `http://localhost:8000/api/auth/register?username=${username}&email=${email}&password=${password}`,
        {
          method: "POST",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    };
  
    const handleLogin = (username: string, password: string) => {
      fetch(
        `http://localhost:8000/api/auth/login?username=${username}&password=${password}`,
        {
          method: "POST",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem("token", res.access_token);
        })
        .catch((err) => console.log(err));
    };
  
    const state = data?.data;
  
    if (isLoading) {
      return <div>Loading...</div>;
    } else {
      return (
        <Fragment>
          {state.username && <div>{state.username}</div>}
          {state.username === null && (
            <div>
              <RegisterForm onSubmit={handleRegister} />
            </div>
          )}
          {state.username === null && (
            <div>
              <LoginForm onSubmit={handleLogin} />
            </div>
          )}
        </Fragment>
      );
    }
  };


  export default ClientApp
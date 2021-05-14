import React, { Fragment } from "react";
import { useQuery } from "react-query";
import LoginForm from "./Login";
import RegisterForm from "./Register";

const ClientApp = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: 'user',
    queryFn: () =>
      fetch(`http://localhost:8000/api/me`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json()),
      retry: false,
      refetchOnWindowFocus: false
  });

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
        {state && (
          <div>
            <h1>Logged in user:</h1>
            <p>Username: {state.username}</p>
            <p>Email: {state.email}</p>
            <p>Is active: {state.isActive.toString()}</p>
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

import React, { Fragment, useEffect, useState } from "react";
import Input from "../components/Input";

const App = () => {
  const [state, setState] = useState({
      username: null
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token") || '';
      if(token.length > 0){
        fetchUser(token);
      }
    }
  }, []);

  const fetchUser = (token: string) => {
    fetch(`http://localhost:8000/api/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => console.log(err));
  };

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
        fetchUser(res.access_token);
        localStorage.setItem("token", res.access_token);
      })
      .catch((err) => console.log(err));
  };

  
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
};

export const RegisterForm = ({
  onSubmit = (username: string, password: string, email: string) => {},
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <h3>Register</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(username, password, email);
        }}
      >
        <div>
          <p>Username: </p>
          <Input
            value={username}
            type="text"
            onChange={(e: any) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <p>Email: </p>
          <Input
            value={email}
            type="email"
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <p>Password: </p>
          <Input
            value={password}
            type="password"
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export const LoginForm = ({
  onSubmit = (username: string, password: string) => {},
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <h3>Login</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(username, password);
        }}
      >
        <div>
          <p>Username: </p>
          <Input
            value={username}
            type="text"
            onChange={(e: any) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <p>Password: </p>
          <Input
            value={password}
            type="password"
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default App;

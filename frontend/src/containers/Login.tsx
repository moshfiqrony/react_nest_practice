import React, { useState } from "react";
import Input from "../components/Input";

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

  export default LoginForm
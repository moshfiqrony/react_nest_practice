import React, { useState } from "react";
import Input from "../components/Input";

const RegisterForm = ({
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

  export default RegisterForm
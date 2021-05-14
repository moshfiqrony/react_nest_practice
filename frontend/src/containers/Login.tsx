import React, { useState } from "react";
import { PrimaryButton } from "../components/Buttons";
import Input from "../components/Input";

export const LoginForm = ({
    onSubmit = (username: string, password: string) => {},
  }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
      <div>
        <h3 className='text-center'>Login</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(username, password);
          }}
        >
          <div className='mb-3'>
            <p>Username: </p>
            <Input
              value={username}
              type="text"
              onChange={(e: any) => setUsername(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <p>Password: </p>
            <Input
              value={password}
              type="password"
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </div>
          <div className='text-center'>
            <PrimaryButton name='Login' type="submit"/>
          </div>
        </form>
      </div>
    );
  };

  export default LoginForm
export const getUser = () =>
  localStorage.getItem("token")
    ? fetch(`http://localhost:8000/api/me`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json())
    : null;

export const registerUser = (
  username: string,
  email: string,
  password: string
) =>
  fetch(
    `http://localhost:8000/api/auth/register?username=${username}&email=${email}&password=${password}`,
    {
      method: "POST",
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));

export const loginUser = (username: string, password: string) =>
  fetch(
    `http://localhost:8000/api/auth/login?username=${username}&password=${password}`,
    {
      method: "POST",
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));

export const logoutUser = () =>
  fetch(`http://localhost:8000/api/auth/logout`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

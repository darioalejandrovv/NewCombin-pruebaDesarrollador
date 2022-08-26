import React, { useState, useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { IconButton, TextField } from "@mui/material";

const Login = (props) => {
  const url = process.env.REACT_APP_BACKEND_API_URL;

  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    try {
      const response = await axios.post(`${url}/auth`, admin);
      localStorage.setItem("JWT", response.data.token);
      props.setLogged(true);
    } catch (e) {
      props.setLogged(false);
      alert(`Error to signin. ${e.message}`);
    }
  };
  const handleChangeLogin = (e) => {
    e.persist();
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="texts-form col-12 mx-2">
        <TextField
          required
          className="mt-2 w-100"
          id="outlined-required"
          label="Email"
          onChange={handleChangeLogin}
          name="email"
          value={admin.email}
          variant="outlined"
        />
        <TextField
          required
          className="mt-2 w-100"
          id="outlined-required"
          label="Password"
          onChange={handleChangeLogin}
          name="password"
          value={admin.password}
          variant="outlined"
        />
      </div>
      <div className="col-12 justify-content-around d-flex">
        <IconButton
          className="w-auto"
          color="primary"
          aria-label="Login"
          component="label"
          onClick={() => login()}
        >
          <SaveIcon />
        </IconButton>
      </div>
    </>
  );
};

export default Login;

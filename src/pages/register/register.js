import React from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { fetchApi } from "../utils/fetchMock";

export const Register = () => {
  let navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState();

  const userNameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const regObj = {
      username,
      password,
    };

    fetchApi("http://localhost:8080/user/register", {method: "POST", body: regObj})
      .then((resp) => resp.json())
      .then((obj) => {
        console.log(obj);
        navigate(`/login`);
      });
  };

  return (
    <div>
      <div>
        <Box
          component="div"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          noValidate
          autoComplete="off"
        >
          <form id="ourform" onSubmit={handleSubmit}>
            <div>
              <TextField
                required
                type="username"
                id="outlined-required"
                label="Username"
                onChange={userNameHandler}
              />
            </div>
            <div>
              <TextField
                required
                type="password"
                id="outlined-required"
                label="Password"
                onChange={passwordHandler}
              />
            </div>
            <Button type="submit" variant="contained" color="primary" sx={{margin: '10px'}}>
              Register
            </Button>
            <Button type="submit" variant="contained"  onClick={()=>navigate("/login")} sx={{background: 'grey'}}>
              Click to Login
            </Button>
          </form>
        </Box>
      </div>
    </div>
  );
};

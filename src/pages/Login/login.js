import React from "react";

const Login1 = () => {
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleName = (e) => {
    setUserName(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handelSubmit = (e) => {
    const obj = {
      email: username,
      password: password,
    };
    fetch(`http://restapi.adequateshop.com/api/authaccount/login`, {
      method: "POST",
      body: obj,
    })
      .then((res) => res.json())
      .then((body) => console.log("success", body))
      .catch((err) => console.log("err", err));

    console.log(obj.email, obj.password);
  };

  return (
    <>
      <label>User Name</label>
      <input type="text" onChange={handleName} />
      <label>password</label>
      <input type="password" onChange={handlePassword} />
      <button type="submit" onClick={handelSubmit}>
        Login
      </button>
      <div></div>
    </>
  );
};
export default Login1;

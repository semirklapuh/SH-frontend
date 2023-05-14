import React, { useState } from "react";
import "./Login.css";
import LogoImage from "../../assets/Softhouse_Clanice.jpg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axiosHTTP from "../../http/http-common";

const Login = () => {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    let userCredentials = {
      username: username,
      pin: pin,
    };
    const response = axiosHTTP
      .post(`/DemoUser/authenticate-user`, JSON.stringify(userCredentials))
      .then(function (response) {
        console.log(response);
        Cookies.set("token", response.data, { expires: 1 });
        navigate("github");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="login__page">
      <div className="login__card">
        <img src={LogoImage} alt="logoImg" /*style={{display:"none"}}*/></img>
        <input
          className="login__username"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <input
          className="login__pin"
          placeholder="Pin"
          type="password"
          value={pin}
          onChange={(e) => {
            setPin(e.target.value);
          }}
        ></input>
        <button className="login__button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

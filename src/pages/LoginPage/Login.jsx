import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginEmial from "./LoginEmail";
// import { LoginGoogle } from "..";

import BackButton from "../../components/BackButton/BackButton";


const Login = () => {
  return (
    <>
      <BackButton to="-1" />
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-center">
            <LoginEmial />
          </div>
        </div>
        <div className="row">
          <div className="d-flex justify-content-center mt-3">
            {/* <LoginGoogle /> */}GOOGLE
          </div>
        </div>
      </div>
      <footer></footer>
    </>
  );
};

export default Login;

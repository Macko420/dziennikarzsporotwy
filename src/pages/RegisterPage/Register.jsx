// Signup.jsx
import React from "react";
import RegisterEmail from "./RegisterEmail";
// import RegisterGoogle from "./RegisterGoogle";

import BackButton from "../../components/BackButton/BackButton";


const SignUp = () => {
  return (
    <>
      <BackButton to='/' />
      <div className="container">
        <div className="row">
        <div className="d-flex justify-content-center">
                <RegisterEmail />
            </div>
        </div>
        <div className="d-flex justify-content-center">
          {/* <RegisterGoogle /> */}GOOGLE
        </div>
      </div>
</>
      
   
  );
};

export default SignUp;

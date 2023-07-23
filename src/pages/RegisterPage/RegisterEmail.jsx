import { useRef, useState, useEffect } from "react";

import style from "./Register.module.css";

import { useNavigate, Link, useLocation } from "react-router-dom";
import { faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";

import "bootstrap";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{8,24}$/;
const PWD_REGEX = /^(?![@#$%\.])[\w!@#$%\.]{6,24}$/;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGISTER_URL = "/register";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.prevUrl || "/";

  const userRef = useRef();
  // const emailRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [passShown, setPassShown] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd, email }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(response?.data);
      // console.log(response?.accessToken);
      // console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPwd("");
      setMatchPwd("");
      setEmail("");
      navigate("/login", { state: { prevUrl: from } });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username or email taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <section className="w-3/6">
        <h1 className="text-center mb-5">Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mx-auto border border-black rounded shadow-sm px-8 pt-6 pb-8 mb-4 items-center"
        >
          <p
            ref={errRef}
            className={errMsg ? `${style.errmsg}` : `${style.offscreen}`}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          {/* username*/}
          <label
            htmlFor="username"
            className="w-100 block text-gray-700 text-sm font-bold mb-1.5"
          >
            Username:
            <FontAwesomeIcon
              icon={faCheck}
              className={validName ? `${style.valid}` : `${style.hide}`}
            />
          </label>
          <input
            type="text"
            id="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="uidnote"
            className={
              user && !validName ? "denger w-full" : `${style.offscreen}`
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Nazwa może zawierać od 4 do 24 znaków. <br />
            Musi zaczynać się od litery. <br />
            Litery, cyfry, podkreślenia, myślniki dozwolone.
          </p>

          {/* email */}
          <label
            htmlFor="email"
            className="w-100 block text-gray-700 text-sm font-bold mb-1.5 mt-3"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            // ref={emailRef}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          ></input>

          {/* passwd */}
          <label
            htmlFor="password"
            className="w-100 block text-gray-700 text-sm font-bold mb-1.5 mt-3"
          >
            Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validPwd ? `${style.valid}` : `${style.hide}`}
            />
          </label>
          <input
            type={passShown ? "text" : "password"}
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "w-full" : `${style.offscreen}`}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Hasło powinno mieć od 6 do 24 znaków. <br />
            Może zawierać małe i duże litery, cyfry i znaki specjalne{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span> <span aria-label="dot">.</span>
          </p>

          {/* confirm passw */}
          <label
            htmlFor="confirm_pwd"
            className="w-100 block text-gray-700 text-sm font-bold mb-1.5 mt-3"
          >
            Confirm Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={
                validMatch && matchPwd ? `${style.valid}` : `${style.hide}`
              }
            />
          </label>
          <input
            type={passShown ? "text" : "password"}
            id="confirm_pwd"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p
            id="confirmnote"
            className={
              matchFocus && !validMatch ? "w-full" : `${style.offscreen}`
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Musi być identyczne z hasłem.
          </p>

          <button
            type="button"
            onClick={() => {
              setPassShown(!passShown);
            }}
            className="w-4/5 mt-3 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Show Password
          </button>

          <button
            type="submit"
            className="w-100 mt-3 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            disabled={
              !validName || !validPwd || !validMatch || !validEmail
                ? true
                : false
            }
          >
            Sign Up
          </button>

          <p className="text-gray-700 text-s mt-2">
            Masz już konto?&nbsp;
            <Link to="/login" className="text-black">
              Login
            </Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Register;

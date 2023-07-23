import { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import style from "./Login.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "../../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.prevUrl || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [passShown, setPassShown] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const email = response?.data?.email;
      const username = response?.data?.user;
      setAuth({ user: username, email, accessToken });
      localStorage.setItem("keep", true);
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
      // navigate(-1, { replace: true });
    } catch (err) {
      if (!err?.response) {
        console.log(err);
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <section>
        <h1 className="text-center mb-5">Sign In</h1>
        <form
          onSubmit={handleSubmit}
          className="w-100 mx-auto p-5 border border-black rounded shadow-sm"
        >
          <p
            ref={errRef}
            className={errMsg ? `${style.errmsg}` : `${style.offscreen}`}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <label className="font-weight-bold" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="shadow appearance-none border rounded form-control bg-transparent border-bottom border-black text-black"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />

          <label htmlFor="password" className="font-weight-bold mt-3">
            Password:
          </label>
          <input
            type={passShown ? "text" : "password"}
            className="shadow appearance-none border rounded form-control bg-transparent border-bottom border-black text-black"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <button
            type="button"
            onClick={() => {
              setPassShown(!passShown);
            }}
            className="bg-black text-white py-2 px-10 mt-4 w-100 rounded font-bold transition-colors duration-300 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          >
            Show Password
          </button>
          <button
            type="submit"
            className="bg-black text-white py-2 px-10 mt-4 w-100 rounded font-bold transition-colors duration-300 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          >
            Sign In
          </button>
          <p className="text-center text-gray-700 text-s mt-2">
            Potrzebujesz konta?&nbsp;
            <Link to="/register" className="text-black">
              Register
            </Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Login;

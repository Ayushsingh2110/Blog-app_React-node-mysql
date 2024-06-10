import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login_user } from "../redux/authSlice";
import axios from "axios";

const Login = ({ pageType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ActiveClass, setActiveClass] = useState(
    pageType === "register" ? "register" : "login"
  );
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [RetypePassword, setRetypePassword] = useState("");
  const [PassNotMatch, setPassNotMatch] = useState(false);
  function toggleClass() {
    setActiveClass(ActiveClass === "register" ? "login" : "register");
  }

  function checkPassword() {
    console.log(RetypePassword);
    if (password !== RetypePassword) {
      console.log("not match", password, RetypePassword);
      return setPassNotMatch(true);
    } else if (password === RetypePassword) {
      console.log("match", password, RetypePassword);
      return setPassNotMatch(false);
    }
  }

  useEffect(() => {
    checkPassword();
  }, [RetypePassword]);

  async function send_login_request(e) {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:5003/api/auth/login",
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.id) {
            dispatch(login_user(res.data));
            navigate("/");
          } else {
            alert("Login unsuccessful !!");
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err.message);
    }
  }

  async function send_signUp_request(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:5003/api/auth/register", {
          userName,
          email,
          password
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.id) {
            dispatch(login_user(res.data));
            navigate("/");
          } else {
            alert("Login unsuccessful !!");
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="login-body">
      <div
        className={
          ActiveClass === "register" ? "container active" : "container"
        }
      >
        <div className="form-container sign-up">
          <form>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setUserName(e.currentTarget.value)}
              value={userName}
            />
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.currentTarget.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.currentTarget.value)}
              value={password}
            />
            <input
              type="password"
              placeholder="retype password"
              onChange={(e) => {
                setRetypePassword(e.currentTarget.value);
              }}
              value={RetypePassword}
            />
            {PassNotMatch && <span>Password does not match</span>}
            <button type="submit" onClick={send_signUp_request}>
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form>
            <h1>Sign In</h1>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.currentTarget.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.currentTarget.value)}
              value={password}
            />
            <button onClick={send_login_request}>Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Already a member?</h1>
              <p>Then Sign In an keep Blogging !!</p>
              <Link to="/login">
                <button onClick={toggleClass}>Sign In</button>
              </Link>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Not one of us?</h1>
              <p>
                Then why to wait?, be part of the Team, register yourself and
                expolore a new world!
              </p>
              <Link to="/register">
                <button onClick={toggleClass}>Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

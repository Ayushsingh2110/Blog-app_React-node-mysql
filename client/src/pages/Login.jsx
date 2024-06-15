import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../redux/authSlice";
import axios from "axios";

const Login = ({ pageType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ActiveClass, setActiveClass] = useState(
    pageType === "register" ? "register" : "login"
  );

  const InitialRegisterForm = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const InitialErrors = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const InitialLoginForm = {
    email: "",
    password: "",
  };

  const [RegisterForm, setRegisterForm] = useState(InitialRegisterForm);
  const [LoginForm, setLoginForm] = useState(InitialLoginForm);
  const [Errors, setErrors] = useState(InitialErrors);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function toggleClass() {
    setRegisterForm(InitialRegisterForm)
    setLoginForm(InitialLoginForm)
    setErrors(InitialErrors);
    setIsSubmitted(false);
    setActiveClass(ActiveClass === "register" ? "login" : "register");
  }

  //whenever value of input changes, this function gets called first
  function handleChange(e) {
    if (ActiveClass === "register") {
      setRegisterForm({ ...RegisterForm, [e.target.name]: e.target.value });
    } else if (ActiveClass === "login") {
      setLoginForm({ ...LoginForm, [e.target.name]: e.target.value });
    }
  }

  function validateInput() {
    const newErrors = {};

    const usernameRegex = /^[a-zA-Z0-9]{3,8}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (ActiveClass === "register") {
      validateRegisterForm(newErrors, usernameRegex, emailRegex);
    } else if (ActiveClass === "login") {
      validateLoginForm(newErrors);
    }

    return newErrors;
  }

  function validateRegisterForm(newErrors, usernameRegex, emailRegex) {
    if (
      !RegisterForm.username &&
      !RegisterForm.email &&
      !RegisterForm.password &&
      !RegisterForm.reEnteredPassword
    ) {
      setErrors(InitialErrors);
      return;
    }

    newErrors.username = validateUsername(RegisterForm.username, usernameRegex);
    newErrors.email = validateEmail(RegisterForm.email, emailRegex);
    newErrors.password = validatePassword(RegisterForm.password);
    newErrors.confirmPassword = validateConfirmPassword(
      RegisterForm.password,
      RegisterForm.confirmPassword
    );
  }

  function validateUsername(username, regex) {
    if (!username) {
      return "Username is required";
    }
    if (!regex.test(username)) {
      return "Username must be 3-8 characters long, and should contain only alphabets[A-Z,a-z] and numbers[0-9].";
    }
    return "";
  }

  function validateEmail(email, regex) {
    if (!email) {
      return "Email is required";
    }
    if (!regex.test(email)) {
      return "Enter a valid Email";
    }
    return "";
  }

  function validatePassword(password) {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password should have more than 6 characters";
    }
    return "";
  }

  function validateConfirmPassword(password, confirmPassword) {
    if (!confirmPassword || password !== confirmPassword) {
      return "Confirm password doesn't match";
    }
    return "";
  }

  function validateLoginForm(newErrors) {
    newErrors.email = LoginForm.email ? "" : "Email is required";
    newErrors.password = LoginForm.password ? "" : "Password is required";
  }

  async function CheckErrors() {
    const liveErrors = await validateInput();
    setErrors({ ...Errors, ...liveErrors });
  }

  useEffect(() => {
    //CheckErrors gets called whenever a input changes or submit form button gets clicked, but not the first time when page loads
    //as we check that form submit button is clicked or not with the help of isSubmitted
    if (isSubmitted) {
      CheckErrors();
    }
  }, [RegisterForm, LoginForm, isSubmitted]);

  async function handleRegister(e) {
    e.preventDefault();
    setIsSubmitted(true);
    if (
      !Errors.username &&
      !Errors.password &&
      !Errors.email &&
      !Errors.confirmPassword &&
      RegisterForm.username &&
      RegisterForm.password &&
      RegisterForm.email &&
      RegisterForm.confirmPassword
    ) {
      try {
        await axios
          .post("http://localhost:5003/api/auth/register", RegisterForm)
          .then((res) => {
            console.log(res.data);
            if (res.data.id) {
              dispatch(loginUser(res.data));
              navigate("/");
            } else {
              alert("Login unsuccessful !!");
            }
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err.message);
      }
    } else {
      console.log("api no called !!");
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setIsSubmitted(true);
    if (
      LoginForm.email &&
      LoginForm.password &&
      !Errors.email &&
      !Errors.password
    ) {
      try {
        await axios
          .post("http://localhost:5003/api/auth/login", LoginForm, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.id) {
              dispatch(loginUser(res.data));
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
  }

  //component to display input errors, getting reused after every input field
  const InputError = ({ message }) => {
    return <p className="errorMessage">*{message}</p>;
  };

  return (
    <div className="login-body">
      <div
        className={
          ActiveClass === "register" ? "container active" : "container"
        }
      >
        <div className="form-container sign-up">
          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="username"
              name="username"
              value={RegisterForm.username}
              onChange={handleChange}
            />
            {ActiveClass === "register" && Errors.username && (
              <InputError message={Errors.username} />
            )}
            <input
              type="email"
              name="email"
              placeholder="email"
              value={RegisterForm.email}
              onChange={handleChange}
            />
            {ActiveClass === "register" && Errors.email && (
              <InputError message={Errors.email} />
            )}
            <input
              type="password"
              name="password"
              placeholder="password"
              value={RegisterForm.password}
              onChange={handleChange}
            />
            {ActiveClass === "register" && Errors.password && (
              <InputError message={Errors.password} />
            )}
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              value={RegisterForm.confirmPassword}
              onChange={handleChange}
            />
            {ActiveClass === "register" && Errors.confirmPassword && (
              <InputError message={Errors.confirmPassword} />
            )}
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={handleLogin}>
            <h1>Sign In</h1>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={LoginForm.email}
              onChange={handleChange}
            />
            {ActiveClass === "login" && Errors.email && (
              <InputError message={Errors.email} />
            )}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={LoginForm.password}
              onChange={handleChange}
            />
            {ActiveClass === "login" && Errors.password && (
              <InputError message={Errors.password} />
            )}
            <button type="submit">Sign In</button>
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

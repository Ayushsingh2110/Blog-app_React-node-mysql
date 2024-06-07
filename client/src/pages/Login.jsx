import React, { useState } from 'react'
import '../styles/Login.css'

const Login = () => {
  const [ActiveClass, setActiveClass] = useState(false);
  const [LoginInput, setLoginInput] = useState();
  const [SignUpInput, setSignUpInput] = useState({
    
  });
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [RetypePassword, setRetypePassword] = useState("");

  function toggleClass(){
    setActiveClass(!ActiveClass)
  }

  function send_login_request(){

  }
  
  function send_signUp_request(){

  }

  return (
    <div className="login-body">
    <div className={ActiveClass ? "container active" : "container"}>
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>
          <input type="text" placeholder="username" onChange={setUserName} value={UserName}/>
          <input type="email" placeholder="email" onChange={setEmail} value={Email}/>
          <input type="password" placeholder="password" onChange={setPassword} value={Password}/>
          <input type="password" placeholder="retype password" onChange={setRetypePassword} value={RetypePassword}/>
          <button onCLick={send_login_request}>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email" onChange={setEmail} value={Email}/>
          <input type="password" placeholder="Password" onChange={setPassword} value={Password}/>
          <button onCLick={send_signUp_request}>Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Already a member?</h1>
            <p>Then Sign In an keep Blogging !!</p>
            <button onClick={toggleClass}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Not one of us?</h1>
            <p>Then why to wait?, be part of the Team, register yourself and expolore a new world!</p>
            <button onClick={toggleClass}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  )
}

export default Login
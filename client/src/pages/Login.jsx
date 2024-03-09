import React, { useState } from 'react'
import '../styles/Login.css'

const Login = () => {
  const [ActiveClass, setActiveClass] = useState(false);

  function toggleClass(){
    setActiveClass(!ActiveClass)
  }

  return (
    <div className="login-body">
    <div className={ActiveClass ? "container active" : "container"}>
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>
          <input type="text" placeholder="username" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
          <h1>Sign In</h1>
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
          <button>Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Already a member?</h1>
            <p>Then Sign In an keep Blogging !!</p>
            <button className="hidden" onClick={toggleClass}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Not one of us?</h1>
            <p>Then why to wait?, be part of the Team, register yourself and expolore a new world!</p>
            <button className="hidden" onClick={toggleClass}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  )
}

export default Login
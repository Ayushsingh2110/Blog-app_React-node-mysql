import React from 'react'
import Cookie from "js-cookie"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/userDashboard.css"
const UserDashboard = () => {
  // const authToken = Cookie.get("Lekha_accessToken")
  // if(authToken === undefined){
  //   return <>User not Authorized</>
  // }else
  return (
    <div className="userDashboard-main">
      <div className="dashboard-content">
        <h1 className="welcome-msg">Welcome, User !</h1>
        <img className="dashboard-profile-img">
        </img>
        <div className="user-info">
        <span><FontAwesomeIcon icon="fa-solid fa-envelope"/>&nbsp;EMail</span>
        </div>
      </div>
      <div className="your-blog-area">
        <div className="your-blog-list">
          <h1>Your Blogs</h1>
          <div>

          </div>
        </div>
      </div>  
        
    </div>
  )
}

export default UserDashboard
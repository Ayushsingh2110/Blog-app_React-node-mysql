import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const current = useSelector((store) => store.auth);
  return (
    <header className="navbar py-2">
      <div className="nav_container">
        <div className="h-full grow m-auto">
          <Link to="/">
            <img
              src={require("../images/lekha-logo.png")}
              alt="Logo"
              className="h-full max-h-[50px]"
            />
          </Link>
        </div>
        <div className="flex flex-wrap justify-between gap-[10px] items-center">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          {current.user.id == undefined ? (
            <Link to="/login">
            <button>Login</button>
            </Link>
            
          ) : (
            <>
              <span>Ayush</span>
              <span>Logout</span>
              <span id="write" className="write">
                <Link className="link" to="/create-blog">
                  Write
                </Link>
              </span>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import React, { useState } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const current = useSelector((store) => store.auth);
  const [IsDrop, setIsDrop] = useState(false);
  const [SelectedCategory, setSelectedCategory] = useState("");
 
  const searchCategories = [
    "Art",
    "Science",
    "Cinema",
    "Technology",
    "Design",
    "Food",
  ];
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
        {/* Search bar starts */}
        <div className="search-bar">
          {/* Dropdown */}
          <div className="dropdown">
            <div className="dropdown-text">
              <span>{SelectedCategory || "Category"}</span>
              <FontAwesomeIcon
                icon="fa-solid fa-chevron-down"
                onClick={() => setIsDrop(!IsDrop)}
                rotation={IsDrop ? 180 : 0}
              />
            </div>
            <ul
              id="category-list"
              className={`dropdown-list ${IsDrop ? `show` : ``}`}
            >
              {searchCategories.map((category, index) => (
                <li className="dropdown-list-item" key={index} onClick={(e) => setSelectedCategory(e.target.innerText)}>
                  {category}
                </li>
              ))}
            </ul>
          </div>
          {/* Search box input */}
          <div className="search-box">
            <input
              type="text"
              id="search-input"
              placeholder={`Search in ${SelectedCategory}`}
            />
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-[10px] items-center">
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

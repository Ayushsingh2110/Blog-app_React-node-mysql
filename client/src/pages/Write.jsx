import React from "react";
import { useState, useEffect } from "react";
import "../styles/write.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const Write = () => {
  const [isAuthorized, setIsAuthorized] = useState(true);

  const { username } = useParams();

  function AuthorizeUser(accessToken){
    if(accessToken === undefined){
      return false;
    }
    return true;
  }

  const user = useSelector((state) => state.auth.user)
  
  const [BlogTitle, setBlogTitle] = useState("");
  const [BlogContent, setBlogContent] = useState("");
  const [BlogImage, setBlogImage] = useState(null);
  const [SelectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    //const lekha_access = Cookies.get("Lekha_accessToken")
    //setIsAuthorized(AuthorizeUser(lekha_access))
    console.log(username)
  }, []);

  if(!isAuthorized){
    return (
      <>
      <h1>Not Authorized</h1>
      </>
    )
  }

  function handleClick() {
    console.log(BlogContent)
  }

  return (
    <div className="flex justify-center">
      <div className="create_blog">
        <div className="content">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setBlogTitle(e.target.value)}
          />
          <div className="editorContainer">
            <ReactQuill
              className="editor"
              theme="snow"
              value={BlogContent}
              onChange={setBlogContent}
            />
          </div>
        </div>
        <div className="options">
          <div className="item">
            <h1>Publish</h1>
            <span>
              <b>Status: </b> Draft
            </span>
            <span>
              <b>Visibility: </b> Public
            </span>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              name=""
              onChange={(e) => setBlogImage(e.target.files[0])}
            />
            <label className="file" htmlFor="file">
              Upload Image
            </label>
            <div className="flex justify-between">
              <button className="cursor-pointer text-teal-700 bg-white border-teal-700 border-2 py-[3px] px-[5px]">
                Save as a draft
              </button>
              <button
                onClick={handleClick}
                className="cursor-pointer text-white bg-teal-700 border-teal-700 py-[3px] px-[5px]"
              >
                Publish
              </button>
            </div>
          </div>
          <div className="item">
            <h1>Category</h1>
            {categories.map((currentCategory) => {
              return (
                <div className="category" key={currentCategory}>
                  <input
                    type="radio"
                    checked={SelectedCategory === currentCategory}
                    name="cat"
                    value={currentCategory}
                    id={currentCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <label htmlFor={currentCategory}>{currentCategory}</label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;

const categories = ["Art", "Science", "Cinema", "Technology", "Design", "Food"];

import React from "react";

const Footer = () => {
  return (
    <footer className="py-[20px] mt-[100px] bg-[#dcffff] flex justify-center">
      <div className="flex justify-between w-[80%] items-center">
        <img
          src={require("../images/lekha-logo.png")}
          alt="logo"
          className="h-[50px] bg-transparent"
        />
        <span>Made by Ayush Singh</span>
      </div>
    </footer>
  );
};

export default Footer;

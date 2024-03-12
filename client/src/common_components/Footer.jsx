import React from 'react'

const Footer = () => {
  return (
    <footer className="p-[20px] mt-[100px] bg-[#dcffff] flex items-center justify-between">
      <img src={require('../images/lekha-logo.png')} alt="logo" className="h-[50px] bg-transparent"/>
      <span>
        Made by Ayush Singh
      </span>
    </footer>
  )
}

export default Footer
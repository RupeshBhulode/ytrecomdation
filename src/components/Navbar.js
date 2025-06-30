import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiSolidVideos } from "react-icons/bi";
import { MdTrendingUp } from "react-icons/md";
import { FaThumbsUp } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";

import "./Navbar.css";
import tubelensLogo from "./tubelens.png";
const Navbar = ({ onSelect }) => {
  const [active, setActive] = useState("Channel Info");

  const handleClick = (section) => {
    setActive(section);
    if (onSelect) {
      onSelect(section);
    }
  };

  const menuItems = [
    { label: "Channel Info", icon: <AiOutlineHome /> },
    { label: "Multi Video Trends", icon: <MdTrendingUp /> },
    { label: "Video Analysis", icon: <BiSolidVideos /> },
    { label: "Most Liked Comments", icon: <FaThumbsUp /> },
    { label: "Comment Threads", icon: <FaComments /> },
    { label: "About", icon: <FaInfoCircle /> },
  ];

  return (
    <nav className="sidebar">



<div className="logo-container">
    <img src={tubelensLogo} alt="TubeLens Logo" className="logo-image" />
    
  </div>




      <ul className="sidebar-list">
        {menuItems.map((item) => (
          <li
            key={item.label}
            className={
              active === item.label ? "sidebar-item active" : "sidebar-item"
            }
            onClick={() => handleClick(item.label)}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

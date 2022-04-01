import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import Sign from "./Sign";

const Header = () => {
  return (
    <div className="header">
      <div className="sidebar">
        <div className="logo">
          <Link className="logo__icon" to="/">
            <Logo />
          </Link>
        </div>
        <SideBar />
      </div>
      <Sign />
    </div>
  );
};

export default Header;

import React,{ useState } from "react";
import Popup from "react-animated-popup";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyIcon from '@mui/icons-material/Key';

import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.jpg";
import { useFetchUser } from "../hooks/fetch.hook";
import "./style.scss";

export default function Navigation(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [popup, setPopup] = useState(false);
  const token = localStorage.getItem("token");
  const [{ apiData, serverError }] = useFetchUser("/profile");

  if(serverError) localStorage.removeItem("token");

  const openNav = () => {
    document.getElementById("nav").style.transform = "translateY(0%)";
  };

  const closeNave = () => {
    document.getElementById("nav").style.transform = "translateY(-100%)";
  };

  const buttonHandler = () => {
    let type = localStorage.getItem("type");
    if(type === "Admin") {
      return navigate("/admin-panel");
    }
    return setPopup(true);
  }

  const scroll = (e) => {
    if (location.pathname !== "/") navigate("/");
    setTimeout(() => {
      if (window.innerWidth < 750)
        document.getElementById("nav").style.transform = "translateY(-100%)";
      const sh = document.getElementsByClassName("App")[0].scrollHeight;
      props.setScroll((sh / 7) * e + 20);
    }, 100);
  };

  const style = {
    position: "absolute",
    borderRadius: "1rem",
    padding: window.innerWidth > 750 ? "1rem" : "0.5rem",
    height: window.innerWidth > 750 ? "20rem" : "20rem",
    width: window.innerWidth > 750 ? "100%" : "90%",
    boxShadow: "0 0 10px black ",
    top: "50%"
  };

  return (
    <>
    <Popup
    className="upload-popup"
    style={style}
    visible={popup}
    onClose={() => setPopup(false)}
    animationDuration="200"
  >
    <LogoutPopup setVisible={setPopup} did={popup} image={apiData?.image}/>
  </Popup>

    <div className="navigation">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="logo">
        <div className="left">
          <img src={logo} alt="logo" />
          <div className="headding">
            <span>CAPITAL REGISTER OF</span>
            <span id="bold">SHIPPING</span>
          </div>
        </div>
        <div onClick={openNav} className="menu">
          <MenuIcon fontSize="large" />
        </div>
      </div>
      <div className="nav" id="nav">
        <div className="left">
          <img src={logo} alt="logo" />
          <div className="headding">
            <span>CAPITAL REGISTER OF</span>
            <span id="bold">SHIPPING</span>
          </div>
        </div>
        <div onClick={() => scroll(1)} className="navItem">
          About
        </div>
        <div onClick={() => scroll(2)} className="navItem">
          Services
        </div>
        <div onClick={() => scroll(3)} className="navItem">
          Blog
        </div>
        <div onClick={() => scroll(4)} className="navItem">
          Publications
        </div>
        <div onClick={() => scroll(5)} className="navItem">
          Career
        </div>
        <div onClick={() => scroll(6)} className="navItem">
          Contact
        </div>
        {!token && (
          <button onClick={() => navigate("/login")} type="button">
            Login
          </button>
        )}
        {token && (
          <img
            onClick={buttonHandler}
            id="avatar-image"
            src={apiData?.image || avatar}
            alt="avatar"
          />
        )}
        <div onClick={closeNave} className="navItem closeNav">
          <KeyboardArrowUpIcon />
        </div>
      </div>
    </div>
    </>
  );
}


const LogoutPopup = (props) => {
  const navigate = useNavigate();
  const style = {
    one: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%",
      gap: "1rem",
      padding: "0.5rem",
      borderRadius: "1rem",
      boxShadow: "0 0 10px black inset",
      alignItems: "center"
    },
    cover: {
      height: "8rem",
      width: "8rem",
      borderRadius: "50%",
      boxShadow: "0 0 10px black"
    },
    img: {
      height: "100%",
      width: "100%",
      borderRadius: "50%",
    },
    button: {
      display: "flex",
      flexDirection: "row",
      height: "1.8rem",
      width: "80%",
      borderRadius: "0.5rem",
      border: "none",
      boxShadow: "0 0 10px black",
      alignItems: "center",
      justifyContent: "center"
    }
  }
  const userLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    window.location.reload(true);
  };
  return(
    <>
    <button
    className="upload-popup-close"
    onClick={() => props.setVisible(false)}
  >
    <CloseIcon />
  </button>

    <div style={style.one} className="inner-popup-body">
      <div style={style.cover}>
        <img style={style.img} src={props.image || avatar} alt="" />
      </div>
      {/* <button style={style.button}><ManageAccountsIcon sx={{ fontSize: "1rem" }} />Edit profile</button> */}
      <button style={style.button} onClick={() => navigate("/change-password")}><KeyIcon sx={{ fontSize: "1rem" }} />Change password</button>
      <button style={style.button} onClick={userLogout}><LogoutIcon sx={{ fontSize: "1rem" }} />Logout</button>
    </div>
    </>
  );
}
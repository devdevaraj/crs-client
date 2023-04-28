import React from "react";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import logo from "../../assets/logo.svg";
import loading from "../../assets/loading.gif";
import coverImg from "../../assets/cover.png";
import { useFetchDoc } from "../../hooks/fetch.hook";

export default function View(props) {
  const { type, docId } = useParams();
  const navigate = useNavigate();
  const [{ isLoading, apiData }] = useFetchDoc(
    `/get-documents?dname=${type}&docId=${docId}`
  );
  const backButton = () => {
    if (props.userView) return navigate(`/`, { replace: true });
    if (props.all) return navigate(`/${type}`);
    return navigate(`/manage/${type}`, { replace: true });
  };
  return (
    <>
      <button onClick={backButton} className="universal-back-button">
        <ArrowBackIcon sx={{ fontSize: "1rem" }} />
        Back
      </button>
      <div className="menu-bar">
        <div className="logo">
          <img src={logo} alt="logo" />
          <div className="headding">
            <span>CAPITAL REGISTER OF</span>
            <span id="bold">SHIPPING</span>
          </div>
        </div>
      </div>

      <div className="assets-view">
        {isLoading ? (
          <div style={{ padding: 0 }} className="loading">
            <div className="loading-body">
              <img src={loading} alt="view"/>
            </div>
          </div>
        ) : (
          <div className="assets-view-body">
            <div className="assets-cover-image-container">
              <img
                src={(apiData && apiData[0]?.image) || coverImg}
                alt="cover"
              />
            </div>
            <div className="assets-body">
              <h1 className="view-title">{apiData && apiData[0]?.title}</h1>
              <p className="view-date">{apiData && apiData[0]?.date}</p>
              <p className="view-description">
                {apiData && apiData[0]?.document}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

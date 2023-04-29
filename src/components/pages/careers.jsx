import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./style.scss";
import loading from "../../assets/loading.gif";
import Navigation from "../navigation";
import { useFetchDoc } from "../../hooks/fetch.hook";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Careers(props) {
  const [{ isLoading, apiData }] = useFetchDoc(
    `/get-documents?dname=careers&doc=0`
  );
  const navigate = useNavigate();

  return (
    <>
      <div className="navigation">
        <Navigation setPage={props.setPage} setScroll={props.setScroll} />
      </div>
      {isLoading ? (
        <div style={{ paddingTop: "6rem" }} className="loading">
          <div className="loading-body">
            <img src={loading} alt="careers"/>
          </div>
        </div>
      ) : (
        <div className="careers-page pages">
          <div className="head">
            <div onClick={() => navigate("/")} className="back">
              <ArrowBackIcon sx={{ fontSize: "1rem" }} />
              {"back"}
            </div>
            <h2>ALL CAREER OPPRTUNITIES</h2>
          </div>
          <div className="page-body">
            {apiData?.map((item, index) => (
              <div key={index} className="box">
                <div className="image-container">
                  <img src={item.image} alt="cover" />
                </div>
                <div className="description">
                  <h3>{item.title}</h3>
                  <p>{item.date}</p>
                  <div className="link">
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/views-user/careers/${item._id}`}
                    >
                      <b>Learn more</b>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

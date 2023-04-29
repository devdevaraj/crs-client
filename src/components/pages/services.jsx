import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./style.scss";
import Navigation from "../navigation";
import loading from "../../assets/loading.gif";
import { useFetchDoc } from "../../hooks/fetch.hook";

export default function Services(props) {
  const [{ isLoading, apiData }] = useFetchDoc(
    `/get-documents?dname=services&doc=0`
  );
  const navigate = useNavigate();

  return (
    <>
      <div className="navigation">
        <Navigation setPage={props.setPage} setScroll={props.setScroll} />
      </div>
      {isLoading ? (
        <div className="loading">
          <div className="loading-body" style={{
          boxShadow: "none"
        }}>
            <img src={loading} alt="services"/>
          </div>
        </div>
      ) : (
        <div className="services-page">
          <div className="head">
            <div onClick={() => navigate("/")} className="back">
              <ArrowBackIcon sx={{ fontSize: "1rem" }} />
              {"back"}
            </div>
            <h2>ALL SERVICES</h2>
          </div>
          <div className="page-body-one">
            {apiData?.map((item, index) => (
              <div key={index} className="page-box">
                <div className="img-container">
                  <img src={item.image} alt="cover" />
                </div>
                <div className="description">
                  <h3>{item.title}</h3>
                  <p>{item.date}</p>
                  <div className="link">
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/views-user/services/${item._id}`}
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

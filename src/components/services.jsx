import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import "./style.scss";
import { useFetchDoc } from "../hooks/fetch.hook";

export default function Services(props) {
  const [{ apiData }] = useFetchDoc(
    "/get-documents?dname=services&limit=3&doc=0"
  );
  const navigate = useNavigate();
  return (
    <div className="services">
      <h2>SERVICES</h2>
      <div className="box">
        {apiData?.map((service, index) => (
          <div key={index} className="service">
            <div className="top">
              <img src={service.image} alt="Service cover" />
            </div>
            <div className="bottom">
              <div className="one">
                <h1>{service.title}</h1>
                <p>{service.date}</p>
              </div>
              <div className="two">
                <button
                  onClick={() => navigate(`/view-user/services/${service._id}`)}
                  className="learn-more"
                >
                  Learn more <ArrowForwardIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => navigate(`/services`)} type="button">
        {" "}
        more{" "}
      </button>
    </div>
  );
}

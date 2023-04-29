import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import { useFetchDoc } from "../hooks/fetch.hook";

export default function Career(props) {
  const [{ apiData }] = useFetchDoc("/get-documents?dname=careers&limit=4&doc=0");
  const navigate = useNavigate();

  return (
    <div className="career">
      <h1>CAREER OPPORTUNITIES</h1>
      <div className="career-body">
        {apiData?.map((career, index) => (
          <div key={index} className="career-item">
            <div className="career-image-container">
              <img src={career.image} alt="career-cover" />
            </div>
            <div className="career-body-container">
              <div className="inner">
                <h3>{career.title}</h3>
                <p>{career.date}</p>
              </div>
              <div className="inner bottom">
                <button onClick={() => navigate(`/view-user/careers/${career._id}`)} type="button" className="learn-more-button">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div onClick={() => navigate("/careers")} className="more">
        {"more"}
      </div>
    </div>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import { useFetchDoc } from "../hooks/fetch.hook";

export default function Blogs(props) {
  const [{ apiData }] = useFetchDoc("/get-documents?dname=blogs&limit=4&doc=0");
  const navigate = useNavigate();
  return (
    <div className="blogs">
      <h2>BLOGS</h2>
      <div className="blog-body">
        {apiData?.map((item, index) => (
          <div key={index} className="hor">
            <div className="blog-image-container">
              <img src={item.image} alt="blog cover" />
            </div>
            <div className="blog-description-container">
              <div className="one">
                <h3>{item.title}</h3>
                <p>{item.date}</p>
              </div>
              <div className="two">
                <button onClick={() => navigate(`/view-user/blogs/${item._id}`)} type="button">Read more</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div onClick={() => navigate("/blogs")} className="more">
        {"more"}
      </div>
    </div>
  );
}

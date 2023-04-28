import React from "react";
import { useFetchContent } from "../hooks/fetch.hook";

import background from "../assets/Picture 1 Edit 2 jpg.jpeg";
import "./style.scss";

export default function About(props) {
  const title = useFetchContent("About-headding");
  const des = useFetchContent("About-des");
  const img = useFetchContent("About-img");
  // const style = styleConverter(apiData?.props);
  return (
    <div className="about">
      <div className="left">
        <img src={(img && img[0]?.apiData?.content) || background} alt="about-img" />
      </div>
      <div className="right">
        <h1>    
        {title && title[0]?.apiData?.content}
      </h1>
      <p>
        {des && des[0]?.apiData?.content}
      </p>
      </div>
    </div>
  );
}


//Small Enough to Care Big Enough to Deliver


// Capital Register Class (CRS) is a marine classification society that helps 
// modernize the maritime industry by facilitating safer shipping, cleaner seas, 
// and improved standards for marine safety and environmental protection. 
// They provide inspection and certification services, act as a recognized 
// organization for flag state administrations, and perform certification of 
// management systems. Their technical expertise in marine technology can 
// be utilized for engineering new assets or modifying existing ones to meet 
// regulatory requirements.
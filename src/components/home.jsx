import React, { useEffect } from "react";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';

import "./style.scss";
import loading from "../assets/loading.gif";
import { useFetchDoc } from "../hooks/fetch.hook";

export default function Home(props) {
  const [{ isLoading, apiData }] = useFetchDoc(`/get-documents?image=1&limit=5`);
  useEffect(() => {
    const intarval = setInterval(() => {
      try {
        if (!isLoading && apiData) {
          let max = document.getElementById("homec-container")?.scrollLeftMax;
          let left = document.getElementById("homec-container")?.scrollLeft;
          let width = document.getElementById("homec-container")?.scrollWidth;
          if (left >= max) {
            document.getElementById("homec-container").scrollLeft = 0;
          } else {
            document.getElementById("homec-container").scrollLeft +=
              width / apiData.length;
          }
        }
      } catch (error) {
        clearInterval(intarval);
      }
    }, 4000);
  });
  const style = {
    borderRadius: "1rem",
    backgroundColor: "#777777",
    color: "white"
  }
  return (
    <div className="home-container">
      {isLoading ? (
        <div className="homec">
          <div
            style={{
              display: "grid",
              height: "100%",
              width: "100%",
              placeItems: "center",
            }}
            className="loading-body"
          >
            <img
              style={{
                mixBlendMode: "color-burn",
              }}
              src={loading}
              alt="home"
            />
          </div>
        </div>
      ) : (
        <div className="homec" id="homec-container">
          {apiData?.map(
            (item, index) =>
              item.image && (
                <div key={index} className="image-container">
                  <img src={item?.image} alt="" />
                </div>
              )
          )}
        </div>
      )}
      <div className="cover">
      <a href="https://crsclass-esims.floatsys.com/CRSClass/Account/Signin.aspx" target="_blank" rel="noreferrer">
        <button style={style}>Certificate verification</button>
      </a>
      
        <div className="s-media">
        <a href="https://www.facebook.com/profile.php?id=100083902624915" target="_blank" rel="noreferrer">
        <FacebookIcon sx={{ fontSize: "4rem", color: "#4267B2" }} />
        </a>
        <a href="https://www.linkedin.com/company/crsclass/" target="_blank" rel="noreferrer">
        <LinkedInIcon sx={{ fontSize: "4rem", color: "#0077b5" }} />
        </a>
        </div>
        
      <a href="https://crsclass-esims.floatsys.com/crsclass/frmCreateSurveyRequest.aspx" target="_blank" rel="noreferrer">
        <button style={style}>Classification request</button>
      </a>
      </div>
    </div>
  );
}

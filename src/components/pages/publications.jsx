import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import Popup from "react-animated-popup";

import "./style.scss";
import loading from "../../assets/loading.gif";
import Navigation from "../navigation";
import { useFetchDoc } from "../../hooks/fetch.hook";

export default function Publications(props) {
  const navigate = useNavigate();
  const [downloadPopup, setDownloadPopup] = useState(false);

  const docs = useFetchDoc("/get-documents?dname=files&doc=0");
  const priDocs = useFetchDoc("/get-private-docs?dname=files&doc=0");

  let data, isLoading;
  const token = localStorage.getItem("token");
  if (!token) {
    data = docs && docs[0].apiData;
    isLoading = docs && docs[0].isLoading;
  } else {
    data = priDocs && priDocs[0].apiData;
    isLoading = priDocs && priDocs[0].isLoading;
  }

  const style = {
    position: "absolute",
    borderRadius: "1rem",
    padding: window.innerWidth > 750 ? "1rem" : "0.5rem",
    height: window.innerWidth > 750 ? "50%" : "90%",
    width: "90%",
    boxShadow: "0 0 10px black ",
  };

  return (
    <>
      <Popup
        className="upload-popup"
        style={{ ...style, height: "12rem" }}
        visible={downloadPopup}
        onClose={() => setDownloadPopup(false)}
        animationDuration="200"
      >
        <DocumentDownload
          setVisible={setDownloadPopup}
          new={false}
          info={downloadPopup}
        />
      </Popup>

      <div className="navigation">
        <Navigation setPage={props.setPage} setScroll={props.setScroll} />
      </div>

      {isLoading ? (
        <div style={{ paddingTop: "6rem" }} className="loading">
          <div className="loading-body">
            <img src={loading} alt="publication"/>
          </div>
        </div>
      ) : (
        <div className="publications-page pages">
          <div className="head">
            <div onClick={() => navigate("/")} className="back">
              <ArrowBackIcon sx={{ fontSize: "1rem" }} />
              {"back"}
            </div>
            <h2>All publications</h2>
          </div>
          <div className="page-body">
            {data?.map((item, index) => (
              <div key={index} className="box">
                <div className="image-container">
                  <img src={item.image} alt="cover" />
                </div>
                <div className="description">
                  <h3>{item.title}</h3>
                  <p>{item.date}</p>
                  <div className="link">
                    <button onClick={() => setDownloadPopup(item)}>
                      Download <DownloadIcon />
                    </button>
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

const DocumentDownload = (props) => {
  let apiData;
  const pri = useFetchDoc(
    `/get-private-docs?dname=files&doc=1&docId=${props?.info?._id}`
  );
  const docs = useFetchDoc(
    `/get-documents?dname=files&doc=1&docId=${props?.info?._id}`
  );
  if (pri[0]?.apiData) {
    [{ apiData }] = pri;
  } else {
    [{ apiData }] = docs;
  }
  const Download = () => {
    if (apiData) {
      const doc = apiData[0].document;
      const a = document.createElement("a");
      a.href = doc;
      a.download = props?.info?.title;
      a.click();
      props.setVisible(false);
    }
  };
  return (
    <>
      <button
        className="upload-popup-close"
        onClick={() => props.setVisible(false)}
      >
        <CloseIcon />
      </button>
      <div className="upload-popup-body" style={{ padding: "1rem" }}>
        <h3 style={{ padding: "0rem" }}>Download document</h3>
        <div
          className="delete-confirmation"
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Are you sure you want to download {props?.info?.title} ?
        </div>
        <div
          className="delete-buttons"
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
          }}
        >
          <button
            onClick={Download}
            style={{
              height: "3rem",
              width: "6rem",
              fontSize: "1rem",
              borderRadius: "0.5rem",
              boxShadow: "0 0 10px black",
            }}
          >
            Download
          </button>
          <button
            onClick={() => props.setVisible(false)}
            style={{
              height: "3rem",
              width: "6rem",
              fontSize: "1rem",
              borderRadius: "0.5rem",
              boxShadow: "0 0 10px black",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

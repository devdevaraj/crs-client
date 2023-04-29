import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "react-animated-popup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import toast, { Toaster } from "react-hot-toast";

import "./style.scss";
import logo from "../../assets/logo.svg";
import loading from "../../assets/loading.gif";
import { useFetchDoc } from "../../hooks/fetch.hook";
import { removeDocument } from "../../helper/helper";

export default function Contacts(props) {
  const [{ isLoading, apiData }] = useFetchDoc(
    "/get-documents?dname=contacts&doc=0"
  );
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [viewPopup, setViewPopup] = useState(false);
  const editHandler = (props) => {
    navigate(`/contact-editor/${props}`);
  };
  const viewHandler = (props) => {
    setViewPopup(props);
  };

  const style = {
    position: "absolute",
    borderRadius: "1rem",
    padding: window.innerWidth > 750 ? "1rem" : "0.5rem",
    height: window.innerWidth > 750 ? "10rem" : "10rem",
    width: window.innerWidth > 750 ? "100%" : "90%",
    boxShadow: "0 0 10px black ",
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <Popup
        className="upload-popup"
        style={style}
        visible={popup}
        onClose={() => setPopup(false)}
        animationDuration="200"
      >
        <Delete setVisible={setPopup} type={"contacts"} did={popup} />
      </Popup>

      <Popup
        className="upload-popup"
        style={{ ...style, height: "50%" }}
        visible={viewPopup}
        onClose={() => setViewPopup(false)}
        animationDuration="200"
      >
        <View setVisible={setViewPopup} type={"contacts"} did={viewPopup} />
      </Popup>

      <div className="menu-bar">
        <div className="logo">
          <img src={logo} alt="logo" />
          <div className="headding">
            <span>CAPITAL REGISTER OF</span>
            <span id="bold">SHIPPING</span>
          </div>
        </div>
      </div>

      <div className="contact-manager">
        <div className="contact-manager-body">
          {isLoading ? (
            <div style={{ padding: 0, boxShadow: "none" }} className="loading">
              <div
                style={{ padding: 0, boxShadow: "none" }}
                className="loading-body"
              >
                <img src={loading} alt="contacts"/>
              </div>
            </div>
          ) : (
            <>
              <div className="item">
                <div className="inner top">
                  <button
                    onClick={() => navigate("/admin-panel", { replace: true })}
                    type="button"
                    className="button"
                  >
                    <ArrowBackIcon sx={{ fontSize: "1rem" }} />
                    Back
                  </button>
                  <h3>{`MANAGE CONTACTS`}</h3>
                </div>
                <div className="inner two">
                  <button
                    onClick={() => navigate(`/contact-creater`)}
                    type="button"
                    className="button"
                  >
                    <AddIcon sx={{ fontSize: "1rem" }} />
                    Add
                  </button>
                </div>
              </div>
              {apiData?.map((item, index) => (
                <div key={index} className="item">
                  <div className="index">{index}</div>
                  <div className="inner one">
                    <h4>{item.title}</h4>
                  </div>
                  <div className="inner two">
                    <button
                      onClick={() => editHandler(item._id)}
                      type="button"
                      className="button"
                    >
                      <EditIcon sx={{ fontSize: "1rem" }} />
                      Edit
                    </button>
                    <button
                      onClick={() => viewHandler(item._id)}
                      type="button"
                      className="button"
                    >
                      <VisibilityIcon sx={{ fontSize: "1rem" }} />
                      View
                    </button>
                    <button
                      onClick={() => setPopup(item.did)}
                      type="button"
                      className="button"
                    >
                      <DeleteIcon sx={{ fontSize: "1rem" }} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

const Delete = (props) => {
  const deleteHandler = () => {
    const deletePromise = removeDocument(props.did);
    toast.promise(deletePromise, {
      loading: "Deleting...!",
      success: <b>Deleted successfully...!</b>,
      errror: <b>Could not Delete!</b>,
    });
    deletePromise.then(() => {
      props.setVisible(false);
    });
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
        <h3
          style={{
            padding: "0rem",
          }}
        >
          Delete {props?.type.substring(0, props?.type.length - 1)}
        </h3>
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
          Are you sure you want to delete this{" "}
          {props?.type.substring(0, props?.type.length - 1)} ?
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
            onClick={deleteHandler}
            style={{
              height: "2.5rem",
              width: "6rem",
              fontSize: "1rem",
              borderRadius: "0.5rem",
              boxShadow: "0 0 10px black",
            }}
          >
            Delete
          </button>
          <button
            onClick={() => props.setVisible(false)}
            style={{
              height: "2.5rem",
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

const View = (props) => {
  const [{ apiData }] = useFetchDoc(
    `/get-documents?dname=contacts&docId=${props.did}`
  );
  return (
    <>
      <button
        className="upload-popup-close"
        onClick={() => props.setVisible(false)}
      >
        <CloseIcon />
      </button>
      <div className="upload-popup-body" style={{ padding: "1rem" }}>
        <h3
          style={{
            padding: "2rem",
          }}
        >
          {apiData && apiData[0].title}
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "1rem"
          }}
        >
          <span>
            <b>ADDRESS: </b>{" "}
            {apiData && apiData[0].document.split("add:")[1].split(";ph:")[0]}
            <br />
          </span>
          <span>
            <b>PHONE: </b>{" "}
            {apiData &&
              apiData[0]?.document.split(";ph:")[1].split(";mail:")[0]}
            <br />
          </span>
          <span>
            <b>EMAIL: </b>{" "}
            {apiData &&
              apiData[0]?.document.split(";mail:")[1].split(";lat:")[0]}
            <br />
          </span>
          <span>
            <b>LATITUDDE: </b>{" "}
            {apiData &&
              apiData[0]?.document.split(";lat:")[1].split(";lon:")[0]}
            <br />
          </span>
          <span>
            <b>LONGITUDE: </b>{" "}
            {apiData && apiData[0]?.document.split(";lon:")[1].split(";")[0]}
            <br />
          </span>
        </div>
      </div>
    </>
  );
};

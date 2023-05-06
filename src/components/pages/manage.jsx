import React, { useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Popup from "react-animated-popup";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./style.scss";
import logo from "../../assets/logo.svg";
import loading from "../../assets/loading.gif";
import { useFetchDoc } from "../../hooks/fetch.hook";
import { removeDocument } from "../../helper/helper";

export default function Manage(props) {
  const navigate = useNavigate();
  const { manage } = useParams();
  if (!["services", "blogs", "careers"].includes(manage))
    navigate("/pageNotFound", { replace: true });
  const [popup, setPopup] = useState(false);
  const [{ isLoading, apiData }] = useFetchDoc(
    `/get-private-docs?dname=${manage}`
  );

  const editHandler = (value) => {
    navigate(`/edit/${manage}/${value}`);
  };

  const viewHandler = (value) => {
    navigate(`/view/${manage}/${value}`);
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

      <div className="menu-bar">
        <div className="logo">
          <img src={logo} alt="logo" style={{ backgroundColor: "white" }} />
          <div className="headding">
            <span>CAPITAL REGISTER OF</span>
            <span id="bold">SHIPPING</span>
          </div>
        </div>
      </div>

      <Popup
        className="upload-popup"
        style={style}
        visible={popup}
        onClose={() => setPopup(false)}
        animationDuration="200"
      >
        <Delete setVisible={setPopup} type={manage} did={popup} />
      </Popup>

      <div className="manage-assets-component">
        {isLoading ? (
          <div style={{ padding: 0 }} className="loading">
            <div className="loading-body">
              <img src={loading} alt="manage"/>
            </div>
          </div>
        ) : (
          <div className="manage-assets-body">
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
                <h3 style={{
                  textTransform: "uppercase"
                }}>{`Manage ${manage}`}</h3>
              </div>
              <div className="inner two">
                <button
                  onClick={() => navigate(`/create/${manage}`)}
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
                  <p>{item.date}</p>
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
          </div>
        )}
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
          Are you sure you want to delete{" "}
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

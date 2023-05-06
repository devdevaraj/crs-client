import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import hash from "object-hash";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./style.scss";
import logo from "../../assets/logo.svg";
import loading from "../../assets/loading.gif";
import coverImg from "../../assets/cover.png";
import { convertToBase64 } from "../../helper/convert";
import { setDocument, updateDocument } from "../../helper/helper";
import { useFetchDoc } from "../../hooks/fetch.hook";

export default function Create(props) {
  const { create, docId } = useParams();

  const [cover, setCover] = useState(null);
  const navigate = useNavigate();

  const [{ isLoading, apiData }] = useFetchDoc(
    `/get-private-docs?dname=${create}&docId=${docId}`
  );

  const d = new Date();
  const did = hash(d);
  const date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

  const formik = useFormik({
    initialValues: {
      did: did,
      dname: create,
      title: (apiData && apiData[0]?.title) || "",
      date: date,
      privacy: "public",
      document: "",
    },
    enableReinitialize: false,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const title = document.getElementById("manage-title").value;
      const doc = document.getElementById("manage-document").value;
      if (!title) return toast.error("Title cannot be empty");
      if (!doc) return toast.error("Document cannot be empty");
      values = await Object.assign(values, {
        title: title,
        image: cover || (apiData && apiData[0]?.image) || "",
        document: doc,
      });
      let createPromise;
      let stat;
      if (props.edit) {
        stat = "updat";
        const { did, ...rest } = values;
        rest.docId = apiData[0]?._id;
        createPromise = updateDocument(rest);
      } else {
        stat = "post";
        createPromise = setDocument(values);
      }

      toast.promise(createPromise, {
        loading: `${stat}ing...`,
        success: <b>{stat}ed successfully...!</b>,
        errror: <b>Could not {stat}!</b>,
      });
      createPromise.then(() => {
        navigate(`/manage/${create}`, { replace: true });
      });
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setCover(base64);
  };

  useEffect(() => {
    if (apiData) {
      document.getElementById("manage-title").value = apiData[0]?.title;
      document.getElementById("manage-document").value = apiData[0].document;
    }
  }, [apiData]);

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

      <div className="create-asset">
      {isLoading ? (
        <div style={{ padding: 0 }} className="loading">
          <div className="loading-body">
            <img src={loading} alt="view" />
          </div>
        </div>
      ) : (
          <div className="create-assets-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="header">
                <button
                  onClick={() =>
                    navigate(`/manage/${create}`, { replace: true })
                  }
                  type="button"
                  className="back-button"
                >
                  <ArrowBackIcon sx={{ fontSize: "1rem" }} />
                  back
                </button>
                <h2>
                  {props.edit
                    ? `Edit this ${create.substring(0, create.length - 1)}`
                    : `Create new ${create.substring(0, create.length - 1)}`}
                </h2>
              </div>
              <div className="cover-image">
                <label htmlFor="cover-image" className="label">
                  <img
                    src={cover || (apiData && apiData[0]?.image) || coverImg}
                    alt="cover"
                  />
                </label>
              </div>
              <input
                onChange={onUpload}
                type="file"
                accept="image/*"
                id="cover-image"
                style={{ display: "none" }}
              />
              <div className="asset-body-one">
                <label htmlFor="title">Title: </label>
                <input id="manage-title" type="text" />
              </div>
              <div className="asset-body-two">
                <label htmlFor="description">Description:</label>
                <textarea
                  name="manage-document"
                  id="manage-document"
                ></textarea>
              </div>
              <div className="asset-body-three">
                <button type="submit">{props.edit ? "Update" : "Post"}</button>
                <button
                  onClick={() =>
                    navigate(`/manage/${create}`, { replace: true })
                  }
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
      )}
      </div>
    </>
  );
}

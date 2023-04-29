import React,{ useEffect } from "react";
import hash from "object-hash";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";

import "./style.scss";
import logo from "../../assets/logo.svg";
import loading from "../../assets/loading.gif";
import { setDocument, updateDocument } from "../../helper/helper";
import { useFetchDoc } from "../../hooks/fetch.hook";

export default function CreateContact(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [{ isLoading, apiData }] = useFetchDoc(`/get-private-docs?dname=contacts&docId=${id}`);

  const d = new Date();
  const did = hash(d);
  const date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

  const formik = useFormik({
    initialValues: {
      did: did,
      dname: "contacts",
      date: date,
      privacy: "public",
    },
    enableReinitialize: false,
    validate: (values) => {},
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const title = document.getElementById("contact-title").value;
      const add = document.getElementById("contact-address").value;
      const phone = document.getElementById("contact-phone").value;
      const email = document.getElementById("contact-email").value;
      const lat = document.getElementById("lat").value;
      const lon = document.getElementById("lon").value;
      values = await Object.assign(values, {
        title: title,
        document: `add:${add};ph:${phone};mail:${email};lat:${lat};lon:${lon};`,
      });
      let createPromise;
      let stat;
      if (props.new) {
        stat = "post";
        createPromise = setDocument(values);
      } else {
        const { did, ...rest } = values;
        rest.docId = apiData[0]?._id;
        createPromise = updateDocument(rest);
      }
      toast.promise(createPromise, {
        loading: `${stat}ing...`,
        success: <b>{stat}ed successfully...!</b>,
        errror: <b>Could not {stat}!</b>,
      });
      createPromise.then(() => {
        navigate(`/contacts-manager`, { replace: true });
      });
    },
  });

  useEffect(() => {
    if(apiData) {
      document.getElementById("contact-title").value = apiData[0]?.title;
      let  add = apiData[0]?.document.split("add:")[1].split(";ph:")[0];
      document.getElementById("contact-address").value = add;
      let  ph = apiData[0]?.document.split(";ph:")[1].split(";mail:")[0];
      document.getElementById("contact-phone").value = ph;
      let  mail = apiData[0]?.document.split(";mail:")[1].split(";lat:")[0];
      document.getElementById("contact-email").value = mail;
      let  lat = apiData[0]?.document.split(";lat:")[1].split(";lon:")[0];
      document.getElementById("lat").value = lat;
      let  lon = apiData[0]?.document.split(";lon:")[1].split(";")[0];
      document.getElementById("lon").value = lon;
    }
  },[apiData]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="menu-bar">
        <div className="logo">
          <img src={logo} alt="logo" />
          <div className="headding">
            <span>CAPITAL REGISTER OF</span>
            <span id="bold">SHIPPING</span>
          </div>
        </div>
      </div>

      <div className="create-contact-main">
        <div className="create-contact-body">
        {isLoading ? (
                      <div style={{ padding: 0, boxShadow: "none" }} className="loading">
                      <div style={{ padding: 0, boxShadow: "none" }} className="loading-body">
                        <img src={loading} alt="ccontact"/>
                      </div>
                    </div>
        ):(<>  <div className="header">
            <button
              onClick={() => navigate(`/contacts-manager`, { replace: true })}
              className="back-button"
            >
              <ArrowBackIcon sx={{ fontSize: "1rem" }} />
              back
            </button>
            <h3>{props.new ? "CREATE NEW CONTACT" : "UPDATE CONTACT"}</h3>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="contact-title">title:</label>
            <input type="text" id="contact-title" />
            <label htmlFor="contact-address">address:</label>
            <textarea id="contact-address"></textarea>
            <label htmlFor="contact-phone">phone:</label>
            <input type="phone" id="contact-phone" />
            <label htmlFor="contact-email">email:</label>
            <input type="email" id="contact-email" />
            <label htmlFor="contact-coo">co-ordinates:</label>
            <div className="coord">
              <input type="number" id="lat" placeholder="lat" step="0.00001" />
              <input type="number" id="lon" placeholder="lon" step="0.00001"/>
            </div>
            <div className="bottom">
              <button type="submit">{props.new ? "CREATE" : "UPDATE"}</button>
              <button type="button">CANCEL</button>
            </div>
          </form>
          </>)}
        </div>
      </div>
    </>
  );
}

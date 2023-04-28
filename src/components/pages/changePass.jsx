import React from "react";
import { useFormik } from "formik";
import toast,{ Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./style.scss";
import logo from "../../assets/logo.svg";
import { resetPassword } from "../../helper/helper";
import { resetValidation } from "../../helper/validate";

export default function ChangePassword(props) {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            password: '',
            confirm_pwd: ''
        },
        validate: resetValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            let resetPromise = resetPassword(values.password);
            toast.promise(resetPromise, {
                loading : "Updating...!",
                success : <b>Reset successfully...!</b>,
                error : <b>Could not reset</b>
            });
             resetPromise.then(function() { navigate("/login", { replace: true }) });
        }
    });
    const backButton = () => {
        const type = localStorage.getItem("type");
        if(type === "Admin") return navigate("/admin-panel", { replace: true });
        if (props.ind) {
            return navigate("/", { replace: true });
        }
        return navigate("/", { replace: true });
    }
    return(
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

      <button onClick={backButton} className="universal-back-button">
        <ArrowBackIcon sx={{ fontSize: "1rem" }} />
        Back
      </button>

        <div className="change-pass">
            <div className="in-ner">
                <h2>CHANGE PASSWORD</h2>
            <form onSubmit={formik.handleSubmit}>
                    <input {...formik.getFieldProps("password")} type="password" placeholder="Password"/>
                    <input {...formik.getFieldProps("confirm_pwd")} type="password" placeholder="Confirm password"/>
                    <button type="submit">Change password</button>
                    <button type="button" onClick={backButton}>Cancel</button>
                </form>
            </div>
        </div>
        </>
    );
}
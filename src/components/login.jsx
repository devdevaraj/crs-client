import React from "react";
import toast,{ Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./style.scss";
import Navigation from "./navigation";
import { loginValidate } from "../helper/validate";
import { login } from "../helper/helper";


export default function Login(props) {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validate: loginValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            let loginPromise = login({ username: values.username, password: values.password });
            toast.promise(loginPromise, {
                loading : "Checking...",
                success : <b>Loagin successful</b>,
                error : <b>Incorrect username or password</b>
            });
            loginPromise.then(res => {
                let { token, type } = res.data;
                localStorage.setItem("type",type);
                localStorage.setItem("token", token);
                props.setPage("logged in");
                if(type === "Admin") {
                    return navigate("/admin-panel", { replace: true });
                }
                return navigate("/", { replace: true });
            })
        }
    });
    return(
        <>
        <button onClick={() => navigate("/", { replace: true })} className="universal-back-button">
        <ArrowBackIcon sx={{ fontSize: "1rem" }} />
        Back
      </button>

        <div className="login">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div className="navigation">
                <Navigation setPage={props.setPage} setScroll={props.setScroll}/>
            </div>
            <div className="login-body">
                <h2>LOGIN</h2>
                <form onSubmit={formik.handleSubmit}>
                    <input {...formik.getFieldProps("username")} type="text" placeholder="username"/>
                    <input {...formik.getFieldProps("password")} type="password" placeholder="password"/>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
        </>
    );
}
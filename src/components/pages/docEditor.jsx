import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import hash from "object-hash";
import "./style.scss";
import Navigation from "../navigation";
import demo from "../../assets/demo.jpg";

import { documentValidate } from "../../helper/validate";
import { convertToBase64 } from "../../helper/convert";
import { setDocument } from "../../helper/helper";

export default function Editor(props) {
  const d = new Date();
  const did = hash(d);
  const date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      did: did,
      dname: "services",
      title: "demo",
      date: date,
      document: "democument1",
    },
    enableReinitialize: true,
    validate: documentValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let privacy = document.getElementById("privacy").checked;
      values = await Object.assign(values, {
        image: file || "",
        privacy: privacy,
      });
      let docPromise = setDocument(values);
      toast.promise(docPromise, {
        loading: "Updating...",
        success: <b>Updated successfully...!</b>,
        errror: <b>Could not update!</b>,
      });
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Navigation setPage={props.setPage} setScroll={props.setScroll} />
      <div className="doc-editor">
        <h2>Dock editor</h2>
        <div className="editor-body">
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="image" id="img-label">
              <img style={{ width: "50%" }} src={file || demo} alt="avatar" />
            </label>
            <input onChange={onUpload} type="file" id="image" name="image" />
            <label htmlFor="title" className="label">
              Title:
            </label>
            <input
              {...formik.getFieldProps("title")}
              type="text"
              name="title"
              id="title"
            />
            <label htmlFor="document" className="label">
              Description:
            </label>
            <textarea
              {...formik.getFieldProps("document")}
              name="document"
              id="document"
            ></textarea>
            <label htmlFor="privacy" className="label">
              Private:
            </label>
            <span>
              Do you want to make this private?{" "}
              <input type="checkbox" name="privacy" id="privacy" />
            </span>
            <div className="editor-buttons">
              <button type="submit">save</button>
              <button type="button">cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

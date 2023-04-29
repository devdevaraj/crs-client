import React, { useState, useEffect } from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Popup from "reactjs-popup";
import toast, { Toaster } from "react-hot-toast";

import { getContent, setContent, updateContent } from "../helper/helper";
import { useFetchContent } from "../hooks/fetch.hook";
import "./style.scss";

export default function EditPopup(props) {
  const [{isLoading, apiData, serverError }] = useFetchContent(props.cname);
  const contantChange = (e) => {
    document.getElementById("preview").innerHTML = e.target.value;
  };
  const fsizeChange = (e) => {
    document.getElementById("preview").style.fontSize = e.target.value + "rem";
  };
  const fcolorChange = (e) => {
    document.getElementById("preview").style.color = e.target.value;
  };
  const fweight = (e) => {
    document.getElementById("preview").style.fontWeight = e.target.checked
      ? "bold"
      : "normal";
  };
  const fstyle = (e) => {
    document.getElementById("preview").style.fontStyle = e.target.checked
      ? "italic"
      : "normal";
  };
  const tdecoration = (e) => {
    document.getElementById("preview").style.textDecoration = e.target.checked
      ? "underline"
      : "none";
  };
  const SubmitHandler = (e) => {
    e.preventDefault();
    const content = document.getElementById("content").value;
    const fsize = document.getElementById("fsize").value;
    const fcolor = document.getElementById("fcolor").value;
    const bold = document.getElementById("fbold").checked;
    const italic = document.getElementById("italic").checked;
    const underline = document.getElementById("underline").checked;
    let final = {
      cname: props.cname,
      content: content,
      props: {
        fsize: fsize,
        fcolor: fcolor,
        bold: bold,
        italic: italic,
        underline: underline,
      },
    };
    // console.log(data);
    const status = 200;
    if (apiData?.cname) {
      const response = updateContent(final);
      toast.promise(response, {
        loading: "Updating...",
        success: <b>Updated successfully...!</b>,
        error: <b>Could not update!</b>,
      });
    } else {
      const response = setContent(final);
      toast.promise(response, {
        loading: "Creating...",
        success: <b>Created successfully...!</b>,
        error: <b>Could not create!</b>,
      });
    }
    props.setLock(false);
  };

  useEffect(() => {
    document.getElementById("pen").addEventListener("click", (d) => {
      setTimeout((d) => {
        if (apiData?.cname) {
          const data = apiData;
          document.getElementById("preview").innerHTML = data.content;
          document.getElementById("preview").style.fontSize =
            data.props.fsize + "rem";
          document.getElementById("preview").style.color = data.props.fcolor;
          document.getElementById("preview").style.fontWeight = data.props.bold
            ? "bold"
            : "normal";
          document.getElementById("preview").style.fontStyle = data.props.italic
            ? "italic"
            : "normal";
          document.getElementById("preview").style.textDecoration = data.props
            .underline
            ? "underline"
            : "none";
          document.getElementById("content").value = data.content;
          document.getElementById("fsize").value = data.props.fsize;
          document.getElementById("fcolor").value = data.props.fcolor;
          document.getElementById("fbold").checked = data.props.bold;
          document.getElementById("italic").checked = data.props.italic;
          document.getElementById("underline").checked = data.props.underline;
        }
      }, 100);
    });
  });

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Popup
        trigger={
          props.editable && (
            <span id="pen">
              <ModeEditOutlineOutlinedIcon />
            </span>
          )
        }
        modal
        nested
        closeOnDocumentClick={false}
      >
        {(close) => (
          <div className="popup">
            <button id="close" onClick={() => {
              props.setLock(false);
              return close()
              }}>
              <CloseIcon />
            </button>
            <div className="popup-body">
              <h2>CONTACT EDITOR</h2>
              <form onSubmit={SubmitHandler}>
                <label htmlFor="preview">Preview</label>
                <div className="preview" id="preview"></div>
                <label htmlFor="content">Content</label>
                <textarea
                  onChange={contantChange}
                  type="text"
                  name="content"
                  id="content"
                  placeholder="Type the content here here"
                />
                <label htmlFor="fsize">Font size</label>
                <input
                  onChange={fsizeChange}
                  type="range"
                  name="fsize"
                  id="fsize"
                  min="0.8"
                  max="4"
                  step="0.2"
                  defaultValue="1"
                />
                <label htmlFor="fcolor">Font colour</label>
                <input
                  onChange={fcolorChange}
                  type="color"
                  name="fcolor"
                  id="fcolor"
                />
                <label htmlFor="fstyle">Font style</label>
                <div className="fstyle">
                  <span>
                    bold:
                    <input
                      onChange={fweight}
                      type="checkbox"
                      name="fstyle"
                      id="fbold"
                      value="bold"
                    />
                  </span>
                  <span>
                    italic:
                    <input
                      onChange={fstyle}
                      type="checkbox"
                      name="fstyle"
                      id="italic"
                      value="italic"
                    />
                  </span>
                  <span>
                    underline:
                    <input
                      onChange={tdecoration}
                      type="checkbox"
                      name="fstyle"
                      id="underline"
                      value="underline"
                    />
                  </span>
                </div>
                <div className="buttons">
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => {
                    props.setLock(false);
                    return close();
                    }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import Popup from "react-animated-popup";
import hash from "object-hash";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import UploadIcon from "@mui/icons-material/Upload";
import SortIcon from "@mui/icons-material/Sort";
import FileDownload from "@mui/icons-material/Download";
import KeyIcon from "@mui/icons-material/Key";

import "./style.scss";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.jpg";
import docImg from "../../assets/document.jpg";
import loading from "../../assets/loading.gif";
import { setContent, updateContent } from "../../helper/helper";
import {
  useFetchUser,
  useFetchDoc,
  useFetchContent,
} from "../../hooks/fetch.hook";
import { convertToBase64 } from "../../helper/convert";
import {
  updateUser,
  updateUsers,
  setDocument,
  updateDocument,
  removeDocument,
  register,
  removeUser,
} from "../../helper/helper";
import {
  userUpdateValidate,
  documentFileValidate,
} from "../../helper/validate";

export default function Admin(props) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("dashboard");
  const [{ apiData, serverError }] = useFetchUser("/profile");
  const dbRef = useRef();
  const epRef = useRef();
  const umRef = useRef();
  const udRef = useRef();
  const ewRef = useRef();
  const popup = () => {
    // document.getElementById("edit-profile").style.display = "flex";
    document.getElementById("logout-button1").style.display = "flex";
    document.getElementById("logout-button").style.display = "flex";
    document.getElementById("close-button").style.display = "flex";
    document.getElementById("background-shade").style.display = "block";
    document.getElementById("popup-window").classList.remove("popup-close");
    document.getElementById("popup-window").classList.add("popup-open");
  };
  const clickTab = (e) => {
    dbRef.current.classList.remove("active-tab");
    epRef.current.classList.remove("active-tab");
    umRef.current.classList.remove("active-tab");
    udRef.current.classList.remove("active-tab");
    ewRef.current.classList.remove("active-tab");
    e.current.classList.add("active-tab");
    setTab(e.tab);
  };
  if (serverError) {
    return (
      <div className="session-expired">
        <h2>Session expired..!</h2>
        <button onClick={() => navigate("/login", { replace: true })}>
          Back to login
        </button>
      </div>
    );
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="admin-panel">
        <div className="menu-bar">
          <div className="logo">
            <img src={logo} alt="logo" />
            <div className="headding">
              <span>CAPITAL REGISTER OF</span>
              <span id="bold">SHIPPING</span>
            </div>
          </div>
          <div className="avatar-container">
            <img
              onClick={popup}
              id="image"
              src={apiData?.image || avatar}
              alt="avatar"
            />
            <PopupWindow apiData={apiData} />
          </div>
        </div>
        <div className="admin-body">
          <div className="left">
            <div
              onClick={() => navigate("/", { replace: true })}
              className="back-button tabs"
            >
              <ArrowBackIcon sx={{ fontSize: "2rem" }} />
              Back
            </div>
            <div
              ref={dbRef}
              onClick={(e) => clickTab({ ...dbRef, tab: "dashboard" })}
              id="dashboard"
              className="dashboard tabs active-tab"
            >
              <DashboardIcon sx={{ fontSize: "2rem" }} />
              <span>Dashboard</span>
            </div>
            <div
              ref={epRef}
              onClick={(e) => clickTab({ ...epRef, tab: "editprofile" })}
              id="dashboard"
              className="editprofile tabs"
            >
              <SettingsIcon sx={{ fontSize: "2rem" }} />
              <span>Edit profile</span>
            </div>
            <div
              ref={umRef}
              onClick={(e) => clickTab({ ...umRef, tab: "adduser" })}
              id="add-user"
              className="add-user tabs"
            >
              <PersonAddIcon sx={{ fontSize: "2rem" }} />
              <span>Manage users</span>
            </div>
            <div
              ref={udRef}
              onClick={(e) => clickTab({ ...udRef, tab: "uploaddocument" })}
              id="upload-document"
              className="upload-document tabs"
            >
              <UploadFileIcon sx={{ fontSize: "2rem" }} />
              <span>Upload document</span>
            </div>
            <div
              ref={ewRef}
              onClick={(e) => clickTab({ ...ewRef, tab: "editwebsite" })}
              id="edit-website"
              className="edit-website tabs"
            >
              <EditIcon sx={{ fontSize: "2rem" }} />
              <span>Edit Website</span>
            </div>
          </div>
          <div className="right">
            {tab === "dashboard" && <Dashboard data={apiData} />}
            {tab === "editprofile" && <EditProfile data={apiData} />}
            {tab === "adduser" && <AddUser />}
            {tab === "uploaddocument" && <UploadDocument />}
            {tab === "editwebsite" && <EditWebsite />}
          </div>
        </div>
      </div>
    </>
  );
}

const PopupWindow = (props) => {
  const navigate = useNavigate();
  const popup = () => {
    // document.getElementById("edit-profile").style.display = "none";
    document.getElementById("logout-button1").style.display = "none";
    document.getElementById("logout-button").style.display = "none";
    document.getElementById("close-button").style.display = "none";
    document.getElementById("background-shade").style.display = "none";
    document.getElementById("popup-window").classList.remove("popup-open");
    document.getElementById("popup-window").classList.add("popup-close");
  };
  const userLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    window.location.reload(true);
    navigate("/");
  };
  return (
    <>
      <div id="background-shade" className="background-shade"></div>
      <div id="popup-window" className="popup-window popup-close">
        <button onClick={popup} id="close-button" className="close-button">
          <CloseIcon />
        </button>
        <div className="popup-body">
          <div className="avatar-cont">
            <img
              id="avatar"
              src={props.apiData?.image || avatar}
              alt="avatar"
            />
            <h2>{props.apiData?.username}</h2>
            <h3>{`(${props.apiData?.type})`}</h3>
          </div>
          <div className="user-cred">
            <button
              onClick={() => navigate("/change-password")}
              id="logout-button1"
              className="popup-buttons"
            >
              <KeyIcon sx={{ fontWeight: "bold" }} />
              Change password
            </button>

            <button
              onClick={userLogout}
              id="logout-button"
              className="popup-buttons"
            >
              <LogoutIcon sx={{ fontWeight: "bold" }} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Dashboard = (props) => {
  const navigate = useNavigate();
  const servicesList = useFetchDoc("/get-private-docs?dname=services&list=1");
  const blogsList = useFetchDoc("/get-private-docs?dname=blogs&list=1");
  const careersList = useFetchDoc("/get-private-docs?dname=careers&list=1");
  const contactsList = useFetchDoc("/get-private-docs?dname=contacts&list=1");
  return (
    <div className="dash-board">
      <div className="db-top">
        <div className="avatar-container">
          <img id="avatar-image" src={props.data?.image || avatar} alt="" />
        </div>
        <div className="details-container">
          <div className="details">
            <h2>
              {(props.data?.extra?.fname || "") +
                " " +
                (props.data?.extra?.lname || "")}
            </h2>
            <h2>{props.data?.username}</h2>
            <h4>{`(${props.data?.type})`}</h4>
          </div>
        </div>
      </div>
      <div className="db-bottom">
        <div className="manage-services manage">
          <h3>{servicesList[0].apiData?.length} services</h3>
          <button
            onClick={() => navigate("/manage/services")}
            type="button"
            className="manage-button"
          >
            <SettingsIcon sx={{ fontSize: "1rem" }} />
            Manage
          </button>
        </div>
        <div className="manage-blogs manage">
          <h3>{blogsList[0].apiData?.length} blogs</h3>
          <button
            onClick={() => navigate("/manage/blogs")}
            type="button"
            className="manage-button"
          >
            <SettingsIcon sx={{ fontSize: "1rem" }} />
            Manage
          </button>
        </div>
        <div className="manage-careers manage">
          <h3>{careersList[0].apiData?.length} careers</h3>
          <button
            onClick={() => navigate("/manage/careers")}
            type="button"
            className="manage-button"
          >
            <SettingsIcon sx={{ fontSize: "1rem" }} />
            Manage
          </button>
        </div>
        <div className="manage-careers manage">
          <h3>{contactsList[0].apiData?.length} contacts</h3>
          <button
            onClick={() => navigate("/contacts-manager")}
            type="button"
            className="manage-button"
          >
            <SettingsIcon sx={{ fontSize: "1rem" }} />
            Manage
          </button>
        </div>
      </div>
    </div>
  );
};

const EditProfile = (props) => {
  const [image, setImage] = useState();
  const formik = useFormik({
    initialValues: {
      fname: props.data?.extra?.fname || "",
      lname: props.data?.extra?.lname || "",
      phone: props.data?.extra?.phone || "",
      email: props.data?.extra?.email || "",
      dob: props.data?.extra?.dob || "",
    },
    enableReinitialize: true,
    validate: userUpdateValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        image: image || props.data?.image || "",
      });
      const data = {
        image: values.image,
        extra: {
          fname: values.fname,
          lname: values.lname,
          phone: values.phone,
          email: values.email,
          dob: values.dob,
        },
      };
      let updatePromise;
      if (props?.users) {
        updatePromise = updateUsers(props.data?._id, data);
      } else {
        updatePromise = updateUser(data);
      }
      toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b>Updated successfully...!</b>,
        errror: <b>Could not update!</b>,
      });
      updatePromise.then(() => {
        if (props.setVisible) props.setVisible(false);
      });
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setImage(base64);
  };
  return (
    <div
      className="edit-profile"
      style={{
        padding: props.new && 0,
      }}
    >
      <div
        className="edit-profile-body"
        style={{
          padding: props.new && "2rem",
        }}
      >
        <h2>
          Edit
          {props?.users ? " " + props.data?.username : " profile"}
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="avatar-img">
            <img
              id="avatar-image"
              src={image || props.data?.image || avatar}
              alt="avatar"
            />
          </label>
          <input
            accept="image/*"
            onChange={onUpload}
            type="file"
            id="avatar-img"
            name="avatar-img"
          />
          <label htmlFor="fname">First name:</label>
          <input
            {...formik.getFieldProps("fname")}
            type="text"
            placeholder="First name"
            name="fname"
            id="fname"
          />
          <label htmlFor="lname">Lirst name:</label>
          <input
            {...formik.getFieldProps("lname")}
            type="text"
            placeholder="Last name"
            name="lname"
            id="lname"
          />
          <label htmlFor="phone">Phone:</label>
          <input
            {...formik.getFieldProps("phone")}
            type="phone"
            placeholder="Phone number"
            name="phone"
            id="phone"
          />
          <label htmlFor="email">Email:</label>
          <input
            {...formik.getFieldProps("email")}
            type="email"
            placeholder="Email"
            name="email"
            id="email"
          />
          <label htmlFor="dob">Date of birth:</label>
          <input
            {...formik.getFieldProps("dob")}
            type="date"
            placeholder="Date of birth"
            name="dob"
            id="dob"
            style={{ height: "3rem" }}
          />
          <button
            type="submit"
            className="update-profile-button"
            style={{ width: "100%", height: "3rem" }}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

const EditUserComponent = (props) => {
  return (
    <>
      <button
        style={{ width: "2rem" }}
        className="upload-popup-close"
        onClick={() => props.setVisible(false)}
      >
        <CloseIcon />
      </button>
      <div
        className="upload-popup-body"
        style={{ padding: "0rem", boxShadow: "none" }}
      >
        <EditProfile
          data={props.data[0].apiData[0]}
          users={true}
          setVisible={props.setVisible}
          new={props.new}
        />
      </div>
    </>
  );
};

const AddUser = (props) => {
  const [{ isLoading, apiData }] = useFetchUser("/fetch-users?type=User");
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(false);
  const [addNewUser, setAddNewUser] = useState(false);
  const [delUser, setDelUser] = useState(false);
  const res = useFetchUser(`/fetch-users?username=${username}`);
  const EditUser = (props) => {
    const [{ apiData }] = res;
    setUsername(props);
    if (apiData[0]) setUser(apiData[0]);
  };
  const addUser = (props) => {
    setAddNewUser(true);
  };
  const deleteUser = (props) => {
    setDelUser(props);
  };

  const style = {
    position: "absolute",
    borderRadius: "1rem",
    padding: window.innerWidth > 750 ? "1rem" : "0.5rem",
    height: window.innerWidth > 750 ? "50%" : "90%",
    width: "90%",
    boxShadow: "0 0 10px black ",
  };

  if (isLoading)
    return (
      <div className="loading">
        <div className="loading-body">
          <img src={loading} alt="add user" />
        </div>
      </div>
    );

  return (
    <div className="add-user-container">
      <div className="add-user-body">
        <h2>User management</h2>
        <div className="user-list-container">
          <div className="user-list-items">
            <div className="user-list-item-left">
              <h3>Add new user</h3>
            </div>
            <div className="user-list-item-right">
              <Popup
                className="upload-popup"
                style={{ ...style, height: "22rem" }}
                visible={addNewUser}
                onClose={() => setAddNewUser(false)}
                animationDuration="200"
              >
                <AddNewUser
                  setVisible={setAddNewUser}
                  new={true}
                  info={addNewUser}
                />
              </Popup>

              <Popup
                className="upload-popup"
                style={{ ...style, height: "15rem" }}
                visible={delUser}
                onClose={() => setDelUser(false)}
                animationDuration="200"
              >
                <DeleteUser setVisible={setDelUser} new={true} info={delUser} />
              </Popup>

              <Popup
                className="upload-popup"
                style={style}
                visible={user}
                onClose={() => setUser(false)}
                animationDuration="200"
              >
                <EditUserComponent
                  setVisible={setUser}
                  new={true}
                  data={res}
                  users={true}
                />
              </Popup>

              <button onClick={addUser}>
                <AddIcon sx={{ fontSize: "1rem" }} />
                Add
              </button>
            </div>
          </div>
          {apiData?.map((item, index) => (
            <div key={index} className="user-list-items">
              <div className="user-list-item-left">
                <h3 className="index">{`${index + 1}`}</h3>
                <h3>{` ${item.username}`}</h3>
                {` (${item.type})`}
              </div>
              <div className="user-list-item-right">
                <button onClick={() => EditUser(item.username)}>
                  <EditIcon sx={{ fontSize: "1rem" }} />
                  Edit
                </button>
                <button onClick={() => deleteUser(item.username)}>
                  <DeleteIcon sx={{ fontSize: "1rem" }} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const UploadDocument = (props) => {
  const [{ isLoading, apiData }] = useFetchDoc("/get-private-docs?dname=files");
  const documents = apiData;
  const Delete = (e) => {
    setDeletePopup(e);
  };
  const Edit = (e) => {
    setEditPopup(e);
  };
  const Info = (e) => {
    setInfoPopup(e);
  };
  const Download = (e) => {
    setDownloadPoopup(e);
  };
  const [visible, setVisible] = useState(false);
  const [infoPopup, setInfoPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [downloadPopup, setDownloadPoopup] = useState(false);
  const style = {
    position: "absolute",
    borderRadius: "1rem",
    padding: window.innerWidth > 750 ? "1rem" : "0.5rem",
    height: window.innerWidth > 750 ? "50%" : "90%",
    width: "90%",
    boxShadow: "0 0 10px black ",
  };

  if (isLoading)
    return (
      <div className="loading">
        <div className="loading-body">
          <img src={loading} alt="upload user" />
        </div>
      </div>
    );

  return (
    <div className="upload-document-container">
      <div className="upload-document-body">
        <div className="top">
          <div className="top-left">
            <h3>{`${documents?.length} documents`}</h3>
          </div>
          <div className="top-right">
            <Popup
              className="upload-popup"
              style={style}
              visible={visible}
              onClose={() => setVisible(false)}
              animationDuration="200"
            >
              <DocumentUploader setVisible={setVisible} new={true} />
            </Popup>

            <Popup
              className="upload-popup"
              style={{ ...style, height: "25rem" }}
              visible={infoPopup}
              onClose={() => setInfoPopup(false)}
              animationDuration="200"
            >
              <DocumentInfo setVisible={setInfoPopup} info={infoPopup} />
            </Popup>

            <Popup
              className="upload-popup"
              style={style}
              visible={editPopup}
              onClose={() => setEditPopup(false)}
              animationDuration="200"
            >
              <DocumentUploader
                setVisible={setEditPopup}
                new={false}
                info={editPopup}
              />
            </Popup>

            <Popup
              className="upload-popup"
              style={{ ...style, height: "12rem" }}
              visible={deletePopup}
              onClose={() => setDeletePopup(false)}
              animationDuration="200"
            >
              <DocumentDelete
                setVisible={setDeletePopup}
                new={false}
                info={deletePopup}
              />
            </Popup>

            <Popup
              className="upload-popup"
              style={{ ...style, height: "12rem" }}
              visible={downloadPopup}
              onClose={() => setDownloadPoopup(false)}
              animationDuration="200"
            >
              <DocumentDownload
                setVisible={setDownloadPoopup}
                new={false}
                info={downloadPopup}
              />
            </Popup>

            <button onClick={() => setVisible(true)} className="button upload">
              Upload
              <UploadIcon />
            </button>
            <button className="button sort">
              Sort
              <SortIcon />
            </button>
          </div>
        </div>
        <div className="bottom">
          {documents?.map((doc, index) => (
            <div key={index} className="document">
              <div className="cover">
                <img src={doc.image || docImg} alt="" />
              </div>
              <div className="description">
                <div className="des-left">
                  <p id="title">{doc.title}</p>
                  <p id="date">{doc.date}</p>
                </div>
                <div className="des-right">
                  <span onClick={() => Info(doc)}>
                    <InfoIcon />
                  </span>
                  <span onClick={() => Edit(doc)}>
                    <EditIcon />
                  </span>
                  <span onClick={() => Delete(doc)}>
                    <DeleteIcon />
                  </span>
                  <span onClick={() => Download(doc)}>
                    <FileDownload />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EditWebsite = (props) => {
  const [img, setImg] = useState(null);
  const headding = useFetchContent("About-headding");
  const description = useFetchContent("About-des");
  const abtImg = useFetchContent("About-img");

  const isLoading = abtImg[0]?.isLoading;
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setImg(base64);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    let res1, res2, res3;
    if (headding[0].apiData) {
      res1 = updateContent({
        cname: "About-headding",
        content: document.getElementById("title").value,
      });
    } else {
      res1 = setContent({
        cname: "About-headding",
        content: document.getElementById("title").value,
      });
    }
    if (description[0].apiData) {
      res2 = updateContent({
        cname: "About-des",
        content: document.getElementById("des").value,
      });
    } else {
      res2 = setContent({
        cname: "About-des",
        content: document.getElementById("des").value,
      });
    }

    if (abtImg[0].apiData) {
      res3 = updateContent({
        cname: "About-img",
        content: img || (abtImg && abtImg[0]?.apiData?.content) || "",
      });
    } else {
      res3 = setContent({
        cname: "About-img",
        content: img || (abtImg && abtImg[0]?.apiData?.content) || "",
      });
    }

    const res = Promise.all([res1, res2, res3]);
    toast.promise(res, {
      loading: "Creating...",
      success: <b>Created successfully...!</b>,
      error: <b>Could not create!</b>,
    });
  };

  useEffect(() => {
    if (!isLoading) {
      document.getElementById("title").value = headding[0].apiData?.content;
      document.getElementById("des").value = description[0].apiData?.content;
    }
  });
  return (
    <div className="edit-webpage">
      {isLoading ? (
        <div style={{ padding: 0 }} className="loading">
          <div className="loading-body">
            <img src={loading} alt="view" />
          </div>
        </div>
      ) : (
        <div className="inner">
          <h2>EDIT ABOUT</h2>
          <form onSubmit={submitHandler}>
            <label htmlFor="about-image" id="ll">
              <img
                src={img || (abtImg && abtImg[0]?.apiData?.content) || logo}
                alt=""
              />
            </label>
            <input onChange={onUpload} type="file" id="about-image" />
            <label htmlFor="title" id="lb">
              ABOUT TITLE:
            </label>
            <input type="text" id="title" />
            <label htmlFor="des" id="lb">
              ABOUT DESCRIPTION:
            </label>
            <textarea id="des"></textarea>
            <button type="submit">UPDATE</button>
          </form>
        </div>
      )}
    </div>
  );
};

const DocumentInfo = (props) => {
  return (
    <>
      <button
        className="upload-popup-close"
        onClick={() => props.setVisible(false)}
      >
        <CloseIcon />
      </button>
      <div
        className="upload-popup-body"
        style={{ paddingInline: "1rem", alignItems: "flex-start", gap: "1rem" }}
      >
        <h3 style={{ width: "100%", textAlign: "center", paddingBottom: "0" }}>
          Info
        </h3>
        <p style={{ width: "100%", textAlign: "center" }}>
          <img
            src={props.info.image}
            alt="document cover"
            style={{ width: "50%" }}
          />
        </p>
        <p>
          <b>Title:</b> {props.info.title}
        </p>
        <p>
          <b>Date:</b> {props.info.date}
        </p>
        <p>
          <b>Privacy:</b> {props.info.privacy}
        </p>
      </div>
    </>
  );
};

const DocumentDelete = (props) => {
  const Delete = () => {
    const deletePromise = removeDocument(props.info.did);
    toast.promise(deletePromise, {
      loading: "Deleting...",
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
          Delete document
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
          Are you sure you want to delete {props?.info?.title} ?
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
            onClick={Delete}
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

const DocumentUploader = (props) => {
  const [cover, setCover] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const [{ apiData }] = useFetchDoc(
    `/get-private-docs?dname=files&doc=1&docId=${props?.info?._id}`
  );

  const d = new Date();
  const did = hash(d);
  const date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

  const formik = useFormik({
    initialValues: {
      title: title || props?.info?.title || "",
    },
    enableReinitialize: true,
    validate: documentFileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let Private = document.getElementById("document-privacy").checked;
      values = await Object.assign(values, {
        did: did,
        dname: "files",
        date: date,
        image: cover || props?.info?.image || docImg || "",
        privacy: Private ? "private" : "public",
        document: file || (apiData && apiData[0].document) || "",
      });
      if (!values.document) toast.error("Document cannot be empty..");
      let updatePromise;
      let stat;
      if (props.new) {
        updatePromise = setDocument(values);
        stat = "creat";
      } else {
        stat = "update";
        const { did, ...rest } = values;
        rest.docId = props?.info?._id;
        updatePromise = updateDocument(rest);
      }
      toast.promise(updatePromise, {
        loading: `${stat}ing...`,
        success: <b>{stat}ed successfully...!</b>,
        errror: <b>Could not {stat}e!</b>,
      });
      updatePromise.then(() => {
        props.setVisible(false);
      });
    },
  });

  const uploadFile = async (e) => {
    document.getElementById("document-label-div").innerHTML =
      e.target.files[0].name;
    document.getElementById("document-title").value =
      e.target.files[0].name.split(".")[0];
    setTitle(e.target.files[0].name.split(".")[0]);
    document.getElementById("document-label-div").style.color = "#000";
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };
  const uploadCover = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setCover(base64);
  };

  useEffect(() => {
    const e = document.getElementById("document-file");
    if (!props.new && !e.files[0]) {
      document.getElementById("document-label-div").innerHTML =
        props?.info?.title;
      document.getElementById("document-label-div").style.color = "#000";
    }
    if (!props.new) {
      document.getElementById("document-privacy").checked =
        props?.info?.privacy === "private" ? true : false;
    }
  });

  return (
    <>
      <button
        className="upload-popup-close"
        onClick={() => props.setVisible(false)}
      >
        <CloseIcon />
      </button>
      <div className="upload-popup-body">
        <h3>{props.new ? "Upload" : "Edit"} document</h3>
        <form onSubmit={formik.handleSubmit}>
          <p>Cover image:</p>
          <label htmlFor="cover-image" id="cover-image-label">
            <img
              src={cover || props?.info?.image || docImg}
              alt="document cover"
            />
          </label>
          <input
            id="cover-image"
            type="file"
            accept="image/*"
            onChange={uploadCover}
          />
          <p>Document file:</p>
          <label htmlFor="document-file" id="document-file-label">
            <div id="document-label-div" className="document-label-div">
              Click to select document
            </div>
          </label>
          <input id="document-file" type="file" onChange={uploadFile} />
          <label htmlFor="document-title" id="title-label">
            Title:
          </label>
          <input
            {...formik.getFieldProps("title")}
            type="text"
            id="document-title"
            placeholder="Title"
          />
          <label htmlFor="document-privacy">Privacy:</label>
          <span
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            {"Private document "}
            <input
              type="checkbox"
              id="document-privacy"
              value="private"
              style={{ height: "1.2rem", width: "1.2rem" }}
            />
          </span>
          <button type="submit" id="upload-button">
            {props.new ? "Upload" : "Update"}
          </button>
        </form>
      </div>
    </>
  );
};

const DocumentDownload = (props) => {
  const apiData = useFetchDoc(
    `/get-private-docs?dname=files&doc=1&docId=${props?.info?._id}`
  );
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

const AddNewUser = (props) => {
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};
      if (!values.username) {
        errors.username = toast.error("Username cannot be empty...!");
      }
      return errors;
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const registerPromise = register({
        type: "User",
        username: values.username,
        password: values.username,
      });
      toast.promise(registerPromise, {
        loading: "Creating new user...",
        success: <b>User created successfully...!</b>,
        error: <b>Could not create user!</b>,
      });
      registerPromise
        .then(() => {
          props.setVisible(false);
        })
        .catch((error) => {
          toast.error(error.response.data.error.error);
        });
    },
  });
  return (
    <>
      <button
        style={{ width: "2rem" }}
        className="upload-popup-close"
        onClick={() => props.setVisible(false)}
      >
        <CloseIcon />
      </button>
      <div className="upload-popup-body" style={{ padding: "1rem" }}>
        <h3 style={{ padding: "1rem" }}>Download document</h3>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="usernamee">Username:</label>
          <input
            {...formik.getFieldProps("username")}
            type="text"
            id="username"
            style={{ flexShrink: "0" }}
          />
          <button
            type="submit"
            style={{ width: "100%", height: "3rem", flexShrink: "0" }}
          >
            Add user
          </button>
          <button
            onClick={() => props.setVisible(false)}
            type="button"
            style={{ width: "100%", height: "3rem", flexShrink: "0" }}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

const DeleteUser = (props) => {
  const Delete = () => {
    const deletePromise = removeUser(props.info);
    deletePromise
      .then(() => {
        toast.success("User deleted successfully...!");
        props.setVisible(false);
      })
      .catch((error) => {
        toast.error("Couldn't delete user..!");
      });
  };
  return (
    <>
      <button
        style={{ width: "2rem" }}
        className="upload-popup-close"
        onClick={() => props.setVisible(false)}
      >
        <CloseIcon />
      </button>
      <div
        className="upload-popup-body"
        style={{ padding: "1rem", gap: "1rem" }}
      >
        <h3 style={{ padding: "0rem" }}>Delete user</h3>
        <p
          style={{
            height: "100%",
          }}
        >
          Are you sure you want delete {props?.info} ?
        </p>
        <button
          onClick={Delete}
          style={{
            width: "100%",
            height: "3rem",
            flexShrink: 0,
          }}
        >
          Delete
        </button>
        <button
          onClick={() => props.setVisible(false)}
          style={{
            width: "100%",
            height: "3rem",
            flexShrink: 0,
          }}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";

import Background from "./components/background";
import Navigation from "./components/navigation";
import Home from "./components/home";
import About from "./components/about";
import Service from "./components/services";
import Blog from "./components/blogs";
import Publication from "./components/publications";
import Career from "./components/career";
import Contact from  "./components/contact";
import Login from "./components/login";

import Services from "./components/pages/services";
import Blogs from "./components/pages/blogs";
import Publications from "./components/pages/publications";
import Careers from "./components/pages/careers";
import Editor from "./components/pages/docEditor";
import Admin from "./components/pages/admin";
import Manage from "./components/pages/manage";
import Create from "./components/pages/create";
import View from "./components/pages/view";
import Contacts from "./components/pages/contacts";
import CreateContact from "./components/pages/ccontact";
import ChangePassword from "./components/pages/changePass";

import { AuthorizeAdmin, Authorize } from "./middleware/auth";

export default function App() {
    const [page, setPage] = useState("main");
    console.log(page);
    const [scroll, setScroll] = useState(0);
    const type = localStorage.getItem("type");
    let editable = false;
    if(type === "Admin") editable = true;
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Main setPage={setPage} setScroll={setScroll} editable={editable}/>
        },
        {
            path: "/login",
            element: <Login setPage={setPage} setScroll={setScroll} editable={editable}/>
        },
        {
            path: "/services",
            element: <Services setPage={setPage} setScroll={setScroll} editable={editable}/>
        },
        {
            path: "/blogs",
            element: <Blogs setPage={setPage} setScroll={setScroll} editable={editable}/>
        },
        {
            path: "/publications",
            element: <Publications setPage={setPage} setScroll={setScroll} editable={editable}/>
        },
        {
            path: "/careers",
            element: <Careers setPage={setPage} setScroll={setScroll} editable={editable}/>
        },
        {
            path: "doc-editor/:type",
            element: <Editor setPage={setPage} setScroll={setScroll} editable={editable} />
        },
        {
            path: "/admin-panel",
            element: <AuthorizeAdmin><Admin /></AuthorizeAdmin>
        },
        {
            path: "/manage/:manage",
            element: <AuthorizeAdmin><Manage /></AuthorizeAdmin>
        },
        {
            path: "/create/:create",
            element: <AuthorizeAdmin><Create /></AuthorizeAdmin>
        },
        {
            path:"/edit/:create/:docId",
            element: <AuthorizeAdmin><Create edit={true}/></AuthorizeAdmin>
        },
        {
            path: "/view/:type/:docId",
            element: <AuthorizeAdmin><View /></AuthorizeAdmin>
        },
        {
            path: "/view-user/:type/:docId",
            element: <View userView={true} />
        },
        {
            path: "/views-user/:type/:docId",
            element: <View all={true}/>
        },
        {
            path: "/contacts-manager",
            element: <AuthorizeAdmin><Contacts /></AuthorizeAdmin>
        },
        {
            path: "/contact-creater",
            element: <AuthorizeAdmin><CreateContact new={true} /></AuthorizeAdmin>
        },
        {
            path: "/contact-editor/:id",
            element: <AuthorizeAdmin><CreateContact /></AuthorizeAdmin>
        },
        {
            path: "/change-password",
            element: <Authorize><ChangePassword ind={true}/></Authorize>
        },
        {
            path: "/change-passwords",
            element: <AuthorizeAdmin><ChangePassword/></AuthorizeAdmin>
        },
        {
            path: "*",
            element: <PageNotFound />
        }
    ]);
    useEffect(() => {
        document.getElementsByClassName("App")[0].scrollTo(0,scroll)
    });
    return (
        <div className="App">
            <Background />
            {/* <div className="body scrollElement"> */}
                <RouterProvider router={router}></RouterProvider>
            {/* </div> */}
        </div>
    );
}

export const Main = (props) => {
    return (
        <>
        { !props.nav && <div className="navigation"><Navigation setPage={props.setPage} setScroll={props.setScroll}/></div>}
            <div className="home page"><Home editable={props.editable} /></div>
            <div className="about page"><About editable={props.editable} /></div>
            <div className="services page"><Service editable={props.editable} /></div>
            <div className="blog page"><Blog editable={props.editable} /></div>
            <div className="Publications page"><Publication editable={props.editable} /></div>
            <div className="career page"><Career editable={props.editable} /></div>
            <div className="contact page"><Contact  editable={props.editable} /></div>
        </>
    );
}

const PageNotFound = () => (
    <div className="pnf" style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    }}>
        <h1>
            <b>Oops! page not found</b>
        </h1>
    </div>
);
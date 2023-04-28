import React from "react";
import bg from "../assets/background-image.jpg";
import "./style.scss";


export default function Background(props) {
    return(
        <div style={{ width: "100%",overflow: "hidden" }} className="background">
            <img style={{
                height: "100%",
                width: "100%",
                objectFit: "cover"
            }} src={bg} alt="back-ground" />
        </div>
    );
}

import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import "./style.scss";
import { useFetchDoc } from "../hooks/fetch.hook";

export default function Contact(props) {
  const [{ apiData }] = useFetchDoc("/get-documents?dname=contacts");
  let poses = [];
  if (apiData) {
    poses = apiData?.map((item) => ({pos: [
      item.document.split(";lat:")[1].split(";lon:")[0],
      item.document.split(";lon:")[1].split(";")[0],
    ],
    add: item.document.split("add:")[1].split(";ph")[0]
  }));
  }
  const position = [25, 25];
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;
  return (
    <div className="contact">
      <h1>CONTACT US</h1>
      <div className="map">
        <div className="map-container">
          <MapContainer
            sx={{
              height: "100%",
            }}
            center={position}
            zoom={1}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {poses?.map((position, index) => (
              <Marker key={index} position={position.pos}>
                <Popup>
                  {position.add}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      <div className="adds">
        {apiData?.map((item, index) => (
          <div key={index} className="add-container">
            <h5 className="title">
              {item.title}
            </h5>
            <h5 className="rest">Address:</h5>
            <div style={{
              wordWrap: "break-word",
            }}>
              {item.document.split("add:")[1].split(";ph:")[0]}
            </div>
            <div className="ph-mail">
              <div className="ph">
                <h5>Phone:</h5>
                <div>
                  {item.document.split(";ph:")[1].split(";mail:")[0]}
                </div>
              </div>
              <div className="mail">
                <h5>Email</h5>
                <div>
                  {item.document.split(";mail:")[1].split(";lat:")[0]}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// {
//     title: "Corporate Head Quarters",
//     subtitle: "Place name1",
//     address: "25807 Westheimer Parkway, Suite # 433, Katy, TX 77494 USA.",
//     phone: "+1 (346) 348 1363",
//     email: "info@crsclass.com"
// },
// {
//     title: "Regional Centre Indian Ocean",
//     subtitle: "Place name2",
//     address: "1st 5A, Heavenly Plaza, CiviRd, Chembumukku, EdappaKakkanad, Kerala 682021",
//     phone: "0484 3500685",
//     email: "info@crsclass.com"
// },
// {
//     title: "Corporate Head Quarters",
//     subtitle: "Place name3",
//     address: "India Seaport Airport Road, kalamassery, kochi, kerala, India",
//     phone: "+91 6282443764",
//     email: "vishnuur@techbyheart.in"
// }

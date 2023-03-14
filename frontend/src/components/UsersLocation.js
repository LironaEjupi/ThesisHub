import React, { useEffect } from "react";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import "../styles/sass/_locateMe.scss";
import { useState } from "react";
import LocationMarker from "./LocationMarker";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup
} from "react-leaflet";
import L from "leaflet";

function UsersLocation() {
  const token = localStorage.getItem("token");
  const [position, setPosition] = useState([42.56, 20.34]);
  const [positionData, setPositionData] = useState([]);
  const markerIcon = new L.Icon({
	iconUrl: require("../assets/images/marker.png"),
	iconSize: [30, 30]
  });

  useEffect(() => {
	fetch("/user_locations", {
	  method: "GET",
	  headers: {
		"Content-type": "application/json",
		Authorization: "Bearer " + token
	  }
	}).then(res => {
	  if (res.ok) {
		res.json().then(locations => {
		  let data = locations.data;
		  setPositionData(data);
		});
	  } else {
		return res.json().then(data => {
		  console.log("Error! ", data);
		});
	  }
	});
  }, []);

  return (
	<div className="container my-5">
	  <h1 className="font-medium text-light-brown text-3xl mb-5">
		Vendndodhja e punëtorëve
	  </h1>
	  <MapContainer center={position} zoom={8} scrollWheelZoom={false}>
		<TileLayer
		  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		/>
		{positionData.map(location => {
		  return (
			<div key={location.id}>
			  <div>
				<Marker
				  position={L.latLng(location.latitude, location.longitude)}
				  icon={markerIcon}
				  key={location.id}
				>
				  <Popup>
					<p className="text-light-brown font-bold">
					  {location.name} {location.surname}
					  <br />
					  {location.category} <br /> {location.address} <br />
					  {location.title}
					</p>
					<img src={"/storage/images/" + location.image} alt="" />
				  </Popup>
				</Marker>
			  </div>
			</div>
		  );
		})}
		<LocationMarker />
	  </MapContainer>
	</div>
  );
}

export default UsersLocation;

import React, { useEffect, useState } from "react";
import { Marker, useMapEvents, Popup } from "react-leaflet";
import L from "leaflet";

const LocationMarker = () => {
	const token = localStorage.getItem("token");
	const [myLocation, setMyLocation] = useState([42.58, 20.35]);
	const locateMarker = new L.Icon({
		iconUrl: require("../assets/images/location.png"),
		iconSize: [40, 40]
	});

	const map = useMapEvents({
		click() {
			map.locate();
		},
		locationfound(e) {
			map.panTo(e.latlng, map.animate);
			setMyLocation([e.latlng.lat, e.latlng.lng]);
		}
	});

	useEffect(() => {
			fetch("/set_location", {
				method: "POST",
				body: JSON.stringify({
					lat: myLocation[0],
					lng: myLocation[1]
				}),
				headers: {
					"Content-type": "application/json",
					Authorization: "Bearer " + token
				}
			}).then(res => {
				if (res.ok) {
					res.json().then(data => {
						console.log("This is the message:" + data.message);
					});

				} else {
					return res.json().then(data => {
						console.log("Error! ", data.error);
					});
				}
			});
	}, []);

	console.log("Position ", myLocation);
	return myLocation === null ? null : (
		<Marker position={myLocation} icon={locateMarker}>
			<Popup>
				<p>Ju zgjodhët me sukses vendndodhjen tuaj!</p>
				<p>LAT: {myLocation[0]}</p>
				<p>LNG: {myLocation[1]}</p>
			</Popup>
		</Marker>
	);
};

export default LocationMarker;

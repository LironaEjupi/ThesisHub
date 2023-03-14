import React, { useEffect, useRef, useMemo } from "react";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import "../styles/sass/_locateMe.scss";
import { useState } from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	useMapEvents,
	Popup,
	SetViewOnClick
} from "react-leaflet";
import L from "leaflet";

function LocateMe() {
	const token = localStorage.getItem("token");
	const [position, setPosition] = useState([42.56, 20.34]);
	const [latitude, setLatitude] = useState(42.56);
	const [longitude, setLongitude] = useState(20.34);

	const markerRef = useRef(null);
	const [markerDragged, setMarkerDragged] = useState(false);
	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current;
				if (marker != null) {
					const { lat, lng } = marker.getLatLng();
					setLatitude(lat);
					setLongitude(lng);
					setPosition(marker.getLatLng());
					setMarkerDragged(true);
				}
			}
		}),
		[]
	);

	const markerIcon = new L.Icon({
		iconUrl: require("../assets/images/marker.png"),
		iconSize: [40, 40]
	});
	const LocationMarker = () => {
		const map = useMapEvents({
			click() {
				map.locate();
			},
			locationfound(e) {
				map.flyTo(e.latlng, map.animate);
				setPosition(e.latlng);
				setLatitude(e.latlng.lat);
				setLongitude(e.latlng.lng);

				if (markerDragged) {
					console.log("New latitude and longitude: ", position);
				}
			}
		});
		useEffect(() => {
			fetch("/set_location", {
				method: "POST",
				body: JSON.stringify({
					lat: latitude,
					lng: longitude
				}),
				headers: {
					"Content-type": "application/json",
					"Authorization": "Bearer " + token
				}
			}).then(res => {
				if (res.ok) {
					res.json().then(data => {
						console.log("This is the message:" + data.message);
					});
				} else {
					return res.json().then(data => {
						console.log("Dicka u bo gabim!");
					});
				}
			});
		});
		return position === null ? null : (
			<Marker
				position={position}
				ref={markerRef}
				icon={markerIcon}
				draggable={true}
				eventHandlers={eventHandlers}
			>
				<Popup>
					<p>Ju zgjodhët me sukses vendndodhjen tuaj!</p>
					<p>LAT: {latitude}</p>
					<p>LNG: {longitude}</p>
				</Popup>
			</Marker>
		);
	};
	return (
		<div className="container my-5">
			<h1 className="font-medium text-light-brown text-3xl mb-5">
				Kliko mbi hartë për të treguar lokacionin tuaj
			</h1>
			<MapContainer
				center={position}
				zoom={13}
				scrollWheelZoom={false}
				draggable={true}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<LocationMarker />
			</MapContainer>
		</div>
	);
}

export default LocateMe;

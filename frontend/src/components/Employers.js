import React, { useState, useEffect } from "react";
import FilterUser from "./FilterUser";
import FilterByLocation from "./FilterByLocation";
import Modal from "./Modal";

function Employers(props) {
	const [profileData, setProfileData] = useState([]);
	const [category, setCategory] = useState("all");
	const [location, setLocation] = useState("Lokacioni");
	const [visibleUsers, setVisibleUsers] = useState(9);
	const token = localStorage.getItem("token");
	const filteredUser = profileData.filter(user => {
		if (category === "all" && location === "Lokacioni") {
			return true;
		} else if (category !== "all" && location === "Lokacioni") {
			return user.category === category;
		} else if (category === "all" && location !== "Lokacioni") {
			return user.address === location;
		} else {
			return user.address === location && user.category === category;
		}
	});
	const onSelectedCategory = selectedCategory => {
		setCategory(selectedCategory);
	};
	const onSelectedLocation = selectedLocation => {
		setLocation(selectedLocation);
	};
	const loadMore = () => {
		setVisibleUsers(visibleUsers + 3);
	};
	const [modalData, setModalData] = useState({
		isOpen: false,
		id: 1
	});

	useEffect(() => {
		fetch("/users", {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				Authorization: "Bearer " + token
			}
		}).then(res => {
			if (res.ok) {
				res.json().then(profile => {
					let data = profile.data;
					setProfileData(data);
				});
			} else {
				return res.json().then(data => {
					console.log("Something went wrong!");
				});
			}
		});
	}, []);

	return (
		<div className="services bg-white pt-5">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h1 className="font-medium text-light-brown text-5xl mb-3">
							{props.title}
						</h1>
						<div className="border-b-2 border-solid border-light-brown mb-5 pt-1"></div>
						<FilterUser selectedCategory={onSelectedCategory} />
						<FilterByLocation selectedLocation={onSelectedLocation} />
						<Modal
							profileData={profileData}
							modalData={modalData}
							onClose={() => setModalData({ isOpen: false })}
						/>
					</div>
					{filteredUser.slice(0, visibleUsers).map(data => {
						return (
							<div className="col-6 col-lg-4" key={data.id}>
								<div className="services-container relative mb-6 animate" key={data.id}>
									<div className="h-48 md:h-72 overflow-hidden relative group">
										{data.image ? (
											<img
												className="image h-full w-full object-cover object-top transition group-hover:ease-in group-hover:duration-300 group-hover:blur-sm group-hover:scale-110"
												src={"/storage/images/" + data.image}
												alt=""
											/>
										) : (
											<img
												className="image h-full w-full object-cover object-top transition group-hover:ease-in group-hover:duration-300 group-hover:blur-sm group-hover:scale-110"
												src={require("../assets/images/anonymous.jpg")}
												alt=""
											/>
										)}
										<div className="content translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition ease-in duration-300 absolute p-2 text-lg text-white w-full h-full flex flex-column place-content-end text-left bottom-0">
											<p>
												{data.name} {data.surname}
											</p>
											<p>{data.address}</p>
											<p>{data.title}</p>
											<button
												onClick={() =>
													setModalData({ isOpen: true, id: data.id })
												}
												className="button border p-2 text-sm rounded md:w-2/5 self-end"
											>
												Shiko profilin
											</button>
										</div>
									</div>
								</div>
							</div>
						);
					})}
					{filteredUser.length === visibleUsers || filteredUser.length < visibleUsers ? (
						""
					) : (
						<div className="load-more text-center mb-6 mt-0">
							<button
								className="rounded border px-5 py-2 text-md font-medium text-light-brown hover:bg-beige hover:text-white transition ease-in duration-300 animate"
								onClick={loadMore}
							>
								Shiko më shumë
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Employers;

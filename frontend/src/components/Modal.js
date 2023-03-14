import React from "react";
import { useState } from "react";

function Modal({ profileData, modalData, onClose }) {
  const filterUser = profileData.filter(user => {
	if (user.id === modalData.id) {
	  return user.id === modalData.id;
	}
  });
  
  if (!modalData.isOpen) return null;

  return (
	<div>
	  <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/[0.3] blur-3xl z-[100]" />
	  <div className="modal_custom fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 bg-white/[0.9] border-2 border-beige p-9 z-[100]">
		<div className="contact">
		  <div className="profile mt-5">
			<div className="container">
			  {filterUser.map(data => {
				return (
				  <div className="row items-center" key={data.id}>
					<h1 className="uppercase font-semibold text-light-brown text-2xl mb-3">
					  Profili
					</h1>
					<div className="border-b-2 border-solid border-light-brown mb-5 pt-1"></div>
					<div className="col-sm-5">
					  <div className="form-data" key={data.id}>
						<div>
						  <label className="text-light-brown">Emri:</label>
						  <p className="border p-1 rounded text-brown font-medium bg-beige">
							{data.name}
						  </p>
						  <label className="text-light-brown">Mbiemri: </label>
						  <p className="border p-1 rounded text-brown font-medium bg-beige">
							{data.surname}
						  </p>
						  {data.phone ? (
							<label className="w-full text-light-brown">
							  Numri kontaktues:
							  <p className="border p-1 rounded text-brown font-medium bg-beige">
								{data.phone}
							  </p>
							</label>
						  ) : (
							""
						  )}
						  {data.email ? (
							<label className="w-full text-light-brown">
							  Adresa elektronike:
							  <p className="border p-1 rounded text-brown font-medium bg-beige">
								{data.email}
							  </p>
							</label>
						  ) : (
							""
						  )}
						  {data.address ? (
							<label className="w-full text-light-brown">
							  Vendndodhja:
							  <p className="border p-1 rounded text-brown font-medium bg-beige">
								{data.address}
							  </p>
							</label>
						  ) : (
							""
						  )}
						  {data.birthdate ? (
							<label className="w-full text-light-brown">
							  Ditëlindja:
							  <p className="border p-1 w-full rounded text-brown font-medium bg-beige">
								{data.birthdate}
							  </p>{" "}
							</label>
						  ) : (
							""
						  )}
						  {data.category ? (
							<label className="w-full text-light-brown">
							  Kategoria:
							  <p className="border p-1 rounded text-brown font-medium bg-beige">
								{data.category}
							  </p>
							</label>
						  ) : (
							""
						  )}
						  {data.title ? (
							<label className="w-full text-light-brown">
							  Titulli:
							  <p className="border p-1 rounded text-brown font-medium bg-beige">
								{data.title}
							  </p>
							</label>
						  ) : (
							""
						  )}
						  {data.availability === "employed" ? (
							<label className="w-full text-light-brown">
							   Disponueshmëria:
							   <p className="border p-1 rounded text-green font-medium" style={{color: 'green'}}>
								  I/E punësuar <i className="fa fa-check" style={{color: 'green'}} ></i>
								</p>
							</label>
						  ) : (
							""
						  )}
						  {data.resume ? (
							   <div className="border p-1 mt-2 rounded text-green font-medium">
								<a className='underline text-brown hover:text-light-brown' href={"http://localhost:5000/storage/files/" + data.resume} target="_blank" rel="noreferrer">Shiko CV</a>
							   </div>
						  ) : (
							""
						  )}
						</div>
					  </div>
					</div>
					<div className="col-sm-7">
					  <div className="h-32 md:h-96 relative">
						{data.image ? (
						  <img
							src={"storage/images/" + data.image}
							alt=""
							className="mb-2 h-full w-full object-cover object-top"
						  />
						) : (
						  <img
							src={require("../assets/images/anonymous.jpg")}
							alt=""
							className="mb-2 h-full w-full object-cover"
						  />
						)}
					  </div>
					</div>
				  </div>
				);
			  })}
			</div>
		  </div>
		</div>
		<button
		  className="shadow-lg float-right px-4 py-2 uppercase rounded border text-sm mt-5 font-bold text-light-brown border-light-brown"
		  onClick={onClose}
		>
		  Mbylle
		</button>
	  </div>
	</div>
  );
}

export default Modal;

import React, { useEffect, useState } from "react";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
	fetch("/companies", {
	  method: "GET",
	  headers: {
		"Content-type": "application/json",
		Authorization: "Bearer " + token
	  }
	}).then(res => {
	  if (res.ok) {
		res.json().then(companies => {
		  let data = companies.data;
		  setCompanies(data);
		});
	  } else {
		return res.json().then(data => {
		  console.log(data.msg);
		});
	  }
	});
  }, []);
  return (
	<div className="companies bg-beige pt-5 pb-24">
	  <div className="container">
		<div className="row">
		  <div className="col-md-3">
			<h1 className="font-semibold text-light-brown text-3xl mb-3">
			  Kompanitë të cilat ofrojnë punë përmes platformës tonë
			</h1>
			<div className="border-b-2 border-solid border-light-brown mb-5 pt-1"></div>
		  </div>
		  <div className="col-md-3 offset-md-2">
			<ul className="font-normal text-sm leading-6 mt-4 text-light-brown">
			  {companies.map(company => {
				if (company.company != "")
				  return <li key={company.id}>{company.company}</li>;
			  })}
			</ul>
		  </div>
		</div>
	  </div>
	</div>
  );
}

export default Companies;

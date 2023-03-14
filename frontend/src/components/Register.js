import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedOption, setSelectedOption] = useState();
  const validateEmail = new RegExp(
	"^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );

  const [styles, setStyles] = useState({
	display: "none"
  });



  const validateForm = (name, surname, email, password, selectedOption) => {
	const errors = {}
	if(!validateEmail.test(email)) {
	  errors.emailError = "Format gabim i adresës elektronike!"
	}
	if(password.length < 5) {
	  errors.passwordError = "Fjalëkalimi duhet të përmbajë të paktën 5 karaktere!"
	}
	if(name.length < 3) {
	  errors.nameError = "Emri duhet të ketë të paktën 3 karaktere!"
	}
	if(surname.length < 3) {
	  errors.surnameError = "Mbiemri duhet të ketë të paktën 3 karaktere!"
	}
	if(selectedOption === undefined) {
	  errors.roleError = "Duhet të zgjedhni cilës kategori i perkisni!"
	}
	setErrors(errors)
	if(Object.keys(errors).length === 0) {
	  return true
	}
  };

  const handleSubmit = e => {
	e.preventDefault();
	if (!validateForm(name, surname, email, password, selectedOption)) {
	  setStyles({
		display: "inline",
		color: "red"
	  });
	  return;
	}
	fetch("/register", {
	  method: "POST",
	  body: JSON.stringify({
		name: name,
		surname: surname,
		password: password,
		email: email,
		role: selectedOption,
		company: company
	  }),
	  headers: {
		"Content-type": "application/json"
	  }
	}).then(res => {
	  if (res.ok) {
		res.json().then(data => {
		  if (data.message !== undefined) {
			setErrors({...errors,'message': data.message})
			setStyles({
			  display: "inline",
			  color: "red"
			});
		  } else if(data.error !== undefined) {
			setErrors({...errors, 'message': data.error});
			setStyles({
			  display: "inline",
			  color: "red"
			});
		  }
		  else if(data.success !== undefined){
			setErrors({...errors, 'message': data.success});
			setStyles({
			  display: "inline",
			  color: "green"
			});
		  }
		});
	  } else {
		return res.json().then(data => {
		  console.log("These are the data: " + data);
		});
	  }
	});
  };

  return (
	<>
	  <div className="login-">
		<div className="login-inside absolute top-2/4 left-2/4 translate-y-[-50%] translate-x-[-50%] w-4/5">
		  <div className="container lg:w-4/5">
			<div className="row items-center">
			  <h1 className="uppercase font-semibold text-brown text-xl">
				Gjej punëtorin/punëdhënësin potencial
			  </h1>
			  <div className="border-b-2 border-solid border-light-brown mb-5 pt-1 lg:w-11/12"></div>
			  <div className="col-md-6">
				<div className="image h-full">
				  <img className="h-full object-cover" src={require("../assets/images/login.jpg")} alt="" />
				</div>
			  </div>
			  <div className="col-md-5 offset-lg-1">
				<div className="content">
				  <form onSubmit={handleSubmit} className="flex flex-column">
					<h2 className="text-3xl md:mb-5 font-medium text-light-brown pt-2">
					  Regjistrohu
					</h2>
					<input
					  className="border text-xs text-light-brown border-brown xl:w-3/4 focus-visible:border-red mt-3 p-2 mb-1"
					  type="text"
					  name="name"
					  placeholder="EMRI"
					  value={name}
					  onChange={e => setName(e.target.value)}
					></input>
					{errors.nameError && <section
						className="error_messages xl:w-3/4"
						style={styles}
					  >
						<span className="error_msg font-medium text-sm" style={styles}>
						  <i
							className="fa fa-exclamation-circle mr-1"
							style={styles}
						  ></i>
						  {errors.nameError}
						</span>
					  </section>}
					<input
					  className="border text-xs text-light-brown border-brown xl:w-3/4 mt-3 p-2 mb-1"
					  type="text"
					  name="surname"
					  placeholder="MBIEMRI"
					  value={surname}
					  onChange={e => setSurname(e.target.value)}
					></input>
					 {errors.surnameError && <section
						className="error_messages xl:w-3/4"
						style={styles}
					  >
						<span className="error_msg font-medium text-sm" style={styles}>
						  <i
							className="fa fa-exclamation-circle mr-1"
							style={styles}
						  ></i>
						  {errors.surnameError}
						</span>
					  </section>}
					<input
					  className="border text-xs text-light-brown border-brown xl:w-3/4 mt-3 p-2 mb-1"
					  type="email"
					  name="email"
					  placeholder="ADRESA ELEKTRONIKE"
					  value={email}
					  onChange={e => setEmail(e.target.value)}
					></input>
					{errors.emailError && <section
						className="error_messages xl:w-3/4"
						style={styles}
					  >
						<span className="error_msg font-medium text-sm" style={styles}>
						  <i
							className="fa fa-exclamation-circle mr-1"
							style={styles}
						  ></i>
						  {errors.emailError}
						</span>
					  </section>}
					<input
					  className="border text-xs text-light-brown border-brown xl:w-3/4 mt-3 p-2 mb-1"
					  type="password"
					  name="password"
					  placeholder="FJALËKALIMI"
					  value={password}
					  onChange={e => setPassword(e.target.value)}
					></input>
					{errors.passwordError && <section
						className="error_messages xl:w-3/4"
						style={styles}
					  >
						<span className="error_msg font-medium text-sm" style={styles}>
						  <i
							className="fa fa-exclamation-circle mr-1"
							style={styles}
						  ></i>
						  {errors.passwordError}
						</span>
					  </section>}
					<label className="radio text-start text-brown text-sm font-medium mt-3 mb-1">
					  <input
						type="radio"
						name="role"
						value="Company"
						checked={selectedOption === "Company"}
						onChange={e => setSelectedOption(e.target.value)}
					  />
					  <span>Punëdhënës</span>
					</label>
					<label className="radio text-start text-brown text-sm font-medium">
					  <input
						type="radio"
						name="role"
						value="Jobseeker"
						checked={selectedOption === "Jobseeker"}
						onChange={e => setSelectedOption(e.target.value)}
					  />
					  <span>Punëtor</span>
					</label>
					{selectedOption === "Company" ? (
					  <input
						className="border text-xs text-light-brown border-brown xl:w-3/4 mt-3 p-2 mb-1"
						type="text"
						name="company"
						placeholder="EMRI I KOMPANISË"
						value={company}
						onChange={e => setCompany(e.target.value)}
					  ></input>
					) : (
					  ""
					)}
					{errors.roleError && <section
						className="error_messages xl:w-3/4"
						style={styles}
					  >
						<span className="error_msg font-medium text-sm" style={styles}>
						  <i
							className="fa fa-exclamation-circle mr-1"
							style={styles}
						  ></i>
						  {errors.roleError}
						</span>
					  </section>}
					{errors["message"] ? (
					  <section
						className="error_messages xl:w-3/4 mt-2"
						style={styles}
					  >
						<span className="error_msg font-medium text-sm" style={styles}>
						  <i
							className="fa fa-exclamation-circle mr-1"
							style={styles}
						  ></i>
						  {errors["message"]}
						</span>
					  </section>
					) : (
					  ""
					)}
					<div className="buttons">
					  <button
						type="submit"
						className="button uppercase submit rounded-none border w-full xl:w-3/4 px-4 py-1 text-sm text-brown mt-3"
					  >
						Regjistrohu
					  </button>
					  <Link
						to="/"
						className="transition ease-in duration-300"
					  >
						<p className="text-center xl:w-3/4 no-underline text-sm text-light-brown text-center font-medium hover:text-brown">
						  Kyçu
						</p>
					  </Link>
					</div>
				  </form>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</>
  );
}

export default Register;

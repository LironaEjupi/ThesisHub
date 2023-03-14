import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Reset() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [styles, setStyles] = useState({ display: 'none' })
	const [errorMessage, setErrorMessage] = useState("")
	const navigate = useNavigate();

	const submitHandler = event => {
		event.preventDefault();
		const validateEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')
	   
		if (!(validateEmail.test(email) && password.length > 5)) {
			setErrorMessage("Formati i gabuar!");
			setStyles({
				display: 'inline',
				color: 'red'
			})
			return;
		}
		fetch("/reset", {
			method: "POST",
			body: JSON.stringify({
				email: email,
				password: password
			}),
			headers: {
				"Content-type": "application/json"
			}
		}).then(res => {
			if (res.ok) {
				res.json().then(data => {
					if(!data.error) {
						setErrorMessage(data.success);
						setStyles({
							display: "inline",
							color: 'green'
						});
						navigate("/")
					}
					else {
						setErrorMessage(data.error);
						setStyles({
							display: "inline",
							color: 'red'
						});
					}
				});
			} else {
				return res.json().then(data => {
					console.log("Error! " + data);
				});
			}
		});
	};

  return (
	<div>
	  <div className="login-">
				<div className="login-inside absolute top-2/4 left-2/4 translate-y-[-50%] translate-x-[-50%] w-4/5">
					<div className="container lg:w-4/5">
						<div className="row items-center">
							<h1 className="uppercase font-semibold text-brown text-xl">
								Gjej punëtorin/punëdhënësin potencial
							</h1>
							<div className="border-b-2 border-solid border-light-brown mb-5 pt-1"></div>
							<div className="col-md-6">
								<div className="image h-full">
									<img
										className="h-full object-cover"
										src={require("../assets/images/login.jpg")}
										alt=""
									/>
								</div>
							</div>
							<div className="col-md-5 offset-lg-1">
								<div className="content">
									<form
										onSubmit={submitHandler}
										className="flex flex-column animate"
									>
										<h2 className="text-3xl md:mb-5 font-medium text-light-brown pt-2">
											Riktheni llogarinë tuaj
										</h2>
										<p className='xl:w-3/4 text-light-brown text-sm font-medium'>Ju lutem shkruani adresen tuaj elektronike dhe nje fjalekalim te ri</p>
										<input
											className="border text-xs text-light-brown border-brown xl:w-3/4 focus-visible:border-red mt-3 p-2 mb-1"
											type="text"
											name="username"
											placeholder="EMAIL"
											value={email}
											onChange={e =>
												setEmail(e.target.value)
											}
										></input>
										<input
											className="border text-xs text-light-brown border-brown xl:w-3/4 mt-1 p-2 mb-3"
											type="password"
											name="password"
											placeholder="PASSWORD"
											value={password}
											onChange={e =>
												setPassword(e.target.value)
											}
										></input>
										<section className="error_messages mb-3 xl:w-3/4 animate" style={styles}>
											<span className="error_msg font-medium">
												<i className='fa fa-exclamation-circle mr-1' style={styles}></i>
												{errorMessage}
											</span>
										</section>
										<div className="buttons">
											<button
												type="submit"
												className="button uppercase submit rounded-none border w-full xl:w-3/4 px-4 py-1 text-sm text-brown mt-3"
											>
												Rikthe llogarinë
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	</div>
  )
}

export default Reset
